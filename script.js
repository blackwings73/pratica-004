// Interatividade: copiar texto, simular commit, deploy, modal, accordion, carousel, typed text and magic canvas
document.addEventListener('DOMContentLoaded',()=>{
  // Typed text effect
  const typedEl = document.querySelector('.typed');
  if(typedEl){
    const texts = JSON.parse(typedEl.getAttribute('data-text'));
    let i=0, j=0, forward=true;
    function tick(){
      const current = texts[i];
      typedEl.textContent = current.slice(0,j);
      if(forward){ j++; if(j>current.length){ forward=false; setTimeout(()=>forward=false,600); }} 
      if(!forward){ j--; if(j===0){ forward=true; i=(i+1)%texts.length; }} 
      setTimeout(tick, 60);
    }
    tick();
  }

  // Copy to clipboard
  document.querySelectorAll('[data-copy]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const sel = document.querySelector(btn.getAttribute('data-copy'));
      if(!sel) return;
      navigator.clipboard.writeText(sel.innerText).then(()=>{
        btn.textContent='Copiado!';
        setTimeout(()=>btn.textContent='Copiar comando',1500);
      });
    });
  });

  // Simula um commit
  const simulateCommit = document.getElementById('simulateCommit');
  const statusGit = document.getElementById('statusGit');
  if(simulateCommit){
    simulateCommit.addEventListener('click',()=>{
      statusGit.textContent='Status: criando commit...';
      setTimeout(()=>statusGit.textContent='Status: commit criado ✅',1200);
    });
  }

  // Deploy progress
  const startDeploy = document.getElementById('startDeploy');
  const progress = document.getElementById('deployProgress')?.querySelector('span');
  if(startDeploy && progress){
    startDeploy.addEventListener('click',()=>{
      progress.style.width='0%';
      let p=0;
      const id = setInterval(()=>{
        p+=Math.random()*18;
        if(p>=100){ p=100; clearInterval(id); startDeploy.textContent='Concluído'; }
        progress.style.width=p+'%';
      },400);
    });
  }

  // Modal
  const modal = document.getElementById('modal');
  document.getElementById('openModal')?.addEventListener('click',()=>{ modal.style.display='flex'; });
  document.getElementById('closeModal')?.addEventListener('click',()=>{ modal.style.display='none'; });
  window.addEventListener('click',(e)=>{ if(e.target===modal) modal.style.display='none'; });

  // Toast / Notification demo
  document.getElementById('demoNotify')?.addEventListener('click',()=>{
    if(Notification && Notification.permission!=='denied'){
      Notification.requestPermission().then(p=>{ if(p==='granted') new Notification('Mushoku Tensei', {body:'Notificação de exemplo: Deploy agendado.'}); });
    } else {
      alert('Notificações bloqueadas ou não suportadas');
    }
  });
  document.getElementById('demoToast')?.addEventListener('click',()=>{
    const t=document.createElement('div'); t.className='toast'; t.textContent='Ação realizada!'; document.body.appendChild(t);
    setTimeout(()=>t.classList.add('show'),50); setTimeout(()=>t.classList.remove('show'),2200); setTimeout(()=>t.remove(),2600);
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

  // Theme toggle — apenas alterna brilho
  const themeToggle = document.getElementById('themeToggle');
  themeToggle?.addEventListener('click',()=>{
    document.body.classList.toggle('soft-theme');
    themeToggle.textContent = document.body.classList.contains('soft-theme') ? '🌙 Escuro' : '✨ Tema';
  });

  // Magic canvas particles
  const canvas = document.getElementById('magic');
  if(canvas){
    const ctx = canvas.getContext('2d');
    const resize = ()=>{ canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; };
    window.addEventListener('resize', resize); resize();
    const particles=[];
    function spawn(x,y){
      particles.push({x,y,vx:(Math.random()-0.5)*1.2,vy:(Math.random()-0.9)*-1.2,life:60+rnd(40),r:1+Math.random()*2});
    }
    function rnd(n){return Math.floor(Math.random()*n)}
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

  // Simple toast style
  const style = document.createElement('style');
  style.textContent = `.toast{position:fixed;right:16px;bottom:16px;background:var(--gold);color:#000;padding:10px 14px;border-radius:8px;opacity:0;transform:translateY(6px);transition:all .25s}.toast.show{opacity:1;transform:translateY(0)}`;
  document.head.appendChild(style);
});