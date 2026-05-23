# Fivetran connectors — TARDIS Index File (3 sources)

Three managed Fivetran connectors feed the Whoniverse. All three land
into the same Iceberg lake in S3, mirrored into Snowflake. dbt + Cortex
sit on top of the gold layer.

## The connectors

| Connector | Source | Bronze schema | Sync | Tables we use |
|---|---|---|---|---|
| Wikidata | SPARQL endpoint at `https://query.wikidata.org/sparql` (Fivetran HTTP source) | `bronze_wikidata` | Weekly | `doctors`, `companions`, `monsters`, `episodes`, `appearances` |
| TARDIS Wiki | `https://tardis.fandom.com/api.php` (Fandom MediaWiki, HTTP source via Fivetran Connector SDK) | `bronze_tardis_wiki` | Daily | `doctor_pages`, `monster_pages`, `episode_pages` |
| TMDB | `https://api.themoviedb.org/3/` (Fivetran TMDB / HTTP source) | `bronze_tmdb` | Daily | `tv_seasons`, `tv_episodes`, `people_credits` |

## Wikidata setup

A SPARQL query against `https://query.wikidata.org/sparql` for every
incarnation of the Doctor and the items they "fictional universe of"
link to.

Sample query:
```sparql
SELECT ?doctor ?doctorLabel ?actor ?actorLabel ?start ?end
WHERE {
  ?doctor wdt:P361 wd:Q721 .                          # part_of Doctor Who
  ?doctor wdt:P31  wd:Q15632617 .                     # instance of: fictional human (the Doctor incarnations)
  OPTIONAL { ?doctor wdt:P175 ?actor . }              # performer
  OPTIONAL { ?doctor wdt:P580 ?start . }              # start time
  OPTIONAL { ?doctor wdt:P582 ?end   . }              # end time
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
```

Connector config:
```
Connector type:       HTTP source
URL:                  https://query.wikidata.org/sparql
Headers:              { "Accept": "application/sparql-results+json" }
Schema:               bronze_wikidata
Tables landed:        doctors, companions, monsters, episodes, appearances
Sync frequency:       weekly (Wikidata churns slowly)
```

## TARDIS Wiki setup

The Fandom-hosted TARDIS Wiki MediaWiki API. Pulls every page in the
categories: `Doctor incarnations`, `Companions`, `Monsters`,
`Television stories`. Stores the wikitext + the parsed summary.

Sample request:
```
GET /api.php?action=parse&page=Tenth_Doctor&prop=text|sections&format=json
GET /api.php?action=query&list=categorymembers&cmtitle=Category:Companions&cmlimit=500&format=json
```

Connector config:
```
Connector type:       HTTP source (Fivetran Connector SDK custom)
Pagination:           cmcontinue
Auth:                 none (public; respect Fandom rate limits)
Schema:               bronze_tardis_wiki
Tables landed:        doctor_pages, monster_pages, episode_pages
Schema inference:     enabled
```

## TMDB setup

Fetches every Doctor Who TV season and episode from the official BBC
series and the classic series.

Query starter:
```
GET /tv/121   (TMDB id for the modern series)
GET /tv/76   (TMDB id for the classic series)
GET /tv/{id}/season/{n}
GET /tv/{id}/season/{n}/episode/{m}
```

Connector config:
```
Connector type:       TMDB (official Fivetran) or HTTP source
API key:              required (free tier OK)
Schema:               bronze_tmdb
Tables landed:        tv_seasons, tv_episodes, people_credits
Schema inference:     enabled
```

## Why three connectors and not one

Each source answers a different question:
- **Wikidata** has *structured triples with stable QIDs* for every
  Doctor, companion, monster and story. Best for joins, queryable in
  SPARQL.
- **TARDIS Wiki** has the *narrative richness* &mdash; the in-universe
  trivia, the signature costumes, the catchphrases &mdash; that
  Wikidata doesn't bother with.
- **TMDB** has the *production metadata* &mdash; air dates, runtimes,
  cast & crew &mdash; that the wikis treat as an afterthought.

This is the ODI thesis in concrete form: each source is best at what
it's best at, none of them is forced into the others' shape.
