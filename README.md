# Maussollos AR Experience

QR kod tabanlı Artırılmış Gerçeklik (AR) web uygulaması. British Museum'daki Maussollos heykeli için etkileşimli 3D deneyim sunar.

## ✨ Özellikler

- **AR Görünümü** (`/ar`): Heykeli bulunduğunuz odanın zeminine gerçek boyutta yerleştirir (Android: WebXR/Scene Viewer, iOS: AR Quick Look)
- **3D Model Viewer**: Sketchfab entegrasyonu ile dönen 3D heykel modeli
- **Sesli Tasvir**: Profesyonel sesli açıklama (İngilizce, ~2 dakika)
- **Heykel Bilgileri**: Detaylı müze bilgileri ve sanatsal açıklamalar
- **Kalıcı QR Kod**: Basılı kod sabit `hazaloral.site/qr` adresini kodlar; sunucu bunu güncel deneyime yönlendirir, böylece kod hiç yeniden basılmaz
- **Responsive Tasarım**: Mobil, tablet ve masaüstü cihazlarda optimize edilmiş
- **Klasik Tasarım**: Müze kalitesi sunum, serif fontlar ve amber aksan renkleri

## 🚀 Hızlı Başlangıç

### Geliştirme Ortamında Çalıştırma

```bash
# Bağımlılıkları yükle
pnpm install

# Geliştirme sunucusunu başlat
pnpm dev
```

Tarayıcıda açın: http://localhost:3000/

### Üretim Derlemesi

```bash
# Derle
pnpm build

# Test et
pnpm preview

# Başlat
pnpm start
```

## 📱 Kullanım

1. **QR Kod Tarama**: Kodu mobil cihazla tarayın → `/qr` → AR görünümü (`/ar`) açılır
2. **AR'a Geçiş**: "Odana Yerleştir" ile heykeli zemine yerleştirin; "i" butonu ana siteye götürür
3. **3D Model Görüntüleme**: Ana sayfada modeli sürükleyerek döndürün, yakınlaştırın
4. **Sesli Tasvir**: Play butonuna tıklayarak sesli açıklamayı dinleyin
5. **Bilgi Okuma**: "Detayları Göster" ile künye ve müze bilgilerini okuyun

### QR kodunu yeniden üretme

```bash
pnpm qr:generate   # PNG + SVG üretir, decode ederek doğrular
```

> Kodun içeriği (`https://hazaloral.site/qr`) **asla değiştirilmemelidir**.
> Deneyimin yerini değiştirmek için `shared/qr.ts` içindeki `QR_TARGET` sabitini
> güncellemek yeterlidir.

## 📚 Dokümantasyon

- **[USER_GUIDE.md](./USER_GUIDE.md)** - Kullanıcılar için detaylı rehber
- **[DEVELOPER_QUICKSTART.md](./DEVELOPER_QUICKSTART.md)** - Geliştiriciler için hızlı başlangıç

## 🛠 Teknoloji Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **3D Model**: Sketchfab embed
- **Audio**: HTML5 Audio API
- **Build**: Vite
- **Hosting**: Manus Platform

## 📁 Proje Yapısı

```
client/
├── public/
│   ├── audio/
│   │   └── maussollos-description.wav    # Sesli tasvir
│   └── qr-code.png                       # QR kod
├── src/
│   ├── pages/
│   │   └── Home.tsx                      # Ana sayfa
│   ├── components/
│   │   └── ui/                           # shadcn/ui bileşenleri
│   ├── App.tsx                           # Routing
│   ├── index.css                         # Tasarım sistemi
│   └── main.tsx                          # Entry point
└── index.html                            # HTML şablonu
```

## 🎨 Tasarım Sistemi

### Renkler
- **Arka Plan**: Açık gri/beyaz (`slate-50` to `slate-100`)
- **Aksan**: Amber/Gold (`amber-600`)
- **Metin**: Koyu gri (`slate-900`)

### Tipografi
- **Başlıklar**: Playfair Display (serif)
- **Gövde**: Lato (sans-serif)

## 🌐 Manus Platform Özellikleri

- **Otomatik Hosting**: Manus platform'da barındırılır
- **Özel Domain**: `xxx.manus.space` veya kendi domain'iniz
- **Analytics**: Ziyaretçi takibi otomatik
- **SSL/HTTPS**: Tüm bağlantılar şifreli
- **CDN**: Global dağıtım

## 📝 Heykel Bilgileri

**Maussollos Heykeli**
- **Dönem**: Klasik Yunan (350 BC)
- **Malzeme**: Mermer
- **Yükseklik**: 3 metre
- **Orijin**: Halicarnassus Mausolesi
- **Konum**: British Museum, Londra
- **Müze Numarası**: 1857,1220.232

## 🔄 Sonraki Adımlar

- [ ] Türkçe sesli tasvir ekle
- [ ] Mobil AR özelliği (Google Model Viewer)
- [ ] Fotoğraf galerisi
- [ ] Çok dilli destek
- [ ] Sosyal paylaşım butonları

## 📞 Destek

- **Manus Help**: https://help.manus.im
- **GitHub**: ubterzioglu/hazal

## 📄 Lisans

CC Attribution (Sketchfab 3D model)

---

**Versiyon**: 1.0.0  
**Son Güncelleme**: 18 Ocak 2026  
**Geliştirici**: Manus AI
