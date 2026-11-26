// SPDX-License-Identifier: MIT
// Rejected Olympic Sports — one line, written to /output/entry.txt.
// Chosen line (version A, picked by the specialist): parallel
// parking as a judged Olympic event. The sport is real enough to broadcast
// (a marked bay, judges, scored criteria) and the laugh is the last clause:
// keeping a straight face while the judges score you on not crying.
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";

const rejectedSport =
  "Competitive Parallel Parking: drivers must park in a space exactly 10 cm longer than the car, judged on kerb distance, mirror use, and not crying.";

const charLimit = 200;
const size = [...rejectedSport].length;
if (size < 1 || size > charLimit) {
  throw new Error(`entry must be 1-${charLimit} characters, got ${size}`);
}
if (/[\r\n]/.test(rejectedSport)) {
  throw new Error("entry must be a single line");
}
if (rejectedSport !== rejectedSport.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outputPath = `${outputDir}/entry.txt`;
writeFileSync(outputPath, rejectedSport, "utf8");
chmodSync(outputPath, 0o644);

// Round-trip: what the grader reads must be byte-for-byte the line above.
const written = readFileSync(outputPath, "utf8");
if (written !== rejectedSport) {
  throw new Error("entry.txt does not match the entry line");
}
