"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      alert("Signup failed");
      return;
    }

    router.push("/colleges");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <form
        onSubmit={handleSignup}
        className="rounded-xl bg-white p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold">Create Account</h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="mt-5 w-full rounded-lg border px-3 py-2"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-3 w-full rounded-lg border px-3 py-2"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="mt-3 w-full rounded-lg border px-3 py-2"
        />

        <button className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 text-white">
          Signup
        </button>
      </form>
    </main>
  );
}