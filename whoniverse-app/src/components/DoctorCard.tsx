import Link from "next/link";
import type { Doctor } from "@/lib/doctors";
import { doctorSlug } from "./slugs";

// Doctors don't have book covers; they have actor portraits we don't ship.
// The card is a designed panel — number, actor, era, costume hook — styled
// to look like a Time Lord registry entry.

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const slug = doctorSlug(doctor.number);
  const isSpecial = ["War", "Fugitive", "Curator", "Meta-Crisis"].includes(doctor.number);
  const accent = isSpecial ? "border-crimson/40 from-crimson/20" : "border-gallifrey/30 from-tardis/30";

  return (
    <Link href={`/doctor/${slug}/`} className="block group focus:outline-none focus:ring-2 focus:ring-gallifrey/40">
      <article className={`relative aspect-[2/3] overflow-hidden cover-card border ${accent} bg-gradient-to-b to-vortex/80 from-tardis/30 p-4 flex flex-col`}>
        {/* Roundel grid texture in the background */}
        <div className="absolute inset-0 roundel-grid opacity-20 pointer-events-none" aria-hidden="true" />

        {/* Top: incarnation marker */}
        <div className="relative flex items-baseline justify-between">
          <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80">Incarnation</p>
          <span className="serif text-3xl text-gallifrey leading-none">{doctor.number}</span>
        </div>

        {/* Middle: actor + era */}
        <div className="relative mt-auto">
          <p className="type text-[9px] uppercase tracking-[0.3em] text-bone/55 mb-1">{doctor.era}</p>
          <h3 className="serif text-xl text-paper leading-tight">{doctor.actor}</h3>
          <p className="text-xs text-bone/70 mt-2 leading-snug line-clamp-2">{doctor.costumeHook}</p>
          {doctor.catchphrase && (
            <p className="serif italic text-signal/85 text-sm mt-2 line-clamp-2">&ldquo;{doctor.catchphrase}&rdquo;</p>
          )}
        </div>

        {/* Bottom-right pill */}
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
