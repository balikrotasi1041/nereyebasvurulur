import type { Announcement } from "./announcements";

export function refreshSeptember20(item: Announcement): Announcement {
  if (item.slug === "2026-gsb-yurt-basvuru-sonuclari-sorgulama") return {
    ...item, lastModified: "2026-09-20",
    details: [...item.details,
      "20 Eylül ödeme kontrolü: İlk kayıt ücreti ile yurtta kalınan aylara ait düzenli ücret farklı aşamalardır. KYGM'nin 19 Eylül açıklaması aylık ödeme için ayın son iş gününü, SSS ise ayın son gününü ve resmî tatil uzamasını anlatıyor. Bu farklılık burada kesin bir son tarihe dönüştürülmedi. Borç ve güvence bedeli durumunu resmî ödeme ekranından, size uygulanacak süreyi yurt müdürlüğünden gecikmeden doğrulayın; son günü beklemeyin.",
      "KYGM'nin 17 Eylül açıklamasına göre yurtta kalan öğrencilerin izin, nakil talebi ve ücret işlemleri BİZ platformundan yürütülebiliyor. Bu kanal yeni yurt başvurusunun veya kişisel yerleştirme sonucunun yerine geçmez."
    ],
    sources: [...item.sources,
      { title: "19 Eylül KYGM aylık yurt ücreti hatırlatması (SSS ile süre anlatımı farklı)", authority: "GSB / KYGM", url: "https://kygm.gsb.gov.tr/HaberDetaylari/10008/1/303096/yurt-ucretini-zamaninda-odemeyi-unutma.aspx" },
      { title: "KYGM yurt SSS: ilk kayıt ücreti ve aylık ödeme", authority: "GSB / KYGM", url: "https://kygm.gsb.gov.tr/Sayfalar/2678/3200/sikca-sorulan-sorular-yurt.aspx" },
      { title: "BİZ: yurtta kalan öğrencilerin işlem kanalı", authority: "GSB / KYGM", url: "https://kygm.gsb.gov.tr/HaberDetaylari/10008/1/303072/tum-islemler-bizde.aspx" }
    ]
  };
  if (item.slug === "2026-tus-sts-tip-2-donem-sonuclari") return {
    ...item, lastModified: "2026-09-20",
    details: [...item.details, "ÖSYM'nin ayrı duyurusuna göre cevap kâğıtları ve aday cevapları AİS'te 17 Eylül 2026 saat 11.40'tan itibaren 10 gün görüntülenebiliyor. Bu bilgilendirme ekranı belge niteliğinde değil; görüntüleme süresi itiraz veya dava süresi olarak yorumlanmamalı."],
    actions: [...item.actions, "Cevaplarınızı incelemek için AİS'te ilgili sınavın Cevap Kâğıdı Görüntüleme ekranını süre dolmadan açın."],
    sources: [...item.sources, { title: "TUS/STS Tıp: cevap kâğıtları ve aday cevapları", authority: "ÖSYM", url: "https://www.osym.gov.tr/2026-tus-2-donem-sinavi-ile-2026-sts-tip-doktorlugu-2-donem-sinavi-cevap-kgitlari-ve-aday-cevaplari-erisime-acildi" }]
  };
  return item;
}
