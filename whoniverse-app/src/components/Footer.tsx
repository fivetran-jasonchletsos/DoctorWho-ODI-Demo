export default function Footer() {
  return (
    <footer className="border-t border-gallifrey/15 px-5 pt-12 pb-10 sm:px-6 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between mb-10">
          <div>
            <p className="type text-[9px] uppercase tracking-[0.35em] text-bone/45 mb-3">
              TARDIS Index File · Volume I
            </p>
            <p className="serif text-2xl font-light text-paper/85 leading-snug max-w-md italic">
              &ldquo;We&apos;re all stories in the end. Just make it a good one, eh?&rdquo;
            </p>
            <p className="serif mt-2 text-sm text-bone/60">— The Eleventh Doctor, <em>The Big Bang</em></p>
            <p className="serif mt-6 text-sm text-bone/70">
              For <span className="text-gallifrey">Sarah</span> and <span className="text-gallifrey">Peter</span>.
            </p>
          </div>
          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            <a href="https://github.com/fivetran-jasonchletsos/DoctorWho-ODI-Demo" target="_blank" rel="noopener noreferrer"
               className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 hover:text-gallifrey">GitHub</a>
            <a href="https://tardis.fandom.com" target="_blank" rel="noopener noreferrer"
               className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 hover:text-gallifrey">TARDIS Wiki</a>
            <a href="https://www.wikidata.org" target="_blank" rel="noopener noreferrer"
               className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 hover:text-gallifrey">Wikidata</a>
            <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer"
               className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 hover:text-gallifrey">TMDB</a>
            <a href="https://www.fivetran.com" target="_blank" rel="noopener noreferrer"
               className="type text-[10px] uppercase tracking-[0.25em] text-bone/55 hover:text-gallifrey">Fivetran</a>
          </nav>
        </div>
        <div className="border-t border-gallifrey/10 pt-6"></div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p className="type text-[9px] uppercase tracking-[0.3em] text-bone/45">
              Fivetran → Iceberg/S3 → Snowflake → dbt + dbt-wizard → run-time agents
            </p>
            <p className="type text-[9px] uppercase tracking-[0.3em] text-bone/40">
              Set in Cinzel, Orbitron, JetBrains Mono &middot; Bigger on the inside
            </p>
          </div>
          <div className="text-right">
            <p className="type text-[9px] uppercase tracking-[0.3em] text-bone/40">v1.0 · 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
