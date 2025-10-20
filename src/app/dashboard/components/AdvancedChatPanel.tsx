"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  text?: string;
  sender: "USER" | "ADMIN" | "AI";
  createdAt?: string;
  fileUrl?: string;
  fileType?: string;
}

let socket: Socket;

export default function AdvancedChatPanel() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Guest";
  const userId = session?.user?.email ?? "guest";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize WebSocket connection
  useEffect(() => {
    socket = io();

    socket.on("connect", () => console.log("Connected to WS server"));

    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    socket.on("typing", (data: { userId: string; typing: boolean }) => {
      if (data.userId === userId) setIsTyping(data.typing);
    });

    // Fetch initial messages from backend
    fetch(`/api/messages?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // Send text message
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "USER",
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    scrollToBottom();

    socket.emit("sendMessage", {
      text: input,
      userId,
      sender: "USER",
    });

    setInput("");
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    try {
      const res = await fetch("/api/messages/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      const fileMsg: Message = {
        id: Date.now().toString(),
        sender: "USER",
        fileUrl: data.url,
        fileType: file.type,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, fileMsg]);
      scrollToBottom();

      // Optional: Notify WebSocket so admins see the new file
      socket.emit("sendMessage", {
        text: "",
        fileUrl: data.url,
        fileType: file.type,
        userId,
        sender: "USER",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-inner overflow-hidden">
      {/* Header */}
      <div className="bg-lime-500 text-white px-3 py-2 font-semibold flex items-center justify-between">
        <span>Support Chat — {userName}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-2 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${
              msg.sender === "USER" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[70%] break-words ${
                msg.sender === "USER"
                  ? "bg-blue-500 text-white"
                  : msg.sender === "ADMIN"
                  ? "bg-gray-300 text-black"
                  : "bg-green-200 text-black"
              }`}
            >
              {msg.text && <div className="text-sm">{msg.text}</div>}

              {msg.fileUrl && (
                <div className="mt-1">
                  {msg.fileType?.startsWith("image/") ? (
                    <img src={msg.fileUrl} alt="upload" className="max-w-xs rounded" />
                  ) : (
                    <a
                      href={msg.fileUrl}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      Download File
                    </a>
                  )}
                </div>
              )}

              {msg.createdAt && (
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && <div className="mb-2 text-gray-500 italic">AI is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input & File Upload */}
      <div className="p-2 flex gap-2 border-t border-gray-200 items-center">
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileUpload}
        />
        <label
          htmlFor="fileInput"
          className="bg-gray-200 px-3 py-1 rounded cursor-pointer hover:bg-gray-300"
        >
          📎
        </label>

        <input
          className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-lime-500 hover:bg-lime-600 text-white px-3 rounded text-sm font-medium transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
