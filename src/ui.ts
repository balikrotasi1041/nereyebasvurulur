import type { MenuNode, RouteRecord } from "./data";

const styles = `
:root{--bg:#f5f7fb;--card:#fff;--ink:#172033;--muted:#697386;--line:#e2e8f0;--blue:#2458d6;--blue2:#173f8a;--soft:#edf3ff;--warn:#fff8e8;--warnline:#efd28a;--ok:#176a42;--okbg:#edf8f2;--danger:#9b2c2c;--shadow:0 14px 36px rgba(15,23,42,.07)}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:inherit;text-decoration:none}.wrap{width:min(1160px,calc(100% - 28px));margin:auto}
header{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20}.head{height:66px;display:flex;align-items:center;justify-content:space-between;gap:16px}.brand{font-weight:900;font-size:1.2rem;letter-spacing:-.04em}.brand span{color:var(--blue)}.nav{display:flex;gap:8px;align-items:center}.nav a{font-size:.88rem;color:#526174;padding:8px 10px;border-radius:9px}.nav a:hover{background:#f3f5f8}
.hero{padding:48px 0 24px}.kicker{color:var(--blue);font-size:.79rem;font-weight:850;letter-spacing:.12em;text-transform:uppercase}h1{font-size:clamp(2.2rem,5vw,4.1rem);line-height:1;letter-spacing:-.055em;margin:8px 0 14px;max-width:900px}.hero p,.lead{color:var(--muted);line-height:1.65;max-width:820px}.notice{margin-top:18px;padding:14px 16px;border:1px solid var(--warnline);background:var(--warn);border-radius:14px;color:#6c5200;font-size:.9rem;line-height:1.55}
.app{display:grid;grid-template-columns:360px 1fr;gap:16px;margin:18px 0 36px;align-items:start}.tree,.panel,.card{background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow)}.tree{padding:14px;position:sticky;top:82px;max-height:calc(100vh - 100px);overflow:auto}.tree h3{font-size:.92rem;margin:4px 6px 10px;color:#475467}.catbtn{width:100%;text-align:left;border:0;background:transparent;border-radius:12px;padding:11px 12px;cursor:pointer;color:#263246;font-weight:760;margin:2px 0}.catbtn:hover{background:#f6f8fb}.catbtn.active{background:var(--soft);color:var(--blue)}.search{display:flex;gap:8px;margin:10px 0 8px}.search input{flex:1;padding:11px 12px;border:1px solid var(--line);border-radius:11px;outline:none;min-width:0}.search button{border:0;background:#eef2f7;border-radius:11px;padding:0 12px;cursor:pointer;font-weight:700}.panel{overflow:hidden}.crumbs{padding:15px 20px;border-bottom:1px solid var(--line);background:#fbfcfe;color:#667085;font-size:.86rem}.content{padding:24px}.content h2{font-size:1.55rem;margin:0 0 8px;letter-spacing:-.03em}.content p{color:var(--muted);line-height:1.6}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:11px}.node{border:1px solid var(--line);background:#fff;border-radius:14px;padding:15px;text-align:left;cursor:pointer;transition:.15s ease;min-height:84px}.node:hover{border-color:#b9c7ea;transform:translateY(-1px);box-shadow:0 8px 20px rgba(36,88,214,.06)}.node b{display:block;margin-bottom:5px}.node small{color:var(--muted);line-height:1.45}.node.ready{border-color:#bdd6c8;background:#fbfffc}.node.ready small{color:var(--ok)}.node.review small{color:#8a6700}.actions{margin-top:18px;display:flex;gap:10px;justify-content:space-between}.btn{border-radius:11px;padding:11px 14px;border:1px solid var(--line);background:#fff;cursor:pointer;font-weight:750}.btn.primary{background:var(--blue);border-color:var(--blue);color:#fff}.btn.primary:hover{background:var(--blue2)}
.status{display:inline-flex;align-items:center;gap:7px;padding:7px 10px;border-radius:999px;font-size:.82rem;font-weight:800;background:var(--okbg);color:var(--ok)}.route{display:grid;gap:11px;margin:20px 0}.step{border:1px solid var(--line);border-radius:14px;padding:17px;background:#fff}.step b{display:block;color:var(--blue);font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}.source-list{display:grid;gap:9px}.source{display:block;border:1px solid var(--line);background:#fff;border-radius:12px;padding:13px}.source strong{display:block;font-size:.94rem}.source small{color:var(--muted)}.meta{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:18px 0}.meta>div{border:1px solid var(--line);background:#fff;border-radius:12px;padding:13px}.meta b{display:block;margin-bottom:4px}.meta small{color:var(--muted)}
.admin{padding:30px 0}.admin-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:18px 0}.metric{background:#fff;border:1px solid var(--line);border-radius:15px;padding:17px}.metric strong{display:block;font-size:1.85rem;letter-spacing:-.04em}.metric span{font-size:.88rem;color:var(--muted)}table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden}th,td{text-align:left;padding:11px 12px;border-bottom:1px solid var(--line);vertical-align:top;font-size:.88rem}th{background:#f7f9fc;color:#475467}td small{color:var(--muted)}.table-wrap{overflow:auto;border-radius:14px}.badge{display:inline-block;border-radius:999px;padding:5px 8px;font-size:.76rem;font-weight:800}.badge.ok{background:var(--okbg);color:var(--ok)}.badge.warn{background:var(--warn);color:#7a5b00}
footer{border-top:1px solid var(--line);padding:26px 0 42px;color:var(--muted);font-size:.88rem;margin-top:40px}
@media(max-width:900px){.app{grid-template-columns:1fr}.tree{position:static;max-height:none}.admin-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:620px){.grid,.meta,.admin-grid{grid-template-columns:1fr}.content{padding:18px}.hero{padding-top:32px}.nav a:not(:last-child){display:none}}
`;

function esc(value: string): string {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c] || c));
}

function shell(title: string, description: string, body: string, opts: { canonical?: string; noindex?: boolean; admin?: boolean } = {}): string {
  const canonical = opts.canonical || "https://nereyebasvurulur.com/";
  const robots = opts.noindex ? "noindex,nofollow" : "index,follow";
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${robots}"><link rel="canonical" href="${esc(canonical)}"><style>${styles}</style></head><body><header><div class="wrap head"><a class="brand" href="/">Nereye <span>Başvurulur?</span></a><nav class="nav">${opts.admin ? `<a href="/admin/dashboard/">Dashboard</a><a href="/admin/data/">Veri</a>` : `<a href="/ara">Arama</a>`}<a href="${opts.admin ? "/" : "/admin/dashboard/"}">${opts.admin ? "Siteye dön" : "Yönetim"}</a></nav></div></header>${body}<footer><div class="wrap">Nereye Başvurulur? · Resmî kaynaklarla doğrulanan yönlendirmeler. Son işlem öncesi ilgili kurum ve güncel mevzuatı kontrol edin.</div></footer></body></html>`;
}

function menuJson(menu: MenuNode[]): string {
  return JSON.stringify(menu).replace(/</g, "\\u003c");
}

export function renderHome(menu: MenuNode[], routeCount: number): string {
  const js = `
<script>
const TREE=${menuJson(menu)};
let path=[];
const cats=document.getElementById("cats"),children=document.getElementById("children"),crumbs=document.getElementById("crumbs"),title=document.getElementById("nodeTitle"),desc=document.getElementById("nodeDesc");
function getNode(p){if(!p.length)return null;let n=TREE[p[0]];for(let x=1;x<p.length;x++)n=n.children[p[x]];return n}
function renderCats(filter=""){cats.innerHTML="";TREE.forEach((v,k)=>{if(filter&&!v.label.toLocaleLowerCase("tr-TR").includes(filter.toLocaleLowerCase("tr-TR")))return;const b=document.createElement("button");b.className="catbtn"+(path[0]===k?" active":"");b.textContent=v.label;b.onclick=()=>{path=[k];render()};cats.appendChild(b)})}
function render(){renderCats(document.getElementById("catSearch").value);const labels=["Ana sayfa"];let n=null;if(path.length){n=TREE[path[0]];labels.push(n.label);for(let i=1;i<path.length;i++){n=n.children[path[i]];labels.push(n.label)}}crumbs.textContent=labels.join(" › ");children.innerHTML="";if(!n){title.textContent="Bir ana kategori seçin";desc.textContent="Sol menüden kamu alanını seçin. Sistem yalnız ilgili alt dalları açar.";return}title.textContent=n.label;desc.textContent=n.children?.length?"Bir alt başlık seçerek devam edin.":"";
(n.children||[]).forEach((v,k)=>{const a=document.createElement(v.slug?"a":"button");a.className="node "+(v.slug?"ready":"review");if(v.slug)a.href="/konu/"+v.slug+"/";else a.type="button";a.innerHTML="<b>"+v.label+"</b><small>"+(v.children?.length?"Alt başlıkları görüntüle":v.slug?"✓ Resmî kaynaklarla doğrulanmış rota":"Doğrulama kuyruğunda · kesin yönlendirme henüz yayımlanmadı")+"</small>";if(!v.slug)a.onclick=()=>{if(v.children?.length){path.push(k);render()}else alert("Bu başvuru rotası henüz resmî kaynak doğrulamasından geçmediği için kesin yönlendirme yayımlanmıyor.")};children.appendChild(a)});
const other=document.createElement("button");other.className="node review";other.innerHTML="<b>Aradığım konu burada yok</b><small>Mevcut doğrulanmış rotalarda ara</small>";other.onclick=()=>location.href="/ara";children.appendChild(other)}
function back(){if(path.length)path.pop();render()}document.getElementById("back").onclick=back;document.getElementById("catSearch").oninput=e=>renderCats(e.target.value);renderCats();
</script>`;
  return shell(
    "Nereye Başvurulur? | Doğru resmî başvuru yolunu bulun",
    "Kamu işlemleri, askerlik, okul, sosyal yardım, itiraz ve temel kamu hizmetlerinde doğru resmî başvuru yolunu bulun.",
    `<main><section class="hero"><div class="wrap"><div class="kicker">Resmî başvuru yönlendirme ağacı</div><h1>Doğru kapıyı, kurum adını bilmeden bulun.</h1><p>Konu ağacından ilerleyin. Kurumu siz seçmezsiniz; resmî kaynaklarla doğrulanmış rota size yetkili başvuru kanalını gösterir. İlk sürümde ${routeCount} kritik rota resmî kaynaklarla doğrulanmış olarak açık.</p><div class="notice"><strong>Bilgilendirme:</strong> Bu site genel bilgilendirme ve yönlendirme amacı taşır; hukuki danışmanlık veya resmî görüş değildir. Özellikle süreye bağlı işlemlerde işlem yapmadan önce ilgili güncel mevzuatı ve yetkili kurumun resmî açıklamasını ayrıca kontrol edin.</div></div></section><section class="wrap app"><aside class="tree"><h3>Ana kategoriler</h3><div class="search"><input id="catSearch" placeholder="Kategori ara"><button onclick="document.getElementById('catSearch').value='';renderCats()">Temizle</button></div><div id="cats"></div></aside><section class="panel"><div class="crumbs" id="crumbs">Ana sayfa</div><div class="content"><h2 id="nodeTitle">Bir ana kategori seçin</h2><p id="nodeDesc">Sol menüden kamu alanını seçin. Sistem yalnız ilgili alt dalları açar.</p><div class="grid" id="children"></div><div class="actions"><button class="btn" id="back">← Bir adım geri</button><a class="btn primary" href="/ara">Doğrudan ara</a></div></div></section></section></main>${js}`,
    { canonical: "https://nereyebasvurulur.com/" }
  );
}

export function renderRoute(route: RouteRecord): string {
  const steps = route.steps.map((step, i) => `<div class="step"><b>${i + 1}. Adım</b>${esc(step)}</div>`).join("");
  const sources = route.sources.map(source => `<a class="source" rel="noopener noreferrer" target="_blank" href="${esc(source.url)}"><strong>${esc(source.title)}</strong><small>${esc(source.authority)} · Resmî kaynak ↗</small></a>`).join("");
  const legal = route.legalBasis?.length ? `<div class="meta"><div><b>Hukuki dayanak</b><small>${route.legalBasis.map(esc).join("<br>")}</small></div><div><b>Son doğrulama</b><small>${esc(route.lastVerified)}</small></div><div><b>Güncellik</b><small>${route.timeSensitive ? "Yüksek · işlem öncesi tekrar kontrol edin" : "Periyodik kontrol"}</small></div></div>` : "";
  return shell(
    `${route.title} | Nereye Başvurulur?`,
    route.summary,
    `<main class="wrap"><section class="hero"><div class="kicker">${esc(route.category)}</div><span class="status">✓ Resmî kaynaklarla doğrulandı</span><h1>${esc(route.title)}</h1><p class="lead">${esc(route.summary)}</p>${route.currentCycleNote ? `<div class="notice"><strong>Güncel dönem notu:</strong> ${esc(route.currentCycleNote)}</div>` : ""}</section><section class="card content"><h2>Başvuru rotası</h2><div class="route">${steps}</div>${legal}${route.caution ? `<div class="notice"><strong>Önemli:</strong> ${esc(route.caution)}</div>` : ""}<section style="margin-top:24px"><h2>Resmî kaynaklar</h2><div class="source-list">${sources}</div></section></section></main>`,
    { canonical: `https://nereyebasvurulur.com/konu/${route.slug}/` }
  );
}

export function renderSearch(query: string, matches: RouteRecord[]): string {
  const results = matches.length ? matches.map(r => `<a class="source" href="/konu/${r.slug}/"><strong>${esc(r.title)}</strong><small>${esc(r.category)} · doğrulanmış rota</small></a>`).join("") : `<div class="notice">Doğrulanmış rotalarda eşleşme bulunamadı. Menüdeki doğrulama kuyruğunda yer alan konular kesin yönlendirme olarak gösterilmez.</div>`;
  return shell(
    "Arama | Nereye Başvurulur?",
    "Doğrulanmış resmî başvuru rotalarında arama.",
    `<main class="wrap"><section class="hero"><div class="kicker">Arama</div><h1>Doğrulanmış rotalarda ara</h1><form class="search" action="/ara" method="get"><input name="q" value="${esc(query)}" placeholder="Örn. bedelli askerlik, trafik cezası"><button type="submit">Ara</button></form></section><section class="card content"><div class="source-list">${results}</div></section></main>`,
    { canonical: "https://nereyebasvurulur.com/ara", noindex: true }
  );
}

export function renderDashboard(stats: { categories: number; leaves: number; linked: number; routes: number; sources: number; timeSensitive: number }, routes: RouteRecord[]): string {
  const recent = routes.map(r => `<tr><td><a href="/konu/${r.slug}/"><strong>${esc(r.title)}</strong></a><br><small>${esc(r.category)}</small></td><td><span class="badge ok">Doğrulandı</span></td><td>${esc(r.lastVerified)}</td><td>${r.timeSensitive ? `<span class="badge warn">Yüksek</span>` : "Normal"}</td></tr>`).join("");
  return shell(
    "Yönetim Dashboard | Nereye Başvurulur?",
    "Nereye Başvurulur yönetim paneli.",
    `<main class="wrap admin"><div class="kicker">Yönetim</div><h1 style="font-size:2.4rem">Nereye Başvurulur Dashboard</h1><p class="lead">İlk sürüm içerik kapsamı, doğrulama durumu ve yüksek riskli rotaların görünümü.</p><div class="admin-grid"><div class="metric"><strong>${stats.categories}</strong><span>Ana kategori</span></div><div class="metric"><strong>${stats.leaves}</strong><span>Menü yaprağı</span></div><div class="metric"><strong>${stats.routes}</strong><span>Doğrulanmış rota</span></div><div class="metric"><strong>${stats.timeSensitive}</strong><span>Yüksek güncellik riski</span></div></div><div class="admin-grid"><div class="metric"><strong>${stats.linked}</strong><span>Canlı rota bağlantısı</span></div><div class="metric"><strong>${stats.sources}</strong><span>Resmî kaynak kaydı</span></div><div class="metric"><strong>${stats.leaves - stats.linked}</strong><span>Doğrulama kuyruğu</span></div><div class="metric"><strong>0</strong><span>Kaynağı olmayan canlı rota</span></div></div><section class="card content"><h2>Canlı doğrulanmış rotalar</h2><div class="table-wrap"><table><thead><tr><th>Rota</th><th>Durum</th><th>Son kontrol</th><th>Risk</th></tr></thead><tbody>${recent}</tbody></table></div></section></main>`,
    { noindex: true, admin: true, canonical: "https://nereyebasvurulur.com/admin/dashboard/" }
  );
}

export function renderDataPage(routes: RouteRecord[]): string {
  const rows = routes.map(r => `<tr><td><strong>${esc(r.slug)}</strong></td><td>${esc(r.category)}</td><td>${r.sources.length}</td><td>${esc(r.lastVerified)}</td><td>${r.timeSensitive ? `<span class="badge warn">Yüksek</span>` : "Normal"}</td></tr>`).join("");
  return shell(
    "Veri Envanteri | Nereye Başvurulur?",
    "Yönetim veri envanteri.",
    `<main class="wrap admin"><div class="kicker">Yönetim / Veri</div><h1 style="font-size:2.4rem">Rota veri envanteri</h1><p class="lead">Canlıya açılan her rota en az bir resmî kaynak ve son doğrulama tarihi taşımak zorunda.</p><div class="actions"><a class="btn primary" href="/admin/api/data">JSON verisini aç</a><a class="btn" href="/admin/dashboard/">Dashboard</a></div><section class="card content" style="margin-top:18px"><div class="table-wrap"><table><thead><tr><th>Slug</th><th>Kategori</th><th>Kaynak</th><th>Son kontrol</th><th>Risk</th></tr></thead><tbody>${rows}</tbody></table></div></section></main>`,
    { noindex: true, admin: true, canonical: "https://nereyebasvurulur.com/admin/data/" }
  );
}

export function renderNotFound(): string {
  return shell("Sayfa bulunamadı | Nereye Başvurulur?", "Aradığınız sayfa bulunamadı.", `<main class="wrap"><section class="hero"><h1>Bu rota henüz yok.</h1><p class="lead">Ana menüden veya arama sayfasından doğrulanmış rotalara ulaşabilirsiniz.</p><a class="btn primary" href="/">Ana sayfaya dön</a></section></main>`, { noindex: true });
}
