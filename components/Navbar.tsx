"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          🎓 CollegeDiscovery
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-5 text-sm md:flex">
          <Link
            href="/colleges"
            className="rounded-lg px-3 py-2 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Colleges
          </Link>

          <Link
            href="/compare"
            className="rounded-lg px-3 py-2 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Compare
          </Link>

          <Link
            href="/saved"
            className="rounded-lg px-3 py-2 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Saved
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-200 px-3 py-2 text-red-600 transition hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="rounded-lg border px-3 py-2 transition hover:bg-gray-50"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/colleges"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-blue-50"
            >
              Colleges
            </Link>

            <Link
              href="/compare"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-blue-50"
            >
              Compare
            </Link>

            <Link
              href="/saved"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-blue-50"
            >
              Saved
            </Link>

            {user ? (
              <>
                <p className="px-3 text-sm text-gray-500">
                  Logged in as {user.name}
                </p>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="rounded-lg border border-red-200 px-3 py-2 text-left text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border px-3 py-2 text-center"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-center text-white"
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