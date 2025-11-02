"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // ✅ Detect navbar height dynamically (adjusts based on layout)
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

    // ✅ Universal redirect (role handled in /dashboard/page.tsx)
    router.push("/dashboard");
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
      style={{
        minHeight: `calc(100vh - ${navbarHeight}px)`,
        marginTop: navbarHeight,
      }}
    >
      {/* ✅ Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/recycling-composting.webp"
          alt="Login background"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* ✅ Login Card */}
      <div className="relative z-20 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded p-2">
              {error}
            </p>
          )}

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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full py-3 
                     border border-gray-300 rounded-lg font-medium 
                     text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm"
        >
          <Image src="/icons/google.svg" alt="Google logo" width={20} height={20} />
          <span>Sign in with Google</span>
        </button>

        {/* Footer Links */}
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
