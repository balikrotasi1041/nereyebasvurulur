import type { Announcement } from "./announcements";

export function refreshSeptember22(item: Announcement): Announcement {
  if (item.slug !== "2026-gsb-yurt-basvuru-sonuclari-sorgulama") return item;
  return {
    ...item,
    title: "GSB yurt yedek sonuçları: 21 Eylül yerleştirmesini kontrol edin",
    summary: "KYGM, 21 Eylül 2026 yurt yedek yerleştirme sonuçlarını duyurdu. Kişisel sonucunuzu ve kayıt sürenizi e-Devlet'ten kontrol edin; ilk yerleştirmenin 10 Eylül son tarihi bu yeni sonuca uygulanmaz.",
    lastModified: "2026-09-22",
    // The payment-source discrepancy last reviewed on 20 September remains unresolved.
    // Do not turn a result-only check into re-verification of the whole announcement.
    details: ["22 Eylül kontrolü: KYGM'nin 21 Eylül tarihli sonuç duyurusu e-Devlet Yurt Başvuru Sonucu Sorgulama hizmetine yönlendiriyor. Genel duyuruda ortak yeni kayıt saati bulunmuyor; kişisel sonuç ekranını esas alın.", ...item.details.map(detail => detail.startsWith("18 Eylül tarihli yeni sonuç") ? detail.replace("18 Eylül tarihli yeni sonuç", "Önceki 18 Eylül tarihli sonuç") : detail)],
    sources: [{ title: "21.09.2026 tarihli yurt yedek yerleştirme sonuçları (22 Eylül kontrolü)", authority: "GSB / KYGM", url: "https://kygm.gsb.gov.tr/Duyuru/302961/21092026-tarihli-yurt-yedek-yerlestirme-sonuclari.aspx" }, ...item.sources.filter(source => !source.url.includes("/302961/18092026-"))]
  };
}
