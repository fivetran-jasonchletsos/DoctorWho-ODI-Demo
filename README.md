# DoctorWho-ODI-Demo · TARDIS Index File

End-to-end ODI demonstration built around the Whoniverse. Every Doctor,
every companion, every recurring monster, every load-bearing story —
all pulled from open APIs by Fivetran, modeled by dbt and dbt-wizard into a
Snowflake gold layer, and surfaced through a TARDIS-themed Next.js front end.
**dbt-wizard run-time agents** read the same gold tables humans do and answer
natural-language questions about the canon.

Built for Sarah (sister-in-law) and Peter (father). Dedication lives in
the home page below the hero and in the footer of every page.

## Sources

| Source | Connector | What it gives us | Bronze schema |
|---|---|---|---|
| Wikidata | Fivetran HTTP source (SPARQL endpoint) | Doctors, companions, monsters, episodes — structured triples with stable QIDs | `bronze_wikidata` |
| TARDIS Wiki (Fandom) | Fivetran HTTP source | Free-text descriptions, era detail, in-universe trivia | `bronze_tardis_wiki` |
| TMDB | Fivetran TMDB / HTTP source | Cast & crew, broadcast dates, poster paths | `bronze_tmdb` |
| IMDb | Fivetran HTTP source (non-commercial datasets) | Ratings, vote counts, episode-tree linkage. Anchored on `tt0056751` (classic), `tt0436992` (modern) and `tt2326758` (*An Adventure in Space and Time*) | `bronze_imdb` |

The /architecture page walks visitors through this pipeline with the
same lineage diagram the industry demos use.

## Stack

- **Ingest**: Fivetran managed connectors (3 sources, all hands-off after setup)
- **Storage**: Apache Iceberg in S3 (open foundation) → mirrored into Snowflake managed tables
- **Transform**: dbt Core plus dbt-wizard targeting Snowflake; bronze → silver → gold + a small Semantic Layer
- **Activation**: dbt-wizard run-time agents on `gold.*` tables for NL Q&A; humans and agents read the same gold layer
- **Surface**: Next.js 14 static export → GitHub Pages

```
         Wikidata     TARDIS Wiki      TMDB
              \           |          /
               Fivetran (3 connectors)
                       |
        S3 + Iceberg  ⇄  Snowflake (managed tables)
                       |
                dbt + dbt-wizard
                       |
       gold.dim_doctor · gold.dim_companion · gold.dim_monster
       gold.dim_episode · gold.fct_appearance · gold.fct_regeneration
                       |
        ┌──────────────┼───────────────┬──────────────┐
       BI       Run-time           TARDIS         Notebooks
                 agents          front end
```

## Layout

| Path | What lives there |
|---|---|
| `connectors/` | Fivetran connector recipes for each source |
| `infra/` | Terraform (S3 + Glue) + `snowflake.sql` DDL for the warehouse, db, schemas, role |
| `transform/` | dbt project — bronze sources, silver staging, gold dims/facts, semantic-layer metrics |
| `whoniverse-app/` | Next.js 14 + Tailwind 3 TARDIS-themed front end |

## Pages

- `/` — Hero + dedication for Sarah & Peter + grid of every Doctor
- `/doctors` — Classic, modern, and anomaly incarnations (War, Fugitive, Curator, Meta-Crisis)
- `/companions` — The crew across 60+ years
- `/monsters` — Rogues' gallery: Daleks, Cybermen, the Master, Weeping Angels, Sutekh, the Toymaker…
- `/episodes` — Curated load-bearing stories, grouped by decade
- `/tardis` — Sonic screwdriver, psychic paper, K-9, the cloister bell, eight console rooms
- `/connections` — Cross-canon links (Captain Jack → Face of Boe, Sutekh on the TARDIS roof, etc.)
- `/related` — Weighted-Jaccard similarity engine across all stories
- `/timeline` — Year-by-year, classic through Gatwa, including the Wilderness Years
- `/submit` — dbt-wizard run-time agent mock endpoint
- `/architecture` — ODI thesis with the lineage diagram
- `/pipeline` — Connector health + layer status

## Why run-time agents sit on this data

The gold layer is small (~20 Doctors, ~40 companions, ~30 monsters,
~80 stories in this demo) but the joins are rich: a question like
"which monsters appear across both classic and modern Who?" exercises
three joins. A dbt-wizard run-time agent can answer it in one shot. The
run-time has four sub-agents (Explorer, Summary, Worker, Verification),
and humans and agents read the same gold layer. The /submit page and the
/architecture run-time agent panel show example questions.

## Local dev

```bash
cd whoniverse-app
npm ci
npm run dev   # http://localhost:3000
```

## License

Demo code. Data is derived from public APIs (Wikidata, TARDIS Wiki, TMDB).
All character names, story titles, and franchise concepts are the
property of the BBC; we use them here for non-commercial educational
demonstration.

## For

Sarah & Peter — across two generations, one family, sixty-three years
of wandering.
