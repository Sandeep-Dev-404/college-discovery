"use client";

import { useEffect, useState } from "react";
import CollegeCard from "@/components/CollegeCard";
import { College } from "@/types";
import Link from "next/link";

type SavedItem = {
  id: string;
  college: College;
};

export default function SavedPage() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    async function loadSaved() {
      const response = await fetch("/api/saved");

      if (response.status === 401) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setItems(data.items);
      setLoading(false);
    }

    loadSaved();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center text-slate-300">
        Loading saved colleges...
      </main>
    );
  }

  if (unauthorized) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-4xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
          <h1 className="text-4xl font-semibold text-white">Saved Colleges</h1>
          <p className="mt-3 text-slate-400">Please login to view saved colleges.</p>
          <Link
            href="/login"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:from-sky-400 hover:to-indigo-400"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Saved Colleges</h1>
            <p className="mt-2 text-slate-400">
              Your bookmarked colleges are stored here for quick access.
            </p>
          </div>
          <Link
            href="/colleges"
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Browse more colleges
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-300 shadow-2xl shadow-slate-950/10">
          <p className="text-5xl">📚</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">No saved colleges yet</h2>
          <p className="mt-2 text-slate-400">Save colleges from the list to view them here later.</p>
        </div>
      ) : (
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <CollegeCard key={item.id} college={item.college} />
          ))}
        </section>
      )}
    </main>
  );
}
