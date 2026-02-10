const CONFIG = {
  stripeDeposit: "https://buy.stripe.com/aFa6oGeMe8KY2fQ6pF1RC09",
  athPay: "https://pagos.athmovilapp.com/pagoPorCodigo.html?id=c7995d4c-9a1c-4ab9-8ca9-2561c76b6fc8",

  whatsappNumber: "17876643079",
  whatsappMsg: "Hola OASIS 👋 Tengo una pregunta antes de reservar. Área/BTU/Marca:",
  instagramUrl: "https://www.instagram.com/oasis_services_llc/",
  videoLink: "https://www.instagram.com/reel/DMREjmoPNvg/?igsh=ZmY3cGZ6cmhuMm9q",

  fullPay: {
    preventivo: "https://buy.stripe.com/bJe9AS5bE4uI4nYeWb1RC0e",
    profundo:   "https://buy.stripe.com/8x26oG7jM4uI7Aa6pF1RC0b",
    diagnostico:"https://buy.stripe.com/fZueVc0VobXa6w6dS71RC0c",
    cotizacion: "https://buy.stripe.com/8x2dR87jMgdq3jU9BR1RC0d"
  }
};

function $(id){ return document.getElementById(id); }

function waLink(msg){
  const text = encodeURIComponent(msg || "");
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
}

function setHref(id, url){
  const el = $(id);
  if (!el) return;
  el.href = url;
}

function initLinks(){
  // depósito
  setHref("btnStripeHero", CONFIG.stripeDeposit);
  setHref("btnStripeFinal", CONFIG.stripeDeposit);

  // ATH
  setHref("btnAthHero", CONFIG.athPay);
  setHref("btnAthFinal", CONFIG.athPay);

  // full pay
  setHref("svcPreventivo", CONFIG.fullPay.preventivo);
  setHref("svcProfundo", CONFIG.fullPay.profundo);
  setHref("svcDiagnostico", CONFIG.fullPay.diagnostico);
  setHref("svcCotizacion", CONFIG.fullPay.cotizacion);

  // WhatsApp
  const wa = waLink(CONFIG.whatsappMsg);
  ["waTop","waSupport","waSupport2","waSupport3","waSupport4","waFinal"].forEach(id => setHref(id, wa));

  // Instagram / video
  ["igTop","igLink","igFinal"].forEach(id => setHref(id, CONFIG.instagramUrl));
  setHref("btnVideoHero", CONFIG.videoLink);
  setHref("btnVideo2", CONFIG.videoLink);

  // phone/email
  setHref("topPhone", "tel:+17876643079");
  setHref("topEmail", "mailto:contact@oasisservicespr.com");

  // year
  const y = $("year");
  if (y) y.textContent = new Date().getFullYear();
}

function initSlider(){
  const slidesEl = $("slides");
  const slideEls = Array.from(document.querySelectorAll(".slide"));
  const dotsEl = $("dots");
  const navLinks = Array.from(document.querySelectorAll("[data-goto]"));
  const arrows = Array.from(document.querySelectorAll(".arrow"));

  let i = 0;
  const max = slideEls.length;

  // dots
  dotsEl.innerHTML = "";
  const dots = slideEls.map((_, idx) => {
    const b = document.createElement("button");
    b.className = "dotBtn" + (idx===0 ? " is-active" : "");
    b.type = "button";
    b.addEventListener("click", () => go(idx));
    dotsEl.appendChild(b);
    return b;
  });

  function paint(){
    slidesEl.style.transform = `translate3d(${-i * 100}vw,0,0)`;
    dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));
    navLinks.forEach(a => a.classList.toggle("is-active", Number(a.dataset.goto) === i));
    history.replaceState(null, "", `#slide-${i+1}`);
  }

  function go(next){
    i = Math.max(0, Math.min(max - 1, next));
    paint();
  }

  // nav clicks
  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      go(Number(a.dataset.goto));
    });
  });

  // arrows
  arrows.forEach(btn => {
    btn.addEventListener("click", () => {
      const dir = Number(btn.dataset.dir || "0");
      go(i + dir);
    });
  });

  // swipe (touch)
  let startX = 0, lastX = 0, isDown = false;

  slidesEl.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].clientX;
    lastX = startX;
  }, {passive:true});

  slidesEl.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    lastX = e.touches[0].clientX;
  }, {passive:true});

  slidesEl.addEventListener("touchend", () => {
    if (!isDown) return;
    const dx = lastX - startX;
    isDown = false;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) go(i + 1);
    else go(i - 1);
  });

  // wheel horizontal on desktop (optional nice)
  let wheelLock = false;
  window.addEventListener("wheel", (e) => {
    if (wheelLock) return;
    if (Math.abs(e.deltaY) < 10) return;
    wheelLock = true;
    setTimeout(()=>wheelLock=false, 350);
    if (e.deltaY > 0) go(i + 1);
    else go(i - 1);
  }, {passive:true});

  // hash start
  const m = (location.hash || "").match(/#slide-(\d+)/);
  if (m) go(Number(m[1]) - 1);
  else paint();
}

document.addEventListener("DOMContentLoaded", () => {
  initLinks();
  initSlider();
});
