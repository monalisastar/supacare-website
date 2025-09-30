"use client";

import Image from "next/image";
import ResetPasswordForm from "@/components/ResetPasswordForm";

// Disable prerendering
export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/recycling-composting.png"
          alt="Reset password background"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* Card / form */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Reset Your Password
        </h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
