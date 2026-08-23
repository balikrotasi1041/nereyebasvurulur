import type { MenuNode, RouteRecord } from "./data";
import { militaryBranchPath, type MilitaryBranchRecord, type MilitaryProvince } from "./military-branches";
import { assessRouteQuality, summarizeQuality } from "./quality-radar";
import { annualThresholds, formatThreshold } from "./thresholds";

const styles = `
:root{
  --bg:#f5f7fb;--card:#fff;--ink:#172033;--muted:#697386;--line:#e2e8f0;
  --blue:#2458d6;--blue2:#173f8a;--soft:#edf3ff;--warn:#fff8e8;--warnline:#efd28a;
  --ok:#176a42;--okbg:#edf8f2;--danger:#9b2c2c;--shadow:0 14px 36px rgba(15,23,42,.07);
  --radius:18px;--tap:48px
}
*{box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;overflow-wrap:anywhere}
button,input,select,textarea{font:inherit}
button,a,select{-webkit-tap-highlight-color:transparent}
a{color:inherit;text-decoration:none}
a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid rgba(36,88,214,.24);outline-offset:2px}
.wrap{width:min(1160px,calc(100% - 28px));margin:auto}

header{background:rgba(255,255,255,.96);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:30;backdrop-filter:saturate(150%) blur(10px)}
.head{min-height:66px;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:max(0px,env(safe-area-inset-top)) 0 0}
.brand{font-weight:900;font-size:1.2rem;letter-spacing:-.04em;white-space:nowrap}
.brand span{color:var(--blue)}
.nav{display:flex;gap:6px;align-items:center}
.nav a{font-size:.88rem;color:#526174;padding:10px 11px;border-radius:10px;min-height:42px;display:inline-flex;align-items:center}
.nav a:hover{background:#f3f5f8}
.nav a.nav-cta{background:var(--blue);color:#fff;font-weight:800}
.nav a.nav-cta:hover{background:var(--blue2)}
.mobile-label{display:none}

.hero{padding:46px 0 22px}
.kicker{color:var(--blue);font-size:.78rem;font-weight:850;letter-spacing:.11em;text-transform:uppercase}
h1{font-size:clamp(2.15rem,5vw,4.1rem);line-height:1.02;letter-spacing:-.052em;margin:8px 0 14px;max-width:900px}
.hero p,.lead{color:var(--muted);line-height:1.65;max-width:820px}
.notice{margin-top:18px;padding:14px 16px;border:1px solid var(--warnline);background:var(--warn);border-radius:14px;color:#6c5200;font-size:.9rem;line-height:1.55}

.app{display:grid;grid-template-columns:minmax(290px,360px) minmax(0,1fr);gap:16px;margin:18px 0 36px;align-items:start}
.tree,.panel,.card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}
.tree{padding:14px;position:sticky;top:82px;max-height:calc(100vh - 100px);overflow:auto;overscroll-behavior:contain}
.tree h3{font-size:.92rem;margin:4px 6px 10px;color:#475467}
.catbtn{width:100%;text-align:left;border:0;background:transparent;border-radius:12px;padding:12px;cursor:pointer;color:#263246;font-weight:760;margin:2px 0;min-height:var(--tap)}
.catbtn:hover{background:#f6f8fb}
.catbtn.active{background:var(--soft);color:var(--blue)}
.search{display:flex;gap:8px;margin:10px 0 8px}
.search input{flex:1;padding:12px;border:1px solid var(--line);border-radius:11px;outline:none;min-width:0;background:#fff;font-size:16px}
.search button{border:0;background:#eef2f7;border-radius:11px;padding:0 13px;cursor:pointer;font-weight:700;min-height:var(--tap)}
.mobile-picker{display:none;background:#fff;border:1px solid var(--line);border-radius:16px;padding:14px;margin-bottom:12px;box-shadow:var(--shadow)}
.mobile-picker label{display:block;font-size:.82rem;color:#475467;font-weight:800;margin-bottom:7px}
.mobile-picker select{width:100%;border:1px solid var(--line);border-radius:12px;background:#fff;padding:13px 42px 13px 13px;min-height:52px;color:var(--ink);font-size:16px}

.panel{overflow:hidden;min-width:0}
.crumbs{padding:14px 20px;border-bottom:1px solid var(--line);background:#fbfcfe;color:#667085;font-size:.84rem;white-space:nowrap;overflow:auto;scrollbar-width:none}
.crumbs::-webkit-scrollbar{display:none}
.content{padding:24px}
.content h2{font-size:1.55rem;margin:0 0 8px;letter-spacing:-.03em}
.content p{color:var(--muted);line-height:1.6}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
.node{border:1px solid var(--line);background:#fff;border-radius:14px;padding:15px;text-align:left;cursor:pointer;transition:.15s ease;min-height:88px;color:var(--ink);width:100%;display:block;position:relative}
.node:after{content:"›";position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:1.35rem;color:#a3adbd}
.node:hover{border-color:#b9c7ea;transform:translateY(-1px);box-shadow:0 8px 20px rgba(36,88,214,.06)}
.node b{display:block;margin:0 30px 5px 0;line-height:1.3}
.node small{display:block;color:var(--muted);line-height:1.45;padding-right:22px}
.node.ready{border-color:#bdd6c8;background:#fbfffc}
.node.ready small{color:var(--ok)}
.node.review small{color:#8a6700}
.actions{margin-top:18px;display:flex;gap:10px;justify-content:space-between;align-items:center}
.btn{border-radius:11px;padding:12px 14px;border:1px solid var(--line);background:#fff;cursor:pointer;font-weight:750;min-height:var(--tap);display:inline-flex;align-items:center;justify-content:center}
.btn[disabled]{opacity:.45;cursor:not-allowed}
.btn.primary{background:var(--blue);border-color:var(--blue);color:#fff}
.btn.primary:hover{background:var(--blue2)}

.status{display:inline-flex;align-items:center;gap:7px;padding:7px 10px;border-radius:999px;font-size:.82rem;font-weight:800;background:var(--okbg);color:var(--ok)}
.status.local{background:var(--warn);color:#7a5b00}
.route{display:grid;gap:11px;margin:20px 0}
.step{border:1px solid var(--line);border-radius:14px;padding:17px;background:#fff;line-height:1.58}
.step b{display:block;color:var(--blue);font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
.detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;margin:18px 0}
.detail-card{border:1px solid var(--line);border-radius:14px;padding:17px;background:#fff;min-width:0}
.detail-card.wide{grid-column:1/-1}
.detail-card h3{font-size:1rem;margin:0 0 9px;color:#344054}
.detail-card p{margin:0;color:#475467;line-height:1.6}
.plain-list{margin:0;padding-left:19px;color:#475467;line-height:1.58}
.plain-list li+li{margin-top:6px}
.channel-list{display:grid;gap:8px}
.channel{display:block;border:1px solid var(--line);border-radius:11px;padding:12px;background:#fbfcfe}
.channel[href]:hover{border-color:#b9c7ea;background:var(--soft)}
.channel strong{display:block;color:#344054;font-size:.93rem}
.channel small{display:block;color:var(--muted);margin-top:4px;line-height:1.45}
.source-list{display:grid;gap:9px}
.source{display:block;border:1px solid var(--line);background:#fff;border-radius:12px;padding:14px;min-height:62px}
.source:hover{border-color:#b9c7ea}
.source strong{display:block;font-size:.94rem;line-height:1.35}
.source small{display:block;color:var(--muted);margin-top:4px;line-height:1.4}
.meta{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:18px 0}
.meta>div{border:1px solid var(--line);background:#fff;border-radius:12px;padding:13px;min-width:0}
.meta b{display:block;margin-bottom:4px}
.meta small{color:var(--muted);line-height:1.45}

.branch-cta{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:16px;padding:17px 18px;border:1px solid #bfd0f5;background:var(--soft);border-radius:15px;color:var(--blue2)}
.branch-cta strong{display:block;font-size:1rem;margin-bottom:4px}
.branch-cta span{display:block;color:#526174;font-size:.88rem;line-height:1.45}
.province-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.province-card{display:block;border:1px solid var(--line);background:#fff;border-radius:13px;padding:14px;min-height:76px}
.province-card:hover{border-color:#b9c7ea;background:var(--soft)}
.province-card strong{display:block;margin-bottom:5px}
.province-card small{color:var(--muted)}
.branch-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.branch-item{display:block;border:1px solid var(--line);border-radius:14px;padding:15px;background:#fff;min-width:0}
.branch-item:hover{border-color:#b9c7ea;background:var(--soft)}
.branch-item strong{display:block;line-height:1.35;margin-bottom:5px}
.branch-item small{display:block;color:var(--muted);line-height:1.45}
.branch-breadcrumb{display:flex;gap:7px;align-items:center;flex-wrap:wrap;color:#667085;font-size:.85rem;margin-bottom:18px}
.branch-breadcrumb a{color:var(--blue)}
.contact-grid{display:grid;grid-template-columns:1.25fr .75fr;gap:12px;margin:18px 0}
.contact-card{border:1px solid var(--line);border-radius:15px;padding:18px;background:#fff;min-width:0}
.contact-card h2,.contact-card h3{margin:0 0 9px;letter-spacing:-.02em}
.contact-card address{font-style:normal;color:#344054;line-height:1.65}
.contact-row{display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid var(--line)}
.contact-row:last-child{border-bottom:0}
.contact-row span{color:var(--muted)}
.contact-row a{color:var(--blue);font-weight:800;text-align:right}
.contact-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:15px}
.contact-actions .btn{flex:1 1 180px}
.faq-list{display:grid;gap:10px}
.faq-item{border:1px solid var(--line);border-radius:14px;padding:17px;background:#fff}
.faq-item h3{font-size:1rem;margin:0 0 7px}
.faq-item p{margin:0;color:#526174;line-height:1.62}
.verification-note{font-size:.84rem;color:var(--muted);line-height:1.55;margin-top:12px}

.admin{padding:30px 0}
.admin h1{font-size:clamp(2rem,4vw,2.7rem);line-height:1.08}
.admin-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:18px 0}
.metric{background:#fff;border:1px solid var(--line);border-radius:15px;padding:17px;min-width:0}
.metric strong{display:block;font-size:1.85rem;letter-spacing:-.04em}
.metric span{font-size:.88rem;color:var(--muted);line-height:1.35}
table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden}
th,td{text-align:left;padding:11px 12px;border-bottom:1px solid var(--line);vertical-align:top;font-size:.88rem}
th{background:#f7f9fc;color:#475467}
td small{color:var(--muted)}
.table-wrap{overflow:auto;border-radius:14px}
.badge{display:inline-block;border-radius:999px;padding:5px 8px;font-size:.76rem;font-weight:800}
.badge.ok{background:var(--okbg);color:var(--ok)}
.badge.warn{background:var(--warn);color:#7a5b00}
.badge.closed{background:#f2f4f7;color:#475467}
.badge.high{background:#fff0f0;color:var(--danger)}
.admin-links{display:flex;gap:8px;flex-wrap:wrap}

footer{border-top:1px solid var(--line);padding:26px 0 calc(42px + env(safe-area-inset-bottom));color:var(--muted);font-size:.88rem;margin-top:40px;line-height:1.55}

@media(max-width:900px){
  .app{grid-template-columns:1fr}
  .tree{display:none}
  .mobile-picker{display:block}
  .admin-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .hero{padding-top:36px}
  .province-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
}
@media(max-width:620px){
  .wrap{width:min(100% - 20px,1160px)}
  .head{min-height:58px}
  .brand{font-size:1.08rem}
  .nav{gap:2px}
  .nav a{font-size:.8rem;padding:9px 8px}
  .nav a.hide-mobile{display:none}
  .desktop-label{display:none}
  .mobile-label{display:inline}
  .hero{padding:26px 0 16px}
  h1{font-size:clamp(2rem,10vw,2.8rem);letter-spacing:-.045em}
  .hero p,.lead{font-size:.98rem;line-height:1.58}
  .notice{font-size:.86rem;padding:13px 14px}
  .mobile-picker{position:sticky;top:68px;z-index:12;margin:8px 0 10px}
  .panel{border-radius:16px}
  .crumbs{padding:12px 14px;font-size:.8rem}
  .content{padding:16px}
  .content h2{font-size:1.34rem}
  .grid,.meta,.detail-grid,.branch-list,.contact-grid{grid-template-columns:1fr}
  .province-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .node{min-height:72px;padding:14px}
  .actions{position:sticky;bottom:0;z-index:10;margin:16px -16px -16px;padding:10px 16px calc(10px + env(safe-area-inset-bottom));background:rgba(255,255,255,.96);border-top:1px solid var(--line);backdrop-filter:blur(8px)}
  .actions .btn{flex:1}
  .card.content{padding:16px}
  .route{margin:16px 0}
  .step{padding:15px}
  .meta{margin:14px 0}
  .admin{padding:22px 0}
  .admin-grid{gap:9px}
  .metric{padding:14px}
  .metric strong{font-size:1.55rem}
  .table-wrap{overflow:visible}
  .responsive-table,.responsive-table tbody,.responsive-table tr,.responsive-table td{display:block;width:100%}
  .responsive-table thead{display:none}
  .responsive-table{border:0;background:transparent}
  .responsive-table tr{background:#fff;border:1px solid var(--line);border-radius:14px;margin-bottom:10px;overflow:hidden}
  .responsive-table td{display:grid;grid-template-columns:110px minmax(0,1fr);gap:10px;padding:10px 12px;border-bottom:1px solid var(--line)}
  .responsive-table td:last-child{border-bottom:0}
  .responsive-table td:before{content:attr(data-label);font-weight:800;color:#667085;font-size:.78rem}
  .admin-links .btn{flex:1 1 150px}
  .branch-cta{align-items:flex-start;flex-direction:column}
  .branch-cta .btn{width:100%}
  .contact-actions{position:sticky;bottom:0;z-index:10;margin:16px -18px -18px;padding:10px 18px calc(10px + env(safe-area-inset-bottom));background:rgba(255,255,255,.97);border-top:1px solid var(--line);backdrop-filter:blur(8px)}
}
@media(max-width:380px){
  .nav a{padding:8px 6px}
  .admin-grid{grid-template-columns:1fr}
  .responsive-table td{grid-template-columns:92px minmax(0,1fr)}
  .province-grid{grid-template-columns:1fr}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*:before,*:after{transition:none!important}
}
`;

function esc(value: string): string {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c] || c));
}

export function shell(title: string, description: string, body: string, opts: { canonical?: string; noindex?: boolean; admin?: boolean; jsonLd?: unknown[]; styles?: string } = {}): string {
  const canonical = opts.canonical || "https://nereyebasvurulur.com/";
  const robots = opts.noindex ? "noindex,nofollow" : "index,follow";
  const structuredData = (opts.jsonLd || []).map(value => `<script type="application/ld+json">${JSON.stringify(value).replace(/</g, "\\u003c")}</script>`).join("");
  const nav = opts.admin
    ? `<a href="/admin/dashboard/">Dashboard</a><a href="/admin/data/">Veri</a><a href="/admin/askerlik-subeleri/">Şubeler</a><a href="/">Siteye dön</a>`
    : `<a class="nav-cta" href="/dilekce-olustur/"><span class="desktop-label">Dilekçe oluştur</span><span class="mobile-label">Dilekçe</span></a><a href="/askerlik-subeleri/"><span class="desktop-label">Askerlik şubeleri</span><span class="mobile-label">Şubeler</span></a><a class="hide-mobile" href="/ara">Arama</a><a class="hide-mobile" href="/admin/dashboard/">Yönetim</a>`;
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#ffffff"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${robots}"><link rel="canonical" href="${esc(canonical)}">${structuredData}<style>${styles}${opts.styles || ""}</style></head><body><header><div class="wrap head"><a class="brand" href="/">Nereye <span>Başvurulur?</span></a><nav class="nav" aria-label="Ana menü">${nav}</nav></div></header>${body}<footer><div class="wrap">Nereye Başvurulur? · Resmî kaynaklarla doğrulanan yönlendirmeler. Son işlem öncesi ilgili kurum ve güncel mevzuatı kontrol edin.</div></footer></body></html>`;
}

function menuJson(menu: MenuNode[]): string {
  return JSON.stringify(menu).replace(/</g, "\\u003c");
}

export function renderHome(menu: MenuNode[], routeCount: number, militaryDistrictCount: number, militaryOfficeCount: number): string {
  const mobileOptions = menu.map((item, index) => `<option value="${index}">${esc(item.label)}</option>`).join("");
  const js = `
<script>
const TREE=${menuJson(menu)};
let path=[];
const cats=document.getElementById("cats"),children=document.getElementById("children"),crumbs=document.getElementById("crumbs"),title=document.getElementById("nodeTitle"),desc=document.getElementById("nodeDesc"),picker=document.getElementById("categorySelect"),backBtn=document.getElementById("back"),panel=document.getElementById("flowPanel");
function getNode(p){if(!p.length)return null;let n=TREE[p[0]];for(let x=1;x<p.length;x++)n=n.children[p[x]];return n}
function syncPicker(){picker.value=path.length?String(path[0]):""}
function renderCats(filter=""){cats.innerHTML="";TREE.forEach((v,k)=>{if(filter&&!v.label.toLocaleLowerCase("tr-TR").includes(filter.toLocaleLowerCase("tr-TR")))return;const b=document.createElement("button");b.className="catbtn"+(path[0]===k?" active":"");b.textContent=v.label;b.onclick=()=>{path=[k];render();focusFlow()};cats.appendChild(b)})}
function focusFlow(){if(window.matchMedia("(max-width:900px)").matches){setTimeout(()=>panel.scrollIntoView({behavior:"smooth",block:"start"}),30)}}
function render(){renderCats(document.getElementById("catSearch").value);syncPicker();const labels=["Ana sayfa"];let n=null;if(path.length){n=TREE[path[0]];labels.push(n.label);for(let i=1;i<path.length;i++){n=n.children[path[i]];labels.push(n.label)}}crumbs.textContent=labels.join(" › ");children.innerHTML="";backBtn.disabled=!path.length;if(!n){title.textContent="Bir ana kategori seçin";desc.textContent="Yukarıdaki kategori alanından kamu konusunu seçin. Sistem yalnız ilgili alt dalları açar.";return}title.textContent=n.label;desc.textContent=n.children?.length?"Bir alt başlık seçerek devam edin.":"";
(n.children||[]).forEach((v,k)=>{const a=document.createElement(v.slug?"a":"button");a.className="node "+(v.slug?"ready":"review");if(v.slug){a.href="/konu/"+v.slug+"/";a.setAttribute("aria-label",v.label+" doğrulanmış başvuru rotasını aç")}else a.type="button";a.innerHTML="<b>"+v.label+"</b><small>"+(v.children?.length?"Alt başlıkları görüntüle":v.slug?"✓ Resmî kaynaklarla doğrulanmış rota":"Doğrulama kuyruğunda · kesin yönlendirme henüz yayımlanmadı")+"</small>";if(!v.slug)a.onclick=()=>{if(v.children?.length){path.push(k);render();focusFlow()}else alert("Bu başvuru rotası henüz resmî kaynak doğrulamasından geçmediği için kesin yönlendirme yayımlanmıyor.")};children.appendChild(a)});
const other=document.createElement("button");other.className="node review";other.innerHTML="<b>Aradığım konu burada yok</b><small>Mevcut doğrulanmış rotalarda ara</small>";other.onclick=()=>location.href="/ara";children.appendChild(other)}
function back(){if(path.length){path.pop();render();focusFlow()}}
backBtn.onclick=back;
picker.onchange=e=>{const value=e.target.value;if(value===""){path=[];render();return}path=[Number(value)];render();focusFlow()};
document.getElementById("catSearch").oninput=e=>renderCats(e.target.value);
renderCats();syncPicker();
</script>`;
  return shell(
    "Nereye Başvurulur? | Doğru resmî başvuru yolunu bulun",
    "Kamu işlemleri, askerlik, okul, sosyal yardım, itiraz ve temel kamu hizmetlerinde doğru resmî başvuru yolunu bulun.",
    `<main><section class="hero"><div class="wrap"><div class="kicker">Resmî başvuru yönlendirme ağacı</div><h1>Doğru kapıyı, kurum adını bilmeden bulun.</h1><p>Konu ağacından ilerleyin. Kurumu siz seçmezsiniz; resmî kaynaklarla doğrulanmış rota size yetkili başvuru kanalını gösterir. Şu anda ${routeCount} rota açık; yerel yetki değişebilen işlemler ayrıca işaretlenir.</p><div class="notice"><strong>Bilgilendirme:</strong> Bu site genel bilgilendirme ve yönlendirme amacı taşır; hukuki danışmanlık veya resmî görüş değildir. Özellikle süreye bağlı işlemlerde işlem yapmadan önce ilgili güncel mevzuatı ve yetkili kurumun resmî açıklamasını ayrıca kontrol edin.</div><div class="branch-cta"><div><strong>Askerlik şubesi adresi ve yol tarifi mi arıyorsunuz?</strong><span>81 ilde ${militaryDistrictCount} ilçe için MSB’nin gösterdiği ${militaryOfficeCount} fiziksel şubenin adres, telefon ve yol tarifi bilgilerine ulaşın.</span></div><a class="btn primary" href="/askerlik-subeleri/">Askerlik şubelerini bul</a></div></div></section><section class="wrap"><div class="mobile-picker"><label for="categorySelect">1. Ana konuyu seçin</label><select id="categorySelect"><option value="">Kategori seçin…</option>${mobileOptions}</select></div><div class="app"><aside class="tree"><h3>Ana kategoriler</h3><div class="search"><input id="catSearch" placeholder="Kategori ara" aria-label="Kategori ara"><button type="button" onclick="document.getElementById('catSearch').value='';renderCats()">Temizle</button></div><div id="cats"></div></aside><section class="panel" id="flowPanel"><div class="crumbs" id="crumbs" aria-live="polite">Ana sayfa</div><div class="content"><h2 id="nodeTitle">Bir ana kategori seçin</h2><p id="nodeDesc">Kamu alanını seçin. Sistem yalnız ilgili alt dalları açar.</p><div class="grid" id="children"></div><div class="actions"><button class="btn" id="back" disabled>← Bir adım geri</button><a class="btn primary" href="/ara">Doğrudan ara</a></div></div></section></div></section></main>${js}`,
    { canonical: "https://nereyebasvurulur.com/" }
  );
}

export function renderRoute(route: RouteRecord): string {
  const steps = route.steps.map((step, i) => `<div class="step"><b>${i + 1}. Adım</b>${esc(step)}</div>`).join("");
  const sources = route.sources.map(source => `<a class="source" rel="noopener noreferrer" target="_blank" href="${esc(source.url)}"><strong>${esc(source.title)}</strong><small>${esc(source.authority)} · Resmî kaynak ↗</small></a>`).join("");
  const authorities = route.competentAuthorities.map(item => `<li>${esc(item)}</li>`).join("");
  const documents = route.requiredDocuments.map(item => `<li>${esc(item)}</li>`).join("");
  const evidence = route.evidenceChecklist.map(item => `<li>${esc(item)}</li>`).join("");
  const escalation = route.escalation.map(item => `<li>${esc(item)}</li>`).join("");
  const channels = route.applicationChannels.map(channel => {
    const body = `<strong>${esc(channel.label)}</strong><small>${esc(channel.note || (channel.url ? "Resmî çevrim içi kanal" : "Fizikî / doğrudan kanal"))}${channel.url ? " · Aç ↗" : ""}</small>`;
    return channel.url
      ? `<a class="channel" rel="noopener noreferrer" target="_blank" href="${esc(channel.url)}">${body}</a>`
      : `<div class="channel">${body}</div>`;
  }).join("");
  const statusLabel = route.verificationStatus === "verified" ? "✓ Resmî kaynaklarla doğrulandı" : "◉ Yerel yetki kontrolü gerekli";
  const statusClass = route.verificationStatus === "verified" ? "" : " local";
  const riskLabel = route.freshnessRisk === "high" ? "Yüksek · işlem öncesi tekrar kontrol edin" : route.freshnessRisk === "medium" ? "Orta · periyodik kontrol" : "Düşük · periyodik kontrol";
  const urgencyLabel = route.urgency === "urgent" ? "Acil · gecikmeden işlem yapın" : route.urgency === "time-limited" ? "Süreli · tarihleri kontrol edin" : "Normal";
  const legal = `<div class="meta"><div><b>Hukuki dayanak</b><small>${route.legalBasis.map(esc).join("<br>")}</small></div><div><b>Son doğrulama</b><small>${esc(route.lastVerified)}</small></div><div><b>Güncellik riski</b><small>${riskLabel}<br>${route.reviewCadence} günde bir yeniden kontrol</small></div><div><b>Aciliyet</b><small>${urgencyLabel}</small></div></div>`;
  const thresholdRecord = route.thresholdKey ? annualThresholds[route.thresholdKey] : undefined;
  const threshold = thresholdRecord ? `<div class="notice"><strong>Yıllık parasal eşik:</strong> ${esc(formatThreshold(thresholdRecord.key))} <a rel="noopener noreferrer" target="_blank" href="${esc(thresholdRecord.sourceUrl)}">Resmî Gazete kaynağı ↗</a></div>` : "";
  const mappedAliases = route.aliases.filter(alias => ![route.category, route.section].includes(alias) && alias !== route.title.replace(/ için nereye başvurulur\?$/, ""));
  const coveredIntents = mappedAliases.length ? `<section class="detail-card wide"><h3>Bu rota şu kullanıcı sorunlarını da kapsar</h3><ul class="plain-list">${mappedAliases.map(alias => `<li>${esc(alias)}</li>`).join("")}</ul></section>` : "";
  const petition = route.petitionReference;
  const petitionLink = petition
    ? `/dilekce-olustur/?merci=${encodeURIComponent(petition.authority)}&konu=${encodeURIComponent(petition.subject)}&tur=${encodeURIComponent(petition.suggestedType)}&kaynak=${encodeURIComponent(`/konu/${route.slug}/`)}`
    : "";
  const petitionCta = petition ? `<section style="margin-top:24px"><div class="branch-cta"><div><strong>${esc(petition.suggestedType)} oluştur</strong><span>Konu ve merci otomatik doldurulur.${petition.note ? ` ${esc(petition.note)}` : ""}</span></div><a class="btn primary" href="${esc(petitionLink)}">Dilekçe oluştur</a></div></section>` : "";
  const militaryBranchFinder = route.category === "Askerlik Yükümlülüğü ve Askeralma İşlemleri"
    ? `<section style="margin-top:24px"><div class="branch-cta"><div><strong>Fizikî başvuru için askerlik şubenizi bulun</strong><span>İlinizi ve ilçenizi seçerek MSB'nin gösterdiği sorumlu şubenin adresine, telefonuna ve yol tarifine ulaşın.</span></div><a class="btn primary" href="/askerlik-subeleri/">Askerlik şubesini bul</a></div></section>`
    : "";
  return shell(
    `${route.title} | Nereye Başvurulur?`,
    route.summary,
    `<main class="wrap"><section class="hero"><div class="kicker">${esc(route.category)} · ${esc(route.section)}</div><span class="status${statusClass}">${statusLabel}</span><h1>${esc(route.title)}</h1><p class="lead">${esc(route.summary)}</p>${route.currentCycleNote ? `<div class="notice"><strong>Güncel dönem notu:</strong> ${esc(route.currentCycleNote)}</div>` : ""}${threshold}</section><section class="card content"><h2>Yetkili merci ve başvuru</h2><div class="detail-grid"><section class="detail-card"><h3>Yetkili merci</h3><ul class="plain-list">${authorities}</ul></section><section class="detail-card"><h3>Başvuru kanalları</h3><div class="channel-list">${channels}</div></section><section class="detail-card"><h3>Gerekli bilgi ve belgeler</h3><ul class="plain-list">${documents}</ul></section><section class="detail-card"><h3>Kanıt kontrol listesi</h3><ul class="plain-list">${evidence}</ul></section><section class="detail-card wide"><h3>Yerel yetki / konum</h3><p>${esc(route.locationLogic)}</p></section><section class="detail-card wide"><h3>Süre, itiraz ve üst başvuru</h3><p>${esc(route.deadlineAndAppeal)}</p><ul class="plain-list" style="margin-top:10px">${escalation}</ul></section>${coveredIntents}</div><h2>Adım adım başvuru rotası</h2><div class="route">${steps}</div>${legal}${route.caution ? `<div class="notice"><strong>Önemli:</strong> ${esc(route.caution)}</div>` : ""}${petitionCta}${militaryBranchFinder}<section style="margin-top:24px"><h2>Resmî kaynaklar</h2><div class="source-list">${sources}</div></section></section></main>`,
    { canonical: `https://nereyebasvurulur.com/konu/${route.slug}/` }
  );
}

function phoneDetails(phone: string): { display: string; href: string } {
  const rawDigits = phone.replace(/\D/g, "");
  const digits = rawDigits.length === 11 && rawDigits.startsWith("0") ? rawDigits.slice(1) : rawDigits;
  return {
    display: rawDigits.length === 10 ? `0 ${phone}` : phone,
    href: digits.length === 10 ? `tel:+90${digits}` : `tel:${digits}`
  };
}

export function renderMilitaryBranchDirectory(provinces: MilitaryProvince[], districtCount: number, officeCount: number): string {
  const cards = provinces.map(province => `<a class="province-card" href="/askerlik-subeleri/${province.slug}/"><strong>${esc(province.name)} askerlik şubeleri</strong><small>${province.branches.length} ilçe · adres ve telefon</small></a>`).join("");
  const canonical = "https://nereyebasvurulur.com/askerlik-subeleri/";
  return shell(
    "Türkiye Askerlik Şubeleri | Adres, Telefon ve Yol Tarifi",
    `81 ilde ${districtCount} ilçe için MSB tarafından gösterilen askerlik şubelerinin güncel adres, telefon ve yol tarifi bilgileri.`,
    `<main class="wrap"><section class="hero"><div class="kicker">MSB resmî iletişim verileri</div><span class="status">✓ 21 Ağustos 2026 tarihinde doğrulandı</span><h1>Türkiye askerlik şubeleri: adres, telefon ve yol tarifi</h1><p class="lead">İlinizi ve ilçenizi seçerek size hizmet veren askerlik şubesini bulun. ${districtCount} ilçe sayfasındaki ${officeCount} farklı fiziksel şube kaydı, Millî Savunma Bakanlığının resmî askerlik şubesi aramasından alınmıştır.</p><form class="search" action="/ara" method="get"><input name="q" placeholder="İlçe yazın: Çankaya askerlik şubesi" aria-label="Askerlik şubesi ara"><button type="submit">Şube ara</button></form><div class="notice"><strong>Önemli:</strong> Her ilçede fiziksel şube bulunmayabilir. Sayfa, seçtiğiniz ilçe için MSB sisteminin gösterdiği sorumlu şubenin adını, adresini ve telefonunu açıkça belirtir.</div></section><section class="card content"><h2>İl seçin</h2><p>İl sayfasında ilçenizi seçerek adres, telefon ve tek dokunuşla yol tarifi bilgisine ulaşabilirsiniz.</p><div class="province-grid">${cards}</div></section><section class="card content" style="margin-top:14px"><h2>Resmî veri kaynağı</h2><p>Şube iletişim bilgileri MSB Askeralma Genel Müdürlüğünün “Askerlik Şubeleri İletişim Bilgileri” ekranından; ilçe envanteri İçişleri Bakanlığının “Valilikler ve Kaymakamlıklar” sayfasından doğrulanmıştır.</p><div class="source-list"><a class="source" target="_blank" rel="noopener noreferrer" href="https://www.msb.gov.tr/askeralma"><strong>Askerlik Şubeleri İletişim Bilgileri</strong><small>Millî Savunma Bakanlığı · Resmî kaynak ↗</small></a><a class="source" target="_blank" rel="noopener noreferrer" href="https://www.icisleri.gov.tr/valilikler"><strong>Valilikler ve Kaymakamlıklar</strong><small>İçişleri Bakanlığı · Resmî ilçe envanteri ↗</small></a></div></section></main>`,
    {
      canonical,
      jsonLd: [{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Türkiye askerlik şubeleri",
        description: `81 ilde ${districtCount} ilçe için askerlik şubesi adres, telefon ve yol tarifi dizini.`,
        url: canonical
      }]
    }
  );
}

export function renderMilitaryProvince(province: MilitaryProvince): string {
  const branches = province.branches.map(record => {
    const phone = phoneDetails(record.phone);
    return `<a class="branch-item" href="${militaryBranchPath(record)}"><strong>${esc(record.district)} askerlik şubesi</strong><small>${esc(record.branchName)}</small><small>${esc(phone.display)} · Yol tarifi ve adres</small></a>`;
  }).join("");
  const canonical = `https://nereyebasvurulur.com/askerlik-subeleri/${province.slug}/`;
  return shell(
    `${province.name} Askerlik Şubeleri | İlçe İlçe Adres ve Telefon`,
    `${province.name} ilindeki ${province.branches.length} ilçe için askerlik şubesi adresleri, telefon numaraları ve yol tarifi bağlantıları.`,
    `<main class="wrap"><section class="hero"><nav class="branch-breadcrumb" aria-label="İçerik yolu"><a href="/">Ana sayfa</a><span>›</span><a href="/askerlik-subeleri/">Askerlik şubeleri</a><span>›</span><span>${esc(province.name)}</span></nav><div class="kicker">${esc(province.name)} · MSB resmî kayıtları</div><span class="status">✓ İletişim bilgileri doğrulandı</span><h1>${esc(province.name)} askerlik şubeleri</h1><p class="lead">${esc(province.name)} ilindeki ${province.branches.length} ilçe için MSB sisteminin gösterdiği sorumlu askerlik şubesini seçin. Her ilçe sayfasında açık adres, telefon, e-posta ve yol tarifi bulunur.</p><form class="search" action="/ara" method="get"><input name="q" placeholder="${esc(province.name)} ilçesi yazın" aria-label="${esc(province.name)} askerlik şubesi ara"><button type="submit">Ara</button></form></section><section class="card content"><h2>İlçe seçin</h2><div class="branch-list">${branches}</div></section></main>`,
    {
      canonical,
      jsonLd: [{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${province.name} askerlik şubeleri`,
        description: `${province.name} ilindeki ilçeler için askerlik şubesi iletişim dizini.`,
        url: canonical
      }]
    }
  );
}

export function renderMilitaryBranch(record: MilitaryBranchRecord, province: MilitaryProvince): string {
  const phone = phoneDetails(record.phone);
  const canonicalPath = militaryBranchPath(record);
  const canonical = `https://nereyebasvurulur.com${canonicalPath}`;
  const servesSameNamedBranch = record.branchName.toLocaleLowerCase("tr-TR").includes(record.district.toLocaleLowerCase("tr-TR"));
  const serviceExplanation = servesSameNamedBranch
    ? `MSB'nin resmî iletişim aramasında ${record.province} ili ${record.district} ilçesi için ${record.branchName} gösterilmektedir.`
    : `${record.district} ilçesinde ayrı bir fiziksel şube görünmüyor. MSB'nin resmî iletişim araması bu ilçe için ${record.branchName} kaydını göstermektedir.`;
  const sourceDistrictNote = record.officialDistrict.toLocaleLowerCase("tr-TR") !== record.district.toLocaleLowerCase("tr-TR")
    ? `MSB kayıt ekranındaki ilçe alanı “${record.officialDistrict}” olarak dönmektedir; güncel ilçe adı sayfa başlığında “${record.district}” olarak kullanılmıştır.`
    : "";
  const nearby = province.branches.filter(item => item.slug !== record.slug).slice(0, 6).map(item => `<a class="branch-item" href="${militaryBranchPath(item)}"><strong>${esc(item.district)} askerlik şubesi</strong><small>Adres, telefon ve yol tarifi</small></a>`).join("");
  const faq = [
    {
      q: `${record.district} askerlik şubesi nerededir?`,
      a: `${record.district} ilçesi için MSB sisteminin gösterdiği ${record.branchName}, ${record.address} adresindedir.`
    },
    {
      q: `${record.district} askerlik şubesine nasıl gidilir?`,
      a: `“Yol tarifi al” düğmesi, ${record.branchName} için MSB'de yayımlanan adresi harita uygulamasına hedef olarak aktarır. Başlangıç konumunuzu cihazınızdan seçebilirsiniz.`
    },
    {
      q: `${record.district} askerlik şubesine nasıl ulaşırım?`,
      a: `${record.branchName} telefon numarası ${phone.display}, e-posta adresi ${record.email} şeklindedir. Gitmeden önce çalışma ve kabul durumunu telefonla teyit edin.`
    },
    {
      q: `${record.district} askerlik şubesinin telefonu nedir?`,
      a: `MSB'nin resmî iletişim kaydında telefon numarası ${phone.display} olarak yer almaktadır.`
    }
  ];
  const faqHtml = faq.map(item => `<section class="faq-item"><h3>${esc(item.q)}</h3><p>${esc(item.a)}</p></section>`).join("");
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "GovernmentOffice",
      name: record.branchName,
      url: canonical,
      telephone: phone.href.replace("tel:", ""),
      email: record.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: record.address,
        addressRegion: record.province,
        addressCountry: "TR"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(item => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana sayfa", item: "https://nereyebasvurulur.com/" },
        { "@type": "ListItem", position: 2, name: "Askerlik şubeleri", item: "https://nereyebasvurulur.com/askerlik-subeleri/" },
        { "@type": "ListItem", position: 3, name: record.province, item: `https://nereyebasvurulur.com/askerlik-subeleri/${province.slug}/` },
        { "@type": "ListItem", position: 4, name: `${record.district} askerlik şubesi`, item: canonical }
      ]
    }
  ];

  return shell(
    `${record.district} Askerlik Şubesi Nerede? Adres, Telefon ve Yol Tarifi`,
    `${record.province} ${record.district} askerlik şubesi adresi, telefonu ve yol tarifi. MSB kaydına göre sorumlu şube: ${record.branchName}.`,
    `<main class="wrap"><section class="hero"><nav class="branch-breadcrumb" aria-label="İçerik yolu"><a href="/">Ana sayfa</a><span>›</span><a href="/askerlik-subeleri/">Askerlik şubeleri</a><span>›</span><a href="/askerlik-subeleri/${province.slug}/">${esc(record.province)}</a><span>›</span><span>${esc(record.district)}</span></nav><div class="kicker">${esc(record.province)} · ${esc(record.district)}</div><span class="status">✓ MSB resmî kaydından doğrulandı</span><h1>${esc(record.district)} Askerlik Şubesi nerede?</h1><p class="lead">${esc(serviceExplanation)}</p></section><section class="card content"><div class="contact-grid"><section class="contact-card"><h2>${esc(record.branchName)}</h2><address>${esc(record.address)}</address><div class="contact-actions"><a class="btn primary" target="_blank" rel="noopener noreferrer" href="${esc(record.directionsUrl)}">Yol tarifi al ↗</a><a class="btn" href="${esc(phone.href)}">Telefon et</a></div></section><section class="contact-card"><h3>İletişim bilgileri</h3><div class="contact-row"><span>Telefon</span><a href="${esc(phone.href)}">${esc(phone.display)}</a></div><div class="contact-row"><span>E-posta</span><a href="mailto:${esc(record.email)}">${esc(record.email)}</a></div><div class="contact-row"><span>Belgegeçer</span><strong>${esc(record.fax)}</strong></div><div class="contact-row"><span>Bağlı bölge</span><strong>${esc(record.regionalOffice)}</strong></div></section></div><div class="notice"><strong>Gitmeden önce:</strong> Askerlik işlemlerinin önemli bir bölümü e-Devlet “Askerliğim” hizmetinden başlatılabilir. Fizikî müracaat gerekiyorsa T.C. kimlik kartınızı yanınızda bulundurun ve kabul saatini telefonla teyit edin.</div><section style="margin-top:24px"><h2>${esc(record.district)} askerlik şubesine nasıl gidilir?</h2><p>Yol tarifi düğmesi, MSB'nin yayımladığı <strong>${esc(record.address)}</strong> adresini hedef olarak açar. Harita uygulamasında bulunduğunuz konumu başlangıç noktası seçerek otomobil, toplu taşıma veya yaya seçeneklerini görebilirsiniz.</p></section><section style="margin-top:24px"><h2>${esc(record.district)} için hangi askerlik şubesi hizmet veriyor?</h2><p>${esc(serviceExplanation)}</p>${sourceDistrictNote ? `<p class="verification-note">${esc(sourceDistrictNote)}</p>` : ""}</section><section style="margin-top:24px"><h2>Askerlik işlemleri için başvuru adımları</h2><div class="source-list"><a class="source" href="/konu/askerlik-yoklamasi-nereye-yapilir/"><strong>Askerlik yoklaması</strong><small>e-Devlet, aile hekimi ve askerlik şubesi adımları</small></a><a class="source" href="/konu/bedelli-askerlik-nereye-basvurulur/"><strong>Bedelli askerlik başvurusu</strong><small>Başvuru, ödeme ve sınıflandırma rotası</small></a><a class="source" href="/konu/siniflandirma-ve-sevk-sevk-belgesi-nereye-basvurulur/"><strong>Sevk belgesi</strong><small>e-Devlet veya askerlik şubesi kanalı</small></a><a class="source" href="/konu/askerlik-yukumlulugu-ve-askeralma-islemleri-askerlik-durum-belgesi-nereye-basvurulur/"><strong>Askerlik durum belgesi</strong><small>Belge alma ve doğrulama adımları</small></a></div></section><section style="margin-top:24px"><h2>Sık sorulan sorular</h2><div class="faq-list">${faqHtml}</div></section><section style="margin-top:24px"><h2>Resmî kaynak ve doğrulama</h2><div class="source-list"><a class="source" target="_blank" rel="noopener noreferrer" href="${esc(record.officialSourceUrl)}"><strong>Askerlik Şubeleri İletişim Bilgileri</strong><small>Millî Savunma Bakanlığı · İl: ${esc(record.officialProvince)}, ilçe: ${esc(record.officialDistrict)} ↗</small></a></div><p class="verification-note">Son doğrulama: ${esc(record.lastVerified)}. Adres ve telefonlar değişebileceği için işlem gününde MSB kaydını ve telefon bilgisini yeniden kontrol edin.</p></section>${nearby ? `<section style="margin-top:24px"><h2>${esc(record.province)} ilindeki diğer askerlik şubeleri</h2><div class="branch-list">${nearby}</div></section>` : ""}</section></main>`,
    { canonical, jsonLd }
  );
}

export function renderSearch(query: string, matches: RouteRecord[], branchMatches: MilitaryBranchRecord[] = []): string {
  const routeResults = matches.map(r => `<a class="source" href="/konu/${r.slug}/"><strong>${esc(r.title)}</strong><small>${esc(r.category)} · doğrulanmış rota</small></a>`).join("");
  const branchResults = branchMatches.map(record => `<a class="source" href="${militaryBranchPath(record)}"><strong>${esc(record.province)} ${esc(record.district)} askerlik şubesi</strong><small>${esc(record.branchName)} · ${esc(record.phone)} · adres ve yol tarifi</small></a>`).join("");
  const results = routeResults || branchResults ? `${branchResults}${routeResults}` : `<div class="notice">Doğrulanmış rotalarda veya askerlik şubelerinde eşleşme bulunamadı. Doğrulanamayan kayıtlar kesin yönlendirme olarak gösterilmez.</div>`;
  return shell(
    "Arama | Nereye Başvurulur?",
    "Doğrulanmış resmî başvuru rotaları ve askerlik şubelerinde arama.",
    `<main class="wrap"><section class="hero"><div class="kicker">Arama</div><h1>Başvuru rotası veya askerlik şubesi ara</h1><form class="search" action="/ara" method="get"><input name="q" value="${esc(query)}" placeholder="Örn. Çankaya askerlik şubesi, bedelli askerlik" aria-label="Başvuru rotası veya askerlik şubesi ara"><button type="submit">Ara</button></form></section><section class="card content"><div class="source-list">${results}</div></section></main>`,
    { canonical: "https://nereyebasvurulur.com/ara", noindex: true }
  );
}

export function renderDashboard(stats: { categories: number; leaves: number; linked: number; routes: number; published: number; verified: number; localCheck: number; needsReview: number; sources: number; highRisk: number; militaryProvinces: number; militaryDistrictPages: number; militaryPhysicalBranches: number; militaryLastVerified: string }, routes: RouteRecord[]): string {
  const quality = summarizeQuality(routes);
  const recent = routes.map(r => {
    const title = r.verificationStatus === "needs-review" ? `<strong>${esc(r.title)}</strong>` : `<a href="/konu/${r.slug}/"><strong>${esc(r.title)}</strong></a>`;
    const status = r.verificationStatus === "verified" ? `<span class="badge ok">Doğrulandı</span>` : r.verificationStatus === "local-check" ? `<span class="badge warn">Yerel kontrol</span>` : `<span class="badge closed">Yayıma kapalı</span>`;
    const risk = r.freshnessRisk === "high" ? `<span class="badge high">Yüksek</span>` : r.freshnessRisk === "medium" ? `<span class="badge warn">Orta</span>` : "Düşük";
    return `<tr><td data-label="Rota">${title}<br><small>${esc(r.category)}</small></td><td data-label="Durum">${status}</td><td data-label="Son kontrol">${esc(r.lastVerified)}</td><td data-label="Risk">${risk}</td></tr>`;
  }).join("");
  return shell(
    "Yönetim Dashboard | Nereye Başvurulur?",
    "Nereye Başvurulur yönetim paneli.",
    `<main class="wrap admin"><div class="kicker">Yönetim</div><h1>Nereye Başvurulur Dashboard</h1><p class="lead">Link-tree rotaları ile askerlik şubesi konum envanterinin kapsamı, yayın durumu ve güncellik riski.</p><div class="admin-grid"><div class="metric"><strong>${stats.categories}</strong><span>Ana kategori</span></div><div class="metric"><strong>${stats.leaves}</strong><span>Toplam menü yaprağı</span></div><div class="metric"><strong>${stats.published}</strong><span>Canlı başvuru rotası</span></div><div class="metric"><strong>${stats.needsReview}</strong><span>Kesin yönlendirmeye kapalı</span></div></div><div class="admin-grid"><div class="metric"><strong>${stats.verified}</strong><span>Ulusal kanal doğrulandı</span></div><div class="metric"><strong>${stats.localCheck}</strong><span>Yerel yetki kontrolü gerekli</span></div><div class="metric"><strong>${stats.sources}</strong><span>Resmî kaynak bağlantısı</span></div><div class="metric"><strong>${stats.highRisk}</strong><span>Yüksek güncellik riski</span></div></div><div class="admin-grid"><div class="metric"><strong>${quality.routesWithIssues}</strong><span>Kalite eksiği bulunan rota</span></div><div class="metric"><strong>${quality.counts["missing-direct-application-link"]}</strong><span>Doğrudan köprü eksiği</span></div><div class="metric"><strong>${quality.counts["stale-verification"]}</strong><span>Eski doğrulama</span></div><div class="metric"><strong>${quality.counts["conflicting-sources"]}</strong><span>Kaynak çelişkisi</span></div></div><div class="admin-grid"><div class="metric"><strong>${stats.militaryProvinces}</strong><span>Şube dizinindeki il</span></div><div class="metric"><strong>${stats.militaryDistrictPages}</strong><span>İlçe askerlik şubesi sayfası</span></div><div class="metric"><strong>${stats.militaryPhysicalBranches}</strong><span>Farklı fiziksel şube</span></div><div class="metric"><strong>${esc(stats.militaryLastVerified)}</strong><span>Şube son doğrulaması</span></div></div><div class="admin-links" style="margin-bottom:18px"><a class="btn primary" href="/admin/askerlik-subeleri/">Askerlik şubesi envanterini aç</a><a class="btn" href="/admin/data/">Rota verisini aç</a></div><section class="card content"><h2>${stats.leaves} yaprağın doğrulama envanteri</h2><div class="table-wrap"><table class="responsive-table"><thead><tr><th>Rota</th><th>Durum</th><th>Son kontrol</th><th>Risk</th></tr></thead><tbody>${recent}</tbody></table></div></section></main>`,
    { noindex: true, admin: true, canonical: "https://nereyebasvurulur.com/admin/dashboard/" }
  );
}

export function renderDataPage(routes: RouteRecord[]): string {
  const rows = routes.map(r => {
    const status = r.verificationStatus === "verified" ? `<span class="badge ok">Doğrulandı</span>` : r.verificationStatus === "local-check" ? `<span class="badge warn">Yerel kontrol</span>` : `<span class="badge closed">Yayıma kapalı</span>`;
    const risk = r.freshnessRisk === "high" ? `<span class="badge high">Yüksek</span>` : r.freshnessRisk === "medium" ? `<span class="badge warn">Orta</span>` : "Düşük";
    const blocker = r.publicationBlocker ? `<br><small>Eksik kapsam: ${esc(r.publicationBlocker)}</small>` : "";
    const quality = assessRouteQuality(r);
    const qualityCell = quality.length ? `<span class="badge high">${quality.length} eksik</span><br><small>${quality.map(issue => esc(issue.code)).join("<br>")}</small>` : `<span class="badge ok">Tam</span>`;
    return `<tr><td data-label="Rota"><strong>${esc(r.pathKey)}</strong><br><small>${esc(r.slug)}</small>${blocker}</td><td data-label="Durum">${status}</td><td data-label="Kaynak">${r.sources.length}</td><td data-label="Son kontrol">${esc(r.lastVerified)}</td><td data-label="Risk">${risk}</td><td data-label="Kalite">${qualityCell}</td></tr>`;
  }).join("");
  return shell(
    "Veri Envanteri | Nereye Başvurulur?",
    "Yönetim veri envanteri.",
    `<main class="wrap admin"><div class="kicker">Yönetim / Veri</div><h1>Rota veri envanteri</h1><p class="lead">Her yaprak için veri kaydı tutulur; resmî kanalı kesinleştirilemeyen kayıt canlı bağlantı kazanmaz. Kalite sütunu resmî kaynak, doğrudan köprü, itiraz, e-Devlet, dilekçe, güncellik ve kaynak çelişkisi kontrollerini birlikte gösterir.</p><div class="admin-links"><a class="btn primary" href="/admin/api/data">JSON verisini aç</a><a class="btn" href="/admin/askerlik-subeleri/">Askerlik şubeleri</a><a class="btn" href="/admin/dashboard/">Dashboard</a></div><section class="card content" style="margin-top:18px"><div class="table-wrap"><table class="responsive-table"><thead><tr><th>Rota</th><th>Durum</th><th>Kaynak</th><th>Son kontrol</th><th>Risk</th><th>Kalite</th></tr></thead><tbody>${rows}</tbody></table></div></section></main>`,
    { noindex: true, admin: true, canonical: "https://nereyebasvurulur.com/admin/data/" }
  );
}

export function renderMilitaryBranchAdmin(branches: MilitaryBranchRecord[]): string {
  const rows = branches.map(record => `<tr><td data-label="İl / ilçe"><a href="${militaryBranchPath(record)}"><strong>${esc(record.province)} / ${esc(record.district)}</strong></a><br><small>${esc(record.branchName)}</small></td><td data-label="Telefon">${esc(phoneDetails(record.phone).display)}</td><td data-label="Adres">${esc(record.address)}</td><td data-label="Durum"><span class="badge ok">MSB doğrulandı</span></td><td data-label="Son kontrol">${esc(record.lastVerified)}</td></tr>`).join("");
  return shell(
    "Askerlik Şubesi Envanteri | Yönetim",
    "Askerlik şubesi ilçe, adres ve iletişim veri envanteri.",
    `<main class="wrap admin"><div class="kicker">Yönetim / Askerlik şubeleri</div><h1>${branches.length} ilçe sayfasının şube envanteri</h1><p class="lead">Her kayıt MSB'nin il ve ilçe aramasından alınan sorumlu şube, adres, telefon ve yol tarifi hedefini içerir.</p><div class="admin-links"><a class="btn primary" href="/admin/api/data">JSON verisini aç</a><a class="btn" href="/admin/dashboard/">Dashboard</a></div><section class="card content" style="margin-top:18px"><div class="table-wrap"><table class="responsive-table"><thead><tr><th>İl / ilçe</th><th>Telefon</th><th>Adres</th><th>Durum</th><th>Son kontrol</th></tr></thead><tbody>${rows}</tbody></table></div></section></main>`,
    { noindex: true, admin: true, canonical: "https://nereyebasvurulur.com/admin/askerlik-subeleri/" }
  );
}

export function renderNotFound(): string {
  return shell("Sayfa bulunamadı | Nereye Başvurulur?", "Aradığınız sayfa bulunamadı.", `<main class="wrap"><section class="hero"><h1>Bu rota henüz yok.</h1><p class="lead">Ana menüden veya arama sayfasından doğrulanmış rotalara ulaşabilirsiniz.</p><a class="btn primary" href="/">Ana sayfaya dön</a></section></main>`, { noindex: true });
}
