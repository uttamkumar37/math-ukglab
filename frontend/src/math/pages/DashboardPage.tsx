import { ArrowRight, BarChart3, BookOpenCheck, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LearningLevelControl } from "../components/LearningLevelControl";
import { useLearningPreferences } from "../learningContext";
import { formatExam } from "../learningPreferences";
import { updateMathSeo } from "../mathSeo";
import { readProgress, type TopicProgress } from "../progress";

type RecentLesson = {
  title: string;
  path: string;
  classLevel: number;
  chapter: string;
  updatedAt: string;
};

function readRecent(): RecentLesson | null {
  try {
    return JSON.parse(localStorage.getItem("math-ukglab-recent") ?? "null") as RecentLesson | null;
  } catch {
    return null;
  }
}

function progressStatus(topic: TopicProgress) {
  const reviews = Object.values(topic.solutionReviews).reduce((total, items) => total + items.length, 0);
  if (reviews) return "Practicing";
  if (topic.conceptOpenedAt) return "Learning";
  return "Not Started";
}

export function DashboardPage() {
  const { preferences, setLearningLevel } = useLearningPreferences();
  const [recent] = useState<RecentLesson | null>(() => readRecent());
  const [progress] = useState(() => readProgress());
  const topics = Object.values(progress.topics).sort((a, b) => (b.conceptOpenedAt ?? "").localeCompare(a.conceptOpenedAt ?? ""));
  const goalLabel = preferences.goal === "jee" ? formatExam(preferences.exam) : preferences.goal === "school" ? "School Mathematics" : "Not selected";
  const courseLabel = preferences.goal === "school" && preferences.classLevel ? `Class ${preferences.classLevel}` : preferences.goal === "jee" ? formatExam(preferences.exam) : "Choose a course";

  useEffect(() => {
    updateMathSeo({ title: "Student Dashboard", description: "Local learning preferences and action-based mathematics progress.", path: "/dashboard" });
  }, []);

  return (
    <section className="py-10 sm:py-16">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="section-kicker">Progress</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white">Your Learning Path</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">Preferences and real learning actions are stored in this browser. Changing goal, course or explanation level does not erase valid topic progress.</p>
        </div>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Current learning preferences">
          {[
            { label: "Goal", value: goalLabel },
            { label: "Course", value: courseLabel },
            { label: "Explanation", value: `${preferences.learningLevel[0].toUpperCase()}${preferences.learningLevel.slice(1)}` },
            { label: "Topics started", value: String(topics.length) },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.035]">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">{item.label}</p>
              <p className="mt-2 text-lg font-semibold">{item.value}</p>
            </div>
          ))}
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="surface-card rounded-lg p-6">
              <h2 className="text-2xl font-semibold">Continue Learning</h2>
              {recent ? (
                <Link className="mt-5 flex items-center justify-between gap-4 rounded-md border border-ink-200 p-4 transition hover:border-signal-500 dark:border-white/10" to={recent.path}>
                  <span>
                    <span className="block font-semibold">Class {recent.classLevel} · {recent.chapter}</span>
                    <span className="mt-1 block text-sm text-ink-600 dark:text-ink-300">{recent.title}</span>
                  </span>
                  <ArrowRight className="shrink-0" size={18} aria-hidden="true" />
                </Link>
              ) : <p className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-300">Open a concept to start local progress.</p>}
            </section>

            <section className="surface-card rounded-lg p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-signal-600 dark:text-signal-400" size={24} aria-hidden="true" />
                <h2 className="text-2xl font-semibold">Topic Progress</h2>
              </div>
              {topics.length ? (
                <div className="mt-5 grid gap-4">
                  {topics.map((topic) => {
                    const status = progressStatus(topic);
                    return (
                      <article key={topic.topicKey} className="rounded-md border border-ink-200 p-4 dark:border-white/10">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">Class {topic.classLevel} · {topic.chapter}</p>
                            <h3 className="mt-1 text-lg font-semibold">{topic.title}</h3>
                          </div>
                          <span className="w-fit rounded-md bg-signal-500/10 px-2.5 py-1 text-xs font-bold text-signal-800 dark:text-signal-300">{status}</span>
                        </div>
                        <div className="mt-4 grid gap-2 sm:grid-cols-4">
                          <div className="rounded-md bg-ink-50 p-3 text-sm dark:bg-ink-950/70"><span className="block text-xs text-ink-500 dark:text-ink-400">Concept</span><span className="mt-1 block font-semibold">{topic.conceptOpenedAt ? "Opened" : "Not started"}</span></div>
                          {(["Simple", "Medium", "Hard"] as const).map((level) => (
                            <div key={level} className="rounded-md bg-ink-50 p-3 text-sm dark:bg-ink-950/70"><span className="block text-xs text-ink-500 dark:text-ink-400">{level}</span><span className="mt-1 block font-semibold">{topic.solutionReviews[level].length ? `${topic.solutionReviews[level].length} reviewed` : "Not started"}</span></div>
                          ))}
                        </div>
                        {topic.latestTest ? <p className="mt-3 text-sm font-semibold">Latest topic test: {topic.latestTest.correct}/{topic.latestTest.total}</p> : <p className="mt-3 text-xs text-ink-500 dark:text-ink-400">No test submitted yet.</p>}
                        <Link className="focus-ring mt-4 inline-flex items-center gap-2 rounded text-sm font-semibold text-ink-900 hover:text-signal-700 dark:text-white" to={topic.path}>Continue <ArrowRight size={15} aria-hidden="true" /></Link>
                      </article>
                    );
                  })}
                </div>
              ) : <p className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-300">Progress appears after you open a concept or review a practice solution. No percentages are invented.</p>}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-lg border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.035]">
              <Settings2 className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
              <h2 className="mt-4 text-xl font-semibold">Learning Preferences</h2>
              <div className="mt-5"><LearningLevelControl value={preferences.learningLevel} onChange={setLearningLevel} compact /></div>
              <Link className="focus-ring mt-5 inline-flex min-h-10 items-center gap-2 rounded-md border border-ink-200 px-3 text-sm font-semibold hover:border-signal-500 dark:border-white/10" to="/explore">Change goal or course <ArrowRight size={15} aria-hidden="true" /></Link>
            </section>

            <section className="rounded-lg border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.035]">
              <BookOpenCheck className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
              <h2 className="mt-4 text-xl font-semibold">Mastery Levels</h2>
              <div className="mt-4 grid gap-2">
                {["Not Started", "Learning", "Practicing", "Proficient", "Mastered"].map((status, index) => (
                  <div key={status} className={`flex items-center gap-3 rounded-md border px-3 py-2 text-sm ${index < 3 ? "border-signal-500/20 bg-signal-500/8" : "border-ink-200 text-ink-500 dark:border-white/10 dark:text-ink-400"}`}>
                    <span className={`h-2.5 w-2.5 rounded-full ${index < 3 ? "bg-signal-500" : "border border-ink-400"}`} />
                    <span className="font-semibold">{status}</span>
                    {index > 2 ? <span className="ml-auto text-xs">Needs assessed evidence</span> : null}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-ink-600 dark:text-ink-300">Proficient and Mastered are deliberately not inferred from page visits or solution reveals.</p>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
