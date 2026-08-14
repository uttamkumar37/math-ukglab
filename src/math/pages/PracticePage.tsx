import { ChevronDown, Eye, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { MathText } from "../components/MathRender";
import { getChapter } from "../content";
import { updateMathSeo } from "../mathSeo";
import { NotFoundPage } from "./NotFoundPage";

export function PracticePage() {
  const { classSlug, chapterSlug } = useParams();
  const found = getChapter(classSlug, chapterSlug);
  const [hintCounts, setHintCounts] = useState<Record<string, number>>({});
  const [solutions, setSolutions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (found) {
      updateMathSeo({
        title: `${found.chapter.title} Practice - Class ${found.mathClass.level} Maths`,
        description: `Practice ${found.chapter.title} questions with hints and step-by-step solutions.`,
        path: `/${found.mathClass.slug}/${found.chapter.slug}/practice`,
      });
    }
  }, [found]);

  if (!found) return <NotFoundPage />;

  const { mathClass, chapter } = found;

  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <Breadcrumbs items={[{ name: `Class ${mathClass.level}`, path: `/${mathClass.slug}` }, { name: chapter.title, path: `/${mathClass.slug}/${chapter.slug}` }, { name: "Practice", path: `/${mathClass.slug}/${chapter.slug}/practice` }]} />
        <div className="max-w-3xl">
          <p className="section-kicker">Practice</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white">{chapter.title} Practice</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">Use progressive hints first. Solutions stay hidden until you choose to reveal them.</p>
        </div>

        {chapter.practice.length ? (
          <div className="mt-10 grid gap-6">
            {chapter.practice.map((question, index) => {
              const visibleHints = hintCounts[question.slug] ?? 0;
              const canShowMoreHints = visibleHints < question.hints.length + 1;

              return (
                <article key={question.slug} className="surface-card rounded-xl p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-ink-950 px-2.5 py-1 text-xs font-bold text-white dark:bg-white dark:text-ink-950">Question {index + 1}</span>
                    <span className="rounded-md bg-ink-100 px-2.5 py-1 text-xs font-bold text-ink-600 dark:bg-white/10 dark:text-ink-200">{question.difficulty}</span>
                    <span className="rounded-md bg-signal-500/10 px-2.5 py-1 text-xs font-bold text-signal-700 dark:text-signal-400">{question.type}</span>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold"><MathText text={question.question} /></h2>
                  {question.options ? (
                    <div className="mt-5 grid gap-2">
                      {question.options.map((option) => (
                        <button key={option} className="focus-ring min-h-11 rounded-md border border-ink-200 px-4 py-2 text-left text-sm transition hover:border-signal-500 dark:border-white/10" type="button">
                          <MathText text={option} />
                        </button>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-6 rounded-lg border border-ink-200 bg-ink-50 p-4 dark:border-white/10 dark:bg-ink-950/70">
                    <p className="flex items-center gap-2 text-sm font-bold"><Lightbulb size={17} className="text-signal-600 dark:text-signal-400" aria-hidden="true" /> Need help?</p>
                    <div className="mt-3 space-y-2 text-sm leading-6 text-ink-700 dark:text-ink-200">
                      {question.hints.slice(0, visibleHints).map((hint, hintIndex) => (
                        <p key={hint}><span className="font-semibold">Hint {hintIndex + 1}: </span>{hint}</p>
                      ))}
                      {visibleHints > question.hints.length ? <p><span className="font-semibold">Concept Reminder: </span>{question.conceptReminder}</p> : null}
                    </div>
                    {canShowMoreHints ? (
                      <button className="focus-ring mt-4 inline-flex min-h-10 items-center gap-2 rounded-md border border-ink-200 px-3 text-sm font-semibold dark:border-white/10" type="button" onClick={() => setHintCounts((value) => ({ ...value, [question.slug]: visibleHints + 1 }))}>
                        Show Next Help <ChevronDown size={16} aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>

                  <button className="focus-ring mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" type="button" onClick={() => setSolutions((value) => ({ ...value, [question.slug]: !value[question.slug] }))}>
                    <Eye size={17} aria-hidden="true" /> {solutions[question.slug] ? "Hide Solution" : "Show Solution"}
                  </button>
                  {solutions[question.slug] ? (
                    <div className="mt-5 rounded-lg border border-ink-200 p-4 dark:border-white/10">
                      <p className="font-semibold">Step-by-step solution</p>
                      <ol className="mt-3 space-y-2 text-sm leading-6">
                        {question.solution.map((step, stepIndex) => (
                          <li key={step}><span className="font-semibold">Step {stepIndex + 1}: </span><MathText text={step} /></li>
                        ))}
                      </ol>
                      <p className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-300">{question.explanation}</p>
                      <p className="mt-3 text-sm font-semibold">Final Answer: <MathText text={question.answer} /></p>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-ink-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-2xl font-semibold">Practice architecture is ready.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600 dark:text-ink-300">Questions can be added with difficulty, type, topic, hints, answer and solution fields. No placeholder questions are shown for this chapter.</p>
            <Link className="focus-ring mt-6 inline-flex min-h-11 items-center rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" to={`/${mathClass.slug}/${chapter.slug}`}>Back to Chapter</Link>
          </div>
        )}
      </div>
    </section>
  );
}
