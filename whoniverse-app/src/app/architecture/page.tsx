import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ODI Architecture — TARDIS Index File",
};

export default function ArchitecturePage() {
  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Open Data Infrastructure</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">One Lake. Many Engines.</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          Three public sources flow through Fivetran into one open Iceberg lake on S3.
          That same lake is mirrored into Snowflake managed tables. dbt and dbt-wizard model it bronze→silver→gold.
          Run-time agents answer natural-language questions on top, reading the same gold layer humans do. No lock-in. No vendor TARDIS.
        </p>

        <pre className="mt-10 overflow-x-auto bg-vortex border border-gallifrey/25 p-5 text-xs leading-relaxed text-bone/85 font-mono">{`        Wikidata        TARDIS Wiki        TMDB
              \\             |              /
               Fivetran (3 managed connectors)
                            |
                 S3 + Apache Iceberg (open)
                            |
                  Snowflake (managed tables)
                            |
                    dbt + dbt-wizard
                            |
        bronze.* ─→ silver.* ─→ gold.dim_doctor, gold.dim_companion,
                                gold.dim_monster, gold.dim_episode,
                                gold.fct_appearance, gold.fct_regeneration
                            |
          ┌─────────┬───────┴────────┬─────────────┐
         BI     Run-time          TARDIS         Notebooks
                 agents          front end`}</pre>

        <section className="mt-12">
          <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-4">Why ODI for this dataset?</h2>
          <p className="text-bone/85 leading-relaxed max-w-prose">
            Because the canon is messy, contested, and federated. Wikidata has structured
            triples; the TARDIS Wiki has free-text richness; TMDB has cast & crew. None
            of those sources owns the others. An open-lake architecture lets us materialise
            every story with all three perspectives joined, and lets any engine — Snowflake,
            DuckDB, a notebook, a Slack bot — read the same bytes.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-4">Run-time agent sample questions</h2>
          <ul className="space-y-1.5 text-bone/85">
            <li>&middot; Which monsters appear across both classic (≤ 1989) and modern (≥ 2005) episodes?</li>
            <li>&middot; Which companion travelled with the most Doctors?</li>
            <li>&middot; Show every regeneration story in chronological order; include the actor entering and exiting.</li>
            <li>&middot; Which decade has the highest density of recurring-foe episodes?</li>
            <li>&middot; Which Doctor faced the Master the most times?</li>
            <li>&middot; List every story that introduces a new monster species that later returns at least twice.</li>
          </ul>
          <p className="text-sm text-bone/65 italic mt-4">
            Each of these resolves with at most three joins on the gold layer. The live
            /submit page mocks the endpoint; the real one runs on the dbt-wizard run-time, whose four
            sub-agents (Explorer, Summary, Worker, Verification) read the same gold layer humans do.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-4">Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-tardisLt/30 bg-panel/40 p-4">
              <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80">Ingest</p>
              <p className="text-sm text-bone/85 mt-2">Fivetran managed connectors. 3 sources, hands-off after setup.</p>
            </div>
            <div className="border border-tardisLt/30 bg-panel/40 p-4">
              <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80">Storage</p>
              <p className="text-sm text-bone/85 mt-2">Apache Iceberg on S3. Mirrored into Snowflake managed tables.</p>
            </div>
            <div className="border border-tardisLt/30 bg-panel/40 p-4">
              <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80">Transform</p>
              <p className="text-sm text-bone/85 mt-2">dbt Core targeting Snowflake. Bronze → silver → gold + Semantic Layer.</p>
            </div>
            <div className="border border-tardisLt/30 bg-panel/40 p-4">
              <p className="type text-[10px] uppercase tracking-[0.3em] text-gallifrey/80">Activation</p>
              <p className="text-sm text-bone/85 mt-2">dbt-wizard run-time agents over the gold layer. Next.js static export to GitHub Pages.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
