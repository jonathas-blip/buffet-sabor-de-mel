// ---------- Menu mobile ----------
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('site-nav');
if (menuButton && navigation) {
  const setMenu = open => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    navigation.classList.toggle('open', open);
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
}

// ---------- Cardápio em abas ----------
const tabs = [...document.querySelectorAll('.tabs [role="tab"]')];
const selectTab = tab => {
  tabs.forEach(t => {
    const active = t === tab;
    t.setAttribute('aria-selected', String(active));
    t.tabIndex = active ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
  });
};
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    selectTab(next);
    next.focus();
  });
});
// Links que abrem uma aba específica (ex.: "Ver barracas juninas")
document.querySelectorAll('[data-tab]').forEach(link => link.addEventListener('click', () => {
  const tab = document.getElementById('b-' + link.dataset.tab);
  if (tab) selectTab(tab);
}));

// ---------- Galeria ----------
// Somente fotos reais de eventos do buffet (já recortadas e tratadas em assets/fotos)
const galleryFiles = [
  ['barraca-atendimento.jpg', 'Atendente preparando lanches na barraquinha do Buffet Sabor de Mel'],
  ['mini-hamburguer.jpg', 'Mini hambúrgueres'],
  ['maca-do-amor.jpg', 'Maçãs do amor'],
  ['servico-buffet.jpg', 'Equipe servindo buffet em evento'],
  ['crepe-nutella.jpg', 'Crepe com Nutella e morangos'],
  ['mini-pizza.jpg', 'Mini pizzas'],
  ['carrinho-pipoca.jpg', 'Carrinho de pipoca para festa'],
  ['grelhados.jpg', 'Espetinhos na churrasqueira']
];
const gallery = document.getElementById('gallery');
if (gallery) {
  galleryFiles.forEach(([file, alt]) => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = `assets/fotos/${file}`;
    image.width = 800;
    image.height = 800;
    image.alt = alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    figure.append(image);
    gallery.append(figure);
  });
}

// ---------- Ano no rodapé ----------
const year = document.getElementById('ano');
if (year) year.textContent = new Date().getFullYear();

// ---------- Conversão "Clique no WhatsApp" (Google Ads) ----------
document.addEventListener('click', event => {
  const link = event.target.closest('a[href*="wa.me/"], a[href*="api.whatsapp.com"]');
  if (!link || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', { send_to: 'AW-11481407800/P7-pCJLeqrAdELjC4eIq' });
});

// ---------- Pop-up de campanha ----------
// Abre ao entrar no site, uma vez por visita, até a data em data-ate (AAAA-MM-DD).
const promo = document.getElementById('promo');
if (promo) {
  const key = 'sdm-promo-vista';
  const seen = () => { try { return sessionStorage.getItem(key) === '1'; } catch (e) { return false; } };
  const markSeen = () => { try { sessionStorage.setItem(key, '1'); } catch (e) {} };
  const until = promo.dataset.ate ? new Date(promo.dataset.ate + 'T23:59:59') : null;
  const active = !until || new Date() <= until;
  const native = typeof promo.showModal === 'function';

  const close = () => {
    if (native && promo.open) promo.close();
    else { promo.removeAttribute('open'); promo.classList.remove('promo-fallback'); }
    document.body.style.overflow = '';
  };
  const open = () => {
    if (native) promo.showModal();
    else { promo.setAttribute('open', ''); promo.classList.add('promo-fallback'); }
    document.body.style.overflow = 'hidden';
    markSeen();
  };

  promo.querySelectorAll('.promo-close, .promo-skip').forEach(b => b.addEventListener('click', close));
  promo.querySelector('.promo-cta').addEventListener('click', () => setTimeout(close, 300));
  promo.addEventListener('click', e => { if (e.target === promo) close(); });
  promo.addEventListener('close', () => { document.body.style.overflow = ''; });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && promo.hasAttribute('open') && !native) close(); });

  if (active && !seen()) setTimeout(open, 2500);
}
