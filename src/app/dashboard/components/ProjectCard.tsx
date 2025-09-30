"use client";

import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  deadline: string;
  team: string[];
  status?: string;
  files?: { name: string; url: string }[];
  onEdit?: () => void;
  onChangeStatus?: (status: string) => void;
  viewLink?: string; // new prop for "View Details" button
  statusOptions?: string[]; // dynamically render buttons
}

export default function ProjectCard({
  title,
  description,
  deadline,
  team,
  status,
  files = [],
  onEdit,
  onChangeStatus,
  viewLink,
  statusOptions = [],
}: ProjectCardProps) {
  return (
    <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg transition transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
      <p className="text-sm text-white mb-3">{description}</p>
      <p className="text-sm text-white mb-2">
        <strong>Deadline:</strong> {deadline}
      </p>
      <p className="text-sm text-white mb-2">
        <strong>Team:</strong> {team.join(", ")}
      </p>

      {status && (
        <p className="text-sm text-white mb-2">
          <strong>Status:</strong> {status}
        </p>
      )}

      {files.length > 0 && (
        <div className="text-sm text-gray-300 mb-2">
          <strong>Files:</strong>{" "}
          {files.map((f) => (
            <a
              key={f.url}
              href={f.url}
              target="_blank"
              className="underline mr-2"
            >
              {f.name}
            </a>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-2 flex-wrap">
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md transition"
          >
            Edit
          </button>
        )}

        {onChangeStatus &&
          statusOptions.map((option) => (
            <button
              key={option}
              onClick={() => onChangeStatus(option)}
              className={`text-sm px-3 py-1 rounded-md transition ${
                option === "ACTIVE"
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : option === "COMPLETED"
                  ? "bg-blue-700 hover:bg-blue-800 text-white"
                  : "bg-gray-700 hover:bg-gray-800 text-white"
              }`}
            >
              Mark {option.charAt(0) + option.slice(1).toLowerCase()}
            </button>
          ))}

        {viewLink && (
          <Link
            href={viewLink}
            className="text-sm bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md transition"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
