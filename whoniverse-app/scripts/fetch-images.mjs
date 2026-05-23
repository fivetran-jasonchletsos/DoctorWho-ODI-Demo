// Fetches Wikipedia thumbnails for every Doctor (actor portrait),
// every companion (actor portrait) and every recurring monster
// (concept image). Saves to public/images-manifest.json keyed by:
//   doctor:<number>      → actor portrait
//   companion:<name>     → actor portrait
//   monster:<name>       → concept image
//
// Uses the Wikipedia REST API summary endpoint, which returns a
// thumbnail.source URL on upload.wikimedia.org. Those URLs are
// stable for hotlinking under Wikipedia's licence terms.
//
// Run after editing the data libs:
//   npx tsx scripts/fetch-images.mjs

import { writeFile } from "node:fs/promises";
import { doctors }    from "../src/lib/doctors.ts";
import { companions } from "../src/lib/companions.ts";
import { monsters }   from "../src/lib/monsters.ts";

// Override map: when the entity name doesn't match the Wikipedia
// article title cleanly, point to the right slug here.
const TITLE_OVERRIDES = {
  // Doctors: actor articles (clearest portrait, not "Tenth Doctor" iconography)
  "doctor:1":  "William_Hartnell",
  "doctor:2":  "Patrick_Troughton",
  "doctor:3":  "Jon_Pertwee",
  "doctor:4":  "Tom_Baker",
  "doctor:5":  "Peter_Davison",
  "doctor:6":  "Colin_Baker",
  "doctor:7":  "Sylvester_McCoy",
  "doctor:8":  "Paul_McGann",
  "doctor:War":"John_Hurt",
  "doctor:9":  "Christopher_Eccleston",
  "doctor:10": "David_Tennant",
  "doctor:Meta-Crisis": "David_Tennant",
  "doctor:11": "Matt_Smith_(actor)",
  "doctor:12": "Peter_Capaldi",
  "doctor:13": "Jodie_Whittaker",
  "doctor:Fugitive": "Jo_Martin",
  "doctor:14": "David_Tennant",
  "doctor:15": "Ncuti_Gatwa",
  "doctor:Curator": "Tom_Baker",

  // Iconic companions
  "companion:Sarah Jane Smith":  "Elisabeth_Sladen",
  "companion:Rose Tyler":        "Billie_Piper",
  "companion:Donna Noble":       "Catherine_Tate",
  "companion:Amy Pond":          "Karen_Gillan",
  "companion:Rory Williams":     "Arthur_Darvill",
  "companion:River Song":        "Alex_Kingston",
  "companion:Clara Oswald":      "Jenna_Coleman",
  "companion:Bill Potts":        "Pearl_Mackie",
  "companion:Captain Jack Harkness": "John_Barrowman",
  "companion:Yasmin Khan":       "Mandip_Gill",
  "companion:Graham O'Brien":    "Bradley_Walsh",
  "companion:Ruby Sunday":       "Millie_Gibson",
  "companion:Belinda Chandra":   "Varada_Sethu",
  "companion:Ace":               "Sophie_Aldred",
  "companion:Jamie McCrimmon":   "Frazer_Hines",
  "companion:Romana II":         "Lalla_Ward",
  "companion:Tegan Jovanka":     "Janet_Fielding",
  "companion:Wilfred Mott":      "Bernard_Cribbins",
  "companion:Martha Jones":      "Freema_Agyeman",
  "companion:Brigadier Alistair Gordon Lethbridge-Stewart": "Nicholas_Courtney",
  "companion:Kate Lethbridge-Stewart": "Jemma_Redgrave",
  "companion:Susan Foreman":     "Susan_Foreman",
  "companion:K-9":               "K9_(Doctor_Who)",

  // Iconic monsters (concept pages)
  "monster:Daleks":              "Dalek",
  "monster:Davros":              "Davros",
  "monster:Cybermen":            "Cyberman",
  "monster:The Master / Missy":  "Master_(Doctor_Who)",
  "monster:Weeping Angels":      "Weeping_Angel",
  "monster:The Silence":         "The_Silence_(Doctor_Who)",
  "monster:Sontarans":           "Sontaran",
  "monster:Zygons":              "Zygon",
  "monster:Ice Warriors":        "Ice_Warrior",
  "monster:Silurians":           "Silurian_(Doctor_Who)",
  "monster:The Great Intelligence": "Great_Intelligence",
  "monster:Vashta Nerada":       "Silence_in_the_Library",
  "monster:The Ood":             "Ood",
  "monster:Slitheen / Raxacoricofallapatorians": "Slitheen",
  "monster:Sea Devils":          "Sea_Devils",
  "monster:Sutekh":              "Sutekh_(Doctor_Who)",
  "monster:The Toymaker":        "The_Celestial_Toymaker",
};

const UA = "WhoniverseODIDemo/1.0 (https://github.com/fivetran-jasonchletsos/DoctorWho-ODI-Demo; family build)";

async function fetchThumb(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.thumbnail?.source) return null;
  return {
    url: data.thumbnail.source,
    width: data.thumbnail.width,
    height: data.thumbnail.height,
    page: data.content_urls?.desktop?.page ?? null,
    credit: data.description ?? null,
  };
}

async function main() {
  const manifest = {};
  const targets = [];

  for (const d of doctors) {
    const key = `doctor:${d.number}`;
    targets.push([key, TITLE_OVERRIDES[key] ?? d.actor.replace(/ /g, "_")]);
  }
  for (const c of companions) {
    const key = `companion:${c.name}`;
    if (TITLE_OVERRIDES[key]) targets.push([key, TITLE_OVERRIDES[key]]);
  }
  for (const m of monsters) {
    const key = `monster:${m.name}`;
    if (TITLE_OVERRIDES[key]) targets.push([key, TITLE_OVERRIDES[key]]);
  }

  let ok = 0, miss = 0;
  for (const [key, title] of targets) {
    const thumb = await fetchThumb(title);
    if (thumb) {
      manifest[key] = thumb;
      ok++;
      process.stdout.write(".");
    } else {
      miss++;
      console.warn(`\n  miss: ${key} → ${title}`);
    }
    // Polite delay; Wikipedia asks for ≤200 rps but we're nice.
    await new Promise((r) => setTimeout(r, 60));
  }
  process.stdout.write("\n");

  await writeFile("public/images-manifest.json", JSON.stringify(manifest, null, 2));
  console.log(`wrote public/images-manifest.json: ${ok} hits, ${miss} misses`);
}

main().catch((e) => { console.error(e); process.exit(1); });
