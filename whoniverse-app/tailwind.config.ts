import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Whoniverse palette — vortex blacks/blues, TARDIS panel blue, Gallifreyan gold,
        // Dalek bronze, regeneration cyan/amber.
        vortex:   "#05060d",   // deep void around the TARDIS
        nebula:   "#0a1428",   // panel backdrop
        panel:    "#0f1f3a",   // TARDIS panel body
        tardis:   "#1a3a6e",   // TARDIS blue (signage)
        tardisLt: "#3a6db0",   // lighter TARDIS highlight
        gallifrey:"#d4a017",   // Gallifreyan gold (Seal of Rassilon)
        gold:     "#e8c25a",   // brighter gold
        bronze:   "#8a5a1f",   // Dalek casing
        bone:     "#cfc7b1",   // aged Gallifreyan parchment
        paper:    "#ece5cf",   // cleaner cream
        ash:      "#9ea7b8",   // cold body text
        muted:    "#5e6b80",
        vortexBl: "#2563a8",   // time-vortex inner blue
        signal:   "#5dd4d4",   // sonic screwdriver green/cyan
        regen:    "#ffb945",   // regeneration amber-gold
        crimson:  "#a4243b",   // Master red / Cardinal robes
        oodPink:  "#c25b7a",   // Ood accent
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "Georgia", "Times New Roman", "serif"],
        sans:    ["var(--font-crimson)", "Georgia", "Times New Roman", "serif"],
        mono:    ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        type:    ["var(--font-orbitron)", "var(--font-jetbrains)", "monospace"],
        body:    ["var(--font-crimson)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
