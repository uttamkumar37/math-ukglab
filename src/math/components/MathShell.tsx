import { BookOpen, ExternalLink, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { mathClasses } from "../content";
import { mathNav, mathSite } from "../mathConfig";

function navClass({ isActive }: { isActive: boolean }) {
  return `focus-ring rounded-md px-3 py-2 text-sm font-semibold transition ${
    isActive ? "bg-ink-950 text-white dark:bg-white dark:text-ink-950" : "text-ink-600 hover:bg-ink-100 hover:text-ink-950 dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-white"
  }`;
}

export function MathShell() {
  const [open, setOpen] = useState(false);
  const { hash, pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    if (hash) {
      window.requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [hash, pathname]);

  return (
    <div className="min-h-screen bg-ink-50 text-ink-950 antialiased dark:bg-ink-950 dark:text-white">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-ink-200/80 bg-ink-50/92 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/90">
        <div className="section-shell flex min-h-16 items-center justify-between gap-4">
          <Link className="focus-ring inline-flex items-center gap-3 rounded-md" to="/" aria-label="Math by UKG Lab home">
            <img className="h-10 w-10 rounded-md border border-ink-200 bg-white object-cover shadow-soft dark:border-white/10" src="/brand/math-ukg-lab.png" alt="" />
            <span className="leading-none">
              <span className="block text-base font-bold">{mathSite.productName}</span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">by UKG Lab</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {mathNav.map((item) =>
              item.href.includes("#") ? (
                <a key={item.label} className="focus-ring rounded-md px-3 py-2 text-sm font-semibold text-ink-600 transition hover:bg-ink-100 hover:text-ink-950 dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-white" href={item.href}>
                  {item.label}
                </a>
              ) : (
                <NavLink key={item.label} to={item.href} className={navClass}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link className="focus-ring grid h-10 w-10 place-items-center rounded-md text-ink-600 transition hover:bg-ink-100 hover:text-ink-950 dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-white" to="/search" aria-label="Search" title="Search">
              <Search size={19} aria-hidden="true" />
            </Link>
            <ThemeSwitcher />
            <a className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md border border-ink-200 bg-white px-3 text-sm font-semibold text-ink-800 transition hover:border-signal-500 hover:text-signal-700 dark:border-white/10 dark:bg-white/5 dark:text-ink-100 dark:hover:text-signal-400" href={mathSite.parentUrl} target="_blank" rel="noreferrer">
              UKG Lab <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>

          <button className="focus-ring rounded p-2 text-ink-800 dark:text-white lg:hidden" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {open ? (
          <div id="mobile-navigation" className="border-t border-ink-200 bg-white px-4 py-4 shadow-lift dark:border-white/10 dark:bg-ink-950 lg:hidden">
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {[...mathNav, { label: "Search", href: "/search" }].map((item) =>
                item.href.includes("#") ? (
                  <a key={item.label} className="focus-ring rounded-md px-3 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/10" href={item.href}>{item.label}</a>
                ) : (
                  <Link key={item.label} className="focus-ring rounded-md px-3 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/10" to={item.href}>{item.label}</Link>
                ),
              )}
            </nav>
            <div className="mt-4 flex items-center justify-between gap-3">
              <ThemeSwitcher />
              <a className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md border border-ink-200 px-3 text-sm font-semibold dark:border-white/10" href={mathSite.parentUrl} target="_blank" rel="noreferrer">
                UKG Lab <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="border-t border-ink-200 bg-white dark:border-white/10 dark:bg-ink-950">
        <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-3">
              <img className="h-10 w-10 rounded-md border border-ink-200 bg-white object-cover shadow-soft dark:border-white/10" src="/brand/math-ukg-lab.png" alt="" />
              <div>
                <p className="font-semibold">{mathSite.name}</p>
                <p className="text-sm text-ink-500 dark:text-ink-400">CBSE Mathematics for Classes 9-12</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-ink-600 dark:text-ink-300">A UKG Lab Learning Product built for clear concepts, worked examples, practice and step-by-step problem solving.</p>
          </div>
          <div>
            <p className="font-semibold">Classes</p>
            <div className="mt-4 grid gap-2">
              {mathClasses.map((item) => (
                <Link key={item.slug} className="link-underline w-fit text-sm text-ink-600 hover:text-signal-700 dark:text-ink-300 dark:hover:text-signal-400" to={`/${item.slug}`}>
                  Class {item.level}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold">Product</p>
            <div className="mt-4 grid gap-2">
              <Link className="link-underline w-fit text-sm text-ink-600 hover:text-signal-700 dark:text-ink-300 dark:hover:text-signal-400" to="/about">About</Link>
              <Link className="link-underline w-fit text-sm text-ink-600 hover:text-signal-700 dark:text-ink-300 dark:hover:text-signal-400" to="/formulas">Formulas</Link>
              <Link className="link-underline w-fit text-sm text-ink-600 hover:text-signal-700 dark:text-ink-300 dark:hover:text-signal-400" to="/bookmarks">Bookmarks</Link>
              <a className="link-underline inline-flex w-fit items-center gap-1 text-sm text-ink-600 hover:text-signal-700 dark:text-ink-300 dark:hover:text-signal-400" href={mathSite.parentUrl} target="_blank" rel="noreferrer">
                UKG Lab <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-ink-200 py-5 text-center text-sm text-ink-500 dark:border-white/10 dark:text-ink-400">
          <span className="inline-flex items-center gap-2"><BookOpen size={16} aria-hidden="true" /> A UKG Lab Learning Product · ukglab.com</span>
        </div>
      </footer>
    </div>
  );
}
