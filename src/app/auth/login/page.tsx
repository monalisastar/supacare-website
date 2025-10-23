"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const ADMIN_EMAILS = ["njatabrian648@gmail.com"]; // whitelist admin emails

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // ✅ Detect navbar height dynamically
  useEffect(() => {
    const navbar = document.querySelector("nav, header");
    if (navbar) {
      const height = navbar.getBoundingClientRect().height;
      setNavbarHeight(height);
    }

    const handleResize = () => {
      const nav = document.querySelector("nav, header");
      if (nav) setNavbarHeight(nav.getBoundingClientRect().height);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---------- EMAIL/PASSWORD LOGIN ----------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      const friendlyErrors: Record<string, string> = {
        "No account found with this email":
          "We couldn't find an account with that email.",
        "This account uses Google login":
          "This account is linked with Google. Please sign in with Google.",
        "Invalid email or password": "Your email or password is incorrect.",
      };
      setError(
        friendlyErrors[res.error] || "Something went wrong. Please try again."
      );
      return;
    }

    // Auto-redirect based on email
    if (ADMIN_EMAILS.includes(email)) {
      router.push("/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  // ---------- GOOGLE LOGIN ----------
  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    await signIn("google");
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center bg-gray-100"
      style={{ minHeight: `calc(100vh - ${navbarHeight}px)`, marginTop: navbarHeight }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/recycling-composting.png"
          alt="Login background"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded p-2">
              {error}
            </p>
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm"
        >
          <Image src="/icons/google.svg" alt="Google logo" width={20} height={20} />
          <span>Sign in with Google</span>
        </button>

        <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
          <p>
            Don’t have an account?{" "}
            <a
              href="/auth/register"
              className="text-green-600 font-medium hover:underline"
            >
              Register
            </a>
          </p>
          <p>
            <a
              href="/auth/forgot-password"
              className="text-green-600 font-medium hover:underline"
            >
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
