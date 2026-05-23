import type { Metadata } from "next";
import Link from "next/link";
import { episodeSlug } from "@/components/slugs";

export const metadata: Metadata = {
  title: "The Making of Doctor Who — TARDIS Index File",
};

// For Peter — the origin story he half-remembers. Verity Lambert was
// given a hard time. The Dalek really was built from a sink plunger
// and an egg whisk. Both stories are true; this page tells them
// straight and embeds the BBC docudrama Peter pointed us at.

const ADV_SLUG = episodeSlug("An Adventure in Space and Time", 2013);

export default function MakingPage() {
  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Origin Story · 1963</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper">
          <span className="regen-underline">How they built</span> the Doctor.
        </h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          A twenty-seven-year-old woman, a young British-Asian director, a sink
          plunger, an egg whisk, and a Saturday-evening teatime slot the BBC
          fully expected to flop. November 23rd, 1963.
        </p>

        {/* Verity Lambert */}
        <section className="mt-12">
          <p className="type text-[10px] uppercase tracking-[0.35em] text-gallifrey/85 mb-2">Producer</p>
          <h2 className="serif text-3xl text-paper leading-tight">
            <span className="tardis-underline">Verity Lambert</span> &mdash; the BBC&apos;s first woman drama producer.
          </h2>
          <p className="serif text-base sm:text-lg text-bone/85 mt-4 leading-relaxed drop-cap">
            Lambert was twenty-seven years old when Sydney Newman hired her to produce
            Doctor Who. She was the BBC&apos;s first woman drama producer and its
            youngest, on a show the corporation had already decided would fail. She
            was told, repeatedly and to her face, that she was the wrong age, the
            wrong sex, and that the show was the wrong idea. She was the only woman in
            the senior production meetings; people kept asking her to fetch the tea.
          </p>
          <p className="serif text-base text-bone/85 mt-4 leading-relaxed">
            She fetched no tea. She pushed back on a head of serials who tried to kill
            episode two of <em>The Daleks</em> because the props looked silly. She got the
            Daleks on screen, the show was a phenomenon by Christmas, and the BBC quietly
            extended the budget. She produced the first three years &mdash; Hartnell,
            Troughton&apos;s arrival, the regeneration concept, the format Doctor Who
            still runs on sixty-three years later.
          </p>
          <p className="serif text-sm text-bone/65 italic mt-4">
            &ldquo;I was given no help, and was constantly told that the show would never
            work. Then it did. Then they wanted to know how I&apos;d done it.&rdquo; &mdash; Verity Lambert, in
            later interviews. She died in 2007 at age 71.
          </p>
        </section>

        {/* Waris Hussein */}
        <section className="mt-14">
          <p className="type text-[10px] uppercase tracking-[0.35em] text-gallifrey/85 mb-2">Director, Episode 1</p>
          <h2 className="serif text-3xl text-paper leading-tight">
            <span className="tardis-underline">Waris Hussein</span> &mdash; the BBC&apos;s first British-Asian drama director.
          </h2>
          <p className="serif text-base sm:text-lg text-bone/85 mt-4 leading-relaxed">
            Hussein was twenty-four. He was an Indian-born director the BBC drama
            department had until then thought of as the man who made the tea. He
            directed the first episode, <em>An Unearthly Child</em>, on a shoestring
            budget in Lime Grove Studio D &mdash; a room famous for being too small,
            too hot, and prone to cameras catching fire mid-take. He and Lambert
            were both outsiders, both told they didn&apos;t belong, both responsible
            for what the show looked like out of the gate.
          </p>
        </section>

        {/* The Dalek anecdote — what Peter remembers */}
        <section className="mt-14 border border-gallifrey/35 bg-panel/40 p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 roundel-grid opacity-20 pointer-events-none" aria-hidden="true" />
          <div className="relative">
            <p className="type text-[10px] uppercase tracking-[0.35em] text-gallifrey/85 mb-2">For Peter &mdash; the story you half-remembered</p>
            <h2 className="serif text-2xl sm:text-3xl text-paper leading-tight">
              The Dalek was built from a sink plunger and an egg whisk.
            </h2>
            <p className="serif text-base sm:text-lg text-bone/90 mt-4 leading-relaxed">
              Terry Nation wrote the Daleks into the second serial. Designer
              Raymond Cusick was handed the brief on a fortnight&apos;s notice,
              with a props budget the BBC clearly hoped he wouldn&apos;t spend.
              When Cusick asked for materials he was given, almost as a joke, a
              sink plunger, an egg whisk, a Senior Service cigarette tin, and a
              roll of corrugated card. He went away and built a creature out of
              them. The plunger became the manipulator arm. The egg whisk became
              the gun. The corrugated card became the skirt. The cigarette tin
              shape became the casing.
            </p>
            <p className="serif text-base text-bone/85 mt-4 leading-relaxed">
              The thing is &mdash; the props department <em>did</em> give the team
              household items instead of the kit they asked for, and the show
              built a monster out of it anyway. That bit your dad got exactly
              right. The producer he&apos;s remembering is Verity Lambert above,
              who fought to keep the silly-looking Daleks in the script after
              executives wanted them cut. The designer with the plunger is
              Raymond Cusick. Both stories are true.
            </p>
            <p className="serif text-sm text-bone/65 italic mt-4">
              Cusick was paid &pound;100 for the design and got no royalties.
              The Daleks have made the BBC tens of millions of pounds.
            </p>
          </div>
        </section>

        {/* The Sydney Newman / Anthony Coburn lineage, briefly */}
        <section className="mt-14">
          <p className="type text-[10px] uppercase tracking-[0.35em] text-gallifrey/85 mb-2">Above the line</p>
          <h2 className="serif text-3xl text-paper leading-tight">
            <span className="tardis-underline">Sydney Newman</span> commissioned it. <span className="tardis-underline">Anthony Coburn</span> wrote the first episode.
          </h2>
          <p className="serif text-base text-bone/85 mt-4 leading-relaxed">
            Newman was the Canadian head of drama who&apos;d come over from ITV
            to shake the BBC&apos;s drama output loose. He wanted a Saturday-evening
            family adventure show that wasn&apos;t Westerns and wasn&apos;t Robin Hood,
            and he wrote a one-page concept: a time-travelling old man and his
            granddaughter. He gave it to Lambert and walked away. Coburn took
            that page and turned it into <em>An Unearthly Child</em>, naming the
            granddaughter Susan after his own daughter and writing the TARDIS
            as a police box because the budget would only stretch to a single
            redressed prop. Sixty-three years later the chameleon circuit is
            still broken.
          </p>
        </section>

        {/* Adventure in Space and Time — embed + link */}
        <section className="mt-14">
          <p className="type text-[10px] uppercase tracking-[0.35em] text-gallifrey/85 mb-2">The BBC dramatised all of this</p>
          <h2 className="serif text-3xl text-paper leading-tight">
            <span className="regen-underline">An Adventure in Space and Time</span> (2013).
          </h2>
          <p className="serif text-base text-bone/85 mt-4 leading-relaxed">
            Mark Gatiss&apos;s 50th-anniversary docudrama. David Bradley plays
            William Hartnell &mdash; sick, scared of being forgotten, the first
            Doctor. Jessica Raine plays Verity Lambert. Sacha Dhawan (years
            before he played the Master) plays Waris Hussein. It is the
            warmest love letter the BBC has ever made to one of its own shows,
            and the bit where Hartnell looks across the TARDIS console and
            sees Matt Smith&apos;s Eleventh Doctor staring back at him will put
            a lump in any fan&apos;s throat.
          </p>

          <div className="mt-6 aspect-video w-full border border-gallifrey/40 bg-vortex rounded-sm overflow-hidden">
            <iframe
              src="https://www.youtube-nocookie.com/embed/9eZpkS5MAQ8"
              title="An Adventure in Space and Time — official trailer (BBC America)"
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="mt-2 text-xs type uppercase tracking-[0.25em] text-bone/55">
            BBC America trailer · 2013 · Mark Gatiss, screenplay
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/episode/${ADV_SLUG}/`}
              className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs bg-tardis text-paper hover:bg-tardisLt border border-gallifrey/40"
            >
              Full archive entry →
            </Link>
            <a
              href="https://www.imdb.com/title/tt2326758/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs border border-paper/25 text-bone hover:text-paper hover:border-gallifrey/60 transition"
            >
              IMDb · tt2326758
            </a>
            <a
              href="https://en.wikipedia.org/wiki/An_Adventure_in_Space_and_Time"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs border border-paper/25 text-bone hover:text-paper hover:border-gallifrey/60 transition"
            >
              Wikipedia
            </a>
          </div>
        </section>

        <p className="mt-16 text-sm serif italic text-bone/60 max-w-prose">
          For Peter. The story you remembered was real &mdash; the plunger, the
          producer who got a hard time, the show no-one thought would work.
          You&apos;ve been watching this for over sixty years, and you got the
          bones of the origin right from memory.
        </p>
      </div>
    </main>
  );
}
