/* =========================================================
   OASIS — script.js (Slider + links 100% conectados)
========================================================= */

const CONFIG = {
  stripeDeposit: "https://buy.stripe.com/aFa6oGeMe8KY2fQ6pF1RC09",
  whatsappNumber: "17876643079",
  whatsappMsg: "Hola OASIS 👋 Tengo una pregunta antes de reservar. Área/BTU/Marca:",
  videoLink: "https://www.instagram.com/reel/DMREjmoPNvg/?igsh=ZmY3cGZ6cmhuMm9q",
  instagram: "https://www.instagram.com/oasis_services_llc?igsh=MW1tYm5pampmaXZ5bg%3D%3D&utm_source=qr",

  fullPay: {
    preventivo: "https://buy.stripe.com/bJe9AS5bE4uI4nYeWb1RC0e",
    profundo:   "https://buy.stripe.com/8x26oG7jM4uI7Aa6pF1RC0b",
    diagnostico:"https://buy.stripe.com/fZueVc0VobXa6w6dS71RC0c",
    cotizacion: "https://buy.stripe.com/8x2dR87jMgdq3jU9BR1RC0d"
  }
};

(function () {
  "use strict";

  const slides = document.getElementById("slides");
  const slideEls = Array.from(document.querySelectorAll(".slide"));

  const $ = (id) => document.getElementById(id);

  const setHref = (id, url) => {
    const el = $(id);
    if (!el) return;
    if (!url) return;
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

  const goToSlide = (index) => {
    if (!slides) return;
    const clamped = Math.max(0, Math.min(slideEls.length - 1, index));
    slideEls[clamped].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const getCurrentIndex = () => {
    if (!slides) return 0;
    const x = slides.scrollLeft;
    const w = window.innerWidth || 1;
    return Math.round(x / w);
  };

  function initLinks() {
    // Año
    const year = $("year");
    if (year) year.textContent = String(new Date().getFullYear());

    // Stripe depósito (botones)
    ["btnStripeTop","btnStripeHero","btnStripeHero2","btnStripePolicy"].forEach(id => {
      setHref(id, CONFIG.stripeDeposit);
      setBlank(id);
    });

    // Video
    ["btnVideoHero","btnVideoHero2","btnVideo2"].forEach(id => {
      setHref(id, CONFIG.videoLink);
      setBlank(id);
    });

    // WhatsApp
    setWA("waTop", CONFIG.whatsappMsg);
    setWA("waSupport", CONFIG.whatsappMsg);
    setWA("waSupport2", CONFIG.whatsappMsg);
    setWA("waSupportSide", "Hola OASIS 👋 Quiero confirmar disponibilidad antes de reservar.");
    setWA("waSupportPolicy", CONFIG.whatsappMsg);

    // Instagram
    ["igTop","igHero"].forEach(id => {
      setHref(id, CONFIG.instagram);
      setBlank(id);
    });

    // Tel/Email (estéticos + funcionales)
    const tel = $("telTop");
    if (tel) tel.setAttribute("href", "tel:+17876643079");

    const email = $("emailTop");
    if (email) email.setAttribute("href", "mailto:contact@oasisservicespr.com");

    // Servicios pago completo
    setHref("svcPreventivo", CONFIG.fullPay.preventivo); setBlank("svcPreventivo");
    setHref("svcProfundo", CONFIG.fullPay.profundo);     setBlank("svcProfundo");
    setHref("svcDiagnostico", CONFIG.fullPay.diagnostico); setBlank("svcDiagnostico");
    setHref("svcCotizacion", CONFIG.fullPay.cotizacion); setBlank("svcCotizacion");
  }

  function initSliderControls() {
    // Nav botones
    document.querySelectorAll("[data-goto]").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-goto");
        const target = document.getElementById(targetId);
        if (target) target.scrollIntoView({behavior:"smooth", inline:"start", block:"nearest"});
      });
    });

    // Flechas
    document.querySelectorAll(".arrow[data-dir]").forEach(btn => {
      btn.addEventListener("click", () => {
        const dir = Number(btn.getAttribute("data-dir")) || 0;
        const idx = getCurrentIndex();
        goToSlide(idx + dir);
      });
    });

    // Wheel => scroll horizontal (desktop)
    if (slides) {
      slides.addEventListener("wheel", (e) => {
        // Si el usuario está en móvil/trackpad natural, esto ayuda igual
        e.preventDefault();
        slides.scrollLeft += (e.deltaY || e.deltaX);
      }, { passive: false });
    }

    // Teclas
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") goToSlide(getCurrentIndex() + 1);
      if (e.key === "ArrowLeft") goToSlide(getCurrentIndex() - 1);
    });
  }

  function boot() {
    initLinks();
    initSliderControls();

    // Debug visible (por si vuelve a pasar “no funciona nada”)
    // Si esto no imprime en consola => tu script NO está cargando.
    console.log("[OASIS] script.js cargado OK ✅");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
