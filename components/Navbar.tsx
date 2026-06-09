import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          CollegeDiscovery
        </Link>

        <div className="flex gap-4 text-sm">
          <Link href="/colleges" className="hover:text-blue-600">
            Colleges
          </Link>
          <Link href="/compare" className="hover:text-blue-600">
            Compare
          </Link>
          <Link href="/saved" className="hover:text-blue-600">
            Saved
          </Link>
          <Link href="/login" className="hover:text-blue-600">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}