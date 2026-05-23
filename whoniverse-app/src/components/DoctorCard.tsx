import Link from "next/link";
import type { Doctor } from "@/lib/doctors";
import { doctorSlug } from "./slugs";
import { imageFor } from "@/lib/images";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const slug = doctorSlug(doctor.number);
  const isSpecial = ["War", "Fugitive", "Curator", "Meta-Crisis"].includes(doctor.number);
  const accent = isSpecial ? "border-crimson/40" : "border-gallifrey/30";
  const img = imageFor(`doctor:${doctor.number}`);

  return (
    <Link href={`/doctor/${slug}/`} className="block group focus:outline-none focus:ring-2 focus:ring-gallifrey/40">
      <article className={`relative aspect-[2/3] overflow-hidden cover-card border ${accent} bg-gradient-to-b from-tardis/30 to-vortex/80 p-4 flex flex-col`}>
        {img ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={`${doctor.actor} as Doctor ${doctor.number}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vortex via-vortex/85 via-50% to-transparent" aria-hidden="true" />
          </>
        ) : (
          <div className="absolute inset-0 roundel-grid opacity-20 pointer-events-none" aria-hidden="true" />
        )}

        {/* Top: incarnation marker */}
        <div className="relative flex items-baseline justify-between">
          <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey">Incarnation</p>
          <span className="serif text-3xl text-gallifrey leading-none drop-shadow">{doctor.number}</span>
        </div>

        {/* Middle: actor + era */}
        <div className="relative mt-auto">
          <p className="type text-[9px] uppercase tracking-[0.3em] text-bone/70 mb-1">{doctor.era}</p>
          <h3 className="serif text-xl text-paper leading-tight drop-shadow">{doctor.actor}</h3>
          <p className="text-xs text-bone/80 mt-2 leading-snug line-clamp-2">{doctor.costumeHook}</p>
          {doctor.catchphrase && (
            <p className="serif italic text-signal/90 text-sm mt-2 line-clamp-2 drop-shadow">&ldquo;{doctor.catchphrase}&rdquo;</p>
          )}
        </div>

        {isSpecial && (
          <div className="absolute top-3 left-3">
            <span className="pill pill--crimson">Anomaly</span>
          </div>
        )}
      </article>
      <div className="mt-2.5">
        <p className="type text-[10px] uppercase tracking-[0.25em] text-bone/55">
          Doctor {doctor.number} &middot; {doctor.yearStart}{doctor.yearEnd !== doctor.yearStart ? `–${doctor.yearEnd === 2026 ? "present" : doctor.yearEnd}` : ""}
        </p>
        <p className="text-sm text-bone/70 mt-1 leading-snug line-clamp-3">{doctor.defining}</p>
      </div>
    </Link>
  );
}
