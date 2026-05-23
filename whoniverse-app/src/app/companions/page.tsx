import { companions } from "@/lib/companions";
import { companionSlug } from "@/components/slugs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Companions — TARDIS Index File",
};

export default function CompanionsPage() {
  const sorted = [...companions].sort((a, b) => a.yearStart - b.yearStart);

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Companions</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">The Crew</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          Everyone the Doctor has taken seriously enough to bring on board for a sustained run.
          The school teachers from 1963. The Time Lady from Gallifrey. The nurse from Croydon. UNIT.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((c) => (
            <article key={companionSlug(c.name)} className={`relative overflow-hidden border ${c.iconic ? "border-gallifrey/40" : "border-tardisLt/30"} bg-panel/40 p-5`}>
              <div className="absolute inset-0 roundel-grid opacity-15 pointer-events-none" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80">{c.era}</p>
                  <p className="type text-[10px] text-bone/65">Doctor {c.doctors.join(", ")}</p>
                </div>
                <h3 className="serif text-xl text-paper mt-1 leading-tight">
                  {c.name}{c.iconic && <span className="ml-2 align-middle inline-block"><span className="pill pill--gold">Iconic</span></span>}
                </h3>
                <p className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 mt-0.5">{c.actor}</p>
                <p className="text-sm text-bone/80 mt-3 leading-snug">
                  <span className="text-signal/90 text-[11px] uppercase tracking-[0.2em] type mr-1">Origin.</span>
                  {c.origin}
                </p>
                <p className="text-sm text-bone/80 mt-2 leading-snug">
                  <span className="text-crimson text-[11px] uppercase tracking-[0.2em] type mr-1">Fate.</span>
                  {c.fate}
                </p>
                <p className="text-sm text-bone/75 mt-3 leading-snug italic">{c.blurb}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-16 text-xs type uppercase tracking-[0.25em] text-bone/50">
          {companions.length} entries · sourced from Wikidata + TARDIS Wiki
        </p>
      </div>
    </main>
  );
}
