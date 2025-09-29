"use client";

import { useState, useEffect } from "react";

export interface ProjectFormData {
  title: string;
  description: string;
  deadline: string;
  team: string;
  files?: File[];
}

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData, files: FileList | null) => Promise<void>;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg"];

export default function ProjectForm({ initialData, onSubmit }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    deadline: "",
    team: "",
    ...initialData,
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`File type not allowed: ${file.name}`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`File too large (max 5MB): ${file.name}`);
        return;
      }
    }

    setError(null);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;

    try {
      await onSubmit(formData, files);
      setSubmitted(true);
      setFormData({ title: "", description: "", deadline: "", team: "" });
      setFiles(null);
    } catch (err) {
      setError("Submission failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-black/50 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg flex flex-col gap-4"
    >
      {submitted && <div className="mb-4 p-3 bg-green-600 text-white rounded-md">Project submitted successfully!</div>}
      {error && <div className="mb-4 p-3 bg-red-600 text-white rounded-md">{error}</div>}

      <div>
        <label className="block text-white font-semibold mb-1">Project Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-1">Project Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-1">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-1">Team Members (comma separated)</label>
        <input
          type="text"
          name="team"
          value={formData.team}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-1">Upload Supporting Files</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full text-white placeholder-gray-300 bg-white/10 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {files && <p className="mt-2 text-sm text-gray-300">{Array.from(files).map((f) => f.name).join(", ")}</p>}
      </div>

      <button type="submit" className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-md transition">
        Submit Project
      </button>
    </form>
  );
}
