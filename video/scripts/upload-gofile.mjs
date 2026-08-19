/* Uploads the rendered clips plus POSTING.md to gofile.io and prints one link.

   The first upload creates a folder; every later file is posted into the same
   folderId, so the result is a single page rather than ten separate links.

   Anonymous upload — no account, no token. Gofile expires unclaimed anonymous
   content after a period of inactivity, so treat the link as a handoff rather
   than storage. The MP4s live in video/out/ and are reproducible with
   `npm run voice && npm run render:all`.
*/
import {readdirSync, statSync} from "node:fs";
import {readFile} from "node:fs/promises";
import {basename} from "node:path";

const server = await (async () => {
  const j = await (await fetch("https://api.gofile.io/servers")).json();
  const s = j?.data?.servers?.[0]?.name;
  if (!s) throw new Error("no gofile server returned");
  return s;
})();

const upload = async (path, folderId) => {
  const form = new FormData();
  form.append("file", new Blob([await readFile(path)]), basename(path));
  if (folderId) form.append("folderId", folderId);
  const r = await fetch(`https://${server}.gofile.io/contents/uploadfile`, {method: "POST", body: form});
  const j = await r.json();
  if (j.status !== "ok") throw new Error(`${basename(path)}: ${JSON.stringify(j).slice(0, 200)}`);
  return j.data;
};

const files = [
  ...readdirSync("out").filter((f) => f.endsWith(".mp4")).sort().map((f) => `out/${f}`),
  "POSTING.md",
];

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
console.log(`\n${files.length} files uploaded`);
console.log(`folder: ${page ?? "(no page returned)"}`);
