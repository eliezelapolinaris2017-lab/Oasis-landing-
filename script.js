const CONFIG = {
  stripeLink: "https://buy.stripe.com/aFa6oGeMe8KY2fQ6pF1RC09",
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

setHref("btnStripeTop", CONFIG.stripeLink);
setHref("btnStripeHero", CONFIG.stripeLink);
setHref("btnStripePolicy", CONFIG.stripeLink);

setHref("btnVideoHero", CONFIG.videoLink);
setHref("btnVideo2", CONFIG.videoLink);

$("waSupport")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });
$("waSupport2")?.addEventListener("click", (e)=>{ e.preventDefault(); openWA(); });

const y = $("year");
if(y) y.textContent = new Date().getFullYear();
