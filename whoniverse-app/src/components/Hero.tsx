import Link from "next/link";
import { doctors } from "@/lib/doctors";
import { companions } from "@/lib/companions";
import { monsters } from "@/lib/monsters";
import { episodes } from "@/lib/episodes";

export default function Hero() {
  const span = `${Math.min(...doctors.map((d) => d.yearStart))} – present`;
  return (
    <section className="hero-atmosphere border-b border-gallifrey/15 px-5 py-16 sm:px-6 sm:py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="reveal reveal-1 type text-[10px] uppercase tracking-[0.45em] text-gallifrey mb-4">
          TARDIS Index File · {span}
        </p>
        <h1 className="reveal reveal-2 serif text-[clamp(2.6rem,7.5vw,5.2rem)] leading-[0.95] text-paper">
          <span className="regen-underline">The Whoniverse,</span>
          <br className="hidden sm:block" /> open and indexed.
        </h1>
        <p className="reveal reveal-3 mt-7 max-w-2xl text-xl italic text-bone/85 leading-relaxed">
          {doctors.length} Doctors. {companions.length} companions.
          {" "}{monsters.length} recurring foes. {episodes.length} curated stories
          across {Math.max(...doctors.map((d) => d.yearEnd)) - Math.min(...doctors.map((d) => d.yearStart)) + 1} years.
          {" "}All pulled from Wikidata, TARDIS Wiki, and TMDB by Fivetran;
          modelled by dbt and dbt-wizard into a Snowflake gold layer; read by humans and run-time agents alike.
        </p>
        <div className="reveal reveal-4 mt-9 flex flex-wrap gap-3">
          <Link href="/doctors"      className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs bg-tardis text-paper hover:bg-tardisLt transition border border-gallifrey/40">The Doctors</Link>
          <Link href="/companions"   className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs border border-paper/25 text-bone hover:text-paper hover:border-gallifrey/60 transition">Companions</Link>
          <Link href="/monsters"     className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs border border-paper/25 text-bone hover:text-paper hover:border-gallifrey/60 transition">Monsters</Link>
          <Link href="/episodes"     className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs border border-paper/25 text-bone hover:text-paper hover:border-gallifrey/60 transition">Episodes</Link>
          <Link href="/ask"          className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs bg-gallifrey/20 border border-gallifrey/65 text-gallifrey hover:bg-gallifrey/35 transition">Ask the Archivist</Link>
          <Link href="/quiz"         className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs bg-gallifrey/10 border border-gallifrey/50 text-gallifrey hover:bg-gallifrey/25 transition">Which Doctor are you?</Link>
          <Link href="/timeline"     className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs border border-paper/25 text-bone hover:text-paper hover:border-gallifrey/60 transition">Timeline</Link>
          <Link href="/architecture" className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs border border-paper/25 text-bone hover:text-paper hover:border-gallifrey/60 transition">ODI Architecture</Link>
        </div>
      </div>
    </section>
  );
}
