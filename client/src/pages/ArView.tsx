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
import type { Language } from "@/content/artifact";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Info, Smartphone } from "lucide-react";
import { Link } from "wouter";

const CONTROL_CLASS =
  "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-slate-900/80 px-3 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Labels for the controls; each row of buttons speaks one language. */
const CONTROLS: Record<
  Language,
  { info: string; sheetTitle: string; sheetDescription: string; home: string; audio: string; audioStop: string }
> = {
  tr: {
    info: "Bilgi Al",
    sheetTitle: "Heykel Hakkında",
    sheetDescription: "Künye ve açıklama",
    home: "Ana sayfaya git",
    audio: "Sesli Tasvir",
    audioStop: "Sesi Kapat",
  },
  en: {
    info: "Info (EN)",
    sheetTitle: "About the Statue",
    sheetDescription: "Record and description",
    home: "Go to home page",
    audio: "Audio (EN)",
    audioStop: "Stop Audio",
  },
};

/** One row: information sheet and audio description, both in the same language. */
function ControlRow({ language }: { language: Language }) {
  const copy = CONTROLS[language];

  return (
    <div className="flex gap-2" lang={language}>
      <Sheet>
        <SheetTrigger asChild>
          <button type="button" className={CONTROL_CLASS}>
            <Info className="h-5 w-5" aria-hidden="true" />
            {copy.info}
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-white">
          <SheetHeader>
            <SheetTitle className="font-serif text-xl text-slate-900">{copy.sheetTitle}</SheetTitle>
            <SheetDescription>{copy.sheetDescription}</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-6">
            <ArtifactInfo initialLanguage={language} />
            <Link
              href="/"
              className="mt-5 block text-center text-sm font-medium text-amber-700 underline-offset-4 hover:underline"
            >
              {copy.home}
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <AudioToggle
        language={language}
        idleLabel={copy.audio}
        activeLabel={copy.audioStop}
        className={CONTROL_CLASS}
      />
    </div>
  );
}

/**
 * Full-screen AR entry point. This is where the printed QR code lands
 * (/qr -> /ar), so information and audio stay one labelled tap away,
 * in Turkish and in English.
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

      <div className="h-full pb-36">
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
        className="absolute left-4 right-4 z-40 flex flex-col gap-2"
        style={{ bottom: "calc(max(0.5rem, env(safe-area-inset-bottom)) + 1.25rem)" }}
      >
        <ControlRow language="tr" />
        <ControlRow language="en" />
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
