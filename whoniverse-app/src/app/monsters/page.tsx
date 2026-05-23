import { monsters } from "@/lib/monsters";
import { monsterSlug } from "@/components/slugs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monsters — TARDIS Index File",
};

const THREAT_BARS = (n: number) =>
  Array.from({ length: 5 }, (_, i) => i < n);

export default function MonstersPage() {
  const sorted = [...monsters].sort((a, b) => b.appearances - a.appearances);

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-crimson mb-3">Rogues&apos; Gallery</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">Monsters &amp; Recurring Foes</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          Pepperpots from Skaro. Cyber-converted Mondasians. Stone angels you mustn&apos;t blink at.
          The chained jackal-god under the Pyramid of Mars. The Master, in whatever face this week.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((m) => (
            <article key={monsterSlug(m.name)} className={`relative overflow-hidden border ${m.iconic ? "border-crimson/45" : "border-tardisLt/30"} bg-panel/40 p-5`}>
              <div className="absolute inset-0 roundel-grid opacity-15 pointer-events-none" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80">{m.category}</p>
                  <p className="type text-[10px] text-bone/60">{m.appearances}+ stories</p>
                </div>
                <h3 className="serif text-xl text-paper mt-1 leading-tight">{m.name}</h3>
                <p className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 mt-0.5">
                  Debut: {m.firstStory} ({m.firstYear}){m.homeworld ? ` · ${m.homeworld}` : ""}
                </p>
                <div className="mt-3 flex items-center gap-1.5" aria-label={`Threat level ${m.threatLevel} of 5`}>
                  <span className="type text-[9px] uppercase tracking-[0.25em] text-bone/55 mr-1">Threat</span>
                  {THREAT_BARS(m.threatLevel).map((on, i) => (
                    <span key={i} className={`w-5 h-1.5 ${on ? "bg-crimson" : "bg-tardisLt/20"}`} />
                  ))}
                </div>
                <p className="text-sm text-bone/85 mt-3 leading-snug">
                  <span className="text-signal/90 text-[11px] uppercase tracking-[0.2em] type mr-1">Signature.</span>
                  {m.signature}
                </p>
                <p className="text-sm text-bone/75 mt-2 leading-snug">{m.blurb}</p>
                {m.defeatedBy && (
                  <p className="text-xs text-gallifrey/85 mt-3 leading-snug">
                    <span className="type uppercase tracking-[0.2em] text-[9px] mr-1">Weakness.</span>
                    {m.defeatedBy}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-16 text-xs type uppercase tracking-[0.25em] text-bone/50">
          {monsters.length} entries · Wikidata fct_appearance feeds the counts in production ingest
        </p>
      </div>
    </main>
  );
}
