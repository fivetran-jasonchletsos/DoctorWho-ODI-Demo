import Hero from "@/components/Hero";
import Dedication from "@/components/Dedication";
import DoctorCard from "@/components/DoctorCard";
import { doctors } from "@/lib/doctors";

export default function HomePage() {
  const numbered = doctors.filter((d) => !["Curator", "Meta-Crisis"].includes(d.number));
  const order = (n: string) => {
    if (n === "War") return 8.5;
    if (n === "Fugitive") return 13.5;
    return parseInt(n, 10);
  };
  const sorted = [...numbered].sort((a, b) => order(a.number) - order(b.number));
  return (
    <main>
      <Hero />
      <Dedication />
      <section className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 section-ornament">
            <span className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey">All Incarnations</span>
          </div>
          <h2 className="serif text-3xl sm:text-4xl text-paper mb-3 vortex-stop">
            {sorted.length} Doctors. One name.
          </h2>
          <p className="serif italic text-bone/70 mb-10 max-w-3xl">
            Pulled from Wikidata + the TARDIS Wiki by Fivetran. Click any face for the full registry entry.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-10">
            {sorted.map((d) => <DoctorCard key={d.number} doctor={d} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
