-- gold.dim_monster — one row per recurring foe species or individual.
with wd as (
    select * from {{ source('bronze_wikidata', 'monsters') }}
),
narrative as (
    select * from {{ source('bronze_tardis_wiki', 'monster_pages') }}
)
select
    wd.qid                            as monster_qid,
    wd.canonical_name                 as name,
    wd.category                       as category,
    wd.homeworld                      as homeworld,
    wd.first_story                    as first_story,
    wd.first_year                     as first_year,
    wd.threat_level                   as threat_level,
    narrative.signature               as signature,
    narrative.weakness                as weakness
from wd
left join narrative
  on lower(narrative.title) = lower(wd.canonical_name)
