// Shared JS for all pages
const ADMISSION_KEY = 'pcs.admission.state';
function setAdmission(state){
  localStorage.setItem(ADMISSION_KEY, state);
  document.querySelectorAll('[data-admission-badge]').forEach(b=>b.textContent = state==='open'?'Admissions: Open':'Admissions: Closed');
  document.querySelectorAll('.state-toggle').forEach(t=>{
    t.setAttribute('data-state', state==='open'?'open':'closed');
    t.setAttribute('aria-checked', state==='open');
  });
}
function initAdmission(){
  const s = localStorage.getItem(ADMISSION_KEY) || 'open';
  setAdmission(s);
}
function attachToggle(){
  document.querySelectorAll('.state-toggle').forEach(t=>{
    t.addEventListener('click', ()=>{
      const current = t.getAttribute('data-state')==='open'?'open':'closed';
      setAdmission(current==='open'?'closed':'open');
    });
    t.addEventListener('keydown',(e)=>{ if(e.key===' '||e.key==='Enter'){ e.preventDefault(); t.click(); } });
  });
}
function initMenu(){
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  burger?.addEventListener('click', ()=> menu.classList.toggle('open'));
  // Highlight active link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.links a').forEach(a=>{
    if(a.getAttribute('href')===path){ a.style.background = '#ffffff22'; }
  });
}
function year(){ const y=document.querySelector('[data-year]'); if(y) y.textContent = new Date().getFullYear(); }
document.addEventListener('DOMContentLoaded', ()=>{ initMenu(); initAdmission(); attachToggle(); year(); });
