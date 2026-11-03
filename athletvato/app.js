const profiles = [
  {id:'01', name:'Kraft / Fokus', category:'Kraft', detail:'Krafttraining', copy:'Ein Konzept für kontrollierte, kraftvolle Bewegung – für Trainingswelten und Produkte, bei denen Technik im Mittelpunkt steht.', color:'var(--pale)', angle:'-8', shape:'strength'},
  {id:'02', name:'Tempo / Energie', category:'Ausdauer', detail:'Running', copy:'Ein Konzept für Dynamik und Ausdauer – für Geschichten über Tempo, Rhythmus und Bewegung im Raum.', color:'var(--soft)', angle:'12', shape:'run'},
  {id:'03', name:'Flow / Balance', category:'Beweglichkeit', detail:'Mobility', copy:'Ein Konzept für fließende Bewegungen und Körpergefühl – für ruhige, konzentrierte Bildwelten.', color:'var(--pale)', angle:'-18', shape:'flow'},
  {id:'04', name:'Power / Dynamik', category:'Kraft', detail:'Functional Training', copy:'Ein Konzept für explosive Bewegungen – für moderne Trainings- und Kampagnenmotive.', color:'var(--soft)', angle:'8', shape:'power'}
];
const selected = new Set();
let activeFilter = 'Alle';
let onlySelected = false;
const grid = document.querySelector('#talent-grid');
const empty = document.querySelector('#empty');
const shapes = {
  strength:'M95 102c-13-11-13-28-3-39 10-10 27-10 37 0 10 11 9 27-1 38-9 9-23 10-33 1ZM93 118c13-9 32-8 42 3l23 33 34-20 11 17-42 31c-7 5-17 4-22-3l-8-10-12 52 34 33-16 15-46-31c-6-5-9-12-7-20l11-51-28 9-17 35-18-8 16-46c3-7 8-12 15-15ZM83 225l27 12-25 50-42 22-9-17 31-25ZM139 264l27 5 20 29-13 12-36-27Z',
  run:'M112 97c-12-10-13-27-4-38 10-11 27-12 38-2 10 10 11 27 1 38-9 10-25 11-35 2ZM105 116c13-10 30-9 41 3l25 26 31-11 8 18-41 22c-6 3-14 2-19-3l-12-10-19 42 31 25c7 5 10 14 7 22l-16 39-20-6 10-36-42-19-35 29-14-15 34-40 19-49-27 6-20 29-15-10 20-39c3-6 8-10 14-11ZM64 249l17 13-27 27-35 7-4-16 29-11ZM123 286l18 4 18 16-7 11-30-8Z',
  flow:'M104 86c-11-10-11-26-1-36 10-10 26-10 36 0 10 10 10 26 0 36-10 10-25 10-35 0ZM107 103c12-7 29-4 36 9l24 44 33 17-8 17-45-16-19-23-9 52 39 34-13 16-51-30c-7-4-10-12-8-20l9-58-28 25-37 3-2-18 30-7 35-39c4-3 9-5 14-6ZM89 218l22 13-24 45-37 24-10-14 28-26ZM147 246l15-8 20 47 31 12-5 16-43-8c-5-1-9-4-11-9Z',
  power:'M119 99c-11-10-12-26-3-37 10-11 26-12 37-2 11 9 12 26 2 37-9 11-25 12-36 2ZM111 115c11-10 29-10 40 0l28 28 28-9 7 18-39 20c-7 3-14 2-19-3l-12-11-22 45 33 25c7 5 10 14 6 22l-20 42-20-8 14-37-44-18-37 26-13-16 37-36 20-51-29 10-22 28-14-11 23-39c3-5 7-9 13-11ZM58 247l20 13-29 31-31 5-4-17 25-8ZM126 286l18 7 16 17-9 11-28-13Z'
};
function artwork(p){return `<svg viewBox="0 0 240 330" aria-hidden="true"><rect width="240" height="330" fill="${p.color}"/><circle cx="122" cy="165" r="104" fill="none" stroke="var(--deep)" opacity=".35"/><circle cx="122" cy="165" r="78" fill="none" stroke="var(--deep)" opacity=".35"/><path d="M0 248L240 75v38L0 286Z" fill="var(--teal)"/><path d="${shapes[p.shape]}" fill="var(--ink)" transform="rotate(${p.angle} 120 165)"/><path d="M15 18h50M15 24h26M180 308h44" stroke="var(--deep)"/><text x="15" y="317" fill="var(--ink)" font-size="8" letter-spacing="2">STUDY / ${p.id}</text></svg>`}
function render(){
 const visible=profiles.filter(p=>(activeFilter==='Alle'||p.category===activeFilter)&&(!onlySelected||selected.has(p.id)));
 grid.innerHTML=visible.map(p=>`<article class="talent-card"><div class="card-art">${artwork(p)}<button class="card-add" data-add="${p.id}" aria-label="${p.name} ${selected.has(p.id)?'von der Shortlist entfernen':'zur Shortlist hinzufügen'}" aria-pressed="${selected.has(p.id)}">${selected.has(p.id)?'−':'+'}</button></div><div class="card-info"><div><h3>${p.name}</h3><p>KONZEPTPROFIL ${p.id} / ${p.detail.toUpperCase()}</p></div><button class="card-open" data-profile="${p.id}" aria-label="Konzeptprofil ${p.name} öffnen">↗</button></div></article>`).join('');
 empty.hidden=visible.length>0; empty.textContent=onlySelected?'Keine gemerkten Profile in dieser Auswahl. Wähle eine andere Kategorie oder füge ein Profil hinzu.':'Für diese Auswahl gibt es keine Konzeptprofile.';
 document.querySelector('.count').textContent=selected.size;
}
function toggle(id){selected.has(id)?selected.delete(id):selected.add(id);render()}
let profileOpenerId=null;
function profile(id){profileOpenerId=id;const p=profiles.find(x=>x.id===id);document.querySelector('#profile-content').innerHTML=`<div class="profile-tag">KONZEPTPROFIL ${p.id} / ILLUSTRATION</div><h2 id="profile-title">${p.name}</h2><div class="profile-illustration">${artwork(p)}</div><div class="profile-details"><span>${p.category}</span><span>${p.detail}</span></div><p class="profile-copy">${p.copy} Dieses Beispiel ist eine Illustration und zeigt keine reale Person.</p><button class="btn" id="profile-add">${selected.has(p.id)?'Von Shortlist entfernen':'Zur Shortlist hinzufügen'} ${selected.has(p.id)?'−':'+'}</button>`;document.querySelector('#profile-add').addEventListener('click',()=>{toggle(id);document.querySelector('#profile-add').textContent=selected.has(id)?'Von Shortlist entfernen −':'Zur Shortlist hinzufügen +'});document.querySelector('#profile-dialog').showModal()}
grid.addEventListener('click',e=>{const add=e.target.closest('[data-add]');const open=e.target.closest('[data-profile]');if(add){const id=add.dataset.add;toggle(id);const replacement=grid.querySelector(`[data-add="${id}"]`);(replacement||document.querySelector('#show-shortlist')).focus()}if(open)profile(open.dataset.profile)});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});render()}));
document.querySelector('#show-shortlist').addEventListener('click',e=>{onlySelected=!onlySelected;e.currentTarget.setAttribute('aria-pressed',onlySelected);render()});
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelector('#profile-dialog').addEventListener('close',()=>{const replacement=grid.querySelector(`[data-profile="${profileOpenerId}"]`);(replacement||document.querySelector('#show-shortlist')).focus()});
const brief=document.querySelector('#brief-dialog');
document.querySelectorAll('[data-open-brief]').forEach(button=>button.addEventListener('click',()=>brief.showModal()));
document.querySelector('#open-apply').addEventListener('click',()=>document.querySelector('#apply-dialog').showModal());
const form=document.querySelector('#brief-form');const one=document.querySelector('#step-one');const two=document.querySelector('#step-two');
function summary(){const data=new FormData(form);const names=profiles.filter(p=>selected.has(p.id)).map(p=>p.name).join(', ')||'Keine';return `Projekt: ${data.get('project')}\nBereich: ${data.get('category')}\nIdee: ${data.get('idea')||'Offen'}\nZeit und Ort: ${data.get('timing')||'Offen'}\nName / Unternehmen: ${data.get('contact')||'Offen'}\nShortlist (Konzeptprofile): ${names}`}
function updateSummary(){document.querySelector('#brief-summary').textContent=summary()}
function goToDetails(){const project=document.querySelector('#project');project.value=project.value.trim();if(!project.reportValidity())return false;one.hidden=true;two.hidden=false;updateSummary();document.querySelector('#timing').focus();return true}
document.querySelector('#next-step').addEventListener('click',goToDetails);
document.querySelector('#prev-step').addEventListener('click',()=>{two.hidden=true;one.hidden=false;document.querySelector('#project').focus()});
form.addEventListener('input',()=>{if(!two.hidden)updateSummary()});
function download(filename,content){const blob=new Blob([content],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
form.addEventListener('submit',e=>{e.preventDefault();if(!one.hidden){goToDetails();return}const project=document.querySelector('#project');project.value=project.value.trim();if(!project.value){two.hidden=true;one.hidden=false;project.reportValidity();return}download('athletvato-projektbriefing.txt',`ATHLETVATO — PROJEKTBRIEFING\nLokaler Entwurf, nicht versendet\n\n${summary()}\n`);document.querySelector('#brief-status').textContent='Entwurf heruntergeladen — nicht versendet.'});
document.querySelector('#apply-form').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);download('athletvato-vorstellung.txt',`ATHLETVATO — VORSTELLUNG\nLokaler Entwurf, nicht versendet\n\nName: ${d.get('name')}\nSport: ${d.get('sport')}\nÜber mich: ${d.get('story')||'Offen'}\n`);document.querySelector('#apply-status').textContent='Entwurf heruntergeladen — nicht versendet.'});
render();
