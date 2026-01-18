# Maussollos AR Experience - Kullanıcı Rehberi

## 📱 Uygulamayı Açma

### Seçenek 1: QR Kod ile (En Kolay)
1. Uygulamanın QR kodunu tarayın (sağ panelde "SHARE THIS EXPERIENCE" bölümünde)
2. Tarayıcı otomatik olarak uygulamayı açacaktır
3. Mobil cihazınızda tam ekran deneyimi başlayacaktır

### Seçenek 2: Doğrudan URL ile
- **Geliştirme Sunucusu**: https://3000-iu5gjwt2uk0jpri0ib8ut-c9e898e4.us2.manus.computer
- Tarayıcıya URL'yi yapıştırıp Enter tuşuna basın

### Seçenek 3: Yayınlanan Sürüm (Üretim)
- Manus Management UI'da "Publish" butonuna tıklayın
- Yayınlanan URL'yi kullanıcılarla paylaşın

---

## 🎯 Uygulamayı Kullanma

### 1. 3D Model Görüntüleme
- **Merkez Bölüm**: Maussollos heykeli 3D modeli otomatik olarak döner
- **Fare/Dokunma**: Modeli sürükleyerek döndürebilirsiniz
- **Yakınlaştırma**: Fare tekerleği veya pinch gesture ile yakınlaştırabilirsiniz
- **Tam Ekran**: Model üzerindeki tam ekran simgesine tıklayarak tam ekran moduna geçin

### 2. Sesli Tasvir Dinleme
- **Play Butonu**: "Audio Description" bölümündeki turuncu "Play" butonuna tıklayın
- **Dinleme Süresi**: ~2 dakika
- **Durdurma**: "Stop" butonuna tıklayarak sesli açıklamayı durdurun
- **Otomatik Durdurma**: Ses bittiğinde otomatik olarak durur

### 3. Heykel Bilgileri
- **Hızlı Bilgiler**: Sol altta "Height", "Material", "Period", "Origin" kartları
- **Detaylı Bilgiler**: Sağ panelde "Hide Details" butonuna tıklayarak ayrıntılı bilgileri göster/gizle
  - **About**: Heykel hakkında genel bilgi
  - **Features**: Heykelin sanatsal özellikleri
  - **Excavation**: Kazı tarihi ve müze bilgileri

### 4. Bilgi Tabletası ("Oku")
- Sağ panelde "Museum", "Period", "Location" bölümleri
- Heykel hakkında kısa bilgiler ve müze referansları

### 5. QR Kod Paylaşımı
- Sağ panelde "SHARE THIS EXPERIENCE" bölümünde QR kod görüntülenir
- QR kodu fotoğrafla veya yazdırarak başkalarıyla paylaşabilirsiniz

---

## 💻 Geliştirici Rehberi (Teknik Bilgi)

### Proje Yapısı
```
maussollos-ar/
├── client/
│   ├── public/
│   │   ├── audio/
│   │   │   └── maussollos-description.wav    # Sesli tasvir
│   │   └── qr-code.png                       # QR kod resmi
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx                      # Ana sayfa (AR deneyimi)
│   │   ├── App.tsx                           # Ana uygulama bileşeni
│   │   └── index.css                         # Global stiller
│   └── index.html                            # HTML şablonu
├── package.json                              # Proje bağımlılıkları
└── server/                                   # Statik sunucu (üretim)
```

### Kurulum ve Çalıştırma

#### 1. Geliştirme Ortamında Çalıştırma
```bash
# Proje dizinine gidin
cd /home/ubuntu/maussollos-ar

# Bağımlılıkları yükleyin (ilk kez)
pnpm install

# Geliştirme sunucusunu başlatın
pnpm dev
```

**Çıktı:**
```
➜  Local:   http://localhost:3000/
➜  Network: http://169.254.0.21:3000/
```

#### 2. Üretim İçin Derleme
```bash
# Projeyi derleyin
pnpm build

# Derlenmiş dosyaları kontrol edin
ls -la dist/
```

#### 3. Üretim Sunucusunu Çalıştırma
```bash
# Derlenmiş projeyi başlatın
pnpm start
```

---

### Önemli Dosyalar ve Değişiklikler

#### `client/src/pages/Home.tsx`
- **Amaç**: Ana AR deneyimi sayfası
- **İçerik**:
  - Sketchfab 3D model embed'i
  - Sesli tasvir oynatıcı
  - Heykel bilgileri paneli
  - QR kod gösterimi
- **Değişiklik Yapma**: Heykel bilgilerini veya tasarımı güncellemek için bu dosyayı düzenleyin

#### `client/public/audio/maussollos-description.wav`
- **Amaç**: Sesli tasvir dosyası
- **Uzunluk**: ~2 dakika
- **Dil**: İngilizce
- **Değişiklik Yapma**: Yeni sesli tasvir eklemek için bu dosyayı değiştirin

#### `client/public/qr-code.png`
- **Amaç**: Uygulamaya erişim için QR kod
- **Yenileme**: URL değişirse yeni QR kod oluşturun:
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

#### `client/src/index.css`
- **Amaç**: Global stiller ve tasarım sistemi
- **Özellikler**:
  - Playfair Display serif fontları (başlıklar)
  - Lato sans-serif fontları (gövde metni)
  - Amber/gold renk şeması (aksan renkleri)
  - OKLCH renk formatı

---

### Sketchfab 3D Model Entegrasyonu

**Mevcut Model:**
- **Model ID**: `1f1d2b9ce3ba46e28abd4408106aa732`
- **Sanatçı**: artfletch
- **Lisans**: CC Attribution
- **Açıklama**: Classical Greek marble statues from the Mausoleum of Halicarnassus

**Model Değiştirme:**
1. Sketchfab'da yeni bir model bulun
2. Model sayfasından embed kodunu alın
3. `Home.tsx` dosyasında iframe `src` URL'sini güncelleyin:
```tsx
src="https://sketchfab.com/models/{MODEL_ID}/embed?autospin=1&autostart=1"
```

---

### Tasarım Sistemi

#### Renkler
- **Arka Plan**: Açık gri/beyaz (`bg-gradient-to-br from-slate-50 to-slate-100`)
- **Aksan (Birincil)**: Amber/Gold (`bg-amber-600`, `text-amber-600`)
- **Metin**: Koyu gri (`text-slate-900`)
- **İkincil Metin**: Orta gri (`text-slate-600`)

#### Tipografi
- **Başlıklar**: Playfair Display, Bold (600-800 ağırlık)
- **Gövde Metni**: Lato, Regular (400 ağırlık)
- **Vurgulu Metin**: Lato, Semibold (600 ağırlık)

#### Bileşenler
- **Card**: Beyaz arka plan, hafif gölge, yuvarlatılmış köşeler
- **Button**: Amber arka plan, beyaz metin, hover efekti
- **Input Alanları**: Açık gri arka plan, koyu metin

---

### Manus Platform Özellikleri

#### Yayınlama (Publishing)
1. **Checkpoint Oluşturma**: Değişiklikleri kaydetmek için checkpoint oluşturun
2. **Publish Butonu**: Management UI'da "Publish" butonuna tıklayın
3. **Özel Domain**: Manus otomatik olarak `xxx.manus.space` domain'i atar
4. **Özel Domain Bağlama**: Settings → Domains'ten kendi domain'inizi bağlayabilirsiniz

#### Ortam Değişkenleri
Manus otomatik olarak şu değişkenleri enjekte eder:
- `VITE_APP_TITLE`: Uygulama başlığı
- `VITE_ANALYTICS_ENDPOINT`: Analytics endpoint
- `VITE_ANALYTICS_WEBSITE_ID`: Analytics website ID

#### Analitik
- Manus otomatik olarak ziyaretçi takibi yapar
- Management UI → Dashboard'da istatistikleri görebilirsiniz

---

### Sorun Giderme

#### 3D Model Görüntülenmiyor
- **Sorun**: Sketchfab embed yüklenmedi
- **Çözüm**: 
  - İnternet bağlantısını kontrol edin
  - Tarayıcı konsolunda hata mesajlarını kontrol edin
  - Sketchfab modelinin hala mevcut olduğunu doğrulayın

#### Sesli Tasvir Oynatılmıyor
- **Sorun**: Audio dosyası yüklenmedi
- **Çözüm**:
  - `/client/public/audio/maussollos-description.wav` dosyasının mevcut olduğunu kontrol edin
  - Tarayıcı konsolunda hata mesajlarını kontrol edin
  - Ses dosyasının WAV formatında olduğunu doğrulayın

#### QR Kod Taranmıyor
- **Sorun**: QR kod resmi görüntülenmiyor
- **Çözüm**:
  - `/client/public/qr-code.png` dosyasının mevcut olduğunu kontrol edin
  - QR kodu yeniden oluşturun (yukarıdaki komutları kullanın)

---

### Performans İpuçları

1. **Caching**: Statik dosyalar agresif şekilde önbelleğe alınır
2. **Lazy Loading**: 3D model iframe'i gerektiğinde yüklenir
3. **Responsive Images**: Farklı cihazlar için optimize edilmiş görseller
4. **Minification**: Üretim derlemesi otomatik olarak minify edilir

---

### Güvenlik

- **HTTPS**: Tüm bağlantılar HTTPS üzerinden yapılır
- **CORS**: Sketchfab embed'i CORS politikasına uygun
- **XSS Koruması**: React otomatik olarak XSS saldırılarını önler
- **CSP**: Content Security Policy başlıkları yapılandırılmıştır

---

## 📞 Destek ve İletişim

**Sorular veya Sorunlar İçin:**
- Manus Help Center: https://help.manus.im
- GitHub Repository: ubterzioglu/hazal

---

**Son Güncelleme**: 18 Ocak 2026
**Versiyon**: 1.0.0
