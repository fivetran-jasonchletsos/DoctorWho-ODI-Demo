-- gold.dim_episode — one row per indexed story (serial or single episode).
with wd as (
    select * from {{ source('bronze_wikidata', 'episodes') }}
),
tmdb as (
    select * from {{ source('bronze_tmdb', 'tv_episodes') }}
)
select
    wd.qid                            as episode_qid,
    wd.canonical_title                as title,
    wd.year                           as year,
    wd.doctor_incarnation             as doctor,
    wd.format                         as format,   -- serial | episode | special | minisode
    coalesce(tmdb.runtime_minutes, 0) as runtime_minutes,
    wd.significance                   as significance
from wd
left join tmdb
  on lower(tmdb.canonical_title) = lower(wd.canonical_title)
  and tmdb.air_year = wd.year
