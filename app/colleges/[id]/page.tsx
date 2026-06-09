"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { College } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CollegeDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function fetchCollege() {
      try {
        setLoading(true);

        const response = await fetch(`/api/colleges/${id}`);

        if (response.status === 404) {
          setError("College not found");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch college");
        }

        const data = await response.json();
        setCollege(data);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchCollege();
  }, [id]);

  async function saveCollege() {
    const response = await fetch("/api/saved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collegeId: id }),
    });

    if (response.status === 401) {
      toast.error("Please login first");
      return;
    }

    if (response.ok) {
      toast.success("College saved!");
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/2 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-40 rounded-xl bg-gray-100" />
        </div>
      </main>
    );
  }

  if (error || !college) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8 text-center">
        <p className="text-5xl">😕</p>
        <h2 className="mt-3 text-xl font-bold">{error}</h2>
        <Link
          href="/colleges"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Back to Colleges
        </Link>
      </main>
    );
  }

  const tabs = ["overview", "courses", "placements", "reviews"];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Back Button */}
      <Link
        href="/colleges"
        className="mb-4 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
      >
        ← Back to Colleges
      </Link>

      {/* Header */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{college.name}</h1>
            <p className="mt-1 text-gray-600">
              📍 {college.city}, {college.state}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={saveCollege}
              className="rounded-lg border px-4 py-2 text-sm transition hover:bg-gray-50"
            >
              ❤️ Save
            </button>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              ⭐ {college.rating}/5
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-xs text-gray-500">Annual Fees</p>
            <p className="text-lg font-bold text-blue-700">
              ₹{college.fees.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-xs text-gray-500">Avg Placement</p>
            <p className="text-lg font-bold text-green-700">
              ₹{(college.placementAvg / 100000).toFixed(1)}L
            </p>
          </div>

          <div className="rounded-lg bg-purple-50 p-4">
            <p className="text-xs text-gray-500">Highest Placement</p>
            <p className="text-lg font-bold text-purple-700">
              ₹{college.placementHigh ? (college.placementHigh / 100000).toFixed(0) + "L" : "N/A"}
            </p>
          </div>

          <div className="rounded-lg bg-orange-50 p-4">
            <p className="text-xs text-gray-500">Total Reviews</p>
            <p className="text-lg font-bold text-orange-700">
              {college.reviews?.length || 0}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 overflow-x-auto rounded-lg bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium capitalize transition ${
              activeTab === tab
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <section className="mt-4 rounded-xl bg-white p-6 shadow-sm">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-bold">About {college.name}</h2>
            <p className="mt-3 leading-relaxed text-gray-700">
              {college.overview}
            </p>
          </div>
        )}

        {activeTab === "courses" && (
          <div>
            <h2 className="text-xl font-bold">Courses Offered</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {college.courses?.map((course) => (
                <div
                  key={course.id}
                  className="rounded-lg border p-4 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <p className="font-semibold">{course.name}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Duration: {course.duration}
                  </p>
                  <p className="text-sm text-gray-600">
                    Fees: ₹{course.fees.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "placements" && (
          <div>
            <h2 className="text-xl font-bold">Placement Statistics</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-5">
                <p className="text-sm text-gray-500">Average Package</p>
                <p className="mt-1 text-2xl font-bold text-green-600">
                  ₹{(college.placementAvg / 100000).toFixed(1)} LPA
                </p>
              </div>
              <div className="rounded-lg border p-5">
                <p className="text-sm text-gray-500">Highest Package</p>
                <p className="mt-1 text-2xl font-bold text-blue-600">
                  ₹
                  {college.placementHigh
                    ? (college.placementHigh / 100000).toFixed(0) + " LPA"
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h2 className="text-xl font-bold">Student Reviews</h2>
            <div className="mt-4 grid gap-3">
              {college.reviews?.map((review) => (
                <div key={review.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.userName}</p>
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-700">
                      ⭐ {review.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}

              {(!college.reviews || college.reviews.length === 0) && (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}