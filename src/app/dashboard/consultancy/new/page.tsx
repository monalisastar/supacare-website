"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProjectForm, { ProjectFormData } from "../../components/ProjectForm";

export default function NewConsultancyProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (data: ProjectFormData) => {
    setLoading(true);
    setErrorMessage("");

    try {
      // Send JSON instead of FormData to match backend
      const res = await fetch("/api/consultancy/projects/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          clientId: null, // optional: only if admin
          consultantId: null, // optional
          milestones: [], // optional
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.error || "Failed to submit project");
      }

      const result = await res.json();
      console.log("Created project:", result.project);

      // Redirect to the NEW projects dashboard
      router.push("/dashboard/consultancy/new");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-green-50 min-h-screen">
      {/* Return to Dashboard */}
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

      {loading && <p className="mt-4 text-gray-700">Submitting project...</p>}
      {errorMessage && <p className="mt-4 text-red-700">{errorMessage}</p>}
    </div>
  );
}
