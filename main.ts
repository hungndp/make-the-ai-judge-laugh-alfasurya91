// Make the AI Judge Laugh — u-alfasurya91-make-the-ai-judge-laugh-6ed40225
// One line about office life, under 200 characters.
// Writes the joke to /output/entry.txt. Deterministic, no network, no input.
//
// Winner-shape (office-joke family, u-pucuys post-mortem): one concrete incident
// + a specific prop + escalation + a second surprise that REFRAMES the setup,
// twist word last, stop at the landing. Here the mundane prop is the quiet room:
// booked as an escape from meetings, it has itself become a meeting.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The setup: a concrete incident anyone who works in an office recognises.
const SETUP =
  "I booked the quiet room to escape my back-to-back meetings";

// The reframe: the escape itself has been captured — the quiet room is now
// a recurring meeting, and its name says the whole joke. Twist word last.
const PUNCH =
  "it's now booked solid by a recurring meeting called 'Quiet Room Booking Sync'.";

const JOKE = buildEntry(SETUP, PUNCH);

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// Join setup and punch with an em dash and enforce the gate up front:
// one line, 1-200 characters, no trailing newline in the file.
function buildEntry(setup: string, punch: string): string {
  const line = `${setup} — ${punch}`;
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  return line;
}

// The grader runs as uid 65534 on a read-only filesystem with /output
// writable but its parent not writable: never delete the output dir itself,
// only clear its contents, then write into it.
function clearOutputDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  clearOutputDir(OUT_DIR);
  writeFileSync(OUT_FILE, JOKE, "utf8");
}

main();
