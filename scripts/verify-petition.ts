import { renderPetitionBuilder } from "../src/petition";

const page = renderPetitionBuilder();

function assertMatch(pattern: RegExp, message: string): void {
  if (!pattern.test(page)) throw new Error(message);
}

assertMatch(/<html lang="tr">/, "Dilekçe sayfasının dili Türkçe olmalı.");
assertMatch(/rel="canonical" href="https:\/\/nereyebasvurulur\.com\/dilekce-olustur\/"/, "Canonical adres eksik.");
assertMatch(/id="petitionForm"/, "Dilekçe formu eksik.");
assertMatch(/id="petitionRequest"[^>]*required[^>]*minlength="20"/, "Talep alanı zorunlu ve asgari uzunluklu olmalı.");
assertMatch(/id="recipient"[^>]*required/, "Başvurulacak makam alanı zorunlu olmalı.");
assertMatch(/id="fullName"[^>]*required/, "Ad-soyad alanı zorunlu olmalı.");
assertMatch(/id="address"[^>]*required/, "Adres alanı zorunlu olmalı.");
assertMatch(/id="petitionDate"[^>]*required/, "Tarih alanı zorunlu olmalı.");
assertMatch(/id="identityNumber"[^>]*pattern="\[0-9\]\{11\}"/, "İsteğe bağlı kimlik numarası biçim kontrolü eksik.");
assertMatch(/Word olarak indir \(\.doc\)/, "Word indirme eylemi eksik.");
assertMatch(/Yazdır \/ PDF kaydet/, "PDF/yazdırma eylemi eksik.");
assertMatch(/Metni kopyala/, "Metin kopyalama eylemi eksik.");
assertMatch(/new URLSearchParams\(window\.location\.search\)/, "Rota parametrelerini okuyan dilekçe ön doldurma köprüsü eksik.");
assertMatch(/params\.get\("merci"\)/, "Dilekçe merci ön doldurma parametresi eksik.");
assertMatch(/params\.get\("konu"\)/, "Dilekçe konu ön doldurma parametresi eksik.");
assertMatch(/params\.get\("kaynak"\)/, "Kaynak rotaya dönüş parametresi eksik.");
assertMatch(/id="sourceRouteLink"/, "Dilekçeden kaynak rotaya dönüş bağlantısı eksik.");
assertMatch(/Bilgileriniz size ait kalır\./, "Yerel işlem gizlilik açıklaması eksik.");
assertMatch(/MevzuatMetin\/1\.5\.3071\.pdf/, "3071 sayılı Kanun resmî kaynak bağlantısı eksik.");
assertMatch(/3071 sayılı Kanun uyarınca ad-soyad, imza ve iş veya ikametgâh adresi zorunludur\./, "Kanuni zorunlu alan açıklaması eksik.");
if (/localStorage|sessionStorage|fetch\(/.test(page)) throw new Error("Dilekçe bilgileri depolanmamalı veya sunucuya gönderilmemeli.");

console.log("Dilekçe modülü: zorunlu alanlar, gizlilik, resmî kaynak ve indirme seçenekleri doğrulandı.");
