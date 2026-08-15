import { ArrowRight, BookOpen, Clock, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { LearningLevelControl } from "../components/LearningLevelControl";
import { getBranchesForClass, getClassBySlug } from "../content";
import { useLearningPreferences } from "../learningContext";
import { updateMathSeo } from "../mathSeo";
import { readProgress } from "../progress";
import { NotFoundPage } from "./NotFoundPage";

export function ClassPage() {
  const { classSlug } = useParams();
  const mathClass = getClassBySlug(classSlug);
  const branchData = getBranchesForClass(classSlug);
  const { preferences, selectClass, setLearningLevel } = useLearningPreferences();
  const [hasHistory, setHasHistory] = useState(false);
  const [latestPath, setLatestPath] = useState<string | null>(null);
  const [progressCount, setProgressCount] = useState(0);

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

  useEffect(() => {
    if (!mathClass) return;
    const classTopics = Object.values(readProgress().topics).filter((topic) => topic.classLevel === mathClass.level);
    setHasHistory(classTopics.length > 0);
    setProgressCount(classTopics.length);
    setLatestPath(classTopics.sort((a, b) => (b.conceptOpenedAt ?? "").localeCompare(a.conceptOpenedAt ?? ""))[0]?.path ?? null);
  }, [mathClass]);

  if (!mathClass) return <NotFoundPage />;

  const branches = branchData?.branches ?? [];
  const firstBranch = branches[0];
  const firstChapter = firstBranch?.chapters[0];
  const firstLesson = firstChapter?.lessons[0];
  const startPath = latestPath ?? (firstLesson ? `/${mathClass.slug}/${firstBranch.slug}/${firstChapter.slug}/${firstLesson.slug}` : `/${mathClass.slug}`);
  const chapterCount = mathClass.chapters.length;
  const topicCount = mathClass.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
  const questionCount = mathClass.chapters.reduce((total, chapter) => total + chapter.practice.length, 0);

  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <Breadcrumbs items={[{ name: `Class ${mathClass.level}`, path: `/${mathClass.slug}` }]} />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="section-kicker">CBSE · Class IX · Mathematics · {mathClass.curriculum?.academicYear ?? "2026-27"}</p>
            <h1 className="mt-3 max-w-full break-words text-3xl font-semibold tracking-normal text-ink-950 dark:text-white sm:text-5xl">{mathClass.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-700 dark:text-ink-200">{mathClass.description}</p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <Link className="focus-ring inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" to={startPath}>
                {hasHistory ? "Continue Learning" : "Start Learning"} <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a className="focus-ring inline-flex min-h-11 min-w-0 items-center justify-center rounded-md border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-900 hover:border-signal-500 dark:border-white/10 dark:bg-white/5 dark:text-white" href="#course">
                Explore Course
              </a>
              {firstChapter ? (
                <>
                  <Link className="focus-ring inline-flex min-h-11 min-w-0 items-center justify-center rounded-md border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-900 hover:border-signal-500 dark:border-white/10 dark:bg-white/5 dark:text-white" to={`/${mathClass.slug}/${firstBranch.slug}/${firstChapter.slug}/practice`}>
                    Practice
                  </Link>
                  <Link className="focus-ring inline-flex min-h-11 min-w-0 items-center justify-center rounded-md border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-900 hover:border-signal-500 dark:border-white/10 dark:bg-white/5 dark:text-white" to={`/${mathClass.slug}/${firstBranch.slug}/${firstChapter.slug}#revision`}>
                    Revision
                  </Link>
                </>
              ) : null}
            </div>
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
            <p className="mt-3 font-semibold">{branches.length} Units</p>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{chapterCount} chapters derived from curriculum data</p>
          </div>
          <div className="rounded-xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
            <Sparkles className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
            <p className="mt-3 font-semibold">{topicCount} Topics</p>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">Counted from actual topic records</p>
          </div>
          <div className="rounded-xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
            <Clock className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
            <p className="mt-3 font-semibold">Progress</p>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{progressCount ? `${progressCount} topic record${progressCount === 1 ? "" : "s"} saved locally` : "Only when real progress exists"}</p>
          </div>
        </div>

        <div id="course" className="mt-14 scroll-mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Syllabus</p>
              <h2 className="section-title">Your Class 9 Mathematics Course</h2>
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
                      <p className="font-mono text-sm font-semibold text-signal-700 dark:text-signal-400">UNIT {branch.unitNumber ? String(branch.unitNumber).padStart(2, "0") : String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-2 text-2xl font-semibold uppercase text-ink-950 dark:text-white">{branch.name}</h3>
                    </div>
                  </div>
                  <p className="mt-4 min-h-20 text-sm leading-6 text-ink-600 dark:text-ink-300">{branch.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-ink-600 dark:text-ink-300">
                    <span className="rounded-md border border-ink-200 px-2.5 py-1 dark:border-white/10">{chapterCount} Chapter{chapterCount === 1 ? "" : "s"}</span>
                    {topicCount ? <span className="rounded-md border border-ink-200 px-2.5 py-1 dark:border-white/10">{topicCount} Topic{topicCount === 1 ? "" : "s"}</span> : null}
                    {questionCount && index === 0 ? <span className="rounded-md border border-ink-200 px-2.5 py-1 dark:border-white/10">{questionCount} Questions</span> : null}
                  </div>
                  <div className="mt-5 grid gap-2">
                    {branch.chapters.map((chapter) => (
                      <Link key={chapter.slug} className="rounded-md border border-ink-200 px-3 py-2 text-sm font-semibold transition hover:border-signal-500 dark:border-white/10" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}`}>
                        {String(chapter.order).padStart(2, "0")} · {chapter.title}
                      </Link>
                    ))}
                  </div>
                  <Link className="focus-ring mt-7 inline-flex items-center gap-2 rounded text-sm font-semibold text-ink-900 hover:text-signal-700 dark:text-white dark:hover:text-signal-400" to={`/${mathClass.slug}/${branch.slug}`}>
                    Explore Unit <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_320px]">
          <section className="rounded-xl border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
            <p className="section-kicker">Course Material</p>
            <h2 className="mt-3 text-2xl font-semibold">NCERT-Aligned Course</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {["Learn", "Notes", "Worked Examples", "Practice", "NCERT Exercise Companion", "Revision"].map((item) => (
                <span key={item} className="rounded-md border border-ink-200 px-3 py-3 text-sm font-semibold dark:border-white/10">{item}</span>
              ))}
            </div>
          </section>
          <Link className="focus-ring rounded-xl border border-ink-200 bg-white p-6 transition hover:border-signal-500 dark:border-white/10 dark:bg-white/[0.04]" to="/search?q=irrational%20numbers">
            <Search className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
            <p className="mt-3 font-semibold">Search Class 9</p>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">Find unit, chapter, topic and question results.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Search <ArrowRight size={16} aria-hidden="true" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
