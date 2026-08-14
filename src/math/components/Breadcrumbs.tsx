import { Link } from "react-router-dom";
import { breadcrumbJsonLd } from "../mathSeo";

type Breadcrumb = {
  name: string;
  path: string;
};

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  const allItems = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto text-sm">
        <ol className="flex min-w-max items-center gap-2 text-ink-500 dark:text-ink-400">
          {allItems.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {index === allItems.length - 1 ? (
                <span className="font-semibold text-ink-800 dark:text-ink-100">{item.name}</span>
              ) : (
                <Link className="link-underline hover:text-signal-700 dark:hover:text-signal-400" to={item.path}>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(allItems)) }} />
    </>
  );
}
