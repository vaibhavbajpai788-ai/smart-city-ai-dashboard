// Smart City AI daily snapshot refresh. Deterministic by UTC date; no external API or secret required.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const snapshotPath = resolve(root, "client/src/data/daily-snapshot.json");
const requestedDate = process.env.SNAPSHOT_DATE || new Date().toISOString().slice(0, 10);

function hashDate(date) {
  return [...date].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7);
}

const seed = hashDate(requestedDate);
const change = (index, range) => ((seed >>> (index * 3)) % (range * 2 + 1)) - range;
const previous = JSON.parse(await readFile(snapshotPath, "utf8"));
const junctions = previous.junctions.map((junction, index) => {
  const density = Math.max(8, Math.min(96, junction.density + change(index, 7)));
  const state = index === 0 ? (seed % 5 === 0 ? "YELLOW" : "RED") : index === 1 ? "GREEN" : index === 2 ? "YELLOW" : "RED";
  const traffic = density >= 70 ? "High" : density >= 40 ? "Medium" : "Low";
  return { ...junction, density, traffic, state, remaining: Math.max(3, junction.remaining + change(index + 1, 5)) };
});
const averageDensity = Math.round(junctions.reduce((total, junction) => total + junction.density, 0) / junctions.length);
const snapshot = {
  date: requestedDate,
  generatedAt: new Date().toISOString(),
  summary: {
    activeIncidents: 3 + (seed % 3),
    monitoredJunctions: 42 + (seed % 4),
    congestionRisk: Math.max(9, Math.min(91, averageDensity - 35)),
    aiRecommendations: 5 + (seed % 5)
  },
  junctions
};

await mkdir(dirname(snapshotPath), { recursive: true });
await writeFile(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Updated daily snapshot for ${requestedDate}`);
