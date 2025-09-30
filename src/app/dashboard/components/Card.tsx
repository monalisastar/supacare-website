"use client";

import Link from "next/link";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  progress?: number;
  trend?: { direction: "up" | "down"; percent: number };
  link?: string;
}

export default function Card({ title, value, icon, progress, trend, link }: CardProps) {
  const CardContent = (
    <div className="p-4 sm:p-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex flex-col justify-between">
      
      {/* Title and icon */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base sm:text-lg font-semibold text-green-900 drop-shadow-sm">
          {title}
        </h3>
        {icon && <span className="text-green-600 text-lg sm:text-xl">{icon}</span>}
      </div>

      {/* Main value */}
      <p className="text-xl sm:text-2xl font-bold text-green-800 drop-shadow-sm">
        {value}
      </p>

      {/* Trend indicator */}
      {trend && (
        <div
          className={`flex items-center mt-2 text-xs sm:text-sm font-medium ${
            trend.direction === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend.direction === "up" ? <FaArrowUp /> : <FaArrowDown />}
          <span className="ml-1">{trend.percent}%</span>
        </div>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mt-3 w-full bg-white/20 rounded-full h-1.5 sm:h-2">
          <div
            className="bg-green-500 h-1.5 sm:h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );

  // Wrap card in Link if provided
  return link ? <Link href={link}>{CardContent}</Link> : CardContent;
}
