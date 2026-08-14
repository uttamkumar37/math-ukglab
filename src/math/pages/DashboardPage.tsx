import { ArrowRight, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateMathSeo } from "../mathSeo";

type RecentLesson = {
  title: string;
  path: string;
  classLevel: number;
  chapter: string;
  updatedAt: string;
};

export function DashboardPage() {
  const [recent, setRecent] = useState<RecentLesson | null>(null);

  useEffect(() => {
    updateMathSeo({ title: "Student Dashboard", description: "Future-ready student dashboard for Math by UKG Lab.", path: "/dashboard" });
    try {
      setRecent(JSON.parse(localStorage.getItem("math-ukglab-recent") ?? "null") as RecentLesson | null);
    } catch {
      setRecent(null);
    }
  }, []);

  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="section-kicker">Dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white">Your Learning Dashboard</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">This initial release uses local browser history only. No fake AI recommendations, weak-topic analytics or cloud progress are shown.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="surface-card rounded-xl p-6">
            <h2 className="text-2xl font-semibold">Continue Learning</h2>
            {recent ? (
              <Link className="mt-5 flex items-center justify-between gap-4 rounded-lg border border-ink-200 p-4 transition hover:border-signal-500 dark:border-white/10" to={recent.path}>
                <span>
                  <span className="block font-semibold">Class {recent.classLevel} - {recent.chapter}</span>
                  <span className="mt-1 block text-sm text-ink-600 dark:text-ink-300">{recent.title}</span>
                </span>
                <ArrowRight className="shrink-0" size={18} aria-hidden="true" />
              </Link>
            ) : (
              <p className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-300">Continue Learning appears after you open a lesson.</p>
            )}
          </section>

          <section className="surface-card rounded-xl p-6">
            <BarChart3 className="text-signal-600 dark:text-signal-400" size={24} aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold">Progress Architecture</h2>
            <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">Future progress, tests, bookmarks, recent practice and recommendations can be connected here when real user data exists.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
