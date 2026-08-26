import { militaryBranches, type MilitaryBranchRecord } from "./military-branches.generated";

export { militaryBranches, type MilitaryBranchRecord };

export type MilitaryProvince = {
  name: string;
  slug: string;
  branches: MilitaryBranchRecord[];
};

export function slugifyLocation(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function militaryBranchPath(record: MilitaryBranchRecord): string {
  return `/askerlik-subeleri/${slugifyLocation(record.province)}/${slugifyLocation(record.district)}/`;
}

const provinceMap = new Map<string, MilitaryBranchRecord[]>();
for (const record of militaryBranches) {
  const records = provinceMap.get(record.province) || [];
  records.push(record);
  provinceMap.set(record.province, records);
}

export const militaryProvinces: MilitaryProvince[] = [...provinceMap.entries()]
  .map(([name, branches]) => ({
    name,
    slug: slugifyLocation(name),
    branches: branches.sort((a, b) => a.district.localeCompare(b.district, "tr-TR"))
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "tr-TR"));

export const militaryProvinceBySlug = new Map(militaryProvinces.map(province => [province.slug, province]));
export const militaryBranchByPath = new Map(
  militaryBranches.map(record => [`${slugifyLocation(record.province)}/${slugifyLocation(record.district)}`, record])
);

export const uniqueMilitaryBranchCount = new Set(
  militaryBranches.map(record => `${record.branchName}|${record.address}`)
).size;

function normalize(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const militarySearchStopwords = new Set([
  "askerlik", "subesi", "sube", "nerede", "nerededir", "nasil", "gidilir", "ulasirim", "ulasim", "telefonu", "telefon",
  "numarasi", "iletisim", "bilgileri", "bilgisi", "konum", "konumu", "navigasyon", "adresi", "adres", "yol", "tarifi", "nedir",
  "hangi", "icin", "bana", "ver", "goster", "ac", "bul"
]);

export function searchMilitaryBranches(query: string, limit = 60): MilitaryBranchRecord[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];
  const terms = normalizedQuery.split(" ").filter(term => !militarySearchStopwords.has(term));
  if (!terms.length) return [];

  return militaryBranches
    .map(record => {
      const province = normalize(record.province);
      const district = normalize(record.district);
      const haystack = normalize(`${record.province} ${record.district} ${record.branchName} ${record.address} ${record.phone} ${record.email}`);
      let score = terms.reduce((total, term) => total + (haystack.includes(term) ? 2 : 0), 0);
      if (terms.includes(district)) score += 8;
      if (terms.includes(province)) score += 4;
      if (`${province} ${district}` === terms.join(" ")) score += 12;
      return { record, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.record.province.localeCompare(b.record.province, "tr-TR") || a.record.district.localeCompare(b.record.district, "tr-TR"))
    .slice(0, limit)
    .map(item => item.record);
}
