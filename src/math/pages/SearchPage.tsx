import { Search } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { allChapters, allFormulas, allLessons, allQuestions } from "../content";
import { updateMathSeo } from "../mathSeo";

type Result = {
  type: "Chapter" | "Lesson" | "Question" | "Formula";
  title: string;
  description: string;
  path: string;
};

function buildResults(query: string): Result[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const results: Result[] = [];
  allChapters.forEach((chapter) => {
    if (`${chapter.title} ${chapter.description}`.toLowerCase().includes(normalized)) {
      results.push({ type: "Chapter", title: chapter.title, description: `Class ${chapter.classLevel} · ${chapter.description}`, path: `/class-${chapter.classLevel}/${chapter.slug}` });
    }
  });
  allLessons.forEach((lesson) => {
    if (`${lesson.title} ${lesson.summary}`.toLowerCase().includes(normalized)) {
      results.push({ type: "Lesson", title: lesson.title, description: `Class ${lesson.classLevel} · ${lesson.chapterTitle}`, path: `/class-${lesson.classLevel}/${lesson.chapterSlug}/${lesson.slug}` });
    }
  });
  allQuestions.forEach((question) => {
    if (`${question.question} ${question.topic}`.toLowerCase().includes(normalized)) {
      results.push({ type: "Question", title: question.topic, description: `Class ${question.classLevel} · ${question.difficulty} · ${question.type}`, path: `/class-${question.classLevel}/${question.chapterSlug}/practice` });
    }
  });
  allFormulas.forEach((formula) => {
    if (`${formula.title} ${formula.note}`.toLowerCase().includes(normalized)) {
      results.push({ type: "Formula", title: formula.title, description: `Class ${formula.classLevel} · ${formula.chapterTitle}`, path: "/formulas" });
    }
  });
  return results;
}

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const results = useMemo(() => buildResults(params.get("q") ?? ""), [params]);

  useEffect(() => {
    updateMathSeo({ title: "Search", description: "Search CBSE Mathematics concepts, lessons, questions, chapters and formulas.", path: "/search" });
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setParams(query.trim() ? { q: query.trim() } : {});
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="section-kicker">Search</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white">Find a concept quickly.</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">Search across the current sample dataset. The architecture supports concepts, lessons, questions, chapters and formulas.</p>
        </div>
        <form className="mt-8 flex max-w-2xl gap-2" onSubmit={submit} role="search">
          <label className="sr-only" htmlFor="search-input">Search mathematics content</label>
          <input id="search-input" className="focus-ring min-h-12 min-w-0 flex-1 rounded-md border border-ink-200 bg-white px-4 dark:border-white/10 dark:bg-white/[0.04]" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="quadratic equation, distance formula, integration" />
          <button className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" type="submit">
            <Search size={17} aria-hidden="true" /> Search
          </button>
        </form>
        <div className="mt-10 grid gap-4">
          {results.map((result) => (
            <Link key={`${result.type}-${result.title}-${result.path}`} className="surface-card rounded-xl p-5 transition hover:-translate-y-0.5 hover:border-signal-500" to={result.path}>
              <span className="rounded-md bg-signal-500/10 px-2.5 py-1 text-xs font-bold text-signal-700 dark:text-signal-400">{result.type}</span>
              <h2 className="mt-4 text-xl font-semibold">{result.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">{result.description}</p>
            </Link>
          ))}
        </div>
        {params.get("q") && !results.length ? <p className="mt-8 rounded-xl border border-ink-200 bg-white p-6 text-sm text-ink-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-300">No results yet. More content can be added without redesigning search.</p> : null}
      </div>
    </section>
  );
}
