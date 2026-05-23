// Related-stories similarity engine for the Whoniverse.
//
// Mirrors the LinerNotes Jaccard + weighted approach, adapted for
// Doctor Who. Similarity signals:
//   - shared monsters (Daleks-vs-Daleks is strongest)
//   - shared companions
//   - same Doctor / adjacent Doctor
//   - era proximity (decade)
//
// Runs entirely at build time / on first access, so the static site
// ships a full similarity graph with no runtime API.

import { episodes, type Episode } from "./episodes";
import { episodeSlug } from "@/components/slugs";

export type CatalogWork = {
  slug: string;
  title: string;
  year: number;
  doctor: string;
  format: Episode["format"];
  blurb: string;
};

function allWorks(): CatalogWork[] {
  return episodes.map((e) => ({
    slug: episodeSlug(e.title, e.year),
    title: e.title,
    year: e.year,
    doctor: e.doctor,
    format: e.format,
    blurb: e.blurb,
  }));
}

export type WorkTags = {
  monsters: string[];
  companions: string[];
  doctor: string;
  decade: number;
};

function tagsForEpisode(e: Episode): WorkTags {
  return {
    monsters: e.monsters ?? [],
    companions: e.companions ?? [],
    doctor: e.doctor,
    decade: Math.floor(e.year / 10) * 10,
  };
}

const W_MONSTER   = 1.6;   // shared monster is the strongest signal
const W_COMPANION = 1.2;
const W_DOCTOR    = 1.0;
const W_ERA       = 0.4;
const K = 8;

function jaccard(a: string[], b: string[]): { score: number; shared: string[] } {
  if (a.length === 0 || b.length === 0) return { score: 0, shared: [] };
  const setA = new Set(a);
  const shared = b.filter((x) => setA.has(x));
  const union = new Set([...a, ...b]).size;
  return { score: shared.length / union, shared };
}

function eraScore(a: WorkTags, b: WorkTags): number {
  const gap = Math.abs(a.decade - b.decade) / 10;
  if (gap === 0) return 1;
  if (gap >= 5) return 0;
  return 1 - gap / 5;
}

function doctorScore(a: WorkTags, b: WorkTags): number {
  if (a.doctor === b.doctor) return 1;
  const an = parseInt(a.doctor, 10);
  const bn = parseInt(b.doctor, 10);
  if (!isNaN(an) && !isNaN(bn)) {
    const gap = Math.abs(an - bn);
    if (gap === 1) return 0.55;
    if (gap === 2) return 0.25;
  }
  return 0;
}

function pairScore(a: WorkTags, b: WorkTags) {
  const m = jaccard(a.monsters, b.monsters);
  const c = jaccard(a.companions, b.companions);
  const d = doctorScore(a, b);
  const era = eraScore(a, b);
  const raw = W_MONSTER * m.score + W_COMPANION * c.score + W_DOCTOR * d + W_ERA * era;
  const max = W_MONSTER + W_COMPANION + W_DOCTOR + W_ERA;
  return {
    score: raw / max,
    sharedMonsters: m.shared,
    sharedCompanions: c.shared,
    sameDoctor: a.doctor === b.doctor,
  };
}

function whyCopy(
  s: { sharedMonsters: string[]; sharedCompanions: string[]; sameDoctor: boolean },
  aDecade: number,
  bDecade: number
): string {
  if (s.sharedMonsters.length > 0) {
    const m = s.sharedMonsters[0];
    return `Both feature the ${m}`;
  }
  if (s.sharedCompanions.length > 0) {
    return `${s.sharedCompanions.slice(0, 2).join(" and ")} in both`;
  }
  if (s.sameDoctor) return "Same Doctor's era";
  if (aDecade === bDecade) return `${aDecade}s adjacent`;
  return "Adjacent sensibility";
}

export type RelatedNeighbor = {
  slug: string;
  work: CatalogWork;
  score: number;
  why: string;
  sharedMonsters: string[];
  sharedCompanions: string[];
};

type TaggedWork = { work: CatalogWork; tags: WorkTags };

let _cache: Map<string, RelatedNeighbor[]> | null = null;

function build(): Map<string, RelatedNeighbor[]> {
  const works = allWorks();
  const tagged: TaggedWork[] = works.map((w) => {
    const ep = episodes.find((e) => episodeSlug(e.title, e.year) === w.slug)!;
    return { work: w, tags: tagsForEpisode(ep) };
  });
  const result = new Map<string, RelatedNeighbor[]>();

  for (let i = 0; i < tagged.length; i++) {
    const a = tagged[i];
    const scored: RelatedNeighbor[] = [];
    for (let j = 0; j < tagged.length; j++) {
      if (i === j) continue;
      const b = tagged[j];
      const s = pairScore(a.tags, b.tags);
      if (s.score <= 0) continue;
      scored.push({
        slug: b.work.slug,
        work: b.work,
        score: s.score,
        why: whyCopy(s, a.tags.decade, b.tags.decade),
        sharedMonsters: s.sharedMonsters,
        sharedCompanions: s.sharedCompanions,
      });
    }
    scored.sort((x, y) => y.score - x.score);
    result.set(a.work.slug, scored.slice(0, K));
  }
  return result;
}

export function relatedFor(slug: string): RelatedNeighbor[] {
  if (!_cache) _cache = build();
  return _cache.get(slug) ?? [];
}

export function workBySlug(slug: string): CatalogWork | null {
  return allWorks().find((w) => w.slug === slug) ?? null;
}

export function tagsFor(slug: string): WorkTags | null {
  const w = workBySlug(slug);
  if (!w) return null;
  const ep = episodes.find((e) => episodeSlug(e.title, e.year) === w.slug);
  return ep ? tagsForEpisode(ep) : null;
}

export function allTaggedWorks(): { work: CatalogWork; tags: WorkTags; neighbors: RelatedNeighbor[] }[] {
  if (!_cache) _cache = build();
  const works = allWorks();
  return works.map((w) => {
    const ep = episodes.find((e) => episodeSlug(e.title, e.year) === w.slug)!;
    return {
      work: w,
      tags: tagsForEpisode(ep),
      neighbors: _cache!.get(w.slug) ?? [],
    };
  });
}
