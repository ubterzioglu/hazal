/**
 * Every visitor-facing string about the statue lives here.
 *
 * Hazal reviews and rewrites this copy, so it is deliberately kept out of the
 * JSX: updating a label or a paragraph should never mean touching layout code.
 */
export type Language = "tr" | "en";

export const artifact = {
  title: "Mausolos- Giyimli Erkek Heykeli",
  subtitle: "Bodrum’un kültürel mirasının eksik parçalarından biri",

  /**
   * Bilgi kartı: küratöryel metin, başlıklar dahil Hazal'ın metniyle birebir.
   * Eser Batı merkezli dönem etiketleriyle anılmaz: kültürü Karia'dır.
   */
  info: {
    tr: {
      facts: [
        { label: "İsim", value: "Mausolos- Giyimli Erkek Heykeli" },
        { label: "Yıl", value: "MÖ 350 Civarı" },
        {
          label: "Ölçüler",
          value: "Yükseklik: 3 metre, Kalınlık: 0,68 metre, Genişlik: 1,12 metre",
        },
        { label: "Ait Olduğu Yer", value: "Bodrum/ Tepecik Mahallesi" },
        { label: "Yitirildiği Yıl", value: "1856-1857" },
        { label: "Götürüldüğü Yer", value: "Londra/British Museum" },
      ],
      descriptionLabel: "Açıklama",
      description:
        "Bodrum’un kültürel mirasının eksik parçalarından biri olan bu heykel, 170 yıldır ait olduğu topraklardan uzaktadır. Bodrumlu bir Türkün tarlasından Charles Thomas Newton tarafından çıkarılıp İngiltere’ye götürülmüştür. Hekatomnos’un oğlu Mausolos olduğu düşünülen bu görkemli heykelin kimin temsili olduğu kesin olarak bilinmemektedir ancak, ait olduğu Karia Bölgesi’ne ve Anadolu’ya özgü nitelikler gösterdiği şüphesizdir.",
    },
    en: {
      facts: [
        { label: "Name", value: "So-called Mausolos – Draped Male Statue" },
        { label: "Date", value: "Circa 350 BC" },
        {
          label: "Dimensions",
          value: "Height: 3 m; Depth: 0.68 m; Width: 1.12 m",
        },
        { label: "Place of Origin", value: "Bodrum / Tepecik Neighbourhood" },
        { label: "Year of Loss", value: "1856–1857" },
        { label: "Taken to", value: "London / British Museum" },
      ],
      descriptionLabel: "Description",
      description:
        "One of the missing pieces of Bodrum’s cultural heritage, this statue has been away from the land to which it belongs for 170 years. It was unearthed by Charles Thomas Newton from a field owned by a Turkish resident of Bodrum and taken to England. Although this magnificent statue is thought to represent Mausolos, son of Hekatomnos, the identity of the person depicted remains uncertain. However, there is no doubt that it exhibits characteristics distinctive of Caria and Anatolia, to which it belongs.",
    },
  },

  /** Ana sayfadaki "Heykeli odana nasıl yerleştirirsin?" rehberi. */
  arGuide: {
    title: "Heykeli Odana Nasıl Yerleştirirsin?",
    intro: "Telefonunla beş adımda Mausolos'u bulunduğun mekâna getir.",
    steps: [
      {
        title: "Deneyimi aç",
        text: "QR kodu telefonunun kamerasıyla tara ya da bu sayfadaki \"AR'da Gör\" butonuna dokun.",
      },
      {
        title: "AR'ı başlat",
        text: "Heykel ekranda belirince \"Odana Yerleştir\" butonuna dokun. Kamera izni istenirse izin ver.",
      },
      {
        title: "Zemini tarat",
        text: "Telefonu zemine doğru tut ve yavaşça sağa sola gezdir. Zemin algılanınca heykel yere oturur.",
      },
      {
        title: "Yerini ayarla",
        text: "Tek parmakla sürükleyerek taşı, iki parmakla döndür. Heykel 3 metre olduğu için sığmazsa iki parmağını birbirine yaklaştırarak küçült.",
      },
      {
        title: "Etrafında dolaş",
        text: "Heykelin çevresinde yürüyerek detaylarını incele. İşin bitince AR ekranını kapatıp sayfaya dön.",
      },
    ],
    tips: [
      "iPhone'da Safari, Android'de Chrome kullan.",
      "iPhone'da açılan ekranda üstten \"AR\" seçeneğine dokun. Heykel yarım boyutta gelir, iki parmağınla büyütebilirsin.",
      "İyi aydınlatılmış, geniş, boş ve desenli olmayan bir zemin seç.",
      "Heykeli göremiyorsan biraz geri çekil ya da iki parmağınla küçült.",
      "Android telefonun Google AR hizmetini yüklemeni isterse yükle.",
      "Kameran QR kodu okumazsa Google Lens veya bir QR okuyucu kullan.",
      "Bilgisayarda heykeli yalnızca 3 boyutlu döndürebilirsin, odaya yerleştirmek için telefon gerekir.",
    ],
  },
} as const;

/** Rehber bölümünün sayfa içi bağlantı hedefi. */
export const AR_GUIDE_ID = "odana-yerlestir";
