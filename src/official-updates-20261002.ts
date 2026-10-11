import type { Announcement } from "./announcements";

const tircusNotice = "https://ticaret.gov.tr/duyurular/tircus-uygulamasina-giris";
const result = "https://sinavsonucu.ticaret.gov.tr/Duyuru/Sonuc/aa7a345a-6cfc-49f4-b036-7b86b7b25862";

export const officialAnnouncementsOctober2: Announcement[] = [
  {
    slug: "2026-tircus-e-devlet-e-imza-giris",
    title: "TIRCUS girişinde e-Devlet veya e-İmza kullanılacak",
    authority: "Ticaret Bakanlığı", kind: "guide",
    publishedAt: "2026-10-01", verifiedAt: "2026-10-02", lastModified: "2026-10-02",
    summary: "Ticaret Bakanlığı, TIR Ön Beyan (TIRCUS) uygulamasına ortak giriş noktasındaki e-Devlet veya e-İmza seçenekleriyle girileceğini duyurdu. İşlem yapacak kullanıcılar resmî uygulamaya bu kanallardan erişmeli.",
    details: [
      "Bakanlığın 1 Ekim duyurusunda uygulama adresi uygulama.gtb.gov.tr/tircus olarak gösteriliyor. Bu kayıt yalnız sisteme giriş kanalını açıklıyor; yeni beyan süresi, ücret veya başvuru hakkı ilan etmiyor.",
      "Giriş için Bakanlığın duyurusundaki resmî bağlantıyı izleyin ve ortak giriş ekranında belirtilen kimlik doğrulama yöntemini seçin. Duyuru, oturum sonrasındaki beyan veya yetki koşulları hakkında yeni bir kural açıklamıyor."
    ],
    actions: ["Bakanlığın güncel giriş duyurusunu açın.", "Duyurudaki TIRCUS adresinde e-Devlet veya e-İmza seçeneğini kullanın."],
    actionUrl: tircusNotice, actionLabel: "TIRCUS resmî giriş duyurusunu aç",
    relatedPathKeys: [], relatedSearches: ["TIR ön beyan", "TIRCUS e Devlet giriş"],
    sources: [{ title: "1 Ekim: TIRCUS giriş kanalları", authority: "Ticaret Bakanlığı", url: tircusNotice }, { title: "TIRCUS resmî uygulama adresi", authority: "Ticaret Bakanlığı", url: "https://uygulama.gtb.gov.tr/tircus" }]
  },
  {
    slug: "2026-ticaret-bilisim-basvuru-sonuclari-sinav-cagrisi",
    title: "Ticaret Bakanlığı bilişim alımı: kişisel başvuru sonucu ve sınav çağrısı",
    authority: "Ticaret Bakanlığı", kind: "result",
    publishedAt: "2026-10-01", verifiedAt: "2026-10-02", lastModified: "2026-10-02",
    summary: "Ticaret Bakanlığı, 31 Temmuz ilanına yapılan sözleşmeli bilişim personeli başvurularının sonuçlarını açıkladı. Adaylar kendi sonuçlarını ve varsa sözlü/uygulamalı sınav tarihlerini resmî sonuç sisteminden kontrol etmeli.",
    details: [
      "Bu duyuru yeni başvuru açmıyor ve nihai işe yerleşme sonucu değildir. Başvurunun kabul edilmeme gerekçesi Bakanlığın sonuç sistemi veya Kariyer Kapısı üzerinden görülebilir.",
      "Sınava çağrılan adayın kendi sınav tarihinde resmî duyurudaki yerde hazır bulunması, T.C. kimlik kartını ve başvuruda istenen belgelerin asıllarını getirmesi gerekiyor. Herkese ortak bir sınav günü veya itiraz süresi eklenmedi."
    ],
    actions: ["Bakanlığın sonuç sisteminde kişisel başvuru durumunuzu kontrol edin.", "Çağrı varsa tarih ve yeri okuyup kimlik kartınızı ve belge asıllarını hazırlayın."],
    actionUrl: result, actionLabel: "Ticaret Bakanlığı kişisel sonucunu aç",
    relatedPathKeys: [], relatedSearches: ["Ticaret Bakanlığı bilişim sınav çağrısı", "sözleşmeli bilişim başvuru sonucu"],
    sources: [{ title: "1 Ekim: bilişim personeli başvuru sonuçları ve sınav belgeleri", authority: "Ticaret Bakanlığı", url: "https://personel.ticaret.gov.tr/duyurular/sozlesmeli-bilisim-personeli-alimi-basvuru-sonuclarina-iliskin-duyuru-01-10-2026" }, { title: "Bakanlık Sonuç Yönetim Sistemi", authority: "Ticaret Bakanlığı", url: result }, { title: "Kariyer Kapısı", authority: "Kariyer Kapısı", url: "https://kariyerkapisi.gov.tr/" }]
  }
];
