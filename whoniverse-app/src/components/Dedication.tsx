// Dedication card — joint, for Sarah (sister-in-law) and Peter (father).
// Framed as a Time Lord registry entry, sealed with Gallifreyan-gold
// corner brackets. Two columns: the seal on the left, the dedication
// text on the right.

export default function Dedication() {
  return (
    <section className="px-5 py-16 sm:px-6 sm:py-20 md:px-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <article className="relative overflow-hidden rounded-sm seal-frame bg-panel/70">
          <div className="absolute inset-0 roundel-grid opacity-25 pointer-events-none" aria-hidden="true" />
          <span className="corner-tl" />
          <span className="corner-br" />

          <div className="relative grid grid-cols-1 md:grid-cols-[18rem_1fr] gap-8 p-6 sm:p-10">
            {/* LEFT: stylised Seal of Rassilon — built in SVG, no shipped asset */}
            <div className="flex flex-col items-center md:items-start">
              <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80 mb-3">
                Seal of Rassilon &middot; Family Archive
              </p>
              <svg viewBox="0 0 240 240" className="w-56 h-56 sm:w-64 sm:h-64" aria-label="Seal of Rassilon" role="img">
                <defs>
                  <radialGradient id="gallifreyGlow" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#ffb945" stopOpacity="0.9" />
                    <stop offset="55%" stopColor="#d4a017" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0a1428" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="120" cy="120" r="118" fill="url(#gallifreyGlow)" opacity="0.55" />
                <polygon points="120,16 212,68 212,172 120,224 28,172 28,68" fill="none" stroke="#d4a017" strokeWidth="2" />
                <polygon points="120,40 192,80 192,160 120,200 48,160 48,80" fill="none" stroke="#d4a017" strokeWidth="1.4" opacity="0.7" />
                <circle cx="120" cy="120" r="36" fill="none" stroke="#5dd4d4" strokeWidth="1.2" opacity="0.75" />
                <circle cx="120" cy="120" r="60" fill="none" stroke="#5dd4d4" strokeWidth="0.7" opacity="0.45" />
                <circle cx="120" cy="120" r="78" fill="none" stroke="#5dd4d4" strokeWidth="0.5" opacity="0.3" />
                {/* Cardinal dots */}
                <circle cx="120" cy="44"  r="5" fill="#d4a017" />
                <circle cx="120" cy="196" r="5" fill="#d4a017" />
                <circle cx="44"  cy="120" r="5" fill="#d4a017" />
                <circle cx="196" cy="120" r="5" fill="#d4a017" />
                {/* Center: a TARDIS-blue panel with two engraved initials */}
                <rect x="100" y="100" width="40" height="40" rx="3" fill="#1a3a6e" stroke="#d4a017" strokeWidth="1" />
                <text x="120" y="125" textAnchor="middle" fill="#ffb945" fontFamily="Cinzel, Georgia, serif" fontSize="16" fontWeight="700">
                  S &middot; P
                </text>
              </svg>
              <div className="mt-3 grid grid-cols-2 gap-1.5 text-[10px] type uppercase tracking-[0.22em] text-bone/60 w-full max-w-[16rem]">
                <span>Entry</span><span className="text-paper justify-self-end">SP-2026</span>
                <span>Clearance</span><span className="text-paper justify-self-end">All Canons</span>
                <span>Status</span><span className="text-paper justify-self-end">Dedicated</span>
              </div>
            </div>

            {/* RIGHT: dedication body */}
            <div className="relative">
              <p className="type text-[10px] uppercase tracking-[0.35em] text-gallifrey mb-4">
                For Two Companions
              </p>
              <h2 className="serif text-3xl sm:text-4xl text-paper leading-[1.05] mb-5">
                <span className="tardis-underline">Sarah</span> &amp; <span className="tardis-underline">Peter</span>.<br className="hidden sm:block" /> Time-Lord-fluent.
              </h2>
              <p className="serif text-base sm:text-lg text-bone/85 leading-relaxed max-w-prose">
                For Sarah, who can name every monster in <em>Genesis of the Daleks</em>
                before the title card finishes &mdash; and for Peter, who watched it
                the first time around when the BBC had a one-camera budget and a
                wobbly set.
              </p>
              <p className="serif text-base text-bone/80 leading-relaxed mt-4 max-w-prose">
                This is your archive. Every Doctor, every companion, every monster
                indexed below is here because the two of you wanted to know &mdash;
                across two generations, one family, sixty-three years of wandering.
              </p>
              <p className="serif italic text-signal/90 text-sm mt-5 max-w-prose">
                &ldquo;The way I see it, every life is a pile of good things and bad things.
                The good things don&apos;t always soften the bad things, but, vice versa,
                the bad things don&apos;t necessarily spoil the good things or make them
                unimportant.&rdquo;
                <span className="block not-italic text-bone/55 mt-1">&mdash; The Tenth Doctor, <em>Vincent and the Doctor</em></span>
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                <span className="pill pill--gold">Volume I</span>
                <span className="pill">2026</span>
                <span className="pill pill--signal">Family Build</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
