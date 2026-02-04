const WA_NUMBER = "17876643079";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

function waLink(message) {
  return `${WA_BASE}?text=${encodeURIComponent(message || "")}`;
}
function openWA(message) {
  window.open(waLink(message), "_blank", "noopener,noreferrer");
}

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("btnWhatsAppTop")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA("Hola OASIS 👋 Quiero cotizar un servicio. Tipo (ventana/mini split), BTU, marca y dirección:");
});

document.getElementById("btnWhatsApp")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA("Hola OASIS 👋 Quiero cotizar un servicio. Tipo (ventana/mini split), BTU, marca y ubicación:");
});

document.getElementById("btnWAQuick")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA("Hola OASIS 👋 Necesito orientación rápida. Envío tipo de equipo, BTU (si lo conozco) y ubicación:");
});
