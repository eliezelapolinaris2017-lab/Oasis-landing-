const phone = '17876643079';
const msg = encodeURIComponent('Hola Oasis Services. Necesito coordinar un servicio de aire acondicionado.');
const wa = `https://wa.me/${phone}?text=${msg}`;
['waHero','waFinal'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = wa;
});
