import type { RouteRecord } from "./data";

export type QualityIssueCode =
  | "missing-official-source"
  | "missing-direct-application-link"
  | "missing-appeal-route"
  | "missing-e-government-bridge"
  | "missing-petition-reference"
  | "stale-verification"
  | "conflicting-sources";

export type QualityIssue = {
  code: QualityIssueCode;
  message: string;
};

function isOfficialSource(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === "turkiye.gov.tr" || host.endsWith(".turkiye.gov.tr") || host === "resmigazete.gov.tr" || host.endsWith(".gov.tr");
  } catch {
    return false;
  }
}

function daysBetween(from: string, to: string): number {
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return Number.POSITIVE_INFINITY;
  return Math.floor((end - start) / 86_400_000);
}

export function assessRouteQuality(route: RouteRecord, asOf = new Date().toISOString().slice(0, 10)): QualityIssue[] {
  const issues: QualityIssue[] = [];
  if (!route.sources.length || !route.sources.some(source => isOfficialSource(source.url))) {
    issues.push({ code: "missing-official-source", message: "En az bir erişilebilir resmî kaynak eksik." });
  }
  if (!route.applicationChannels.some(channel => Boolean(channel.url))) {
    issues.push({ code: "missing-direct-application-link", message: "Doğrudan resmî başvuru veya işlem bağlantısı eksik." });
  }
  if (!route.escalation.length || !route.deadlineAndAppeal.trim()) {
    issues.push({ code: "missing-appeal-route", message: "İtiraz veya üst başvuru yolu eksik." });
  }
  if (route.eGovernmentAvailable && !route.applicationChannels.some(channel => channel.type === "e-government" && Boolean(channel.url))) {
    issues.push({ code: "missing-e-government-bridge", message: "Var olduğu işaretlenen e-Devlet köprüsü eksik." });
  }
  if (route.petitionRequired && !route.petitionReference) {
    issues.push({ code: "missing-petition-reference", message: "Dilekçe gereken rotada oluşturucu bağlantı bilgisi eksik." });
  }
  if (daysBetween(route.lastVerified, asOf) > route.reviewCadence) {
    issues.push({ code: "stale-verification", message: `Son doğrulama ${route.reviewCadence} günlük kontrol periyodunu aştı.` });
  }
  if (route.sourceConflicts.length) {
    issues.push({ code: "conflicting-sources", message: `Çözümlenmemiş kaynak çelişkisi: ${route.sourceConflicts.join("; ")}` });
  }
  return issues;
}

export function summarizeQuality(routes: RouteRecord[], asOf?: string) {
  const rows = routes.map(route => ({ route, issues: assessRouteQuality(route, asOf) }));
  const counts = Object.fromEntries([
    "missing-official-source",
    "missing-direct-application-link",
    "missing-appeal-route",
    "missing-e-government-bridge",
    "missing-petition-reference",
    "stale-verification",
    "conflicting-sources"
  ].map(code => [code, rows.filter(row => row.issues.some(issue => issue.code === code)).length])) as Record<QualityIssueCode, number>;
  return {
    routesWithIssues: rows.filter(row => row.issues.length).length,
    issueCount: rows.reduce((sum, row) => sum + row.issues.length, 0),
    counts,
    rows
  };
}
