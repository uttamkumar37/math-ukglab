import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { env } from "node:process";

const root = path.resolve("dist");
const origin = "https://math.ukglab.com";
const basePath = env.VITE_BASE_PATH ?? "/";

const routeMetadata = {
  "/class-9": {
    title: "CBSE Class 9 Maths | Math by UKG Lab",
    description: "Learn CBSE Class 9 Mathematics through concepts, examples, practice and chapter structure.",
  },
  "/class-10": {
    title: "CBSE Class 10 Maths | Math by UKG Lab",
    description: "Learn CBSE Class 10 Mathematics through concepts, examples, practice and chapter tests.",
  },
  "/class-11": {
    title: "CBSE Class 11 Maths | Math by UKG Lab",
    description: "Learn CBSE Class 11 Mathematics with structured chapters, concepts, formulas and practice.",
  },
  "/class-12": {
    title: "CBSE Class 12 Maths | Math by UKG Lab",
    description: "Learn CBSE Class 12 Mathematics with focused concepts, practice, tests and revision architecture.",
  },
  "/class-10/real-numbers": {
    title: "Real Numbers - CBSE Class 10 Maths | UKG Lab",
    description: "Study Real Numbers for CBSE Class 10 with Euclidean division, practice and revision architecture.",
  },
  "/class-10/number-systems": {
    title: "Number Systems - CBSE Class 10 Maths | UKG Lab",
    description: "Study Class 10 number systems, real numbers and divisibility through the Math by UKG Lab hierarchy.",
  },
  "/class-10/number-systems/real-numbers": {
    title: "Real Numbers - CBSE Class 10 Maths | UKG Lab",
    description: "Study Real Numbers through topics, concepts, practice hints and step-by-step solutions.",
  },
  "/class-10/real-numbers/euclidean-division-lemma": {
    title: "Euclidean Division Lemma - Class 10 Maths | UKG Lab",
    description: "Understand the Euclidean Division Lemma with explanation, worked example, visual and practice flow.",
  },
  "/class-10/number-systems/real-numbers/euclidean-division-lemma": {
    title: "Euclidean Division Lemma - Class 10 Maths | UKG Lab",
    description: "Understand the Euclidean Division Lemma with explanation, worked example, visual and practice flow.",
  },
  "/class-10/real-numbers/practice": {
    title: "Real Numbers Practice - Class 10 Maths | UKG Lab",
    description: "Practice Real Numbers questions with progressive hints and step-by-step solutions.",
  },
  "/class-10/real-numbers/test": {
    title: "Real Numbers Chapter Test - Class 10 Maths | UKG Lab",
    description: "Chapter test architecture for Class 10 Real Numbers.",
  },
  "/class-10/quadratic-equations": {
    title: "Quadratic Equations - CBSE Class 10 Maths | UKG Lab",
    description: "Study Class 10 Quadratic Equations with lessons, formulas and chapter structure.",
  },
  "/class-10/algebra": {
    title: "Algebra - CBSE Class 10 Maths | UKG Lab",
    description: "Study Class 10 Algebra through official chapters mapped into a clear learning hierarchy.",
  },
  "/class-10/algebra/quadratic-equations": {
    title: "Quadratic Equations - CBSE Class 10 Maths | UKG Lab",
    description: "Study Class 10 Quadratic Equations with topics, concepts, examples, practice hints and solutions.",
  },
  "/class-10/quadratic-equations/factorising-quadratics": {
    title: "Factorising Quadratic Equations - Class 10 Maths | UKG Lab",
    description: "Learn factorisation of quadratic equations with worked examples and practice-ready structure.",
  },
  "/class-10/algebra/quadratic-equations/quadratic-formula": {
    title: "Quadratic Formula - Class 10 Maths | UKG Lab",
    description: "Understand the quadratic formula through concept-first learning, example, practice, hints, approach and solution.",
  },
  "/class-10/algebra/quadratic-equations/practice": {
    title: "Quadratic Equations Practice - Class 10 Maths | UKG Lab",
    description: "Practice quadratic formula questions with progressive hints, approach and step-by-step solutions.",
  },
  "/formulas": {
    title: "Formula Library | Math by UKG Lab",
    description: "CBSE Mathematics formula library for Classes 9, 10, 11 and 12.",
  },
  "/search": {
    title: "Search | Math by UKG Lab",
    description: "Search CBSE Mathematics concepts, lessons, questions, chapters and formulas.",
  },
  "/bookmarks": {
    title: "Bookmarks | Math by UKG Lab",
    description: "Saved lessons, questions and formulas for Math by UKG Lab.",
  },
  "/dashboard": {
    title: "Student Dashboard | Math by UKG Lab",
    description: "Future-ready student dashboard for Math by UKG Lab.",
  },
  "/about": {
    title: "About | Math by UKG Lab",
    description: "About Math by UKG Lab, a focused CBSE Mathematics learning product for Classes 9-12.",
  },
};

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function applyMetadata(html, route, metadata) {
  const url = `${origin}${route}`;
  const image = `${origin}/og-image.svg`;
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  let result = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  result = result.replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`);
  result = result.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  result = result.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`);
  result = result.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`);
  result = result.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  result = result.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`);
  result = result.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`);
  result = result.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`);
  result = result.replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`);
  return result;
}

for (const [route, metadata] of Object.entries(routeMetadata)) {
  const destination = path.join(root, route, "index.html");
  await mkdir(path.dirname(destination), { recursive: true });
  const html = await readFile(path.join(root, "index.html"), "utf8");
  await cp(path.join(root, "index.html"), destination);
  await writeFile(destination, applyMetadata(html, route, metadata));
}

await writeFile(
  path.join(root, "404.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Math by UKG Lab</title>
    <script>
      sessionStorage.redirect = location.href;
      location.replace(${JSON.stringify(basePath)});
    </script>
  </head>
  <body>
    Redirecting to Math by UKG Lab...
  </body>
</html>
`,
);
