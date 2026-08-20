import { writeFile } from "node:fs/promises";

const INTERIOR_URL = "https://www.icisleri.gov.tr/valilikler";
const INTERIOR_DETAIL_URL = "https://www.icisleri.gov.tr/ISAYWebPart/Valilikler/ValilikDetay";
const MSB_SEARCH_URL = "https://www.msb.gov.tr/askeralma";
const MSB_DETAIL_URL = "https://www.msb.gov.tr/Askeralma/AsalAdresDetayMobil";
const VERIFIED_AT = "2026-08-21";
const METROPOLITAN_PROVINCES = new Set([
  "Adana", "Ankara", "Antalya", "Aydın", "Balıkesir", "Bursa", "Denizli", "Diyarbakır", "Erzurum", "Eskişehir",
  "Gaziantep", "Hatay", "İstanbul", "İzmir", "Kahramanmaraş", "Kayseri", "Kocaeli", "Konya", "Malatya", "Manisa",
  "Mardin", "Mersin", "Muğla", "Ordu", "Sakarya", "Samsun", "Şanlıurfa", "Tekirdağ", "Trabzon", "Van"
]);
const LEGACY_DISTRICT_LOOKUPS = new Map([
  ["Çankırı|İlgaz", ["Ilgaz"]],
  ["Mardin|Artuklu", ["Merkez"]],
  ["Ordu|Altınordu", ["Merkez"]],
  ["Sakarya|Adapazarı", ["Merkez"]],
  ["Samsun|19 Mayis", ["19 Mayıs", "Ondokuzmayıs"]],
  ["Samsun|İlkadım", ["Merkez"]],
  ["Siirt|Tillo", ["Aydınlar"]],
  ["Trabzon|Ortahisar", ["Merkez"]]
]);
const CURRENT_DISTRICT_CORRECTIONS = new Map([
  ["Çankırı|İlgaz", "Ilgaz"],
  ["Samsun|19 Mayis", "19 Mayıs"]
]);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function decodeHtml(value) {
  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchText(url, init = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
        headers: {
          "user-agent": "nereyebasvurulur.com official-source-verifier/1.0",
          ...(init.headers || {})
        }
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await sleep(attempt * 500);
    } finally {
      clearTimeout(timeout);
    }
  }
  throw lastError;
}

function parseProvinceCards(html) {
  const matches = [...html.matchAll(/onclick="ModalGetir\((\d+)\)"[\s\S]*?<h3 class="cityname">([\s\S]*?)<\/h3>/g)];
  return matches.map(match => ({ key: Number(match[1]), province: decodeHtml(match[2]) }));
}

function parseDistricts(html) {
  return [...html.matchAll(/<h5>([\s\S]*?)<\/h5>/g)].map(match => decodeHtml(match[1]));
}

function parseBranch(html) {
  const fields = {};
  const pattern = /<span class="item-txt">([\s\S]*?)<\/span>\s*<span>([\s\S]*?)<\/span>/g;
  for (const match of html.matchAll(pattern)) fields[decodeHtml(match[1])] = decodeHtml(match[2]);
  if (!fields["Şube Adı"] || !fields["Yazışma Adresi"]) return null;
  return {
    branchName: fields["Şube Adı"],
    regionalOffice: fields["Bağlı Bulunduğu ASAL Blg. Bşk.lığı"] || "",
    phone: fields.Telefon || "",
    fax: fields.Belgegeçer || "",
    email: fields["E-Posta Adresi"] || "",
    address: fields["Yazışma Adresi"],
    officialProvince: fields.İl || "",
    officialDistrict: fields.İlçe || ""
  };
}

function districtLookupCandidates(province, district) {
  const candidates = new Set([district]);
  const indexes = [...district].map((character, index) => character === "i" ? index : -1).filter(index => index >= 0);
  for (let mask = 1; mask < 2 ** indexes.length; mask += 1) {
    const characters = [...district];
    indexes.forEach((index, bit) => {
      if (mask & (1 << bit)) characters[index] = "ı";
    });
    candidates.add(characters.join(""));
  }
  for (const alias of LEGACY_DISTRICT_LOOKUPS.get(`${province}|${district}`) || []) candidates.add(alias);
  return [...candidates];
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: limit }, run));
  return results;
}

function renderGenerated(records) {
  const header = `// Generated from official MSB and Ministry of Interior sources on ${VERIFIED_AT}.\n`;
  return `${header}export type MilitaryBranchRecord = {\n  province: string;\n  district: string;\n  slug: string;\n  branchName: string;\n  regionalOffice: string;\n  phone: string;\n  fax: string;\n  email: string;\n  address: string;\n  officialProvince: string;\n  officialDistrict: string;\n  directionsUrl: string;\n  officialSourceUrl: string;\n  lookupDistrict: string;\n  lastVerified: string;\n};\n\nexport const militaryBranches: MilitaryBranchRecord[] = ${JSON.stringify(records, null, 2)};\n`;
}

const interiorHtml = await fetchText(INTERIOR_URL);
const provinces = parseProvinceCards(interiorHtml);
if (provinces.length !== 81) throw new Error(`Expected 81 provinces, found ${provinces.length}.`);

const provinceDetails = await mapLimit(provinces, 6, async province => {
  const html = await fetchText(INTERIOR_DETAIL_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ cKey: province.key })
  });
  return { ...province, districts: parseDistricts(html) };
});

const districtQueries = provinceDetails.flatMap(item => {
  const names = [...new Set([...(METROPOLITAN_PROVINCES.has(item.province) ? [] : ["Merkez"]), ...item.districts])];
  return names.map(district => ({ province: item.province, district }));
});

const fetched = await mapLimit(districtQueries, 8, async query => {
  for (const lookupDistrict of districtLookupCandidates(query.province, query.district)) {
    const url = new URL(MSB_DETAIL_URL);
    url.searchParams.set("il", query.province.toLocaleUpperCase("tr-TR"));
    url.searchParams.set("ilce", lookupDistrict.toLocaleUpperCase("tr-TR"));
    const html = await fetchText(url);
    const branch = parseBranch(html);
    if (branch) return { query, branch, lookupDistrict };
  }
  return { query, branch: null, lookupDistrict: null };
});

const records = fetched
  .filter(item => item.branch)
  .map(({ query, branch, lookupDistrict }) => {
    const legacyAliases = LEGACY_DISTRICT_LOOKUPS.get(`${query.province}|${query.district}`) || [];
    const district = CURRENT_DISTRICT_CORRECTIONS.get(`${query.province}|${query.district}`)
      || (lookupDistrict !== query.district && !legacyAliases.includes(lookupDistrict) ? lookupDistrict : query.district);
    const destination = `${branch.branchName}, ${branch.address}`;
    return {
      province: query.province,
      district,
      slug: `${slugify(query.province)}-${slugify(district)}-askerlik-subesi`,
      ...branch,
      directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`,
      officialSourceUrl: MSB_SEARCH_URL,
      lookupDistrict,
      lastVerified: VERIFIED_AT
    };
  })
  .sort((a, b) => a.province.localeCompare(b.province, "tr-TR") || a.district.localeCompare(b.district, "tr-TR"));

const missing = fetched.filter(item => !item.branch).map(item => item.query);
const uniqueBranches = new Set(records.map(record => `${record.branchName}|${record.address}`));

await writeFile(new URL("../src/military-branches.generated.ts", import.meta.url), renderGenerated(records));
await writeFile(new URL("../work/military-branches-report.json", import.meta.url), JSON.stringify({
  generatedAt: new Date().toISOString(),
  sources: [INTERIOR_URL, MSB_SEARCH_URL],
  provinces: provinces.length,
  ministryDistricts: provinceDetails.reduce((sum, item) => sum + item.districts.length, 0),
  queries: districtQueries.length,
  publishedDistrictPages: records.length,
  uniqueBranches: uniqueBranches.size,
  missing
}, null, 2));

console.log(JSON.stringify({
  provinces: provinces.length,
  ministryDistricts: provinceDetails.reduce((sum, item) => sum + item.districts.length, 0),
  queries: districtQueries.length,
  publishedDistrictPages: records.length,
  uniqueBranches: uniqueBranches.size,
  missing: missing.length
}, null, 2));
