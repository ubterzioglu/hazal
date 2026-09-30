import { Info } from "lucide-react";
import { Link } from "wouter";

/**
 * Floating "i" button shown on top of the AR scene. Navigates to the main
 * site in the same tab so the browser back button returns to AR.
 */
export default function InfoFab() {
  return (
    <Link
      href="/"
      aria-label="Bilgi sayfasına git"
      title="Bilgi sayfasına git"
      className="fixed right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      style={{ top: "max(1rem, env(safe-area-inset-top))" }}
    >
      <Info className="h-6 w-6" />
    </Link>
  );
}
