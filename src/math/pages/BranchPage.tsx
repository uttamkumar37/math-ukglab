import { ArrowRight, BookOpen, Compass, FunctionSquare, LineChart, PieChart, Ruler, Shapes, Sigma, Triangle } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { getBranch, getChapter } from "../content";
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
  const Icon = branchIcons[branch.identity];

  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <Breadcrumbs items={[{ name: `Class ${mathClass.level}`, path: `/${mathClass.slug}` }, { name: branch.name, path: `/${mathClass.slug}/${branch.slug}` }]} />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="section-kicker">CBSE Class {mathClass.level} Mathematics</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white sm:text-5xl">{branch.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-700 dark:text-ink-200">{branch.description}</p>
          </div>
          <aside className="rounded-xl border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <Icon className="text-signal-600 dark:text-signal-400" size={28} aria-hidden="true" />
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">Hierarchy</p>
            <div className="mt-3 grid gap-2 text-sm font-semibold">
              {["Class", "Branch", "Chapter", "Topic", "Concept", "Question"].map((item, index) => (
                <span key={item} className={`rounded-md border px-3 py-2 ${index <= 1 ? "border-signal-500/30 bg-signal-500/10 text-signal-800 dark:text-signal-300" : "border-ink-200 dark:border-white/10"}`}>
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14">
          <p className="section-kicker">Chapters</p>
          <h2 className="section-title">Study {branch.name} Chapter by Chapter</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {branch.chapters.map((chapter) => (
              <Link key={chapter.slug} className="surface-card group rounded-xl p-6 transition hover:-translate-y-0.5 hover:border-signal-500" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}`}>
                <p className="font-mono text-sm font-semibold text-signal-700 dark:text-signal-400">{String(chapter.order).padStart(2, "0")}</p>
                <h3 className="mt-3 text-2xl font-semibold text-ink-950 dark:text-white">{chapter.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">{chapter.description}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-ink-600 dark:text-ink-300">
                  <span className="rounded-md border border-ink-200 px-2.5 py-1 dark:border-white/10">{chapter.lessons.length} topic{chapter.lessons.length === 1 ? "" : "s"}</span>
                  {chapter.practice.length ? <span className="rounded-md border border-ink-200 px-2.5 py-1 dark:border-white/10">{chapter.practice.length} question{chapter.practice.length === 1 ? "" : "s"}</span> : null}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 group-hover:text-signal-700 dark:text-white dark:group-hover:text-signal-400">
                  Explore Chapter <ArrowRight size={17} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
