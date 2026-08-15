import { ChevronDown, Eye, Lightbulb, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { MathText } from "../components/MathRender";
import { getChapter, getQuestionHints } from "../content";
import { useLearningPreferences } from "../learningContext";
import { formatExam } from "../learningPreferences";
import { updateMathSeo } from "../mathSeo";
import { recordSolutionReview } from "../progress";
import type { QuestionDifficulty } from "../types";
import { NotFoundPage } from "./NotFoundPage";

type DifficultyFilter = "All" | QuestionDifficulty;

const difficultyOptions: DifficultyFilter[] = ["All", "Simple", "Medium", "Hard"];

export function PracticePage() {
  const { classSlug, branchSlug, chapterSlug } = useParams();
  const [params] = useSearchParams();
  const found = useMemo(() => getChapter(classSlug, chapterSlug, branchSlug), [branchSlug, chapterSlug, classSlug]);
  const { preferences } = useLearningPreferences();
  const requestedDifficulty = params.get("difficulty");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>(() => difficultyOptions.includes(requestedDifficulty as DifficultyFilter) ? requestedDifficulty as DifficultyFilter : "All");
  const [hintCounts, setHintCounts] = useState<Record<string, number>>({});
  const [approaches, setApproaches] = useState<Record<string, boolean>>({});
  const [solutions, setSolutions] = useState<Record<string, boolean>>({});
  const [alternateMethods, setAlternateMethods] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!found) return;
    updateMathSeo({
      title: `${found.chapter.title} Practice - Class ${found.mathClass.level} Maths`,
      description: `Practice ${found.chapter.title} questions by difficulty with adaptive hints and step-by-step solutions.`,
      path: `/${found.mathClass.slug}/${found.branch.slug}/${found.chapter.slug}/practice`,
    });
  }, [found]);

  if (!found) return <NotFoundPage />;

  const { mathClass, branch, chapter } = found;
  const questions = difficulty === "All" ? chapter.practice : chapter.practice.filter((question) => question.difficulty === difficulty);
  const contextCrumb = preferences.goal === "jee" && preferences.exam
    ? { name: formatExam(preferences.exam), path: `/jee/${preferences.exam}` }
    : { name: `Class ${mathClass.level}`, path: `/${mathClass.slug}` };

  const resetHelp = () => {
    setHintCounts({});
    setApproaches({});
    setSolutions({});
    setAlternateMethods({});
  };

  const changeDifficulty = (next: DifficultyFilter) => {
    setDifficulty(next);
    resetHelp();
  };

  const toggleSolution = (questionSlug: string) => {
    const opening = !solutions[questionSlug];
    setSolutions((value) => ({ ...value, [questionSlug]: opening }));
    if (!opening) return;

    const question = chapter.practice.find((item) => item.slug === questionSlug);
    if (!question) return;
    const topicLesson = chapter.lessons.find((lesson) => lesson.title === question.topic) ?? chapter.lessons[0];
    const topicPath = topicLesson
      ? `/${mathClass.slug}/${branch.slug}/${chapter.slug}/${topicLesson.slug}`
      : `/${mathClass.slug}/${branch.slug}/${chapter.slug}`;
    const topicKey = topicLesson
      ? `${mathClass.slug}/${branch.slug}/${chapter.slug}/${topicLesson.slug}`
      : `${mathClass.slug}/${branch.slug}/${chapter.slug}`;
    recordSolutionReview({
      topicKey,
      title: topicLesson?.title ?? chapter.title,
      path: topicPath,
      classLevel: mathClass.level,
      chapter: chapter.title,
      difficulty: question.difficulty,
      questionSlug: question.slug,
    });
  };

  return (
    <section className="py-10 sm:py-16">
      <div className="section-shell">
        <Breadcrumbs items={[contextCrumb, { name: branch.name, path: `/${mathClass.slug}/${branch.slug}` }, { name: chapter.title, path: `/${mathClass.slug}/${branch.slug}/${chapter.slug}` }, { name: "Practice", path: `/${mathClass.slug}/${branch.slug}/${chapter.slug}/practice` }]} />
        <div className="max-w-3xl">
          <p className="section-kicker">Practice</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white">{chapter.title} Practice</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">Choose question difficulty independently from your <span className="font-semibold capitalize">{preferences.learningLevel}</span> explanation level. Help is revealed in learning order.</p>
        </div>

        {chapter.practice.length ? (
          <>
            <section className="mt-9 rounded-lg border border-ink-200 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-white/[0.035] sm:p-5" aria-labelledby="difficulty-heading">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 id="difficulty-heading" className="font-semibold">Difficulty</h2>
                  <p className="mt-1 text-xs text-ink-600 dark:text-ink-300">Explanation level and question difficulty are separate controls.</p>
                </div>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter practice by difficulty">
                  {difficultyOptions.map((option) => {
                    const count = option === "All" ? chapter.practice.length : chapter.practice.filter((question) => question.difficulty === option).length;
                    return (
                      <button key={option} className={`focus-ring min-h-10 rounded-md border px-3 text-sm font-semibold transition ${difficulty === option ? "border-ink-950 bg-ink-950 text-white dark:border-white dark:bg-white dark:text-ink-950" : "border-ink-200 hover:border-signal-500 dark:border-white/10"}`} type="button" aria-pressed={difficulty === option} onClick={() => changeDifficulty(option)}>
                        {option} <span className="ml-1 text-xs opacity-70">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {questions.length ? (
              <div className="mt-6 grid gap-6">
                {questions.map((question, index) => {
                  const adaptiveHints = getQuestionHints(question, preferences.learningLevel);
                  const visibleHints = Math.min(hintCounts[question.slug] ?? 0, adaptiveHints.length);
                  const allHintsShown = visibleHints >= adaptiveHints.length;
                  const approachVisible = approaches[question.slug] ?? false;
                  const solutionVisible = solutions[question.slug] ?? false;

                  return (
                    <article key={question.slug} className="surface-card rounded-lg p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-ink-950 px-2.5 py-1 text-xs font-bold text-white dark:bg-white dark:text-ink-950">Question {index + 1}</span>
                        <span className="rounded-md bg-ink-100 px-2.5 py-1 text-xs font-bold text-ink-600 dark:bg-white/10 dark:text-ink-200">{question.difficulty}</span>
                        <span className="rounded-md bg-signal-500/10 px-2.5 py-1 text-xs font-bold text-signal-700 dark:text-signal-400">{question.type}</span>
                        {question.sourceType ? <span className="rounded-md border border-ink-200 px-2.5 py-1 text-xs font-bold text-ink-500 dark:border-white/10 dark:text-ink-300">{question.sourceType.replaceAll("_", " ")}</span> : null}
                      </div>
                      <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">{branch.name} · {chapter.title} · {question.topic} · {question.concept}</p>
                      <h2 className="mt-3 text-xl font-semibold leading-8"><MathText text={question.question} /></h2>
                      {question.options ? (
                        <div className="mt-5 grid gap-2">
                          {question.options.map((option) => (
                            <button key={option} className="focus-ring min-h-11 rounded-md border border-ink-200 px-4 py-2 text-left text-sm transition hover:border-signal-500 dark:border-white/10" type="button"><MathText text={option} /></button>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-6 border-t border-ink-200 pt-5 dark:border-white/10">
                        <p className="flex items-center gap-2 text-sm font-bold"><Lightbulb size={17} className="text-signal-600 dark:text-signal-400" aria-hidden="true" /> Progressive help · <span className="capitalize text-ink-500 dark:text-ink-400">{preferences.learningLevel} hint depth</span></p>
                        {visibleHints ? (
                          <div className="mt-3 space-y-2 rounded-md bg-ink-50 p-4 text-sm leading-6 text-ink-700 dark:bg-ink-950/70 dark:text-ink-200">
                            {adaptiveHints.slice(0, visibleHints).map((hint, hintIndex) => <p key={hint}><span className="font-semibold">Hint {hintIndex + 1}: </span><MathText text={hint} /></p>)}
                            {allHintsShown ? <p className="border-t border-ink-200 pt-2 dark:border-white/10"><span className="font-semibold">Concept reminder: </span><MathText text={question.conceptReminder} /></p> : null}
                          </div>
                        ) : <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">Try the question first. Ask for one hint only when you need it.</p>}

                        {!allHintsShown ? (
                          <button className="focus-ring mt-4 inline-flex min-h-10 items-center gap-2 rounded-md border border-ink-200 px-3 text-sm font-semibold hover:border-signal-500 dark:border-white/10" type="button" onClick={() => setHintCounts((value) => ({ ...value, [question.slug]: visibleHints + 1 }))}>
                            Get Hint {visibleHints + 1} <ChevronDown size={16} aria-hidden="true" />
                          </button>
                        ) : (
                          <button className="focus-ring mt-4 inline-flex min-h-10 items-center gap-2 rounded-md border border-signal-500/40 px-3 text-sm font-semibold text-signal-800 dark:text-signal-300" type="button" onClick={() => setApproaches((value) => ({ ...value, [question.slug]: !value[question.slug] }))}>
                            <Lightbulb size={16} aria-hidden="true" /> {approachVisible ? "Hide Approach" : "Show Approach"}
                          </button>
                        )}

                        {approachVisible ? (
                          <div className="mt-4 rounded-md border border-signal-500/30 bg-signal-500/8 p-4">
                            <p className="font-semibold">Approach</p>
                            <ol className="mt-3 grid gap-2 text-sm leading-6">
                              {question.approach.map((step, stepIndex) => <li key={step}><span className="font-semibold">{stepIndex + 1}. </span><MathText text={step} /></li>)}
                            </ol>
                          </div>
                        ) : null}

                        {approachVisible ? (
                          <button className="focus-ring mt-4 inline-flex min-h-11 items-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" type="button" onClick={() => toggleSolution(question.slug)}>
                            <Eye size={17} aria-hidden="true" /> {solutionVisible ? "Hide Solution" : "Show Step-by-Step Solution"}
                          </button>
                        ) : null}

                        {solutionVisible ? (
                          <div className="mt-5 rounded-md border border-ink-200 p-4 dark:border-white/10">
                            <p className="font-semibold">Step-by-step solution</p>
                            <ol className="mt-3 space-y-2 text-sm leading-6">
                              {(question.solutionSteps ?? question.solution ?? []).map((step, stepIndex) => <li key={step}><span className="font-semibold">Step {stepIndex + 1}: </span><MathText text={step} /></li>)}
                            </ol>
                            <p className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-300"><MathText text={question.explanation} /></p>
                            <p className="mt-4 rounded-md bg-ink-950 px-3 py-2 text-sm font-semibold text-white dark:bg-white dark:text-ink-950">Final Answer: <MathText text={question.finalAnswer ?? question.answer} /></p>

                            {question.alternativeMethods?.length ? (
                              <div className="mt-4">
                                <button className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md border border-ink-200 px-3 text-sm font-semibold hover:border-signal-500 dark:border-white/10" type="button" onClick={() => setAlternateMethods((value) => ({ ...value, [question.slug]: !value[question.slug] }))}>
                                  <RotateCcw size={16} aria-hidden="true" /> {alternateMethods[question.slug] ? "Hide Another Method" : "View Another Method"}
                                </button>
                                {alternateMethods[question.slug] ? question.alternativeMethods.map((method) => (
                                  <div key={method.title} className="mt-3 rounded-md border border-ink-200 p-3 dark:border-white/10">
                                    <p className="text-sm font-semibold">{method.title}</p>
                                    <ol className="mt-2 space-y-1 text-sm leading-6">
                                      {method.steps.map((step, stepIndex) => <li key={step}><span className="font-semibold">{stepIndex + 1}. </span><MathText text={step} /></li>)}
                                    </ol>
                                  </div>
                                )) : null}
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
                <h2 className="text-xl font-semibold">No {difficulty} questions in this sample yet.</h2>
                <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">Choose another difficulty. The filter shows only real questions currently attached to this chapter.</p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 rounded-lg border border-ink-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-2xl font-semibold">Practice architecture is ready.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600 dark:text-ink-300">No placeholder questions are shown for this chapter.</p>
            <Link className="focus-ring mt-6 inline-flex min-h-11 items-center rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}`}>Back to Chapter</Link>
          </div>
        )}
      </div>
    </section>
  );
}
