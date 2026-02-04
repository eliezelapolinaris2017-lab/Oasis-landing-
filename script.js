// ================== CONFIG ==================
const WA_NUMBER = "17876643079";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

const STRIPE_DEPOSIT_URL = "https://buy.stripe.com/6oU28q5bE0esf2C29p1RC07";
const CONFIRMAFY_URL = "https://confirmafy.com/oasis-services-pr";

// ================== HELPERS ==================
function waLink(message) {
  const text = encodeURIComponent(message || "");
  return `${WA_BASE}?text=${text}`;
}
function openWA(message) {
  window.open(waLink(message), "_blank", "noopener,noreferrer");
}
function open(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// ================== YEAR ==================
document.getElementById("year").textContent = new Date().getFullYear();

// ================== BUTTONS ==================
const btnPagarTop = document.getElementById("btnPagarTop");
const btnPagar = document.getElementById("btnPagar");
const btnPagar2 = document.getElementById("btnPagar2");

btnPagarTop?.addEventListener("click", (e) => { e.preventDefault(); open(STRIPE_DEPOSIT_URL); });
btnPagar?.addEventListener("click", (e) => { e.preventDefault(); open(STRIPE_DEPOSIT_URL); });
btnPagar2?.addEventListener("click", (e) => { e.preventDefault(); open(STRIPE_DEPOSIT_URL); });

document.getElementById("btnWhatsAppTop")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA("Hola OASIS 👋 Quiero información y cotizar un servicio. Tipo, BTU, marca y dirección:");
});
document.getElementById("btnWhatsApp")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA("Hola OASIS 👋 Quiero cotizar un servicio. Tipo (ventana/mini split), BTU, marca y ubicación:");
});

document.getElementById("btnWAagenda")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA("Hola OASIS 👋 Quiero agendar cita. Ya pagué el depósito de $25. Nombre, dirección y disponibilidad:");
});

// ================== GATE (DESBLOQUEO LINK) ==================
const chkAcepto = document.getElementById("chkAcepto");
const payRef = document.getElementById("payRef");
const btnUnlock = document.getElementById("btnUnlock");
const btnAgenda = document.getElementById("btnAgenda");

function setUnlocked() {
  localStorage.setItem("oasis.deposit.ok", "1");
  localStorage.setItem("oasis.deposit.ref", (payRef?.value || "").trim());

  btnAgenda.href = CONFIRMAFY_URL;
  btnAgenda.hidden = false;

  btnAgenda.scrollIntoView({ behavior: "smooth", block: "center" });
}

function isUnlocked() {
  return localStorage.getItem("oasis.deposit.ok") === "1";
}

btnUnlock?.addEventListener("click", () => {
  if (!chkAcepto?.checked) {
    alert("Para habilitar el enlace, confirma que pagaste el depósito y acepta la política.");
    return;
  }
  setUnlocked();
});

// persistencia si ya lo desbloqueó antes
window.addEventListener("DOMContentLoaded", () => {
  if (isUnlocked()) {
    btnAgenda.href = CONFIRMAFY_URL;
    btnAgenda.hidden = false;
  }
});
