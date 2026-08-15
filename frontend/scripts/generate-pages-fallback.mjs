import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { env } from "node:process";

const root = path.resolve("dist");
const origin = "https://math.ukglab.com";
const basePath = env.VITE_BASE_PATH ?? "/";

const routeMetadata = {
  "/explore": {
    title: "Course Explorer | Math by UKG Lab",
    description: "Choose School or IIT JEE Mathematics, your course and your preferred explanation level.",
  },
  "/jee/jee-main": {
    title: "JEE Main Mathematics | Math by UKG Lab",
    description: "Study shared mathematics concepts at JEE Main depth with adaptive explanations and practice.",
  },
  "/jee/jee-advanced": {
    title: "JEE Main + Advanced Mathematics | Math by UKG Lab",
    description: "Study shared mathematics concepts with JEE Advanced reasoning, alternate methods and hard practice.",
  },
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
  "/class-10/real-numbers/real-numbers": {
    title: "Real Numbers - CBSE Class 10 Maths | UKG Lab",
    description: "Study Real Numbers through topics, concepts, practice hints and step-by-step solutions.",
  },
  "/class-10/real-numbers/real-numbers/euclidean-division-lemma": {
    title: "Euclidean Division Lemma - Class 10 Maths | UKG Lab",
    description: "Understand the Euclidean Division Lemma with explanation, worked example, visual and practice flow.",
  },
  "/class-10/real-numbers/real-numbers/practice": {
    title: "Real Numbers Practice - Class 10 Maths | UKG Lab",
    description: "Practice Real Numbers questions with progressive hints and step-by-step solutions.",
  },
  "/class-10/real-numbers/real-numbers/test": {
    title: "Real Numbers Chapter Test - Class 10 Maths | UKG Lab",
    description: "Chapter test architecture for Class 10 Real Numbers.",
  },
  "/class-10/quadratic-equations": {
    title: "Quadratic Equations - CBSE Class 10 Maths | UKG Lab",
    description: "Study Class 10 Quadratic Equations with lessons, formulas and chapter structure.",
  },
  "/class-10/quadratic-equations/quadratic-equations": {
    title: "Quadratic Equations - CBSE Class 10 Maths | UKG Lab",
    description: "Study Class 10 Quadratic Equations with topics, concepts, examples, practice hints and solutions.",
  },
  "/class-10/quadratic-equations/quadratic-equations/quadratic-formula": {
    title: "Quadratic Formula - Class 10 Maths | UKG Lab",
    description: "Understand the quadratic formula through concept-first learning, example, practice, hints, approach and solution.",
  },
  "/class-10/quadratic-equations/quadratic-equations/practice": {
    title: "Quadratic Equations Practice - Class 10 Maths | UKG Lab",
    description: "Practice quadratic formula questions with progressive hints, approach and step-by-step solutions.",
  },
  "/formulas": {
    title: "Formula Library | Math by UKG Lab",
    description: "CBSE Mathematics formula library for Classes 9, 10, 11 and 12.",
  },
  "/search": {
    title: "Search | Math by UKG Lab",
    description: "Search adaptive School and IIT JEE Mathematics concepts, questions, chapters and formulas.",
  },
  "/bookmarks": {
    title: "Bookmarks | Math by UKG Lab",
    description: "Saved lessons, questions and formulas for Math by UKG Lab.",
  },
  "/dashboard": {
    title: "Student Dashboard | Math by UKG Lab",
    description: "View local learning preferences and action-based mathematics progress.",
  },
  "/about": {
    title: "About | Math by UKG Lab",
    description: "About Math by UKG Lab, an adaptive School and IIT JEE Mathematics learning product.",
  },
};

const schoolChapterFallbackRoutes = [
  ["/class-9/orienting-yourself-use-of-coordinates", "Orienting Yourself: The Use of Coordinates - CBSE Class 9 Maths | UKG Lab", "Study the current NCERT Grade 9 Ganita Manjari chapter Orienting Yourself: The Use of Coordinates."],
  ["/class-9/introduction-to-linear-polynomials", "Introduction to Linear Polynomials - CBSE Class 9 Maths | UKG Lab", "Study the current NCERT Grade 9 Ganita Manjari chapter Introduction to Linear Polynomials."],
  ["/class-9/world-of-numbers", "The World of Numbers - CBSE Class 9 Maths | UKG Lab", "Study the current NCERT Grade 9 Ganita Manjari chapter The World of Numbers."],
  ["/class-9/exploring-algebraic-identities", "Exploring Algebraic Identities - CBSE Class 9 Maths | UKG Lab", "Study the current NCERT Grade 9 Ganita Manjari chapter Exploring Algebraic Identities."],
  ["/class-9/im-up-and-down-and-round-and-round", "I’m Up and Down, and Round and Round - CBSE Class 9 Maths | UKG Lab", "Study the current NCERT Grade 9 Ganita Manjari chapter I’m Up and Down, and Round and Round."],
  ["/class-9/measuring-space-perimeter-and-area", "Measuring Space: Perimeter and Area - CBSE Class 9 Maths | UKG Lab", "Study the current NCERT Grade 9 Ganita Manjari chapter Measuring Space: Perimeter and Area."],
  ["/class-9/introduction-to-probability", "The Mathematics of Maybe: Introduction to Probability - CBSE Class 9 Maths | UKG Lab", "Study the current NCERT Grade 9 Ganita Manjari chapter The Mathematics of Maybe: Introduction to Probability."],
  ["/class-9/sequences-and-progressions", "Predicting What Comes Next: Exploring Sequences and Progressions - CBSE Class 9 Maths | UKG Lab", "Study the current NCERT Grade 9 Ganita Manjari chapter Predicting What Comes Next: Exploring Sequences and Progressions."],
  ["/class-10/polynomials", "Polynomials - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Polynomials."],
  ["/class-10/pair-of-linear-equations-in-two-variables", "Pair of Linear Equations in Two Variables - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Pair of Linear Equations in Two Variables."],
  ["/class-10/arithmetic-progressions", "Arithmetic Progressions - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Arithmetic Progressions."],
  ["/class-10/triangles", "Triangles - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Triangles."],
  ["/class-10/coordinate-geometry", "Coordinate Geometry - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Coordinate Geometry."],
  ["/class-10/introduction-to-trigonometry", "Introduction to Trigonometry - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Introduction to Trigonometry."],
  ["/class-10/some-applications-of-trigonometry", "Some Applications of Trigonometry - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Some Applications of Trigonometry."],
  ["/class-10/circles", "Circles - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Circles."],
  ["/class-10/areas-related-to-circles", "Areas Related to Circles - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Areas Related to Circles."],
  ["/class-10/surface-areas-and-volumes", "Surface Areas and Volumes - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Surface Areas and Volumes."],
  ["/class-10/statistics", "Statistics - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Statistics."],
  ["/class-10/probability", "Probability - CBSE Class 10 Maths | UKG Lab", "Study the current NCERT Class 10 Mathematics chapter Probability."],
  ["/class-11/sets", "Sets - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Sets."],
  ["/class-11/relations-and-functions", "Relations and Functions - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Relations and Functions."],
  ["/class-11/trigonometric-functions", "Trigonometric Functions - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Trigonometric Functions."],
  ["/class-11/complex-numbers-and-quadratic-equations", "Complex Numbers and Quadratic Equations - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Complex Numbers and Quadratic Equations."],
  ["/class-11/linear-inequalities", "Linear Inequalities - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Linear Inequalities."],
  ["/class-11/permutations-and-combinations", "Permutations and Combinations - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Permutations and Combinations."],
  ["/class-11/binomial-theorem", "Binomial Theorem - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Binomial Theorem."],
  ["/class-11/sequences-and-series", "Sequences and Series - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Sequences and Series."],
  ["/class-11/straight-lines", "Straight Lines - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Straight Lines."],
  ["/class-11/conic-sections", "Conic Sections - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Conic Sections."],
  ["/class-11/introduction-to-three-dimensional-geometry", "Introduction to Three Dimensional Geometry - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Introduction to Three Dimensional Geometry."],
  ["/class-11/limits-and-derivatives", "Limits and Derivatives - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Limits and Derivatives."],
  ["/class-11/statistics", "Statistics - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Statistics."],
  ["/class-11/probability", "Probability - CBSE Class 11 Maths | UKG Lab", "Study the current NCERT Class 11 Mathematics chapter Probability."],
  ["/class-12/relations-and-functions", "Relations and Functions - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Relations and Functions."],
  ["/class-12/inverse-trigonometric-functions", "Inverse Trigonometric Functions - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Inverse Trigonometric Functions."],
  ["/class-12/matrices", "Matrices - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Matrices."],
  ["/class-12/determinants", "Determinants - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Determinants."],
  ["/class-12/continuity-and-differentiability", "Continuity and Differentiability - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Continuity and Differentiability."],
  ["/class-12/application-of-derivatives", "Application of Derivatives - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Application of Derivatives."],
  ["/class-12/integrals", "Integrals - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Integrals."],
  ["/class-12/application-of-integrals", "Application of Integrals - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Application of Integrals."],
  ["/class-12/differential-equations", "Differential Equations - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Differential Equations."],
  ["/class-12/vector-algebra", "Vector Algebra - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Vector Algebra."],
  ["/class-12/three-dimensional-geometry", "Three Dimensional Geometry - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Three Dimensional Geometry."],
  ["/class-12/linear-programming", "Linear Programming - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Linear Programming."],
  ["/class-12/probability", "Probability - CBSE Class 12 Maths | UKG Lab", "Study the current NCERT Class 12 Mathematics chapter Probability."],
];

for (const [route, title, description] of schoolChapterFallbackRoutes) {
  routeMetadata[route] = { title, description };
}

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
