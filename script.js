const CONFIG = {
  // Depósito (reserva)
  stripeDepositLink: "https://buy.stripe.com/aFa6oGeMe8KY2fQ6pF1RC09",

  // Servicios (pago completo)
  services: {
    preventivo: "https://buy.stripe.com/cNi7sK33waT65s201h1RC0a",
    profundo:   "https://buy.stripe.com/8x26oG7jM4uI7Aa6pF1RC0b",
    diagnostico:"https://buy.stripe.com/fZueVc0VobXa6w6dS71RC0c",
    cotizacion: "https://buy.stripe.com/8x2dR87jMgdq3jU9BR1RC0d",
  },

  // Contacto
  whatsappNumber: "17876643079",
  whatsappMsg: "Hola OASIS 👋 Tengo una pregunta antes de reservar. Área / BTU / Marca:",

  // Prueba social
  videoLink: "https://www.instagram.com/reel/DMREjmoPNvg/?igsh=ZmY3cGZ6cmhuMm9q"
};

const $ = (id) => document.getElementById(id);

function setHref(id, href){
  const el = $(id);
  if(el) el.setAttribute("href", href);
}

function openWA(msg){
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg || CONFIG.whatsappMsg)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* Depósito */
setHref("btnStripeTop", CONFIG.stripeDepositLink);
setHref("btnStripeHero", CONFIG.stripeDepositLink);
setHref("btnStripePolicy", CONFIG.stripeDepositLink);

/* Video */
setHref("btnVideoHero", CONFIG.videoLink);
setHref("btnVideo2", CONFIG.videoLink);

/* WhatsApp */
$("waSupport")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });
$("waSupport2")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });
$("waSupportSide")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA("Hola OASIS 👋 Estoy viendo los servicios de pago completo. Necesito ayuda con:"); });

/* Servicios pago completo */
setHref("svcPreventivo", CONFIG.services.preventivo);
setHref("svcProfundo", CONFIG.services.profundo);
setHref("svcDiagnostico", CONFIG.services.diagnostico);
setHref("svcCotizacion", CONFIG.services.cotizacion);

/* Año footer */
const y = $("year");
if(y) y.textContent = new Date().getFullYear();
