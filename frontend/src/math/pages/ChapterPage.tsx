import { ArrowRight, ClipboardCheck, FileText, Lightbulb, ListChecks, NotebookTabs, PenTool, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Diagram } from "../components/Diagram";
import { MathBlock, MathText } from "../components/MathRender";
import { getChapter, getLesson } from "../content";
import { useLearningPreferences } from "../learningContext";
import { formatExam } from "../learningPreferences";
import { updateMathSeo } from "../mathSeo";
import { NotFoundPage } from "./NotFoundPage";

export function ChapterPage() {
  const { classSlug, branchSlug, chapterSlug } = useParams();
  const found = getChapter(classSlug, chapterSlug, branchSlug);
  const legacyChapter = !found && (chapterSlug === "practice" || chapterSlug === "test") ? getChapter(classSlug, branchSlug) : undefined;
  const legacyLesson = !found ? getLesson(classSlug, branchSlug, chapterSlug) : undefined;
  const { preferences } = useLearningPreferences();

  useEffect(() => {
    if (found) {
      updateMathSeo({
        title: `${found.chapter.title} - CBSE Class ${found.mathClass.level} Maths`,
        description: found.chapter.description,
        path: `/${found.mathClass.slug}/${found.branch.slug}/${found.chapter.slug}`,
      });
    }
  }, [found]);

  if (!found && legacyChapter) {
    return <Navigate replace to={`/${legacyChapter.mathClass.slug}/${legacyChapter.branch.slug}/${legacyChapter.chapter.slug}/${chapterSlug}`} />;
  }

  if (!found && legacyLesson) {
    return <Navigate replace to={`/${legacyLesson.mathClass.slug}/${legacyLesson.branch.slug}/${legacyLesson.chapter.slug}/${legacyLesson.lesson.slug}`} />;
  }

  if (!found) return <NotFoundPage />;

  const { mathClass, branch, chapter } = found;
  const firstLesson = chapter.lessons[0];
  const contextCrumb = preferences.goal === "jee" && preferences.exam
    ? { name: formatExam(preferences.exam), path: `/jee/${preferences.exam}` }
    : { name: `Class ${mathClass.level}`, path: `/${mathClass.slug}` };

  return (
    <section className="py-6 sm:py-8">
      <div className="section-shell">
        <Breadcrumbs items={[contextCrumb, { name: branch.name, path: `/${mathClass.slug}/${branch.slug}` }, { name: chapter.title, path: `/${mathClass.slug}/${branch.slug}/${chapter.slug}` }]} />

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="section-kicker">{preferences.goal === "jee" ? `${formatExam(preferences.exam)} · ` : ""}{branch.name} · Chapter {chapter.order}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white sm:text-5xl">{chapter.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-700 dark:text-ink-200">{chapter.overview}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {firstLesson ? (
                <Link className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/${firstLesson.slug}`}>
                  Start First Topic <ArrowRight size={17} aria-hidden="true" />
                </Link>
              ) : null}
              <Link className="focus-ring inline-flex min-h-11 items-center rounded-xl border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-900 hover:border-signal-500 dark:border-white/10 dark:bg-white/5 dark:text-white" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/practice`}>
                Practice
              </Link>
              <Link className="focus-ring inline-flex min-h-11 items-center rounded-xl border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-900 hover:border-signal-500 dark:border-white/10 dark:bg-white/5 dark:text-white" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/test`}>
                Chapter Test
              </Link>
            </div>
            <nav className="mt-6 flex flex-wrap gap-2" aria-label="Chapter sections">
              {[
                ["Learn", "#learn"],
                ["Notes", "#notes"],
                ["Examples", "#examples"],
                ["Practice", `/${mathClass.slug}/${branch.slug}/${chapter.slug}/practice`],
                ["Test", `/${mathClass.slug}/${branch.slug}/${chapter.slug}/test`],
                ["Revision", "#revision"],
              ].map(([label, href]) => href.startsWith("#") ? (
                <a key={label} className="focus-ring rounded-xl border border-ink-200 px-3 py-2 text-sm font-semibold hover:border-signal-500 dark:border-white/10" href={href}>{label}</a>
              ) : (
                <Link key={label} className="focus-ring rounded-xl border border-ink-200 px-3 py-2 text-sm font-semibold hover:border-signal-500 dark:border-white/10" to={href}>{label}</Link>
              ))}
            </nav>
          </div>
          <aside className="rounded-xl border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <div className="aspect-[4/3] rounded-lg bg-ink-50 dark:bg-ink-950/70">
              <Diagram type={firstLesson?.visual ?? "curve"} />
            </div>
            <p className="mt-5 text-sm font-semibold text-ink-950 dark:text-white">Learning path</p>
            <div className="mt-3 grid gap-2 text-sm text-ink-600 dark:text-ink-300">
              {["Class", "Branch", "Chapter", "Topic", "Concept", "Example", "Practice", "Hint", "Approach", "Solution"].map((item) => (
                <span key={item} className="rounded-md border border-ink-200 px-3 py-2 dark:border-white/10">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <section id="learn" className="surface-card scroll-mt-24 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold">Topics</h2>
              {chapter.lessons.length ? (
                <div className="mt-5 grid gap-3">
                  {chapter.lessons.map((lesson, index) => (
                    <Link key={lesson.slug} className="focus-ring flex items-center justify-between gap-4 rounded-lg border border-ink-200 p-4 transition hover:border-signal-500 dark:border-white/10" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/${lesson.slug}`}>
                      <span>
                        <span className="block font-mono text-xs font-semibold text-signal-700 dark:text-signal-400">Topic {String(index + 1).padStart(2, "0")}</span>
                        <span className="block font-semibold">{lesson.title}</span>
                        <span className="mt-1 block text-sm text-ink-600 dark:text-ink-300">{lesson.summary}</span>
                        {lesson.estimatedMinutes ? <span className="mt-2 block text-xs font-semibold text-ink-500 dark:text-ink-400">{lesson.estimatedMinutes} min reading estimate</span> : null}
                      </span>
                      <ArrowRight className="shrink-0 text-ink-400" size={18} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-300">This chapter does not have topic lessons yet.</p>
              )}
            </section>

            <section id="examples" className="surface-card scroll-mt-24 rounded-2xl p-6">
              <h2 className="flex items-center gap-2 text-2xl font-semibold"><PenTool className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" /> Worked Examples</h2>
              {chapter.workedExamples?.length ? (
                <div className="mt-5 grid gap-4">
                  {chapter.workedExamples.map((example) => (
                    <article key={example.title} className="rounded-lg border border-ink-200 p-4 dark:border-white/10">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-md bg-ink-950 px-2.5 py-1 text-xs font-bold text-white dark:bg-white dark:text-ink-950">{example.title}</span>
                        <span className="rounded-md bg-signal-500/10 px-2.5 py-1 text-xs font-bold text-signal-700 dark:text-signal-400">{example.level}</span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold"><MathText text={example.question} /></h3>
                      <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300"><span className="font-semibold text-ink-900 dark:text-white">Thinking: </span><MathText text={example.thinking} /></p>
                      <ol className="mt-3 grid gap-2 text-sm leading-6">
                        {example.approach.map((step, index) => <li key={step}><span className="font-semibold">Approach {index + 1}: </span><MathText text={step} /></li>)}
                      </ol>
                      <ol className="mt-3 grid gap-2 text-sm leading-6">
                        {example.steps.map((step, index) => <li key={step}><span className="font-semibold">Step {index + 1}: </span><MathText text={step} /></li>)}
                      </ol>
                      <p className="mt-3 rounded-md bg-ink-950 px-3 py-2 text-sm font-semibold text-white dark:bg-white dark:text-ink-950">Final Answer: <MathText text={example.finalAnswer} /></p>
                      <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300"><span className="font-semibold text-ink-900 dark:text-white">Why it works: </span><MathText text={example.whyItWorks} /></p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-300">Worked examples are not available for this chapter yet.</p>
              )}
            </section>

            <section className="surface-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold">Practice and Assessment</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Link className="rounded-lg border border-ink-200 p-4 transition hover:border-signal-500 dark:border-white/10" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/practice`}>
                  <ListChecks className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
                  <p className="mt-3 font-semibold">Practice</p>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">Difficulty, hints, reminders and solutions.</p>
                </Link>
                <Link className="rounded-lg border border-ink-200 p-4 transition hover:border-signal-500 dark:border-white/10" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/test`}>
                  <ClipboardCheck className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
                  <p className="mt-3 font-semibold">Chapter Test</p>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">Answer questions, flag doubts and review your result.</p>
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div id="notes" className="scroll-mt-24 rounded-xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <FileText className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold">Chapter Notes</h2>
              {chapter.notes ? (
                <div className="mt-4 space-y-4 text-sm leading-6 text-ink-600 dark:text-ink-300">
                  {[
                    ["Definitions", chapter.notes.definitions],
                    ["Key Concepts", chapter.notes.keyConcepts],
                    ["Formulae", chapter.notes.formulas],
                    ["Properties", chapter.notes.properties],
                    ["Common Mistakes", chapter.notes.commonMistakes],
                    ["Exam Reminders", chapter.notes.examReminders],
                  ].map(([title, items]) => (
                    <div key={title as string}>
                      <p className="font-semibold text-ink-950 dark:text-white">{title as string}</p>
                      <ul className="mt-2 grid gap-1">
                        {(items as string[]).map((item) => <li key={item}><MathText text={item} /></li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : chapter.formulas.length ? (
                <div className="mt-4 space-y-4">{chapter.formulas.map((formula) => <div key={formula.slug}><p className="text-sm font-semibold">{formula.title}</p><MathBlock math={formula.statement} /><p className="text-sm text-ink-600 dark:text-ink-300">{formula.note}</p></div>)}</div>
              ) : <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">Revision notes are not available for this chapter yet.</p>}
            </div>
            <div className="rounded-xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <NotebookTabs className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold">NCERT Companion</h2>
              <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">{chapter.ncertCompanion?.chapterContext ?? "Use UKG Lab explanations beside your textbook. Copyrighted textbook text is not reproduced here."}</p>
              {chapter.ncertCompanion ? (
                <div className="mt-4 grid gap-3 text-sm leading-6 text-ink-600 dark:text-ink-300">
                  {[
                    ["Concept Support", chapter.ncertCompanion.conceptSupport],
                    ["Exercise Support", chapter.ncertCompanion.exerciseSupport],
                    ["Question Support", chapter.ncertCompanion.questionSupport],
                  ].map(([title, items]) => (
                    <div key={title as string}>
                      <p className="font-semibold text-ink-950 dark:text-white">{title as string}</p>
                      <ul className="mt-1 grid gap-1">{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div id="revision" className="scroll-mt-24 rounded-xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <RotateCcw className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold">Quick Revision</h2>
              {chapter.revision ? (
                <div className="mt-4 space-y-3 text-sm leading-6 text-ink-600 dark:text-ink-300">
                  {[
                    ["Key Concepts", chapter.revision.keyConcepts],
                    ["Formulae", chapter.revision.formulae],
                    ["Theorems / Properties", chapter.revision.properties],
                    ["Diagrams", chapter.revision.diagrams],
                    ["Common Mistakes", chapter.revision.commonMistakes],
                    ["5-Minute Revision", chapter.revision.fiveMinuteRevision],
                  ].map(([title, items]) => (
                    <div key={title as string}>
                      <p className="font-semibold text-ink-950 dark:text-white">{title as string}</p>
                      <ul className="mt-1 grid gap-1">{(items as string[]).map((item) => <li key={item}><MathText text={item} /></li>)}</ul>
                    </div>
                  ))}
                </div>
              ) : <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">Start with concepts, solve worked examples, try practice questions, then take the chapter test.</p>}
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
