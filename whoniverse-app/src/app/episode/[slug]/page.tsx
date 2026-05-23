import { episodes } from "@/lib/episodes";
import { doctors } from "@/lib/doctors";
import { episodeSlug, doctorSlug } from "@/components/slugs";
import { relatedFor } from "@/lib/related";
import EpisodeCard from "@/components/EpisodeCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return episodes.map((e) => ({ slug: episodeSlug(e.title, e.year) }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = episodes.find((x) => episodeSlug(x.title, x.year) === params.slug);
  return { title: e ? `${e.title} (${e.year}) — TARDIS Index File` : "TARDIS Index File" };
}

export default function EpisodePage({ params }: { params: { slug: string } }) {
  const e = episodes.find((x) => episodeSlug(x.title, x.year) === params.slug);
  if (!e) notFound();
  const doctor = doctors.find((d) => d.number === e.doctor);
  const related = relatedFor(params.slug);

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">
          {e.format === "serial" ? "Classic Serial" : e.format === "special" ? "Special" : e.format === "minisode" ? "Minisode" : "Episode"} · {e.year}
        </p>
        <h1 className="serif text-4xl sm:text-5xl text-paper">
          <span className="regen-underline">{e.title}</span>
        </h1>
        {doctor && (
          <p className="type text-[11px] uppercase tracking-[0.3em] text-bone/60 mt-3">
            <Link href={`/doctor/${doctorSlug(doctor.number)}/`} className="hover:text-gallifrey">
              Doctor {doctor.number} · {doctor.actor}
            </Link>
            {e.partsOrLength ? ` · ${e.partsOrLength}` : ""}
          </p>
        )}

        <p className="serif text-lg text-bone/90 mt-8 leading-relaxed max-w-prose drop-cap">{e.blurb}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-gallifrey/30 bg-panel/40 p-4">
            <p className="type text-[10px] uppercase tracking-[0.25em] text-gallifrey/80">Significance</p>
            <p className="text-sm text-bone/85 mt-2 leading-snug">{e.significance}</p>
          </div>
          {e.monsters && e.monsters.length > 0 && (
            <div className="border border-crimson/30 bg-panel/40 p-4">
              <p className="type text-[10px] uppercase tracking-[0.25em] text-crimson/85">Foes</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {e.monsters.map((m) => <span key={m} className="pill pill--crimson">{m}</span>)}
              </div>
            </div>
          )}
          {e.companions && e.companions.length > 0 && (
            <div className="border border-signal/30 bg-panel/40 p-4">
              <p className="type text-[10px] uppercase tracking-[0.25em] text-signal/85">Companions</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {e.companions.map((c) => <span key={c} className="pill pill--signal">{c}</span>)}
              </div>
            </div>
          )}
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-5">If you liked this, the engine suggests…</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-10">
              {related.slice(0, 8).map((r) => {
                const ep = episodes.find((x) => episodeSlug(x.title, x.year) === r.slug);
                if (!ep) return null;
                return (
                  <div key={r.slug}>
                    <EpisodeCard episode={ep} />
                    <p className="mt-1 type text-[10px] uppercase tracking-[0.2em] text-signal/80">
                      {r.why}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
