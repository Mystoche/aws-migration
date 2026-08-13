import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Public site layout — Navbar (sticky top) + main content + Footer (sticky bottom).
 * Footer uses mt-auto so it sticks to the viewport bottom on short pages and
 * is pushed down naturally on long pages (no overlap).
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
