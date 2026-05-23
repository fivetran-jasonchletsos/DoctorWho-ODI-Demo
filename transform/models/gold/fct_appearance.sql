-- gold.fct_appearance — one row per (entity, episode) pair.
-- Powers questions like "which monsters appear in both classic and
-- modern Who?" and "which companion travelled with the most Doctors?"
with src as (
    select * from {{ source('bronze_wikidata', 'appearances') }}
)
select
    src.episode_qid,
    src.entity_qid,
    src.entity_type           -- 'companion' | 'monster'
from src
