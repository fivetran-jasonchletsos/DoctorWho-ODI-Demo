// The Doctors. Numbered incarnations plus the canon-bending extras
// (War, Fugitive, Curator, Meta-Crisis, Timeless Child Ruth).
// Pulled (per the ODI thesis) from Wikidata + the TARDIS wiki on
// nocookie.net. Era spans use first/last regular TV appearance.

export type Doctor = {
  number: string;              // "1", "2", ... "15", "War", "Fugitive", "Curator", "Meta-Crisis"
  actor: string;
  era: string;                 // "1963–1966"
  yearStart: number;
  yearEnd: number;             // current = 2026 placeholder
  costumeHook: string;         // the signature visual
  catchphrase?: string;
  defining: string;            // single best-known scene/serial
  blurb: string;
  tardisQuirk?: string;        // what's broken/odd about *their* TARDIS interior
  classic: boolean;            // true for 1–8 + War, false for 9+
};

export const doctors: Doctor[] = [
  {
    number: "1", actor: "William Hartnell", era: "1963–1966",
    yearStart: 1963, yearEnd: 1966,
    costumeHook: "Edwardian frock coat, wing collar, cane",
    catchphrase: "Hmm? My dear boy…",
    defining: "An Unearthly Child — the original.",
    blurb: "Cantankerous, brilliant, granddaughter in tow. Stole the TARDIS, started everything. The face on the wall of every Doctor since.",
    tardisQuirk: "Chameleon circuit broke in 1963 and never came back.",
    classic: true,
  },
  {
    number: "2", actor: "Patrick Troughton", era: "1966–1969",
    yearStart: 1966, yearEnd: 1969,
    costumeHook: "Baggy check trousers, oversized fur coat, bowl cut, recorder",
    catchphrase: "Oh my giddy aunt!",
    defining: "The War Games — tried by his own people.",
    blurb: "The cosmic hobo. Recorder always at hand, pockets full of useful nothing. Introduced the Time Lords; left the show by being exiled to Earth.",
    classic: true,
  },
  {
    number: "3", actor: "Jon Pertwee", era: "1970–1974",
    yearStart: 1970, yearEnd: 1974,
    costumeHook: "Velvet smoking jacket, frilled shirt, Bessie the yellow roadster",
    catchphrase: "Reverse the polarity of the neutron flow.",
    defining: "Inferno — the parallel-fascist-Earth one.",
    blurb: "Exiled to Earth by the Time Lords. UNIT scientific advisor. Venusian aikido. The Master shows up basically every fortnight.",
    classic: true,
  },
  {
    number: "4", actor: "Tom Baker", era: "1974–1981",
    yearStart: 1974, yearEnd: 1981,
    costumeHook: "Floor-length multicoloured scarf, wide-brimmed hat, jelly babies",
    catchphrase: "Would you like a jelly baby?",
    defining: "Genesis of the Daleks — \"Have I that right?\"",
    blurb: "Longest-serving Doctor (seven seasons). The face most people in the world picture when you say \"Doctor Who.\" Sonic screwdriver in one pocket, K-9 trotting behind.",
    tardisQuirk: "The wooden secondary console room — only Doctor to use it.",
    classic: true,
  },
  {
    number: "5", actor: "Peter Davison", era: "1981–1984",
    yearStart: 1981, yearEnd: 1984,
    costumeHook: "Edwardian cricket whites, red question marks on lapels, celery on the lapel",
    catchphrase: "Brave heart, Tegan.",
    defining: "The Caves of Androzani — regenerated saving Peri.",
    blurb: "Youngest Doctor at the time. Allergic to praxis gas (hence the celery — it turns purple when he's about to die). Soft-voiced, conflicted, easily outvoted by his own companions.",
    classic: true,
  },
  {
    number: "6", actor: "Colin Baker", era: "1984–1986",
    yearStart: 1984, yearEnd: 1986,
    costumeHook: "The infamous patchwork technicolour coat",
    catchphrase: "I am the Doctor — whether you like it or not.",
    defining: "Trial of a Time Lord — the show on trial inside the show.",
    blurb: "Loud, brash, abrasive on purpose; warmed into one of the kinder Doctors before they fired him. The Big Finish audios are where Six really came alive.",
    classic: true,
  },
  {
    number: "7", actor: "Sylvester McCoy", era: "1987–1989, 1996",
    yearStart: 1987, yearEnd: 1996,
    costumeHook: "Question-mark umbrella, pullover with question marks, panama hat",
    catchphrase: "Time will tell. It always does.",
    defining: "Remembrance of the Daleks — the Hand of Omega.",
    blurb: "Started as a clown, became the chess master. Manipulated whole planets for the long game. Final classic Doctor; brought the Cartmel Masterplan and the New Adventures novels.",
    classic: true,
  },
  {
    number: "8", actor: "Paul McGann", era: "1996, 2013",
    yearStart: 1996, yearEnd: 2013,
    costumeHook: "Velvet frock coat, cravat, Wild Bill Hickok wig in the TV Movie",
    catchphrase: "Physician, heal thyself.",
    defining: "The Night of the Doctor — eight minutes, eight years of waiting.",
    blurb: "One TV movie. One eight-minute mini-episode that retroactively made him one of the most-loved Doctors. Eight is the Big Finish Doctor: hundreds of audio adventures fill in the Time War.",
    classic: true,
  },
  {
    number: "War", actor: "John Hurt", era: "2013",
    yearStart: 2013, yearEnd: 2013,
    costumeHook: "Burgundy leather coat, scarred and dust-stained, bandolier",
    catchphrase: "No more.",
    defining: "The Day of the Doctor — \"No sir. All thirteen!\"",
    blurb: "The Doctor who broke the promise. Fought the Time War, locked away in his own memory, written into existence by the 50th anniversary. Not Eight, not Nine — the one in between who doesn't get a number.",
    classic: true,
  },
  {
    number: "9", actor: "Christopher Eccleston", era: "2005",
    yearStart: 2005, yearEnd: 2005,
    costumeHook: "Black leather jacket, jumper, U-boat-captain stance",
    catchphrase: "Fantastic!",
    defining: "Dalek (2005) — one Dalek, one cliffhanger, a whole reboot.",
    blurb: "PTSD with a sonic. Survivor's guilt all over his face. One season, one perfect arc; he meets Rose, finds his joy back, and regenerates the moment he wins.",
    classic: false,
  },
  {
    number: "10", actor: "David Tennant", era: "2005–2010, 2023",
    yearStart: 2005, yearEnd: 2023,
    costumeHook: "Brown pinstripe suit, long coat, Chuck Taylors",
    catchphrase: "Allons-y! / I'm sorry. I'm so sorry.",
    defining: "Doomsday — \"Rose Tyler—\"",
    blurb: "The fan-favourite by every poll ever taken. Quotes things. Cries at things. Came back in 2023 to die properly the second time. Has a half-human duplicate in a parallel universe; never asks.",
    tardisQuirk: "Coral-strut console room with the rotor going floor to ceiling.",
    classic: false,
  },
  {
    number: "Meta-Crisis", actor: "David Tennant", era: "2008",
    yearStart: 2008, yearEnd: 2008,
    costumeHook: "Same brown suit, blue suit, one heart",
    defining: "Journey's End — left in Pete's World with Rose.",
    blurb: "Half Doctor, half Donna. Born in a biological metacrisis, one heart, finite lifespan. The Doctor's polite way of giving Rose a happy ending without staying himself.",
    classic: false,
  },
  {
    number: "11", actor: "Matt Smith", era: "2010–2013",
    yearStart: 2010, yearEnd: 2013,
    costumeHook: "Tweed jacket, bow tie, fez (\"fezes are cool\"), Stetson",
    catchphrase: "Bow ties are cool. / Geronimo!",
    defining: "The Pandorica Opens / The Big Bang — \"I am the Doctor.\"",
    blurb: "Old man in a young body. Cracks in the universe, the Silence, River Song's whole life lived backwards. Lived 900 years on Trenzalore; died of old age and started over.",
    tardisQuirk: "Glass-floor console room with the big spinny rotor — fans call it the steampunk one.",
    classic: false,
  },
  {
    number: "12", actor: "Peter Capaldi", era: "2014–2017",
    yearStart: 2014, yearEnd: 2017,
    costumeHook: "Velvet Crombie, red lining, electric guitar, sonic sunglasses",
    catchphrase: "Am I a good man?",
    defining: "Heaven Sent — 4.5 billion years in a confession dial.",
    blurb: "Attack eyebrows. Punched a diamond wall for billions of years. Asked the most important questions: am I a good man, and where's the rest of the tea? Has a literal guitar.",
    classic: false,
  },
  {
    number: "13", actor: "Jodie Whittaker", era: "2018–2022",
    yearStart: 2018, yearEnd: 2022,
    costumeHook: "Lilac coat, rainbow shirt, suspenders, culottes",
    catchphrase: "Right then. Allons—right.",
    defining: "The Timeless Children — \"I'm the Timeless Child.\"",
    blurb: "First woman Doctor. Found family of three companions at once. Found out she's the Timeless Child — the original from whom all Time Lord regenerations descend — which broke the lore wide open and not everyone's recovered.",
    classic: false,
  },
  {
    number: "Fugitive", actor: "Jo Martin", era: "2020",
    yearStart: 2020, yearEnd: 2020,
    costumeHook: "Brown leather coat, beanie, Mancunian accent",
    catchphrase: "Have you ever been told you talk too much?",
    defining: "Fugitive of the Judoon — the Doctor before the Doctor.",
    blurb: "An earlier, pre-Hartnell incarnation hiding on Earth as a woman named Ruth. The first piece of evidence the Doctor's whole life story was a lie. Currently the canon's biggest open thread.",
    classic: false,
  },
  {
    number: "14", actor: "David Tennant", era: "2023",
    yearStart: 2023, yearEnd: 2023,
    costumeHook: "Same long coat, same Chucks, slightly older around the eyes",
    catchphrase: "I'm allowed to.",
    defining: "The Giggle — the bigeneration with Fifteen.",
    blurb: "The Doctor regenerated back into a face he already knew so he could go and finally rest with Donna's family. Bigenerated into Fifteen and stayed behind. The first Doctor allowed to retire.",
    classic: false,
  },
  {
    number: "15", actor: "Ncuti Gatwa", era: "2023–present",
    yearStart: 2023, yearEnd: 2026,
    costumeHook: "Tartan kilt, orange shirt, leather jacket, bare-armed energy",
    catchphrase: "Babes.",
    defining: "The Devil's Chord — sings a Beatles song into the universe.",
    blurb: "Bigenerated from Fourteen — fully healed, joyful, dances. The first Doctor unburdened. Travelling with Ruby Sunday, then with Belinda Chandra. Reality itself is the threat now.",
    tardisQuirk: "Coffee machine console room — yellow trim, big roundels, a literal jukebox.",
    classic: false,
  },
  {
    number: "Curator", actor: "Tom Baker", era: "2013",
    yearStart: 2013, yearEnd: 2013,
    costumeHook: "Tweed and that smile",
    catchphrase: "Who knows? Who…",
    defining: "The Day of the Doctor — \"You know I really think you might.\"",
    blurb: "Older Doctor (or something like him) curating the National Gallery's Under-Gallery in the far future. Implies he may revisit favourite faces in retirement. Officially: unspecified. Unofficially: Four.",
    classic: false,
  },
];

export function doctorsByEra(): { classic: Doctor[]; modern: Doctor[]; other: Doctor[] } {
  return {
    classic: doctors.filter((d) => d.classic && !["War", "Curator"].includes(d.number)),
    modern: doctors.filter((d) => !d.classic && !["Fugitive", "Meta-Crisis", "Curator"].includes(d.number)),
    other: doctors.filter((d) => ["War", "Fugitive", "Meta-Crisis", "Curator"].includes(d.number)),
  };
}
