"use client";

import Link from "next/link";
import { College } from "@/types";
import toast from "react-hot-toast";

type Props = {
  college: College;
  onCompare?: (college: College) => void;
  showCompare?: boolean;
};

export default function CollegeCard({
  college,
  onCompare,
  showCompare = true,
}: Props) {
  async function saveCollege() {
    try {
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
        toast.error("Please login first to save colleges");
        return;
      }

      if (!response.ok) {
        toast.error("Failed to save college");
        return;
      }

      toast.success(`${college.name} saved!`);
    } catch {
      toast.error("Something went wrong");
    }
  }

  function getRatingColor(rating: number) {
    if (rating >= 4.5) return "bg-green-100 text-green-700";
    if (rating >= 4.0) return "bg-blue-100 text-blue-700";
    if (rating >= 3.5) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  }

  return (
    <div className="group rounded-xl border bg-white p-5 shadow-sm transition duration-200 hover:shadow-lg hover:border-blue-200">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-semibold group-hover:text-blue-600 transition">
            {college.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            📍 {college.city}, {college.state}
          </p>
        </div>

        <span
          className={`ml-2 rounded-full px-2 py-1 text-xs font-bold ${getRatingColor(
            college.rating
          )}`}
        >
          ⭐ {college.rating}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Annual Fees</p>
          <p className="text-sm font-bold text-gray-800">
            ₹{college.fees.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Avg Placement</p>
          <p className="text-sm font-bold text-gray-800">
            ₹{(college.placementAvg / 100000).toFixed(1)}L
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/colleges/${college.id}`}
          className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
        >
          View Details
        </Link>

        <button
          onClick={saveCollege}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm transition hover:bg-gray-50"
          title="Save College"
        >
          ❤️
        </button>

        {showCompare && onCompare && (
          <button
            onClick={() => onCompare(college)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm transition hover:bg-gray-50"
            title="Add to Compare"
          >
            ⚖️
          </button>
        )}
      </div>
    </div>
  );
}