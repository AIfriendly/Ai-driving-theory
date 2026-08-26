import pkg from 'playwright'; const { chromium } = pkg;

const browser = await chromium.launch({ args:['--use-gl=swiftshader','--enable-unsafe-swiftshader'] });
const page = await browser.newPage();
const pageErrors=[], buildFails=[];
page.on('pageerror',e=>pageErrors.push(e.message));
page.on('console',m=>{ const t=m.text(); if(/scenario build failed/.test(t))buildFails.push(t); });

await page.goto('http://127.0.0.1:8899/index.html',{waitUntil:'load'});
await page.waitForFunction(()=>window.simScenAudit,null,{polling:250,timeout:60000});
const audit = await page.evaluate(()=>window.simScenAudit());

await page.evaluate(()=>{
  const PRESETS=[20,40,60,80,100];   // the only speeds the UI offers (plus 0)
  const S=()=>simTest.state();
  const put=(px,pz,kmh,h)=>simTest.put(px,pz,kmh,h==null?0:h);
  const step=(dt,n)=>simTest.step(dt,n);

  function build(i){ simTest.goto(i); simTest.step(0.001,1); return S(); }
  function roll(i,px,kmh,untilZ,maxF){
    for(let f=0;f<(maxF||600);f++){
      const s=S(); if(s.idx>i||s.paused)return;
      put(px,s.car.pz,kmh); step(0.05,1);
      if(S().car.pz>untilZ)return;
    }
  }
  function park(i,px,pz,frames){
    for(let f=0;f<frames;f++){ const s=S(); if(s.idx>i||s.paused)return; put(px,pz,0); step(0.05,1); }
  }
  const verdict=(i)=>{ const s=S(); return s.paused?"fail":(s.idx>i?"pass":"none"); };

  // ---- drive it the way it is meant to be driven ----
  window.__right=function(i){
    const st=build(i); if(!st.id)return {v:"nobuild"};
    const z=st.z,p=st.p||{},extra={};
    switch(st.k){
      case "stop":    park(i,0,z-200,6); roll(i,0,40,z+400); break;
      case "hold":    park(i,0,z-(p.line||0)-200,260); roll(i,0,40,z+400,800); break;
      case "signal":  park(i,0,z-200,140); roll(i,0,40,z+400,800); break;
      case "yield":   park(i,0,z-(p.margin||90)-300,300); roll(i,0,40,z+700,800); break;
      case "zone": {
        const lo=p.vmin||0, hi=(p.vmax||999)*1.05;
        const ok=PRESETS.filter(v=>v>=lo&&v<=hi);
        extra.band=[lo,hi]; extra.pickable=ok;
        if(!ok.length)return {v:"unwinnable",why:"no speed on the pad lies inside the band",...extra};
        roll(i,0,ok[0],z+(p.len||1700)+300,1600); break; }
      case "keep": {
        const len=p.len||1500;
        if(p.cross){ roll(i,-100,60,z+len*0.55,900); roll(i,60,60,z+len+300,900); }
        else { const mid=((p.x0==null?-125:p.x0)+(p.x1==null?125:p.x1))/2;
               extra.corridor=[p.x0,p.x1]; roll(i,mid,40,z+len+300,1400); }
        break; }
      case "gap":     roll(i,0,20,z+(p.len||2200)+300,2000); break;
      case "pullover":park(i,120,z,320); break;
      case "turn": {  const w=(p.side==="left")?-1:1;
                      put(0,z-240,20); step(0.05,1); put(w*400,z-100,20); step(0.05,1); break; }
      case "uturn":   put(0,z-100,0,Math.PI); step(0.05,2); break;
      case "park":    park(i,((p.x0||160)+(p.x1||370))/2,z,30); break;
      case "nostop":  roll(i,0,40,z+(p.len||1500)+300,1000); break;
      default: return {v:"unknown-kernel",k:st.k};
    }
    return {v:verdict(i),...extra};
  };

  // ---- drive it wrong, and read the card the learner is actually shown ----
  window.__wrong=function(i){
    const st=build(i); if(!st.id)return {v:"nobuild"};
    const z=st.z,p=st.p||{};
    switch(st.k){
      case "stop": case "hold": case "signal":
        roll(i,0,100,z+600,900); break;
      case "yield":
        put(0,z-1000,0); step(0.05,2);            // wake the crosser
        put(0,z-(p.margin||90)+30,40); step(0.05,2); break;
      case "zone": {
        const lo=p.vmin||0, hi=(p.vmax||999)*1.05;
        const bad=PRESETS.filter(v=>v<lo||v>hi);
        if(!bad.length)return {v:"nofailpath"};
        roll(i,0,bad[bad.length-1],z+(p.len||1700)+300,1600); break; }
      case "keep": {
        const len=p.len||1500;
        if(p.cross)roll(i,60,60,z+len+300,900);   // never pull out
        else roll(i,-400,40,z+len+300,1400);      // way outside the corridor
        break; }
      case "gap":     roll(i,66,100,z+(p.len||2200)+300,2000); break;
      case "pullover":roll(i,0,60,z+(p.len||1800)+300,900); break;
      case "turn":    roll(i,0,100,z+(p.len||900)+300,900); break;
      case "uturn":   roll(i,0,60,z+(p.len||1400)+300,900); break;
      case "park":    roll(i,0,40,z+800,600); break;
      case "nostop":  put(0,z+200,0); step(0.05,40); break;
      default: return {v:"unknown-kernel"};
    }
    const v=verdict(i);
    let card="";
    if(v==="fail"){ const c=document.getElementById("simCard");
      const ex=c&&c.querySelector(".explain.no"); card=ex?ex.textContent.trim():"(no reason shown)"; }
    return {v,card};
  };

  window.__sweep=function(){
    const n=S().total, out=[];
    for(let i=0;i<n;i++){
      const st=build(i);
      const row={i,id:st.id,k:st.k,actors:st.actors,instr:st.instr,p:JSON.parse(JSON.stringify(st.p||{}))};
      row.right=window.__right(i);
      row.wrong=window.__wrong(i);
      out.push(row);
    }
    return out;
  };
  window.__instrOnly=function(){
    const n=S().total, out=[];
    for(let i=0;i<n;i++){ const st=build(i); out.push(st.instr); }
    return out;
  };
});

const sets=[];
for(let n=0;n<15;n++){
  await page.evaluate(()=>window.setLang('en'));
  await page.evaluate(n=>window.startSim(n),n);
  await page.waitForFunction(()=>{try{return simTest.state().total>0;}catch(e){return false;}},null,{polling:250,timeout:90000});
  const rows = await page.evaluate(()=>window.__sweep());
  await page.evaluate(()=>window.setLang('ku'));
  await page.evaluate(n=>window.startSim(n),n);
  await page.waitForFunction(()=>{try{return simTest.state().total>0;}catch(e){return false;}},null,{polling:250,timeout:90000});
  const ku = await page.evaluate(()=>window.__instrOnly());
  const kuCards = await page.evaluate(()=>{ const n=simTest.state().total,o=[];
    for(let i=0;i<n;i++)o.push(window.__wrong(i).card||""); return o; });
  rows.forEach((r,i)=>{ r.instrKu=ku[i]; r.cardKu=kuCards[i]; });
  sets.push({set:n+1,total:rows.length,rows});
  process.stderr.write(`set ${n+1}: ${rows.length} situations · unbeaten ${rows.filter(r=>r.right.v!=="pass").length} · no-fail-path ${rows.filter(r=>r.wrong.v!=="fail").length}\n`);
}
await browser.close();
console.log(JSON.stringify({audit,pageErrors,buildFails,sets}));
