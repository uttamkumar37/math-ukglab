import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { mathSite } from "../mathConfig";
import { updateMathSeo } from "../mathSeo";

export function AboutMathPage() {
  useEffect(() => {
    updateMathSeo({ title: "About", description: "About Math by UKG Lab, an adaptive School and IIT JEE Mathematics learning product.", path: "/about" });
  }, []);

  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="section-kicker">About</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white">One mathematics platform, different learning depths.</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">
            Math by UKG Lab supports School Mathematics for Classes 9-12 and an IIT JEE pathway. Shared concepts adapt through Simple, Medium and Hard explanations while practice difficulty remains independently controlled.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Adaptive paths", "Students choose School or JEE, a course and an explanation depth without entering a duplicated content tree."],
            ["Shared concepts", "Lessons, examples and questions live in structured data with level-specific depth attached to one core topic."],
            ["Original learning", "Sample content is original and intentionally small. Copyrighted textbook material is not copied."],
          ].map(([title, copy]) => (
            <article key={title} className="surface-card rounded-lg p-6">
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
