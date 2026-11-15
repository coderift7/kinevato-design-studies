const examples = {
  alltag: {before: '„Hilf mir beim Schreiben.“', after: '„Ich möchte meine Nachbarn zu einem Gartenfest einladen. Schreib eine freundliche, kurze Einladung. Frag mich zuerst nach Datum, Uhrzeit und dem, was Gäste mitbringen sollen.“', takeaway: 'Du gibst Anlass, Ton und wichtige Angaben vor. Den Entwurf prüfst du selbst.'},
  betrieb: {before: '„Beantworte diese Kundenanfrage.“', after: '„Entwirf eine freundliche Antwort auf eine allgemeine Terminanfrage. Lass Namen und konkrete Termine als Platzhalter stehen. Frage nach dem gewünschten Zeitraum. Versprich keine Verfügbarkeit.“', takeaway: 'Du legst den Rahmen fest. Echte Kundendaten bleiben draußen, Zusagen prüfst du vor dem Senden.'}
};
function selectExample(key) {
  if (!examples[key]) return;
  for (const [id, text] of Object.entries(examples[key])) document.getElementById(id).textContent = text;
  document.querySelectorAll('[data-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.choice === key)));
}
document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => selectExample(button.dataset.choice)));
document.querySelectorAll('[data-example]').forEach(link => link.addEventListener('click', () => selectExample(link.dataset.example)));
