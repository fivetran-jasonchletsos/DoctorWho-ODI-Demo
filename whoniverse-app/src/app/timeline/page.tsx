import { doctors } from "@/lib/doctors";
import { episodes } from "@/lib/episodes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline — TARDIS Index File",
};

export default function TimelinePage() {
  const yearStart = Math.min(...doctors.map((d) => d.yearStart));
  const yearEnd = 2026;
  const years = [];
  for (let y = yearStart; y <= yearEnd; y++) years.push(y);

  // Doctors active in each year (yearStart inclusive, yearEnd inclusive)
  const doctorsByYear = (y: number) =>
    doctors.filter((d) => d.yearStart <= y && d.yearEnd >= y && !["Curator", "Meta-Crisis", "Fugitive"].includes(d.number));
  const episodesByYear = (y: number) => episodes.filter((e) => e.year === y);

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Timeline</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">{yearStart}–present</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          {yearEnd - yearStart} years of one show. The wilderness years (1990–2004) are the
          gap nobody talks about — but the books, audios, comics, and the McGann TV movie
          fill it. We mark them here.
        </p>

        <div className="mt-12 relative">
          {/* Spine */}
          <div className="absolute left-[6.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-gallifrey/60 via-tardisLt/40 to-vortexBl/0" aria-hidden="true" />

          {years.map((y) => {
            const ds = doctorsByYear(y);
            const eps = episodesByYear(y);
            const wilderness = y >= 1990 && y <= 2004 && ds.length === 0;
            if (ds.length === 0 && eps.length === 0 && !wilderness) return null;
            return (
              <div key={y} className="relative flex items-start gap-6 pb-6">
                <div className="w-24 flex-shrink-0 text-right">
                  <span className="serif text-xl text-gallifrey">{y}</span>
                </div>
                <span className={`mt-2 flex-shrink-0 w-3 h-3 rounded-full border ${wilderness ? "bg-vortex border-crimson/60" : "bg-gallifrey border-gallifrey"}`} aria-hidden="true" />
                <div className="flex-1 pt-1">
                  {wilderness && (
                    <p className="text-sm italic text-crimson/85">Wilderness year — no TV, but the novels, comics and audios kept going.</p>
                  )}
                  {ds.length > 0 && (
                    <p className="text-sm text-paper">
                      <span className="type uppercase tracking-[0.25em] text-[10px] text-bone/60 mr-1.5">Active:</span>
                      {ds.map((d) => `${d.number} (${d.actor})`).join(" · ")}
                    </p>
                  )}
                  {eps.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {eps.map((e) => (
                        <li key={e.title} className="text-sm text-bone/80">
                          <span className="text-signal/85">{e.title}</span>
                          <span className="text-bone/50 text-xs ml-2">— {e.significance}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
