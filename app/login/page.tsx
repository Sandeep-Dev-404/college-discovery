"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      alert("Invalid email or password");
      return;
    }

    router.push("/colleges");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <form
        onSubmit={handleLogin}
        className="rounded-xl bg-white p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-5 w-full rounded-lg border px-3 py-2"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="mt-3 w-full rounded-lg border px-3 py-2"
        />

        <button className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 text-white">
          Login
        </button>

        <p className="mt-4 text-sm text-gray-600">
          No account?{" "}
          <Link href="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </form>
    </main>
  );
}