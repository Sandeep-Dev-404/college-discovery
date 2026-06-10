"use client";

import { useCallback, useEffect, useState } from "react";
import CollegeCard from "@/components/CollegeCard";
import SkeletonCard from "@/components/SkeletonCard";
import { College } from "@/types";
import Link from "next/link";

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sort, setSort] = useState("rating-desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [compareList, setCompareList] = useState<College[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const fetchColleges = useCallback(
    async (pageNumber = page) => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          q,
          city,
          maxFees,
          minRating,
          sort,
          page: String(pageNumber),
          limit: "6",
        });

        const response = await fetch(`/api/colleges?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch colleges");
        }

        const data = await response.json();
        setColleges(data.items);
        setTotalPages(data.meta.totalPages || 1);
      } catch {
        setError("Something went wrong while loading colleges.");
      } finally {
        setLoading(false);
      }
    },
    [q, city, maxFees, minRating, sort, page]
  );

  useEffect(() => {
    const load = async () => {
      await fetchColleges(page);
    };

    load();
  }, [page, fetchColleges]);

  function applyFilters() {
    setPage(1);
    fetchColleges(1);
  }

  function clearFilters() {
    setQ("");
    setCity("");
    setMaxFees("");
    setMinRating("");
    setSort("rating-desc");
    setPage(1);
    fetchColleges(1);
  }

  function addToCompare(college: College) {
    setCompareList((prev) => {
      if (prev.find((c) => c.id === college.id)) return prev;
      if (prev.length >= 3) return prev;
      return [...prev, college];
    });
  }

  function removeFromCompare(id: string) {
    setCompareList((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Explore Colleges</h1>
            <p className="mt-3 max-w-2xl text-slate-300">
              Search, filter and compare colleges across India.
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="hidden rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10 md:inline-flex"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>

      <section className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          placeholder="🔍 Search by name, city or state..."
          className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
        />

        <button
          onClick={applyFilters}
          className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:from-sky-400 hover:to-indigo-400"
        >
          Search
        </button>
      </section>

      <section
        className={`mb-6 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/10 backdrop-blur-xl ${
          showFilters ? "block" : "hidden md:block"
        }`}
      >
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          />
          <input
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
            placeholder="Max fees (e.g. 300000)"
            type="number"
            className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          />
          <input
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            placeholder="Min rating (e.g. 4.0)"
            type="number"
            step="0.1"
            className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="rating-desc">Rating: High to Low</option>
            <option value="fees-asc">Fees: Low to High</option>
            <option value="fees-desc">Fees: High to Low</option>
            <option value="placement-desc">Placement: High to Low</option>
          </select>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={applyFilters}
            className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:from-sky-400 hover:to-indigo-400"
          >
            Apply Filters
          </button>
          <button
            onClick={() => {
              clearFilters();
              setTimeout(fetchColleges, 100);
            }}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Clear All
          </button>
        </div>
      </section>

      {compareList.length > 0 && (
        <div className="mb-6 rounded-[1.75rem] border border-sky-500/20 bg-slate-950/70 p-5 text-slate-100 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-sky-300">Compare ({compareList.length}/3):</span>
            {compareList.map((college) => (
              <span
                key={college.id}
                className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm text-slate-200"
              >
                {college.name.length > 20 ? `${college.name.substring(0, 20)}...` : college.name}
                <button
                  onClick={() => removeFromCompare(college.id)}
                  className="text-sky-300 transition hover:text-white"
                >
                  ✕
                </button>
              </span>
            ))}
            <Link
              href={`/compare?ids=${compareList.map((c) => c.id).join(",")}`}
              className="ml-auto rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:from-sky-400 hover:to-indigo-400"
            >
              Compare Now →
            </Link>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-[1.75rem] border border-rose-500/20 bg-rose-500/10 p-6 text-rose-100">
          <p>{error}</p>
          <button
            onClick={() => fetchColleges()}
            className="mt-4 rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
          >
            Try Again
          </button>
        </div>
      )}

      {loading && (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </section>
      )}

      {!loading && !error && colleges.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-200 shadow-2xl shadow-slate-950/10">
          <p className="text-5xl">🔍</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">No colleges found</h3>
          <p className="mt-2 text-slate-400">Try changing your search or filters.</p>
        </div>
      )}

      {!loading && (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college) => (
            <CollegeCard key={college.id} college={college} onCompare={addToCompare} />
          ))}
        </section>
      )}

      {!loading && totalPages > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                  p === page
                    ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
                    : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </main>
  );
}