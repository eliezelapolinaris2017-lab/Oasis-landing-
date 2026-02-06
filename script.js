const CONFIG = {
  // Depósito (reserva)
  stripeReserve25: "https://buy.stripe.com/aFa6oGeMe8KY2fQ6pF1RC09",

  // Servicios pago completo (los 4 que me diste)
  stripePreventivo: "https://buy.stripe.com/cNi7sK33waT65s201h1RC0a",
  stripeProfundo:   "https://buy.stripe.com/8x26oG7jM4uI7Aa6pF1RC0b",
  stripeDiagnostico:"https://buy.stripe.com/fZueVc0VobXa6w6dS71RC0c",
  stripeCotizacion: "https://buy.stripe.com/8x2dR87jMgdq3jU9BR1RC0d",

  whatsappNumber: "17876643079",
  whatsappMsg: "Hola OASIS 👋 Tengo una pregunta. Área/BTU/Marca:",
  videoLink: "https://www.instagram.com/reel/DMREjmoPNvg/?igsh=ZmY3cGZ6cmhuMm9q"
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

// Reserva $25
setHref("btnStripeTop", CONFIG.stripeReserve25);
setHref("btnStripeHero", CONFIG.stripeReserve25);
setHref("btnStripePolicy", CONFIG.stripeReserve25);

// Video
setHref("btnVideoHero", CONFIG.videoLink);
setHref("btnVideo2", CONFIG.videoLink);

// WhatsApp
$("waSupport")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });
$("waSupport2")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });

// Servicios pago completo (derecha)
setHref("buyPreventivo", CONFIG.stripePreventivo);
setHref("buyProfundo", CONFIG.stripeProfundo);
setHref("buyDiagnostico", CONFIG.stripeDiagnostico);
setHref("buyCotizacion", CONFIG.stripeCotizacion);

// Año
const y = $("year");
if(y) y.textContent = new Date().getFullYear();
