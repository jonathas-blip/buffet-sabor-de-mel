const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    navigation.classList.toggle('open', !isOpen);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('open');
  }));
}

const galleryFiles = [
  {file:'bolo-chocolate.jpg',alt:'Bolo de chocolate decorado com morangos'},
  {file:'grelhados.jpg',alt:'Espetinhos preparados na churrasqueira durante o evento'},
  {file:'caldos.jpg',alt:'Caldos servidos em panelas de barro'},
  {file:'mesa-salada.jpg',alt:'Mesa de saladas e acompanhamentos frescos'},
  {file:'salgados.jpg',alt:'Salgados assados organizados em uma bandeja'},
  {file:'bolo-tema-futebol.jpg',alt:'Mesa de aniversário decorada com tema de futebol'}
];
const gallery = document.querySelector('#gallery-grid');
if (gallery) {
  galleryFiles.forEach((photo, index) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item';
    if (index > 7) figure.hidden = true;
    const image = document.createElement('img');
    image.src = `assets/gallery/retouched/${photo.file}`;
    image.alt = photo.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    figure.append(image);
    gallery.append(figure);
  });
}
const galleryToggle = document.querySelector('#gallery-toggle');
if (galleryToggle && gallery) {
  if (galleryFiles.length <= 8) galleryToggle.hidden = true;
  galleryToggle.addEventListener('click', () => {
    const showAll = galleryToggle.getAttribute('aria-expanded') !== 'true';
    galleryToggle.setAttribute('aria-expanded', String(showAll));
    galleryToggle.innerHTML = showAll ? 'Mostrar menos <span aria-hidden="true">−</span>' : 'Ver a galeria completa <span aria-hidden="true">＋</span>';
    gallery.querySelectorAll('.gallery-item').forEach((item, index) => { item.hidden = !showAll && index > 7; });
  });
}
const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();

