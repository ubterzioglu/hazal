import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Loader2, BookOpen, Zap, Volume2, Info } from "lucide-react";
import { useState, useRef } from "react";

/**
 * Maussollos AR Experience
 * 
 * Design Philosophy: Classical Elegance meets Modern AR
 * - Sophisticated typography with serif headers and clean body text
 * - Marble-inspired color palette (warm grays, cream, gold accents)
 * - Generous whitespace and vertical rhythm
 * - Smooth transitions and interactive elements
 * - Museum-quality presentation
 */

export default function Home() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showInfo, setShowInfo] = useState(true);

  useDocumentMeta({
    title: "Maussollos Heykeli AR Deneyimi | British Museum - Halikarnassos Mausolesi",
    description: "Halikarnassos Mausolesi'nden Maussollos heykelini British Museum koleksiyonundan artırılmış gerçeklik (AR) ile tarayıcınızda 3 boyutlu keşfedin. Klasik Yunan sanatı, M.Ö. 350, sesli tasvir ve interaktif 3D model.",
    path: "/",
  });

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play();
        setIsPlayingAudio(true);
      }
    }
  };

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
              <h1 className="text-xl font-serif font-bold text-slate-900">Maussollos</h1>
              <p className="text-xs text-slate-500">AR Deneyimi</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600">British Museum</p>
            <p className="text-xs text-slate-400">Klasik Yunan • M.Ö. 350</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Model Viewer */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg border-0 bg-white">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 relative">
                {/* Sketchfab Embed */}
                <iframe
                  title="Maussollos Statue 3D Model"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  src="https://sketchfab.com/models/1f1d2b9ce3ba46e28abd4408106aa732/embed?autospin=1&autostart=1"
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                  Maussollos Heykeli
                </h2>
                <p className="text-sm text-slate-600 mb-4">
                  Halikarnassos Mausolesi'nden mermer heykel, British Museum'da sergilenmektedir
                </p>
                
                {/* Audio Description */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-4 border border-amber-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Sesli Tasvir</p>
                        <p className="text-xs text-slate-600">Heykelin hikayesini dinleyin</p>
                      </div>
                    </div>
                    <Button
                      onClick={handlePlayAudio}
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      {isPlayingAudio ? "Durdur" : "Oynat"}
                    </Button>
                  </div>
                  <audio
                    ref={audioRef}
                    onEnded={() => setIsPlayingAudio(false)}
                    className="hidden"
                  >
                    <source src="/audio/maussollos-description.wav" type="audio/wav" />
                  </audio>
                </div>

                {/* Temel Bilgiler */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Yükseklik</p>
                    <p className="text-lg font-bold text-slate-900">3 metre</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Malzeme</p>
                    <p className="text-lg font-bold text-slate-900">Mermer</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Dönem</p>
                    <p className="text-lg font-bold text-slate-900">M.Ö. 350</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Orijin</p>
                    <p className="text-lg font-bold text-slate-900">Halikarnassos</p>
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

              {/* Detailed Information */}
              {showInfo && (
                <Card className="p-6 border-0 shadow-lg bg-white space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">
                      Hakkında
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Bu devasa mermer heykel, Pers İmparatorluğu'nun bir satrabı olan Maussollos'u temsil eder. Antik Dünyanın Yedi Harikasından biri olan Halikarnassos Mausolesi'nde keşfedilmiştir.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">
                      Özellikler
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>Akan saçlar ve kısa kıvırcık sakal</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>Uzun chiton ve himation kumaş drape</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>Elinde kılıç kınını tutuyor</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>Bağlı metal çerçeveli sandalet</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">
                      Kazı
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      1857 yılında Sir Charles Thomas Newton tarafından kazılmıştır. Şu anda British Museum'un Yunan ve Roma Departmanı'nda (Galeri G21) sergilenmektedir.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500 text-center">
                      Müze Numarası: 1857,1220.232
                    </p>
                  </div>
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
                  Mobil cihazınızda bu AR deneyimini görmek için tarayın
                </p>
              </Card>
            </div>
          </div>
        </div>

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

      {/* Alt Bilgi */}
        <div className="mt-12 pt-8 border-t border-slate-200/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Müze</h4>
              <p className="text-sm text-slate-600">British Museum, Londra</p>
              <p className="text-xs text-slate-500 mt-1">Yunan ve Roma Departmanı</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Dönem</h4>
              <p className="text-sm text-slate-600">Klasik Yunan</p>
              <p className="text-xs text-slate-500 mt-1">Yaklaşık M.Ö. 350</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Konum</h4>
              <p className="text-sm text-slate-600">Halikarnassos Mausolesi</p>
              <p className="text-xs text-slate-500 mt-1">Bodrum, Türkiye</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
