import { ArrowLeft, ArrowRight, Bookmark, CheckCircle2, Eye, Lightbulb, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Diagram } from "../components/Diagram";
import { LearningLevelControl } from "../components/LearningLevelControl";
import { LessonContent, MathBlock, MathText } from "../components/MathRender";
import { getLesson, resolveLessonDepth } from "../content";
import { useLearningPreferences } from "../learningContext";
import { formatExam, getHarderLevel, getSimplerLevel } from "../learningPreferences";
import { updateMathSeo } from "../mathSeo";
import { recordConceptOpened } from "../progress";
import type { LearningLevel } from "../types";
import { NotFoundPage } from "./NotFoundPage";

const bookmarkKey = "math-ukglab-bookmarks";
const recentKey = "math-ukglab-recent";

type BookmarkItem = {
  title: string;
  path: string;
  type: "lesson";
};

function readBookmarks(): BookmarkItem[] {
  try {
    return JSON.parse(localStorage.getItem(bookmarkKey) ?? "[]") as BookmarkItem[];
  } catch {
    return [];
  }
}

export function LessonPage() {
  const { classSlug, branchSlug, chapterSlug, lessonSlug } = useParams();
  const found = useMemo(() => getLesson(classSlug, chapterSlug, lessonSlug, branchSlug), [branchSlug, chapterSlug, classSlug, lessonSlug]);
  const { preferences, setLearningLevel } = useLearningPreferences();
  const [showSolution, setShowSolution] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [previewLevel, setPreviewLevel] = useState<LearningLevel | null>(null);
  const [basicNote, setBasicNote] = useState(false);

  const path = found ? `/${found.mathClass.slug}/${found.branch.slug}/${found.chapter.slug}/${found.lesson.slug}` : "/";
  const topicKey = found ? `${found.mathClass.slug}/${found.branch.slug}/${found.chapter.slug}/${found.lesson.slug}` : "";
  const activeLevel = previewLevel ?? preferences.learningLevel;
  const depth = useMemo(() => found ? resolveLessonDepth(found.lesson, activeLevel) : null, [activeLevel, found]);
  const currentIndex = found ? found.chapter.lessons.findIndex((lesson) => lesson.slug === found.lesson.slug) : -1;
  const prevLesson = found && currentIndex > 0 ? found.chapter.lessons[currentIndex - 1] : undefined;
  const nextLesson = found && currentIndex >= 0 ? found.chapter.lessons[currentIndex + 1] : undefined;

  useEffect(() => {
    if (!found || !depth) return;
    updateMathSeo({
      title: `${found.lesson.title} - Class ${found.mathClass.level} Maths`,
      description: depth.summary,
      path,
    });

    const recent = { title: found.lesson.title, path, classLevel: found.mathClass.level, chapter: found.chapter.title, updatedAt: new Date().toISOString() };
    localStorage.setItem(recentKey, JSON.stringify(recent));
    recordConceptOpened({ topicKey, title: found.lesson.title, path, classLevel: found.mathClass.level, chapter: found.chapter.title });
    setBookmarked(readBookmarks().some((item) => item.path === path));
  }, [depth, found, path, topicKey]);

  const stages = useMemo(() => ["Introduction", found?.lesson.title ?? "Concept", "Worked Example", "Try It Yourself", "Practice", "Chapter Test", "Revision"], [found?.lesson.title]);

  if (!found || !depth) return <NotFoundPage />;

  const { mathClass, branch, chapter, lesson } = found;
  const challengeLevel = getHarderLevel(preferences.learningLevel) ?? "hard";
  const contextCrumb = preferences.goal === "jee" && preferences.exam
    ? { name: formatExam(preferences.exam), path: `/jee/${preferences.exam}` }
    : { name: `Class ${mathClass.level}`, path: `/${mathClass.slug}` };

  const toggleBookmark = () => {
    const bookmarks = readBookmarks();
    const exists = bookmarks.some((item) => item.path === path);
    const next = exists ? bookmarks.filter((item) => item.path !== path) : [...bookmarks, { title: lesson.title, path, type: "lesson" as const }];
    localStorage.setItem(bookmarkKey, JSON.stringify(next));
    setBookmarked(!exists);
  };

  const changeLevel = (level: LearningLevel) => {
    setPreviewLevel(null);
    setBasicNote(false);
    setLearningLevel(level);
  };

  const explainSimpler = () => {
    if (activeLevel === "simple") {
      setBasicNote(true);
      return;
    }
    changeLevel(getSimplerLevel(activeLevel));
  };

  const challenge = () => {
    setBasicNote(false);
    setPreviewLevel(challengeLevel);
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="section-shell">
        <Breadcrumbs items={[contextCrumb, { name: branch.name, path: `/${mathClass.slug}/${branch.slug}` }, { name: chapter.title, path: `/${mathClass.slug}/${branch.slug}/${chapter.slug}` }, { name: lesson.title, path }]} />

        <div className="grid gap-8 xl:grid-cols-[250px_minmax(0,1fr)_290px]">
          <aside className="xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-lg border border-ink-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-sm font-bold text-ink-950 dark:text-white">{preferences.goal === "jee" ? formatExam(preferences.exam) : `Class ${mathClass.level}`}</p>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{branch.name}</p>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{chapter.title}</p>
              <div className="mt-4 rounded-md bg-signal-500/10 px-3 py-2 text-xs font-semibold capitalize text-signal-800 dark:text-signal-300">{activeLevel} explanation</div>
              <nav className="mt-5 grid gap-2" aria-label="Lesson stages">
                {stages.map((stage, index) => (
                  <span key={stage} className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${index <= 2 ? "bg-signal-500/10 font-semibold text-signal-800 dark:text-signal-300" : "text-ink-600 dark:text-ink-300"}`}>
                    {index === 0 ? <CheckCircle2 size={16} aria-hidden="true" /> : <span className="h-2 w-2 rounded-full border border-current" />}
                    {stage}
                  </span>
                ))}
              </nav>
            </div>
          </aside>

          <article className="min-w-0">
            <div className="mb-4 rounded-lg border border-ink-200 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-white/[0.035] sm:p-5">
              <div className="flex flex-col gap-4">
                <LearningLevelControl value={activeLevel} onChange={changeLevel} compact label="Explanation level" />
                <div className="flex flex-wrap gap-2">
                  <button className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md border border-ink-200 px-3 text-sm font-semibold hover:border-signal-500 dark:border-white/10" type="button" onClick={explainSimpler}>
                    <Lightbulb size={16} aria-hidden="true" /> Explain Simpler
                  </button>
                  <button className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md border border-flame-500/40 px-3 text-sm font-semibold text-flame-500 hover:bg-flame-500/10" type="button" onClick={challenge}>
                    <Sparkles size={16} aria-hidden="true" /> Challenge Me
                  </button>
                </div>
              </div>
              {basicNote ? <p className="mt-4 rounded-md bg-signal-500/10 px-3 py-2 text-sm text-signal-800 dark:text-signal-300">You are viewing the simplest explanation available for this topic.</p> : null}
              {previewLevel ? (
                <div className="mt-4 flex flex-col gap-3 rounded-md border border-flame-500/30 bg-flame-500/8 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-6"><span className="font-semibold capitalize">Previewing {previewLevel} depth.</span> Your saved level is still <span className="capitalize">{preferences.learningLevel}</span>.</p>
                  <div className="flex flex-wrap gap-2">
                    {previewLevel !== preferences.learningLevel ? <button className="focus-ring min-h-9 rounded-md bg-ink-950 px-3 text-xs font-semibold text-white dark:bg-white dark:text-ink-950" type="button" onClick={() => changeLevel(previewLevel)}>Use as default</button> : null}
                    <Link className="focus-ring inline-flex min-h-9 items-center rounded-md border border-flame-500/40 px-3 text-xs font-semibold text-flame-600" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/practice?difficulty=Hard`}>Try Hard Questions</Link>
                    <button className="focus-ring min-h-9 rounded-md border border-ink-200 px-3 text-xs font-semibold dark:border-white/10" type="button" onClick={() => setPreviewLevel(null)}>End preview</button>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="rounded-lg border border-ink-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.035] sm:p-8">
              <p className="section-kicker">Topic · {branch.name} · <span className="capitalize">{activeLevel}</span></p>
              <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white sm:text-5xl">{lesson.title}</h1>
              <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200"><MathText text={depth.summary} /></p>

              <section className="mt-10">
                <h2 className="text-2xl font-semibold">What You'll Learn</h2>
                <ul className="mt-4 grid gap-3">
                  {depth.objectives.map((objective) => (
                    <li key={objective} className="flex gap-3 rounded-md border border-ink-200 p-3 text-sm leading-6 dark:border-white/10">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-signal-600 dark:text-signal-400" size={18} aria-hidden="true" />
                      <MathText text={objective} />
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-semibold">What is it?</h2>
                <p className="mt-4 text-base leading-7 text-ink-700 dark:text-ink-200"><MathText text={depth.what} /></p>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-semibold">Why do we need it?</h2>
                <p className="mt-4 text-base leading-7 text-ink-700 dark:text-ink-200"><MathText text={depth.whyItMatters} /></p>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-semibold">How does it work?</h2>
                <p className="mt-4 text-base leading-7 text-ink-700 dark:text-ink-200"><MathText text={depth.howItWorks} /></p>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-semibold">Formula / Rule</h2>
                {lesson.formula ? <MathBlock math={lesson.formula} /> : <p className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-300">No single formula is required for this topic.</p>}
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-semibold">Concept</h2>
                <div className="mt-4"><LessonContent blocks={depth.content} /></div>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-semibold">Visual Explanation</h2>
                <div className="mt-4 aspect-[16/9] overflow-hidden rounded-lg border border-ink-200 bg-ink-50 dark:border-white/10 dark:bg-ink-950/70"><Diagram type={lesson.visual} /></div>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-semibold"><span className="capitalize">{activeLevel}</span> Example</h2>
                <p className="mt-4 text-base font-semibold leading-7"><MathText text={depth.example.problem} /></p>
                <ol className="mt-4 space-y-3">
                  {depth.example.steps.map((step, index) => (
                    <li key={step} className="rounded-md border border-ink-200 p-4 text-sm leading-6 dark:border-white/10">
                      <span className="font-bold text-signal-700 dark:text-signal-400">Step {index + 1}: </span><MathText text={step} />
                    </li>
                  ))}
                </ol>
              </section>

              <section className="mt-10 rounded-lg border border-signal-500/30 bg-signal-500/8 p-5">
                <h2 className="flex items-center gap-2 text-2xl font-semibold"><Lightbulb className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" /> Why This Works</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700 dark:text-ink-200"><MathText text={depth.why} /></p>
              </section>

              <section className="mt-10 rounded-lg border border-flame-500/30 bg-flame-500/8 p-5">
                <h2 className="text-2xl font-semibold">Common Mistake</h2>
                <p className="mt-3 text-sm leading-7 text-ink-700 dark:text-ink-200"><MathText text={depth.commonMistake} /></p>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-semibold">Try It Yourself</h2>
                <p className="mt-4 rounded-md border border-ink-200 p-4 text-base font-semibold dark:border-white/10"><MathText text={depth.tryIt.question} /></p>
                <button className="focus-ring mt-4 inline-flex min-h-11 items-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" type="button" onClick={() => setShowSolution((value) => !value)}>
                  <Eye size={17} aria-hidden="true" /> {showSolution ? "Hide Solution" : "Show Solution"}
                </button>
                {showSolution ? (
                  <ol className="mt-4 space-y-3">
                    {depth.tryIt.solution.map((step, index) => (
                      <li key={step} className="rounded-md border border-ink-200 bg-ink-50 p-4 text-sm leading-6 dark:border-white/10 dark:bg-ink-950/70">
                        <span className="font-bold">Step {index + 1}: </span><MathText text={step} />
                      </li>
                    ))}
                  </ol>
                ) : null}
              </section>

              <div className="mt-12 flex flex-col gap-3 border-t border-ink-200 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
                {prevLesson ? (
                  <Link className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md border border-ink-200 px-4 text-sm font-semibold dark:border-white/10" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/${prevLesson.slug}`}><ArrowLeft size={17} aria-hidden="true" /> Previous Topic</Link>
                ) : <span />}
                {nextLesson ? (
                  <Link className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/${nextLesson.slug}`}>Next Topic <ArrowRight size={17} aria-hidden="true" /></Link>
                ) : (
                  <Link className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/practice`}>Practice <ArrowRight size={17} aria-hidden="true" /></Link>
                )}
              </div>
            </div>
          </article>

          <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-lg border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-signal-700 dark:text-signal-400">Progress</p>
              <p className="mt-3 font-semibold">Learning</p>
              <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">This concept visit is stored locally. Practice and test records remain separate.</p>
            </div>
            <button className="focus-ring flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-ink-200 px-4 text-sm font-semibold transition hover:border-signal-500 dark:border-white/10" type="button" onClick={toggleBookmark}>
              <Bookmark size={17} aria-hidden="true" /> {bookmarked ? "Bookmarked" : "Bookmark Lesson"}
            </button>
            {lesson.formula ? (
              <div className="rounded-lg border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="font-semibold">Formula / Reference</p><MathBlock math={lesson.formula} />
              </div>
            ) : null}
            <div className="rounded-lg border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="font-semibold">Chapter Navigation</p>
              <div className="mt-4 grid gap-2">
                <Link className="rounded-md border border-ink-200 px-3 py-2 text-sm dark:border-white/10" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}`}>Overview</Link>
                <Link className="rounded-md border border-ink-200 px-3 py-2 text-sm dark:border-white/10" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/practice`}>Practice</Link>
                <Link className="rounded-md border border-ink-200 px-3 py-2 text-sm dark:border-white/10" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}/test`}>Chapter Test</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
