#!/usr/bin/env node
/**
 * Produces a portable copy of the static website in `fundacja/`:
 *   dist/fundacja-portable/      (folder copy, structure preserved)
 *   dist/fundacja-portable.zip   (archive, files at zip root)
 *
 * Node built-ins only. Run via: npm run package:portable
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO_ROOT = path.join(__dirname, '..');
const SOURCE_DIR = path.join(REPO_ROOT, 'fundacja');
const DIST_DIR = path.join(REPO_ROOT, 'dist');
const OUT_DIR = path.join(DIST_DIR, 'fundacja-portable');
const ZIP_PATH = path.join(DIST_DIR, 'fundacja-portable.zip');

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

// Recursively copy src -> dest, returns { copied, skipped }.
// Only regular files and directories are copied; anything else
// (symlinks, junctions, sockets, ...) is warned about and skipped.
function copyTree(src, dest) {
  const result = { copied: 0, skipped: 0 };
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      const sub = copyTree(from, to);
      result.copied += sub.copied;
      result.skipped += sub.skipped;
    } else if (entry.isFile()) {
      fs.copyFileSync(from, to);
      result.copied += 1;
    } else {
      console.warn(`WARNING: skipping non-regular entry (not copied): ${from}`);
      result.skipped += 1;
    }
  }
  return result;
}

// PowerShell single-quoted literal. Inside single quotes, PowerShell treats
// ' and the Unicode single-quote look-alikes (U+2018, U+2019, U+201A, U+201B)
// as quote characters, so each one is doubled.
function psQuote(value) {
  return `'${value.replace(/['\u2018\u2019\u201A\u201B]/g, (ch) => ch + ch)}'`;
}

function removeZipQuietly() {
  fs.rmSync(ZIP_PATH, { force: true });
}

// Returns true if a zip was created, false if skipped (zip tool missing).
function createZip() {
  if (process.platform === 'win32') {
    // Set-Location + pipeline of full paths avoids wildcard expansion of the
    // directory path (paths may contain [ ] * ? characters). Entries land at
    // the zip root because the files are added from inside OUT_DIR.
    const script = [
      "$ErrorActionPreference='Stop';",
      `Set-Location -LiteralPath ${psQuote(OUT_DIR)};`,
      'Compress-Archive',
      '-LiteralPath (Get-ChildItem -LiteralPath . -Force | Select-Object -ExpandProperty FullName)',
      `-DestinationPath ${psQuote(ZIP_PATH)} -Force`,
    ].join(' ');
    try {
      execFileSync('powershell', ['-NoProfile', '-Command', script], {
        stdio: 'inherit',
      });
      return true;
    } catch (err) {
      removeZipQuietly();
      fail(`Compress-Archive failed: ${err.message}`);
    }
  }

  try {
    // Run from inside OUT_DIR so archive entries sit at the zip root.
    execFileSync('zip', ['-r', ZIP_PATH, '.'], { cwd: OUT_DIR, stdio: 'inherit' });
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(
        'NOTE: `zip` not found on PATH (is it installed?). Skipping zip step. ' +
          `Folder copy is still available at ${OUT_DIR}`
      );
      return false;
    }
    removeZipQuietly();
    fail(`zip failed: ${err.message}`);
  }
}

function main() {
  const indexPath = path.join(SOURCE_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    fail(`missing ${indexPath}. Is the fundacja/ folder present and complete?`);
  }

  // Start from a clean slate so stale files never linger.
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.rmSync(ZIP_PATH, { force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });

  const { copied, skipped } = copyTree(SOURCE_DIR, OUT_DIR);

  const zipCreated = createZip();

  console.log('');
  console.log(`Files copied: ${copied}`);
  if (skipped > 0) {
    console.log(`Entries skipped (non-regular): ${skipped}`);
  }
  console.log(`Folder:       ${OUT_DIR}`);
  if (zipCreated) {
    console.log(`Zip:          ${ZIP_PATH}`);
  }
}

try {
  main();
} catch (err) {
  fail(err && err.message ? err.message : String(err));
}
