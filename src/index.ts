import { categories, problems } from "./data";
import { renderHome, renderNotFound, renderProblem, renderSearch } from "./ui";

const USER_INFORMATION_NOTICE = `<aside role="note" aria-label="Kullanıcı bilgilendirmesi" style="width:min(1120px,calc(100% - 32px));margin:8px auto 0;padding:14px 16px;border:1px solid #f2d38c;border-radius:14px;background:#fff8e7;color:#6b4d00;font:500 .9rem/1.55 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"><strong>Bilgilendirme:</strong> Bu sitede sunulan kurum, başvuru kanalı, süre ve süreç bilgileri genel bilgilendirme ve yönlendirme amacı taşır ve tavsiye niteliğindedir; hukuki danışmanlık, resmî görüş veya kesin işlem garantisi değildir. Bir işlem yapmadan önce ilgili güncel mevzuatı, yetkili kurumun resmî açıklamalarını ve varsa kanunda veya özel düzenlemede öngörülen başvuru/itiraz yollarını incelemeniz kesinlikle tavsiye edilir. Özellikle süreye bağlı işlemlerde yalnızca bu sitedeki bilgiye dayanmayın.</aside>`;

function addUserInformationNotice(body: string): string {
  return body.includes("</header>")
    ? body.replace("</header>", `</header>${USER_INFORMATION_NOTICE}`)
    : body;
}

function html(body: string, status = 200): Response {
  return new Response(addUserInformationNotice(body), {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": status === 200 ? "public, max-age=300" : "no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      "x-frame-options": "DENY",
      "permissions-policy": "camera=(), microphone=(), geolocation=()"
    }
  });
}

function normalize(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9çğıöşü\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function searchProblems(query: string) {
  const q = normalize(query);
  if (!q) return [];
  const terms = q.split(" ").filter(Boolean);
  return problems
    .map(problem => {
      const haystack = normalize([problem.title, problem.summary, problem.category, ...problem.aliases].join(" "));
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { problem, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.problem);
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD" } });
    }

    if (path === "/robots.txt") {
      return new Response("User-agent: *\nDisallow: /\n", {
        headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" }
      });
    }

    if (path === "/health") {
      return new Response(JSON.stringify({ status: "ok", release: "development", publicLaunch: false }), {
        headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
      });
    }

    if (path === "/") {
      return html(renderHome(categories, problems));
    }

    if (path === "/ara") {
      const query = (url.searchParams.get("q") || "").slice(0, 160);
      return html(renderSearch(query, searchProblems(query)));
    }

    if (path.startsWith("/konu/")) {
      const slug = path.slice("/konu/".length).replace(/\/$/, "");
      const problem = problems.find(item => item.slug === slug);
      return problem ? html(renderProblem(problem)) : html(renderNotFound(), 404);
    }

    if (path === "/sitemap.xml") {
      return new Response("<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"></urlset>", {
        headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "no-store" }
      });
    }

    return html(renderNotFound(), 404);
  }
};
