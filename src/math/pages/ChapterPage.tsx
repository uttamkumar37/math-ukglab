import { ArrowRight, ClipboardCheck, FileText, Lightbulb, ListChecks, NotebookTabs } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Diagram } from "../components/Diagram";
import { MathBlock } from "../components/MathRender";
import { getChapter } from "../content";
import { updateMathSeo } from "../mathSeo";
import { NotFoundPage } from "./NotFoundPage";

export function ChapterPage() {
  const { classSlug, chapterSlug } = useParams();
  const found = getChapter(classSlug, chapterSlug);

  useEffect(() => {
    if (found) {
      updateMathSeo({
        title: `${found.chapter.title} - CBSE Class ${found.mathClass.level} Maths`,
        description: found.chapter.description,
        path: `/${found.mathClass.slug}/${found.chapter.slug}`,
      });
    }
  }, [found]);

  if (!found) return <NotFoundPage />;

  const { mathClass, chapter } = found;
  const firstLesson = chapter.lessons[0];

  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <Breadcrumbs items={[{ name: `Class ${mathClass.level}`, path: `/${mathClass.slug}` }, { name: chapter.title, path: `/${mathClass.slug}/${chapter.slug}` }]} />

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="section-kicker">Chapter {chapter.order}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white sm:text-5xl">{chapter.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-700 dark:text-ink-200">{chapter.overview}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {firstLesson ? (
                <Link className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" to={`/${mathClass.slug}/${chapter.slug}/${firstLesson.slug}`}>
                  Start First Lesson <ArrowRight size={17} aria-hidden="true" />
                </Link>
              ) : null}
              <Link className="focus-ring inline-flex min-h-11 items-center rounded-md border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-900 hover:border-signal-500 dark:border-white/10 dark:bg-white/5 dark:text-white" to={`/${mathClass.slug}/${chapter.slug}/practice`}>
                Practice
              </Link>
              <Link className="focus-ring inline-flex min-h-11 items-center rounded-md border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-900 hover:border-signal-500 dark:border-white/10 dark:bg-white/5 dark:text-white" to={`/${mathClass.slug}/${chapter.slug}/test`}>
                Chapter Test
              </Link>
            </div>
          </div>
          <aside className="rounded-xl border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <div className="aspect-[4/3] rounded-lg bg-ink-50 dark:bg-ink-950/70">
              <Diagram type={firstLesson?.visual ?? "curve"} />
            </div>
            <p className="mt-5 text-sm font-semibold text-ink-950 dark:text-white">Learning path</p>
            <div className="mt-3 grid gap-2 text-sm text-ink-600 dark:text-ink-300">
              {["Overview", "Concepts", "Examples", "Practice", "NCERT Practice", "Chapter Test", "Formula / Revision"].map((item) => (
                <span key={item} className="rounded-md border border-ink-200 px-3 py-2 dark:border-white/10">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <section className="surface-card rounded-xl p-6">
              <h2 className="text-2xl font-semibold">Concept Lessons</h2>
              {chapter.lessons.length ? (
                <div className="mt-5 grid gap-3">
                  {chapter.lessons.map((lesson) => (
                    <Link key={lesson.slug} className="focus-ring flex items-center justify-between gap-4 rounded-lg border border-ink-200 p-4 transition hover:border-signal-500 dark:border-white/10" to={`/${mathClass.slug}/${chapter.slug}/${lesson.slug}`}>
                      <span>
                        <span className="block font-semibold">{lesson.title}</span>
                        <span className="mt-1 block text-sm text-ink-600 dark:text-ink-300">{lesson.summary}</span>
                      </span>
                      <ArrowRight className="shrink-0 text-ink-400" size={18} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-300">Lesson slots are ready. Original explanations can be added to the content model without redesigning this page.</p>
              )}
            </section>

            <section className="surface-card rounded-xl p-6">
              <h2 className="text-2xl font-semibold">Practice and Assessment</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Link className="rounded-lg border border-ink-200 p-4 transition hover:border-signal-500 dark:border-white/10" to={`/${mathClass.slug}/${chapter.slug}/practice`}>
                  <ListChecks className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
                  <p className="mt-3 font-semibold">Practice</p>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">Difficulty, hints, reminders and solutions.</p>
                </Link>
                <Link className="rounded-lg border border-ink-200 p-4 transition hover:border-signal-500 dark:border-white/10" to={`/${mathClass.slug}/${chapter.slug}/test`}>
                  <ClipboardCheck className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
                  <p className="mt-3 font-semibold">Chapter Test</p>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">Timer, review state and result architecture.</p>
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <FileText className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold">Formula / Revision</h2>
              {chapter.formulas.length ? (
                <div className="mt-4 space-y-4">
                  {chapter.formulas.map((formula) => (
                    <div key={formula.slug}>
                      <p className="text-sm font-semibold">{formula.title}</p>
                      <MathBlock math={formula.statement} />
                      <p className="text-sm text-ink-600 dark:text-ink-300">{formula.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">Revision notes can be added when the chapter content is expanded.</p>
              )}
            </div>
            <div className="rounded-xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <NotebookTabs className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold">NCERT Practice</h2>
              <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">Architecture is ready for NCERT-aligned original explanations. Copyrighted textbook text is not reproduced here.</p>
            </div>
            <div className="rounded-xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <Lightbulb className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold">What to do next</h2>
              <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">Start with concepts, solve worked examples, try practice questions, then take the chapter test.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
