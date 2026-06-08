const CONFIG = {
  phone: "17876643079",
  email: "contact@oasisservicespr.com",
  instagram: "https://www.instagram.com/oasis_services_llc/",
  reserve: "https://confirmafy.com/oasis-services-pr",
  whatsappMsg: "Hola Oasis Services. Necesito asistencia con un aire acondicionado. Nombre, pueblo, tipo de equipo y situación:",
  fullPay: {
    preventivo: "https://buy.stripe.com/bJe9AS5bE4uI4nYeWb1RC0e",
    profundo: "https://buy.stripe.com/8x26oG7jM4uI7Aa6pF1RC0b",
    diagnostico: "https://buy.stripe.com/fZueVc0VobXa6w6dS71RC0c",
    cotizacion: "https://buy.stripe.com/8x2dR87jMgdq3jU9BR1RC0d"
  }
};
const $ = (id) => document.getElementById(id);
const wa = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(CONFIG.whatsappMsg)}`;
function set(id, href){ const el=$(id); if(el) el.href=href; }
["navWhatsApp","footerWhatsApp","mobileWhatsApp"].forEach(id=>set(id,wa));
["heroReserve","cardReserve"].forEach(id=>set(id,CONFIG.reserve));
set("svcPreventivo", CONFIG.fullPay.preventivo);
set("svcProfundo", CONFIG.fullPay.profundo);
set("svcDiagnostico", CONFIG.fullPay.diagnostico);
set("svcCotizacion", CONFIG.fullPay.cotizacion);
set("igLink", CONFIG.instagram);
const y = $("year"); if(y) y.textContent = new Date().getFullYear();
