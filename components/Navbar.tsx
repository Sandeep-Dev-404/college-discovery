"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch {
        setUser(null);
      }
    }

    checkAuth();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-sm text-slate-100">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          🎓 CollegeDiscovery
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/colleges"
            className="rounded-full px-4 py-2 transition hover:bg-white/10"
          >
            Colleges
          </Link>
          <Link
            href="/compare"
            className="rounded-full px-4 py-2 transition hover:bg-white/10"
          >
            Compare
          </Link>
          <Link
            href="/saved"
            className="rounded-full px-4 py-2 transition hover:bg-white/10"
          >
            Saved
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-sm shadow-slate-950/20">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-red-400/20 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="rounded-full border border-white/10 px-4 py-2 text-white transition hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-white transition hover:from-sky-400 hover:to-indigo-400"
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 text-slate-100 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/colleges"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 transition hover:bg-white/10"
            >
              Colleges
            </Link>
            <Link
              href="/compare"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 transition hover:bg-white/10"
            >
              Compare
            </Link>
            <Link
              href="/saved"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 transition hover:bg-white/10"
            >
              Saved
            </Link>

            {user ? (
              <>
                <p className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-300">
                  Logged in as {user.name}
                </p>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="rounded-2xl border border-red-500/20 px-4 py-3 text-left text-red-300 transition hover:bg-red-500/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-center text-white transition hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-3 text-center text-white transition hover:from-sky-400 hover:to-indigo-400"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}