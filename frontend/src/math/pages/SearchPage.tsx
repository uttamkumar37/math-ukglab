import { Search, SlidersHorizontal } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { allChapters, allFormulas, allLessons, allQuestions, mathBranches } from "../content";
import { useLearningPreferences } from "../learningContext";
import { formatExam } from "../learningPreferences";
import { updateMathSeo } from "../mathSeo";
import type { JeeExam, StudentPreferences } from "../types";

type Result = {
  type: "Branch" | "Chapter" | "Topic" | "Note" | "Question" | "Formula";
  title: string;
  description: string;
  path: string;
  classLevel?: number;
  examLevels?: JeeExam[];
  score: number;
};

function buildResults(query: string, preferences: StudentPreferences, viewAll: boolean): Result[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const results: Result[] = [];
  mathBranches.forEach((branch) => {
    if (!`${branch.name} ${branch.description}`.toLowerCase().includes(normalized)) return;
    const branchChapters = allChapters.filter((chapter) => chapter.branchSlug === branch.slug);
    const preferredChapter = preferences.goal === "school" && preferences.classLevel
      ? branchChapters.find((chapter) => chapter.classLevel === preferences.classLevel)
      : preferences.goal === "jee" && preferences.exam
        ? branchChapters.find((chapter) => chapter.examLevels?.includes(preferences.exam as JeeExam))
        : branchChapters[0];
    const chapter = preferredChapter ?? branchChapters[0];
    if (!chapter) return;
    const examLevels = Array.from(new Set(branchChapters.flatMap((item) => item.examLevels ?? [])));
    results.push({ type: "Branch", title: branch.name, description: branch.description, path: `/class-${chapter.classLevel}/${branch.slug}`, classLevel: chapter.classLevel, examLevels, score: 20 });
  });
  allChapters.forEach((chapter) => {
    if (`${chapter.title} ${chapter.description}`.toLowerCase().includes(normalized)) {
      results.push({ type: "Chapter", title: chapter.title, description: `Class ${chapter.classLevel} · ${chapter.branch.name} · ${chapter.description}`, path: `/class-${chapter.classLevel}/${chapter.branchSlug}/${chapter.slug}`, classLevel: chapter.classLevel, examLevels: chapter.examLevels, score: 30 });
    }
    if (chapter.notes && `${chapter.title} ${chapter.notes.definitions.join(" ")} ${chapter.notes.keyConcepts.join(" ")} ${chapter.notes.formulas.join(" ")}`.toLowerCase().includes(normalized)) {
      results.push({ type: "Note", title: `${chapter.title} Notes`, description: `Class ${chapter.classLevel} · ${chapter.branch.name} · concise revision notes`, path: `/class-${chapter.classLevel}/${chapter.branchSlug}/${chapter.slug}#notes`, classLevel: chapter.classLevel, examLevels: chapter.examLevels, score: 35 });
    }
  });
  allLessons.forEach((lesson) => {
    if (`${lesson.title} ${lesson.summary} ${lesson.conceptTitle ?? ""}`.toLowerCase().includes(normalized)) {
      results.push({ type: "Topic", title: lesson.title, description: `Class ${lesson.classLevel} · ${lesson.branchName} · ${lesson.chapterTitle} · Adaptive explanations`, path: `/class-${lesson.classLevel}/${lesson.branchSlug}/${lesson.chapterSlug}/${lesson.slug}`, classLevel: lesson.classLevel, examLevels: lesson.examLevels, score: 50 });
    }
  });
  allQuestions.forEach((question) => {
    if (`${question.question} ${question.topic} ${question.concept ?? ""}`.toLowerCase().includes(normalized)) {
      results.push({ type: "Question", title: question.concept ?? question.topic, description: `Class ${question.classLevel} · ${question.branchName} · ${question.chapterTitle} · ${question.difficulty} · ${question.type}`, path: `/class-${question.classLevel}/${question.branchSlug}/${question.chapterSlug}/practice?difficulty=${question.difficulty}`, classLevel: question.classLevel, examLevels: question.examLevels, score: 40 });
    }
  });
  allFormulas.forEach((formula) => {
    if (`${formula.title} ${formula.note}`.toLowerCase().includes(normalized)) {
      results.push({ type: "Formula", title: formula.title, description: `Class ${formula.classLevel} · ${formula.chapterTitle}`, path: "/formulas", classLevel: formula.classLevel, examLevels: formula.examLevels, score: 25 });
    }
  });

  return results
    .filter((result) => {
      if (viewAll || !preferences.goal) return true;
      if (preferences.goal === "school" && preferences.classLevel) return result.classLevel === preferences.classLevel;
      if (preferences.goal === "jee" && preferences.exam) return result.examLevels?.includes(preferences.exam) ?? false;
      return true;
    })
    .map((result) => {
      const schoolBoost = preferences.goal === "school" && preferences.classLevel === result.classLevel ? 100 : 0;
      const jeeBoost = preferences.goal === "jee" && preferences.exam && result.examLevels?.includes(preferences.exam) ? 100 : 0;
      return { ...result, score: result.score + schoolBoost + jeeBoost };
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const { preferences } = useLearningPreferences();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [viewAll, setViewAll] = useState(false);
  const searchQuery = params.get("q") ?? "";
  const results = useMemo(() => buildResults(searchQuery, preferences, viewAll), [preferences, searchQuery, viewAll]);
  const groupedResults = useMemo(() => {
    const groups: Result["type"][] = ["Chapter", "Topic", "Note", "Question", "Formula", "Branch"];
    return groups.map((type) => ({ type, items: results.filter((result) => result.type === type) })).filter((group) => group.items.length);
  }, [results]);
  const contextLabel = preferences.goal === "jee"
    ? `${formatExam(preferences.exam)} · ${preferences.learningLevel} explanations`
    : preferences.goal === "school" && preferences.classLevel
      ? `Class ${preferences.classLevel} · ${preferences.learningLevel} explanations`
      : "All courses";

  useEffect(() => {
    updateMathSeo({ title: "Search", description: "Search adaptive School and IIT JEE Mathematics concepts, questions, chapters and formulas.", path: "/search" });
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setParams(query.trim() ? { q: query.trim() } : {});
  };

  return (
    <section className="py-6 sm:py-8">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
        <div className="max-w-3xl">
          <p className="section-kicker">Search</p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal text-ink-950 dark:text-white">Find a concept quickly.</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">Results prioritize your selected course while keeping the shared mathematics hierarchy visible.</p>
        </div>
        <form className="mt-8 flex max-w-2xl flex-col gap-2 sm:flex-row" onSubmit={submit} role="search">
          <label className="sr-only" htmlFor="search-input">Search mathematics content</label>
          <input id="search-input" className="focus-ring min-h-12 min-w-0 flex-1 rounded-md border border-ink-200 bg-white px-4 dark:border-white/10 dark:bg-white/[0.04]" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="irrational numbers, polynomial, triangle congruence, probability" />
          <button className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" type="submit"><Search size={17} aria-hidden="true" /> Search</button>
        </form>

        <div className="mt-5 flex flex-col gap-3 rounded-lg border border-ink-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm"><span className="font-semibold">Search context:</span> <span className="capitalize">{contextLabel}</span></p>
          <button className={`focus-ring inline-flex min-h-10 w-fit items-center gap-2 rounded-md border px-3 text-sm font-semibold ${viewAll ? "border-signal-500 bg-signal-500/10 text-signal-800 dark:text-signal-300" : "border-ink-200 dark:border-white/10"}`} type="button" aria-pressed={viewAll} onClick={() => setViewAll((value) => !value)}>
            <SlidersHorizontal size={16} aria-hidden="true" /> {viewAll ? "Using all levels" : "View all levels"}
          </button>
        </div>

        <div className="mt-8 grid gap-6">
          {groupedResults.map((group) => (
            <section key={group.type} aria-labelledby={`search-${group.type}`}>
              <h2 id={`search-${group.type}`} className="text-xs font-bold uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400">{group.type}</h2>
              <div className="mt-3 grid gap-3">
                {group.items.map((result) => (
                  <Link key={`${result.type}-${result.title}-${result.path}`} className="rounded-xl border border-ink-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-signal-500 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.035]" to={result.path}>
                    <h3 className="text-lg font-bold">{result.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ink-600 dark:text-ink-300">{result.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
        {searchQuery && !results.length ? (
          <div className="mt-8 rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-sm text-ink-600 dark:text-ink-300">No results in the current context.</p>
            {!viewAll ? <button className="focus-ring mt-4 min-h-10 rounded-md border border-ink-200 px-3 text-sm font-semibold hover:border-signal-500 dark:border-white/10" type="button" onClick={() => setViewAll(true)}>View all levels</button> : null}
          </div>
        ) : null}
        </div>
      </div>
    </section>
  );
}
