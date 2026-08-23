export type ThresholdKey = "consumer-dispute-thh";

export type AnnualThreshold = {
  key: ThresholdKey;
  label: string;
  year: number;
  amount: number;
  currency: "TRY";
  comparison: "under" | "at-or-under";
  validFrom: string;
  validThrough: string;
  sourceTitle: string;
  sourceUrl: string;
  lastVerified: string;
  reviewCadence: number;
};

export const annualThresholds: Record<ThresholdKey, AnnualThreshold> = {
  "consumer-dispute-thh": {
    key: "consumer-dispute-thh",
    label: "Tüketici Hakem Heyeti görev sınırı",
    year: 2026,
    amount: 186_000,
    currency: "TRY",
    comparison: "under",
    validFrom: "2026-01-01",
    validThrough: "2026-12-31",
    sourceTitle: "6502 sayılı Kanunun 68 inci maddesindeki parasal sınırların artırılmasına ilişkin 2026 Tebliği",
    sourceUrl: "https://www.resmigazete.gov.tr/eskiler/2025/12/20251223-5.htm",
    lastVerified: "2026-08-23",
    reviewCadence: 90
  }
};

export function formatThreshold(key: ThresholdKey): string {
  const threshold = annualThresholds[key];
  const amount = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(threshold.amount);
  const comparison = threshold.comparison === "under" ? "altındaki" : "ve altındaki";
  return `${threshold.year} yılında ${amount} TL ${comparison} tüketici uyuşmazlıklarında Tüketici Hakem Heyetine başvuru zorunludur. Bu sınır her yıl değişir.`;
}
