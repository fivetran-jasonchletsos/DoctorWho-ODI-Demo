import Link from "next/link";
import type { Episode } from "@/lib/episodes";
import { episodeSlug } from "./slugs";

const FORMAT_LABEL: Record<Episode["format"], string> = {
  serial: "Classic Serial",
  episode: "Episode",
  special: "Special",
  minisode: "Minisode",
};

export default function EpisodeCard({ episode }: { episode: Episode }) {
  const slug = episodeSlug(episode.title, episode.year);

  return (
    <Link href={`/episode/${slug}/`} className="block group focus:outline-none focus:ring-2 focus:ring-gallifrey/40">
      <article>
        <div className="aspect-[2/3] relative overflow-hidden cover-card border border-tardis/40 bg-gradient-to-br from-panel via-vortex to-nebula p-4 flex flex-col">
          <div className="absolute inset-0 roundel-grid opacity-15 pointer-events-none" aria-hidden="true" />
          <div className="relative flex items-baseline justify-between">
            <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80">
              {FORMAT_LABEL[episode.format]}
            </p>
            <span className="serif text-2xl text-gold leading-none">{episode.year}</span>
          </div>
          <div className="relative mt-auto">
            <p className="type text-[9px] uppercase tracking-[0.3em] text-signal/80 mb-1">Doctor {episode.doctor}</p>
            <h3 className="serif text-lg text-paper leading-tight line-clamp-3">{episode.title}</h3>
            {episode.partsOrLength && (
              <p className="type text-[10px] text-bone/60 mt-1">{episode.partsOrLength}</p>
            )}
          </div>
          {episode.iconic && (
            <div className="absolute top-3 right-3">
              <span className="pill pill--gold">Canon-Anchor</span>
            </div>
          )}
        </div>
        <div className="mt-2.5">
          <p className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 mt-1">
            {episode.significance}
          </p>
          <p className="text-sm text-bone/70 mt-2 leading-snug line-clamp-3">{episode.blurb}</p>
        </div>
      </article>
    </Link>
  );
}
