// ===== Config =====
const WA_NUMBER = "17876643079"; // formato internacional: 1 + 787...
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const DEFAULT_QUOTE_MSG =
  "Hola OASIS 👋 Quiero cotizar un servicio. Tipo (ventana/mini split), BTU, marca, y ubicación:";

// ===== Helpers =====
function waLink(message) {
  const text = encodeURIComponent(message || DEFAULT_QUOTE_MSG);
  return `${WA_BASE}?text=${text}`;
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el) el.setAttribute("href", href);
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

  // cerrar menú al hacer click en un link
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
