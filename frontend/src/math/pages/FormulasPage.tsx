import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MathBlock } from "../components/MathRender";
import { allFormulas, mathClasses } from "../content";
import type { ClassLevel } from "../types";
import { updateMathSeo } from "../mathSeo";

export function FormulasPage() {
  const [classLevel, setClassLevel] = useState<ClassLevel | "All">("All");

  useEffect(() => {
    updateMathSeo({
      title: "Formula Library",
      description: "CBSE Mathematics formula library for Classes 9, 10, 11 and 12.",
      path: "/formulas",
    });
  }, []);

  const formulas = useMemo(() => (classLevel === "All" ? allFormulas : allFormulas.filter((formula) => formula.classLevel === classLevel)), [classLevel]);

  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="section-kicker">Revision</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white">Formula Library</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">Filter formulas by class and chapter. This library starts small and grows with original lesson content.</p>
        </div>
        <div className="mt-8 flex max-w-full gap-2 overflow-x-auto pb-2" aria-label="Filter formulas by class">
          {(["All", ...mathClasses.map((item) => item.level)] as const).map((item) => (
            <button key={item} className={`focus-ring whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition ${classLevel === item ? "bg-ink-950 text-white dark:bg-white dark:text-ink-950" : "border border-ink-200 bg-white text-ink-700 hover:border-signal-500 dark:border-white/10 dark:bg-white/5 dark:text-ink-200"}`} type="button" onClick={() => setClassLevel(item)}>
              {item === "All" ? "All Classes" : `Class ${item}`}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {formulas.map((formula) => (
            <article key={formula.slug} className="surface-card rounded-xl p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-signal-700 dark:text-signal-400">Class {formula.classLevel} · {formula.chapterTitle}</p>
              <h2 className="mt-3 text-2xl font-semibold">{formula.title}</h2>
              <MathBlock math={formula.statement} />
              <p className="text-sm leading-6 text-ink-600 dark:text-ink-300">{formula.note}</p>
              <Link className="focus-ring mt-5 inline-flex rounded text-sm font-semibold text-ink-900 hover:text-signal-700 dark:text-white dark:hover:text-signal-400" to={`/class-${formula.classLevel}/${formula.chapterSlug}`}>
                Open chapter
              </Link>
            </article>
          ))}
        </div>
        {!formulas.length ? <p className="mt-8 rounded-xl border border-ink-200 bg-white p-6 text-sm text-ink-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-300">No formulas have been added for this filter yet.</p> : null}
      </div>
    </section>
  );
}
