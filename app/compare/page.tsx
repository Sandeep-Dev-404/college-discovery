"use client";

import { useEffect, useState } from "react";
import { College } from "@/types";

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadColleges() {
      try {
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const ids = params.get("ids")?.split(",").filter(Boolean) || [];

        if (ids.length === 0) {
          setColleges([]);
          return;
        }

        const results = await Promise.all(
          ids.map(async (id) => {
            const response = await fetch(`/api/colleges/${id}`);
            if (!response.ok) return null;
            return response.json();
          })
        );

        setColleges(results.filter(Boolean));
      } catch {
        setError("Failed to load comparison");
      } finally {
        setLoading(false);
      }
    }

    loadColleges();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 text-center text-slate-300">
        Loading comparison...
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 text-center text-rose-300">
        {error}
      </main>
    );
  }

  if (colleges.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl font-semibold text-white">Compare Colleges</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Go to the colleges page and select 2 or 3 colleges to compare.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
        <h1 className="text-4xl font-semibold text-white">Compare Colleges</h1>
      </div>

      <div className="overflow-x-auto rounded-4xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/10">
        <table className="w-full min-w-[720px] border-collapse text-left text-slate-100">
          <thead>
            <tr className="border-b border-white/10 bg-slate-950/80">
              <th className="p-5 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">Feature</th>
              {colleges.map((college) => (
                <th key={college.id} className="p-5 text-sm font-semibold text-white">
                  {college.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10">
              <td className="p-5 font-semibold text-slate-200">Location</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-5 text-slate-300">
                  {college.city}, {college.state}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/10">
              <td className="p-5 font-semibold text-slate-200">Fees</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-5 text-slate-300">
                  ₹{college.fees.toLocaleString()}
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/10">
              <td className="p-5 font-semibold text-slate-200">Rating</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-5 text-slate-300">
                  {college.rating}/5
                </td>
              ))}
            </tr>
            <tr className="border-b border-white/10">
              <td className="p-5 font-semibold text-slate-200">Average Placement</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-5 text-slate-300">
                  ₹{college.placementAvg.toLocaleString()}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-5 font-semibold text-slate-200">Highest Placement</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-5 text-slate-300">
                  ₹{college.placementHigh?.toLocaleString() || "N/A"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}