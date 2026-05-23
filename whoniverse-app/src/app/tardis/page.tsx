import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TARDIS — TARDIS Index File",
};

// The TARDIS / gadget page — sonic screwdriver variants, psychic paper,
// console rooms, K-9, the chameleon arch. The geekiest page.

type Gadget = {
  name: string;
  era: string;
  function: string;
  blurb: string;
  pill?: string;
};

const GADGETS: Gadget[] = [
  {
    name: "Sonic Screwdriver",
    era: "Fury from the Deep (1968) → present",
    function: "Universal multitool for the Doctor: unlocks, scans, hacks, occasionally heals.",
    blurb: "Famously can't open deadlocks, won't work on wood, useless against Daleks. Each Doctor's design is different; Twelve briefly switched to sonic sunglasses. Disliked by writers because it solves too much.",
    pill: "Canonical",
  },
  {
    name: "Psychic Paper",
    era: "The End of the World (2005) → present",
    function: "Shows the viewer whatever credentials the Doctor wants them to see.",
    blurb: "Doesn't work on the genius, the strong-willed or the species-immune. Goes blank in front of Shakespeare. RTD's narrative shortcut around \"why are you allowed in here?\"",
  },
  {
    name: "Vortex Manipulator",
    era: "The Empty Child (2005)",
    function: "Time travel via wrist-strap. \"A cheap and nasty form of time travel.\"",
    blurb: "Captain Jack's. River Song's. Time Agency tech. Hurts to use. The Doctor calls it the cheap version of the TARDIS.",
  },
  {
    name: "K-9",
    era: "The Invisible Enemy (1977)",
    function: "Robot dog. Laser nose. Encyclopaedic database. Affirmative.",
    blurb: "Four K-9s in canon: K-9 Mark I (left in 5000 AD), Mark II (left in E-Space), Mark III (Sarah Jane's; killed and rebuilt many times), Mark IV (the K-9 series). The original prop is in the National Media Museum.",
    pill: "Canonical",
  },
  {
    name: "Chameleon Arch",
    era: "Human Nature (2007)",
    function: "Rewrites a Time Lord's biology into a human; stores the original self in a pocket watch.",
    blurb: "Used by the Doctor to hide from the Family of Blood. Used by the Master to hide as Professor Yana at the end of the universe. Don't open the watch.",
  },
  {
    name: "Cloister Bell",
    era: "Logopolis (1981)",
    function: "TARDIS warning system. Rings when the universe is ending. Not a metaphor.",
    blurb: "If you hear it, run.",
  },
  {
    name: "Time Vortex Energy",
    era: "The Parting of the Ways (2005)",
    function: "Raw fuel of the TARDIS. Will kill anyone who looks into it. Will not kill Rose.",
    blurb: "Rose absorbed the whole vortex and brought Jack back to life. Permanently. He'll be the Face of Boe one day.",
  },
  {
    name: "Stattenheim Remote",
    era: "The Two Doctors (1985)",
    function: "Summons the TARDIS to you.",
    blurb: "Six had one. The Doctor doesn't really need it because the TARDIS sometimes shows up anyway.",
  },
  {
    name: "Hadron Energy Manipulator (sonic sunglasses)",
    era: "The Magician's Apprentice (2015)",
    function: "Sonic screwdriver, but as sunglasses.",
    blurb: "Brief experiment. Mocked. Quietly retired.",
  },
  {
    name: "Time Ring",
    era: "Genesis of the Daleks (1975)",
    function: "Bracelet-form time-and-space recall; emergency yank back to the TARDIS.",
    blurb: "Time Lords gave one to Four when they sent him to Skaro to abort the Daleks. It's still nicer than a vortex manipulator.",
  },
  {
    name: "TARDIS Key",
    era: "An Unearthly Child (1963)",
    function: "Opens the police-box door. Sometimes does other things.",
    blurb: "Vibrates around the TARDIS. Used as a hypnosis focus in The Daleks' Master Plan. Has been carried as a perception-filtered necklace.",
  },
  {
    name: "Hand of Omega",
    era: "Remembrance of the Daleks (1988)",
    function: "Stellar manipulator. Customises suns.",
    blurb: "Hartnell's Doctor took it from Gallifrey. McCoy's Doctor sent it back to lure the Daleks. They activated it. Skaro's sun went nova.",
  },
];

const CONSOLE_ROOMS = [
  {
    doctor: "1–6", desc: "White roundel walls, hexagonal console, central rotor. The default. Looks like 1963 BBC props because it is.",
  },
  {
    doctor: "4", desc: "Wooden secondary console room — only Tom Baker used it. Gothic. Hangs in the TARDIS somewhere.",
  },
  {
    doctor: "7–8", desc: "Edwardian library / steampunk parlour. Eight's TV-movie console room has a fireplace.",
  },
  {
    doctor: "9–10", desc: "Coral struts, organic feel. The first \"modern\" console room. \"It's bigger on the inside.\"",
  },
  {
    doctor: "11", desc: "Glass floor, twin rotors, steampunk dials. \"Cosy.\"",
  },
  {
    doctor: "12", desc: "Bookshelves, chalkboards, armchairs. Doctor lives in this one. Sonic sunglasses on the table.",
  },
  {
    doctor: "13", desc: "Crystalline pillars, hexagonal step-down. Custard-cream dispenser.",
  },
  {
    doctor: "15", desc: "Bright yellow trim, large roundels, jukebox, coffee machine. \"Coffee shop console room.\" The TARDIS picked it.",
  },
];

export default function TARDISPage() {
  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">TARDIS · Tooling</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">Bigger on the Inside</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          The Type 40 capsule. The sonic. Psychic paper. K-9. The cloister bell.
          Every gadget the Doctor reaches for &mdash; and the eight console rooms we&apos;ve
          seen since 1963.
        </p>

        <section className="mt-12">
          <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-5">Gadgets &amp; Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GADGETS.map((g) => (
              <article key={g.name} className="relative border border-tardisLt/30 bg-panel/40 p-5 overflow-hidden">
                <div className="absolute inset-0 roundel-grid opacity-15 pointer-events-none" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-baseline justify-between">
                    <h3 className="serif text-lg text-paper">{g.name}</h3>
                    {g.pill && <span className="pill pill--gold">{g.pill}</span>}
                  </div>
                  <p className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 mt-1">{g.era}</p>
                  <p className="text-sm text-signal/85 mt-3">{g.function}</p>
                  <p className="text-sm text-bone/75 mt-2 leading-snug">{g.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-5">Console Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONSOLE_ROOMS.map((c) => (
              <div key={c.doctor} className="border border-gallifrey/25 bg-vortex/60 p-4">
                <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80">Doctor {c.doctor}</p>
                <p className="text-sm text-bone/85 mt-2 leading-snug">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
