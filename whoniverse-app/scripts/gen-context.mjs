// Generates a compact whoniverse-context.json for the AI agent.
// Reads the TS data files via tsx (no compile step), strips long prose,
// emits a single JSON object the worker bakes into its system prompt.

import { writeFile } from 'node:fs/promises';
import { doctors }    from '../src/lib/doctors.ts';
import { companions } from '../src/lib/companions.ts';
import { monsters }   from '../src/lib/monsters.ts';
import { episodes }   from '../src/lib/episodes.ts';

const ctx = {
  generatedAt: new Date().toISOString(),
  doctors: doctors.map((d) => ({
    n: d.number, actor: d.actor, era: d.era,
    catchphrase: d.catchphrase ?? null,
    defining: d.defining,
    classic: d.classic,
  })),
  companions: companions.map((c) => ({
    name: c.name, actor: c.actor, doctors: c.doctors, era: c.era,
    origin: c.origin, fate: c.fate, iconic: c.iconic,
  })),
  monsters: monsters.map((m) => ({
    name: m.name, category: m.category, homeworld: m.homeworld ?? null,
    firstStory: m.firstStory, firstYear: m.firstYear, appearances: m.appearances,
    threatLevel: m.threatLevel, defeatedBy: m.defeatedBy ?? null,
  })),
  episodes: episodes.map((e) => ({
    title: e.title, year: e.year, doctor: e.doctor, format: e.format,
    monsters: e.monsters ?? [], companions: e.companions ?? [],
    significance: e.significance,
  })),
};

await writeFile('worker/whoniverse-context.json', JSON.stringify(ctx, null, 0));
console.log(`wrote worker/whoniverse-context.json: ${JSON.stringify(ctx).length.toLocaleString()} bytes`);
console.log(`  doctors=${ctx.doctors.length}  companions=${ctx.companions.length}  monsters=${ctx.monsters.length}  episodes=${ctx.episodes.length}`);
