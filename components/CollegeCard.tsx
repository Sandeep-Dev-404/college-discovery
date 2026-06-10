"use client";

import Link from "next/link";
import { College } from "@/types";
import { toast } from "@/lib/toast";

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
    if (rating >= 4.5) return "bg-emerald-500/10 text-emerald-300";
    if (rating >= 4.0) return "bg-sky-500/10 text-sky-300";
    if (rating >= 3.5) return "bg-amber-500/10 text-amber-300";
    return "bg-rose-500/10 text-rose-300";
  }

  return (
    <div className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/10 transition duration-200 hover:border-white/20 hover:bg-white/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white transition group-hover:text-sky-300">
            {college.name}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            📍 {college.city}, {college.state}
          </p>
        </div>
        <span className={`ml-2 rounded-full px-3 py-1 text-xs font-semibold ${getRatingColor(college.rating)}`}>
          ⭐ {college.rating}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Annual Fees</p>
          <p className="mt-2 text-base font-semibold text-white">
            ₹{college.fees.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Avg Placement</p>
          <p className="mt-2 text-base font-semibold text-white">
            ₹{(college.placementAvg / 100000).toFixed(1)}L
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/colleges/${college.id}`}
          className="flex-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:from-sky-400 hover:to-indigo-400"
        >
          View Details
        </Link>
        <button
          onClick={saveCollege}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/10"
          title="Save College"
        >
          ❤️
        </button>
        {showCompare && onCompare && (
          <button
            onClick={() => onCompare(college)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/10"
            title="Add to Compare"
          >
            ⚖️
          </button>
        )}
      </div>
    </div>
  );
}