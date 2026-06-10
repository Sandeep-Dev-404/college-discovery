import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "College Discovery Platform",
  description: "Search, compare and save colleges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>

        <footer className="border-t border-white/10 bg-slate-950/80 py-6 text-center text-sm text-slate-500">
          <p>© 2025 CollegeDiscovery. Built with Next.js, Prisma & TailwindCSS.</p>
        </footer>
      </body>
    </html>
  );
}