"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6 text-gray-100 transition-all hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}
