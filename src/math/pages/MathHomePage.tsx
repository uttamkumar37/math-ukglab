import { ArrowRight, BookOpen, Brain, Calculator, FunctionSquare, Search, Sigma } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { mathClasses } from "../content";
import { mathSite } from "../mathConfig";
import { updateMathSeo } from "../mathSeo";

const brandImage = `${import.meta.env.BASE_URL}brand/math-ukg-lab.png`;

export function MathHomePage() {
  useEffect(() => updateMathSeo({ path: "/", description: mathSite.description }), []);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-200 bg-ink-50 dark:border-white/10 dark:bg-ink-950">
        <div className="subtle-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
        <div className="section-shell relative grid min-h-[calc(100svh-4rem)] items-center gap-12 py-12 lg:grid-cols-[1fr_.86fr] lg:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-md border border-ink-200 bg-white px-3 py-2 shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
              <img className="h-10 w-10 rounded-md object-cover" src={brandImage} alt="" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal-700 dark:text-signal-400">
                Math by UKG Lab · CBSE Classes 9-12
              </p>
            </div>
            <h1 className="mt-7 text-5xl font-semibold tracking-normal text-ink-950 dark:text-white sm:text-6xl lg:text-7xl">
              Understand Math.
              <span className="block">Don't Memorize It.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-700 dark:text-ink-200">
              Master CBSE Mathematics through proof-level clarity, visual reasoning, worked examples and structured practice for Classes 9-12.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-md bg-ink-950 px-5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ink-800 dark:bg-white dark:text-ink-950 dark:hover:bg-ink-100" to="/class-10/real-numbers/euclidean-division-lemma">
                Start Learning <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="focus-ring inline-flex min-h-12 items-center rounded-md border border-ink-200 bg-white px-5 text-sm font-semibold text-ink-900 transition hover:-translate-y-0.5 hover:border-signal-500 hover:text-signal-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-signal-400" href="#classes">
                Explore Classes
              </a>
            </div>
            <div className="mt-7 grid max-w-xl gap-2 sm:grid-cols-3">
              {[
                { label: "Concepts", value: "Visual-first" },
                { label: "Practice", value: "Step guided" },
                { label: "Level", value: "Advanced" },
              ].map((item) => (
                <div key={item.label} className="rounded-md border border-ink-200 bg-white/75 px-3 py-3 dark:border-white/10 dark:bg-white/[0.04]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-ink-950 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="absolute -inset-3 rounded-xl border border-signal-200/70 bg-white/55 shadow-lift dark:border-signal-400/20 dark:bg-white/[0.03]" />
            <div className="relative rounded-xl border border-ink-200 bg-white p-3 shadow-soft dark:border-white/10 dark:bg-white">
              <img className="aspect-square w-full rounded-lg object-cover" src={brandImage} alt="Math by UKG Lab brand: Understand Math. Don't Memorize It. CBSE Classes 9-12" />
            </div>
            <div className="absolute -bottom-5 left-6 right-6 grid grid-cols-3 overflow-hidden rounded-md border border-ink-200 bg-ink-950 text-white shadow-lift dark:border-white/10">
              {[
                { icon: FunctionSquare, text: "Algebra" },
                { icon: Calculator, text: "Proofs" },
                { icon: Sigma, text: "Practice" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex min-h-14 items-center justify-center gap-2 border-r border-white/10 px-2 text-xs font-semibold last:border-r-0 sm:text-sm">
                  <Icon size={16} className="text-signal-300" aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="classes" className="py-20 sm:py-24">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="section-kicker">Classes</p>
            <h2 className="section-title">Choose Your Class</h2>
            <p className="section-copy">Start with the CBSE Mathematics class you are studying now. The platform is intentionally focused on Classes 9, 10, 11 and 12.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {mathClasses.map((mathClass) => (
              <Link key={mathClass.slug} className="surface-card group rounded-xl p-6 transition hover:-translate-y-1 hover:border-signal-500 hover:shadow-lift" to={`/${mathClass.slug}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-ink-950 text-lg font-bold text-white dark:bg-white dark:text-ink-950">{mathClass.level}</span>
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
        <div className="section-shell grid gap-6 md:grid-cols-3">
          {[
            { icon: Brain, title: "Concept-first lessons", copy: "Study explanations, visuals, examples, mistakes and reasoning in one focused flow." },
            { icon: BookOpen, title: "Practice architecture", copy: "Questions support difficulty, hints, reminders and step-by-step solutions." },
            { icon: Search, title: "Fast discovery", copy: "Search is ready for concepts, lessons, chapters, questions and formulas." },
          ].map(({ icon: Icon, title, copy }) => (
            <article key={title} className="rounded-xl border border-ink-200 bg-ink-50 p-6 dark:border-white/10 dark:bg-ink-950/70">
              <Icon className="text-signal-600 dark:text-signal-400" size={24} aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="section-shell">
          <div className="rounded-xl border border-ink-200 bg-ink-950 p-6 text-white shadow-lift dark:border-white/10 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-signal-300">Learning flow</p>
                <h2 className="mt-3 text-3xl font-semibold">Students always know what comes next.</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {["Class", "Chapter", "Concept", "Example", "Try It", "Practice", "Test", "Revision"].map((step) => (
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
