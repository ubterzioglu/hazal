import ArGuide from "@/components/ArGuide";
import ArtifactInfo from "@/components/ArtifactInfo";
import AudioToggle from "@/components/AudioToggle";
import StatueViewer from "@/components/StatueViewer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AR_GUIDE_ID, artifact } from "@/content/artifact";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { BookOpen, Zap, Volume2, Info, Smartphone } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

/**
 * Mausolos AR Experience
 *
 * Design Philosophy: Museum Elegance meets Modern AR
 * - Sophisticated typography with serif headers and clean body text
 * - Marble-inspired color palette (warm grays, cream, gold accents)
 * - Generous whitespace and vertical rhythm
 * - Smooth transitions and interactive elements
 * - Museum-quality presentation
 */

export default function Home() {
  const [showInfo, setShowInfo] = useState(true);

  useDocumentMeta({
    title: "Mausolos Heykeli AR Deneyimi | Halikarnassos Mausoleionu",
    description: "Bodrum'un kültürel mirasının eksik parçalarından biri olan Mausolos heykelini artırılmış gerçeklik (AR) ile 3 boyutlu keşfedin. Halikarnassos Mausoleionu, MÖ 350 Civarı.",
    path: "/",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-slate-900">Mausolos</h1>
              <p className="text-xs text-slate-500">AR Deneyimi</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600">Bodrum</p>
            <p className="text-xs text-slate-400">MÖ 350 Civarı</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Model Viewer */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg border-0 bg-white">
              <div className="aspect-[4/5] sm:aspect-video bg-gradient-to-br from-slate-900 to-slate-800 relative">
                <StatueViewer />
                <p className="pointer-events-none absolute bottom-1 left-0 right-0 text-center text-[10px] text-white/60">
                  3D model: artfletch • CC BY 4.0 • Sketchfab
                </p>
              </div>
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                  {artifact.title}
                </h2>
                <p className="text-sm text-slate-600 mb-4">{artifact.subtitle}</p>

                {/* AR deneyimine giriş — QR kodu da buraya (/qr -> /ar) düşer */}
                <Link
                  href="/ar"
                  className="mb-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
                >
                  <Smartphone className="h-5 w-5" />
                  AR'da Gör — Odana Yerleştir
                </Link>
                <a
                  href={`#${AR_GUIDE_ID}`}
                  className="mb-4 block text-center text-sm font-medium text-amber-700 underline-offset-4 hover:underline"
                >
                  Nasıl yerleştirilir? Adım adım gör
                </a>

                {/* Audio Description */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200/50">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Sesli Tasvir</p>
                        <p className="text-xs text-slate-600">Heykelin hikayesini dinleyin</p>
                      </div>
                    </div>
                    <AudioToggle
                      idleLabel="Oynat"
                      activeLabel="Durdur"
                      className="inline-flex shrink-0 items-center gap-2 rounded-md bg-amber-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Information Panel */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Info Toggle */}
              <Button
                onClick={() => setShowInfo(!showInfo)}
                variant="outline"
                className="w-full justify-start gap-2 border-slate-200 hover:bg-slate-50"
              >
                <Info className="w-4 h-4" />
                {showInfo ? "Detayları Gizle" : "Detayları Göster"}
              </Button>

              {showInfo && (
                <Card className="p-6 border-0 shadow-lg bg-white">
                  <ArtifactInfo />
                </Card>
              )}

              {/* QR Kod Bölümü */}
              <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 text-center">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
                  Deneyimi Paylaş
                </p>
                <div className="bg-white rounded-lg p-4 mb-4 inline-block border border-slate-200">
                  <img src="/qr-code.png" alt="QR Kod" className="w-40 h-40" />
                </div>
                <p className="text-xs text-slate-600">
                  Tarayın: AR deneyimi mobil cihazınızda açılır
                </p>
              </Card>
            </div>
          </div>
        </div>

        <ArGuide />

        {/* Metodoloji Linki */}
        <div className="mt-12 pt-8 border-t border-slate-200/50 mb-8">
          <div className="flex justify-center">
            <a
              href="/metodoloji"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors border border-amber-200 font-semibold"
            >
              <BookOpen className="w-5 h-5" />
              Metodoloji - Nasıl Yapıldığını Öğren
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
