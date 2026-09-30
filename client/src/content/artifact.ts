/**
 * Every visitor-facing string about the statue lives here.
 *
 * Hazal reviews and rewrites this copy, so it is deliberately kept out of the
 * JSX: updating a label or a paragraph should never mean touching layout code.
 */
export const artifact = {
  title: "Maussollos Heykeli",
  subtitle:
    "Halikarnassos Mausolesi'nden mermer heykel, British Museum'da sergilenmektedir",

  /** 2x2 künye grid'i. */
  facts: [
    { label: "Yükseklik", value: "3 metre" },
    { label: "Malzeme", value: "Mermer" },
    { label: "Dönem", value: "M.Ö. 350" },
    { label: "Buluntu Yeri", value: "Halikarnassos" },
  ],

  /** "Detayları Göster" kartının içeriği. */
  details: {
    about:
      "Bu devasa mermer heykel, Pers İmparatorluğu'nun bir satrabı olan Maussollos'u temsil eder. Antik Dünyanın Yedi Harikasından biri olan Halikarnassos Mausolesi'nde keşfedilmiştir.",
    features: [
      "Akan saçlar ve kısa kıvırcık sakal",
      "Uzun chiton ve himation kumaş drape",
      "Elinde kılıç kınını tutuyor",
      "Bağlı metal çerçeveli sandalet",
    ],
    excavation:
      "1857 yılında Sir Charles Thomas Newton tarafından kazılmıştır. Şu anda British Museum'un Yunan ve Roma Departmanı'nda (Galeri G21) sergilenmektedir.",
    /** Eskiden sayfa altındaki 3 kolonluk bloktaydı, artık bu kartın içinde. */
    provenance: [
      { label: "Müze", value: "British Museum, Londra", note: "Yunan ve Roma Departmanı" },
      { label: "Dönem", value: "Klasik Yunan", note: "Yaklaşık M.Ö. 350" },
      { label: "Konum", value: "Halikarnassos Mausolesi", note: "Bodrum, Türkiye" },
    ],
    museumNumber: "1857,1220.232",
  },
} as const;
