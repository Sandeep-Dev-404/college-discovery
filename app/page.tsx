import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold">
          Find the right college for your future
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Search colleges, compare fees and placements, read reviews and save
          your favorite colleges.
        </p>

        <Link
          href="/colleges"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Explore Colleges
        </Link>
      </section>
    </main>
  );
}