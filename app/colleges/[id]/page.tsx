"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { College } from "@/types";

export default function CollegeDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <main className="p-8">Loading college details...</main>;
  }

  if (error || !college) {
    return <main className="p-8 text-red-600">{error}</main>;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{college.name}</h1>

        <p className="mt-2 text-gray-600">
          {college.city}, {college.state}
        </p>

        <p className="mt-6 text-gray-700">{college.overview}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Fees</p>
            <p className="font-bold">₹{college.fees.toLocaleString()}</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Rating</p>
            <p className="font-bold">{college.rating}/5</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Avg Placement</p>
            <p className="font-bold">
              ₹{college.placementAvg.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Highest Placement</p>
            <p className="font-bold">
              ₹{college.placementHigh?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Courses</h2>

        <div className="mt-4 grid gap-3">
          {college.courses?.map((course) => (
            <div key={course.id} className="rounded-lg border p-4">
              <p className="font-semibold">{course.name}</p>
              <p className="text-sm text-gray-600">
                Duration: {course.duration}
              </p>
              <p className="text-sm text-gray-600">
                Fees: ₹{course.fees.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Reviews</h2>

        <div className="mt-4 grid gap-3">
          {college.reviews?.map((review) => (
            <div key={review.id} className="rounded-lg border p-4">
              <p className="font-semibold">{review.userName}</p>
              <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}