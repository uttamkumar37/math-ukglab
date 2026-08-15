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

const class9FallbackRoutes = [
  ["/class-9/number-systems", "Number System - CBSE Class 9 Maths | UKG Lab", "Study Class 9 Number System as Unit I with chapters, topics, notes, practice and revision."],
  ["/class-9/algebra", "Algebra - CBSE Class 9 Maths | UKG Lab", "Study Class 9 Algebra with polynomials, identities, sequences and linear equations."],
  ["/class-9/coordinate-geometry", "Coordinate Geometry - CBSE Class 9 Maths | UKG Lab", "Study Class 9 Coordinate Geometry with points, axes, quadrants and graph understanding."],
  ["/class-9/geometry", "Geometry - CBSE Class 9 Maths | UKG Lab", "Study Class 9 Geometry with Euclid's geometry, lines, angles, triangles, quadrilaterals and circles."],
  ["/class-9/mensuration", "Mensuration - CBSE Class 9 Maths | UKG Lab", "Study Class 9 Mensuration with area, perimeter, surface area and volume."],
  ["/class-9/statistics-probability", "Statistics & Probability - CBSE Class 9 Maths | UKG Lab", "Study Class 9 Statistics and Probability with data and introductory chance concepts."],
  ["/class-9/number-systems/number-systems", "Number Systems - CBSE Class 9 Maths | UKG Lab", "Learn rational and irrational numbers, decimals, roots and number-line representation."],
  ["/class-9/number-systems/number-systems/practice", "Number Systems Practice - Class 9 Maths | UKG Lab", "Practice Class 9 Number Systems with simple, medium and hard questions, hints and solutions."],
  ["/class-9/number-systems/number-systems/test", "Number Systems Chapter Test - Class 9 Maths | UKG Lab", "Take the Class 9 Number Systems chapter test with answer states and result architecture."],
  ["/class-9/number-systems/number-systems/real-numbers-and-the-number-line", "Real Numbers and the Number Line - Class 9 Maths | UKG Lab", "Learn how rational and irrational numbers sit together on the number line."],
  ["/class-9/number-systems/number-systems/rational-and-irrational-numbers", "Rational and Irrational Numbers - Class 9 Maths | UKG Lab", "Classify rational and irrational numbers using fraction form and decimal expansion."],
  ["/class-9/number-systems/number-systems/decimal-expansions", "Decimal Expansions - Class 9 Maths | UKG Lab", "Understand terminating, recurring and non-recurring decimals in Class 9 Number Systems."],
  ["/class-9/number-systems/number-systems/square-roots-and-irrationality", "Square Roots and Irrationality - Class 9 Maths | UKG Lab", "Learn when square roots are rational or irrational and how to keep exact values."],
  ["/class-9/number-systems/number-systems/operations-on-real-numbers", "Operations on Real Numbers - Class 9 Maths | UKG Lab", "Simplify and reason with real-number operations and surds."],
  ["/class-9/algebra/introduction-to-polynomials", "Introduction to Polynomials - Class 9 Maths | UKG Lab", "Study Class 9 polynomial vocabulary, degree, value and zeros."],
  ["/class-9/algebra/sequences-and-progressions", "Sequences and Progressions - Class 9 Maths | UKG Lab", "Study Class 9 sequence and pattern reasoning."],
  ["/class-9/algebra/exploring-algebraic-identities", "Exploring Algebraic Identities - Class 9 Maths | UKG Lab", "Study Class 9 algebraic identities as reusable structures."],
  ["/class-9/algebra/linear-equations-in-two-variables", "Linear Equations in Two Variables - Class 9 Maths | UKG Lab", "Study solutions and graphs of Class 9 two-variable linear equations."],
  ["/class-9/coordinate-geometry/coordinate-geometry", "Coordinate Geometry - Class 9 Maths | UKG Lab", "Study the Cartesian plane, coordinates, quadrants and plotting points."],
  ["/class-9/geometry/euclids-geometry-axioms-and-postulates", "Euclid's Geometry - Class 9 Maths | UKG Lab", "Study axioms, postulates and the structure of geometric reasoning."],
  ["/class-9/geometry/lines-and-angles", "Lines and Angles - Class 9 Maths | UKG Lab", "Study angle pairs, parallel lines and transversals."],
  ["/class-9/geometry/triangles-congruence-theorems", "Triangles Congruence Theorems - Class 9 Maths | UKG Lab", "Study Class 9 triangle congruence criteria and proof applications."],
  ["/class-9/geometry/quadrilaterals", "Quadrilaterals - Class 9 Maths | UKG Lab", "Study Class 9 quadrilateral and parallelogram properties."],
  ["/class-9/geometry/circles", "Circles - Class 9 Maths | UKG Lab", "Study Class 9 circle vocabulary, chords, arcs and angle reasoning."],
  ["/class-9/mensuration/area-and-perimeter", "Area and Perimeter - Class 9 Maths | UKG Lab", "Study area and perimeter concepts for Class 9 Mensuration."],
  ["/class-9/mensuration/surface-area-and-volume", "Surface Area and Volume - Class 9 Maths | UKG Lab", "Study Class 9 surface area and volume of prescribed solids."],
  ["/class-9/statistics-probability/statistics", "Statistics - Class 9 Maths | UKG Lab", "Study Class 9 data organization, frequency tables and central tendency."],
  ["/class-9/statistics-probability/introduction-to-probability", "Introduction to Probability - Class 9 Maths | UKG Lab", "Study Class 9 outcomes, events and simple probability."],
];

for (const [route, title, description] of class9FallbackRoutes) {
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
