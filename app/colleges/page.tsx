"use client";

import { useEffect, useState } from "react";
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

  async function fetchColleges() {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        q,
        city,
        maxFees,
        minRating,
        sort,
        page: String(page),
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
  }

  useEffect(() => {
    fetchColleges();
  }, [page, sort]);

  function applyFilters() {
    setPage(1);
    fetchColleges();
  }

  function clearFilters() {
    setQ("");
    setCity("");
    setMaxFees("");
    setMinRating("");
    setSort("rating-desc");
    setPage(1);
  }

  function addToCompare(college: College) {
    setCompareList((prev) => {
      if (prev.find((c) => c.id === college.id)) return prev;

      if (prev.length >= 3) {
        return prev;
      }

      return [...prev, college];
    });
  }

  function removeFromCompare(id: string) {
    setCompareList((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Explore Colleges</h1>
        <p className="mt-2 text-gray-600">
          Search, filter and compare colleges across India.
        </p>
      </div>

      {/* Search Bar */}
      <section className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          placeholder="🔍 Search by name, city or state..."
          className="flex-1 rounded-lg border px-4 py-3 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        <button
          onClick={applyFilters}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Search
        </button>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="rounded-lg border px-4 py-3 transition hover:bg-gray-50 md:hidden"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </section>

      {/* Filters */}
      <section
        className={`mb-6 rounded-xl border bg-white p-4 shadow-sm ${
          showFilters ? "block" : "hidden md:block"
        }`}
      >
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="rounded-lg border px-3 py-2 transition focus:border-blue-400 focus:outline-none"
          />

          <input
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
            placeholder="Max fees (e.g. 300000)"
            type="number"
            className="rounded-lg border px-3 py-2 transition focus:border-blue-400 focus:outline-none"
          />

          <input
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            placeholder="Min rating (e.g. 4.0)"
            type="number"
            step="0.1"
            className="rounded-lg border px-3 py-2 transition focus:border-blue-400 focus:outline-none"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border px-3 py-2 transition focus:border-blue-400 focus:outline-none"
          >
            <option value="rating-desc">Rating: High to Low</option>
            <option value="fees-asc">Fees: Low to High</option>
            <option value="fees-desc">Fees: High to Low</option>
            <option value="placement-desc">Placement: High to Low</option>
          </select>
        </div>

        <div className="mt-3 flex gap-3">
          <button
            onClick={applyFilters}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
          >
            Apply Filters
          </button>

          <button
            onClick={() => {
              clearFilters();
              setTimeout(fetchColleges, 100);
            }}
            className="rounded-lg border px-4 py-2 text-sm transition hover:bg-gray-50"
          >
            Clear All
          </button>
        </div>
      </section>

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-blue-700">
              Compare ({compareList.length}/3):
            </span>

            {compareList.map((college) => (
              <span
                key={college.id}
                className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm shadow-sm"
              >
                {college.name.length > 20
                  ? college.name.substring(0, 20) + "..."
                  : college.name}
                <button
                  onClick={() => removeFromCompare(college.id)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}

            <Link
              href={`/compare?ids=${compareList.map((c) => c.id).join(",")}`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Compare Now →
            </Link>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchColleges}
            className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </section>
      )}

      {/* Empty State */}
      {!loading && !error && colleges.length === 0 && (
        <div className="rounded-xl border bg-white p-8 text-center">
          <p className="text-4xl">🔍</p>
          <h3 className="mt-3 text-lg font-semibold">No colleges found</h3>
          <p className="mt-1 text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* College Cards */}
      {!loading && (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              onCompare={addToCompare}
            />
          ))}
        </section>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border px-4 py-2 transition hover:bg-gray-50 disabled:opacity-50"
          >
            ← Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-9 w-9 rounded-lg text-sm transition ${
                  p === page
                    ? "bg-blue-600 text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border px-4 py-2 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </main>
  );
}