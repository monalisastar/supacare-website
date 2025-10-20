"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

interface Message {
  id: string;
  text: string;
  sender: "USER" | "ADMIN" | "AI";
  timestamp?: string;
}

export default function AdvancedChatPanel() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "Guest";
  const userId = session?.user?.email ?? "guest";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat/messages?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: "USER" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    scrollToBottom();

    try {
      await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, text: input, sender: "USER" }),
      });
    } catch (err) {
      console.error(err);
    }

    simulateAIReply(input);
  };

  const simulateAIReply = (userText: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const aiMsg: Message = { id: Date.now().toString(), text: `Hello ${userName}, AI Response: "${userText}"`, sender: "AI" };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      scrollToBottom();
    }, 1500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-inner overflow-hidden">
      {/* Header */}
      <div className="bg-lime-500 text-white px-3 py-2 font-semibold flex items-center justify-between">
        <span>Support Chat — {userName}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-2 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 flex ${msg.sender === "USER" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-3 py-2 rounded-lg max-w-[70%] break-words ${
                msg.sender === "USER"
                  ? "bg-blue-500 text-white"
                  : msg.sender === "ADMIN"
                  ? "bg-gray-300 text-black"
                  : "bg-green-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && <div className="mb-2 text-gray-500 italic">AI is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 flex gap-2 border-t border-gray-200">
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
