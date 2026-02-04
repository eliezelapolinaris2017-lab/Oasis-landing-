const WA_NUMBER = "17876643079";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

function openWA(message) {
  const url = `${WA_BASE}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("waSupport")?.addEventListener("click", (e)=>{
  e.preventDefault();
  openWA("Hola OASIS 👋 Tengo una pregunta antes de reservar.");
});
