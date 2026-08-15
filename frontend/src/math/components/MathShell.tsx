import {
  Bell,
  BookMarked,
  BookOpen,
  Boxes,
  ChevronRight,
  ClipboardCheck,
  Crown,
  GraduationCap,
  Home,
  Menu,
  NotebookTabs,
  Search,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "../../components/ThemeSwitcher";
import { mathClasses } from "../content";
import { useLearningPreferences } from "../learningContext";
import { formatExam } from "../learningPreferences";
import { mathSite } from "../mathConfig";

const brandImage = `${import.meta.env.BASE_URL}brand/math-ukg-lab.png`;

const primaryNav = [
  { label: "Home", href: "/class-9", icon: Home },
  { label: "My Learning", href: "/class-9#course", icon: BookOpen },
  { label: "Bookmarks", href: "/bookmarks", icon: BookMarked },
  { label: "Notes", href: "/class-9/orienting-yourself-use-of-coordinates/orienting-yourself-use-of-coordinates#notes", icon: NotebookTabs },
  { label: "Progress", href: "/dashboard", icon: TrendingUp },
  { label: "Tests", href: "/class-9/orienting-yourself-use-of-coordinates/orienting-yourself-use-of-coordinates/test", icon: ClipboardCheck },
  { label: "Search", href: "/search", icon: Search },
];

const bottomNav = [
  { label: "Home", href: "/class-9", icon: Home },
  { label: "Learn", href: "/class-9#course", icon: BookOpen },
  { label: "Practice", href: "/class-9/orienting-yourself-use-of-coordinates/orienting-yourself-use-of-coordinates/practice", icon: ClipboardCheck },
  { label: "Progress", href: "/dashboard", icon: TrendingUp },
  { label: "Profile", href: "/explore", icon: UserRound },
];

function isRouteActive(pathname: string, href: string, hash = "") {
  const [hrefPath, hrefHash] = href.split("#");
  const cleanHref = hrefPath.split("?")[0];
  if (hrefHash) return pathname === cleanHref && hash === `#${hrefHash}`;
  if (cleanHref === "/class-9") return pathname === "/" || pathname === "/class-9";
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { hash, pathname } = useLocation();

  return (
    <div className="flex min-h-full flex-col bg-[#061b3d] text-white">
      <Link className="focus-ring mx-4 mt-5 flex items-center gap-3 rounded-lg px-2 py-2" to="/class-9" onClick={onNavigate} aria-label="Math by UKG Lab dashboard">
        <img className="h-11 w-11 rounded-lg border border-white/15 bg-white object-cover shadow-soft" src={brandImage} alt="" />
        <span className="leading-tight">
          <span className="block text-2xl font-bold tracking-normal">{mathSite.productName}</span>
          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/75">by UKG Lab</span>
        </span>
      </Link>

      <nav className="mt-6 grid gap-1 px-3" aria-label="Primary navigation">
        {primaryNav.map(({ label, href, icon: Icon }) => {
          const active = isRouteActive(pathname, href, hash);
          return (
            <Link
              key={label}
              className={`focus-ring flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${active ? "bg-blue-600/80 text-white shadow-soft" : "text-blue-50/82 hover:bg-white/10 hover:text-white"}`}
              to={href}
              onClick={onNavigate}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-7 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-100/55">Courses</div>
      <nav className="mt-3 grid gap-1 px-3" aria-label="Course navigation">
        {mathClasses.map((course) => {
          const active = pathname.startsWith(`/${course.slug}`);
          const label = course.level === 9 ? "Active" : "Soon";
          return (
            <Link
              key={course.slug}
              className={`focus-ring flex min-h-10 items-center justify-between gap-3 rounded-lg px-3 text-sm font-semibold transition ${active ? "bg-white/12 text-white" : "text-blue-50/80 hover:bg-white/8 hover:text-white"}`}
              to={`/${course.slug}`}
              onClick={onNavigate}
            >
              <span className="flex items-center gap-3">
                <Boxes size={17} aria-hidden="true" />
                Class {course.level}
              </span>
              <span className={`text-[10px] uppercase tracking-[0.12em] ${course.level === 9 ? "text-emerald-200" : "text-blue-100/55"}`}>{label}</span>
            </Link>
          );
        })}
        <Link className="focus-ring flex min-h-10 items-center justify-between rounded-lg px-3 text-sm font-semibold text-blue-50/80 transition hover:bg-white/8 hover:text-white" to="/jee/jee-main" onClick={onNavigate}>
          <span className="flex items-center gap-3"><GraduationCap size={17} aria-hidden="true" /> JEE Main</span>
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
        <Link className="focus-ring flex min-h-10 items-center justify-between rounded-lg px-3 text-sm font-semibold text-blue-50/80 transition hover:bg-white/8 hover:text-white" to="/jee/jee-advanced" onClick={onNavigate}>
          <span className="flex items-center gap-3"><GraduationCap size={17} aria-hidden="true" /> JEE Advanced</span>
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
      </nav>

      <div className="mx-4 mb-5 mt-auto rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-4">
        <p className="text-sm font-bold">Class 9 Workspace</p>
        <p className="mt-2 text-xs leading-5 text-blue-50/75">Progress appears only after real lesson, practice or test activity.</p>
        <Link className="focus-ring mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-3 text-sm font-semibold hover:bg-white/10" to="/explore" onClick={onNavigate}>
          <Crown size={16} aria-hidden="true" /> Learning Profile
        </Link>
      </div>
    </div>
  );
}

function TopSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") return;
      if (!inputRef.current || inputRef.current.offsetParent === null) return;
      event.preventDefault();
      inputRef.current.focus();
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  };

  return (
    <form className="mx-auto flex min-h-11 w-full max-w-xl items-center rounded-xl border border-ink-200 bg-white px-3 shadow-soft dark:border-white/10 dark:bg-white/[0.04]" role="search" onSubmit={submit}>
      <Search className="shrink-0 text-ink-400" size={19} aria-hidden="true" />
      <label className="sr-only" htmlFor={inputId}>Search mathematics content</label>
      <input
        id={inputId}
        ref={inputRef}
        className="min-h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink-900 outline-none placeholder:text-ink-400 dark:text-white"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search topics, chapters, questions..."
      />
      <kbd className="hidden rounded-md bg-ink-100 px-2 py-1 text-xs font-semibold text-ink-500 dark:bg-white/10 dark:text-ink-300 sm:inline">Ctrl K</kbd>
    </form>
  );
}

export function MathShell() {
  const [open, setOpen] = useState(false);
  const { hash, pathname } = useLocation();
  const { preferences } = useLearningPreferences();
  const courseLabel = preferences.goal === "jee"
    ? formatExam(preferences.exam)
    : preferences.goal === "school" && preferences.classLevel
      ? `Class ${preferences.classLevel}`
      : "Class 9";

  useEffect(() => {
    setOpen(false);
    if (hash) {
      window.requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [hash, pathname]);

  return (
    <div className="min-h-screen bg-[#f5f8ff] text-ink-950 antialiased dark:bg-[#08111f] dark:text-white">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-white/10 lg:block">
        <SidebarContent />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button className="absolute inset-0 bg-ink-950/60" type="button" aria-label="Close navigation" onClick={() => setOpen(false)} />
          <div className="relative h-full w-[min(86vw,320px)] shadow-lift">
            <button className="focus-ring absolute right-3 top-3 z-10 rounded-lg p-2 text-white" type="button" aria-label="Close navigation" onClick={() => setOpen(false)}>
              <X size={22} aria-hidden="true" />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-[#f5f8ff]/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#08111f]/90">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6">
            <button className="focus-ring rounded-lg border border-ink-200 bg-white p-2 text-ink-800 shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:text-white lg:hidden" type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Open navigation">
              <Menu size={21} aria-hidden="true" />
            </button>
            <Link className="focus-ring flex items-center gap-2 rounded-lg lg:hidden" to="/class-9" aria-label="Math by UKG Lab home">
              <img className="h-9 w-9 rounded-lg border border-ink-200 bg-white object-cover shadow-soft dark:border-white/10" src={brandImage} alt="" />
              <span className="font-bold">Math</span>
            </Link>
            <div className="hidden min-w-0 flex-1 sm:block">
              <TopSearch />
            </div>
            <Link className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-ink-200 bg-white text-ink-600 shadow-soft transition hover:border-signal-500 hover:text-ink-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-300 dark:hover:text-white sm:hidden" to="/search" aria-label="Search">
              <Search size={19} aria-hidden="true" />
            </Link>
            <div className="hidden sm:block">
              <ThemeSwitcher />
            </div>
            <button className="focus-ring hidden h-10 w-10 place-items-center rounded-lg border border-ink-200 bg-white text-ink-500 shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-300 sm:grid" type="button" aria-label="Notifications. No notifications yet." title="No notifications yet">
              <Bell size={18} aria-hidden="true" />
            </button>
            <Link className="focus-ring hidden min-h-11 items-center gap-3 rounded-xl border border-ink-200 bg-white px-3 shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:flex" to="/explore" aria-label={`Learning profile: ${courseLabel}, ${preferences.learningLevel} explanations`}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-950 text-white dark:bg-white dark:text-ink-950"><UserRound size={17} aria-hidden="true" /></span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold">Uttam</span>
                <span className="block text-xs capitalize text-ink-500 dark:text-ink-300">{courseLabel} · {preferences.learningLevel}</span>
              </span>
            </Link>
          </div>
          <div className="border-t border-ink-200/70 px-4 py-3 dark:border-white/10 sm:hidden">
            <TopSearch />
          </div>
        </header>

        <main id="main-content" className="min-w-0 pb-24 lg:pb-0" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-200 bg-white/95 px-2 py-2 shadow-lift backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/95 lg:hidden" aria-label="Mobile primary navigation">
        <div className="mx-auto grid max-w-[390px] grid-cols-5 gap-1">
          {bottomNav.map(({ label, href, icon: Icon }) => {
            const active = isRouteActive(pathname, href, hash);
            return (
              <NavLink key={label} className={`focus-ring flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-semibold ${active ? "bg-signal-500/12 text-signal-700 dark:text-signal-300" : "text-ink-500 dark:text-ink-300"}`} to={href}>
                <Icon size={18} aria-hidden="true" />
                {label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
