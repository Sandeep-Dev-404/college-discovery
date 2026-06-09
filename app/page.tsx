import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero Section */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white md:p-14">
        <h1 className="text-3xl font-bold md:text-5xl">
          Find the right college
          <br />
          for your future
        </h1>

        <p className="mt-4 max-w-xl text-blue-100 md:text-lg">
          Search colleges, compare fees and placements, read reviews and save
          your favorite colleges — all in one place.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/colleges"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Explore Colleges
          </Link>

          <Link
            href="/compare"
            className="rounded-lg border border-white px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-700"
          >
            Compare Colleges
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="text-3xl">🔍</div>
          <h3 className="mt-3 text-lg font-semibold">Search & Filter</h3>
          <p className="mt-2 text-sm text-gray-600">
            Search colleges by name, city, fees and rating. Find the perfect
            match for you.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="text-3xl">⚖️</div>
          <h3 className="mt-3 text-lg font-semibold">Compare Side by Side</h3>
          <p className="mt-2 text-sm text-gray-600">
            Compare 2–3 colleges on fees, placements, ratings and location to
            make better decisions.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="text-3xl">💾</div>
          <h3 className="mt-3 text-lg font-semibold">Save Favorites</h3>
          <p className="mt-2 text-sm text-gray-600">
            Login and save your favorite colleges. Access them anytime from your
            saved list.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-12 rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-center text-2xl font-bold">
          Trusted by Students Across India
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">12+</p>
            <p className="mt-1 text-sm text-gray-600">Colleges Listed</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">50+</p>
            <p className="mt-1 text-sm text-gray-600">Courses Available</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">24+</p>
            <p className="mt-1 text-sm text-gray-600">Student Reviews</p>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">8+</p>
            <p className="mt-1 text-sm text-gray-600">Cities Covered</p>
          </div>
        </div>
      </section>
    </main>
  );
}