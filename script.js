const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  mainNav.classList.toggle('open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  mainNav.classList.remove('open');
}));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = [...document.querySelectorAll('.testimonial')];
const progressCurrent = document.querySelector('.progress-current');
const progressFill = document.querySelector('.progress-line i');
let slideIndex = 0;
function showTestimonial(index) {
  if (!testimonialTrack || testimonialSlides.length === 0) return;
  slideIndex = (index + testimonialSlides.length) % testimonialSlides.length;
  testimonialTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
  progressCurrent.textContent = String(slideIndex + 1).padStart(2, '0');
  progressFill.style.width = `${((slideIndex + 1) / testimonialSlides.length) * 100}%`;
}
document.querySelector('.slider-controls .prev')?.addEventListener('click', () => showTestimonial(slideIndex - 1));
document.querySelector('.slider-controls .next')?.addEventListener('click', () => showTestimonial(slideIndex + 1));

const showreelDialog = document.querySelector('.showreel-dialog');
if (showreelDialog) {
  const playerFrame = showreelDialog.querySelector('#showreel-player');
  const poster = playerFrame?.innerHTML;
  const playInline = () => {
    if (!playerFrame || playerFrame.querySelector('iframe')) return;
    if (window.location.protocol === 'file:' || window.location.origin === 'null') {
      playerFrame.innerHTML = '<p class="showreel-local-note">Inline showreel playback is available from the deployed site.</p>';
      return;
    }
    const player = document.createElement('iframe');
    const playerParams = new URLSearchParams({ autoplay: '1', rel: '0', playsinline: '1', origin: window.location.origin, widget_referrer: window.location.href });
    player.src = `https://www.youtube.com/embed/6IN0aBBieEo?${playerParams}`;
    player.title = 'Zeal M Thakkar studio showreel';
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    playerFrame.replaceChildren(player);
  };
  document.querySelector('.showreel-button')?.addEventListener('click', () => {
    showreelDialog.showModal();
    playInline();
  });
  document.querySelector('.dialog-close')?.addEventListener('click', () => showreelDialog.close());
  showreelDialog.addEventListener('click', (event) => {
    if (event.target === showreelDialog) showreelDialog.close();
  });
  showreelDialog.addEventListener('close', () => {
    if (playerFrame && poster) playerFrame.innerHTML = poster;
  });
  showreelDialog.querySelector('.dialog-cta')?.addEventListener('click', () => showreelDialog.close());
}

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = `Design enquiry from ${form.get('firstName')} ${form.get('lastName')}`;
  const body = [
    `Name: ${form.get('firstName')} ${form.get('lastName')}`,
    `Phone: ${form.get('phone') || 'Not provided'}`,
    `Email: ${form.get('email')}`,
    '',
    'Query:',
    form.get('query'),
  ].join('\n');
  document.querySelector('.form-note').classList.add('visible');
  window.location.href = `mailto:designohive@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
