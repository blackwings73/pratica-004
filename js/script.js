// Interatividade específica para o site sobre Mushoku Tensei
document.addEventListener('DOMContentLoaded',()=>{
  // Typed text effect
  const typedEl = document.querySelector('.typed');
  if(typedEl){
    const texts = JSON.parse(typedEl.getAttribute('data-text'));
    let tIndex=0, cIndex=0, forward=true;
    function tick(){
      const current = texts[tIndex];
      typedEl.textContent = current.slice(0,cIndex);
      if(forward){ cIndex++; if(cIndex>current.length){ forward=false; setTimeout(()=>forward=false,700); } }
      else{ cIndex--; if(cIndex===0){ forward=true; tIndex=(tIndex+1)%texts.length; } }
      setTimeout(tick, 60);
    }
    tick();
  }

  // Modal
  const modal = document.getElementById('modal');
  document.getElementById('openModal')?.addEventListener('click',()=>{ modal.style.display='flex'; });
  document.getElementById('closeModal')?.addEventListener('click',()=>{ modal.style.display='none'; });
  window.addEventListener('click',(e)=>{ if(e.target===modal) modal.style.display='none'; });

  // Show more characters (exemplo)
  document.getElementById('showAllChars')?.addEventListener('click',()=>{
    alert('Lista completa de personagens: Rudeus, Eris, Roxy, Sylphiette, Paul, Zenith, Orsted, e outros.');
  });

  // Arc summary
  document.getElementById('openArcModal')?.addEventListener('click',()=>{
    const status = document.getElementById('arcStatus');
    status.textContent='Resumo: infância, aprendizado, viagens e conflitos—crescimento contínuo.';
    setTimeout(()=>status.textContent='Clique para resumo',4000);
  });

  // Deploy-like media play (simulado)
  document.getElementById('playOST')?.addEventListener('click',()=>{
    const mediaStatus = document.getElementById('mediaStatus');
    mediaStatus.textContent='Tocando OST (simulado) 🎵';
    setTimeout(()=>mediaStatus.textContent='Parado',3000);
  });

  // Random trivia
  const trivia = [
    'Rudeus foi reencarnado com memórias de sua vida anterior.',
    'A obra mistura fantasia com drama adulto e temas de redenção.',
    'Roxy é uma maga que atua como mentora de Rudeus.',
    'A light novel teve grande recepção e sucesso de vendas.'
  ];
  document.getElementById('randomTrivia')?.addEventListener('click',()=>{
    const s = document.getElementById('triviaStatus');
    s.textContent = trivia[Math.floor(Math.random()*trivia.length)];
    setTimeout(()=>s.textContent='Clique para curiosidade',4000);
  });

  // Accordion
  document.querySelectorAll('.acc-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const panel = btn.nextElementSibling;
      const open = panel.style.maxHeight && panel.style.maxHeight!=='0px';
      document.querySelectorAll('.acc-panel').forEach(p=>p.style.maxHeight=null);
      if(!open){ panel.style.maxHeight = panel.scrollHeight+'px'; }
    });
  });

  // Carousel
  const slides = Array.from(document.querySelectorAll('.slide'));
  let idx = 0;
  function show(i){
    slides.forEach(s=>s.classList.remove('active'));
    slides[i].classList.add('active');
  }
  document.getElementById('next')?.addEventListener('click',()=>{ idx=(idx+1)%slides.length; show(idx); });
  document.getElementById('prev')?.addEventListener('click',()=>{ idx=(idx-1+slides.length)%slides.length; show(idx); });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle?.addEventListener('click',()=>{
    document.body.classList.toggle('soft-theme');
    themeToggle.textContent = document.body.classList.contains('soft-theme') ? '🌙 Escuro' : '✨ Tema';
  });

  // Partículas mágicas no canvas
  const canvas = document.getElementById('magic');
  if(canvas){
    const ctx = canvas.getContext('2d');
    const resize = ()=>{ canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; };
    window.addEventListener('resize', resize); resize();
    const particles=[];
    function spawn(x,y){
      particles.push({x,y,vx:(Math.random()-0.5)*1.2,vy:(Math.random()-0.9)*-1.2,life:60+Math.floor(Math.random()*40),r:1+Math.random()*2});
    }
    canvas.addEventListener('mousemove',e=>{ const b=canvas.getBoundingClientRect(); spawn(e.clientX-b.left,e.clientY-b.top); });
    function frame(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=particles.length-1;i>=0;i--){
        const p=particles[i]; p.x+=p.vx; p.y+=p.vy; p.vy+=0.03; p.life--;
        ctx.beginPath(); ctx.globalAlpha = Math.max(0, p.life/100);
        const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,8);
        g.addColorStop(0,'rgba(249,211,66,1)'); g.addColorStop(0.6,'rgba(0,188,212,0.8)'); g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        if(p.life<=0) particles.splice(i,1);
      }
      requestAnimationFrame(frame);
    }
    frame();
  }

  // Toast style
  const style = document.createElement('style');
  style.textContent = `.toast{position:fixed;right:16px;bottom:16px;background:var(--gold);color:#000;padding:10px 14px;border-radius:8px;opacity:0;transform:translateY(6px);transition:all .25s}.toast.show{opacity:1;transform:translateY(0)}`;
  document.head.appendChild(style);
});