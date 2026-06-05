import { doctors } from "@/lib/doctors";
import { companions } from "@/lib/companions";
import { monsters } from "@/lib/monsters";
import { episodes } from "@/lib/episodes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics — TARDIS Index File",
};

// Pre-computed stats from the indexed corpus. Charts are hand-rolled
// SVG — no chart-lib dependency, so the static export stays tiny and
// the colour palette stays exactly on-brand.

const COLORS = {
  tardis: "#1a3a6e",
  tardisLt: "#3a6db0",
  gold: "#d4a017",
  goldBright: "#ffb945",
  signal: "#5dd4d4",
  crimson: "#a4243b",
  bone: "#cfc7b1",
  vortex: "#05060d",
  panel: "#0f1f3a",
};

export default function AnalyticsPage() {
  // 1. Episodes per decade
  const decadeMap = new Map<number, number>();
  for (const e of episodes) {
    const d = Math.floor(e.year / 10) * 10;
    decadeMap.set(d, (decadeMap.get(d) ?? 0) + 1);
  }
  const decades = [...decadeMap.entries()].sort(([a], [b]) => a - b);
  const maxDecade = Math.max(...decades.map(([, c]) => c));

  // 2. Stories per Doctor
  const doctorMap = new Map<string, number>();
  for (const e of episodes) doctorMap.set(e.doctor, (doctorMap.get(e.doctor) ?? 0) + 1);
  const orderedDoctors = doctors
    .filter((d) => doctorMap.has(d.number))
    .sort((a, b) => doctorOrder(a.number) - doctorOrder(b.number));
  const maxDoctorEpisodes = Math.max(...orderedDoctors.map((d) => doctorMap.get(d.number) ?? 0));

  // 3. Companions per Doctor (count of distinct companions whose tenure overlaps)
  const compPerDoctor = new Map<string, number>();
  for (const c of companions) for (const d of c.doctors) compPerDoctor.set(d, (compPerDoctor.get(d) ?? 0) + 1);
  const compOrderedDoctors = doctors
    .filter((d) => compPerDoctor.has(d.number))
    .sort((a, b) => doctorOrder(a.number) - doctorOrder(b.number));
  const maxComps = Math.max(...compOrderedDoctors.map((d) => compPerDoctor.get(d.number) ?? 0));

  // 4. Monster threat-level distribution
  const threatBuckets = [0, 0, 0, 0, 0];
  for (const m of monsters) threatBuckets[m.threatLevel - 1]++;

  // 5. Doctor tenure (years on-screen) bar
  const tenures = doctors
    .filter((d) => !["Curator", "Meta-Crisis", "Fugitive", "War"].includes(d.number))
    .sort((a, b) => doctorOrder(a.number) - doctorOrder(b.number))
    .map((d) => ({
      doctor: d,
      years: Math.max(1, d.yearEnd - d.yearStart + 1),
    }));
  const maxTenure = Math.max(...tenures.map((t) => t.years));

  // 6. Most-cross-decade monsters (appears in multiple decades)
  const monsterDecades = new Map<string, Set<number>>();
  for (const e of episodes) {
    const dec = Math.floor(e.year / 10) * 10;
    for (const m of e.monsters ?? []) {
      if (!monsterDecades.has(m)) monsterDecades.set(m, new Set());
      monsterDecades.get(m)!.add(dec);
    }
  }
  const crossDecade = [...monsterDecades.entries()]
    .map(([name, set]) => ({ name, decades: set.size, list: [...set].sort() }))
    .sort((a, b) => b.decades - a.decades)
    .slice(0, 8);

  // 7. Headline stats
  const totalYears = Math.max(...doctors.map((d) => d.yearEnd)) - Math.min(...doctors.map((d) => d.yearStart)) + 1;
  const iconicCompCount = companions.filter((c) => c.iconic).length;
  const iconicMonsterCount = monsters.filter((m) => m.iconic).length;

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Analytics</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">Whoniverse, by the numbers</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          {totalYears} years of one show, indexed and counted. Powered by the same gold-layer joins the run-time agents read.
        </p>

        {/* Headline KPI strip */}
        <section className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Kpi value={doctors.length}    label="Indexed Doctors" />
          <Kpi value={companions.length} label="Companions" />
          <Kpi value={monsters.length}   label="Recurring foes" />
          <Kpi value={episodes.length}   label="Stories indexed" />
          <Kpi value={iconicCompCount}   label="Iconic companions" />
          <Kpi value={iconicMonsterCount} label="Iconic monsters" />
        </section>

        {/* Episodes per decade */}
        <Chart title="Stories per decade" sub="A spike at 2005 (the revival) and another at the current run.">
          <svg viewBox="0 0 760 260" className="w-full h-auto" aria-label="Stories per decade">
            <Grid />
            {decades.map(([dec, count], i) => {
              const x = 50 + i * ((760 - 70) / decades.length);
              const w = (760 - 70) / decades.length - 12;
              const h = (count / maxDecade) * 180;
              const y = 220 - h;
              return (
                <g key={dec}>
                  <rect x={x} y={y} width={w} height={h} fill={COLORS.tardisLt} stroke={COLORS.gold} strokeWidth="0.6" />
                  <text x={x + w / 2} y={y - 6} textAnchor="middle" fontSize="11" fill={COLORS.bone} fontFamily="JetBrains Mono">{count}</text>
                  <text x={x + w / 2} y={245} textAnchor="middle" fontSize="11" fill={COLORS.bone} fontFamily="JetBrains Mono">{dec}s</text>
                </g>
              );
            })}
          </svg>
        </Chart>

        {/* Stories per Doctor */}
        <Chart title="Stories per Doctor" sub="Tom Baker reigns by serial count; Tennant by episode count; modern Doctors have shorter tenures.">
          <svg viewBox="0 0 760 360" className="w-full h-auto" aria-label="Stories per Doctor">
            <Grid horizontal />
            {orderedDoctors.map((d, i) => {
              const count = doctorMap.get(d.number) ?? 0;
              const y = 30 + i * ((360 - 50) / orderedDoctors.length);
              const h = (360 - 50) / orderedDoctors.length - 4;
              const w = (count / maxDoctorEpisodes) * (760 - 200);
              return (
                <g key={d.number}>
                  <rect x={180} y={y} width={w} height={h} fill={d.classic ? COLORS.gold : COLORS.tardisLt} stroke={COLORS.signal} strokeWidth="0.4" />
                  <text x={170} y={y + h / 2 + 4} textAnchor="end" fontSize="11" fill={COLORS.bone} fontFamily="Cinzel">
                    {d.number}. {d.actor.split(" ").slice(-1)[0]}
                  </text>
                  <text x={180 + w + 6} y={y + h / 2 + 4} fontSize="11" fill={COLORS.goldBright} fontFamily="JetBrains Mono">{count}</text>
                </g>
              );
            })}
            <text x={180} y={20} fontSize="10" fill={COLORS.bone} fontFamily="Orbitron, monospace" letterSpacing="2">CLASSIC = GOLD &nbsp; · &nbsp; MODERN = BLUE</text>
          </svg>
        </Chart>

        {/* Companions per Doctor */}
        <Chart title="Companions per Doctor" sub="Whittaker's TARDIS team was the largest. Hartnell, Davison and the modern revival each pushed the count.">
          <svg viewBox="0 0 760 360" className="w-full h-auto" aria-label="Companions per Doctor">
            <Grid horizontal />
            {compOrderedDoctors.map((d, i) => {
              const count = compPerDoctor.get(d.number) ?? 0;
              const y = 30 + i * ((360 - 50) / compOrderedDoctors.length);
              const h = (360 - 50) / compOrderedDoctors.length - 4;
              const w = (count / maxComps) * (760 - 200);
              return (
                <g key={d.number}>
                  <rect x={180} y={y} width={w} height={h} fill={COLORS.signal} fillOpacity="0.75" stroke={COLORS.gold} strokeWidth="0.4" />
                  <text x={170} y={y + h / 2 + 4} textAnchor="end" fontSize="11" fill={COLORS.bone} fontFamily="Cinzel">
                    {d.number}. {d.actor.split(" ").slice(-1)[0]}
                  </text>
                  <text x={180 + w + 6} y={y + h / 2 + 4} fontSize="11" fill={COLORS.signal} fontFamily="JetBrains Mono">{count}</text>
                </g>
              );
            })}
          </svg>
        </Chart>

        {/* Threat-level distribution */}
        <Chart title="Monster threat-level distribution" sub="Five is end-of-the-universe stuff. One is a pleasant Sunday with Strax.">
          <svg viewBox="0 0 760 220" className="w-full h-auto" aria-label="Threat level distribution">
            <Grid />
            {threatBuckets.map((n, i) => {
              const x = 60 + i * 140;
              const h = (n / Math.max(...threatBuckets)) * 140;
              const y = 180 - h;
              const colorScale = [COLORS.tardisLt, COLORS.signal, COLORS.gold, COLORS.goldBright, COLORS.crimson];
              return (
                <g key={i}>
                  <rect x={x} y={y} width={100} height={h} fill={colorScale[i]} stroke={COLORS.gold} strokeWidth="0.4" />
                  <text x={x + 50} y={y - 6} textAnchor="middle" fontSize="13" fill={COLORS.bone} fontFamily="JetBrains Mono">{n}</text>
                  <text x={x + 50} y={205} textAnchor="middle" fontSize="11" fill={COLORS.bone} fontFamily="Orbitron, monospace" letterSpacing="2">THREAT {i + 1}</text>
                </g>
              );
            })}
          </svg>
        </Chart>

        {/* Doctor tenure */}
        <Chart title="Doctor tenure (years on-screen)" sub="Tom Baker's 7-year run is unbeaten. Modern Doctors hand over after 3.">
          <svg viewBox="0 0 760 360" className="w-full h-auto" aria-label="Doctor tenure">
            <Grid horizontal />
            {tenures.map((t, i) => {
              const y = 30 + i * ((360 - 50) / tenures.length);
              const h = (360 - 50) / tenures.length - 4;
              const w = (t.years / maxTenure) * (760 - 200);
              return (
                <g key={t.doctor.number}>
                  <rect x={180} y={y} width={w} height={h} fill={t.doctor.classic ? COLORS.gold : COLORS.tardisLt} stroke={COLORS.signal} strokeWidth="0.4" />
                  <text x={170} y={y + h / 2 + 4} textAnchor="end" fontSize="11" fill={COLORS.bone} fontFamily="Cinzel">
                    {t.doctor.number}. {t.doctor.actor.split(" ").slice(-1)[0]}
                  </text>
                  <text x={180 + w + 6} y={y + h / 2 + 4} fontSize="11" fill={COLORS.goldBright} fontFamily="JetBrains Mono">{t.years} yr</text>
                </g>
              );
            })}
          </svg>
        </Chart>

        {/* Cross-decade monsters */}
        <Chart title="Monsters spanning the most decades" sub="The pepperpots win, of course. Cybermen and the Master right behind.">
          <div className="space-y-2">
            {crossDecade.map((m) => (
              <div key={m.name} className="flex items-baseline gap-4 border-b border-gallifrey/15 pb-2">
                <p className="serif text-lg text-paper flex-1">{m.name}</p>
                <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey">{m.decades} decade{m.decades === 1 ? "" : "s"}</p>
                <p className="type text-[10px] text-bone/60 font-mono">{m.list.map((d) => `${d}s`).join(" · ")}</p>
              </div>
            ))}
          </div>
        </Chart>

        <p className="mt-12 text-xs type uppercase tracking-[0.25em] text-bone/50">
          All stats computed at build time from gold.fct_appearance + gold.dim_* . In production these
          would be a dbt Semantic Layer cube; here they&apos;re plain TypeScript reductions.
        </p>
      </div>
    </main>
  );
}

function doctorOrder(n: string): number {
  if (n === "War") return 8.5;
  if (n === "Fugitive") return 0.5;
  if (n === "Curator") return 99;
  if (n === "Meta-Crisis") return 10.3;
  return parseInt(n, 10);
}

function Kpi({ value, label }: { value: number; label: string }) {
  return (
    <div className="border border-gallifrey/30 bg-panel/40 p-4">
      <p className="serif text-3xl text-gallifrey">{value}</p>
      <p className="type text-[9px] uppercase tracking-[0.28em] text-bone/60 mt-1">{label}</p>
    </div>
  );
}

function Chart({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="serif text-2xl text-paper">{title}</h2>
      {sub && <p className="serif italic text-bone/60 mt-1 max-w-2xl">{sub}</p>}
      <div className="mt-5 border border-tardisLt/25 bg-panel/30 p-4 sm:p-6 rounded-sm">{children}</div>
    </section>
  );
}

function Grid({ horizontal = false }: { horizontal?: boolean }) {
  if (horizontal) {
    return (
      <g opacity="0.12">
        {[0.25, 0.5, 0.75].map((p) => (
          <line key={p} x1={180 + p * (760 - 200)} x2={180 + p * (760 - 200)} y1={20} y2={355} stroke="#5dd4d4" strokeWidth="0.4" />
        ))}
      </g>
    );
  }
  return (
    <g opacity="0.12">
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1={40} x2={755} y1={220 - y * 0.7} y2={220 - y * 0.7} stroke="#5dd4d4" strokeWidth="0.4" />
      ))}
    </g>
  );
}
