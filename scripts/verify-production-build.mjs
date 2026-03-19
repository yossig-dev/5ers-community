#!/usr/bin/env node
/**
 * Production build verification script.
 * Run before deploy or in CI to catch errors like:
 *   - "Cannot find module './vendor-chunks/next.js'"
 *   - "Cannot find module './611.js'"
 * 1. Cleans .next for a fresh build
 * 2. Runs next build
 * 3. Verifies build artifacts exist
 * 4. Starts the production server briefly and requests a page (catches runtime module errors)
 */
import { rmSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { execSync, spawn } from "child_process";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");
const nextDir = join(root, ".next");
// Use a random port to avoid EADDRINUSE when 3000 is already in use (e.g. dev server)
const isWin = process.platform === "win32";
const PORT = process.env.PORT || String(30000 + Math.floor(Math.random() * 1000));
const SERVER_START_TIMEOUT_MS = 25000;
const POLL_MS = 500;

function log(msg) {
  console.log(`[verify-build] ${msg}`);
}

function die(msg) {
  console.error(`[verify-build] ERROR: ${msg}`);
  process.exit(1);
}

// 1. Clean .next for a reproducible build (avoids stale chunk / module errors)
if (existsSync(nextDir)) {
  log("Cleaning .next for fresh build...");
  rmSync(nextDir, { recursive: true });
}

// 2. Run production build
log("Running next build...");
try {
  execSync("npx next build", {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, CI: "true" },
  });
} catch (e) {
  die("Build failed. Fix the errors above before deploying.");
}

// 3. Sanity check: key build artifacts exist
const checks = [
  [join(nextDir, "server"), "Server build output"],
  [join(nextDir, "static"), "Static assets"],
];
for (const [path, label] of checks) {
  if (!existsSync(path)) {
    die(`${label} missing at ${path} – build may be broken.`);
  }
}

// 4. Start production server and request a page to catch runtime module errors (e.g. missing 611.js)
log("Starting production server to verify no runtime module errors...");
const server = spawn(`npx next start -p ${PORT}`, {
  cwd: root,
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, NODE_ENV: "production" },
  shell: true,
});

let resolved = false;
function finish(success, msg) {
  if (resolved) return;
  resolved = true;
  try {
    server.kill(isWin ? "SIGKILL" : "SIGTERM");
  } catch (_) {}
  if (success) {
    log("Production build verified successfully.");
    process.exit(0);
  } else {
    die(msg || "Server failed to start or returned an error.");
  }
}

let stderr = "";
server.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
});
server.stdout.on("data", (chunk) => {
  const s = chunk.toString();
  if (s.includes("Error:") || s.includes("Cannot find module")) {
    stderr += s;
  }
});

server.on("error", (err) => {
  finish(false, `Failed to start server: ${err.message}`);
});

server.on("exit", (code, signal) => {
  if (resolved) return;
  if (code !== 0 && code !== null) {
    const excerpt = stderr.slice(-800);
    finish(false, `Server exited with code ${code}. ${excerpt ? "\nLast stderr:\n" + excerpt : ""}`);
  }
});

const start = Date.now();
async function poll() {
  if (resolved) return;
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/`);
    if (res.ok) {
      finish(true);
      return;
    }
  } catch (_) {}
  if (Date.now() - start > SERVER_START_TIMEOUT_MS) {
    finish(false, "Server did not respond in time. Possible runtime module error – check server logs.");
    return;
  }
  setTimeout(poll, POLL_MS);
}
setTimeout(poll, 2000);
