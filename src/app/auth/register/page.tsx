"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger email provider sign-in, redirect to login page
    await signIn("email", { email, redirect: true, callbackUrl: "/auth/login" });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Background hero image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-hero.webp"
          alt="Register background"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* Overlay card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register with Email
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => signIn("google", { callbackUrl: "/auth/login" })}
            className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Register with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/auth/login" className="text-green-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
