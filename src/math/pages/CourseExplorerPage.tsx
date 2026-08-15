import { ArrowRight, BookOpen, GraduationCap, Target } from "lucide-react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LearningLevelControl } from "../components/LearningLevelControl";
import { mathClasses } from "../content";
import { useLearningPreferences } from "../learningContext";
import { jeeExamOptions, learningLevelOptions } from "../learningPreferences";
import { updateMathSeo } from "../mathSeo";
import type { StudentGoal } from "../types";

const goalOptions: Array<{
  value: StudentGoal;
  title: string;
  description: string;
  detail: string;
  icon: typeof BookOpen;
}> = [
  {
    value: "school",
    title: "School Mathematics",
    description: "CBSE Classes 9, 10, 11 and 12",
    detail: "Build foundations, prepare for boards and strengthen every chapter step by step.",
    icon: BookOpen,
  },
  {
    value: "jee",
    title: "IIT JEE Mathematics",
    description: "JEE Main and JEE Advanced",
    detail: "Use shared concepts at exam depth with stronger reasoning and harder practice.",
    icon: Target,
  },
];

export function CourseExplorerPage() {
  const [params, setParams] = useSearchParams();
  const { preferences, selectGoal, selectClass, selectExam, setLearningLevel } = useLearningPreferences();
  const requestedGoal = params.get("goal");
  const activeGoal: StudentGoal = requestedGoal === "jee" || requestedGoal === "school" ? requestedGoal : preferences.goal ?? "school";

  useEffect(() => {
    updateMathSeo({
      title: "Course Explorer",
      description: "Choose School or JEE Mathematics, your course and your preferred explanation level.",
      path: "/explore",
    });
  }, []);

  const chooseGoal = (goal: StudentGoal) => {
    selectGoal(goal);
    setParams({ goal }, { replace: true });
  };

  return (
    <section className="py-10 sm:py-16">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="section-kicker">Course Explorer</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white sm:text-5xl">Build your learning path.</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">Choose what you are preparing for and how deeply you want each concept explained. Question difficulty remains a separate choice inside Practice.</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold">1. Your goal</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {goalOptions.map((option) => {
                  const Icon = option.icon;
                  const selected = option.value === activeGoal;
                  return (
                    <button
                      key={option.value}
                      className={`focus-ring rounded-lg border p-5 text-left transition ${selected ? "border-signal-500 bg-signal-500/10" : "border-ink-200 bg-white hover:border-signal-500 dark:border-white/10 dark:bg-white/[0.035]"}`}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => chooseGoal(option.value)}
                    >
                      <Icon className={selected ? "text-signal-700 dark:text-signal-300" : "text-ink-500 dark:text-ink-300"} size={22} aria-hidden="true" />
                      <span className="mt-4 block text-lg font-semibold">{option.title}</span>
                      <span className="mt-1 block text-sm font-semibold text-signal-700 dark:text-signal-400">{option.description}</span>
                      <span className="mt-3 block text-sm leading-6 text-ink-600 dark:text-ink-300">{option.detail}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">2. Your explanation depth</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">You can switch this instantly on every concept page.</p>
              <div className="mt-4">
                <LearningLevelControl value={preferences.learningLevel} onChange={setLearningLevel} label="Choose learning level" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold">3. Choose your course</h2>
              {activeGoal === "school" ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {mathClasses.map((mathClass) => (
                    <Link
                      key={mathClass.slug}
                      className="focus-ring group rounded-lg border border-ink-200 bg-white p-5 transition hover:border-signal-500 dark:border-white/10 dark:bg-white/[0.035]"
                      to={`/${mathClass.slug}`}
                      onClick={() => selectClass(mathClass.level)}
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-xl font-semibold">Class {mathClass.level}</span>
                        <ArrowRight className="text-ink-400 transition group-hover:translate-x-1 group-hover:text-signal-600" size={18} aria-hidden="true" />
                      </span>
                      <span className="mt-2 block text-sm font-semibold text-signal-700 dark:text-signal-400">{mathClass.promise}</span>
                      <span className="mt-3 block text-sm leading-6 text-ink-600 dark:text-ink-300">{mathClass.description}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {jeeExamOptions.map((exam) => (
                    <Link
                      key={exam.value}
                      className="focus-ring group rounded-lg border border-ink-200 bg-white p-5 transition hover:border-signal-500 dark:border-white/10 dark:bg-white/[0.035]"
                      to={`/jee/${exam.value}`}
                      onClick={() => selectExam(exam.value)}
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-xl font-semibold">{exam.label}</span>
                        <ArrowRight className="text-ink-400 transition group-hover:translate-x-1 group-hover:text-signal-600" size={18} aria-hidden="true" />
                      </span>
                      <span className="mt-3 block text-sm leading-6 text-ink-600 dark:text-ink-300">{exam.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="h-fit rounded-lg border border-ink-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.035] lg:sticky lg:top-24">
            <GraduationCap className="text-signal-600 dark:text-signal-400" size={26} aria-hidden="true" />
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">Your path</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-md border border-ink-200 p-3 dark:border-white/10">
                <p className="text-xs font-semibold text-ink-500 dark:text-ink-400">Goal</p>
                <p className="mt-1 font-semibold">{activeGoal === "school" ? "School Mathematics" : "IIT JEE Mathematics"}</p>
              </div>
              <div className="rounded-md border border-ink-200 p-3 dark:border-white/10">
                <p className="text-xs font-semibold text-ink-500 dark:text-ink-400">Learning level</p>
                <p className="mt-1 font-semibold capitalize">{preferences.learningLevel}</p>
                <p className="mt-1 text-xs leading-5 text-ink-600 dark:text-ink-300">{learningLevelOptions.find((item) => item.value === preferences.learningLevel)?.description}</p>
              </div>
              <div className="rounded-md border border-ink-200 p-3 dark:border-white/10">
                <p className="text-xs font-semibold text-ink-500 dark:text-ink-400">Next</p>
                <p className="mt-1 text-sm leading-6">Choose a class or exam, then explore only the branches attached to that course.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
