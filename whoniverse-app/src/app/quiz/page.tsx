"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { doctors, type Doctor } from "@/lib/doctors";
import { doctorSlug } from "@/components/slugs";

// Doctor IDs we score against. We exclude the Curator and Meta-Crisis
// (one-shot anomalies) to keep results to canonical incarnations.
type DoctorId = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "War"
              | "9" | "10" | "11" | "12" | "13" | "Fugitive" | "14" | "15";

type Answer = {
  label: string;
  weights: Partial<Record<DoctorId, number>>;
};

type Question = {
  prompt: string;
  answers: Answer[];
};

// Weights are deliberate. Each Doctor has a personality "fingerprint" —
// the question rewards the answer that matches that fingerprint.
const QUESTIONS: Question[] = [
  {
    prompt: "Something is wrong. Your first move is —",
    answers: [
      { label: "Talk it through. Reasoning will get us out faster than running.",
        weights: { "1": 3, "5": 2, "7": 2, "11": 1 } },
      { label: "Make a face. Pat my pockets. The right gadget will appear.",
        weights: { "2": 3, "4": 2, "11": 2, "7": 1 } },
      { label: "Take charge. Issue orders. There's no time for democracy.",
        weights: { "3": 3, "6": 2, "12": 1 } },
      { label: "Improvise loudly while everyone else catches up.",
        weights: { "10": 3, "11": 2, "14": 1, "15": 2 } },
    ],
  },
  {
    prompt: "Your wardrobe gravitates toward —",
    answers: [
      { label: "Edwardian formal — frock coats, cravats, anachronistic dignity.",
        weights: { "1": 3, "8": 3, "5": 1 } },
      { label: "A signature accessory worn into the ground (scarf, bow tie, question marks).",
        weights: { "4": 3, "7": 2, "11": 3 } },
      { label: "Tailored, restrained, dark. The look of someone running out of patience.",
        weights: { "9": 2, "12": 3, "War": 2 } },
      { label: "Whatever makes me happy today. Bright. Loud. Unapologetic.",
        weights: { "6": 2, "13": 2, "15": 3, "10": 1 } },
    ],
  },
  {
    prompt: "On the TARDIS console, your most-used control is —",
    answers: [
      { label: "Sonic screwdriver. Solves 80% of problems before I get there.",
        weights: { "4": 2, "10": 3, "11": 2, "13": 2, "15": 1 } },
      { label: "The library. Or a chalkboard. I'd rather work it out from first principles.",
        weights: { "1": 3, "5": 2, "12": 3 } },
      { label: "The wibbly bit that nobody else understands. Maths is poetry.",
        weights: { "2": 2, "7": 3, "8": 2, "11": 2 } },
      { label: "Honestly? Whichever lever I'm closest to. We'll find out where it sends us.",
        weights: { "10": 2, "11": 2, "14": 2, "15": 3 } },
    ],
  },
  {
    prompt: "A Dalek is in front of you. You —",
    answers: [
      { label: "Reason with it. Even the worst thing in the universe started as something else.",
        weights: { "4": 3, "5": 2, "9": 1 } },
      { label: "Talk down to it. I know more about its history than it does.",
        weights: { "1": 2, "7": 3, "12": 2 } },
      { label: "Show righteous fury. They burned my planet. They burn now.",
        weights: { "9": 3, "10": 2, "War": 3, "13": 2 } },
      { label: "Make eye-stalk contact. Smile. Improvise.",
        weights: { "11": 2, "15": 2, "8": 1, "14": 2 } },
    ],
  },
  {
    prompt: "Your favourite companion type is —",
    answers: [
      { label: "A peer. Someone who can keep up intellectually.",
        weights: { "4": 2, "8": 2, "12": 3 } },
      { label: "A found family. The more the merrier.",
        weights: { "5": 3, "13": 3, "11": 1 } },
      { label: "Someone bright and brilliant who needs the doors opened for them.",
        weights: { "2": 2, "7": 3, "10": 2, "11": 2 } },
      { label: "A best friend. Someone I love the way you only get one shot at loving.",
        weights: { "9": 2, "10": 3, "11": 2, "15": 3 } },
    ],
  },
  {
    prompt: "When you regenerate, you want the next version to —",
    answers: [
      { label: "Inherit my dignity. Don't undo the work.",
        weights: { "1": 3, "3": 2, "5": 1, "12": 2 } },
      { label: "Be kinder than I was. Let go of some of this.",
        weights: { "9": 2, "12": 2, "14": 3, "13": 1 } },
      { label: "Be wilder. Take more risks. Wear something stupid.",
        weights: { "6": 2, "11": 2, "15": 3, "4": 1 } },
      { label: "Just survive. The universe will tell you what to do.",
        weights: { "2": 2, "7": 2, "8": 2, "War": 3 } },
    ],
  },
  {
    prompt: "Pick a closing line —",
    answers: [
      { label: "\"Have I that right?\"",
        weights: { "4": 4 } },
      { label: "\"I don't want to go.\"",
        weights: { "10": 4, "14": 1 } },
      { label: "\"Am I a good man?\"",
        weights: { "12": 4 } },
      { label: "\"Babes.\"",
        weights: { "15": 4 } },
    ],
  },
  {
    prompt: "If the universe required one of you to break the promise — to use the weapon, end the war, do the thing the Doctor never does — you would —",
    answers: [
      { label: "Refuse, and find the third option. There's always a third option.",
        weights: { "11": 3, "12": 2, "13": 2, "15": 2 } },
      { label: "Do it. Hate myself. Carry it forever.",
        weights: { "War": 4, "9": 2 } },
      { label: "Compute the math, decide it's necessary, and live with the answer.",
        weights: { "7": 3, "12": 2 } },
      { label: "Trick everyone — including myself — into thinking I did. Then go home.",
        weights: { "10": 2, "11": 3, "14": 2 } },
    ],
  },
];

function scoreToWinner(selections: number[]): { winner: Doctor; runnerUp: Doctor; scores: Map<DoctorId, number> } {
  const scores = new Map<DoctorId, number>();
  selections.forEach((idx, qi) => {
    const ans = QUESTIONS[qi].answers[idx];
    for (const [d, w] of Object.entries(ans.weights) as [DoctorId, number][]) {
      scores.set(d, (scores.get(d) ?? 0) + w);
    }
  });
  const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  const winnerDoc = doctors.find((d) => d.number === ranked[0][0])!;
  const runnerDoc = doctors.find((d) => d.number === (ranked[1]?.[0] ?? ranked[0][0]))!;
  return { winner: winnerDoc, runnerUp: runnerDoc, scores };
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<number[]>([]);

  const done = step >= QUESTIONS.length;
  const result = useMemo(() => (done ? scoreToWinner(selections) : null), [done, selections]);

  function choose(answerIdx: number) {
    setSelections((s) => [...s, answerIdx]);
    setStep((s) => s + 1);
  }

  function restart() {
    setStep(0);
    setSelections([]);
  }

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Personality Test</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">
          <span className="regen-underline">Which Doctor</span> Are You?
        </h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          Eight questions. Answers scored against the canonical incarnations
          (One through Fifteen, plus War and Fugitive). Result is the Doctor whose
          fingerprint matches yours most closely.
        </p>

        {!done && (
          <section className="mt-10">
            <p className="type text-[10px] uppercase tracking-[0.3em] text-bone/55 mb-3">
              Question {step + 1} of {QUESTIONS.length}
            </p>

            {/* Progress bar */}
            <div className="h-1 bg-tardisLt/15 rounded mb-8 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-tardis via-tardisLt to-gallifrey transition-all"
                style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h2 className="serif text-2xl sm:text-3xl text-paper leading-tight">
              {QUESTIONS[step].prompt}
            </h2>

            <div className="mt-6 space-y-3">
              {QUESTIONS[step].answers.map((a, i) => (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className="w-full text-left border border-tardisLt/30 bg-panel/40 px-5 py-4 hover:border-gallifrey/60 hover:bg-panel/70 transition group"
                >
                  <span className="serif text-base sm:text-lg text-paper group-hover:text-gallifrey">
                    {a.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {done && result && <Result result={result} onRestart={restart} />}
      </div>
    </main>
  );
}

function Result({
  result,
  onRestart,
}: {
  result: { winner: Doctor; runnerUp: Doctor; scores: Map<string, number> };
  onRestart: () => void;
}) {
  const { winner, runnerUp } = result;
  return (
    <section className="mt-12 reveal">
      <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80 mb-3">Regeneration Complete</p>
      <h2 className="serif text-3xl sm:text-4xl text-paper">
        You are the <span className="regen-underline">{ordinal(winner.number)}</span> Doctor.
      </h2>
      <p className="type text-[11px] uppercase tracking-[0.3em] text-bone/60 mt-2">{winner.actor} · {winner.era}</p>

      <article className="relative mt-8 border border-gallifrey/40 bg-panel/50 overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 roundel-grid opacity-25 pointer-events-none" aria-hidden="true" />
        <div className="relative">
          <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80">Costume</p>
          <p className="text-paper mt-1">{winner.costumeHook}</p>

          {winner.catchphrase && (
            <>
              <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80 mt-4">Catchphrase</p>
              <p className="serif italic text-signal/90 text-lg mt-1">&ldquo;{winner.catchphrase}&rdquo;</p>
            </>
          )}

          <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80 mt-4">Defining Moment</p>
          <p className="text-paper mt-1">{winner.defining}</p>

          <p className="serif text-base text-bone/85 mt-5 leading-relaxed">{winner.blurb}</p>
        </div>
      </article>

      {runnerUp.number !== winner.number && (
        <div className="mt-8 border border-tardisLt/30 bg-panel/30 p-4">
          <p className="type text-[10px] uppercase tracking-[0.3em] text-signal/80">Runner-up regeneration</p>
          <p className="text-paper mt-1">
            <Link href={`/doctor/${doctorSlug(runnerUp.number)}/`} className="hover:text-gallifrey">
              The {ordinal(runnerUp.number)} Doctor ({runnerUp.actor})
            </Link>
          </p>
          <p className="text-sm text-bone/70 mt-1">{runnerUp.defining}</p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/doctor/${doctorSlug(winner.number)}/`}
          className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs bg-tardis text-paper hover:bg-tardisLt border border-gallifrey/40"
        >
          Full Registry Entry →
        </Link>
        <button
          onClick={onRestart}
          className="px-5 py-2.5 type uppercase tracking-[0.2em] text-xs border border-paper/25 text-bone hover:text-paper hover:border-gallifrey/60 transition"
        >
          Regenerate (Restart)
        </button>
      </div>
    </section>
  );
}

function ordinal(num: string): string {
  if (num === "War") return "War";
  if (num === "Fugitive") return "Fugitive";
  const n = parseInt(num, 10);
  const ords: Record<number, string> = {
    1: "First", 2: "Second", 3: "Third", 4: "Fourth", 5: "Fifth",
    6: "Sixth", 7: "Seventh", 8: "Eighth", 9: "Ninth", 10: "Tenth",
    11: "Eleventh", 12: "Twelfth", 13: "Thirteenth", 14: "Fourteenth",
    15: "Fifteenth",
  };
  return ords[n] ?? num;
}
