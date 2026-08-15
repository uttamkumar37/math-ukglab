import { ArrowRight, BookOpen, Brain, Calculator, FunctionSquare, Search, Sigma, Target } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { mathClasses } from "../content";
import { useLearningPreferences } from "../learningContext";
import { updateMathSeo } from "../mathSeo";

const brandImage = `${import.meta.env.BASE_URL}brand/math-ukg-lab.png`;

export function MathHomePage() {
  const { preferences, selectGoal, selectClass } = useLearningPreferences();

  useEffect(() => updateMathSeo({
    path: "/",
    description: "Adaptive School and IIT JEE Mathematics with student-controlled explanation depth and question difficulty.",
  }), []);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-200 bg-ink-50 dark:border-white/10 dark:bg-ink-950">
        <div className="subtle-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
        <div className="section-shell relative grid gap-10 py-8 lg:min-h-[calc(100svh-13rem)] lg:grid-cols-[1.08fr_.72fr] lg:items-center lg:py-12">
          <div className="min-w-0 max-w-3xl">
            <div className="flex w-fit max-w-full items-center gap-3 rounded-md border border-ink-200 bg-white px-3 py-2 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
              <img className="h-10 w-10 shrink-0 rounded-md object-cover" src={brandImage} alt="" />
              <p className="min-w-0 text-[11px] font-bold uppercase leading-5 tracking-[0.14em] text-signal-700 dark:text-signal-400 sm:text-xs">Understand Math. Don't Memorize It.</p>
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white sm:text-5xl lg:text-6xl">Math by UKG Lab</h1>
            <h2 className="mt-4 text-2xl font-semibold tracking-normal text-ink-800 dark:text-ink-100 sm:text-3xl">What are you preparing for?</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-700 dark:text-ink-200 sm:text-lg">Choose a path first. The same core concepts can then adapt from simple foundations to board, JEE Main and JEE Advanced depth.</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link className="focus-ring group min-w-0 rounded-lg border border-ink-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-signal-500 dark:border-white/10 dark:bg-white/[0.04]" to="/explore?goal=school" onClick={() => selectGoal("school")}>
                <BookOpen className="text-signal-600 dark:text-signal-400" size={23} aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold">School Mathematics</h3>
                <p className="mt-1 text-sm font-semibold text-signal-700 dark:text-signal-400">Classes 9, 10, 11 and 12</p>
                <p className="mt-3 hidden text-sm leading-6 text-ink-600 dark:text-ink-300 sm:block">Clear foundations, CBSE preparation and structured chapter learning.</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-950 group-hover:text-signal-700 dark:text-white dark:group-hover:text-signal-400">Start School Math <ArrowRight className="transition group-hover:translate-x-1" size={17} aria-hidden="true" /></span>
              </Link>

              <Link className="focus-ring group min-w-0 rounded-lg border border-ink-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-signal-500 dark:border-white/10 dark:bg-white/[0.04]" to="/explore?goal=jee" onClick={() => selectGoal("jee")}>
                <Target className="text-flame-500" size={23} aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold">IIT JEE Mathematics</h3>
                <p className="mt-1 text-sm font-semibold text-flame-500">JEE Main and JEE Advanced</p>
                <p className="mt-3 hidden text-sm leading-6 text-ink-600 dark:text-ink-300 sm:block">Exam-focused application, deeper reasoning and harder problems.</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-950 group-hover:text-flame-500 dark:text-white">Start JEE Math <ArrowRight className="transition group-hover:translate-x-1" size={17} aria-hidden="true" /></span>
              </Link>
            </div>

            <div className="mt-5 hidden gap-2 sm:grid sm:grid-cols-3">
              {[
                { label: "Goal", value: preferences.goal === "jee" ? "JEE" : preferences.goal === "school" ? "School" : "Your choice" },
                { label: "Explanation", value: `${preferences.learningLevel[0].toUpperCase()}${preferences.learningLevel.slice(1)}` },
                { label: "Questions", value: "Choose separately" },
              ].map((item) => (
                <div key={item.label} className="rounded-md border border-ink-200 bg-white/75 px-3 py-3 dark:border-white/10 dark:bg-white/[0.04]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-ink-950 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[430px] lg:block">
            <div className="absolute -inset-3 rounded-lg border border-signal-200/70 bg-white/55 shadow-lift dark:border-signal-400/20 dark:bg-white/[0.03]" />
            <div className="relative rounded-lg border border-ink-200 bg-white p-3 shadow-soft dark:border-white/10">
              <img className="aspect-square w-full rounded-md object-cover" src={brandImage} alt="Math by UKG Lab: Understand Math. Don't Memorize It." />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 grid grid-cols-3 overflow-hidden rounded-md border border-ink-200 bg-ink-950 text-white shadow-lift dark:border-white/10">
              {[
                { icon: FunctionSquare, text: "Learn" },
                { icon: Calculator, text: "Practice" },
                { icon: Sigma, text: "Master" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex min-h-12 items-center justify-center gap-2 border-r border-white/10 px-2 text-xs font-semibold last:border-r-0 sm:text-sm">
                  <Icon size={16} className="text-signal-300" aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="classes" className="py-16 sm:py-20">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="section-kicker">School path</p>
            <h2 className="section-title">Choose Your Class</h2>
            <p className="section-copy">Follow Class → Branch → Chapter → Topic, while keeping your preferred explanation depth available on every concept.</p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {mathClasses.map((mathClass) => (
              <Link key={mathClass.slug} className="surface-card group rounded-lg p-6 transition hover:-translate-y-1 hover:border-signal-500 hover:shadow-lift" to={`/${mathClass.slug}`} onClick={() => selectClass(mathClass.level)}>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-md bg-ink-950 text-lg font-bold text-white dark:bg-white dark:text-ink-950">{mathClass.level}</span>
                  <ArrowRight className="text-ink-400 transition group-hover:translate-x-1 group-hover:text-signal-600" size={20} aria-hidden="true" />
                </div>
                <h3 className="mt-7 text-2xl font-semibold text-ink-950 dark:text-white">Class {mathClass.level}</h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-signal-700 dark:text-signal-400">{mathClass.promise}</p>
                <p className="mt-4 min-h-24 text-sm leading-6 text-ink-600 dark:text-ink-300">{mathClass.description}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-ink-900 dark:text-white">Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink-200 bg-white py-16 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="section-kicker">One topic, three depths</p>
            <h2 className="section-title">The explanation adapts to the student.</h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              { label: "Simple", title: "Build confidence", copy: "Short explanations, familiar examples, slower steps and more descriptive hints." },
              { label: "Medium", title: "Progress efficiently", copy: "Standard terminology, balanced depth, derivations where useful and regular practice." },
              { label: "Hard", title: "Reason more deeply", copy: "Derivations, non-obvious structure, alternate methods and multi-concept challenges." },
            ].map((item) => (
              <article key={item.label} className="rounded-lg border border-ink-200 bg-ink-50 p-6 dark:border-white/10 dark:bg-ink-950/70">
                <Brain className="text-signal-600 dark:text-signal-400" size={23} aria-hidden="true" />
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-signal-700 dark:text-signal-400">{item.label}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-shell grid gap-6 md:grid-cols-3">
          {[
            { icon: Brain, title: "Concept-first learning", copy: "Learn what a concept is, why it matters, how it works and where it is used." },
            { icon: BookOpen, title: "Progressive practice", copy: "Try first, then reveal hints, approach, steps and the final answer in order." },
            { icon: Search, title: "Context-aware search", copy: "Results prioritize the class or JEE course you selected, with all levels still available." },
          ].map(({ icon: Icon, title, copy }) => (
            <article key={title} className="rounded-lg border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.035]">
              <Icon className="text-signal-600 dark:text-signal-400" size={24} aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="section-shell">
          <div className="rounded-lg border border-ink-200 bg-ink-950 p-6 text-white shadow-lift dark:border-white/10 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-signal-300">Adaptive learning flow</p>
                <h2 className="mt-3 text-3xl font-semibold">Control the depth without losing your place.</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {["Goal", "Course", "Level", "Branch", "Topic", "Concept", "Practice", "Mastery"].map((step) => (
                  <span key={step} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 py-3 text-sm font-semibold">
                    <Sigma size={16} className="text-signal-300" aria-hidden="true" /> {step}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
