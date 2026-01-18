# Maussollos AR Experience - Geliştirici Hızlı Başlangıç

## 🚀 5 Dakikada Başlayın

### 1. Ortamı Hazırlayın
```bash
cd /home/ubuntu/maussollos-ar
pnpm install
```

### 2. Geliştirme Sunucusunu Başlatın
```bash
pnpm dev
```

**Çıktı:**
```
➜  Local:   http://localhost:3000/
➜  Network: http://169.254.0.21:3000/
```

### 3. Tarayıcıda Açın
- **Lokal**: http://localhost:3000/
- **Uzak**: https://3000-iu5gjwt2uk0jpri0ib8ut-c9e898e4.us2.manus.computer

---

## 📁 Proje Yapısı

```
client/
├── public/
│   ├── audio/
│   │   └── maussollos-description.wav    ← Sesli tasvir
│   └── qr-code.png                       ← QR kod
├── src/
│   ├── pages/
│   │   └── Home.tsx                      ← Ana sayfa (BURASI ÖNEMLİ)
│   ├── components/
│   │   └── ui/                           ← shadcn/ui bileşenleri
│   ├── App.tsx                           ← Routing ve layout
│   ├── index.css                         ← Tasarım sistemi
│   └── main.tsx                          ← Entry point
└── index.html                            ← HTML şablonu
```

---

## 🎨 Hızlı Değişiklikler

### Başlık Metni Değiştirme
**Dosya**: `client/src/pages/Home.tsx` (Satır 73-74)
```tsx
<h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
  Maussollos Statue  ← BURASI
</h2>
```

### Açıklama Metni Değiştirme
**Dosya**: `client/src/pages/Home.tsx` (Satır 75-78)
```tsx
<p className="text-sm text-slate-600 mb-4">
  Marble statue from the Mausoleum of Halicarnassus, located in the British Museum
  ← BURASI
</p>
```

### Renk Değiştirme
**Dosya**: `client/src/index.css` (Satır 45-79)
```css
:root {
  --primary: oklch(0.577 0.245 27.325);  ← Birincil renk (şu anda amber/gold)
  --accent: oklch(0.577 0.245 27.325);   ← Aksan rengi
  /* ... diğer renkler ... */
}
```

### Yazı Tipi Değiştirme
**Dosya**: `client/index.html` (Satır 13-15)
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Lato:wght@400;500;600&display=swap" rel="stylesheet" />
```

**Dosya**: `client/src/index.css` (Satır 120-126)
```css
body {
  font-family: 'Lato', sans-serif;  ← Gövde yazı tipi
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;  ← Başlık yazı tipi
}
```

---

## 🔄 Yaygın Görevler

### Yeni Heykel Ekleme
1. **3D Model Bul**: Sketchfab'da model ara
2. **Model ID'sini Al**: URL'den model ID'sini kopyala
3. **Home.tsx'i Güncelle**: iframe `src` URL'sini değiştir
4. **Bilgileri Güncelle**: Heykel başlığı, açıklaması, detaylarını değiştir
5. **Sesli Tasvir Ekle**: Yeni WAV dosyasını `public/audio/` klasörüne koy

### Sesli Tasvir Değiştirme
```bash
# Yeni sesli tasvir oluştur (Manus generate_speech kullan)
# Dosyayı kaydet: /home/ubuntu/maussollos-ar/client/public/audio/maussollos-description.wav

# Veya mevcut dosyayı değiştir
cp /path/to/new-audio.wav /home/ubuntu/maussollos-ar/client/public/audio/maussollos-description.wav
```

### QR Kod Yenileme
```bash
python3 << 'EOF'
import qrcode
qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
qr.add_data("https://your-new-url.com")
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")
img.save("/home/ubuntu/maussollos-ar/client/public/qr-code.png")
EOF
```

---

## 🧪 Test Etme

### Tarayıcı Konsolunda Hata Kontrol
1. F12 tuşuna basın (Developer Tools)
2. Console sekmesine gidin
3. Hata mesajlarını kontrol edin

### Responsive Tasarım Testi
1. F12 tuşuna basın
2. Device Toolbar'ı aç (Ctrl+Shift+M)
3. Farklı cihazlarda test et: iPhone, iPad, Android

### Sesli Tasvir Testi
1. Play butonuna tıkla
2. Ses oynatılıyor mu kontrol et
3. Stop butonuna tıkla
4. Ses durdu mu kontrol et

---

## 📦 Derleme ve Yayınlama

### Üretim Derlemesi
```bash
pnpm build
```

**Çıktı**: `dist/` klasöründe derlenmiş dosyalar

### Manus'ta Yayınlama
1. Management UI'da Checkpoint oluştur
2. Publish butonuna tıkla
3. Otomatik domain al veya özel domain bağla

### Lokal Olarak Test Etme
```bash
pnpm build
pnpm preview
```

---

## 🐛 Sorun Giderme

| Sorun | Çözüm |
|-------|-------|
| **Modül bulunamadı hatası** | `pnpm install` çalıştır |
| **Port 3000 kullanımda** | `lsof -i :3000` ile kontrol et, başka port kullan |
| **Değişiklikler görünmüyor** | Tarayıcıyı yenile (Ctrl+F5) |
| **3D model yüklenmedi** | İnternet bağlantısını kontrol et |
| **Stil uygulanmadı** | CSS dosyasını kaydet, tarayıcıyı yenile |

---

## 📚 Faydalı Komutlar

```bash
# Geliştirme sunucusu başlat
pnpm dev

# Üretim derlemesi yap
pnpm build

# Derlenmiş projeyi test et
pnpm preview

# TypeScript hatalarını kontrol et
pnpm check

# Kodu formatla
pnpm format

# Başlangıç sunucusu (üretim)
pnpm start
```

---

## 🎯 Sonraki Adımlar

1. **Türkçe Sesli Tasvir**: Yeni sesli tasvir oluştur, dil seçim butonu ekle
2. **Fotoğraf Galerisi**: British Museum fotoğraflarını galeri olarak göster
3. **Mobil AR**: Google Model Viewer ile gerçek AR desteği ekle
4. **Çok Dilli Destek**: İngilizce, Türkçe, Almanca desteği ekle
5. **Sosyal Paylaşım**: Twitter, Facebook, Instagram paylaşım butonları ekle

---

**Sorular?** Manus Help Center'a git: https://help.manus.im
