import { shell } from "./ui";

const petitionStyles = `
.petition-builder{padding:34px 0 48px}
.builder-intro{max-width:880px;margin-bottom:22px}
.builder-intro h1{font-size:clamp(2.15rem,5vw,3.65rem);margin-bottom:12px}
.builder-intro .lead{margin-bottom:0}
.privacy-strip{display:flex;align-items:flex-start;gap:10px;margin-top:16px;padding:13px 15px;border:1px solid #bad8ca;background:var(--okbg);border-radius:14px;color:#24583e;font-size:.9rem;line-height:1.5}
.petition-layout{display:grid;grid-template-columns:minmax(330px,430px) minmax(0,1fr);gap:18px;align-items:start}
.builder-form-column,.petition-preview-column{min-width:0}
.petition-form{background:#fff;border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:19px}
.petition-form fieldset{border:0;padding:0;margin:0 0 22px;min-width:0}
.petition-form fieldset:last-of-type{margin-bottom:13px}
.petition-form legend{font-weight:900;font-size:1.03rem;margin-bottom:12px;padding:0;color:#27344a}
.field{display:block;margin-bottom:13px}
.field:last-child{margin-bottom:0}
.field-label{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-size:.87rem;font-weight:800;color:#344054;margin-bottom:6px}
.required-mark{color:var(--danger);font-size:.76rem;font-weight:800}
.optional-mark{color:var(--muted);font-size:.75rem;font-weight:650}
.field input,.field textarea{display:block;width:100%;border:1px solid #cfd7e4;border-radius:11px;background:#fff;padding:11px 12px;color:var(--ink);font-size:16px;line-height:1.45}
.field textarea{resize:vertical;min-height:90px}
.field textarea.request-input{min-height:190px}
.field input:hover,.field textarea:hover{border-color:#aebbd0}
.field-hint{display:block;color:var(--muted);font-size:.78rem;line-height:1.45;margin-top:5px}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.form-actions{display:grid;grid-template-columns:1fr 1fr;gap:9px;padding-top:4px}
.form-actions .btn{width:100%}
.form-actions .primary{grid-column:1/-1}
.form-status{min-height:22px;margin:10px 0 0;font-size:.82rem;color:var(--ok);line-height:1.4}
.petition-preview-column{position:sticky;top:82px}
.preview-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}
.preview-toolbar h2{font-size:1rem;margin:0;color:#344054}
.preview-toolbar span{font-size:.78rem;color:var(--muted)}
.petition-paper{width:100%;min-height:940px;background:#fff;border:1px solid #d8dee8;border-radius:6px;box-shadow:0 18px 46px rgba(15,23,42,.11);padding:clamp(30px,6vw,66px);font-family:"Times New Roman",Times,serif;color:#111;line-height:1.55;font-size:1rem}
.paper-recipient{text-align:center;font-weight:700;text-transform:uppercase;font-size:1.08rem;margin:0 0 34px}
.paper-subject{margin:0 0 24px}
.paper-subject strong{display:inline-block;min-width:62px}
.paper-heading{font-weight:700;text-decoration:underline;margin:22px 0 10px}
.paper-body{min-height:170px}
.paper-body p{margin:0 0 11px;text-indent:1.8em;white-space:pre-wrap}
.paper-closing{margin:24px 0 30px;text-indent:1.8em}
.paper-signature{width:min(280px,48%);margin-left:auto;text-align:center;min-height:105px}
.paper-signature div+div{margin-top:5px}
.signature-space{height:42px;font-style:italic;color:#555}
.paper-contact{margin-top:28px;border-top:1px solid #333;padding-top:12px;display:grid;gap:5px}
.paper-contact strong{display:inline-block;min-width:80px}
.paper-attachments{margin-top:18px}
.paper-attachments ol{margin:6px 0 0;padding-left:22px}
.preview-empty{color:#7a8493;font-style:italic}
.legal-card{margin-top:18px;padding:18px;background:#fff;border:1px solid var(--line);border-radius:var(--radius)}
.legal-card h2{font-size:1.05rem;margin:0 0 8px}
.legal-card p{color:#526174;line-height:1.6;margin:0 0 10px;font-size:.89rem}
.legal-card a{color:var(--blue);font-weight:800}
.legal-points{margin:0;padding-left:19px;color:#526174;font-size:.87rem;line-height:1.55}
.legal-points li+li{margin-top:5px}
@media(max-width:950px){
  .petition-layout{grid-template-columns:1fr}
  .petition-preview-column{position:static}
  .petition-paper{min-height:860px}
}
@media(max-width:620px){
  .petition-builder{padding:24px 0 34px}
  .petition-form{padding:16px}
  .form-grid{grid-template-columns:1fr}
  .petition-paper{padding:28px 22px;font-size:.94rem;min-height:760px}
  .paper-signature{width:55%}
  .preview-toolbar{align-items:flex-end}
}
@media print{
  @page{size:A4;margin:18mm 20mm}
  header,footer,.builder-intro,.builder-form-column,.preview-toolbar,.legal-card{display:none!important}
  body{background:#fff}
  .wrap{width:100%;max-width:none}
  .petition-builder{padding:0}
  .petition-layout{display:block;margin:0}
  .petition-preview-column{position:static}
  .petition-paper{border:0;box-shadow:none;border-radius:0;min-height:0;padding:0;font-size:12pt}
}
`;

const petitionScript = `
<script>
(function(){
  var form=document.getElementById("petitionForm");
  var fields={
    recipient:document.getElementById("recipient"),
    subject:document.getElementById("subject"),
    request:document.getElementById("petitionRequest"),
    date:document.getElementById("petitionDate"),
    fullName:document.getElementById("fullName"),
    address:document.getElementById("address"),
    identity:document.getElementById("identityNumber"),
    phone:document.getElementById("phone"),
    email:document.getElementById("email"),
    reference:document.getElementById("reference"),
    attachments:document.getElementById("attachments")
  };
  var subjectEdited=false;
  var status=document.getElementById("formStatus");

  function value(key){return fields[key].value.trim()}
  function today(){
    var d=new Date();
    var month=String(d.getMonth()+1).padStart(2,"0");
    var day=String(d.getDate()).padStart(2,"0");
    return d.getFullYear()+"-"+month+"-"+day;
  }
  function formatDate(input){
    var parts=input.split("-");
    return parts.length===3?parts[2]+"."+parts[1]+"."+parts[0]:input;
  }
  function deriveSubject(text){
    var clean=text.replace(/\\s+/g," ").trim();
    var first=(clean.split(/[.!?]/)[0]||clean).trim();
    if(first.length>115) first=first.slice(0,112).trim()+"…";
    return first;
  }
  function recipientText(text){
    var clean=text.trim();
    if(!clean) return "BAŞVURULACAK KURUM / MAKAM";
    var upper=clean.toLocaleUpperCase("tr-TR");
    return /MAKAMINA$/.test(upper)?upper:upper+" MAKAMINA";
  }
  function setText(id,text,placeholder){
    var element=document.getElementById(id);
    element.textContent=text||placeholder;
    element.classList.toggle("preview-empty",!text);
  }
  function setParagraphs(text){
    var target=document.getElementById("previewBody");
    target.replaceChildren();
    var lines=text.split(/\\n+/).map(function(line){return line.trim()}).filter(Boolean);
    if(!lines.length){
      var empty=document.createElement("p");
      empty.className="preview-empty";
      empty.textContent="Talebiniz burada resmî dilekçe metni olarak görünecek.";
      target.appendChild(empty);
      return;
    }
    lines.forEach(function(line){var p=document.createElement("p");p.textContent=line;target.appendChild(p)});
  }
  function attachmentLines(){return value("attachments").split(/\\n+/).map(function(line){return line.trim()}).filter(Boolean)}
  function renderAttachments(){
    var lines=attachmentLines();
    var section=document.getElementById("previewAttachments");
    var list=document.getElementById("previewAttachmentList");
    list.replaceChildren();
    section.hidden=!lines.length;
    lines.forEach(function(line){var li=document.createElement("li");li.textContent=line;list.appendChild(li)});
  }
  function updatePreview(){
    var request=value("request");
    var subject=value("subject")||deriveSubject(request);
    setText("previewRecipient",recipientText(value("recipient")),"BAŞVURULACAK KURUM / MAKAM");
    setText("previewSubject",subject,"Talebin kısa konusu");
    setText("previewReference",value("reference"),"");
    document.getElementById("previewReferenceRow").hidden=!value("reference");
    setParagraphs(request);
    setText("previewDate",formatDate(value("date")),"Tarih");
    setText("previewName",value("fullName"),"Ad Soyad");
    setText("previewAddress",value("address"),"Tebligata elverişli iş veya ikametgâh adresi");
    setText("previewIdentity",value("identity"),"");
    document.getElementById("previewIdentityRow").hidden=!value("identity");
    var contact=[value("phone"),value("email")].filter(Boolean).join(" · ");
    setText("previewContact",contact,"");
    document.getElementById("previewContactRow").hidden=!contact;
    renderAttachments();
  }
  function escapeHtml(text){return String(text).replace(/[&<>"']/g,function(char){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]||char})}
  function validate(){
    fields.identity.setCustomValidity("");
    fields.request.setCustomValidity("");
    if(value("identity")&&!/^\\d{11}$/.test(value("identity"))) fields.identity.setCustomValidity("T.C. kimlik numarası yazacaksanız 11 rakam girmelisiniz.");
    if(value("request").length<20) fields.request.setCustomValidity("Talebinizi somut biçimde, en az 20 karakterle açıklayın.");
    if(!form.reportValidity()){
      status.textContent="Lütfen işaretlenen zorunlu alanları tamamlayın.";
      status.style.color="var(--danger)";
      return false;
    }
    status.style.color="var(--ok)";
    return true;
  }
  function documentData(){
    return {
      recipient:recipientText(value("recipient")),subject:value("subject")||deriveSubject(value("request")),request:value("request"),date:formatDate(value("date")),fullName:value("fullName"),address:value("address"),identity:value("identity"),phone:value("phone"),email:value("email"),reference:value("reference"),attachments:attachmentLines()
    };
  }
  function plainText(data){
    var lines=[data.recipient,"","Konu: "+data.subject];
    if(data.reference) lines.push("İlgi: "+data.reference);
    lines.push("","AÇIKLAMALAR VE TALEP","",data.request,"","Yukarıda açıkladığım hususlar kapsamında talebimin değerlendirilerek gereğinin yapılmasını ve sonucunun tarafıma yazılı olarak bildirilmesini saygılarımla arz ederim.","",data.date,"",data.fullName,"İmza","","Adres: "+data.address);
    if(data.identity) lines.push("T.C. Kimlik No: "+data.identity);
    if(data.phone) lines.push("Telefon: "+data.phone);
    if(data.email) lines.push("E-posta: "+data.email);
    if(data.attachments.length){lines.push("","Ekler:");data.attachments.forEach(function(item,index){lines.push((index+1)+". "+item)})}
    return lines.join("\\n");
  }
  function wordHtml(data){
    var paragraphs=data.request.split(/\\n+/).map(function(line){return line.trim()}).filter(Boolean).map(function(line){return "<p>"+escapeHtml(line)+"</p>"}).join("");
    var contact="<p><strong>Adres:</strong> "+escapeHtml(data.address)+"</p>";
    if(data.identity) contact+="<p><strong>T.C. Kimlik No:</strong> "+escapeHtml(data.identity)+"</p>";
    if(data.phone) contact+="<p><strong>Telefon:</strong> "+escapeHtml(data.phone)+"</p>";
    if(data.email) contact+="<p><strong>E-posta:</strong> "+escapeHtml(data.email)+"</p>";
    var attachments=data.attachments.length?"<div class='attachments'><strong>Ekler:</strong><ol>"+data.attachments.map(function(item){return "<li>"+escapeHtml(item)+"</li>"}).join("")+"</ol></div>":"";
    var reference=data.reference?"<p><strong>İlgi:</strong> "+escapeHtml(data.reference)+"</p>":"";
    return "<!doctype html><html><head><meta charset='utf-8'><title>Dilekçe</title><style>@page Section1{size:595.3pt 841.9pt;margin:56.7pt}div.Section1{page:Section1}body{font-family:'Times New Roman',serif;font-size:12pt;line-height:1.5;color:#000}.recipient{text-align:center;font-weight:bold;margin-bottom:28pt}.subject strong{display:inline-block;min-width:46pt}.heading{font-weight:bold;text-decoration:underline;margin-top:18pt}p{margin:0 0 9pt}.body p{text-indent:27pt}.closing{text-indent:27pt;margin-top:18pt}.signature{width:210pt;margin-left:auto;text-align:center;margin-top:24pt}.signature-space{height:34pt}.contact{border-top:1px solid #000;padding-top:9pt;margin-top:24pt}.contact p{margin-bottom:3pt}.attachments{margin-top:14pt}.attachments ol{margin-top:4pt}</style></head><body><div class='Section1'><div class='recipient'>"+escapeHtml(data.recipient)+"</div><p class='subject'><strong>Konu:</strong> "+escapeHtml(data.subject)+"</p>"+reference+"<div class='heading'>AÇIKLAMALAR VE TALEP</div><div class='body'>"+paragraphs+"</div><p class='closing'>Yukarıda açıkladığım hususlar kapsamında talebimin değerlendirilerek gereğinin yapılmasını ve sonucunun tarafıma yazılı olarak bildirilmesini saygılarımla arz ederim.</p><div class='signature'><div>"+escapeHtml(data.date)+"</div><div>"+escapeHtml(data.fullName)+"</div><div class='signature-space'>İmza</div></div><div class='contact'>"+contact+"</div>"+attachments+"</div></body></html>";
  }

  fields.date.value=today();
  Object.keys(fields).forEach(function(key){fields[key].addEventListener("input",updatePreview)});
  fields.subject.addEventListener("input",function(){subjectEdited=true});
  fields.request.addEventListener("input",function(){if(!subjectEdited) fields.subject.value=deriveSubject(value("request"));updatePreview()});
  form.addEventListener("submit",function(event){event.preventDefault()});
  document.getElementById("downloadWord").addEventListener("click",function(){
    if(!validate()) return;
    updatePreview();
    var data=documentData();
    var blob=new Blob(["\\ufeff",wordHtml(data)],{type:"application/msword;charset=utf-8"});
    var url=URL.createObjectURL(blob);
    var link=document.createElement("a");
    link.href=url;link.download="dilekce-"+(value("date")||today())+".doc";document.body.appendChild(link);link.click();link.remove();setTimeout(function(){URL.revokeObjectURL(url)},1000);
    status.textContent="Dilekçe Word dosyası hazırlandı. Göndermeden önce okuyup imzalamayı unutmayın.";
  });
  document.getElementById("printPetition").addEventListener("click",function(){if(!validate()) return;updatePreview();status.textContent="Yazdırma ekranında ‘PDF olarak kaydet’ seçeneğini kullanabilirsiniz.";window.print()});
  document.getElementById("copyPetition").addEventListener("click",async function(){
    if(!validate()) return;
    try{await navigator.clipboard.writeText(plainText(documentData()));status.textContent="Dilekçe metni panoya kopyalandı."}catch(error){status.textContent="Tarayıcı kopyalamaya izin vermedi; Word indirme seçeneğini kullanın.";status.style.color="var(--danger)"}
  });
  document.getElementById("resetPetition").addEventListener("click",function(){form.reset();fields.date.value=today();subjectEdited=false;status.textContent="Form temizlendi.";status.style.color="var(--ok)";updatePreview();fields.recipient.focus()});
  updatePreview();
})();
</script>`;

export function renderPetitionBuilder(): string {
  const canonical = "https://nereyebasvurulur.com/dilekce-olustur/";
  return shell(
    "Ücretsiz Dilekçe Oluştur | Word veya PDF İndir",
    "Talebinizi yazın; resmî dilekçede bulunması gereken alanlarla düzenlenmiş dilekçenizi ücretsiz Word olarak indirin veya PDF olarak kaydedin.",
    `<main class="wrap petition-builder"><section class="builder-intro"><div class="kicker">Ücretsiz · tarayıcıda hazırlanır</div><h1>Talebinizi yazın, dilekçeniz hazır olsun.</h1><p class="lead">Talebinizi tek ana alana yazın; kurum ve kanunen gerekli kimlik/adres alanlarını tamamlayın. Modül metni resmî dilekçe düzenine yerleştirir. Hazır dilekçeyi Word olarak indirebilir veya yazdırma ekranından PDF kaydedebilirsiniz.</p><div class="privacy-strip"><span aria-hidden="true">🔒</span><span><strong>Bilgileriniz size ait kalır.</strong> Yazdığınız kişisel bilgiler sunucuya gönderilmez, kaydedilmez ve paylaşılmaz; belge yalnızca bu tarayıcıda oluşturulur.</span></div></section><div class="petition-layout"><section class="builder-form-column" aria-labelledby="formHeading"><form class="petition-form" id="petitionForm" novalidate><fieldset><legend id="formHeading">1. Dilekçenin konusu</legend><label class="field"><span class="field-label">Başvurulacak kurum / makam <span class="required-mark">Zorunlu</span></span><input id="recipient" name="recipient" required maxlength="160" placeholder="Örn. Ankara Büyükşehir Belediye Başkanlığı" autocomplete="organization"><span class="field-hint">Kurumdan emin değilseniz sitedeki başvuru rotasından yetkili mercii kontrol edin. Yanlış idari makama verilen dilekçenin yetkili makama gönderilmesi gerekir.</span></label><label class="field"><span class="field-label">Talebiniz ve açıklamanız <span class="required-mark">Zorunlu</span></span><textarea class="request-input" id="petitionRequest" name="request" required minlength="20" maxlength="5000" placeholder="Ne oldu, ne zaman oldu ve kurumdan tam olarak ne yapılmasını istiyorsunuz? Somut bilgileri kısa paragraflarla yazın."></textarea><span class="field-hint">Yargı mercilerinin görevindeki bir konu yerine idari makamdan istenebilecek somut işlemi yazın. Süreli bir itirazsa karar tarihi ve numarasını ekleyin.</span></label><label class="field"><span class="field-label">Kısa konu başlığı <span class="optional-mark">Otomatik oluşur, düzenlenebilir</span></span><input id="subject" name="subject" maxlength="180" placeholder="Talebinizden otomatik oluşturulur"></label><label class="field"><span class="field-label">İlgili karar / başvuru numarası <span class="optional-mark">Varsa</span></span><input id="reference" name="reference" maxlength="180" placeholder="Örn. 15.08.2026 tarihli 2026/123 sayılı işlem"></label></fieldset><fieldset><legend>2. Dilekçe sahibi</legend><label class="field"><span class="field-label">Ad ve soyad <span class="required-mark">Zorunlu</span></span><input id="fullName" name="fullName" required maxlength="100" autocomplete="name" placeholder="Adınız ve soyadınız"></label><label class="field"><span class="field-label">İş veya ikametgâh adresi <span class="required-mark">Zorunlu</span></span><textarea id="address" name="address" required maxlength="500" autocomplete="street-address" placeholder="Mahalle, cadde/sokak, bina/daire, ilçe ve il"></textarea><span class="field-hint">3071 sayılı Kanun uyarınca ad-soyad, imza ve iş veya ikametgâh adresi zorunludur.</span></label><div class="form-grid"><label class="field"><span class="field-label">T.C. kimlik numarası <span class="optional-mark">İsteğe bağlı</span></span><input id="identityNumber" name="identityNumber" inputmode="numeric" pattern="[0-9]{11}" maxlength="11" autocomplete="off" placeholder="11 rakam"></label><label class="field"><span class="field-label">Tarih <span class="required-mark">Zorunlu</span></span><input id="petitionDate" name="petitionDate" type="date" required></label><label class="field"><span class="field-label">Telefon <span class="optional-mark">İsteğe bağlı</span></span><input id="phone" name="phone" type="tel" maxlength="30" autocomplete="tel" placeholder="05xx xxx xx xx"></label><label class="field"><span class="field-label">E-posta <span class="optional-mark">İsteğe bağlı</span></span><input id="email" name="email" type="email" maxlength="160" autocomplete="email" placeholder="ornek@eposta.com"></label></div><label class="field"><span class="field-label">Ekler <span class="optional-mark">Her belgeyi ayrı satıra yazın</span></span><textarea id="attachments" name="attachments" maxlength="1000" placeholder="Karar örneği&#10;Ödeme belgesi&#10;Fotoğraf"></textarea></label></fieldset><div class="form-actions"><button class="btn primary" id="downloadWord" type="button">Word olarak indir (.doc)</button><button class="btn" id="printPetition" type="button">Yazdır / PDF kaydet</button><button class="btn" id="copyPetition" type="button">Metni kopyala</button><button class="btn" id="resetPetition" type="button">Formu temizle</button></div><p class="form-status" id="formStatus" role="status" aria-live="polite"></p></form><aside class="legal-card"><h2>Göndermeden önce</h2><ul class="legal-points"><li>Belgeyi okuyun; tarih, kurum, talep ve ekleri kontrol edin.</li><li>Çıktıyı ıslak imza veya başvuru kanalının kabul ettiği güvenli elektronik imza ile imzalayın.</li><li>Bu araç hukuki danışmanlık değildir; hak düşürücü veya itiraz süresi varsa ilgili güncel mevzuatı ayrıca kontrol edin.</li></ul><p style="margin-top:12px">Hukuki dayanak 21 Ağustos 2026 tarihinde kontrol edildi: 3071 sayılı Dilekçe Hakkının Kullanılmasına Dair Kanun’un 4. maddesi zorunlu alanları, 6. maddesi incelenemeyecek dilekçeleri, 7. maddesi idari makamların en geç 30 günlük cevap/prosedür bildirimini düzenler.</p><a href="https://www.mevzuat.gov.tr/MevzuatMetin/1.5.3071.pdf" target="_blank" rel="noopener noreferrer">3071 sayılı Kanun · Mevzuat Bilgi Sistemi ↗</a></aside></section><section class="petition-preview-column" aria-labelledby="previewHeading"><div class="preview-toolbar"><h2 id="previewHeading">Canlı dilekçe önizlemesi</h2><span>A4 düzeni</span></div><article class="petition-paper" aria-label="Oluşturulan dilekçe önizlemesi"><h2 class="paper-recipient preview-empty" id="previewRecipient">BAŞVURULACAK KURUM / MAKAM</h2><p class="paper-subject"><strong>Konu:</strong> <span class="preview-empty" id="previewSubject">Talebin kısa konusu</span></p><p class="paper-subject" id="previewReferenceRow" hidden><strong>İlgi:</strong> <span id="previewReference"></span></p><div class="paper-heading">AÇIKLAMALAR VE TALEP</div><div class="paper-body" id="previewBody"><p class="preview-empty">Talebiniz burada resmî dilekçe metni olarak görünecek.</p></div><p class="paper-closing">Yukarıda açıkladığım hususlar kapsamında talebimin değerlendirilerek gereğinin yapılmasını ve sonucunun tarafıma yazılı olarak bildirilmesini saygılarımla arz ederim.</p><div class="paper-signature"><div class="preview-empty" id="previewDate">Tarih</div><div class="preview-empty" id="previewName">Ad Soyad</div><div class="signature-space">İmza</div></div><div class="paper-contact"><div><strong>Adres:</strong> <span class="preview-empty" id="previewAddress">Tebligata elverişli iş veya ikametgâh adresi</span></div><div id="previewIdentityRow" hidden><strong>T.C. Kimlik No:</strong> <span id="previewIdentity"></span></div><div id="previewContactRow" hidden><strong>İletişim:</strong> <span id="previewContact"></span></div></div><div class="paper-attachments" id="previewAttachments" hidden><strong>Ekler:</strong><ol id="previewAttachmentList"></ol></div></article></section></div></main>${petitionScript}`,
    {
      canonical,
      styles: petitionStyles,
      jsonLd: [{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Ücretsiz Dilekçe Oluşturucu",
        applicationCategory: "GovernmentApplication",
        operatingSystem: "Web",
        url: canonical,
        offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" }
      }]
    }
  );
}
