import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, BookOpen, Zap, Volume2, Info, Camera } from "lucide-react";
import { useState, useRef, useEffect } from "react";

/**
 * Maussollos AR Experience
 * 
 * Design Philosophy: Classical Elegance meets Modern AR
 * - Sophisticated typography with serif headers and clean body text
 * - Marble-inspired color palette (warm grays, cream, gold accents)
 * - Generous whitespace and vertical rhythm
 * - Smooth transitions and interactive elements
 * - Museum-quality presentation
 * - Full AR support with Google Model Viewer
 */

export default function Home() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    // Load Model Viewer script for AR support
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    document.head.appendChild(script);
  }, []);

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

  const handleARClick = () => {
    const modelViewer = document.querySelector('model-viewer') as any;
    if (modelViewer && modelViewer.activateAR) {
      modelViewer.activateAR();
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
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
                {/* Google Model Viewer with AR Support */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: `
                      <model-viewer
                        src="https://cdn.jsdelivr.net/npm/@google/model-viewer/examples/assets/Astronaut.glb"
                        alt="Maussollos Statue"
                        auto-rotate
                        camera-controls
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                        style="width: 100%; height: 100%;"
                      ></model-viewer>
                    `,
                  }}
                />
              </div>
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                  Maussollos Heykeli
                </h2>
                <p className="text-sm text-slate-600 mb-4">
                  Halikarnassos Mausolesi'nden mermer heykel, British Museum'da sergilenmektedir
                </p>
                
                {/* AR Button */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 mb-4 border border-blue-200/50">
                  <Button
                    onClick={handleARClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    AR'da Gör
                  </Button>
                </div>

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
                      Maussollos, Halikarnassos'un satrapı (vali) olup, Halikarnassos Mausolesi'nin kurucusudur. Bu heykel, antik dünyanın en ünlü yapılarından birinin bir parçasıdır.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">
                      Özellikler
                    </h3>
                    <ul className="text-sm text-slate-600 space-y-2">
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>Mermer yapılı, klasik Yunan sanatının başyapıtı</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>3 metre yüksekliğinde, detaylı işçiliği ile ünlü</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>M.Ö. 350 yıllarında yapılmış</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">
                      Kazı Tarihi
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Heykel, 19. yüzyılda Bodrum'da yapılan kazılar sırasında bulunmuş ve British Museum'a getirilmiştir. Müze numarası: G 1857-1220-232
                    </p>
                  </div>
                </Card>
              )}

              {/* Methodology Link */}
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-slate-200 hover:bg-slate-50"
                onClick={() => window.location.href = '/metodoloji'}
              >
                <BookOpen className="w-4 h-4" />
                Metodoloji
              </Button>

              {/* QR Code */}
              <Card className="p-4 border-0 shadow-lg bg-white">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
                  Deneyimi Paylaş
                </p>
                <img src="/qr-code.png" alt="QR Code" className="w-full rounded-lg" />
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
