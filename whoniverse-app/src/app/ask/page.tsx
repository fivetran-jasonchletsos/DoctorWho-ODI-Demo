"use client";

import { useState, useRef, useEffect } from "react";

// /ask — chat with the Whoniverse Archivist (Claude Haiku 4.5 via the
// Cloudflare Worker in /worker). Grounded in the archive's indexed
// data; persona is a warm, UK-spelling fellow fan.

const ENDPOINT = process.env.NEXT_PUBLIC_ASK_ENDPOINT ?? "";

const SUGGESTED = [
  "Which Doctor should I start with if I've never watched?",
  "Which monsters appear in both classic and modern Who?",
  "Which companion travelled with the most Doctors?",
  "What's the deal with the Timeless Child?",
  "Who is the Master, in one paragraph?",
  "What's the best Weeping Angels episode?",
];

type Message = { role: "user" | "assistant"; content: string };

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function ask(question: string) {
    if (!question.trim() || busy) return;
    if (!ENDPOINT) {
      setError(
        "The Archivist isn't wired up yet. Deploy the worker in /worker (see worker/README.md) and set NEXT_PUBLIC_ASK_ENDPOINT in the deploy workflow.",
      );
      return;
    }
    setError(null);
    setBusy(true);
    setMessages((m) => [...m, { role: "user", content: question }, { role: "assistant", content: "" }]);
    setInput("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question,
          history: messages,
        }),
      });

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Archivist returned ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: copy[copy.length - 1].content + chunk,
          };
          return copy;
        });
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", content: `_The Archivist stumbled: ${msg}_` };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Ask the Archivist</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper">
          <span className="regen-underline">Ask anything</span> about Doctor Who.
        </h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          Powered by Claude Haiku 4.5, grounded on this archive&apos;s indexed
          Doctors, companions, monsters and stories. Built for Peter to ask out
          loud and Sarah to settle pub arguments.
        </p>

        {/* Conversation panel */}
        <div
          ref={scrollRef}
          className="mt-10 border border-tardisLt/30 bg-panel/40 rounded-sm h-[28rem] sm:h-[32rem] overflow-y-auto"
        >
          {messages.length === 0 ? (
            <div className="p-6 sm:p-8">
              <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80 mb-3">
                Some questions to start
              </p>
              <ul className="space-y-1.5">
                {SUGGESTED.map((q) => (
                  <li key={q}>
                    <button
                      type="button"
                      onClick={() => ask(q)}
                      className="text-left text-sm sm:text-base text-bone/85 hover:text-gallifrey transition serif"
                    >
                      → {q}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-4 sm:p-6 space-y-5">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "ml-6 sm:ml-12" : "mr-6 sm:mr-12"}>
                  <p className="type text-[10px] uppercase tracking-[0.3em] mb-1.5 {m.role === 'user' ? 'text-signal/85' : 'text-gallifrey/85'}"
                     style={{ color: m.role === "user" ? "rgba(93,212,212,0.85)" : "rgba(212,160,23,0.85)" }}>
                    {m.role === "user" ? "You" : "The Archivist"}
                  </p>
                  <div
                    className={`serif text-base sm:text-[17px] leading-relaxed whitespace-pre-wrap ${
                      m.role === "user" ? "text-paper" : "text-bone/95"
                    } ${m.role === "assistant" ? "border-l-2 border-gallifrey/40 pl-4" : ""}`}
                  >
                    {m.content || (busy && i === messages.length - 1 ? <Cursor /> : "")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="mt-3 text-sm text-crimson/90 border border-crimson/40 bg-panel/40 p-3">
            {error}
          </div>
        )}

        {/* Composer */}
        <form onSubmit={onSubmit} className="mt-4 flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                ask(input);
              }
            }}
            placeholder="Ask the Archivist anything..."
            rows={2}
            disabled={busy}
            className="flex-1 bg-vortex border border-gallifrey/30 text-paper px-4 py-3 focus:outline-none focus:border-gallifrey/70 placeholder:text-bone/30 serif text-base resize-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="px-5 py-3 type uppercase tracking-[0.2em] text-xs bg-tardis text-paper hover:bg-tardisLt border border-gallifrey/40 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy ? "Thinking…" : "Send"}
          </button>
        </form>

        <p className="mt-4 text-xs type uppercase tracking-[0.22em] text-bone/45">
          Model: claude-haiku-4-5 · grounded on this archive · prompt-cached
        </p>

        {!ENDPOINT && (
          <div className="mt-8 border border-gallifrey/30 bg-panel/30 p-5">
            <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/85 mb-2">Setup pending</p>
            <p className="text-sm text-bone/85 leading-snug">
              The Archivist is not wired to a backend yet. Deploy the
              Cloudflare Worker in <code className="text-signal">worker/</code> (see
              <code className="text-signal"> worker/README.md</code>) and set
              <code className="text-signal"> NEXT_PUBLIC_ASK_ENDPOINT</code> on the
              deploy workflow.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function Cursor() {
  return (
    <span className="inline-block w-2 h-4 bg-gallifrey/80 animate-pulse align-middle" aria-label="thinking" />
  );
}
