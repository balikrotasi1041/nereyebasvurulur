import type { Announcement } from "./announcements";

// A new reserve result updates the existing event; earlier source checks retain their dates.
export function refreshOctober10(item: Announcement): Announcement {
  if (item.slug !== "2026-gsb-yurt-basvuru-sonuclari-sorgulama") return item;
  return {
    ...item,
    title: "GSB yurt yedek sonuçları: 9 Ekim yerleştirmesini kontrol edin",
    lastModified: "2026-10-10",
    summary: "KYGM, 9 Ekim 2026 yurt yedek yerleştirme sonuçlarını duyurdu. Kişisel sonucu ve kayıt sürenizi e-Devlet'ten kontrol edin; ilk yerleştirmenin 10 Eylül son tarihi bu yeni sonuca uygulanmaz.",
    details: ["10 Ekim kontrolü: KYGM'nin 9 Ekim sonuç duyurusu e-Devlet Yurt Başvuru Sonucu Sorgulama hizmetine yönlendiriyor. Ortak yeni kayıt saati açıklanmıyor; kişisel sonuç ekranını esas alın.", ...item.details.slice(1)],
    sources: [{ title: "9 Ekim 2026 yurt yedek yerleştirme sonuçları; kontrol 10 Ekim", authority: "GSB / KYGM", url: "https://kygm.gsb.gov.tr/Duyuru/302961/09102026-tarihli-yurt-yedek-yerlestirme-sonuclari.aspx" }, ...item.sources.filter(source => !source.url.includes("/Duyuru/302961/"))]
  };
}
