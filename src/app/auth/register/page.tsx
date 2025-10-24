"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // ✅ Detect navbar height dynamically
  useEffect(() => {
    const navbar = document.querySelector("nav, header");
    if (navbar) setNavbarHeight(navbar.getBoundingClientRect().height);

    const handleResize = () => {
      const nav = document.querySelector("nav, header");
      if (nav) setNavbarHeight(nav.getBoundingClientRect().height);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const friendlyErrors: Record<string, string> = {
          "Email already in use":
            "That email is already registered. Please log in instead.",
          "Please use Google login":
            "This email is linked with Google. Please sign up with Google.",
          "Password too short":
            "Password must be at least 6 characters long.",
        };

        throw new Error(
          friendlyErrors[data.message] ||
            data.message ||
            "Failed to create your account."
        );
      }

      router.push("/auth/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center bg-gray-100"
      style={{
        minHeight: `calc(100vh - ${navbarHeight}px)`,
        marginTop: navbarHeight,
      }}
    >
      {/* ✅ Background hero image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-hero.webp"
          alt="Register background"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* ✅ Overlay card */}
      <div className="relative z-20 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded p-2">
              {error}
            </p>
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg 
                       bg-white text-gray-800 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg 
                       bg-white text-gray-800 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full p-3 border border-gray-300 rounded-lg 
                       bg-white text-gray-800 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 
                       bg-green-600 text-white rounded-lg font-semibold 
                       hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google register */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center gap-3 w-full py-3 
                     border border-gray-300 rounded-lg font-medium 
                     text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm"
        >
          <Image src="/icons/google.svg" alt="Google logo" width={20} height={20} />
          <span>Sign up with Google</span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
