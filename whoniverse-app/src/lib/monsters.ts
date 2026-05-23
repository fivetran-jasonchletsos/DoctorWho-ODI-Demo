// Rogues' gallery. Recurring foes only — the one-off monster of the week
// would balloon this to 400 entries. Wikidata gold table fct_appearance
// drives the firstStory / appearances counts in real ingest.

export type Monster = {
  name: string;
  category: "Dalek-adjacent" | "Cyber" | "Time Lord" | "Great Intelligence" | "Ancient" | "Trickster" | "Industrial" | "Domestic" | "Other";
  homeworld?: string;
  firstStory: string;
  firstYear: number;
  appearances: number;        // approximate count of TV stories
  threatLevel: 1 | 2 | 3 | 4 | 5;  // 5 = end-of-the-universe
  signature: string;          // visual / behavioural signature
  blurb: string;
  defeatedBy?: string;        // canonical "how do you beat them"
  iconic: boolean;
};

export const monsters: Monster[] = [
  {
    name: "Daleks", category: "Dalek-adjacent", homeworld: "Skaro",
    firstStory: "The Daleks", firstYear: 1963, appearances: 110, threatLevel: 5,
    signature: "Plunger. Whisk. \"EX-TER-MIN-ATE.\" Pepperpot.",
    blurb: "Davros's hate-engines. Show's longest-running enemy. Time War kicked it up; Genesis of the Daleks remains the franchise's moral centre. \"Have I that right?\"",
    defeatedBy: "Their own purity protocols, every time. Bracewell. The Hand of Omega. The Moment.",
    iconic: true,
  },
  {
    name: "Davros", category: "Dalek-adjacent", homeworld: "Skaro",
    firstStory: "Genesis of the Daleks", firstYear: 1975, appearances: 11, threatLevel: 5,
    signature: "Withered scientist in a Dalek base, single blue eye in the forehead.",
    blurb: "The man who made them. Has been retconned from withered Kaled scientist to whole-bodied young man in The Beginning. The franchise's purest villain.",
    iconic: true,
  },
  {
    name: "Cybermen", category: "Cyber", homeworld: "Mondas (and Cybus parallel)",
    firstStory: "The Tenth Planet", firstYear: 1966, appearances: 60, threatLevel: 5,
    signature: "Stomp. Tear tracks etched into the helmet. \"You will be upgraded.\"",
    blurb: "Earth's lost twin. Mondas, Telos, Cybus Industries, the Cyberiad. Killed Adric, killed Bill, killed the Brigadier and made him salute the Doctor anyway.",
    defeatedBy: "Gold (classic), emotional override (modern), the Master (Doctor Falls).",
    iconic: true,
  },
  {
    name: "The Master / Missy", category: "Time Lord", homeworld: "Gallifrey",
    firstStory: "Terror of the Autons", firstYear: 1971, appearances: 50, threatLevel: 5,
    signature: "Pinstripe, goatee (classic) / parasol, Mary-Poppins-with-a-Glock (Missy) / The drumbeat (Simm) / Big Finish all of the above.",
    blurb: "The Doctor's oldest friend, oldest enemy. Roger Delgado, Anthony Ainley, Eric Roberts, John Simm, Michelle Gomez, Sacha Dhawan. Drumbeats in the head from a Time Lord wormhole.",
    iconic: true,
  },
  {
    name: "The Rani", category: "Time Lord", homeworld: "Gallifrey",
    firstStory: "The Mark of the Rani", firstYear: 1985, appearances: 3, threatLevel: 4,
    signature: "Ruthless scientist Time Lady; uses people as test subjects.",
    blurb: "Amoral lab-coat counterpart to the Master. Mark Strickson said her TV outings under-served the character; the audios reclaim her. Long-rumoured returnee.",
    iconic: false,
  },
  {
    name: "Weeping Angels", category: "Ancient",
    firstStory: "Blink", firstYear: 2007, appearances: 7, threatLevel: 5,
    signature: "Stone statue. Becomes a statue whenever observed. Hands over eyes when desperate. Image of an Angel becomes an Angel.",
    blurb: "Send you to the past, feed on the life you would have lived. Don't blink. Don't even blink. Blink and you're dead. Single best monster of the modern era.",
    defeatedBy: "Quantum lock — keep them under observation by anything sentient, forever.",
    iconic: true,
  },
  {
    name: "The Silence", category: "Other",
    firstStory: "The Impossible Astronaut", firstYear: 2011, appearances: 5, threatLevel: 5,
    signature: "Edvard Munch's Scream in a suit. You forget them the moment you look away.",
    blurb: "A religious order, not a species (Day of the Moon). Engineered Melody Pond to kill the Doctor. \"Silence will fall when the question is asked.\"",
    defeatedBy: "Hypnotic suggestion: \"You should kill us all on sight.\"",
    iconic: true,
  },
  {
    name: "Sontarans", category: "Other", homeworld: "Sontar",
    firstStory: "The Time Warrior", firstYear: 1973, appearances: 15, threatLevel: 3,
    signature: "Potato-shaped clone warriors. Probic vent at the back of the neck.",
    blurb: "Eleven thousand year war with the Rutans. Honour above sense. \"Sontar-ha!\" Strax is one of theirs — domesticated.",
    defeatedBy: "A well-aimed shot to the probic vent.",
    iconic: true,
  },
  {
    name: "Zygons", category: "Other", homeworld: "Zygor",
    firstStory: "Terror of the Zygons", firstYear: 1975, appearances: 4, threatLevel: 3,
    signature: "Orange suction-cup amphibians; shapeshift via a body-print.",
    blurb: "Brilliant single-serial monster in 1975, returned in 50th anniversary, got the Day of the Doctor / Zygon Inversion two-parter that gave Twelve his \"war speech.\"",
    iconic: false,
  },
  {
    name: "Ice Warriors", category: "Other", homeworld: "Mars",
    firstStory: "The Ice Warriors", firstYear: 1967, appearances: 7, threatLevel: 3,
    signature: "Cold-blooded green-armoured Martians; hiss when angry.",
    blurb: "Honourable warriors of Mars. Eleven, Twelve and Thirteen all met them; Empress of Mars retconned them as a credible long-term Earth treaty partner.",
    iconic: false,
  },
  {
    name: "Silurians", category: "Ancient", homeworld: "Earth (pre-human)",
    firstStory: "Doctor Who and the Silurians", firstYear: 1970, appearances: 8, threatLevel: 3,
    signature: "Reptilian sapients, third eye, predates humanity by a billion years.",
    blurb: "The original Earthlings — the Doctor's deepest ethical bind. Madame Vastra is one of theirs, married to Jenny Flint.",
    iconic: false,
  },
  {
    name: "The Great Intelligence", category: "Great Intelligence",
    firstStory: "The Abominable Snowmen", firstYear: 1967, appearances: 5, threatLevel: 5,
    signature: "Disembodied mind; takes hosts (snow, snowmen, Walter Simeon, Yetis).",
    blurb: "Two and Eleven and Twelve fought it across decades. Walked into the Doctor's timestream in Name of the Doctor and broke him into pieces only Clara could put back together.",
    iconic: false,
  },
  {
    name: "The Beast", category: "Ancient", homeworld: "Krop Tor",
    firstStory: "The Impossible Planet", firstYear: 2006, appearances: 1, threatLevel: 5,
    signature: "Horned devil chained inside a planet orbiting a black hole.",
    blurb: "Older than the universe. Claimed to be the Devil that birthed every Devil. Ten met him at the bottom of a pit and refused to give him a name.",
    iconic: false,
  },
  {
    name: "The Trickster", category: "Trickster",
    firstStory: "Whatever Happened to Sarah Jane?", firstYear: 2007, appearances: 4, threatLevel: 4,
    signature: "Robed trickster; offers people second chances and weaponises the changes.",
    blurb: "Sarah Jane Adventures villain. Brought into the main show by Turn Left — every wrong choice in Donna's life can be traced to one of his bugs on her back.",
    iconic: false,
  },
  {
    name: "Vashta Nerada", category: "Other",
    firstStory: "Silence in the Library", firstYear: 2008, appearances: 1, threatLevel: 5,
    signature: "Piranhas of the air. Live in shadows; you get two shadows just before they bite.",
    blurb: "\"Hey. Who turned out the lights?\" The Library massacred them; River Song saved 4,022 people into the hard drive.",
    iconic: true,
  },
  {
    name: "The Ood", category: "Domestic", homeworld: "Ood-Sphere",
    firstStory: "The Impossible Planet", firstYear: 2006, appearances: 5, threatLevel: 2,
    signature: "Coral-pink head, translation orb on a tether, hindbrain in the palm.",
    blurb: "Sold as servants because humans cut out their hindbrains. Free Ood are gentle. Ood Sigma — \"Doctor-Donna, your song must end soon.\" Their songs killed Ten by knocking four times.",
    iconic: true,
  },
  {
    name: "Slitheen / Raxacoricofallapatorians", category: "Other", homeworld: "Raxacoricofallapatorius",
    firstStory: "Aliens of London", firstYear: 2005, appearances: 4, threatLevel: 2,
    signature: "Big green babies in human suits, joints unzipped at the forehead. Excessive farting.",
    blurb: "Family of criminal Raxacoricofallapatorians. The Slitheen are one family; Blathereen are another. Sarah Jane Adventures villains, mostly.",
    iconic: false,
  },
  {
    name: "The Family of Blood", category: "Other",
    firstStory: "Human Nature", firstYear: 2007, appearances: 1, threatLevel: 4,
    signature: "Possessed bodies of an Edwardian schoolboy, schoolmistress, scarecrow soldiers.",
    blurb: "Three-month-living gas family hunted the Doctor; he hid as John Smith and forgot himself for love. Punishments were biblical: scarecrow, mirror, frozen in time.",
    iconic: false,
  },
  {
    name: "The Toclafane", category: "Other",
    firstStory: "Utopia", firstYear: 2007, appearances: 1, threatLevel: 5,
    signature: "Floating chrome spheres; childlike voices; \"so old\".",
    blurb: "The last of humanity from the end of the universe, cannibalised back. The Master used them to invade their own past on a paradox engine in the TARDIS.",
    iconic: false,
  },
  {
    name: "The Midnight Entity", category: "Other",
    firstStory: "Midnight", firstYear: 2008, appearances: 1, threatLevel: 5,
    signature: "Voice that copies you, then pre-empts you, then takes you.",
    blurb: "Never seen. Never named. Beat the Doctor by stealing his words. Single best 45 minutes of horror the show has ever made.",
    iconic: true,
  },
  {
    name: "The Mara", category: "Other",
    firstStory: "Kinda", firstYear: 1982, appearances: 2, threatLevel: 3,
    signature: "Snake. Lives in your mind. Tegan's recurring nightmare.",
    blurb: "Buddhist-influenced two-parter monster; one of classic Who's weirdest. Possessed Tegan twice across two seasons.",
    iconic: false,
  },
  {
    name: "Krynoid", category: "Other",
    firstStory: "The Seeds of Doom", firstYear: 1976, appearances: 1, threatLevel: 4,
    signature: "Plant that turns into a 30-foot triffid that eats the manor house.",
    blurb: "Tom Baker's most violent serial. The Krynoid eats Harrison Chase from the inside.",
    iconic: false,
  },
  {
    name: "Sea Devils", category: "Ancient", homeworld: "Earth",
    firstStory: "The Sea Devils", firstYear: 1972, appearances: 4, threatLevel: 3,
    signature: "Underwater Silurian cousins; net-helmets and bone-coloured armour.",
    blurb: "The aquatic branch. Returned for Legend of the Sea Devils with Thirteen — gave us TARDIS-as-pirate-ship.",
    iconic: false,
  },
  {
    name: "Reapers", category: "Other",
    firstStory: "Father's Day", firstYear: 2005, appearances: 1, threatLevel: 4,
    signature: "Pterodactyl scavengers of time paradoxes.",
    blurb: "Came out of the cracks in time when Rose saved her father. \"They sterilise the wound.\" Never appeared again because they kind of broke time.",
    iconic: false,
  },
  {
    name: "The Beast Below / Star Whale", category: "Other",
    firstStory: "The Beast Below", firstYear: 2010, appearances: 1, threatLevel: 2,
    signature: "Last of its kind; the United Kingdom's spaceship is built on its back.",
    blurb: "Not really a monster. Tortured into hauling humans through space; Amy realised it volunteered because it heard the children crying.",
    iconic: false,
  },
  {
    name: "Headless Monks", category: "Other",
    firstStory: "A Good Man Goes to War", firstYear: 2011, appearances: 1, threatLevel: 3,
    signature: "Faith literally beheaded. They believe in nothing because they no longer have heads.",
    blurb: "Silence's military order at Demon's Run. The hood-flip reveal is the show's grimmest image.",
    iconic: false,
  },
  {
    name: "Whisper Men", category: "Other",
    firstStory: "The Name of the Doctor", firstYear: 2013, appearances: 1, threatLevel: 4,
    signature: "Top-hatted faceless men with mouths full of nothing.",
    blurb: "Servants of the Great Intelligence. Marched on Trenzalore.",
    iconic: false,
  },
  {
    name: "The Boneless", category: "Other",
    firstStory: "Flatline", firstYear: 2014, appearances: 1, threatLevel: 4,
    signature: "Two-dimensional creatures pulling the third dimension out of you.",
    blurb: "Bristol underpass monster of the week that the show never went back to. Should have.",
    iconic: false,
  },
  {
    name: "The Mire", category: "Other",
    firstStory: "The Girl Who Died", firstYear: 2015, appearances: 1, threatLevel: 3,
    signature: "Armoured aliens with helmets that translate fear into adrenaline.",
    blurb: "Killed Ashildr. Twelve brought her back with the alien chip. \"I'm tired of losing.\" Created a billion-year-old Ashildr.",
    iconic: false,
  },
  {
    name: "The Ravagers / Swarm and Azure", category: "Other",
    firstStory: "The Halloween Apocalypse", firstYear: 2021, appearances: 6, threatLevel: 5,
    signature: "White-faced cosmic siblings who hate Time and want to end it.",
    blurb: "Flux antagonists. Personifications of entropy; the Doctor had locked them up in the Division's past.",
    iconic: false,
  },
  {
    name: "Sutekh", category: "Ancient", homeworld: "Phaester Osiris",
    firstStory: "Pyramids of Mars", firstYear: 1975, appearances: 2, threatLevel: 5,
    signature: "Jackal-headed Osirian god of death in eternal chains.",
    blurb: "Tom Baker's scariest villain. Returned in Empire of Death — riding on the outside of the TARDIS, unnoticed, since 1975. Killed everything.",
    iconic: true,
  },
  {
    name: "Maestro", category: "Trickster",
    firstStory: "The Devil's Chord", firstYear: 2024, appearances: 1, threatLevel: 4,
    signature: "Black-and-white silent-film composer who eats music.",
    blurb: "Toymaker's child. Stole music itself in 1963; the Doctor and Ruby beat them with a Beatles chord that didn't exist yet.",
    iconic: false,
  },
  {
    name: "The Toymaker", category: "Trickster",
    firstStory: "The Celestial Toymaker", firstYear: 1966, appearances: 2, threatLevel: 5,
    signature: "Immortal trickster god in a hall of games; loser becomes a doll.",
    blurb: "Returned in The Giggle (2023) to laugh the world into chaos. Tossed away \"with a screwdriver and ladybirds.\" The Pantheon of Discord begins with him.",
    iconic: false,
  },
  {
    name: "The Mara", category: "Other",
    firstStory: "Kinda", firstYear: 1982, appearances: 2, threatLevel: 3,
    signature: "(Duplicate intentional — listed once already; here as nod to the audio canon.)",
    blurb: "(De-duplicated by gold layer in the real pipeline.)",
    iconic: false,
  },
].filter((m, i, arr) => arr.findIndex((x) => x.name === m.name) === i) as Monster[];
