// Set this to your email to enable the visitor's email app. No server is required.
const CONTACT_EMAIL = "";
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

if (CONTACT_EMAIL) {
  document.querySelector('#contact-button-label').textContent = 'Open email app';
  document.querySelector('#contact-help').textContent = 'Review your message in your email app before sending.';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = 'Portfolio inquiry from ' + String(data.get('name')).trim();
  const body = 'Name: ' + String(data.get('name')).trim() + '\nEmail: ' + String(data.get('email')).trim() + '\n\n' + String(data.get('message')).trim();
  if (CONTACT_EMAIL) {
    location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    status.textContent = 'Your email app will open. Your message has not been sent yet.';
    return;
  }
  try {
    await navigator.clipboard.writeText(body);
    status.textContent = 'Message copied. Nothing has been sent; contact details will be added soon.';
  } catch {
    status.textContent = 'Clipboard access is unavailable. Select and copy your message above. Nothing has been sent.';
    document.querySelector('#message').focus();
    document.querySelector('#message').select();
  }
});

// Track the section nearest the top of the viewport, including on hash navigation.
const navLinks = [...document.querySelectorAll('.site-header nav a')];
const sections = [...document.querySelectorAll('main > section[id]')];
let scheduled = false;
function updateNavigation() {
  const threshold = document.querySelector('.site-header').getBoundingClientRect().height + 100;
  let current = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= threshold) current = section.id;
  }
  for (const link of navLinks) {
    const active = link.hash === '#' + current;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
window.addEventListener('pageshow', updateNavigation);
updateNavigation();
