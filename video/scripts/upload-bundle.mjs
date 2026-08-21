/* Uploads video/bundle/ to gofile as one folder, in filename order so the
   numbered pairs stay adjacent in the listing.

   Same guest-account requirement as upload-gofile.mjs: fully anonymous uploads
   cannot be grouped, because the second file into a folder returns
   "error-notOwner" — nobody owns the folder the first upload created.

   Gofile expires unclaimed guest content, so this is a handoff, not storage.
   Re-run to mint a fresh link; bundle/ rebuilds from POSTING.md. */
import {readdirSync, statSync} from "node:fs";
import {readFile} from "node:fs/promises";
import {basename} from "node:path";

const server = await (async () => {
  const j = await (await fetch("https://api.gofile.io/servers")).json();
  const s = j?.data?.servers?.[0]?.name;
  if (!s) throw new Error("no gofile server returned");
  return s;
})();

const token = await (async () => {
  const j = await (await fetch("https://api.gofile.io/accounts", {method: "POST"})).json();
  const t = j?.data?.token;
  if (!t) throw new Error(`could not create guest account: ${JSON.stringify(j).slice(0, 200)}`);
  return t;
})();

const upload = async (path, folderId) => {
  const form = new FormData();
  form.append("file", new Blob([await readFile(path)]), basename(path));
  if (folderId) form.append("folderId", folderId);
  const r = await fetch(`https://${server}.gofile.io/contents/uploadfile`, {
    method: "POST", headers: {Authorization: `Bearer ${token}`}, body: form,
  });
  const j = await r.json();
  if (j.status !== "ok") throw new Error(`${basename(path)}: ${JSON.stringify(j).slice(0, 200)}`);
  return j.data;
};

const files = readdirSync("bundle").sort().map((f) => `bundle/${f}`);
console.log(`server: ${server}\n`);
let folderId = null, page = null;
for (const f of files) {
  const kb = Math.round(statSync(f).size / 1024);
  process.stdout.write(`  ${basename(f).padEnd(24)} ${String(kb).padStart(6)} KB ... `);
  const d = await upload(f, folderId);
  folderId ??= d.parentFolder ?? d.folderId ?? null;
  page ??= d.downloadPage ?? null;
  console.log("ok");
}
console.log(`\n${files.length} files uploaded\nfolder: ${page}`);
