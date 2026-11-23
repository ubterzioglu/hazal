import ArtifactInfo from "@/components/ArtifactInfo";
import AudioToggle from "@/components/AudioToggle";
import StatueViewer from "@/components/StatueViewer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Info, Smartphone } from "lucide-react";
import { Link } from "wouter";

const CONTROL_CLASS =
  "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-slate-900/80 px-3 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Full-screen AR entry point. This is where the printed QR code lands
 * (/qr -> /ar), so information and audio stay one labelled tap away.
 */
export default function ArView() {
  useDocumentMeta({
    title: "AR'da Gör: Mausolos Heykeli | Halikarnassos Mausoleionu",
    description:
      "Bodrum'un kültürel mirasının eksik parçalarından biri olan Mausolos heykelini artırılmış gerçeklik ile bulunduğunuz odaya yerleştirin. MÖ 350 Civarı.",
    path: "/ar",
  });

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-950 to-slate-900">
      <div
        className="pointer-events-none absolute left-4 right-4 z-40 text-white"
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
      >
        <h1 className="font-serif text-lg font-bold">Mausolos Heykeli</h1>
        <p className="text-xs text-white/70">Halikarnassos Mausoleionu • MÖ 350 Civarı</p>
      </div>

      <div className="h-full pb-20">
        <StatueViewer enableAr>
          <button
            slot="ar-button"
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-xl transition-colors hover:bg-amber-700"
          >
            <Smartphone className="h-5 w-5" />
            Odana Yerleştir
          </button>
        </StatueViewer>
      </div>

      <div
        className="absolute left-4 right-4 z-40 flex gap-2"
        style={{ bottom: "calc(max(0.5rem, env(safe-area-inset-bottom)) + 1.25rem)" }}
      >
        <Sheet>
          <SheetTrigger asChild>
            <button type="button" className={CONTROL_CLASS}>
              <Info className="h-5 w-5" aria-hidden="true" />
              Bilgi Al
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-white">
            <SheetHeader>
              <SheetTitle className="font-serif text-xl text-slate-900">Heykel Hakkında</SheetTitle>
              <SheetDescription>Künye ve açıklama</SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-6">
              <ArtifactInfo />
              <Link
                href="/"
                className="mt-5 block text-center text-sm font-medium text-amber-700 underline-offset-4 hover:underline"
              >
                Ana sayfaya git
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <AudioToggle idleLabel="Sesli Tasvir" activeLabel="Sesi Kapat" className={CONTROL_CLASS} />
      </div>

      <p
        className="pointer-events-none absolute left-0 right-0 text-center text-[10px] text-white/50"
        style={{ bottom: "max(0.25rem, env(safe-area-inset-bottom))" }}
      >
        3D model: artfletch • CC BY 4.0 • Sketchfab
      </p>
    </div>
  );
}
