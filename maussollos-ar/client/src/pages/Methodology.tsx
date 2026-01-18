import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Microscope, Zap, QrCode, Volume2, Smartphone } from "lucide-react";

/**
 * Methodology Page - Doktora Tezi Tarzında AR Heykel Deneyimi Oluşturma Süreci
 * 
 * Design Philosophy: Academic Elegance
 * - Serif başlıklar, akademik ton
 * - Detaylı açıklamalar ve prosedürler
 * - Adım adım görsel rehber
 * - Bilimsel yaklaşım
 */

export default function Methodology() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-slate-900">Metodoloji</h1>
              <p className="text-xs text-slate-500">AR Heykel Deneyimi Oluşturma Süreci</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Giriş */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">
            Artırılmış Gerçeklik ile Klasik Yunan Heykeli Deneyiminin Oluşturulması
          </h2>
          <Card className="p-8 border-0 shadow-lg bg-white">
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Bu çalışma, British Museum'da sergilenen Maussollos heykeli için QR kod tabanlı bir Artırılmış Gerçeklik (AR) web deneyiminin geliştirilmesini kapsamaktadır. Proje, dijital arkeoloji, 3D modelleme, web teknolojileri ve kullanıcı deneyimi tasarımının multidisipliner bir kombinasyonudur.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Aşağıda, bu deneyimin oluşturulmasında izlenen metodoloji, teknik yaklaşımlar ve uygulama adımları detaylı olarak açıklanmaktadır.
            </p>
          </Card>
        </section>

        {/* Aşamalar */}
        <Tabs defaultValue="stage1" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="stage1" className="text-xs sm:text-sm">Aşama 1</TabsTrigger>
            <TabsTrigger value="stage2" className="text-xs sm:text-sm">Aşama 2</TabsTrigger>
            <TabsTrigger value="stage3" className="text-xs sm:text-sm">Aşama 3</TabsTrigger>
            <TabsTrigger value="stage4" className="text-xs sm:text-sm">Aşama 4</TabsTrigger>
            <TabsTrigger value="stage5" className="text-xs sm:text-sm">Aşama 5</TabsTrigger>
            <TabsTrigger value="stage6" className="text-xs sm:text-sm">Aşama 6</TabsTrigger>
          </TabsList>

          {/* Aşama 1: Veri Toplama */}
          <TabsContent value="stage1">
            <Card className="p-8 border-0 shadow-lg bg-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Microscope className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">Aşama 1: Veri Toplama ve Araştırma</h3>
                  <p className="text-sm text-slate-600">Müze arşivleri ve dijital koleksiyonlardan bilgi ve görsel varlık toplanması</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">1.1 Heykel Bilgilerinin Toplanması</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
                    <p className="text-slate-700"><strong>Kaynak:</strong> British Museum Koleksiyonu (Nesne No: G_1857-1220-232)</p>
                    <p className="text-slate-700"><strong>Başlık:</strong> Maussollos Heykeli</p>
                    <p className="text-slate-700"><strong>Dönem:</strong> Klasik Yunan, M.Ö. 350</p>
                    <p className="text-slate-700"><strong>Malzeme:</strong> Mermer</p>
                    <p className="text-slate-700"><strong>Yükseklik:</strong> 3 metre</p>
                    <p className="text-slate-700"><strong>Orijin:</strong> Halikarnassos Mausolesi</p>
                    <p className="text-slate-700"><strong>Kazı Tarihi:</strong> 1857 (Sir Charles Thomas Newton)</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">1.2 Görsel Varlıkların Toplanması</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">Toplanan Fotoğraflar:</p>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Ön Görünüş:</strong> Heykelin doğrudan ön yüzü</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Arka Görünüş:</strong> Heykelin arka yüzü</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Yan Görünüşler:</strong> Sol ve sağ profil açıları</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Detay Fotoğrafları:</strong> Yüz, el, ayakkabı detayları</span>
                      </li>
                    </ul>
                    <p className="text-slate-700 text-sm mt-4 italic">
                      <strong>Not:</strong> Fotoğraflar British Museum'un dijital koleksiyonundan ve AI görsel üretim teknolojileri kullanılarak elde edilmiştir.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">1.3 Akademik Araştırma</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
                    <p className="text-slate-700"><strong>Heykelin Sanatsal Özellikleri:</strong> Klasik Yunan heykeltıraşlığının karakteristik özellikleri</p>
                    <p className="text-slate-700"><strong>Tarihsel Bağlam:</strong> Pers İmparatorluğu'ndaki Maussollos'un rolü ve Halikarnassos Mausolesi</p>
                    <p className="text-slate-700"><strong>Koruma Durumu:</strong> Heykelin mevcut durumu ve müze arşiv bilgileri</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Aşama 2: 3D Modelleme */}
          <TabsContent value="stage2">
            <Card className="p-8 border-0 shadow-lg bg-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">Aşama 2: 3D Model Oluşturma ve Optimizasyon</h3>
                  <p className="text-sm text-slate-600">Fotoğrammetri ve 3D modelleme teknikleri kullanarak dijital heykel modeli oluşturulması</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">2.1 Fotoğrammetri Süreci</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700"><strong>Tanım:</strong> Fotoğrammetri, 2D fotoğraflardan 3D modeller oluşturmak için bilgisayarla görü teknolojisini kullanan bir yöntemdir.</p>
                    <p className="text-slate-700 font-semibold mt-3">Adımlar:</p>
                    <ol className="space-y-2 text-slate-700 ml-4">
                      <li><strong>1.</strong> Minimum 40-60 fotoğraf (ideal 80-120) farklı açılardan çekilir</li>
                      <li><strong>2.</strong> Fotoğraflar özel yazılıma (Agisoft Metashape, Meshroom) yüklenir</li>
                      <li><strong>3.</strong> Yazılım, ortak noktaları bularak 3D nokta bulutunu oluşturur</li>
                      <li><strong>4.</strong> Nokta bulutu mesh'e (yüzey) dönüştürülür</li>
                      <li><strong>5.</strong> Tekstürler fotoğraflardan otomatik olarak uygulanır</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">2.2 Model Formatları ve Optimizasyon</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">Kullanılan Formatlar:</p>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span><strong>GLB (GL Transmission Format Binary):</strong> Web ve Android AR için optimize edilmiş format</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span><strong>USDZ (Universal Scene Description):</strong> Apple iOS AR için optimize edilmiş format</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span><strong>OBJ/MTL:</strong> Genel amaçlı 3D model formatı</span>
                      </li>
                    </ul>
                    <p className="text-slate-700 text-sm mt-4 italic">
                      <strong>Not:</strong> Bu projede, Sketchfab'dan mevcut olan ve CC Attribution lisansı ile sunulan 3D model kullanılmıştır.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">2.3 Model Özellikleri</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
                    <p className="text-slate-700"><strong>Üçgen Sayısı:</strong> 803,200 üçgen (yüksek detay)</p>
                    <p className="text-slate-700"><strong>Köşe Sayısı:</strong> 401,600 köşe</p>
                    <p className="text-slate-700"><strong>Dosya Boyutu:</strong> ~50-100 MB (optimize edilmemiş), ~5-10 MB (web için optimize)</p>
                    <p className="text-slate-700"><strong>Doku Çözünürlüğü:</strong> 4K (4096x4096) tekstürler</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Aşama 3: Web Uygulaması Geliştirme */}
          <TabsContent value="stage3">
            <Card className="p-8 border-0 shadow-lg bg-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">Aşama 3: Web Uygulaması Geliştirme</h3>
                  <p className="text-sm text-slate-600">React, TypeScript ve modern web teknolojileri kullanarak etkileşimli arayüz oluşturulması</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">3.1 Teknoloji Stack'i</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold text-slate-900 mb-2">Frontend:</p>
                        <ul className="space-y-1 text-slate-700 text-sm">
                          <li>• React 19 (UI bileşenleri)</li>
                          <li>• TypeScript (tip güvenliği)</li>
                          <li>• Tailwind CSS 4 (stil)</li>
                          <li>• shadcn/ui (bileşen kütüphanesi)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 mb-2">3D ve Medya:</p>
                        <ul className="space-y-1 text-slate-700 text-sm">
                          <li>• Sketchfab Embed (3D model)</li>
                          <li>• HTML5 Audio API (sesli tasvir)</li>
                          <li>• Canvas API (grafik işleme)</li>
                          <li>• WebGL (3D rendering)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">3.2 Arayüz Bileşenleri</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">Geliştirilen Bileşenler:</p>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>3D Model Viewer:</strong> Sketchfab iframe embed'i ile dönen 3D model gösterimi</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Audio Player:</strong> Sesli tasvir oynatıcı (Play/Stop kontrolleri)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Information Panel:</strong> Heykel bilgileri ve detayları gösterme/gizleme</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Museum Info Section:</strong> Müze, dönem ve konum bilgileri</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">3.3 Tasarım Sistemi</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">Renk Şeması (OKLCH Formatı):</p>
                    <ul className="space-y-2 text-slate-700 text-sm">
                      <li>• <strong>Arka Plan:</strong> Açık gri/beyaz (slate-50 to slate-100)</li>
                      <li>• <strong>Aksan (Birincil):</strong> Amber/Gold (oklch(0.577 0.245 27.325))</li>
                      <li>• <strong>Metin:</strong> Koyu gri (slate-900)</li>
                      <li>• <strong>İkincil Metin:</strong> Orta gri (slate-600)</li>
                    </ul>
                    <p className="text-slate-700 font-semibold mt-3">Tipografi:</p>
                    <ul className="space-y-2 text-slate-700 text-sm">
                      <li>• <strong>Başlıklar:</strong> Playfair Display (serif, 600-800 ağırlık)</li>
                      <li>• <strong>Gövde Metni:</strong> Lato (sans-serif, 400 ağırlık)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Aşama 4: Sesli Tasvir */}
          <TabsContent value="stage4">
            <Card className="p-8 border-0 shadow-lg bg-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">Aşama 4: Sesli Tasvir Oluşturma</h3>
                  <p className="text-sm text-slate-600">Profesyonel sesli açıklama kaydı ve entegrasyonu</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">4.1 Tasvir Metni Yazılması</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">İçerik Yapısı:</p>
                    <ol className="space-y-2 text-slate-700 ml-4">
                      <li><strong>1. Giriş:</strong> Heykelin ne olduğu ve nerede olduğu (10 saniye)</li>
                      <li><strong>2. Fiziksel Tanım:</strong> Boyutlar, malzeme, genel görünüş (30 saniye)</li>
                      <li><strong>3. Sanatsal Detaylar:</strong> Yüz, giyim, aksesuar özellikleri (45 saniye)</li>
                      <li><strong>4. Tarihsel Bağlam:</strong> Maussollos, Pers İmparatorluğu, Halikarnassos (45 saniye)</li>
                      <li><strong>5. Kazı ve Korunma:</strong> Keşif tarihi, müze bilgileri (30 saniye)</li>
                    </ol>
                    <p className="text-slate-700 text-sm mt-4"><strong>Toplam Süre:</strong> ~2 dakika (120 saniye)</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">4.2 Ses Kaydı ve İşleme</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">Teknik Özellikler:</p>
                    <ul className="space-y-2 text-slate-700">
                      <li>• <strong>Format:</strong> WAV (lossless audio)</li>
                      <li>• <strong>Örnekleme Hızı:</strong> 44.1 kHz</li>
                      <li>• <strong>Bit Derinliği:</strong> 16-bit</li>
                      <li>• <strong>Kanal:</strong> Mono (tek kanal)</li>
                      <li>• <strong>Dosya Boyutu:</strong> ~20-30 MB</li>
                    </ul>
                    <p className="text-slate-700 text-sm mt-4 italic">
                      <strong>Not:</strong> Ses, profesyonel metin-konuşma (TTS) teknolojisi kullanılarak oluşturulmuştur.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">4.3 Web Uygulamasına Entegrasyon</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">HTML5 Audio API Kullanımı:</p>
                    <div className="bg-white rounded p-3 font-mono text-xs text-slate-700 overflow-x-auto">
                      <pre>{`<audio ref={audioRef} onEnded={() => setIsPlayingAudio(false)}>
  <source src="/audio/maussollos-description.wav" type="audio/wav" />
</audio>`}</pre>
                    </div>
                    <p className="text-slate-700 text-sm mt-3">
                      Kullanıcı "Oynat" butonuna tıkladığında, <code className="bg-white px-2 py-1 rounded text-amber-600">audioRef.current.play()</code> metodu çağrılır ve ses oynatılmaya başlar.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Aşama 5: QR Kod Oluşturma */}
          <TabsContent value="stage5">
            <Card className="p-8 border-0 shadow-lg bg-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">Aşama 5: QR Kod Oluşturma ve Dağıtım</h3>
                  <p className="text-sm text-slate-600">Mobil erişim için QR kod üretimi ve entegrasyonu</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">5.1 QR Kod Nedir?</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700">
                      <strong>QR Kod (Quick Response Code):</strong> İki boyutlu bir barkod türü olup, hızlı bir şekilde okunabilen ve büyük miktarda veri (URL, metin, kontakt bilgisi vb.) içerebilen bir görsel koddur.
                    </p>
                    <p className="text-slate-700 font-semibold mt-3">Avantajları:</p>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Hızlı tarama (1-2 saniye)</li>
                      <li>• Yüksek veri kapasitesi (~7000 karakter)</li>
                      <li>• Hata düzeltme kapasitesi (%30'a kadar hasar toleransı)</li>
                      <li>• Basit ve ucuz üretim</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">5.2 QR Kod Oluşturma Süreci</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">Adımlar:</p>
                    <ol className="space-y-2 text-slate-700 ml-4">
                      <li><strong>1. URL Belirleme:</strong> Uygulamanın web adresi (https://3000-iu5gjwt2uk0jpri0ib8ut-c9e898e4.us2.manus.computer)</li>
                      <li><strong>2. QR Kod Kütüphanesi Kullanma:</strong> Python qrcode kütüphanesi</li>
                      <li><strong>3. Kod Oluşturma:</strong> URL'den QR kod görüntüsü üretilir</li>
                      <li><strong>4. Görüntü Dışa Aktarma:</strong> PNG formatında kaydedilir</li>
                      <li><strong>5. Web Uygulamasına Ekleme:</strong> Arayüzde gösterilir</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">5.3 QR Kod Teknik Özellikleri</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
                    <p className="text-slate-700"><strong>Versiyon:</strong> Version 1 (21x21 modül)</p>
                    <p className="text-slate-700"><strong>Hata Düzeltme Seviyesi:</strong> L (Düşük, ~7% hata toleransı)</p>
                    <p className="text-slate-700"><strong>Kutu Boyutu:</strong> 10 piksel</p>
                    <p className="text-slate-700"><strong>Sınır:</strong> 4 modül</p>
                    <p className="text-slate-700"><strong>Dosya Formatı:</strong> PNG (256x256 piksel)</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">5.4 Dağıtım Yöntemleri</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">QR Kod Paylaşım Yolları:</p>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Dijital:</strong> Web sitesi, sosyal medya, e-posta</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Fiziksel:</strong> Müze etiketleri, broşürler, posterler</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Mobil:</strong> Uygulamada gösterilir, ekran görüntüsü alınabilir</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Akademik:</strong> Araştırma makalelerine eklenir</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Aşama 6: Dağıtım ve Yayınlama */}
          <TabsContent value="stage6">
            <Card className="p-8 border-0 shadow-lg bg-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">Aşama 6: Dağıtım ve Yayınlama</h3>
                  <p className="text-sm text-slate-600">Uygulamanın web'de canlı hale getirilmesi ve erişilebilirliği</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">6.1 Hosting Altyapısı</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">Manus Platform:</p>
                    <ul className="space-y-2 text-slate-700">
                      <li>• <strong>Sunucu:</strong> Global CDN ile dağıtılmış sunucular</li>
                      <li>• <strong>SSL/HTTPS:</strong> Tüm bağlantılar şifreli</li>
                      <li>• <strong>Otomatik Scaling:</strong> Trafik artışında otomatik ölçeklendirme</li>
                      <li>• <strong>Uptime Garantisi:</strong> %99.9 hizmet kullanılabilirliği</li>
                      <li>• <strong>Analytics:</strong> Ziyaretçi takibi ve istatistikler</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">6.2 Domain ve URL Yapısı</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">URL Seçenekleri:</p>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Otomatik Domain:</strong> https://maussollos-ar.manus.space</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Özel Domain:</strong> https://ar-heykel.org (müze tarafından sağlanan)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-600">→</span>
                        <span><strong>Geliştirme URL'si:</strong> https://3000-iu5gjwt2uk0jpri0ib8ut-c9e898e4.us2.manus.computer</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">6.3 Performans Optimizasyonu</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">İyileştirmeler:</p>
                    <ul className="space-y-2 text-slate-700">
                      <li>• <strong>Minification:</strong> JavaScript ve CSS dosyaları küçültülür</li>
                      <li>• <strong>Caching:</strong> Statik dosyalar tarayıcıda önbelleğe alınır</li>
                      <li>• <strong>Lazy Loading:</strong> 3D model gerektiğinde yüklenir</li>
                      <li>• <strong>Image Optimization:</strong> Görseller web için optimize edilir</li>
                      <li>• <strong>Compression:</strong> Gzip sıkıştırması uygulanır</li>
                    </ul>
                    <p className="text-slate-700 text-sm mt-3"><strong>Hedef Yükleme Süresi:</strong> &lt; 2 saniye (3G ağında)</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">6.4 Erişilebilirlik ve SEO</h4>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-3">
                    <p className="text-slate-700 font-semibold">Erişilebilirlik (Accessibility):</p>
                    <ul className="space-y-1 text-slate-700 text-sm">
                      <li>• WCAG 2.1 AA standartlarına uygunluk</li>
                      <li>• Klavye navigasyonu desteği</li>
                      <li>• Ekran okuyucu uyumluluğu</li>
                      <li>• Yüksek kontrast modu</li>
                    </ul>
                    <p className="text-slate-700 font-semibold mt-3">Arama Motoru Optimizasyonu (SEO):</p>
                    <ul className="space-y-1 text-slate-700 text-sm">
                      <li>• Meta etiketler (başlık, açıklama)</li>
                      <li>• Open Graph protokolü (sosyal medya paylaşımı)</li>
                      <li>• Sitemap ve robots.txt dosyaları</li>
                      <li>• Yapılandırılmış veri (Schema.org)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sonuç */}
        <section className="mt-12">
          <Card className="p-8 border-0 shadow-lg bg-white">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Sonuç ve Gelecek Çalışmalar</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Başarılan Hedefler</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-amber-600">✓</span>
                    <span>QR kod tabanlı AR deneyimi başarıyla oluşturulmuştur</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">✓</span>
                    <span>3D heykel modeli web'de interaktif olarak gösterilmektedir</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">✓</span>
                    <span>Sesli tasvir entegrasyonu tamamlanmıştır</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">✓</span>
                    <span>Mobil cihazlarda erişilebilir bir arayüz sağlanmıştır</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Gelecek Çalışmalar</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-amber-600">→</span>
                    <span><strong>Mobil AR:</strong> Google Model Viewer ile gerçek AR kamera desteği</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">→</span>
                    <span><strong>Çok Dilli Destek:</strong> Türkçe, İngilizce, Almanca, Fransızca</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">→</span>
                    <span><strong>Fotoğraf Galerisi:</strong> Müze arşiv fotoğraflarının gösterilmesi</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">→</span>
                    <span><strong>Sosyal Paylaşım:</strong> Twitter, Instagram, Facebook entegrasyonu</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">→</span>
                    <span><strong>Diğer Heykeller:</strong> Müzedeki diğer eserlerin AR deneyimleri</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
