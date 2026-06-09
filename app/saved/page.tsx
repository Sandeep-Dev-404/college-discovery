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
    return <main className="p-8">Loading saved colleges...</main>;
  }

  if (unauthorized) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-bold">Saved Colleges</h1>
        <p className="mt-3 text-gray-600">Please login to view saved colleges.</p>

        <Link
          href="/login"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">Saved Colleges</h1>

      {items.length === 0 && (
        <p className="mt-4 text-gray-600">You have not saved any colleges yet.</p>
      )}

      <section className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <CollegeCard key={item.id} college={item.college} />
        ))}
      </section>
    </main>
  );
}