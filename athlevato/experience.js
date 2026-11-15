'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const stage = document.querySelector('.card-stage');
const card = document.querySelector('.metal-card');
const front = card.querySelector('.card-front');
const back = card.querySelector('.card-back');
const flipButton = document.getElementById('flip-card');
const editionPicker = document.querySelector('.edition-picker');
const editions = {
 bronze: { label: 'Bronze', overline: 'Bronze · Sportlicher Auftritt', title: 'Dein Einsatz.\nDeine Ausstrahlung.', text: 'Für sportliche Menschen mit einem gepflegten, ansprechenden Auftreten. Deine Disziplin und die Zeit, die du in dich investierst, sind sichtbar.' },
 silver: { label: 'Silber', overline: 'Silber · Besonderes Gesicht', title: 'Ein Gesicht,\ndas bleibt.', text: 'Für Menschen mit einem besonders schönen, ausdrucksstarken Gesicht. Und einer Ausstrahlung, die in Erinnerung bleibt.' },
 gold: { label: 'Gold', overline: 'Gold · Moderation & Präsenz', title: 'Du erreichst\nMenschen.', text: 'Gold setzt sportliche Ausstrahlung, ein besonders schönes, ausdrucksstarkes Gesicht und zusätzlich überzeugende Moderationsfähigkeit voraus. Du führst sicher durch ein Programm – vor Publikum oder Kamera.' }
};
flipButton.hidden = false;
editionPicker.hidden = false;
function setFlipped(flipped) {
 card.classList.toggle('is-flipped', flipped);
 flipButton.setAttribute('aria-pressed', String(flipped));
 front.setAttribute('aria-hidden', String(flipped));
 back.setAttribute('aria-hidden', String(!flipped));
}
flipButton.addEventListener('click', () => setFlipped(!card.classList.contains('is-flipped')));
editionPicker.querySelectorAll('button').forEach(button => {
 button.addEventListener('click', () => {
  const edition = editions[button.dataset.edition];
  card.dataset.metal = button.dataset.edition;
  card.querySelector('.card-edition').textContent = edition.label;
  editionPicker.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  const copy = document.getElementById('edition-copy');
  copy.querySelector('.edition-overline').textContent = edition.overline;
  const title = copy.querySelector('h3');
  title.replaceChildren();
  edition.title.split('\n').forEach((line, index) => {
   if (index) title.append(document.createElement('br'));
   title.append(document.createTextNode(line));
  });
  copy.querySelector('p:last-child').textContent = edition.text;
  setFlipped(false);
 });
});
function resetTilt() {
 stage.style.removeProperty('--rx');
 stage.style.removeProperty('--ry');
 stage.style.removeProperty('--glint');
}
stage.addEventListener('pointermove', event => {
 if (reducedMotion.matches || !finePointer.matches) return;
 const rect = stage.getBoundingClientRect();
 const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
 const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
 stage.style.setProperty('--rx', `${(0.5 - y) * 12}deg`);
 stage.style.setProperty('--ry', `${(x - 0.5) * 16}deg`);
 stage.style.setProperty('--glint', `${x * 100}%`);
});
stage.addEventListener('pointerleave', resetTilt);
reducedMotion.addEventListener('change', resetTilt);
const dialog = document.getElementById('profile-dialog');
const profileOpeners = [...document.querySelectorAll('[data-open-profile]')];
const profiles = {
 mara: {
  name: 'Mara',
  image: 'assets/mara-daylight.webp',
  alt: 'Fiktive KI-Athletin Mara in salbeigrüner Sportkleidung, vollständig abgebildet.',
  line: 'Sportlicher Ausdruck. Ein eigener Blick.'
 },
 noah: {
  name: 'Noah',
  image: 'assets/noah-daylight.webp',
  alt: 'Fiktiver KI-Athlet Noah im blauen Sportshirt und hellen Shorts, vollständig abgebildet.',
  line: 'Kraft in Bewegung. Persönlichkeit im Auftritt.'
 }
};
let lastProfileOpener;
let previousOverflow;
profileOpeners.forEach(opener => {
 opener.hidden = false;
 opener.addEventListener('click', () => {
  lastProfileOpener = opener;
  const activeProfile = profiles[opener.dataset.openProfile];
  document.getElementById('profile-title').textContent = `${activeProfile.name}.`;
  document.getElementById('profile-disclaimer').textContent = `${activeProfile.name} existiert nicht und ist nicht buchbar. Es werden keine realen Qualifikationen oder Referenzen behauptet.`;
  const image = document.getElementById('profile-image');
  image.src = activeProfile.image;
  image.alt = activeProfile.alt;
  document.getElementById('profile-line').textContent = activeProfile.line;
  dialog.scrollTop = 0;
  previousOverflow = document.body.style.overflow;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
 });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
 if (event.target !== dialog) return;
 const rect = dialog.getBoundingClientRect();
 if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
 document.body.style.overflow = previousOverflow || '';
 lastProfileOpener?.focus({preventScroll:true});
});
