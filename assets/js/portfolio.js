// Add your real email here before making the portfolio public.
const CONTACT_EMAIL = "";
const form = document.querySelector('#contact-form');
if (CONTACT_EMAIL) {document.querySelector('#contact-button').firstChild.textContent='Open email app ';document.querySelector('#contact-help').textContent='Opens your email app. You can review your message before sending.';}
form.addEventListener('submit', async (event) => {
 event.preventDefault();
 const data = new FormData(form);
 const subject = 'Portfolio inquiry from ' + data.get('name');
 const body = 'Name: ' + data.get('name') + '\nEmail: ' + data.get('email') + '\n\n' + data.get('message');
 const status = document.querySelector('#form-status');
 if (CONTACT_EMAIL) {location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);status.textContent='Your email app will open. Your message has not been sent yet.';}
 else {try {await navigator.clipboard.writeText(body);status.textContent='Message copied. It has not been sent. Contact details will be added soon.';}catch(error){status.textContent='Copy is unavailable in this browser. Select and copy your message above. Nothing has been sent.';}}
});
const links=[...document.querySelectorAll('nav a')];
if ('IntersectionObserver' in window) {const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>link.classList.toggle('active',link.hash==='#'+entry.target.id));}});},{rootMargin:'-10% 0px -65% 0px'});document.querySelectorAll('main>section').forEach(section=>observer.observe(section));}
