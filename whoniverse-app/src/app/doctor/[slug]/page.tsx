import { doctors } from "@/lib/doctors";
import { episodes } from "@/lib/episodes";
import { companions } from "@/lib/companions";
import EpisodeCard from "@/components/EpisodeCard";
import { doctorSlug } from "@/components/slugs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: doctorSlug(d.number) }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = doctors.find((x) => doctorSlug(x.number) === params.slug);
  return { title: d ? `Doctor ${d.number} (${d.actor}) — TARDIS Index File` : "TARDIS Index File" };
}

export default function DoctorPage({ params }: { params: { slug: string } }) {
  const d = doctors.find((x) => doctorSlug(x.number) === params.slug);
  if (!d) notFound();

  const eps = episodes.filter((e) => e.doctor === d.number).sort((a, b) => a.year - b.year);
  const comps = companions.filter((c) => c.doctors.includes(d.number));

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Incarnation {d.number}</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper">
          <span className="regen-underline">{d.actor}</span>
        </h1>
        <p className="type text-[11px] uppercase tracking-[0.3em] text-bone/60 mt-3">{d.era}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border border-tardisLt/30 bg-panel/40 p-4">
            <p className="type text-[10px] uppercase tracking-[0.25em] text-gallifrey/80">Costume</p>
            <p className="text-sm text-bone/85 mt-2 leading-snug">{d.costumeHook}</p>
          </div>
          {d.catchphrase && (
            <div className="border border-tardisLt/30 bg-panel/40 p-4">
              <p className="type text-[10px] uppercase tracking-[0.25em] text-gallifrey/80">Catchphrase</p>
              <p className="text-sm text-signal/85 mt-2 italic serif">&ldquo;{d.catchphrase}&rdquo;</p>
            </div>
          )}
          <div className="border border-tardisLt/30 bg-panel/40 p-4">
            <p className="type text-[10px] uppercase tracking-[0.25em] text-gallifrey/80">Defining Moment</p>
            <p className="text-sm text-bone/85 mt-2 leading-snug">{d.defining}</p>
          </div>
        </div>

        <p className="serif text-lg text-bone/90 mt-8 leading-relaxed max-w-prose drop-cap">{d.blurb}</p>

        {d.tardisQuirk && (
          <p className="mt-6 text-sm text-bone/75 italic max-w-prose">
            <span className="type uppercase tracking-[0.2em] text-[10px] text-gallifrey/80 mr-1">TARDIS quirk.</span>
            {d.tardisQuirk}
          </p>
        )}

        {comps.length > 0 && (
          <section className="mt-12">
            <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-4">Travelled with</h2>
            <div className="flex flex-wrap gap-2">
              {comps.map((c) => (
                <span key={c.name} className={`pill ${c.iconic ? "pill--gold" : ""}`}>{c.name}</span>
              ))}
            </div>
          </section>
        )}

        {eps.length > 0 && (
          <section className="mt-12">
            <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-5">Indexed Stories ({eps.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-10">
              {eps.map((e) => <EpisodeCard key={`${e.title}-${e.year}`} episode={e} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
