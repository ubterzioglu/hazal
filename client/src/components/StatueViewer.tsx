import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const MODEL_SRC = "/models/maussollos.glb";
const MODEL_ALT = "Halikarnassos Mausoleionu'ndan Mausolos heykelinin 3 boyutlu modeli";

const AR_ATTRIBUTES = {
  ar: true,
  "ar-modes": "webxr scene-viewer quick-look",
  "ar-placement": "floor",
  "ar-scale": "auto",
  "xr-environment": true,
} as const;

type Status = "booting" | "ready" | "failed";

interface StatueViewerProps {
  enableAr?: boolean;
  /** Dark scenes need light status text. */
  tone?: "light" | "dark";
  /** Slotted content such as model-viewer's custom AR button. */
  children?: ReactNode;
}

/**
 * The SPA catch-all answers unknown paths with index.html at status 200, so a
 * missing GLB cannot be detected from the status code alone.
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

/** Renders the single Mausolos statue, loading model-viewer only when needed. */
export default function StatueViewer({ enableAr = false, tone = "dark", children }: StatueViewerProps) {
  const [status, setStatus] = useState<Status>("booting");
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!(await modelIsAvailable())) {
        if (!cancelled) setStatus("failed");
        return;
      }
      try {
        await import("@google/model-viewer");
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("failed");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (status !== "ready" || !viewer) return;

    const handleError = () => setStatus("failed");
    viewer.addEventListener("error", handleError);
    return () => viewer.removeEventListener("error", handleError);
  }, [status]);

  const messageColor = tone === "dark" ? "text-white/80" : "text-slate-600";

  if (status === "booting") {
    return (
      <div className={`flex h-full flex-col items-center justify-center gap-3 ${messageColor}`}>
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm">3D sahne hazırlanıyor…</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div role="alert" className={`flex h-full items-center justify-center px-6 text-center text-sm ${messageColor}`}>
        3D model şu anda yüklenemedi. Lütfen sayfayı yenileyin.
      </div>
    );
  }

  return (
    <model-viewer
      ref={viewerRef}
      src={MODEL_SRC}
      alt={MODEL_ALT}
      camera-controls
      touch-action="pan-y"
      shadow-intensity="1"
      loading="eager"
      className="h-full w-full"
      style={{ backgroundColor: "transparent" }}
      {...(enableAr ? AR_ATTRIBUTES : { "auto-rotate": true })}
    >
      {children}
    </model-viewer>
  );
}
