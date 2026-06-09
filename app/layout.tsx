import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

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
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Toaster position="top-right" />
        <Navbar />
        <div className="pb-16">{children}</div>

        <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
          <p>© 2025 CollegeDiscovery. Built with Next.js, Prisma & TailwindCSS.</p>
        </footer>
      </body>
    </html>
  );
}