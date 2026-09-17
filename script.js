const IP = "crystaltales.loca.lol";

const ranks = [
  {name:"HERO",price:10,color:"#ff9fc6",kit:"/kit hero",perks:[
    ["/hat","Надеть блок на голову"],["/ec","Открыть эндер-сундук"],["/afk","Перейти в режим AFK"]
  ],limits:"3 дома • 3 региона • 5 слотов"},
  {name:"LEGENDA",price:14,color:"#36e3ee",kit:"/kit legenda",perks:[
    ["/clear","Очистить свой инвентарь"],["/ignore","Игнорировать сообщения игрока"],["/near","Посмотреть игроков рядом"]
  ],limits:"10 домов • 10 регионов • 10 слотов"},
  {name:"KARATEL",price:24,color:"#f4df55",kit:"/kit karatel",perks:[
    ["/repair","Починить предмет в руке"],["/weather","Изменить погоду"],["+","Расширенные возможности привилегии"]
  ],limits:"21 дом • 21 регион • 21 слот"},
  {name:"KNYAZ",price:89,color:"#ff5353",kit:"/kit knyaz",perks:[
    ["/repair all","Починить все предметы"],["/compass","Получить компас-навигацию"],["+","Больше возможностей для игры"]
  ],limits:"30 домов • 30 регионов • 30 слотов"},
  {name:"PHANTOM",price:129,color:"#ffb52e",kit:"/kit phanton",perks:[
    ["/feed","Восстановить сытость"],["/heal","Восстановить здоровье"],["/rpt","Телепортироваться к игрокам"]
  ],limits:"40 домов • 40 регионов • 40 слотов"},
  {name:"LUXE",price:179,color:"#e95cff",kit:"/kit luxe",perks:[
    ["/fly","Включить полёт"],["/invsee","Просмотреть инвентарь игрока"],["/ptime","Настроить личное время"]
  ],limits:"50 домов • 50 регионов • 50 слотов"},
  {name:"POVELITEL",price:239,color:"#e7dc35",kit:"/kit povelitel",perks:[
    ["/pos","Показать свои координаты"],["/ec","Открыть эндер-сундук"],["+","Максимальные лимиты домов и регионов"]
  ],limits:"99 домов • 99 регионов • 99 слотов"},
  {name:"LUCIFER",price:349,color:"#ff4545",kit:"/kit lucifer",perks:[
    ["/god","Включить режим неуязвимости"],["/setwarp","Создать точку варпа"],["/recipe","Посмотреть рецепт предмета"],["/p pay","Перевести деньги игроку"]
  ],limits:"99 домов • 99 регионов • 99 слотов"}
];

const grid = document.getElementById("donateGrid");
grid.innerHTML = ranks.map((r,i)=>`<article class="donate-card reveal" style="--rank:${r.color}"><div class="rank-top"><span class="rank">${r.name}</span><span class="rank-price">${r.price} <small>₽</small></span></div><div class="rank-kit">Набор <b>${r.kit}</b></div><div class="perk-list">${r.perks.map(([cmd,desc])=>`<div class="perk"><code>${cmd}</code><span>${desc}</span></div>`).join("")}</div><div class="limits"><b>Лимиты:</b> ${r.limits}</div></article>`).join("");

// Rules tabs
(() => {
  const tabs = document.querySelectorAll("[data-rules-tab]");
  const panels = document.querySelectorAll(".rules-panel");
  function showRules(target) {
    tabs.forEach(tab => {
      const active = tab.dataset.rulesTab === target;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    panels.forEach(panel => {
      const active = panel.id === target;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  }
  tabs.forEach(tab => tab.addEventListener("click", () => showRules(tab.dataset.rulesTab)));
  const initial = document.querySelector(".rules-tab.active")?.dataset.rulesTab || "muteRules";
  showRules(initial);
})();

const toast = document.getElementById("toast");
document.getElementById("copyIp")?.addEventListener("click", async()=>{
  try { await navigator.clipboard.writeText(IP); toast.textContent="IP скопирован: "+IP; }
  catch { toast.textContent=IP; }
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2200);
});

const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

(() => {
  const canvas=document.getElementById("spaceCanvas"); if(!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const ctx=canvas.getContext("2d"); let w=0,h=0,dpr=Math.min(devicePixelRatio||1,2),mouseX=.5,mouseY=.5,particles=[],meteors=[];
  function resize(){w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);let n=Math.max(45,Math.min(115,Math.floor(w*h/18000)));particles=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.35+.3,p:Math.random()*6.28}));meteors=[]}
  addEventListener("resize",resize,{passive:true});addEventListener("mousemove",e=>{mouseX=e.clientX/w;mouseY=e.clientY/h},{passive:true});
  function spawnMeteor(){if(meteors.length<3) meteors.push({x:Math.random()*w*.9,y:Math.random()*h*.45,len:70+Math.random()*110,v:.8+Math.random()*1.4,life:0,max:70+Math.random()*90})}
  function draw(t){ctx.clearRect(0,0,w,h);const time=t*.001; if(Math.random()<.018)spawnMeteor();
    for(let i=0;i<particles.length;i++){const p=particles[i];p.x+=p.vx;p.y+=p.vy;if(p.x<-10)p.x=w+10;if(p.x>w+10)p.x=-10;if(p.y<-10)p.y=h+10;if(p.y>h+10)p.y=-10;const px=p.x+(mouseX-.5)*10,py=p.y+(mouseY-.5)*10;const a=.16+.24*(.5+.5*Math.sin(time*1.4+p.p));ctx.beginPath();ctx.arc(px,py,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(178,158,255,${a})`;ctx.fill();
      for(let j=i+1;j<particles.length;j++){const q=particles[j],qx=q.x+(mouseX-.5)*10,qy=q.y+(mouseY-.5)*10,dx=px-qx,dy=py-qy,d=dx*dx+dy*dy;if(d<10500){ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(qx,qy);ctx.strokeStyle=`rgba(111,125,255,${.035*(1-d/10500)})`;ctx.lineWidth=.7;ctx.stroke()}}
    }
    meteors=meteors.filter(m=>m.life<m.max);for(const m of meteors){m.life++;m.x+=m.v;m.y+=m.v*.62;const alpha=Math.sin(Math.PI*m.life/m.max);const g=ctx.createLinearGradient(m.x,m.y,m.x-m.len,m.y-m.len*.62);g.addColorStop(0,`rgba(255,255,255,${alpha*.8})`);g.addColorStop(1,'rgba(132,108,255,0)');ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.lineTo(m.x-m.len,m.y-m.len*.62);ctx.strokeStyle=g;ctx.lineWidth=1.4;ctx.stroke()}
    requestAnimationFrame(draw)}
  resize();requestAnimationFrame(draw);
})();
