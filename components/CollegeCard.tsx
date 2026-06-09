"use client";

import Link from "next/link";
import { College } from "@/types";

type Props = {
  college: College;
  onCompare?: (college: College) => void;
};

export default function CollegeCard({ college, onCompare }: Props) {
  async function saveCollege() {
    const response = await fetch("/api/saved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collegeId: college.id,
      }),
    });

    if (response.status === 401) {
      alert("Please login first");
      return;
    }

    if (!response.ok) {
      alert("Failed to save college");
      return;
    }

    alert("College saved");
  }

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{college.name}</h2>

      <p className="mt-1 text-sm text-gray-600">
        {college.city}, {college.state}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Fees</p>
          <p className="font-semibold">₹{college.fees.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-gray-500">Rating</p>
          <p className="font-semibold">{college.rating}/5</p>
        </div>

        <div>
          <p className="text-gray-500">Avg Placement</p>
          <p className="font-semibold">
            ₹{college.placementAvg.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Reviews</p>
          <p className="font-semibold">{college._count?.reviews ?? 0}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={`/colleges/${college.id}`}
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
        >
          View Details
        </Link>

        <button
          onClick={saveCollege}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          Save
        </button>

        <button
          onClick={() => onCompare?.(college)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          Compare
        </button>
      </div>
    </div>
  );
}