const CONFIG = {
  // Depósito $25 (Stripe -> abre agenda automáticamente)
  stripeDeposit: "https://buy.stripe.com/aFa6oGeMe8KY2fQ6pF1RC09",

  // Pago completo (Stripe -> abre agenda automáticamente)
  stripeServices: {
    preventivo: "https://buy.stripe.com/cNi7sK33waT65s201h1RC0a",
    profundo:   "https://buy.stripe.com/8x26oG7jM4uI7Aa6pF1RC0b",
    diagnostico:"https://buy.stripe.com/fZueVc0VobXa6w6dS71RC0c",
    cotizacion: "https://buy.stripe.com/8x2dR87jMgdq3jU9BR1RC0d"
  },

  whatsappNumber: "17876643079",
  whatsappMsg: "Hola OASIS 👋 Tengo una pregunta antes de reservar. Área/BTU/Marca:",
  videoLink: "https://www.instagram.com/reel/DMREjmoPNvg/?igsh=ZmY3cGZ6cmhuMm9q"
};

const $ = (id)=>document.getElementById(id);

function waUrl(msg){
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg || CONFIG.whatsappMsg)}`;
}
function openWA(msg){
  window.open(waUrl(msg), "_blank", "noopener,noreferrer");
}
function setHref(id, href){
  const el = $(id);
  if(el) el.setAttribute("href", href);
}

// ===== Depósito $25 =====
setHref("btnStripeTop", CONFIG.stripeDeposit);
setHref("btnStripeHero", CONFIG.stripeDeposit);
setHref("btnStripePolicy", CONFIG.stripeDeposit);

// ===== Video =====
setHref("btnVideoHero", CONFIG.videoLink);
setHref("btnVideo2", CONFIG.videoLink);

// ===== Pago completo (panel derecho) =====
setHref("svcPreventivo", CONFIG.stripeServices.preventivo);
setHref("svcProfundo",   CONFIG.stripeServices.profundo);
setHref("svcDiagnostico",CONFIG.stripeServices.diagnostico);
setHref("svcCotizacion", CONFIG.stripeServices.cotizacion);

// ===== WhatsApp links =====
$("waSupport")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });
$("waSupport2")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });
$("waSupportSide")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });

// ===== Year =====
const y = $("year");
if(y) y.textContent = new Date().getFullYear();
