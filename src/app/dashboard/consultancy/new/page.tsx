"use client";

import Link from "next/link";
import ProjectForm, { ProjectFormData } from "../../components/ProjectForm";


export default function NewProjectPage() {
  // This function handles submission to your backend
  const handleSubmit = async (data: ProjectFormData, files: FileList | null) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("deadline", data.deadline);
    formData.append("team", data.team);

    if (files) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }

    const res = await fetch("/api/projects", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to submit project");
    return res.json();
  };

  return (
    <div className="p-6 md:p-10 bg-green-50 min-h-screen">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-block px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition"
        >
          ← Return to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Submit New Environmental Consultancy Project
      </h1>

      <ProjectForm onSubmit={handleSubmit} />
    </div>
  );
}
