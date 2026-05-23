import DoctorCard from "@/components/DoctorCard";
import { doctors, doctorsByEra } from "@/lib/doctors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctors — TARDIS Index File",
};

export default function DoctorsPage() {
  const { classic, modern, other } = doctorsByEra();

  return (
    <main className="px-5 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="type text-[11px] uppercase tracking-[0.4em] text-gallifrey mb-3">Doctors</p>
        <h1 className="serif text-4xl sm:text-5xl text-paper vortex-stop">All Incarnations</h1>
        <p className="serif italic text-bone/70 mt-3 max-w-2xl">
          From <em>An Unearthly Child</em> (1963) to whatever is currently on. Includes the
          numbered Doctors, the War, the Fugitive, the Curator, and the Meta-Crisis.
        </p>

        <section className="mt-14">
          <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-5">
            Classic Era · 1963–1996 · {classic.length} Doctors
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
            {classic.map((d) => <DoctorCard key={d.number} doctor={d} />)}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="type text-[11px] uppercase tracking-[0.35em] text-bone/65 mb-5">
            Modern Era · 2005–present · {modern.length} Doctors
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
            {modern.map((d) => <DoctorCard key={d.number} doctor={d} />)}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="type text-[11px] uppercase tracking-[0.35em] text-crimson/90 mb-5">
            Anomalies · {other.length} canon-bending incarnations
          </h2>
          <p className="text-bone/65 max-w-2xl text-sm mb-6">
            The War Doctor was hidden until the 50th. The Fugitive Doctor pre-dates Hartnell
            on a timeline no one can pin down. The Meta-Crisis Doctor lives in a parallel
            universe with Rose. The Curator may be Four, sometime later. They all count.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
            {other.map((d) => <DoctorCard key={d.number} doctor={d} />)}
          </div>
        </section>

        <p className="mt-16 text-xs type uppercase tracking-[0.25em] text-bone/50">
          {doctors.length} total entries · sourced from Wikidata + TARDIS Wiki via Fivetran
        </p>
      </div>
    </main>
  );
}
