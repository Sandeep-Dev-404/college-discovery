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
    return <main className="p-8">Loading comparison...</main>;
  }

  if (error) {
    return <main className="p-8 text-red-600">{error}</main>;
  }

  if (colleges.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-bold">Compare Colleges</h1>
        <p className="mt-3 text-gray-600">
          Go to the colleges page and select 2 or 3 colleges to compare.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">Compare Colleges</h1>

      <div className="mt-6 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-4">Feature</th>
              {colleges.map((college) => (
                <th key={college.id} className="p-4">
                  {college.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-4 font-semibold">Location</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-4">
                  {college.city}, {college.state}
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-semibold">Fees</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-4">
                  ₹{college.fees.toLocaleString()}
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-semibold">Rating</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-4">
                  {college.rating}/5
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-semibold">Average Placement</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-4">
                  ₹{college.placementAvg.toLocaleString()}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-semibold">Highest Placement</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-4">
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