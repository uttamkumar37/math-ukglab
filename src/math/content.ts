import type { Chapter, ClassLevel, Formula, Lesson, MathBranch, MathClass, PracticeQuestion } from "./types";

const now = "2026-08-14";

const euclideanLesson: Lesson = {
  id: "lesson-c10-real-euclidean",
  slug: "euclidean-division-lemma",
  title: "Euclidean Division Lemma",
  order: 1,
  summary: "Understand how every pair of positive integers can be written as a quotient and a remainder.",
  conceptTitle: "Euclidean Division Lemma",
  what: "A division statement that expresses one positive integer as complete groups plus a remainder.",
  whyItMatters: "It is the first proof tool behind HCF, divisibility and many number-system arguments.",
  howItWorks: "Choose the greatest multiple of the divisor that does not exceed the dividend; the leftover part is the remainder.",
  objectives: ["Write a number in the form $a = bq + r$.", "Identify dividend, divisor, quotient and remainder.", "Use the condition $0 \\le r < b$ correctly."],
  visual: "number-line",
  content: [
    { type: "paragraph", text: "The Euclidean Division Lemma says that for any two positive integers $a$ and $b$, there are unique whole numbers $q$ and $r$ such that:" },
    { type: "equation", math: "a = bq + r, \\quad 0 \\le r < b" },
    { type: "paragraph", text: "Think of $a$ as the amount being divided, $b$ as the group size, $q$ as the number of complete groups, and $r$ as what remains." },
  ],
  example: {
    problem: "Write 135 in the form $a = bq + r$ when divided by 12.",
    steps: ["Here $a = 135$ and $b = 12$.", "The largest multiple of 12 not exceeding 135 is $12 \\times 11 = 132$.", "So $q = 11$ and $r = 135 - 132 = 3$.", "Therefore, $135 = 12 \\times 11 + 3$ and $0 \\le 3 < 12$."],
  },
  why: "The remainder must be smaller than the divisor. If it were equal to or larger than the divisor, one more complete group could still be formed.",
  commonMistake: "Students often stop after finding the quotient and forget to check that the remainder is non-negative and smaller than the divisor.",
  tryIt: {
    question: "Use the lemma to write 98 in the form $a = bq + r$ when divided by 7.",
    solution: ["$98 = 7 \\times 14 + 0$.", "The remainder is 0, which is allowed because $0 \\le r < 7$."],
  },
  formula: "a = bq + r, \\quad 0 \\le r < b",
  status: "sample",
  createdAt: now,
  updatedAt: now,
};

const quadraticLesson: Lesson = {
  id: "lesson-c10-quadratic-formula",
  slug: "quadratic-formula",
  title: "Quadratic Formula",
  order: 1,
  summary: "Derive and apply the formula for solving any quadratic equation in standard form.",
  conceptTitle: "Quadratic Formula",
  what: "A general rule for finding roots of $ax^2 + bx + c = 0$ when $a \\ne 0$.",
  whyItMatters: "Factorisation does not work neatly for every quadratic equation; this formula gives a reliable method.",
  howItWorks: "The formula comes from completing the square in the general equation, then isolating $x$.",
  objectives: ["Recognize standard quadratic form $ax^2 + bx + c = 0$.", "Identify $a$, $b$ and $c$ correctly.", "Use $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ to find both roots."],
  visual: "curve",
  content: [
    { type: "paragraph", text: "A quadratic equation in standard form looks like $ax^2 + bx + c = 0$, where $a \\ne 0$." },
    { type: "equation", math: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
    { type: "paragraph", text: "The expression under the square root, $b^2 - 4ac$, is the discriminant. It helps us understand the roots before calculating them." },
  ],
  example: {
    problem: "Solve $x^2 - 5x + 6 = 0$ using the quadratic formula.",
    steps: ["Identify $a = 1$, $b = -5$ and $c = 6$.", "Compute the discriminant: $b^2 - 4ac = (-5)^2 - 4(1)(6) = 1$.", "Substitute into the formula: $x = \\frac{5 \\pm \\sqrt{1}}{2}$.", "So $x = 3$ or $x = 2$."],
  },
  why: "Completing the square turns every quadratic into a square-root problem, which is why one formula can solve many different quadratic equations.",
  commonMistake: "Students often forget that $b$ includes its sign. If $b = -5$, then $-b = 5$.",
  tryIt: {
    question: "Solve $x^2 - 7x + 10 = 0$ using the quadratic formula.",
    solution: ["Here $a = 1$, $b = -7$, $c = 10$.", "$b^2 - 4ac = 49 - 40 = 9$.", "$x = \\frac{7 \\pm 3}{2}$.", "So $x = 5$ or $x = 2$."],
  },
  formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
  status: "sample",
  createdAt: now,
  updatedAt: now,
};

const realNumbersPractice: PracticeQuestion[] = [
  {
    id: "q-c10-real-division-98-7",
    slug: "write-98-using-euclidean-division",
    type: "Numerical",
    difficulty: "Basic",
    concept: "Euclidean Division Lemma",
    topic: "Euclidean Division Lemma",
    question: "Write 98 in the form $a = bq + r$ when divided by 7.",
    answer: "$98 = 7 \\times 14 + 0$",
    hints: ["Identify $a$ and $b$ first.", "Find the largest multiple of 7 that is not greater than 98."],
    approach: ["Identify the dividend and divisor.", "Find the quotient and remainder.", "Check that the remainder is less than the divisor."],
    conceptReminder: "The remainder must satisfy $0 \\le r < b$.",
    solutionSteps: ["Given $a = 98$ and $b = 7$.", "$7 \\times 14 = 98$.", "So $q = 14$ and $r = 0$.", "Verify $0 \\le 0 < 7$."],
    finalAnswer: "$98 = 7 \\times 14 + 0$",
    explanation: "A zero remainder means 98 is exactly divisible by 7.",
  },
  {
    id: "q-c10-real-remainder-check",
    slug: "spot-invalid-remainder",
    type: "MCQ",
    difficulty: "Standard",
    concept: "Euclidean Division Lemma",
    topic: "Euclidean Division Lemma",
    question: "Which expression is valid for division by 9?",
    options: ["$74 = 9 \\times 7 + 11$", "$74 = 9 \\times 8 + 2$", "$74 = 9 \\times 9 - 7$", "$74 = 9 \\times 6 + 20$"],
    answer: "$74 = 9 \\times 8 + 2$",
    hints: ["The expression must equal 74.", "The remainder must be at least 0 and less than 9."],
    approach: ["Reject any option with an invalid remainder.", "Then check whether the expression equals 74."],
    conceptReminder: "For $a = bq + r$, the condition is $0 \\le r < b$.",
    solutionSteps: ["Check the remainder condition for each option.", "Only 2 is a valid remainder for divisor 9.", "$9 \\times 8 + 2 = 74$.", "So the second option is valid."],
    finalAnswer: "$74 = 9 \\times 8 + 2$",
    explanation: "A valid representation must satisfy both the value equation and the remainder condition.",
  },
];

const quadraticPractice: PracticeQuestion[] = [
  {
    id: "q-c10-quadratic-formula-roots",
    slug: "solve-x2-minus-7x-plus-10",
    type: "Long Answer",
    difficulty: "Standard",
    topic: "Quadratic Formula",
    concept: "Quadratic Formula",
    question: "Solve $x^2 - 7x + 10 = 0$ using the quadratic formula.",
    answer: "$x = 5$ or $x = 2$",
    hints: ["First identify $a$, $b$ and $c$ from standard form.", "Calculate the discriminant $b^2 - 4ac$.", "Remember that $-b$ changes the sign of $b$."],
    approach: ["We need the roots of a quadratic equation.", "Identify $a = 1$, $b = -7$, $c = 10$.", "Find the discriminant to simplify the square root.", "Apply the quadratic formula and separate the two values created by $\\pm$."],
    conceptReminder: "For $ax^2 + bx + c = 0$, use $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.",
    solutionSteps: ["The equation is already in standard form: $x^2 - 7x + 10 = 0$.", "So $a = 1$, $b = -7$, $c = 10$.", "Discriminant: $D = (-7)^2 - 4(1)(10) = 49 - 40 = 9$.", "Substitute: $x = \\frac{-(-7) \\pm \\sqrt{9}}{2(1)} = \\frac{7 \\pm 3}{2}$.", "This gives $x = \\frac{10}{2} = 5$ or $x = \\frac{4}{2} = 2$."],
    finalAnswer: "$x = 5$ or $x = 2$",
    explanation: "Both roots satisfy the original equation, and the formula works because it is derived from completing the square.",
    alternativeMethods: [{ title: "Factorisation", steps: ["Find two numbers with product 10 and sum -7.", "The numbers are -5 and -2.", "$x^2 - 7x + 10 = (x - 5)(x - 2)$.", "So $x = 5$ or $x = 2$."] }],
  },
];

export const mathBranches: MathBranch[] = [
  { id: "branch-number-systems", name: "Arithmetic / Number Systems", slug: "number-systems", description: "Numbers, divisibility, real-number structure and numerical reasoning.", order: 1, identity: "numbers" },
  { id: "branch-algebra", name: "Algebra", slug: "algebra", description: "Expressions, equations, polynomials, sequences and symbolic relationships.", order: 2, identity: "algebra" },
  { id: "branch-geometry", name: "Geometry", slug: "geometry", description: "Shapes, proofs, congruence, circles and geometric reasoning.", order: 3, identity: "geometry" },
  { id: "branch-coordinate-geometry", name: "Coordinate Geometry", slug: "coordinate-geometry", description: "Points, lines, distances and geometry on the coordinate plane.", order: 4, identity: "coordinate" },
  { id: "branch-trigonometry", name: "Trigonometry", slug: "trigonometry", description: "Ratios, identities, angles, functions and applications.", order: 5, identity: "trigonometry" },
  { id: "branch-calculus", name: "Calculus", slug: "calculus", description: "Limits, continuity, differentiation, integration and change.", order: 6, identity: "calculus" },
  { id: "branch-statistics-probability", name: "Statistics & Probability", slug: "statistics-probability", description: "Data, distributions, chance and probabilistic reasoning.", order: 7, identity: "statistics" },
  { id: "branch-sets-relations", name: "Sets & Relations", slug: "sets-relations", description: "Sets, relations, functions, domain and range.", order: 8, identity: "sets" },
  { id: "branch-mensuration", name: "Mensuration", slug: "mensuration", description: "Areas, surface areas, volumes and measurement.", order: 9, identity: "mensuration" },
];

const formulas: Formula[] = [
  {
    id: "formula-c10-real-euclidean",
    slug: "euclidean-division-form",
    title: "Euclidean Division Form",
    statement: "a = bq + r, \\quad 0 \\le r < b",
    note: "Used to express division with quotient and remainder.",
    classLevel: 10,
    branchSlug: "number-systems",
    chapterSlug: "real-numbers",
  },
  {
    id: "formula-c10-quadratic",
    slug: "quadratic-formula",
    title: "Quadratic Formula",
    statement: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    note: "Used to solve $ax^2 + bx + c = 0$ when $a \\ne 0$.",
    classLevel: 10,
    branchSlug: "algebra",
    chapterSlug: "quadratic-equations",
  },
];

function plannedChapter(classLevel: ClassLevel, branchSlug: string, order: number, slug: string, title: string, description: string, difficulty?: Chapter["difficulty"]): Chapter {
  return {
    id: `chapter-c${classLevel}-${slug}`,
    slug,
    classLevel,
    branchSlug,
    order,
    title,
    description,
    difficulty,
    overview: "This chapter is part of the structured CBSE Mathematics roadmap. Lessons, examples, practice and revision material can be added without changing the page design.",
    lessons: [],
    practice: [],
    formulas: [],
  };
}

export const mathClasses: MathClass[] = [
  {
    level: 9,
    slug: "class-9",
    title: "CBSE Class 9 Mathematics",
    promise: "Build the Foundation",
    description: "Strengthen number systems, algebra, geometry and data handling with calm, concept-first learning.",
    chapters: [
      plannedChapter(9, "number-systems", 1, "number-systems", "Number Systems", "Irrational numbers, real numbers and number-line thinking.", "Easy"),
      plannedChapter(9, "algebra", 2, "polynomials", "Polynomials", "Expressions, identities, factorisation and algebraic reasoning.", "Medium"),
      plannedChapter(9, "coordinate-geometry", 3, "coordinate-geometry", "Coordinate Geometry", "Plotting points and reading geometry on a plane.", "Easy"),
    ],
  },
  {
    level: 10,
    slug: "class-10",
    title: "CBSE Class 10 Mathematics",
    promise: "Master the Boards",
    description: "Prepare for board-level mathematics through concepts, examples, practice and chapter tests.",
    chapters: [
      {
        ...plannedChapter(10, "number-systems", 1, "real-numbers", "Real Numbers", "Euclidean division, HCF, irrationality and decimal expansion.", "Easy"),
        overview: "Real Numbers connects divisibility, HCF, primes and decimal expansion. It is a foundation chapter for proof-oriented mathematical thinking.",
        lessons: [euclideanLesson],
        practice: realNumbersPractice,
        formulas: [formulas[0]],
      },
      plannedChapter(10, "algebra", 2, "polynomials", "Polynomials", "Zeros of polynomials and relationships between roots and coefficients.", "Medium"),
      plannedChapter(10, "algebra", 3, "pair-of-linear-equations", "Pair of Linear Equations", "Graphical and algebraic methods for two-variable equations.", "Medium"),
      {
        ...plannedChapter(10, "algebra", 4, "quadratic-equations", "Quadratic Equations", "Factorisation, completing the square and formula-based solving.", "Medium"),
        lessons: [quadraticLesson],
        practice: quadraticPractice,
        formulas: [formulas[1]],
      },
    ],
  },
  {
    level: 11,
    slug: "class-11",
    title: "CBSE Class 11 Mathematics",
    promise: "Strengthen Advanced Concepts",
    description: "Develop deeper algebra, trigonometry, coordinate geometry, limits and probability foundations.",
    chapters: [
      plannedChapter(11, "sets-relations", 1, "sets", "Sets", "Representation, operations and Venn diagram reasoning.", "Easy"),
      plannedChapter(11, "sets-relations", 2, "relations-and-functions", "Relations and Functions", "Mappings, domain, range and function behavior.", "Medium"),
      plannedChapter(11, "trigonometry", 3, "trigonometric-functions", "Trigonometric Functions", "Angles, identities and graph-based understanding.", "Medium"),
    ],
  },
  {
    level: 12,
    slug: "class-12",
    title: "CBSE Class 12 Mathematics",
    promise: "Prepare with Confidence",
    description: "Learn calculus, algebra, vectors, probability and exam-oriented problem solving with clarity.",
    chapters: [
      plannedChapter(12, "sets-relations", 1, "relations-and-functions", "Relations and Functions", "Types of relations, functions and composition.", "Medium"),
      plannedChapter(12, "trigonometry", 2, "inverse-trigonometric-functions", "Inverse Trigonometric Functions", "Principal values, domains, ranges and identities.", "Medium"),
      plannedChapter(12, "algebra", 3, "matrices", "Matrices", "Matrix operations, determinants and structured calculation.", "Medium"),
    ],
  },
];

export const allChapters = mathClasses.flatMap((mathClass) => mathClass.chapters.map((chapter) => ({ ...chapter, branch: mathBranches.find((branch) => branch.slug === chapter.branchSlug)! })));
export const allLessons = allChapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ ...lesson, classLevel: chapter.classLevel, branchSlug: chapter.branchSlug, branchName: chapter.branch.name, chapterSlug: chapter.slug, chapterTitle: chapter.title })));
export const allQuestions = allChapters.flatMap((chapter) => chapter.practice.map((question) => ({ ...question, classLevel: chapter.classLevel, branchSlug: chapter.branchSlug, branchName: chapter.branch.name, chapterSlug: chapter.slug, chapterTitle: chapter.title })));
export const allFormulas = allChapters.flatMap((chapter) => chapter.formulas.map((formula) => ({ ...formula, chapterTitle: chapter.title })));

export function getClassBySlug(slug?: string) {
  return mathClasses.find((mathClass) => mathClass.slug === slug);
}

export function getBranchesForClass(classSlug?: string) {
  const mathClass = getClassBySlug(classSlug);
  if (!mathClass) return undefined;
  const branches = mathBranches
    .map((branch) => ({ ...branch, chapters: mathClass.chapters.filter((chapter) => chapter.branchSlug === branch.slug) }))
    .filter((branch) => branch.chapters.length)
    .sort((a, b) => a.order - b.order);
  return { mathClass, branches };
}

export function getBranch(classSlug?: string, branchSlug?: string) {
  const found = getBranchesForClass(classSlug);
  const branch = found?.branches.find((item) => item.slug === branchSlug);
  return found && branch ? { mathClass: found.mathClass, branch } : undefined;
}

export function getChapter(classSlug?: string, chapterSlug?: string, branchSlug?: string) {
  const mathClass = getClassBySlug(classSlug);
  const chapter = mathClass?.chapters.find((item) => item.slug === chapterSlug && (!branchSlug || item.branchSlug === branchSlug));
  const branch = chapter ? mathBranches.find((item) => item.slug === chapter.branchSlug) : undefined;
  return mathClass && chapter && branch ? { mathClass, branch, chapter } : undefined;
}

export function getLesson(classSlug?: string, chapterSlug?: string, lessonSlug?: string, branchSlug?: string) {
  const found = getChapter(classSlug, chapterSlug, branchSlug);
  const lesson = found?.chapter.lessons.find((item) => item.slug === lessonSlug);
  return found && lesson ? { ...found, lesson } : undefined;
}
