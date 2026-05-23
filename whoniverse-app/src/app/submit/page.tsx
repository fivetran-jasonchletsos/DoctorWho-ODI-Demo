"use client";

import { useState } from "react";

const REJECTIONS = [
  "Submission rejected: Captain Jack's flirt-count is canonically infinite. Bound query would never terminate.",
  "Submission rejected: cannot resolve which Master regeneration this refers to. (There are eleven on file.)",
  "Submission rejected: the answer involves a time paradox. Cortex declines to compute paradoxes.",
  "Submission rejected: \"Was Susan really his granddaughter?\" exceeds the 2-billion-row Wikidata budget.",
  "Submission rejected: response would require us to take a position on whether the TV Movie is canon. Cortex prefers ambiguity.",
  "Submission rejected: spoilers detected for episodes airing after the model's knowledge cutoff. Try River Song.",
  "Submission rejected: \"How does the chameleon arch work\" — the script said \"magic\" and our embedding doesn't normalise that.",
  "Submission rejected: The Doctor's real name is filtered out of all training data per the Demons Run accord.",
  "Submission rejected: Reapers detected in query path. Wound has been sterilised.",
];

const EXAMPLE_PROMPTS = [
  "Which monsters appear across both classic and modern Who?",
  "Show me every episode featuring the Master *and* the Daleks.",
  "Which companion travelled with the most Doctors?",
  "How many episodes from the 1980s feature recurring foes?",
  "List every regeneration story in chronological order.",
  "Which Doctor met River Song the most times?",
];

export default function SubmitPage() {
  const [q, setQ] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = REJECTIONS[Math.floor(Math.random() * REJECTIONS.length)];
    setResponse(r);
  }

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Submit a Question</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">Ask Cortex</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          The architecture page describes a Cortex Analyst sitting on top of the gold
          layer. In this static build that endpoint is mocked &mdash; submit anything
          and Cortex will reject it, lovingly, for canon-protection reasons.
        </p>

        <form onSubmit={submit} className="mt-10">
          <label className="type text-[10px] uppercase tracking-[0.3em] text-bone/65">Your question</label>
          <textarea
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Which classic monster has the highest reuse rate in the modern era?"
            rows={3}
            className="mt-2 w-full bg-vortex border border-gallifrey/30 text-paper px-4 py-3 focus:outline-none focus:border-gallifrey/70 placeholder:text-bone/30 serif"
          />
          <button type="submit" className="mt-4 px-5 py-2.5 type uppercase tracking-[0.2em] text-xs bg-tardis text-paper hover:bg-tardisLt border border-gallifrey/40">
            Submit to Cortex
          </button>
        </form>

        {response && (
          <div className="mt-8 border border-crimson/45 bg-panel/40 p-5 reveal">
            <p className="type text-[10px] uppercase tracking-[0.3em] text-crimson mb-2">Cortex Reply</p>
            <p className="serif text-lg text-paper leading-snug">{response}</p>
          </div>
        )}

        <section className="mt-14">
          <h2 className="type text-[10px] uppercase tracking-[0.3em] text-bone/65 mb-4">Try one of these</h2>
          <ul className="space-y-1.5">
            {EXAMPLE_PROMPTS.map((p) => (
              <li key={p} className="text-sm text-bone/85">
                <button
                  type="button"
                  onClick={() => setQ(p)}
                  className="text-left hover:text-gallifrey transition"
                >
                  → {p}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
