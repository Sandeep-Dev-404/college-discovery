"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(
          typeof data.error === "string" ? data.error : "Signup failed"
        );
        setLoading(false);
        return;
      }

      toast.success("Account created successfully!");
      router.push("/colleges");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <form
        onSubmit={handleSignup}
        className="rounded-xl bg-white p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="mt-1 text-sm text-gray-500">
          Join CollegeDiscovery to save and compare colleges.
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          className="mt-5 w-full rounded-lg border px-3 py-3 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="mt-3 w-full rounded-lg border px-3 py-3 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 6 characters)"
          type="password"
          required
          className="mt-3 w-full rounded-lg border px-3 py-3 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        <button
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}