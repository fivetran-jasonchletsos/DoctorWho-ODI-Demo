-- gold.fct_regeneration — one row per Doctor→Doctor regeneration event.
-- Records the story that triggered it and the cause.
with wd as (
    select * from {{ source('bronze_wikidata', 'episodes') }}
)
select
    wd.canonical_title        as story,
    wd.year                   as year,
    wd.from_doctor            as from_incarnation,
    wd.to_doctor              as to_incarnation,
    wd.regeneration_cause     as cause
from wd
where wd.is_regeneration_story = true
