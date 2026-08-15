import { ArrowRight, BookOpen, Clock, Search } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { LearningLevelControl } from "../components/LearningLevelControl";
import { getBranchesForClass, getClassBySlug } from "../content";
import { useLearningPreferences } from "../learningContext";
import { updateMathSeo } from "../mathSeo";
import { NotFoundPage } from "./NotFoundPage";

export function ClassPage() {
  const { classSlug } = useParams();
  const mathClass = getClassBySlug(classSlug);
  const branchData = getBranchesForClass(classSlug);
  const { preferences, selectClass, setLearningLevel } = useLearningPreferences();

  useEffect(() => {
    if (mathClass) {
      updateMathSeo({
        title: `CBSE Class ${mathClass.level} Maths`,
        description: `${mathClass.title}: chapters, concepts, practice and tests for CBSE Mathematics.`,
        path: `/${mathClass.slug}`,
      });
      if (preferences.goal !== "school" || preferences.classLevel !== mathClass.level) selectClass(mathClass.level);
    }
  }, [mathClass, preferences.classLevel, preferences.goal, selectClass]);

  if (!mathClass) return <NotFoundPage />;

  const branches = branchData?.branches ?? [];

  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <Breadcrumbs items={[{ name: `Class ${mathClass.level}`, path: `/${mathClass.slug}` }]} />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="section-kicker">CBSE Mathematics</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white sm:text-5xl">{mathClass.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-700 dark:text-ink-200">Learn Class {mathClass.level} Mathematics topic by topic with concepts, examples, practice questions, hints and step-by-step solutions.</p>
          </div>
          <aside className="rounded-lg border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-signal-700 dark:text-signal-400">Learning profile</p>
            <div className="mt-4"><LearningLevelControl value={preferences.learningLevel} onChange={setLearningLevel} compact /></div>
            <p className="mt-3 text-xs leading-5 text-ink-600 dark:text-ink-300">This controls explanation depth. Question difficulty is selected separately in Practice.</p>
            <Link className="focus-ring mt-5 inline-flex min-h-10 items-center gap-2 rounded-md border border-ink-200 px-3 text-sm font-semibold hover:border-signal-500 dark:border-white/10" to="/dashboard">
              Dashboard <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
            <BookOpen className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
            <p className="mt-3 font-semibold">Chapters</p>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{mathClass.chapters.length} structured chapter shells</p>
          </div>
          <div className="rounded-xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
            <Clock className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
            <p className="mt-3 font-semibold">Continue Learning</p>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">Shown only after local lesson history exists</p>
          </div>
          <Link className="focus-ring rounded-xl border border-ink-200 bg-white p-5 transition hover:border-signal-500 dark:border-white/10 dark:bg-white/[0.04]" to="/search">
            <Search className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
            <p className="mt-3 font-semibold">Search</p>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">Find concepts, formulas, chapters and sample questions</p>
          </Link>
        </div>

        <div className="mt-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Syllabus</p>
              <h2 className="section-title">Explore Mathematics</h2>
            </div>
            {branches.length ? (
              <p className="text-sm font-semibold text-ink-500 dark:text-ink-400">{branches.length} branch{branches.length === 1 ? "" : "es"} from current chapter data</p>
            ) : null}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch, index) => {
              const chapterCount = branch.chapters.length;
              const topicCount = branch.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);

              return (
                <article key={branch.slug} className="surface-card rounded-xl p-6 transition hover:-translate-y-0.5 hover:border-signal-500">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-sm font-semibold text-signal-700 dark:text-signal-400">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-2 text-2xl font-semibold uppercase text-ink-950 dark:text-white">{branch.name}</h3>
                    </div>
                  </div>
                  <p className="mt-4 min-h-20 text-sm leading-6 text-ink-600 dark:text-ink-300">{branch.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-ink-600 dark:text-ink-300">
                    <span className="rounded-md border border-ink-200 px-2.5 py-1 dark:border-white/10">{chapterCount} Chapter{chapterCount === 1 ? "" : "s"}</span>
                    {topicCount ? <span className="rounded-md border border-ink-200 px-2.5 py-1 dark:border-white/10">{topicCount} Topic{topicCount === 1 ? "" : "s"}</span> : null}
                  </div>
                  <Link className="focus-ring mt-7 inline-flex items-center gap-2 rounded text-sm font-semibold text-ink-900 hover:text-signal-700 dark:text-white dark:hover:text-signal-400" to={`/${mathClass.slug}/${branch.slug}`}>
                    Explore <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
