import InfoFab from "@/components/InfoFab";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Loader2, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Full-screen AR entry point. This is where the printed QR code lands
 * (/qr -> /ar), so it has to degrade gracefully rather than ever show a
 * broken page to a museum visitor.
 */

const MODEL_SRC = "/models/maussollos.glb";
const SKETCHFAB_EMBED =
  "https://sketchfab.com/models/1f1d2b9ce3ba46e28abd4408106aa732/embed?autospin=1&autostart=1";

type Status = "booting" | "ready" | "fallback";

/**
 * The SPA catch-all answers unknown paths with index.html at status 200, so a
 * missing GLB cannot be detected from the status code alone — the content type
 * has to be checked too.
 */
async function modelIsAvailable(): Promise<boolean> {
  try {
    const response = await fetch(MODEL_SRC, { method: "HEAD" });
    const contentType = response.headers.get("content-type") ?? "";
    return response.ok && !contentType.includes("text/html");
  } catch {
    return false;
  }
}

export default function ArView() {
  const [status, setStatus] = useState<Status>("booting");
  const viewerRef = useRef<HTMLElement>(null);

  useDocumentMeta({
    title: "AR'da Gör: Maussollos Heykeli | Halikarnassos Mausolesi",
    description:
      "Maussollos heykelini artırılmış gerçeklik ile bulunduğunuz odaya yerleştirin. British Museum koleksiyonundan, Halikarnassos Mausolesi, M.Ö. 350.",
    path: "/ar",
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!(await modelIsAvailable())) {
        if (!cancelled) setStatus("fallback");
        return;
      }
      try {
        await import("@google/model-viewer");
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("fallback");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Second line of defence: a model that 404s later, or fails to parse, still
  // has to end up on the Sketchfab fallback instead of an empty black screen.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (status !== "ready" || !viewer) return;

    const handleError = () => setStatus("fallback");
    viewer.addEventListener("error", handleError);
    return () => viewer.removeEventListener("error", handleError);
  }, [status]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-950 to-slate-900">
      <InfoFab />

      <div
        className="pointer-events-none absolute left-4 z-40 text-white"
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
      >
        <h1 className="font-serif text-lg font-bold">Maussollos Heykeli</h1>
        <p className="text-xs text-white/70">Halikarnassos Mausolesi • M.Ö. 350</p>
      </div>

      {status === "booting" && (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-white/80">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm">3D sahne hazırlanıyor…</p>
        </div>
      )}

      {status === "ready" && (
        <model-viewer
          ref={viewerRef}
          src={MODEL_SRC}
          alt="Halikarnassos Mausolesi'nden Maussollos heykelinin 3 boyutlu modeli"
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-placement="floor"
          ar-scale="auto"
          camera-controls
          touch-action="pan-y"
          shadow-intensity="1"
          xr-environment
          loading="eager"
          className="h-full w-full"
          style={{ backgroundColor: "transparent" }}
        >
          <button
            slot="ar-button"
            className="absolute bottom-24 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-xl transition-colors hover:bg-amber-700"
          >
            <Smartphone className="h-5 w-5" />
            Odana Yerleştir
          </button>
        </model-viewer>
      )}

      {status === "fallback" && (
        <div className="flex h-full flex-col">
          <iframe
            title="Maussollos Statue 3D Model"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src={SKETCHFAB_EMBED}
            className="w-full flex-1"
          />
          <p className="bg-slate-900 px-4 py-3 text-center text-xs text-white/70">
            AR modeli hazırlanıyor. Şimdilik heykeli 3 boyutlu olarak döndürerek
            inceleyebilirsiniz.
          </p>
        </div>
      )}

      <p
        className="pointer-events-none absolute left-0 right-0 text-center text-[10px] text-white/50"
        style={{ bottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        3D model: artfletch • CC BY 4.0 • Sketchfab
      </p>
    </div>
  );
}
