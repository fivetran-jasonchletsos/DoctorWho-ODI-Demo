-- gold.dim_companion — one row per recurring TARDIS crew member.
with wd as (
    select * from {{ source('bronze_wikidata', 'companions') }}
)
select
    wd.qid                            as companion_qid,
    wd.canonical_name                 as name,
    wd.actor                          as actor,
    wd.first_year                     as first_year,
    wd.last_year                      as last_year,
    wd.travelled_with_doctors         as doctors,    -- array of incarnations
    wd.fate                           as fate,
    wd.origin                         as origin
from wd
