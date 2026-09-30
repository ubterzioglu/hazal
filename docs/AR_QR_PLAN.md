# Maussollos AR — Kalıcı QR + Gerçek AR + İçerik Düzeni (Batch Planı)

## Context

Bugünkü durum: `client/src/pages/Home.tsx` tek sayfada Sketchfab iframe'i (model `1f1d2b9ce3ba46e28abd4408106aa732`), sesli tasvir, künye kutuları ve statik bir QR görseli (`client/public/qr-code.png`) gösteriyor. Gerçek AR yok — iframe modeli sadece döndürüyor, heykel kullanıcının odasına yerleşmiyor. Repoda hiçbir 3D/AR kütüphanesi ya da model dosyası yok (`package.json`'da model-viewer/three yok, `.glb/.usdz` yok).

QR kodu bir kez zaten kırılmış: eski PNG geçici Manus önizleme URL'sini kodluyordu, `df6cede` ile `https://hazaloral.site/` adresine taşındı. Müzede basılı duracak bir kod için bu risk kabul edilemez — kodun hedefi bir daha asla değişmemeli.

Bu plan üç şeyi çözüyor:
1. **Kalıcı QR**: kod sabit bir `/qr` adresini kodlar, hedef sunucu tarafında yönlendirmeyle değiştirilir → bir daha yeniden basım yok.
2. **Gerçek AR**: QR → tam ekran `/ar` sayfası, `<model-viewer>` ile heykel gerçek odaya/zemine yerleşir (Android WebXR/Scene Viewer, iOS Quick Look). Üzerinde yüzen "i" butonu ana siteye döner.
3. **İçerik düzeni**: "Orijin" → "Buluntu Yeri", alttaki 3 kolonluk blok tamamen kaldırılıp içeriği "Detayları Göster" kartına taşınır; tüm metinler tek bir içerik dosyasına toplanır (Hazal'ın göndereceği yeni metinleri tek yerden güncellemek için).

**Onaylanan kararlar:** QR → `/qr` sunucu yönlendirmesi · 3D modeli kullanıcı Sketchfab'dan indirip verecek · "i" butonu ana sayfaya aynı sekmede gider · alt blok tamamen kalkar · AR ayrı `/ar` sayfasında yaşar (Home'daki iframe korunur, yanına "AR'da Gör" butonu eklenir).

---

## Batch 1 — Kalıcı QR katmanı (ÖNCELİKLİ)

Amaç: QR kodunu bir daha asla yeniden basmak zorunda kalmayacağımız hale getirmek. Bu batch AR'dan bağımsız çalışır ve tek başına deploy edilebilir.

**Tasarım:** QR `https://hazaloral.site/qr` kodlar. `/qr` hiçbir zaman değişmez; nereye gittiği sunucu tarafında tek satırlık bir değişiklikle ayarlanır. Bu batch'te hedef `/` (AR sayfası henüz yok), Batch 2 sonunda `/ar` olur.

**Kritik detay:** yönlendirme **302** (geçici) olmalı. 301 tarayıcıda kalıcı cache'lenir ve hedefi ileride değiştirmemizi imkânsız hale getirir — bu da kalıcılık amacını baltalar.

Dosyalar:
- `server/index.ts` — catch-all `app.get("*")`'dan **önce** `/qr` route'u: `res.redirect(302, QR_TARGET)`. Hedefi dosya başında tek bir sabitte tut (`const QR_TARGET = "/"`).
- `vercel.json` — aynı davranış Vercel'de de gerekli: `"redirects": [{ "source": "/qr", "destination": "/", "permanent": false }]`. (Mevcut `rewrites` bloğu kalır; redirects rewrite'tan önce değerlendirilir.)
- `client/src/App.tsx` — emniyet kemeri: wouter'a `/qr` route'u ekle, `useEffect` ile `/`'a client-side yönlendirsin. Sunucu katmanı atlanırsa (statik hosting, CDN farklılığı) kod yine çalışır.
- `scripts/generate-qr.mjs` (yeni) — `qrcode` ile ECC **H** PNG üretir, sonra `pngjs` + `jsqr` ile kendi ürettiği dosyayı **decode edip doğrular**, decode sonucu beklenen URL değilse hata verip çıkar. `dbccb13` öncesi commit'in bıraktığı direktif bunu şart koşuyor ("verify by decoding before committing").
- `package.json` — devDependencies: `qrcode`, `jsqr`, `pngjs`; script: `"qr:generate": "node scripts/generate-qr.mjs"`.
- `client/public/qr-code.png` — yeniden üretilir (hedef: `https://hazaloral.site/qr`).
- `client/src/pages/Home.tsx` — QR kartındaki açıklama metni güncellenir ("Tarayın: AR deneyimi mobil cihazınızda açılır").

Testler (`vitest`, mevcut kurulum `client/` kökünden çalışıyor):
- `scripts/generate-qr.test.ts` — `client/public/qr-code.png` decode edildiğinde tam olarak `https://hazaloral.site/qr` çıkmalı. Bu test QR'ın yanlışlıkla bozulmasını kalıcı olarak engeller.
- `server/qr-redirect.test.ts` — `/qr` route'unun var olduğu ve 302 döndüğü (supertest yok; `express` app'i export edip doğrudan çağırmak için `server/index.ts`'den `createApp()` fonksiyonunu ayırmak gerekir — küçük refactor).

Doğrulama: `pnpm build && node dist/index.js` → `curl -i http://localhost:3000/qr` → `302` + `Location: /`. Ardından `pnpm vitest run`.

Dokümantasyon: `USER_GUIDE.md` ve `DEVELOPER_QUICKSTART.md` içindeki Python `qrcode` snippet'leri artık yanlış — `pnpm qr:generate` ile değiştir ve **"QR hedefi `/qr`'dır ve asla değişmez; deneyimin yerini değiştirmek için sadece sunucudaki `QR_TARGET` sabitini güncelle"** notunu ekle.

---

## Batch 2 — `/ar` sayfası ve AR motoru

Amaç: QR'ın açtığı tam ekran AR deneyimi. Model dosyası henüz gelmediyse bile bu batch deploy edilebilir olmalı (zarif fallback).

Dosyalar:
- `package.json` — `@google/model-viewer` bağımlılığı.
- `client/src/types/model-viewer.d.ts` (yeni) — `<model-viewer>` custom element'i için JSX tip tanımı (aksi halde `tsc --noEmit` patlar).
- `client/src/pages/ArView.tsx` (yeni) — tam ekran sahne:
  - `<model-viewer src="/models/maussollos.glb" ar ar-modes="webxr scene-viewer quick-look" ar-placement="floor" camera-controls touch-action="pan-y" xr-environment poster="/models/maussollos-poster.webp">`
  - iOS için `ios-src` **verilmez**: model-viewer Quick Look'a girerken USDZ'yi anlık üretir. (Statik heykel olduğu için animasyon kısıtı bizi etkilemiyor. Batch 5'te istenirse elle USDZ eklenir.)
  - `slot="ar-button"` ile kendi "Odana Yerleştir" butonumuz; model-viewer AR desteklenmiyorsa bu slotu otomatik gizler.
  - Masaüstü/desteklenmeyen cihaz: "Bu deneyim mobil cihazda AR olarak açılır" mesajı + 3D döndürme yine çalışır.
  - `@google/model-viewer` **dinamik import** (`await import(...)`) ile yüklenir — Home sayfasının bundle'ına girmesin.
- `client/src/components/InfoFab.tsx` (yeni) — yüzen cam görünümlü yuvarlak "i" butonu. `lucide-react`'in `Info` ikonu (Home zaten kullanıyor) + wouter `Link href="/"`. Aynı sekmede gider, tarayıcı geri tuşu AR'a döner. Sağ üstte, `safe-area-inset` dikkate alınarak konumlanır.
- `client/src/App.tsx` — `<Route path="/ar" component={ArView} />`.
- `client/src/pages/Home.tsx` — Sketchfab iframe'i **korunur**; altına/yanına birincil "AR'da Gör" butonu (`Link href="/ar"`, `Smartphone` ikonu — `Methodology.tsx` zaten bu ikonu import ediyor).
- `server/index.ts` + `vercel.json` — `QR_TARGET` / redirect hedefi `/ar` yapılır (tek satır, QR dosyasına dokunulmaz).
- `client/src/hooks/useDocumentMeta.ts` — yeniden kullanılır; `/ar` için başlık/açıklama verilir.
- `client/public/sitemap.xml` — `/ar` eklenir.

Model yoksa davranış: `<model-viewer>`'ın `error` event'inde Sketchfab iframe'ine düş + "3D model yükleniyor/hazırlanıyor" bilgisi. Böylece Batch 3 gecikse bile `/ar` kırık görünmez.

Testler: `client/src/pages/ArView.test.ts` — kaynak dosyada `ar-modes` üç modu da içeriyor, `ar-placement="floor"` var, `InfoFab` render ediliyor, `App.tsx` `/ar` route'unu içeriyor (mevcut `Footer.test.ts` bu "kaynak dosyayı oku ve assert et" desenini kullanıyor; aynı deseni sürdür).

Doğrulama: `pnpm check`, `pnpm vitest run`, `pnpm dev` → `/ar` masaüstünde 3D döner ve "i" butonu `/`'a gider; `/qr` → `/ar`.

---

## Batch 3 — 3D model hattı (kullanıcı dosyayı verdikten sonra)

**Bloklayıcı girdi:** Sketchfab'dan indirilmiş glTF/GLB dosyası. Model: *"Greek Artemisia And Maussollos Statues"* — yazar **artfletch**, lisans **CC BY 4.0**, indirilebilir (indirme Sketchfab hesabı istiyor, ben giriş yapamıyorum).

Ham modelin iki sorunu var, ikisi de çözülmeli:
1. **803.2k üçgen / 401.6k vertex** — mobil AR için fazlasıyla ağır. Hedef: ≤150k üçgen, ≤8 MB GLB.
2. Sahne **iki heykel** içeriyor (Artemisia + Maussollos). Sadece Maussollos izole edilmeli.

İşlem:
- `npx @gltf-transform/cli` ile: `inspect` → node/mesh listesini gör, gereksiz düğümü çıkar → `simplify` (oran ~0.15, hata toleransı kontrollü) → `weld` → `resize` (doku 2048'e) → `webp` → `draco`. Tek satırlık başlangıç: `gltf-transform optimize in.glb out.glb --compress draco --texture-compress webp`, sonra sonuç yetersizse komutlar tek tek ayarlanır.
- Çıktılar: `client/public/models/maussollos.glb`, `client/public/models/maussollos-poster.webp` (ilk kare/poster).
- **Ölçek**: heykel gerçekte ~3 m. Modelin metre biriminde ve doğru boyda olduğu doğrulanmalı (`gltf-transform inspect` bounding box). Yanlışsa `ar-scale="auto"` ile kullanıcı ölçekler; doğruysa gerçek boyut etkileyici olur.
- **Atıf zorunlu (CC BY)**: `/ar` sayfasında görünür atıf ("3D model: artfletch, CC BY 4.0, Sketchfab") + `Methodology.tsx`'teki lisans notu güncellenir. Bu yasal bir gereklilik, opsiyonel değil.
- Repo boyutu: GLB ~5-8 MB git'e girer. `dist/` zaten ignore'da; `client/public/models/` commit'lenir (Docker imajı `client/public`'i build'e dahil ediyor).

Testler: `models/maussollos.glb` var ve boyutu < 10 MB (performans regresyon testi — ileride biri optimize edilmemiş dosyayı commit ederse yakalar).

Doğrulama: gerçek cihaz — Android Chrome (WebXR, zemine yerleştirme) ve iOS Safari (Quick Look). Bu ikisi emülatörde güvenilir test edilemez, fiziksel cihaz şart.

---

## Batch 4 — İçerik ve künye düzeni

Amaç: istenen metin değişiklikleri + Hazal'ın sonra göndereceği metinleri tek dosyadan güncelleyebilmek.

- `client/src/content/artifact.ts` (yeni) — tüm künye/metin içeriği tek yerde:
  ```ts
  export const artifact = {
    title: "Maussollos Heykeli",
    facts: [ {label:"Yükseklik", value:"3 metre"}, {label:"Malzeme", value:"Mermer"},
             {label:"Dönem", value:"M.Ö. 350"}, {label:"Buluntu Yeri", value:"Halikarnassos"} ],
    details: { about: "...", features: [...], excavation: "...", museumNumber: "1857,1220.232",
               museum: {label:"Müze", value:"British Museum, Londra", note:"Yunan ve Roma Departmanı"},
               period: {label:"Dönem", value:"Klasik Yunan", note:"Yaklaşık M.Ö. 350"},
               findspot:{label:"Konum", value:"Halikarnassos Mausolesi", note:"Bodrum, Türkiye"} },
  } as const;
  ```
- `client/src/pages/Home.tsx`:
  - Künye kutusundaki **"Orijin" → "Buluntu Yeri"** (değer `Halikarnassos` aynı kalır).
  - Sayfa altındaki **3 kolonluk blok (Müze / Dönem / Konum) tamamen kaldırılır** (şu an `Home.tsx` sonundaki "Alt Bilgi" bloğu).
  - Bu üç başlık + alt notları **"Detayları Göster" kartına** taşınır (kart `showInfo` state'i ile açılıyor, `Hakkında / Özellikler / Kazı / Müze Numarası` bölümlerinin devamına eklenir).
  - Sabit metinler `artifact.ts`'den okunur; künye kutuları ve detay satırları `.map()` ile render edilir (şu an dördü de elle kopyalanmış JSX).
- `client/index.html` ve `useDocumentMeta` çağrıları — metin değişiklikleriyle tutarlı hale getirilir.

Testler: `Home.test.ts` — kaynakta "Orijin" geçmiyor, "Buluntu Yeri" geçiyor; "Alt Bilgi" bloğu yok; `artifact.ts`'deki müze/dönem/konum alanları detay kartı bölümünde referanslanıyor.

---

## Batch 5 — Bitirme ve dayanıklılık

- **Basıma hazır QR**: `scripts/generate-qr.mjs`'e SVG çıktısı ekle (`client/public/qr-code.svg`) — müze etiketi/poster için vektör gerekir, PNG büyütülünce bozulur.
- **iOS USDZ (opsiyonel)**: otomatik üretilen USDZ cihazda yetersiz görünüyorsa elle USDZ üret ve `ios-src` ver.
- **Sesli tasvir borcu**: `client/public/audio/maussollos-description.mp3` **0 byte** (bozuk), `.wav` 3.5 MB. `Home.tsx` yalnızca `.wav` kaynağını veriyor — mobil veride ağır. WAV'ı MP3'e çevir, `<source>` sırasını mp3 → wav yap.
- `Methodology.tsx` — Aşama 5 (QR) ve 3D model/AR bölümleri artık gerçeğe uymuyor; kalıcı `/qr` yönlendirmesi, model-viewer ve WebXR/Quick Look akışıyla güncelle.
- `README.md` / `USER_GUIDE.md` — yeni `/ar` akışı ve QR kalıcılık kuralı.
- Bu plan dökümanı repoya `docs/AR_QR_PLAN.md` olarak kopyalanır (kullanıcı "bir yere md olarak kaydet" dedi; repo içinde kalması ekip için daha yararlı).

---

## Uçtan uca doğrulama

1. `pnpm check` → tip hatası yok.
2. `pnpm vitest run` → QR decode testi, `/qr` redirect testi, `/ar` route testi, içerik testleri yeşil.
3. `pnpm build && node dist/index.js`:
   - `curl -i localhost:3000/qr` → `302`, `Location: /ar`
   - `curl -sI localhost:3000/models/maussollos.glb` → `200`, `content-length` < 10 MB
   - `curl -s localhost:3000/ar | head` → `index.html` (SPA fallback çalışıyor)
4. Tarayıcı (masaüstü): `/ar` 3D döner, "i" butonu `/`'a gider, atıf metni görünür.
5. **Gerçek cihaz (şart)**: basılı/ekrandaki QR'ı telefonla tara → `/ar` açılır → "Odana Yerleştir" → heykel zemine oturur. Android Chrome + iOS Safari ayrı ayrı.
6. Deploy sonrası: `curl -i https://hazaloral.site/qr` → `302 /ar`. (Coolify/Docker ve Vercel'de ayrı ayrı; iki hedefin de redirect kuralı var.)

## Riskler

- **DNS**: `hazaloral.site`'in deployment'a bağlı olduğu repo dışında, doğrulanmamış (`df6cede` commit'i de bunu "Not-tested" olarak işaretlemiş). QR basılmadan önce canlı URL'nin gerçekten açıldığı elle teyit edilmeli.
- **Model dosyası** Batch 3'ü bloklar; Batch 1-2 bundan bağımsız ilerler.
- **803k üçgen** modelin sadeleştirilmesi görsel kalite kaybı yaratabilir; kabul edilebilir eşik cihazda gözle kontrol edilir.
- Coolify ve Vercel'de redirect'in **iki ayrı yerde** tanımlı olması ileride birinin güncellenip diğerinin atlanması riskini taşır — bu yüzden her ikisinde de hedef tek bir yorum satırıyla işaretlenecek ("QR hedefi — Batch 1 planına bak").
