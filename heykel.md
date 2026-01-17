# Heykel 3D Model Olusturma Kilavuzu  
  
## 1. Hazirlik Asamasi  
 
### 1.1. Gerekli Ekipmanlar  
- Yksek ‡”znrlkl bir dijital kamera veya profesyonel bir cep telefonu  
- š‡ ayak (tripod)  
- Sabit ve yeterli isiklandirma  
- Heykelin etrafinda dolasmak i‡in yeterli alan  
- Heykelin 360ø g”rnmn alabilmek i‡in farkli yksekliklerde erisim  
 
### 1.2. Heykel Se‡imi ve Konumlandirmasi  
- Heykelin net ve detayli fotograflanabilecek kadar iyi bir isik altinda oldugundan emin olun  
- Arka planda hareketli ”geler (aga‡ yapraklari, su vs.) olmamali  
- Heykelin etrafinda gvenli bir sekilde dolasim alani olmali  
- Heykelin yzeyinde parlatici (glossy) malzemeler varsa, yansimayi en aza indirmek i‡in isik a‡isini dikkatlice ayarlayin  
 
## 2. Fotograf €ekim Asamasi  
  
### 2.1. Genel €ekim Kurallari  
- Minimum 40, ideal olarak 80-120 fotograf ‡ekilmeli  
- Her fotograf net ve bulanik olmamali  
- Ayni kamera ve lens kullanmali  
- Isiklandirma sabit olmali (g”lge degisimi olmamali)  
- Hareketli arka planlardan ka‡inilmali  
 
  
### 2.2. €ekim Y”ntemi  
- **360ø Tur:** Heykelin ‡evresinde esit araliklarla (”rnegin her 15-30 derecede) fotograflar ‡ekilmeli  
- **Farkli Ykseklikler:** En az 3 farkli ykseklikten (alt, orta, st) ‡ekim yapilmali:  
  - Alt seviye: Heykelin alt kismini ve tabanini g”stermeli  
  - Orta seviye: Heykelin genel g”rnmn ve detaylarini g”stermeli  
  - šst seviye: Heykelin st kismini ve detaylarini g”stermeli (mmknse)  
- **Yakin €ekimler:** ™zellikle karmasik detaylarin bulundugu b”lgeler i‡in ekstra yakin ‡ekimler yapilmali  
- **™rtsme:** Ardisik fotograflar arasinda %60-80 ”rtsme olmali  
 
### 2.3. €ekim ™nerileri  
- Her fotografin %70-80'inde heykel olmali  
- Heykel karenin merkezinde olmali  
- Farkli isik kosullarinda birden fazla ‡ekim yapilmasi ”nerilir  
- Heykelin her tarafina erisim saglanamiyorsa, bu kisimlarin sinirli kalacagini g”z ”nnde bulundurun  
  
## 3. 3D Model Olusturma  
  
### 3.1. Photogrammetry Yazilimi Se‡imi  
Popler photogrammetry yazilimlari:  
- Agisoft Metashape  
- RealityCapture  
- Autodesk ReCap Photo  
- Meshroom (cretsiz alternatif)  
 
### 3.2. Model Olusturma Sreci  
1. **Fotograflarin i‡e aktarilmasi:** Tm ‡ekilen fotograflar yazilima aktarilir  
2. **Hizalama:** Yazilim fotograflar arasindaki benzerlikleri analiz ederek kamera pozisyonlarini belirler  
3. **Nokta bulutu olusturma:** Ilk 3D veri olusturulur  
4. **Mesh olusturma:** Nokta bulutundan yzey modeli olusturulur  
5. **Texture olusturma:** Orijinal fotograflardan doku haritasi olusturulur  
6. **Temizleme ve optimize etme:** Grlt ve hatalarin giderilmesi  
  
### 3.3. Model Kalitesi Iyilestirme  
- Nokta bulutu ve mesh yogunlugunu artirarak detay kalitesini iyilestirin  
- Grlt ve istenmeyen unsurlari kaldirin  
- Modelin kapali (watertight) oldugunu ve delik olmadigini kontrol edin  
- ™l‡ek dogrulugunu koruyun (gerekiyorsa referans nesnelerle)  
 
## 4. Format D”nstrme  
  
### 4.1. GLB Formati (Web ve Android i‡in)  
- 3D modeli GLB formatinda disa aktarin  
- Doku boyutlarini optimize edin (”rnegin 2048x2048 piksel)  
- Poligon sayisini optimize edin (web i‡in 50K-100K ‡gen ”nerilir)  
- LOD (Level of Detail) seviyeleri olusturarak farkli mesafeler i‡in optimize edin  
  
### 4.2. USDZ Formati (iOS AR i‡in)  
- 3D modeli USDZ formatinda disa aktarin  
- Apple'in AR Quick Look uyumlulugu i‡in y”nergeleri takip edin  
- Doku ‡”znrlklerini optimize edin  
- AR i‡in uygun ”l‡ek ve boyutlara g”re ayarlayin  
 
## 5. Test ve Dogrulama  
  
### 5.1. Model Kontrolleri  
- Modelin tm y”nlerden dogru g”rndgn kontrol edin  
- Doku atamalarinin dogru yapildigini dogrulayin  
- Modelin i‡inde bosluk veya ‡akisan yzeyler olmadigindan emin olun  
- Dosya boyutlarinin hedef platformlara uygun oldugundan emin olun  
  
### 5.2. Platform Testleri  
- GLB modeli web tarayicisinda test edin  
- USDZ modeli iOS cihazinda AR uygulamasi ile test edin  
- Android cihazda WebAR ile test edin  
- Farkli cihazlarda performans ve g”rnt kalitesini kontrol edin  
 
## 6. Ekstra Ipu‡lari  
  
### 6.1. Isik ve G”lge Y”netimi  
- Fotograflarin hepsi ayni gn ve benzer isik kosullarinda ‡ekilmeli  
- G”lge degisiminin ‡ok hizli oldugu zamanlardan (gnes dogumu/gn batimi) ka‡inin  
- Bulutlu gnlerde daha sabit isik elde edebilirsiniz  
  
### 6.2. Post-Processing  
- Gerekirse fotograflarda hafif renk ve kontrast ayarlamalari yapilabilir  
- Ancak bu islemlerin model olusturma srecine zarar vermeyeceginden emin olun  
- Parlatici yzeylerde yansima sorunlarini azaltmak i‡in HDR ‡ekimler dsnlebilir  
  
### 6.3. Veri Depolama ve Organizasyon  
- Her heykel i‡in ayri bir klas”r olusturun  
- Ham fotograflar, ara dosyalar ve nihai modelleri ayri klas”rlerde saklayin  
- Dosya isimlendirme standartlari olusturun (”rnegin: heykel_adi_tarih_foto_001.jpg)  
 
## 7. Zaman Tahmini  
  
| Asama | Tahmini Sre |  
|-------|----------------|  
| Foto ‡ekimi | 20-30 dakika |  
| 3D model olusturma | 1-3 saat (bilgisayar islem sresi) |  
| Model temizleme | 30-60 dakika |  
| Format d”nsmleri | 10-15 dakika |  
| Test ve dogrulama | 15-30 dakika |  
  
**Toplam tahmini sre:** 2-5 saat (ilk heykel i‡in)  
  
---  
Bu kilavuz, tek bir heykel i‡in 3D model olusturma srecini detayli olarak a‡iklamaktadir. Her heykelin kendine ”zg zorluklari olabilecegini g”z ”nnde bulundurarak, bu sre‡te sabirli ve titiz olmaniz ”nemlidir. 
