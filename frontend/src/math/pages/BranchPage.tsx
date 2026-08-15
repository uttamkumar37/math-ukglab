import { ArrowRight, BookOpen, Compass, FunctionSquare, LineChart, PieChart, Ruler, Shapes, Sigma, Triangle } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useUnit } from "../../api/hooks";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { getBranch, getChapter } from "../content";
import { useLearningPreferences } from "../learningContext";
import { formatExam } from "../learningPreferences";
import { updateMathSeo } from "../mathSeo";
import type { MathBranch } from "../types";
import { NotFoundPage } from "./NotFoundPage";

const branchIcons: Record<MathBranch["identity"], typeof Sigma> = {
  numbers: Sigma,
  algebra: FunctionSquare,
  geometry: Shapes,
  coordinate: Compass,
  trigonometry: Triangle,
  calculus: LineChart,
  statistics: PieChart,
  sets: BookOpen,
  mensuration: Ruler,
};

export function BranchPage() {
  const { classSlug, branchSlug } = useParams();
  const found = getBranch(classSlug, branchSlug);
  const legacyChapter = !found ? getChapter(classSlug, branchSlug) : undefined;
  const { preferences } = useLearningPreferences();
  const apiUnitQuery = useUnit(found?.mathClass.level ?? 0, branchSlug);

  useEffect(() => {
    if (!found) return;
    updateMathSeo({
      title: `${found.branch.name} - CBSE Class ${found.mathClass.level} Maths`,
      description: found.branch.description,
      path: `/${found.mathClass.slug}/${found.branch.slug}`,
    });
  }, [found]);

  if (!found && legacyChapter) {
    return <Navigate replace to={`/${legacyChapter.mathClass.slug}/${legacyChapter.branch.slug}/${legacyChapter.chapter.slug}`} />;
  }

  if (!found) return <NotFoundPage />;

  const { mathClass, branch } = found;
  const apiUnit = apiUnitQuery.data?.data;
  const chapterRows = apiUnit?.chapters.length
    ? apiUnit.chapters.map((chapter) => ({
      slug: chapter.slug,
      title: chapter.title,
      description: chapter.description,
      order: chapter.display_order,
      topicCount: chapter.topics.length,
      questionCount: 0,
    }))
    : branch.chapters.map((chapter) => ({
      slug: chapter.slug,
      title: chapter.title,
      description: chapter.description,
      order: chapter.order,
      topicCount: chapter.lessons.length,
      questionCount: chapter.practice.length,
    }));
  const unitTitle = apiUnit?.title ?? branch.name;
  const unitDescription = apiUnit?.description ?? branch.description;
  const Icon = branchIcons[branch.identity];
  const contextCrumb = preferences.goal === "jee" && preferences.exam
    ? { name: formatExam(preferences.exam), path: `/jee/${preferences.exam}` }
    : { name: `Class ${mathClass.level}`, path: `/${mathClass.slug}` };

  return (
    <section className="py-6 sm:py-8">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumbs items={[contextCrumb, { name: unitTitle, path: `/${mathClass.slug}/${branch.slug}` }]} />

        <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
            <p className="section-kicker">{preferences.goal === "jee" ? formatExam(preferences.exam) : `CBSE Class ${mathClass.level} Mathematics`}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-normal text-ink-950 dark:text-white sm:text-5xl">{unitTitle}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-700 dark:text-ink-200">{unitDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold text-ink-600 dark:text-ink-300">
              <span className="rounded-lg border border-ink-200 px-3 py-2 dark:border-white/10">{chapterRows.length} Chapter{chapterRows.length === 1 ? "" : "s"}</span>
              <span className="rounded-lg border border-ink-200 px-3 py-2 dark:border-white/10">{chapterRows.reduce((total, chapter) => total + chapter.topicCount, 0)} Topics</span>
              {chapterRows.reduce((total, chapter) => total + chapter.questionCount, 0) ? <span className="rounded-lg border border-ink-200 px-3 py-2 dark:border-white/10">{chapterRows.reduce((total, chapter) => total + chapter.questionCount, 0)} Questions</span> : null}
            </div>
            </div>
            <aside className="rounded-2xl border border-ink-200 bg-ink-50 p-5 dark:border-white/10 dark:bg-ink-950/70">
              <Icon className="text-signal-600 dark:text-signal-400" size={32} aria-hidden="true" />
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">Course hierarchy</p>
              <div className="mt-3 grid gap-2 text-sm">
                {["Class", "Unit", "Chapter", "Topic", "Practice"].map((item, index) => (
                  <span key={item} className={`rounded-lg border px-3 py-2 ${index <= 1 ? "border-signal-500/30 bg-signal-500/10 font-semibold text-signal-800 dark:text-signal-300" : "border-ink-200 text-ink-600 dark:border-white/10 dark:text-ink-300"}`}>
                    {item}
                  </span>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-10">
            <p className="section-kicker">Chapters</p>
            <h2 className="mt-3 text-2xl font-bold tracking-normal">Study {unitTitle} Chapter by Chapter</h2>
            <div className="mt-6 divide-y divide-ink-200 rounded-2xl border border-ink-200 dark:divide-white/10 dark:border-white/10">
              {chapterRows.map((chapter) => (
                <Link key={chapter.slug} className="group grid gap-4 p-5 transition hover:bg-ink-50 dark:hover:bg-white/[0.035] sm:grid-cols-[56px_minmax(0,1fr)_auto]" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}`}>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-signal-500/10 font-mono text-sm font-bold text-signal-700 dark:text-signal-300">{String(chapter.order).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="block text-xl font-bold text-ink-950 dark:text-white">{chapter.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-ink-600 dark:text-ink-300">{chapter.description}</span>
                    <span className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-ink-500 dark:text-ink-400">
                      <span>{chapter.topicCount} Topic{chapter.topicCount === 1 ? "" : "s"}</span>
                      {chapter.questionCount ? <span>{chapter.questionCount} Question{chapter.questionCount === 1 ? "" : "s"}</span> : null}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 self-center text-sm font-bold text-ink-900 group-hover:text-signal-700 dark:text-white dark:group-hover:text-signal-400">
                    Start <ArrowRight size={17} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
