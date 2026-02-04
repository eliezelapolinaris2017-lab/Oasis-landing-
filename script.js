// ===== Config =====
const WA_NUMBER = "17876643079"; // formato internacional: 1 + 787...
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const DEFAULT_QUOTE_MSG =
  "Hola OASIS 👋 Quiero cotizar un servicio. Tipo (ventana/mini split), BTU, marca, y ubicación:";

// ✅ Depósito: pon tu link real si lo tienes (Stripe/Square/PayPal/ATH link)
const DEPOSIT_PAY_URL = "#"; // <-- CAMBIA ESTO cuando tengas el link

// ===== Helpers =====
function waLink(message) {
  const text = encodeURIComponent(message || DEFAULT_QUOTE_MSG);
  return `${WA_BASE}?text=${text}`;
}
function openWA(message) {
  window.open(waLink(message), "_blank", "noopener,noreferrer");
}

// ===== Scroll progress bar =====
const scrollProgress = document.getElementById("scrollProgress");
function updateProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = height > 0 ? (scrollTop / height) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = `${pct}%`;
}
window.addEventListener("scroll", updateProgress);
updateProgress();

// ===== Year =====
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// ===== Mobile menu =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== WhatsApp buttons =====
document.getElementById("btnCotizarTop")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA(DEFAULT_QUOTE_MSG);
});

document.getElementById("btnCotizarServicios")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA("Hola OASIS 👋 Quiero cotizar un servicio (mantenimiento/instalación/reparación/contrato). Detalles:");
});

document.getElementById("btnCotizarBanner")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA(DEFAULT_QUOTE_MSG);
});

document.getElementById("btnCotizarFooter")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA(DEFAULT_QUOTE_MSG);
});

document.getElementById("waFloat")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA("Hola OASIS 👋 Estoy en la página y quiero información.");
});

// Links internos “Pedir por WhatsApp →”
document.querySelectorAll("[data-wa]").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const msg = el.getAttribute("data-wa") || DEFAULT_QUOTE_MSG;
    openWA(msg);
  });
});

// ===== Contact form actions =====
document.getElementById("btnSendWhatsApp")?.addEventListener("click", () => {
  const msg = document.getElementById("waMessage")?.value?.trim();
  openWA(msg || DEFAULT_QUOTE_MSG);
});

document.getElementById("btnWhatsAppQuote")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA(DEFAULT_QUOTE_MSG);
});

// Mailto (sin backend)
const btnMailTo = document.getElementById("btnMailTo");
if (btnMailTo) {
  btnMailTo.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("mailName")?.value?.trim() || "";
    const from = document.getElementById("mailFrom")?.value?.trim() || "";
    const body = document.getElementById("mailBody")?.value?.trim() || "";

    const subject = encodeURIComponent(`Solicitud de información - OASIS (${name || "Cliente"})`);
    const message = encodeURIComponent(
      `Nombre: ${name}\nCorreo: ${from}\n\nMensaje:\n${body}\n`
    );

    // IMPORTANTE: cambia el correo destino aquí
    const TO_EMAIL = "tucorreo@dominio.com";
    window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${message}`;
  });
}

// ==============================
// GATE DEPÓSITO → CONFIRMAFY
// ==============================
const btnPagarDeposito = document.getElementById("btnPagarDeposito");
const btnYaPague = document.getElementById("btnYaPague");
const btnUnlockAgenda = document.getElementById("btnUnlockAgenda");
const agendaIframeWrap = document.getElementById("agendaIframeWrap");
const agendaOpenRow = document.getElementById("agendaOpenRow");
const chkAcepto = document.getElementById("chkAcepto");
const payRef = document.getElementById("payRef");

function unlockAgenda() {
  localStorage.setItem("oasis.deposit.ok", "1");
  localStorage.setItem("oasis.deposit.ref", (payRef?.value || "").trim());

  if (agendaIframeWrap) agendaIframeWrap.hidden = false;
  if (agendaOpenRow) agendaOpenRow.hidden = false;

  agendaIframeWrap?.scrollIntoView({ behavior: "smooth", block: "start" });
}
function isUnlocked() {
  return localStorage.getItem("oasis.deposit.ok") === "1";
}

// pagar
btnPagarDeposito?.addEventListener("click", (e) => {
  e.preventDefault();

  // Si no has puesto link, cobramos por WhatsApp (operacional inmediato)
  if (!DEPOSIT_PAY_URL || DEPOSIT_PAY_URL === "#") {
    openWA("Hola OASIS 👋 Quiero confirmar mi cita. Necesito el enlace para pagar el depósito de $25. Nombre y dirección:");
    return;
  }

  window.open(DEPOSIT_PAY_URL, "_blank", "noopener,noreferrer");
});

// Ya pagué
btnYaPague?.addEventListener("click", () => {
  payRef?.focus();
});

// Desbloquear
btnUnlockAgenda?.addEventListener("click", () => {
  if (!chkAcepto?.checked) {
    alert("Para continuar debes aceptar la política del depósito y confirmar el pago.");
    return;
  }
  unlockAgenda();
});

// si ya estaba desbloqueado
window.addEventListener("DOMContentLoaded", () => {
  if (isUnlocked()) {
    if (agendaIframeWrap) agendaIframeWrap.hidden = false;
    if (agendaOpenRow) agendaOpenRow.hidden = false;
  }
});

// Agendar por WhatsApp (en agenda)
document.getElementById("btnAgendaWhatsApp")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWA("Hola OASIS 👋 Quiero agendar cita. Ya pagué el depósito de $25. Nombre, dirección y disponibilidad:");
});
