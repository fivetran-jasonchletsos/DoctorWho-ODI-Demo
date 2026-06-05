import { episodes } from "@/lib/episodes";
import { companions } from "@/lib/companions";
import { monsters } from "@/lib/monsters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connections — TARDIS Index File",
};

// Pre-computed cross-canon facts. These are the "yes, that really
// connects to that" surprises a fan would point out at the pub.

const CONNECTIONS = [
  {
    a: "Captain Jack Harkness", b: "The Face of Boe",
    fact: "Confirmed by Russell T Davies. Jack ages so slowly across billions of years his face becomes the giant glass-jar entity Ten meets twice. \"You are not alone.\"",
  },
  {
    a: "Sutekh (1975)", b: "Empire of Death (2024)",
    fact: "Sutekh has been riding the outside of the TARDIS, undetected, for forty-nine real-world years. The Doctor wins by dragging him through the time vortex on a rope.",
  },
  {
    a: "Adric's death (1982)", b: "Yucatán impact (65 million BC)",
    fact: "Earthshock's Cyber-freighter slingshots back through time and becomes the asteroid that killed the dinosaurs. Established in the same serial; rarely brought up.",
  },
  {
    a: "Amy & Rory", b: "River Song",
    fact: "Conceived in the TARDIS in flight; the time-vortex exposure made Melody Pond a Time Lord at the genetic level. Raised by the Silence to assassinate the Doctor. She marries him instead.",
  },
  {
    a: "The Brigadier", b: "Kate Stewart",
    fact: "Father and daughter. Kate took over UNIT; the Brigadier saluted Twelve as a Cyberman in Death in Heaven. Five Doctors of continuity, one family.",
  },
  {
    a: "Susan Foreman", b: "The Doctor",
    fact: "Her granddaughter. The show's oldest unresolved thread — Susan called him \"Grandfather\" in 1963 and the franchise has never given a straight answer. Possibly resolved by the Timeless Child reveal; possibly not.",
  },
  {
    a: "The Doctor", b: "The Timeless Child",
    fact: "Thirteen learns she is the Timeless Child — a found alien orphan whose regeneration ability was harvested by the Time Lords. Every regeneration in Gallifreyan history descends from her, the original.",
  },
  {
    a: "Donna Noble", b: "Rose Noble (her daughter)",
    fact: "The DoctorDonna metacrisis didn't burn Donna up — it became hereditary. Rose Noble inherited it; in The Star Beast she rejects the male-coded \"Doctor Donna\" name and binds it.",
  },
  {
    a: "Sarah Jane Smith", b: "Coal Hill School",
    fact: "The school Ian and Barbara taught at in 1963 is the same school Clara teaches at in 2014 (and Yasmin's sister attends in 2018). Sarah Jane Adventures, Class, and main-series all converge there.",
  },
  {
    a: "The Master", b: "Missy",
    fact: "Same person. The Master regenerated into Missy (Michelle Gomez) and back into Dhawan's Master, who killed his own previous self in Doctor Falls. The franchise's only confirmed Time Lord trans arc.",
  },
  {
    a: "Charlotte Pollard", b: "The Eight Doctor / The Night of the Doctor",
    fact: "Big Finish audio companion. Eight name-checks her in the Night of the Doctor minisode (\"Charley. C'rizz. Lucie…\"), making decades of audio canon officially TV-canonical.",
  },
  {
    a: "The Fugitive Doctor", b: "Ruth Clayton",
    fact: "Pre-Hartnell incarnation hiding in 21st-century Gloucester as a tour guide with a chameleon arch. The most consequential canon-breaker since the Time War.",
  },
];

export default function ConnectionsPage() {
  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Cross-Canon</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">Connections</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          The deep cuts. The things you point out at the pub. Twelve of the
          franchise&apos;s confirmed-but-easy-to-miss cross-canon links.
        </p>

        <ol className="mt-12 space-y-5">
          {CONNECTIONS.map((c, i) => (
            <li key={i} className="border border-gallifrey/25 bg-panel/30 p-5">
              <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80 mb-2">
                Link {String(i + 1).padStart(2, "0")}
              </p>
              <p className="serif text-xl text-paper leading-tight">
                <span className="text-signal">{c.a}</span> <span className="text-bone/55 mx-2">↔</span> <span className="text-signal">{c.b}</span>
              </p>
              <p className="text-sm text-bone/80 mt-3 leading-snug">{c.fact}</p>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-sm text-bone/60 italic max-w-prose">
          In the real pipeline, dbt-wizard run-time agents read gold.fct_appearance,
          gold.dim_doctor and gold.dim_monster. A question like {`"`}which monsters appear
          across more than one Doctor era{`?"`} resolves with two joins. There are
          ~{episodes.length} episodes, ~{companions.length} companions and
          ~{monsters.length} monsters in this demo subset — the production extract
          would be ten times larger.
        </p>
      </div>
    </main>
  );
}
