import { mathSite } from "./mathConfig";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

function setMeta(selector: string, value: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = value;
}

export function updateMathSeo({ title, description = mathSite.description, path = "/", image = `${mathSite.url}/og-image.svg` }: SeoInput) {
  const resolvedTitle = title ? `${title} | Math by UKG Lab` : "School & IIT JEE Maths | Math by UKG Lab";
  const url = new URL(path, mathSite.url).toString();

  document.title = resolvedTitle;
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', resolvedTitle);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[property="og:type"]', "website");
  setMeta('meta[property="og:site_name"]', mathSite.name);
  setMeta('meta[property="og:image"]', image);
  setMeta('meta[name="twitter:title"]', resolvedTitle);
  setMeta('meta[name="twitter:description"]', description);
  setMeta('meta[name="twitter:image"]', image);

  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.href = url;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, mathSite.url).toString(),
    })),
  };
}
