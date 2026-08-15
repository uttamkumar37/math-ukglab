import { ArrowRight, BookOpen, Layers3, Target } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { LearningLevelControl } from "../components/LearningLevelControl";
import { getChaptersForExam, mathBranches } from "../content";
import { useLearningPreferences } from "../learningContext";
import { formatExam } from "../learningPreferences";
import { updateMathSeo } from "../mathSeo";
import type { JeeExam } from "../types";
import { NotFoundPage } from "./NotFoundPage";

export function JeeCoursePage() {
  const { examSlug } = useParams();
  const exam: JeeExam | null = examSlug === "jee-main" || examSlug === "jee-advanced" ? examSlug : null;
  const { preferences, selectExam, setLearningLevel } = useLearningPreferences();
  const chapters = useMemo(() => exam ? getChaptersForExam(exam) : [], [exam]);
  const branchGroups = useMemo(() => mathBranches
    .map((branch) => ({ ...branch, chapters: chapters.filter((chapter) => chapter.branchSlug === branch.slug) }))
    .filter((branch) => branch.chapters.length), [chapters]);

  useEffect(() => {
    if (!exam) return;
    updateMathSeo({
      title: `${formatExam(exam)} Mathematics`,
      description: `Shared mathematics concepts mapped for ${formatExam(exam)} with adaptive explanations and practice.`,
      path: `/jee/${exam}`,
    });
    if (preferences.goal !== "jee" || preferences.exam !== exam) selectExam(exam);
  }, [exam, preferences.exam, preferences.goal, selectExam]);

  if (!exam) return <NotFoundPage />;

  const topicCount = chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);

  return (
    <section className="py-10 sm:py-16">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="section-kicker">IIT JEE Mathematics</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white sm:text-5xl">{formatExam(exam)}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-700 dark:text-ink-200">Study shared mathematical concepts at JEE depth. Foundation material is reused where it helps; advanced reasoning is attached to the same topic instead of copied into a separate course tree.</p>
            <div className="mt-7 flex flex-wrap gap-2 text-sm font-semibold">
              <span className="rounded-md border border-ink-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/[0.035]">{branchGroups.length} relevant branches</span>
              <span className="rounded-md border border-ink-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/[0.035]">{chapters.length} mapped chapters</span>
              <span className="rounded-md border border-signal-500/30 bg-signal-500/10 px-3 py-2 text-signal-800 dark:text-signal-300">{topicCount} complete shared topic{topicCount === 1 ? "" : "s"}</span>
            </div>
          </div>
          <aside className="rounded-lg border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.035]">
            <LearningLevelControl value={preferences.learningLevel} onChange={setLearningLevel} compact />
            <p className="mt-4 text-xs leading-5 text-ink-600 dark:text-ink-300">This changes explanation depth. Practice difficulty stays independently selectable.</p>
          </aside>
        </div>

        {topicCount ? (
          <section className="mt-12 rounded-lg border border-signal-500/30 bg-signal-500/8 p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-signal-700 dark:text-signal-300">Available now · Shared concept</p>
                <h2 className="mt-2 text-2xl font-semibold">Quadratic Formula</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-700 dark:text-ink-200">Switch between Simple, Medium and Hard explanations on the same topic page, then choose question difficulty separately.</p>
              </div>
              <Link className="focus-ring inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" to="/class-10/quadratic-equations/quadratic-equations/quadratic-formula">
                Start Topic <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </section>
        ) : null}

        <section className="mt-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Course map</p>
              <h2 className="section-title">Relevant Mathematics Branches</h2>
            </div>
            <Link className="focus-ring inline-flex w-fit items-center gap-2 rounded-md border border-ink-200 px-3 py-2 text-sm font-semibold hover:border-signal-500 dark:border-white/10" to="/explore?goal=jee">Change course</Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {branchGroups.map((branch) => (
              <article key={branch.slug} className="surface-card rounded-lg p-6">
                <Layers3 className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold">{branch.name}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">{branch.description}</p>
                <div className="mt-5 grid gap-2">
                  {branch.chapters.map((chapter) => (
                    <Link key={`${chapter.classLevel}-${chapter.slug}`} className="focus-ring flex items-center justify-between gap-3 rounded-md border border-ink-200 px-3 py-3 text-sm transition hover:border-signal-500 dark:border-white/10" to={`/class-${chapter.classLevel}/${chapter.branchSlug}/${chapter.slug}`}>
                      <span>
                        <span className="block font-semibold">{chapter.title}</span>
                        <span className="mt-0.5 block text-xs text-ink-500 dark:text-ink-400">Shared from Class {chapter.classLevel}{chapter.lessons.length ? " · Topic available" : " · Curriculum mapped"}</span>
                      </span>
                      {chapter.lessons.length ? <BookOpen className="shrink-0 text-signal-600 dark:text-signal-400" size={16} aria-hidden="true" /> : <Target className="shrink-0 text-ink-400" size={16} aria-hidden="true" />}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
