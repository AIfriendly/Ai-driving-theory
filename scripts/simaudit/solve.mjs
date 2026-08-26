import pkg from 'playwright'; const { chromium } = pkg;
import fs from 'fs';
const cases=JSON.parse(fs.readFileSync(process.argv[2]||'bad.json','utf8'));

const browser = await chromium.launch({ args:['--use-gl=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage();
page.on('pageerror',e=>console.error('PAGEERROR',e.message));
await page.goto('http://127.0.0.1:8899/index.html',{waitUntil:'load'});
await page.waitForFunction(()=>window.simScenAudit,null,{polling:250,timeout:60000});

await page.evaluate(()=>{
  const S=()=>simTest.state();
  window.__build=i=>{ simTest.goto(i); simTest.step(0.001,1); return S(); };
  // a pass advances idx even when the finish card pauses the drive
  window.__verdict=i=>{ const s=S(); return s.idx>i?"pass":(s.paused?"fail":"none"); };
  window.__why=()=>{ const c=document.getElementById("simCard");
    const ex=c&&c.querySelector(".explain.no"); return ex?ex.textContent.trim():""; };
  window.__roll=(i,px,kmh,untilZ,maxF)=>{
    for(let f=0;f<(maxF||1500);f++){
      const s=S(); if(s.idx>i||s.paused)return;
      simTest.put(px,s.car.pz,kmh,0); simTest.step(0.05,1);
      if(S().car.pz>untilZ)return;
    }
  };
  window.__park=(i,px,pz,frames)=>{
    for(let f=0;f<frames;f++){ const s=S(); if(s.idx>i||s.paused)return; simTest.put(px,pz,0,0); simTest.step(0.05,1); }
  };
});

const out=[];
let curSet=-1;
for(const [set,i,id,k] of cases){
  if(set!==curSet){
    await page.evaluate(n=>window.startSim(n),set);
    await page.waitForFunction(()=>{try{return simTest.state().total>0;}catch(e){return false;}},null,{polling:250,timeout:90000});
    curSet=set;
  }
  const r = await page.evaluate(([i,k])=>{
    const tries=[];
    const st=window.__build(i); const z=st.z, p=st.p||{};
    function attempt(label,fn){
      window.__build(i);
      fn(z,p);
      const v=window.__verdict(i);
      tries.push({label,v,why:v==="fail"?window.__why():""});
      return v==="pass";
    }
    if(k==="zone"){
      for(const v of [20,40,60,80,100])
        attempt("hold "+v+" km/h",(z,p)=>window.__roll(i,0,v,z+(p.len||1700)+300,2000));
    } else if(k==="keep"){
      const len=p.len||1500;
      if(p.cross){
        for(const out of [-150,-250,-350])
          for(const backAt of [0.6,0.75,0.9])
            attempt("out to "+out+", back at "+backAt,(z,p)=>{
              window.__roll(i,out,60,z+len*backAt,1200);
              window.__roll(i,60,60,z+len+300,1200);
            });
      } else {
        const x0=p.x0==null?-125:p.x0, x1=p.x1==null?125:p.x1;
        for(let s=0;s<=10;s++){
          const px=x0+(x1-x0)*s/10;
          if(attempt("hold x="+Math.round(px),(z,p)=>window.__roll(i,px,40,z+len+300,1600)))break;
        }
      }
    } else if(k==="park"){
      const x0=p.x0||160,x1=p.x1||370;
      for(let s=0;s<=6;s++){
        const px=x0+(x1-x0)*s/6;
        if(attempt("park at x="+Math.round(px),(z,p)=>window.__park(i,px,z,40)))break;
      }
    } else if(k==="hold"){
      attempt("stop and wait",(z,p)=>{ window.__park(i,0,z-(p.line||0)-200,300); window.__roll(i,0,40,z+500,900); });
    } else if(k==="stop"){
      attempt("stop then go",(z,p)=>{ window.__park(i,0,z-200,8); window.__roll(i,0,40,z+500,900); });
    } else {
      attempt("default",(z,p)=>{ window.__park(i,0,z-300,300); window.__roll(i,0,40,z+800,900); });
    }
    return {p,tries};
  },[i,k]);
  const win=r.tries.filter(t=>t.v==="pass").map(t=>t.label);
  out.push({set:set+1,i,id,k,p:r.p,beatable:win.length>0,winning:win,tries:r.tries});
  process.stderr.write(`set${set+1}#${i} ${id} ${win.length?"BEATABLE ("+win[0]+")":"UNBEATABLE"}\n`);
}
await browser.close();
fs.writeFileSync('solve.json',JSON.stringify(out,null,1));
