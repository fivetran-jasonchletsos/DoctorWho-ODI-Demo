import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pipeline — TARDIS Index File",
};

const CONNECTORS = [
  { name: "wikidata_sparql",  status: "healthy",  lastSync: "2026-05-22 03:14 UTC", rows: 4_812, freshness: "6h" },
  { name: "tardis_wiki_http", status: "healthy",  lastSync: "2026-05-22 03:14 UTC", rows: 9_244, freshness: "6h" },
  { name: "tmdb_http",        status: "degraded", lastSync: "2026-05-22 02:58 UTC", rows: 1_037, freshness: "6h", note: "Rate-limited at 5:02; auto-retrying" },
];

const LAYERS = [
  { layer: "bronze", desc: "Raw JSONL from each source. Schema-on-read.", rows: 15_093, status: "fresh" },
  { layer: "silver", desc: "Normalised, deduped, language-cleaned.",     rows: 12_771, status: "fresh" },
  { layer: "gold",   desc: "dim_doctor, dim_companion, dim_monster, dim_episode, fct_appearance, fct_regeneration.", rows: 1_804, status: "fresh" },
  { layer: "semantic", desc: "dbt Semantic Layer: cube metrics per Doctor, decade, monster category.", rows: 312, status: "fresh" },
];

export default function PipelinePage() {
  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Pipeline Health</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">Connectors &amp; Layers</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          Three Fivetran connectors. Four dbt layers. One semantic cube. Status is mocked
          for this demo &mdash; production board lives in Fivetran + dbt Cloud + Snowflake task history.
        </p>

        <section className="mt-12">
          <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-4">Connectors</h2>
          <div className="space-y-3">
            {CONNECTORS.map((c) => (
              <div key={c.name} className="border border-tardisLt/30 bg-panel/40 p-4">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-mono text-base text-paper">{c.name}</p>
                    <p className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 mt-0.5">Last sync · {c.lastSync}</p>
                  </div>
                  <div className="text-right">
                    <span className={`pill ${c.status === "healthy" ? "pill--signal" : "pill--crimson"}`}>{c.status}</span>
                    <p className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 mt-1">{c.rows.toLocaleString()} rows · freshness {c.freshness}</p>
                  </div>
                </div>
                {c.note && <p className="text-sm text-crimson/90 mt-2 italic">Note: {c.note}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-4">Layers</h2>
          <div className="space-y-3">
            {LAYERS.map((l) => (
              <div key={l.layer} className="border border-gallifrey/25 bg-panel/40 p-4">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <p className="font-mono text-base text-gallifrey">{l.layer}</p>
                  <p className="type text-[10px] uppercase tracking-[0.25em] text-signal">{l.status}</p>
                </div>
                <p className="text-sm text-bone/85 mt-1.5 leading-snug">{l.desc}</p>
                <p className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 mt-2">{l.rows.toLocaleString()} rows</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
