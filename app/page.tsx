import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-600 via-indigo-600 to-fuchsia-600 p-8 text-white shadow-2xl shadow-slate-950/20 md:p-14">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/90">
            Discover the best colleges with confidence
          </p>
          <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Find the right college
            <br />
            for your future.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-slate-100/90 md:text-lg">
            Search colleges, compare fees and placements, read reviews, and save your favorites — all in one beautiful student-friendly experience.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/colleges"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Explore Colleges
            </Link>
            <Link
              href="/compare"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Compare Colleges
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10">
          <div className="text-4xl">🔍</div>
          <h3 className="mt-4 text-xl font-semibold text-white">Search & Filter</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Search colleges by name, city, fees and rating to find the best match for you.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10">
          <div className="text-4xl">⚖️</div>
          <h3 className="mt-4 text-xl font-semibold text-white">Compare Side by Side</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Compare 2–3 colleges on fees, placements, ratings and location to make smarter decisions.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10">
          <div className="text-4xl">💾</div>
          <h3 className="mt-4 text-xl font-semibold text-white">Save Favorites</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Login and save your favorite colleges so you can return to them anytime.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-[1.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
        <h2 className="text-center text-3xl font-semibold text-white">Trusted by Students Across India</h2>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="rounded-3xl bg-slate-950/60 p-5 text-center">
            <p className="text-3xl font-semibold text-sky-300">12+</p>
            <p className="mt-2 text-sm text-slate-400">Colleges Listed</p>
          </div>
          <div className="rounded-3xl bg-slate-950/60 p-5 text-center">
            <p className="text-3xl font-semibold text-indigo-300">50+</p>
            <p className="mt-2 text-sm text-slate-400">Courses Available</p>
          </div>
          <div className="rounded-3xl bg-slate-950/60 p-5 text-center">
            <p className="text-3xl font-semibold text-fuchsia-300">24+</p>
            <p className="mt-2 text-sm text-slate-400">Student Reviews</p>
          </div>
          <div className="rounded-3xl bg-slate-950/60 p-5 text-center">
            <p className="text-3xl font-semibold text-emerald-300">8+</p>
            <p className="mt-2 text-sm text-slate-400">Cities Covered</p>
          </div>
        </div>
      </section>
    </main>
  );
}