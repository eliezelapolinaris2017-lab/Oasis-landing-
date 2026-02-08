"use strict";

/* ===== CONFIG REAL ===== */
const CONFIG = {
  stripeDeposit: "https://buy.stripe.com/aFa6oGeMe8KY2fQ6pF1RC09",
  whatsappNumber: "17876643079",
  whatsappMsg: "Hola OASIS 👋 Tengo una pregunta antes de reservar. Área/BTU/Marca:",
  videoLink: "https://www.instagram.com/reel/DMREjmoPNvg/?igsh=ZmY3cGZ6cmhuMm9q",
  instagramUrl: "https://www.instagram.com/oasis_services_llc?igsh=MW1tYm5pampmaXZ5bg%3D%3D&utm_source=qr",

  fullPay: {
    preventivo: "https://buy.stripe.com/bJe9AS5bE4uI4nYeWb1RC0e",
    profundo:   "https://buy.stripe.com/8x26oG7jM4uI7Aa6pF1RC0b",
    diagnostico:"https://buy.stripe.com/fZueVc0VobXa6w6dS71RC0c",
    cotizacion: "https://buy.stripe.com/8x2dR87jMgdq3jU9BR1RC0d"
  }
};

const $ = (id) => document.getElementById(id);

function buildWhatsAppLink(customMsg){
  const msg = encodeURIComponent(customMsg || CONFIG.whatsappMsg);
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;
}

function setHref(id, url){
  const el = $(id);
  if (!el) return;
  el.href = url;
}

/* ===== INIT LINKS ===== */
function initLinks(){
  const y = $("year");
  if (y) y.textContent = new Date().getFullYear();

  setHref("topPhone", "tel:+17876643079");
  setHref("topEmail", "mailto:contact@oasisservicespr.com");

  setHref("igTop", CONFIG.instagramUrl);
  setHref("igLink", CONFIG.instagramUrl);
  setHref("igFinal", CONFIG.instagramUrl);

  setHref("waTop", buildWhatsAppLink());
  setHref("waSupport", buildWhatsAppLink());
  setHref("waSupport2", buildWhatsAppLink());
  setHref("waSupport3", buildWhatsAppLink());
  setHref("waSupport4", buildWhatsAppLink());
  setHref("waFinal", buildWhatsAppLink());

  setHref("btnVideoHero", CONFIG.videoLink);
  setHref("btnVideo2", CONFIG.videoLink);

  setHref("btnStripeHero", CONFIG.stripeDeposit);
  setHref("btnStripeFinal", CONFIG.stripeDeposit);

  setHref("svcPreventivo", CONFIG.fullPay.preventivo);
  setHref("svcProfundo", CONFIG.fullPay.profundo);
  setHref("svcDiagnostico", CONFIG.fullPay.diagnostico);
  setHref("svcCotizacion", CONFIG.fullPay.cotizacion);
}

/* ===== SLIDER HORIZONTAL ===== */
const slidesEl = $("slides");
const deckEl = $("deck");
const dotsEl = $("dots");
const navLinks = document.querySelectorAll("[data-goto]");
const arrows = document.querySelectorAll(".arrow");

let index = 0;
let total = 0;

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function goTo(i){
  if (!slidesEl) return;
  total = slidesEl.children.length;
  index = clamp(i, 0, total - 1);

  slidesEl.style.transform = `translateX(-${index * 100}vw)`;
  updateDots();
  updateNavActive();
}

function next(){ goTo(index + 1); }
function prev(){ goTo(index - 1); }

function updateDots(){
  if (!dotsEl) return;
  const btns = dotsEl.querySelectorAll(".dotBtn");
  btns.forEach((b, i) => b.classList.toggle("is-active", i === index));
}

function updateNavActive(){
  navLinks.forEach(a => {
    const i = Number(a.dataset.goto);
    a.style.opacity = (i === index) ? "1" : ".85";
  });
}

function buildDots(){
  if (!dotsEl || !slidesEl) return;
  total = slidesEl.children.length;
  dotsEl.innerHTML = "";
  for (let i=0; i<total; i++){
    const b = document.createElement("button");
    b.className = "dotBtn" + (i===0 ? " is-active" : "");
    b.type = "button";
    b.ariaLabel = `Ir al slide ${i+1}`;
    b.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(b);
  }
}

function bindNav(){
  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      goTo(Number(a.dataset.goto));
    });
  });

  arrows.forEach(btn => {
    btn.addEventListener("click", () => {
      const dir = Number(btn.dataset.dir || "0");
      if (dir > 0) next();
      if (dir < 0) prev();
    });
  });
}

/* Wheel -> horizontal */
let wheelLock = false;
function bindWheel(){
  if (!deckEl) return;

  deckEl.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (wheelLock) return;

    wheelLock = true;
    const delta = e.deltaY || e.deltaX;
    if (delta > 20) next();
    else if (delta < -20) prev();

    setTimeout(() => wheelLock = false, 380);
  }, { passive: false });
}

/* Touch swipe */
function bindTouch(){
  if (!deckEl) return;

  let startX = 0;
  let startY = 0;
  let moved = false;

  deckEl.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    moved = false;
  }, { passive: true });

  deckEl.addEventListener("touchmove", () => { moved = true; }, { passive: true });

  deckEl.addEventListener("touchend", (e) => {
    if (!moved) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40){
      if (dx < 0) next();
      else prev();
    }
  }, { passive: true });
}

/* Keyboard */
function bindKeys(){
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
}

function init(){
  initLinks();
  buildDots();
  bindNav();
  bindWheel();
  bindTouch();
  bindKeys();
  goTo(0);
}

document.addEventListener("DOMContentLoaded", init);
