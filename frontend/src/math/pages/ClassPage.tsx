import { ArrowRight, BarChart3, BookOpenCheck, Box, CheckCircle2, ClipboardCheck, Compass, FunctionSquare, Lightbulb, NotebookTabs, Play, Ruler, Search, Sigma, Sparkles, Triangle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useClassUnits } from "../../api/hooks";
import type { ApiUnit } from "../../api/schemas";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { getBranchesForClass, getClassBySlug } from "../content";
import { useLearningPreferences } from "../learningContext";
import { updateMathSeo } from "../mathSeo";
import { readProgress, type TopicProgress } from "../progress";
import type { MathBranch } from "../types";
import { NotFoundPage } from "./NotFoundPage";

type RecentLesson = {
  title: string;
  path: string;
  classLevel: number;
  chapter: string;
  updatedAt: string;
};

type DashboardUnit = {
  slug: string;
  title: string;
  description: string;
  identity: MathBranch["identity"];
  unitNumber?: number;
  chapters: {
    slug: string;
    title: string;
    description: string;
    lessons: { slug: string; title: string }[];
  }[];
};

const unitStyles: Record<MathBranch["identity"], { icon: typeof Sigma; accent: string; panel: string; iconBg: string }> = {
  numbers: { icon: Sigma, accent: "text-emerald-700 dark:text-emerald-300", panel: "border-emerald-200 bg-emerald-50/70 dark:border-emerald-300/20 dark:bg-emerald-300/8", iconBg: "bg-emerald-200/75 dark:bg-emerald-300/15" },
  algebra: { icon: FunctionSquare, accent: "text-blue-700 dark:text-blue-300", panel: "border-blue-200 bg-blue-50/70 dark:border-blue-300/20 dark:bg-blue-300/8", iconBg: "bg-blue-200/75 dark:bg-blue-300/15" },
  coordinate: { icon: Compass, accent: "text-rose-700 dark:text-rose-300", panel: "border-rose-200 bg-rose-50/70 dark:border-rose-300/20 dark:bg-rose-300/8", iconBg: "bg-rose-200/75 dark:bg-rose-300/15" },
  geometry: { icon: Triangle, accent: "text-violet-700 dark:text-violet-300", panel: "border-violet-200 bg-violet-50/70 dark:border-violet-300/20 dark:bg-violet-300/8", iconBg: "bg-violet-200/75 dark:bg-violet-300/15" },
  mensuration: { icon: Box, accent: "text-orange-700 dark:text-orange-300", panel: "border-orange-200 bg-orange-50/70 dark:border-orange-300/20 dark:bg-orange-300/8", iconBg: "bg-orange-200/75 dark:bg-orange-300/15" },
  statistics: { icon: BarChart3, accent: "text-cyan-700 dark:text-cyan-300", panel: "border-cyan-200 bg-cyan-50/70 dark:border-cyan-300/20 dark:bg-cyan-300/8", iconBg: "bg-cyan-200/75 dark:bg-cyan-300/15" },
  trigonometry: { icon: Triangle, accent: "text-violet-700 dark:text-violet-300", panel: "border-violet-200 bg-violet-50/70 dark:border-violet-300/20 dark:bg-violet-300/8", iconBg: "bg-violet-200/75 dark:bg-violet-300/15" },
  calculus: { icon: Sparkles, accent: "text-blue-700 dark:text-blue-300", panel: "border-blue-200 bg-blue-50/70 dark:border-blue-300/20 dark:bg-blue-300/8", iconBg: "bg-blue-200/75 dark:bg-blue-300/15" },
  sets: { icon: BookOpenCheck, accent: "text-emerald-700 dark:text-emerald-300", panel: "border-emerald-200 bg-emerald-50/70 dark:border-emerald-300/20 dark:bg-emerald-300/8", iconBg: "bg-emerald-200/75 dark:bg-emerald-300/15" },
};

function readRecent(): RecentLesson | null {
  try {
    return JSON.parse(localStorage.getItem("math-ukglab-recent") ?? "null") as RecentLesson | null;
  } catch {
    return null;
  }
}

function MathHeroVisual() {
  return (
    <div className="pointer-events-none relative hidden min-h-64 overflow-hidden rounded-2xl lg:block" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_20%,rgba(45,212,191,0.26),transparent_30%),radial-gradient(circle_at_28%_42%,rgba(96,165,250,0.22),transparent_34%)]" />
      <div className="absolute right-8 top-7 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-lg font-bold text-cyan-100 shadow-soft">a² + b² = c²</div>
      <div className="absolute bottom-8 right-10 h-28 w-64 rounded-[36px_36px_16px_16px] border border-white/20 bg-white/90 shadow-lift dark:bg-white/85">
        <div className="absolute inset-x-8 top-7 h-px bg-blue-200" />
        <div className="absolute inset-x-7 top-12 h-px bg-blue-200" />
        <div className="absolute inset-x-8 top-[68px] h-px bg-blue-200" />
        <div className="absolute left-1/2 top-3 h-24 w-px bg-blue-300" />
        <div className="absolute -bottom-2 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-blue-700" />
      </div>
      <div className="absolute bottom-28 right-56 grid h-20 w-20 rotate-[-18deg] place-items-center rounded-xl border border-amber-200/70 bg-amber-200/90 text-amber-900 shadow-lift">
        <Ruler size={44} aria-hidden="true" />
      </div>
      <div className="absolute right-80 top-14 h-28 w-8 rotate-[22deg] rounded-full border border-white/30 bg-white/80 shadow-lift">
        <div className="mx-auto mt-2 h-5 w-5 rounded-full border-4 border-blue-900" />
      </div>
      <div className="absolute bottom-24 right-24 text-5xl font-bold text-cyan-200/80">√x</div>
    </div>
  );
}

function topicReviewCount(topic: TopicProgress) {
  return Object.values(topic.solutionReviews).reduce((total, items) => total + items.length, 0);
}

function identityFromSlug(slug: string): MathBranch["identity"] {
  if (slug.includes("algebra")) return "algebra";
  if (slug.includes("coordinate")) return "coordinate";
  if (slug.includes("geometry")) return "geometry";
  if (slug.includes("mensuration")) return "mensuration";
  if (slug.includes("statistics") || slug.includes("probability")) return "statistics";
  return "numbers";
}

function localUnit(branch: MathBranch & { chapters: { slug: string; title: string; description: string; lessons: { slug: string; title: string }[] }[] }): DashboardUnit {
  return {
    slug: branch.slug,
    title: branch.name,
    description: branch.description,
    identity: branch.identity,
    unitNumber: branch.unitNumber,
    chapters: branch.chapters,
  };
}

function apiUnit(unit: ApiUnit, index: number): DashboardUnit {
  return {
    slug: unit.slug,
    title: unit.title,
    description: unit.description,
    identity: identityFromSlug(unit.slug),
    unitNumber: unit.display_order || index + 1,
    chapters: unit.chapters.map((chapter) => ({
      slug: chapter.slug,
      title: chapter.title,
      description: chapter.description,
      lessons: chapter.topics.map((topic) => ({ slug: topic.slug, title: topic.title })),
    })),
  };
}

export function ClassPage() {
  const { classSlug } = useParams();
  const mathClass = getClassBySlug(classSlug);
  const branchData = getBranchesForClass(classSlug);
  const { preferences, selectClass } = useLearningPreferences();
  const apiUnitsQuery = useClassUnits(mathClass?.level ?? 0);
  const [recent, setRecent] = useState<RecentLesson | null>(null);
  const [progressTopics, setProgressTopics] = useState<TopicProgress[]>([]);

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
    const topics = Object.values(readProgress().topics).filter((topic) => topic.classLevel === mathClass.level);
    setProgressTopics(topics);
    setRecent(readRecent());
  }, [mathClass]);

  if (!mathClass) return <NotFoundPage />;

  const branches = branchData?.branches ?? [];
  const apiUnits = apiUnitsQuery.data?.data ?? [];
  const units = apiUnits.length ? apiUnits.map(apiUnit) : branches.map(localUnit);
  const firstBranch = branches[0];
  const firstChapter = firstBranch?.chapters[0];
  const firstLesson = firstChapter?.lessons[0];
  const startPath = recent?.path ?? (firstLesson ? `/${mathClass.slug}/${firstBranch.slug}/${firstChapter.slug}/${firstLesson.slug}` : `/${mathClass.slug}`);
  const chapterCount = units.reduce((total, unit) => total + unit.chapters.length, 0);
  const topicCount = units.reduce((total, unit) => total + unit.chapters.reduce((chapterTotal, chapter) => chapterTotal + chapter.lessons.length, 0), 0);
  const testsAttempted = progressTopics.filter((topic) => topic.latestTest).length;
  const reviewedQuestions = progressTopics.reduce((total, topic) => total + topicReviewCount(topic), 0);
  const startedKeys = new Set(progressTopics.map((topic) => topic.topicKey));
  const recentForClass = recent?.classLevel === mathClass.level ? recent : null;
  const firstPracticePath = firstChapter ? `/${mathClass.slug}/${firstBranch.slug}/${firstChapter.slug}/practice` : "/search";

  return (
    <section className="py-6 sm:py-8">
      <div className="mx-auto grid max-w-[390px] gap-6 px-4 sm:max-w-[1600px] sm:px-6 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="min-w-0">
          <Breadcrumbs items={[{ name: `Class ${mathClass.level}`, path: `/${mathClass.slug}` }]} />

          <section className="mt-4 rounded-2xl bg-[#061b3d] p-6 text-white shadow-lift sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">CBSE · Class {mathClass.level} · Mathematics · {mathClass.curriculum?.academicYear ?? "2026-27"}</p>
                <h1 className="mt-4 max-w-3xl break-words text-[2rem] font-bold leading-[1.08] tracking-normal sm:text-5xl">{mathClass.title}</h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50">Concepts made simple. Learning made powerful.</p>
                <div className="mt-6 grid gap-2 sm:flex sm:flex-wrap sm:gap-3">
                  {[
                    ["Concept-First Learning", BookOpenCheck],
                    ["Smart Practice", ClipboardCheck],
                    ["Hints & Approach", Lightbulb],
                    ["Step-by-Step Solutions", Sparkles],
                  ].map(([label, Icon]) => (
                    <span key={label as string} className="inline-flex min-h-10 min-w-0 items-center gap-2 rounded-xl bg-white/10 px-3 text-sm font-semibold text-blue-50 ring-1 ring-white/10">
                      <Icon size={17} aria-hidden="true" />
                      <span className="min-w-0 break-words">{label as string}</span>
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 text-sm font-bold text-white shadow-soft transition hover:bg-blue-400" to={startPath}>
                    <Play size={17} fill="currentColor" aria-hidden="true" /> {recentForClass ? "Continue Learning" : "Start Learning"}
                  </Link>
                  {recentForClass ? (
                    <p className="text-sm leading-6 text-blue-50/85">Your latest: <span className="font-semibold text-white">{recentForClass.chapter}</span> · {recentForClass.title}</p>
                  ) : firstLesson ? (
                    <p className="text-sm leading-6 text-blue-50/85">Recommended start: <span className="font-semibold text-white">{firstChapter.title}</span> · {firstLesson.title}</p>
                  ) : null}
                </div>
              </div>
              <MathHeroVisual />
            </div>
          </section>

          <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Course summary">
            {[
              { label: "Units", value: String(units.length), helper: apiUnits.length ? "From backend API" : "From local fallback" },
              { label: "Chapters", value: String(chapterCount), helper: "Derived from chapters" },
              { label: "Topics", value: String(topicCount), helper: "Real topic records" },
              { label: "Tests attempted", value: String(testsAttempted), helper: testsAttempted ? "From submitted tests" : "No test history yet" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">{item.label}</p>
                <p className="mt-2 text-3xl font-bold">{item.value}</p>
                <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">{item.helper}</p>
              </div>
            ))}
          </section>

          <section id="course" className="mt-6 scroll-mt-24 rounded-2xl border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-normal text-ink-950 dark:text-white">Explore Class 9 Mathematics</h2>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">Choose a unit to start learning.</p>
              </div>
              <Link className="focus-ring inline-flex min-h-10 w-fit items-center gap-2 rounded-xl border border-ink-200 px-3 text-sm font-semibold hover:border-signal-500 dark:border-white/10" to="/search?q=polynomial">
                <Search size={16} aria-hidden="true" /> Search syllabus
              </Link>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
              {units.map((unit, index) => {
                const style = unitStyles[unit.identity];
                const Icon = style.icon;
                const chapterTotal = unit.chapters.length;
                const unitTopicTotal = unit.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
                const startedInUnit = unit.chapters.reduce((total, chapter) => total + chapter.lessons.filter((lesson) => startedKeys.has(`${mathClass.slug}/${unit.slug}/${chapter.slug}/${lesson.slug}`)).length, 0);
                const percent = unitTopicTotal ? Math.round((startedInUnit / unitTopicTotal) * 100) : 0;

                return (
                  <article key={unit.slug} className={`rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-lift ${style.panel}`}>
                    <div className="flex items-start gap-4">
                      <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${style.iconBg} ${style.accent}`}>
                        <Icon size={30} aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-bold ${style.accent}`}>{String(unit.unitNumber ?? index + 1).padStart(2, "0")}</p>
                        <h3 className="mt-1 text-xl font-bold text-ink-950 dark:text-white">{unit.title}</h3>
                        <p className="mt-2 min-h-12 text-sm leading-6 text-ink-600 dark:text-ink-300">{unit.description}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-600 dark:text-ink-300">
                      <span>{chapterTotal} Chapter{chapterTotal === 1 ? "" : "s"}</span>
                      <span aria-hidden="true">·</span>
                      <span>{unitTopicTotal} Topic{unitTopicTotal === 1 ? "" : "s"}</span>
                    </div>
                    {startedInUnit ? (
                      <div className="mt-4" role="progressbar" aria-label={`${unit.title} topics started`} aria-valuenow={startedInUnit} aria-valuemin={0} aria-valuemax={unitTopicTotal}>
                        <div className="flex items-center justify-between text-xs font-semibold text-ink-600 dark:text-ink-300">
                          <span>{startedInUnit}/{unitTopicTotal} topics started</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-white/70 dark:bg-white/10">
                          <div className="h-full rounded-full bg-current text-signal-600 dark:text-signal-400" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    ) : null}
                    <Link className="focus-ring mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl bg-white/80 px-3 text-sm font-bold text-ink-950 shadow-soft transition hover:bg-white dark:bg-white/10 dark:text-white dark:hover:bg-white/15" to={`/${mathClass.slug}/${unit.slug}`}>
                      Explore Unit <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-ink-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-xl font-bold">Why Math by UKG Lab?</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["Concept First", "Understand why before memorizing how.", Lightbulb],
                ["Smart Hints", "Progressive hints that guide your thinking.", CheckCircle2],
                ["Multiple Levels", "Simple, Medium and Hard explanations/questions.", Sigma],
                ["Detailed Solutions", "Step-by-step solutions with clear reasoning.", NotebookTabs],
              ].map(([title, copy, Icon]) => (
                <div key={title as string} className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                  <Icon className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
                  <p className="mt-3 font-bold">{title as string}</p>
                  <p className="mt-1 text-sm leading-6 text-ink-600 dark:text-ink-300">{copy as string}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-24 xl:h-fit">
          <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-lg font-bold">Continue Learning</h2>
            {recentForClass ? (
              <Link className="mt-4 flex items-center gap-3 rounded-xl border border-ink-200 p-3 transition hover:border-signal-500 dark:border-white/10" to={recentForClass.path}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-300/15 dark:text-blue-300"><FunctionSquare size={24} aria-hidden="true" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold">{recentForClass.chapter}</span>
                  <span className="mt-0.5 block text-sm text-ink-600 dark:text-ink-300">{recentForClass.title}</span>
                </span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            ) : (
              <div className="mt-4 rounded-xl bg-ink-50 p-4 text-sm leading-6 text-ink-600 dark:bg-ink-950/70 dark:text-ink-300">
                Complete your first lesson to start tracking progress.
                {firstLesson ? <Link className="focus-ring mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink-950 px-3 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" to={startPath}>Start first lesson <ArrowRight size={15} aria-hidden="true" /></Link> : null}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-lg font-bold">Recommended Next Step</h2>
            <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">{reviewedQuestions ? "Review the questions you opened, then take a chapter test when ready." : "Start with the first NCERT chapter, then use practice hints before viewing solutions."}</p>
                <Link className="focus-ring mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl border border-ink-200 px-3 text-sm font-semibold hover:border-signal-500 dark:border-white/10" to={reviewedQuestions && firstChapter ? `/${mathClass.slug}/${firstBranch.slug}/${firstChapter.slug}/test` : firstPracticePath}>
              {reviewedQuestions ? "Open test" : "Open practice"} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-lg font-bold">Study Activity</h2>
            {progressTopics.length ? (
              <div className="mt-4 grid gap-3">
                <div className="rounded-xl bg-ink-50 p-4 dark:bg-ink-950/70">
                  <p className="text-2xl font-bold">{progressTopics.length}</p>
                  <p className="text-sm text-ink-600 dark:text-ink-300">topics with real activity</p>
                </div>
                <div className="rounded-xl bg-ink-50 p-4 dark:bg-ink-950/70">
                  <p className="text-2xl font-bold">{reviewedQuestions}</p>
                  <p className="text-sm text-ink-600 dark:text-ink-300">solutions reviewed</p>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">No activity yet. Streaks and calendars will appear only after real activity tracking exists.</p>
            )}
          </section>

          <section className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-lg font-bold">Quick Revision</h2>
            <div className="mt-4 grid gap-2 text-sm text-ink-700 dark:text-ink-200">
              {["Key definitions", "Important formulae", "Critical properties", "Common mistakes"].map((item) => (
                <span key={item} className="flex items-center gap-2 rounded-lg border border-ink-200 px-3 py-2 dark:border-white/10"><CheckCircle2 className="text-signal-600 dark:text-signal-400" size={16} aria-hidden="true" /> {item}</span>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
