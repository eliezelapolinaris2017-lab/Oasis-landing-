/* =========================================================
   OASIS — script.js (PRO, sin romper tu layout)
   Usa CONFIG tal cual lo enviaste
========================================================= */

const CONFIG = {
  stripeDeposit: "https://buy.stripe.com/aFa6oGeMe8KY2fQ6pF1RC09",
  whatsappNumber: "17876643079",
  whatsappMsg: "Hola OASIS 👋 Tengo una pregunta antes de reservar. Área/BTU/Marca:",
  videoLink: "https://www.instagram.com/reel/DMREjmoPNvg/?igsh=ZmY3cGZ6cmhuMm9q",

  // pago completo (4 enlaces)
  fullPay: {
    preventivo: "https://buy.stripe.com/bJe9AS5bE4uI4nYeWb1RC0e",
    profundo:   "https://buy.stripe.com/8x26oG7jM4uI7Aa6pF1RC0b",
    diagnostico:"https://buy.stripe.com/fZueVc0VobXa6w6dS71RC0c",
    cotizacion: "https://buy.stripe.com/8x2dR87jMgdq3jU9BR1RC0d"
  }
};

(() => {
  "use strict";

  // ===== helpers =====
  const $ = (id) => document.getElementById(id);

  const setHref = (id, url) => {
    const el = $(id);
    if (!el || !url) return;
    el.setAttribute("href", url);
  };

  const setBlank = (id) => {
    const el = $(id);
    if (!el) return;
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  };

  const waUrl = (msg) => {
    const text = encodeURIComponent(msg || CONFIG.whatsappMsg || "Hola");
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  };

  const setWA = (id, msg) => {
    const el = $(id);
    if (!el) return;
    el.setAttribute("href", waUrl(msg));
    setBlank(id);
  };

  function init() {
    // Año footer
    const year = $("year");
    if (year) year.textContent = String(new Date().getFullYear());

    // ===== Depósito Stripe ($25) =====
    setHref("btnStripeTop", CONFIG.stripeDeposit);
    setBlank("btnStripeTop");

    setHref("btnStripeHero", CONFIG.stripeDeposit);
    setBlank("btnStripeHero");

    setHref("btnStripePolicy", CONFIG.stripeDeposit);
    setBlank("btnStripePolicy");

    // ===== Video =====
    setHref("btnVideoHero", CONFIG.videoLink);
    setBlank("btnVideoHero");

    setHref("btnVideo2", CONFIG.videoLink);
    setBlank("btnVideo2");

    // ===== WhatsApp (soporte) =====
    setWA("waSupport", CONFIG.whatsappMsg);
    setWA("waSupportSide", "Hola OASIS 👋 Tengo dudas. Quiero reservar y confirmar disponibilidad.");
    setWA("waSupport2", CONFIG.whatsappMsg);

    // ===== Pago completo (Servicios en la tarjeta derecha) =====
    setHref("svcPreventivo", CONFIG.fullPay.preventivo);
    setBlank("svcPreventivo");

    setHref("svcProfundo", CONFIG.fullPay.profundo);
    setBlank("svcProfundo");

    setHref("svcDiagnostico", CONFIG.fullPay.diagnostico);
    setBlank("svcDiagnostico");

    setHref("svcCotizacion", CONFIG.fullPay.cotizacion);
    setBlank("svcCotizacion");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
