import {chromium} from "playwright-core";
const b = await chromium.launch({executablePath:"/opt/pw-browsers/chromium"});
const p = await b.newPage({viewport:{width:1024,height:1024},deviceScaleFactor:1});
await p.goto("file://"+process.cwd()+"/pfp.html");
for (const id of ["a","b","c"]) {
  await p.locator("#"+id).screenshot({path:`pfp-${id}.png`});
  console.log("wrote pfp-"+id+".png");
}
await b.close();
