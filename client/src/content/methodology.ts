/**
 * Copy for the methodology page, kept plain so a non-technical reader can
 * follow it and Hazal can edit it without touching layout code.
 */
export const methodology = {
  title: "Bu Uygulama Nasıl Hazırlandı?",
  intro: [
    "Bu uygulama, 19. yüzyıl İngiliz kazılarında Bodrum’dan götürülen ve Mausolos olarak bilinen giyimli erkek heykelini, artırılmış gerçeklik yoluyla Bodrum Mausoleion Anıt Müzesi’nde temsil etmek için hazırlanmıştır.",
    "Amaç, heykelin yokluğunu görünür kılmak ve varlığını Bodrum’un kültür hafızasında güçlendirmektir.",
  ],
  steps: [
    {
      title: "Eser ve bilgilendirme metni belirlendi",
      text: "Tez araştırması doğrultusunda heykel seçildi. Künye ve açıklama metni, yitiklik durumunu vurgulayacak şekilde Türkçe ve İngilizce hazırlandı.",
    },
    {
      title: "3D model hazırlandı",
      text: "Heykel bu çalışma için yeniden taranmadı. artfletch tarafından Sketchfab’de CC BY 4.0 lisansıyla paylaşılan 3D tarama kullanıldı. Taramada iki heykel bulunduğu için yalnızca Mausolos ayrıldı, model telefonlarda rahat açılacak şekilde hafifletildi ve 3 metrelik gerçek boyutuna getirildi.",
    },
    {
      title: "Model artırılmış gerçekliğe aktarıldı",
      text: "Model web sayfasına eklendi. Ziyaretçi uygulama indirmeden, Android’de Google’ın AR altyapısıyla, iPhone’da Apple’ın AR Quick Look özelliğiyle heykeli bulunduğu mekâna yerleştirebilir.",
    },
    {
      title: "Bilgi ve sesli tasvir eklendi",
      text: "Bilgiler AR ekranından tek dokunuşla açılır. Görme engelli ve görmekte zorlanan ziyaretçiler için künye ve açıklama, yapay zekâ destekli Türkçe seslendirmeyle sesli tasvir olarak sunuldu. Ses istenildiğinde açılıp kapatılabilir.",
    },
    {
      title: "QR kod ile erişim sağlandı",
      text: "Ziyaretçi QR kodu telefonuyla okutarak deneyime ulaşır. Kod sabit bir adrese bağlı olduğu için site güncellense de basılı QR kod çalışmaya devam eder.",
    },
  ],
  conclusion: {
    title: "Sonuç ve Gelecek Çalışmalar",
    achievedTitle: "Ortaya Çıkan Uygulama",
    achieved: [
      "QR kod ile açılan, uygulama indirmeyi gerektirmeyen bir AR deneyimi",
      "Heykelin 3 boyutlu incelenebilmesi ve mekâna yerleştirilebilmesi",
      "Türkçe ve İngilizce bilgilendirme",
      "Açılıp kapatılabilen sesli tasvir",
    ],
    futureTitle: "Gelecek Çalışmalar",
    future: [
      { label: "Çok Dilli Destek", text: "Almanca ve Fransızca gibi yeni diller" },
      { label: "Fotoğraf Galerisi", text: "Arşiv fotoğraflarının gösterilmesi" },
      { label: "Sosyal Paylaşım", text: "Deneyimin sosyal medyada paylaşılabilmesi" },
      { label: "Diğer Heykeller", text: "Bodrum’dan götürülen diğer eserlerin AR deneyimleri" },
    ],
  },
} as const;
