"use client";

import { useState, useEffect } from "react";

export interface ProjectFormData {
  title: string;
  description: string;
  deadline: string;
  team: string[];
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
    team: [],
    ...initialData,
  });
  const [teamInput, setTeamInput] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTeamMember = () => {
    const name = teamInput.trim();
    if (!name) {
      setError("Team member name cannot be empty.");
      return;
    }
    setFormData({ ...formData, team: [...formData.team, name] });
    setTeamInput("");
    setError(null);
  };

  const handleRemoveTeamMember = (index: number) => {
    setFormData({ ...formData, team: formData.team.filter((_, i) => i !== index) });
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

  const validateForm = () => {
    if (!formData.title.trim()) return "Project title is required.";
    if (!formData.description.trim()) return "Project description is required.";
    if (!formData.deadline.trim()) return "Project deadline is required.";
    if (formData.team.length === 0) return "At least one team member is required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await onSubmit(formData, files);
      setSubmitted(true);
      setFormData({ title: "", description: "", deadline: "", team: [] });
      setTeamInput("");
      setFiles(null);
      setError(null);
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
      {submitted && (
        <div className="mb-4 p-3 bg-green-600 text-white rounded-md">
          Project submitted successfully!
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-600 text-white rounded-md">{error}</div>
      )}

      {/* Title */}
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

      {/* Description */}
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

      {/* Deadline */}
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

      {/* Team Members */}
      <div>
        <label className="block text-white font-semibold mb-1">Team Members</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={teamInput}
            onChange={(e) => setTeamInput(e.target.value)}
            placeholder="Enter team member name"
            className="flex-1 p-2 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={handleAddTeamMember}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md transition"
          >
            Add
          </button>
        </div>

        {formData.team.length > 0 && (
          <ul className="text-white/80 mb-2">
            {formData.team.map((member, index) => (
              <li key={index} className="flex justify-between items-center mb-1">
                <span>{member}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTeamMember(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Files */}
      <div>
        <label className="block text-white font-semibold mb-1">
          Upload Supporting Files
        </label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full text-white placeholder-gray-300 bg-white/10 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {files && (
          <p className="mt-2 text-sm text-gray-300">
            {Array.from(files).map((f) => f.name).join(", ")}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-md transition"
      >
        Submit Project
      </button>
    </form>
  );
}
