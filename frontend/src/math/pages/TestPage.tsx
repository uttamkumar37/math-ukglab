import { Clock, Flag, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { MathText } from "../components/MathRender";
import { getChapter } from "../content";
import { useLearningPreferences } from "../learningContext";
import { formatExam } from "../learningPreferences";
import { updateMathSeo } from "../mathSeo";
import { recordTestResult } from "../progress";
import { NotFoundPage } from "./NotFoundPage";

function formatElapsed(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function TestPage() {
  const { classSlug, branchSlug, chapterSlug } = useParams();
  const found = getChapter(classSlug, chapterSlug, branchSlug);
  const { preferences } = useLearningPreferences();
  const [started, setStarted] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [review, setReview] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (found) {
      updateMathSeo({
        title: `${found.chapter.title} Chapter Test - Class ${found.mathClass.level} Maths`,
        description: `Take a focused ${found.chapter.title} chapter test with answer states, review flags and result tracking.`,
        path: `/${found.mathClass.slug}/${found.branch.slug}/${found.chapter.slug}/test`,
      });
    }
  }, [found]);

  useEffect(() => {
    if (!started || submitted || !startedAt) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [started, startedAt, submitted]);

  if (!found) return <NotFoundPage />;

  const { mathClass, branch, chapter } = found;
  const questions = chapter.practice;
  const correct = submitted ? questions.filter((question) => answers[question.slug] === (question.finalAnswer ?? question.answer)).length : 0;
  const attempted = Object.keys(answers).length;
  const contextCrumb = preferences.goal === "jee" && preferences.exam
    ? { name: formatExam(preferences.exam), path: `/jee/${preferences.exam}` }
    : { name: `Class ${mathClass.level}`, path: `/${mathClass.slug}` };

  const submitTest = () => {
    if (!window.confirm("Submit this chapter test?")) return;
    const score = questions.filter((question) => answers[question.slug] === (question.finalAnswer ?? question.answer)).length;
    const topicLesson = chapter.lessons[0];
    const topicPath = topicLesson ? `/${mathClass.slug}/${branch.slug}/${chapter.slug}/${topicLesson.slug}` : `/${mathClass.slug}/${branch.slug}/${chapter.slug}`;
    const topicKey = topicLesson ? `${mathClass.slug}/${branch.slug}/${chapter.slug}/${topicLesson.slug}` : `${mathClass.slug}/${branch.slug}/${chapter.slug}`;
    recordTestResult({ topicKey, title: topicLesson?.title ?? chapter.title, path: topicPath, classLevel: mathClass.level, chapter: chapter.title, correct: score, total: questions.length });
    setSubmitted(true);
  };

  return (
    <section className="py-6 sm:py-8">
      <div className="section-shell">
        <Breadcrumbs items={[contextCrumb, { name: branch.name, path: `/${mathClass.slug}/${branch.slug}` }, { name: chapter.title, path: `/${mathClass.slug}/${branch.slug}/${chapter.slug}` }, { name: "Chapter Test", path: `/${mathClass.slug}/${branch.slug}/${chapter.slug}/test` }]} />
        <div className="max-w-3xl">
          <p className="section-kicker">Assessment</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white">{chapter.title} - Chapter Test</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">Answer the questions, mark doubts for review, submit when ready and track the result locally.</p>
        </div>

        {!questions.length ? (
          <div className="mt-10 rounded-xl border border-ink-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-2xl font-semibold">No chapter test is available yet.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600 dark:text-ink-300">No invented questions are shown. A test appears here only when real questions are attached to this chapter.</p>
            <Link className="focus-ring mt-6 inline-flex min-h-11 items-center rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" to={`/${mathClass.slug}/${branch.slug}/${chapter.slug}`}>Back to Chapter</Link>
          </div>
        ) : !started ? (
          <div className="mt-10 rounded-xl border border-ink-200 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
            <div className="grid gap-5 sm:grid-cols-3">
              <div><p className="text-sm text-ink-500 dark:text-ink-400">Questions</p><p className="mt-1 text-2xl font-semibold">{questions.length}</p></div>
              <div><p className="text-sm text-ink-500 dark:text-ink-400">Difficulty mix</p><p className="mt-1 text-2xl font-semibold">Based on data</p></div>
              <div><p className="text-sm text-ink-500 dark:text-ink-400">Timer</p><p className="mt-1 text-2xl font-semibold">Starts on begin</p></div>
            </div>
            <button className="focus-ring mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" type="button" onClick={() => { setStarted(true); setStartedAt(Date.now()); setElapsedSeconds(0); }}>
              Start Test
            </button>
          </div>
        ) : submitted ? (
          <div className="mt-10 rounded-xl border border-ink-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-3xl font-semibold">Result</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-ink-50 p-4 dark:bg-ink-950/70"><p className="text-sm">Score</p><p className="text-2xl font-semibold">{correct}/{questions.length}</p></div>
              <div className="rounded-lg bg-ink-50 p-4 dark:bg-ink-950/70"><p className="text-sm">Correct</p><p className="text-2xl font-semibold">{correct}</p></div>
              <div className="rounded-lg bg-ink-50 p-4 dark:bg-ink-950/70"><p className="text-sm">Incorrect</p><p className="text-2xl font-semibold">{attempted - correct}</p></div>
              <div className="rounded-lg bg-ink-50 p-4 dark:bg-ink-950/70"><p className="text-sm">Unattempted</p><p className="text-2xl font-semibold">{questions.length - attempted}</p></div>
            </div>
            <p className="mt-6 text-sm leading-6 text-ink-600 dark:text-ink-300">Topic-wise analysis and recommendations will appear when richer test history exists.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_280px]">
            <div className="grid gap-5">
              {questions.map((question, index) => (
                <article key={question.slug} className="surface-card rounded-xl p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-ink-950 px-2.5 py-1 text-xs font-bold text-white dark:bg-white dark:text-ink-950">Q{index + 1}</span>
                    <span className="rounded-md bg-ink-100 px-2.5 py-1 text-xs font-bold text-ink-600 dark:bg-white/10 dark:text-ink-200">{question.difficulty}</span>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold"><MathText text={question.question} /></h2>
                  {question.options ? (
                    <div className="mt-5 grid gap-2">
                      {question.options.map((option) => (
                        <button key={option} className={`focus-ring min-h-11 rounded-md border px-4 py-2 text-left text-sm transition ${answers[question.slug] === option ? "border-signal-500 bg-signal-500/10" : "border-ink-200 hover:border-signal-500 dark:border-white/10"}`} type="button" onClick={() => setAnswers((value) => ({ ...value, [question.slug]: option }))}>
                          <MathText text={option} />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input className="focus-ring mt-5 min-h-11 w-full rounded-md border border-ink-200 bg-white px-3 text-sm dark:border-white/10 dark:bg-white/[0.04]" placeholder="Type your answer" value={answers[question.slug] ?? ""} onChange={(event) => setAnswers((value) => ({ ...value, [question.slug]: event.target.value }))} />
                  )}
                  <button className="focus-ring mt-5 inline-flex min-h-10 items-center gap-2 rounded-md border border-ink-200 px-3 text-sm font-semibold dark:border-white/10" type="button" onClick={() => setReview((value) => ({ ...value, [question.slug]: !value[question.slug] }))}>
                    <Flag size={16} aria-hidden="true" /> {review[question.slug] ? "Marked for Review" : "Mark for Review"}
                  </button>
                </article>
              ))}
            </div>
            <aside className="h-fit rounded-xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04] lg:sticky lg:top-24">
              <p className="flex items-center gap-2 font-semibold"><Clock size={18} className="text-signal-600 dark:text-signal-400" aria-hidden="true" /> Timer Architecture</p>
              <p className="mt-2 text-2xl font-semibold tabular-nums">{formatElapsed(elapsedSeconds)}</p>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {questions.map((question, index) => (
                  <span key={question.slug} className={`grid h-9 place-items-center rounded-md text-sm font-semibold ${answers[question.slug] ? "bg-signal-500/15 text-signal-800 dark:text-signal-300" : review[question.slug] ? "bg-flame-500/15 text-flame-500" : "bg-ink-100 text-ink-600 dark:bg-white/10 dark:text-ink-300"}`}>{index + 1}</span>
                ))}
              </div>
              <button className="focus-ring mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" type="button" onClick={submitTest}>
                Submit Test <Send size={16} aria-hidden="true" />
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
