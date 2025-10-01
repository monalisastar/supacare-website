"use client";

import Link from "next/link";
import { FaComments, FaEnvelope, FaUserPlus } from "react-icons/fa";
import Card from "./Card"; // glassmorphism card

interface ChatData {
  activeConversations: number;
  newMessages: number;
  unreadMessages: number;
}

export default function ChatCard() {
  // Placeholder data
  const data: ChatData = {
    activeConversations: 5,
    newMessages: 2,
    unreadMessages: 1,
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <FaComments className="text-blue-400 text-2xl" />
        <h3 className="text-xl font-semibold text-gray-100">Client Chat</h3>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white/30 p-3 rounded text-center">
          <p className="text-lg font-bold">{data.activeConversations}</p>
          <p>Active Conversations</p>
        </div>
        <div className="bg-white/30 p-3 rounded text-center">
          <p className="text-lg font-bold">{data.newMessages}</p>
          <p>New Messages</p>
        </div>
        <div className="bg-white/30 p-3 rounded text-center">
          <p className="text-lg font-bold">{data.unreadMessages}</p>
          <p>Unread Messages</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link
          href="/dashboard/chat"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Open Chat
        </Link>
        <Link
          href="/dashboard/chat/new"
          className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
        >
          New Message
        </Link>
      </div>
    </Card>
  );
}
