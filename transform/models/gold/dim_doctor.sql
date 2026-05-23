-- gold.dim_doctor — one row per incarnation of the Doctor (including
-- War, Fugitive, Curator, Meta-Crisis). Wikidata QID + the actor's
-- portrait Q-id, joined to TARDIS-wiki narrative blurb.

with wd as (
    select * from {{ source('bronze_wikidata', 'doctors') }}
),
narrative as (
    select * from {{ source('bronze_tardis_wiki', 'doctor_pages') }}
)
select
    wd.qid                                  as doctor_qid,
    wd.incarnation_number                   as incarnation,
    wd.actor                                as actor,
    wd.era_start::date                      as era_start,
    wd.era_end::date                        as era_end,
    wd.is_canon                             as is_canon,
    narrative.summary                       as narrative,
    narrative.signature_costume             as costume,
    narrative.catchphrase                   as catchphrase
from wd
left join narrative
  on lower(narrative.title) = lower(wd.canonical_title)
