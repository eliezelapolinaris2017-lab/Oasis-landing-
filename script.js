const CONFIG = {
  // Depósito (para “Reservar $25”)
  stripeDepositLink: "https://buy.stripe.com/aFa6oGeMe8KY2fQ6pF1RC09",

  // Pago completo (servicios)
  stripePreventivo: "https://buy.stripe.com/cNi7sK33waT65s201h1RC0a",
  stripeProfundo:   "https://buy.stripe.com/8x26oG7jM4uI7Aa6pF1RC0b",
  stripeDiag:       "https://buy.stripe.com/fZueVc0VobXa6w6dS71RC0c",
  stripeCotiza:     "https://buy.stripe.com/8x2dR87jMgdq3jU9BR1RC0d",

  // WhatsApp + video
  whatsappNumber: "17876643079",
  whatsappMsg: "Hola OASIS 👋 Tengo una pregunta antes de reservar. Área/BTU/Marca:",
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

// Depósito
setHref("btnStripeTop", CONFIG.stripeDepositLink);
setHref("btnStripeHero", CONFIG.stripeDepositLink);
setHref("btnStripePolicy", CONFIG.stripeDepositLink);

// Video
setHref("btnVideoHero", CONFIG.videoLink);
setHref("btnVideo2", CONFIG.videoLink);

// Panel pago completo
setHref("payPreventivo", CONFIG.stripePreventivo);
setHref("payProfundo", CONFIG.stripeProfundo);
setHref("payDiag", CONFIG.stripeDiag);
setHref("payCotiza", CONFIG.stripeCotiza);

// WhatsApp
$("waSupport")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });
$("waSupport2")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });

// Año
const y = $("year");
if(y) y.textContent = new Date().getFullYear();
