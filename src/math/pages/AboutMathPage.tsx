import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { mathSite } from "../mathConfig";
import { updateMathSeo } from "../mathSeo";

export function AboutMathPage() {
  useEffect(() => {
    updateMathSeo({ title: "About", description: "About Math by UKG Lab, a focused CBSE Mathematics learning product for Classes 9-12.", path: "/about" });
  }, []);

  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="section-kicker">About</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white">A focused CBSE Mathematics product.</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">
            Math by UKG Lab is built for Classes 9, 10, 11 and 12 only in this phase. The product focuses on clear concepts, worked examples, practice, tests and revision without becoming a generic coaching website.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Focused scope", "CBSE Mathematics for Classes 9-12. No other boards, classes or exams are shown in this release."],
            ["Scalable content", "Lessons, chapters, questions, formulas and tests live in structured data instead of scattered UI components."],
            ["Original learning", "Sample content is original and intentionally small. Copyrighted textbook material is not copied."],
          ].map(([title, copy]) => (
            <article key={title} className="surface-card rounded-xl p-6">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">{copy}</p>
            </article>
          ))}
        </div>
        <a className="focus-ring mt-10 inline-flex min-h-11 items-center gap-2 rounded-md border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-900 hover:border-signal-500 dark:border-white/10 dark:bg-white/5 dark:text-white" href={mathSite.parentUrl} target="_blank" rel="noreferrer">
          Visit UKG Lab <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
