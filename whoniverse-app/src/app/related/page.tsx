import { allTaggedWorks } from "@/lib/related";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Related — TARDIS Index File",
};

export default function RelatedPage() {
  const all = allTaggedWorks();
  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Related-Stories Engine</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">Similarity by Foe, Companion &amp; Era</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          Weighted Jaccard over shared monsters (1.6), shared companions (1.2),
          same Doctor (1.0), and decade proximity (0.4). Runs at build time;
          the static export ships the whole similarity graph.
        </p>

        <div className="mt-12 space-y-8">
          {all.map(({ work, neighbors }) => (
            <article key={work.slug} className="border border-tardisLt/25 bg-panel/30 p-5">
              <div className="flex items-baseline justify-between flex-wrap gap-3">
                <h3 className="serif text-xl text-paper">
                  <Link href={`/episode/${work.slug}/`} className="hover:text-gallifrey">
                    {work.title} <span className="text-bone/55">({work.year})</span>
                  </Link>
                </h3>
                <p className="type text-[10px] uppercase tracking-[0.25em] text-bone/55">Doctor {work.doctor}</p>
              </div>
              {neighbors.length === 0 ? (
                <p className="text-sm text-bone/55 mt-3 italic">No siblings in the indexed catalogue.</p>
              ) : (
                <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {neighbors.slice(0, 6).map((n) => (
                    <li key={n.slug} className="border border-gallifrey/15 px-3 py-2 bg-vortex/40">
                      <Link href={`/episode/${n.slug}/`} className="text-sm text-paper hover:text-gallifrey">
                        {n.work.title} <span className="text-bone/50">({n.work.year})</span>
                      </Link>
                      <p className="text-xs text-signal/80 mt-0.5">{n.why} · score {(n.score * 100).toFixed(0)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
