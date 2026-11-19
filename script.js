const menuButton = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.main-nav a');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  header.classList.toggle('menu-open', open);
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});
const profileMore = document.querySelector('.profile-more');
const profileDetails = document.querySelector('#profile-details');

profileMore.addEventListener('click', () => {
  const expanded = profileMore.getAttribute('aria-expanded') !== 'true';

  profileMore.setAttribute('aria-expanded', String(expanded));
  profileDetails.hidden = !expanded;

  profileMore.firstChild.textContent = expanded
    ? 'Ocultar detalles '
    : 'Conoce mi enfoque ';
});
const experienceMore = document.querySelector('.experience-more');
const experienceDetails = document.querySelector('#experience-details');

experienceMore.addEventListener('click', () => {
  const expanded = experienceMore.getAttribute('aria-expanded') !== 'true';

  experienceMore.setAttribute('aria-expanded', String(expanded));
  experienceDetails.hidden = !expanded;

  experienceMore.firstChild.textContent = expanded
    ? 'Ocultar funciones '
    : 'Ver todas mis funciones ';
});

/* ===== Parte 3: menú activo, año y formulario ===== */
const sections = document.querySelectorAll('main section[id]');

const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${entry.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((section) => spy.observe(section));

document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const nombre = data.get('nombre').trim();
  const correo = data.get('correo').trim();
  const mensaje = data.get('mensaje').trim();

  status.classList.remove('error');

  if (!nombre || !mensaje || !/^\S+@\S+\.\S+$/.test(correo)) {
    status.classList.add('error');
    status.textContent = 'Completa todos los campos con un correo válido.';
    return;
  }

  // Abre el cliente de correo (sin servidor). Cambia el destinatario por el tuyo.
  const asunto = encodeURIComponent(`Contacto desde tu hoja de vida: ${nombre}`);
  const cuerpo = encodeURIComponent(`${mensaje}\n\nResponder a: ${correo}`);
  window.location.href = `mailto:tu-correo@ejemplo.com?subject=${asunto}&body=${cuerpo}`;

  status.textContent = 'Abriendo tu aplicación de correo…';
  form.reset();
});
