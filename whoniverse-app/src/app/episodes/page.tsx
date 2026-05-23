import EpisodeCard from "@/components/EpisodeCard";
import { episodes } from "@/lib/episodes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Episodes — TARDIS Index File",
};

export default function EpisodesPage() {
  const byDecade = new Map<number, typeof episodes>();
  for (const e of episodes) {
    const d = Math.floor(e.year / 10) * 10;
    if (!byDecade.has(d)) byDecade.set(d, []);
    byDecade.get(d)!.push(e);
  }
  const decades = Array.from(byDecade.keys()).sort();

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Episodes</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">The Stories</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          Curated subset of {episodes.length} stories — every load-bearing serial from the
          classic era, every essential modern episode. Don&apos;t expect a full season-by-season
          index; expect the ones a fan would actually rewatch.
        </p>

        {decades.map((d) => {
          const list = (byDecade.get(d) || []).sort((a, b) => a.year - b.year);
          return (
            <section key={d} className="mt-14">
              <h2 className="type text-[11px] uppercase tracking-[0.4em] text-bone/65 mb-5">
                {d}s · {list.length} stor{list.length === 1 ? "y" : "ies"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
                {list.map((e) => <EpisodeCard key={`${e.title}-${e.year}`} episode={e} />)}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
