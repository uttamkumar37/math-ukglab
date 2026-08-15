import { Link } from "react-router-dom";
import { useEffect } from "react";
import { updateMathSeo } from "../mathSeo";

export function NotFoundPage() {
  useEffect(() => {
    updateMathSeo({ title: "Page Not Found", description: "The requested Math by UKG Lab page was not found.", path: "/404" });
  }, []);

  return (
    <section className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="section-kicker">404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white">This page is not in the lesson plan.</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">The route may be missing, moved, or not part of the current School and IIT JEE course map.</p>
          <Link className="focus-ring mt-8 inline-flex min-h-11 items-center rounded-md bg-ink-950 px-4 text-sm font-semibold text-white dark:bg-white dark:text-ink-950" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
