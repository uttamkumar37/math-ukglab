import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateMathSeo } from "../mathSeo";

type BookmarkItem = {
  title: string;
  path: string;
  type: "lesson";
};

export function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    updateMathSeo({ title: "Bookmarks", description: "Saved lessons, questions and formulas for Math by UKG Lab.", path: "/bookmarks" });
    try {
      setBookmarks(JSON.parse(localStorage.getItem("math-ukglab-bookmarks") ?? "[]") as BookmarkItem[]);
    } catch {
      setBookmarks([]);
    }
  }, []);

  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="section-kicker">Bookmarks</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink-950 dark:text-white">Saved Learning Items</h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-200">Bookmarks are stored locally in this browser so you can return to important lessons quickly.</p>
        </div>
        {bookmarks.length ? (
          <div className="mt-10 grid gap-4">
            {bookmarks.map((item) => (
              <Link key={item.path} className="surface-card flex items-center gap-4 rounded-xl p-5 transition hover:border-signal-500" to={item.path}>
                <Bookmark className="text-signal-600 dark:text-signal-400" size={22} aria-hidden="true" />
                <span>
                  <span className="block font-semibold">{item.title}</span>
                  <span className="mt-1 block text-sm text-ink-600 dark:text-ink-300">{item.type}</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-ink-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04]">
            <Bookmark className="text-signal-600 dark:text-signal-400" size={28} aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold">No bookmarks yet.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-600 dark:text-ink-300">Open a lesson and use Bookmark Lesson to save it here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
