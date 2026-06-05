# whoniverse — dbt project

Transforms Fivetran-landed bronze data into the silver and gold layers
in Snowflake. The gold layer is what the dbt-wizard run-time agents see,
and humans and agents read the same gold layer.

## Run

```bash
cp profiles.yml.example ~/.dbt/profiles.yml
export SNOWFLAKE_ACCOUNT=... SNOWFLAKE_USER=... SNOWFLAKE_PASSWORD=...
dbt deps
dbt build
```

## Models

- `bronze/sources.yml` — declares the three bronze schemas Fivetran lands
- `silver/` — staging models per source (not bundled in this skeleton)
- `gold/` — `dim_doctor`, `dim_companion`, `dim_monster`, `dim_episode`,
  `fct_appearance`, `fct_regeneration`

## Run-time agents

Once `dbt build` has populated `gold.*`:

1. Point the dbt-wizard run-time at
   `whoniverse.gold.whoniverse_corpus` (the semantic model — define it
   in a future `_gold__models.yml`). The run-time has four sub-agents
   (Explorer, Summary, Worker, Verification).
2. Add NL question suggestions like:
   - "Which monsters appear across both classic and modern Who?"
   - "Which companion travelled with the most Doctors?"
   - "Show every regeneration story in chronological order."
   - "Which Doctor faced the Master the most times?"

The `/architecture` page references the run-time agents as the natural-language
interface; wire it through the dbt-wizard run-time or a small
Cloudflare Worker if you want browser-side calls.
