const CONFIG = {
  stripeDeposit: "https://buy.stripe.com/aFa6oGeMe8KY2fQ6pF1RC09",
  whatsappNumber: "17876643079",
  whatsappMsg: "Hola OASIS 👋 Tengo una pregunta antes de reservar. Área/BTU/Marca:",
  videoLink: "https://www.instagram.com/reel/DMREjmoPNvg/?igsh=ZmY3cGZ6cmhuMm9q",

  // pago completo (4 enlaces)
  fullPay: {
    preventivo: "https://buy.stripe.com/bJe9AS5bE4uI4nYeWb1RC0e",
    profundo:   "https://buy.stripe.com/8x26oG7jM4uI7Aa6pF1RC0b",
    diagnostico:"https://buy.stripe.com/fZueVc0VobXa6w6dS71RC0c",
    cotizacion: "https://buy.stripe.com/8x2dR87jMgdq3jU9BR1RC0d"
  }
};

const $ = (id)=>document.getElementById(id);

function openWA(msg){
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg || CONFIG.whatsappMsg)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function setHref(id, href){
  const el = $(id);
  if(el) el.setAttribute("href", href);
}

// depósito $25
setHref("btnStripeTop", CONFIG.stripeDeposit);
setHref("btnStripeHero", CONFIG.stripeDeposit);
setHref("btnStripePolicy", CONFIG.stripeDeposit);

// video
setHref("btnVideoHero", CONFIG.videoLink);
setHref("btnVideo2", CONFIG.videoLink);

// WhatsApp
$("waSupport")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });
$("waSupport2")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });
$("waSupportSide")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });

// pago completo
setHref("svcPreventivo", CONFIG.fullPay.preventivo);
setHref("svcProfundo",   CONFIG.fullPay.profundo);
setHref("svcDiagnostico",CONFIG.fullPay.diagnostico);
setHref("svcCotizacion", CONFIG.fullPay.cotizacion);

// year
const y = $("year");
if(y) y.textContent = new Date().getFullYear();
