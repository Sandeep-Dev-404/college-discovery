"use client";

import { useEffect, useState } from "react";
import CollegeCard from "@/components/CollegeCard";
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
  const [compareIds, setCompareIds] = useState<string[]>([]);

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
    } catch (err) {
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

  function addToCompare(college: College) {
    setCompareIds((prev) => {
      if (prev.includes(college.id)) return prev;

      if (prev.length >= 3) {
        alert("You can compare maximum 3 colleges");
        return prev;
      }

      return [...prev, college.id];
    });
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Explore Colleges</h1>
        <p className="mt-2 text-gray-600">
          Search colleges by name, city, fees and rating.
        </p>
      </div>

      <section className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-5">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search college..."
            className="rounded-lg border px-3 py-2 md:col-span-2"
          />

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="rounded-lg border px-3 py-2"
          />

          <input
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
            placeholder="Max fees"
            type="number"
            className="rounded-lg border px-3 py-2"
          />

          <input
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            placeholder="Min rating"
            type="number"
            step="0.1"
            className="rounded-lg border px-3 py-2"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border px-3 py-2"
          >
            <option value="rating-desc">Rating High to Low</option>
            <option value="fees-asc">Fees Low to High</option>
            <option value="fees-desc">Fees High to Low</option>
            <option value="placement-desc">Placement High to Low</option>
          </select>

          <button
            onClick={applyFilters}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Apply Filters
          </button>
        </div>
      </section>

      {compareIds.length > 0 && (
        <div className="mb-6 rounded-xl bg-blue-50 p-4">
          <p className="text-sm">
            {compareIds.length} college(s) selected for comparison.
          </p>

          <Link
            href={`/compare?ids=${compareIds.join(",")}`}
            className="mt-2 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
          >
            Compare Now
          </Link>
        </div>
      )}

      {loading && <p>Loading colleges...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && colleges.length === 0 && (
        <p>No colleges found. Try changing filters.</p>
      )}

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            onCompare={addToCompare}
          />
        ))}
      </section>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}