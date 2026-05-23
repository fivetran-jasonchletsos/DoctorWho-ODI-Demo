"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { num: "01", href: "/",             label: "Index" },
  { num: "02", href: "/doctors",      label: "Doctors" },
  { num: "03", href: "/companions",   label: "Companions" },
  { num: "04", href: "/monsters",     label: "Monsters" },
  { num: "05", href: "/episodes",     label: "Episodes" },
  { num: "06", href: "/tardis",       label: "TARDIS" },
  { num: "07", href: "/making",       label: "Making Of" },
  { num: "08", href: "/quiz",         label: "Which Doctor?" },
  { num: "09", href: "/ask",          label: "Ask Archivist" },
  { num: "10", href: "/analytics",    label: "Analytics" },
  { num: "11", href: "/connections",  label: "Connections" },
  { num: "12", href: "/related",      label: "Related" },
  { num: "13", href: "/timeline",     label: "Timeline" },
  { num: "14", href: "/architecture", label: "ODI" },
  { num: "15", href: "/pipeline",     label: "Pipeline" },
];

export default function TopNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className="meta-bar">
      <div className="mx-auto flex max-w-7xl items-center gap-x-6 gap-y-2 px-4 py-3 overflow-x-auto sm:px-6 sm:py-4 md:px-10">
        <Link href="/" className="flex-none flex items-center gap-2.5 text-paper hover:text-gallifrey focus:outline-none focus:ring-2 focus:ring-gallifrey/50">
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true" className="flex-none flicker">
            {/* Seal of Rassilon, simplified */}
            <circle cx="16" cy="16" r="14" fill="#0f1f3a" stroke="#d4a017" strokeWidth="0.8" opacity="0.95" />
            <polygon points="16,4 26,10 26,22 16,28 6,22 6,10" fill="none" stroke="#d4a017" strokeWidth="0.8" />
            <circle cx="16" cy="9"  r="1.4" fill="#d4a017" />
            <circle cx="16" cy="23" r="1.4" fill="#d4a017" />
            <circle cx="9"  cy="16" r="1.4" fill="#d4a017" />
            <circle cx="23" cy="16" r="1.4" fill="#d4a017" />
            <circle cx="16" cy="16" r="2.2" fill="none" stroke="#5dd4d4" strokeWidth="0.6" />
          </svg>
          <span className="serif text-base sm:text-lg leading-none tracking-wide">TARDIS</span>
          <span className="hidden sm:inline type text-[10px] text-bone/60 leading-none">/ Index File</span>
        </Link>
        <nav aria-label="Primary" className="flex flex-1 flex-nowrap items-center gap-x-4 sm:gap-x-6">
          {NAV.map((n) => {
            const a = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className="group flex flex-none items-baseline gap-2 focus:outline-none focus:ring-2 focus:ring-gallifrey/50"
                aria-current={a ? "page" : undefined}
              >
                <span className={`font-mono text-xs tracking-[0.25em] uppercase ${a ? "text-gallifrey" : "text-gallifrey/40"}`}>
                  {n.num}
                </span>
                <span className={`serif text-base sm:text-lg transition-colors ${a ? "text-paper" : "text-bone/65 group-hover:text-paper"}`}>
                  {n.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
