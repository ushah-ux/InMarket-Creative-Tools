// Encrypts source/hub.html with a team password and writes site/index.html.
// Run with: node lock.mjs   (or double-click "Lock Hub.command")
// The password is never saved anywhere; only the encrypted page is.
import { readFile, writeFile } from "node:fs/promises";
import { webcrypto as crypto } from "node:crypto";
import readline from "node:readline";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, "source", "hub.html");
const OUT = path.join(ROOT, "site", "index.html");
const ITERATIONS = 600000;

function askHidden(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    let muted = false;
    rl._writeToOutput = s => { if (!muted) rl.output.write(s); else if (s.includes("\n")) rl.output.write("\n"); };
    rl.question(question, answer => { rl.close(); resolve(answer); });
    muted = true;
  });
}

const b64 = buf => Buffer.from(buf).toString("base64");

async function main() {
  const html = await readFile(SRC, "utf8");
  let pw;
  for (;;) {
    pw = await askHidden("Team password (typing is hidden): ");
    if (pw.length < 8) { console.log("Use at least 8 characters.\n"); continue; }
    const again = await askHidden("Type it again: ");
    if (again !== pw) { console.log("Those didn't match. Try again.\n"); continue; }
    break;
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
    base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
  const data = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(html));

  const payload = JSON.stringify({ v: 1, iter: ITERATIONS, salt: b64(salt), iv: b64(iv), data: b64(data) });
  const gate = (await readFile(path.join(ROOT, "source", "gate.html"), "utf8")).replace("__PAYLOAD__", () => payload);
  await writeFile(OUT, gate);
  console.log("\nDone. site/index.html is locked with your password.");
  console.log("Upload everything inside the site folder to GitHub.");
  console.log("Teammates who ticked \"Remember me\" will be asked for the new password if it changed.");
}

main().catch(e => { console.error(e); process.exit(1); });
