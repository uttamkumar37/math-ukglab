import type { Chapter, ClassLevel, Formula, Lesson, MathClass, PracticeQuestion } from "./types";

const now = "2026-08-14";

const euclideanLesson: Lesson = {
  id: "lesson-c10-real-euclidean",
  slug: "euclidean-division-lemma",
  title: "Euclidean Division Lemma",
  order: 1,
  summary: "Understand how every pair of positive integers can be written as a quotient and a remainder.",
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
  id: "lesson-c10-quadratic-roots",
  slug: "factorising-quadratics",
  title: "Factorising Quadratic Equations",
  order: 1,
  summary: "Solve simple quadratic equations by splitting the middle term.",
  objectives: ["Recognize standard quadratic form $ax^2 + bx + c = 0$.", "Factorise using two numbers whose product is $ac$ and sum is $b$.", "Verify roots by substitution."],
  visual: "curve",
  content: [
    { type: "paragraph", text: "A quadratic equation can often be solved by rewriting it as a product of two linear factors." },
    { type: "equation", math: "x^2 + 5x + 6 = (x + 2)(x + 3)" },
    { type: "paragraph", text: "If a product is zero, at least one factor must be zero. This gives the roots of the equation." },
  ],
  example: {
    problem: "Solve $x^2 + 5x + 6 = 0$.",
    steps: ["Find two numbers with product 6 and sum 5.", "The numbers are 2 and 3.", "So $x^2 + 5x + 6 = (x + 2)(x + 3)$.", "Set each factor to zero: $x = -2$ or $x = -3$."],
  },
  why: "The zero-product property connects factorisation with solving equations.",
  commonMistake: "Do not write the factors and forget to set each factor equal to zero.",
  tryIt: {
    question: "Solve $x^2 + 7x + 12 = 0$.",
    solution: ["$x^2 + 7x + 12 = (x + 3)(x + 4)$.", "So $x = -3$ or $x = -4$."],
  },
  formula: "ax^2 + bx + c = 0",
  status: "sample",
  createdAt: now,
  updatedAt: now,
};

const realNumbersPractice: PracticeQuestion[] = [
  {
    id: "q-c10-real-division-98-7",
    slug: "write-98-using-euclidean-division",
    type: "Numerical",
    difficulty: "Easy",
    topic: "Euclidean Division Lemma",
    question: "Write 98 in the form $a = bq + r$ when divided by 7.",
    answer: "$98 = 7 \\times 14 + 0$",
    hints: ["Identify $a$ and $b$ first.", "Find the largest multiple of 7 that is not greater than 98."],
    conceptReminder: "The remainder must satisfy $0 \\le r < b$.",
    solution: ["Given $a = 98$ and $b = 7$.", "$7 \\times 14 = 98$.", "So $q = 14$ and $r = 0$.", "Final answer: $98 = 7 \\times 14 + 0$."],
    explanation: "A zero remainder means 98 is exactly divisible by 7.",
  },
  {
    id: "q-c10-real-remainder-check",
    slug: "spot-invalid-remainder",
    type: "MCQ",
    difficulty: "Medium",
    topic: "Euclidean Division Lemma",
    question: "Which expression is valid for division by 9?",
    options: ["$74 = 9 \\times 7 + 11$", "$74 = 9 \\times 8 + 2$", "$74 = 9 \\times 9 - 7$", "$74 = 9 \\times 6 + 20$"],
    answer: "$74 = 9 \\times 8 + 2$",
    hints: ["The expression must equal 74.", "The remainder must be at least 0 and less than 9."],
    conceptReminder: "For $a = bq + r$, the condition is $0 \\le r < b$.",
    solution: ["Check the remainder condition for each option.", "Only 2 is a valid remainder for divisor 9.", "$9 \\times 8 + 2 = 74$.", "Final answer: $74 = 9 \\times 8 + 2$."],
    explanation: "A valid representation must satisfy both the value equation and the remainder condition.",
  },
];

const formulas: Formula[] = [
  {
    id: "formula-c10-real-euclidean",
    slug: "euclidean-division-form",
    title: "Euclidean Division Form",
    statement: "a = bq + r, \\quad 0 \\le r < b",
    note: "Used to express division with quotient and remainder.",
    classLevel: 10,
    chapterSlug: "real-numbers",
  },
  {
    id: "formula-c10-quadratic",
    slug: "quadratic-formula",
    title: "Quadratic Formula",
    statement: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    note: "Used to solve $ax^2 + bx + c = 0$ when $a \\ne 0$.",
    classLevel: 10,
    chapterSlug: "quadratic-equations",
  },
];

function plannedChapter(classLevel: ClassLevel, order: number, slug: string, title: string, description: string, difficulty?: Chapter["difficulty"]): Chapter {
  return {
    id: `chapter-c${classLevel}-${slug}`,
    slug,
    classLevel,
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
      plannedChapter(9, 1, "number-systems", "Number Systems", "Irrational numbers, real numbers and number-line thinking.", "Easy"),
      plannedChapter(9, 2, "polynomials", "Polynomials", "Expressions, identities, factorisation and algebraic reasoning.", "Medium"),
      plannedChapter(9, 3, "coordinate-geometry", "Coordinate Geometry", "Plotting points and reading geometry on a plane.", "Easy"),
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
        ...plannedChapter(10, 1, "real-numbers", "Real Numbers", "Euclidean division, HCF, irrationality and decimal expansion.", "Easy"),
        overview: "Real Numbers connects divisibility, HCF, primes and decimal expansion. It is a foundation chapter for proof-oriented mathematical thinking.",
        lessons: [euclideanLesson],
        practice: realNumbersPractice,
        formulas: [formulas[0]],
      },
      plannedChapter(10, 2, "polynomials", "Polynomials", "Zeros of polynomials and relationships between roots and coefficients.", "Medium"),
      plannedChapter(10, 3, "pair-of-linear-equations", "Pair of Linear Equations", "Graphical and algebraic methods for two-variable equations.", "Medium"),
      {
        ...plannedChapter(10, 4, "quadratic-equations", "Quadratic Equations", "Factorisation, completing the square and formula-based solving.", "Medium"),
        lessons: [quadraticLesson],
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
      plannedChapter(11, 1, "sets", "Sets", "Representation, operations and Venn diagram reasoning.", "Easy"),
      plannedChapter(11, 2, "relations-and-functions", "Relations and Functions", "Mappings, domain, range and function behavior.", "Medium"),
      plannedChapter(11, 3, "trigonometric-functions", "Trigonometric Functions", "Angles, identities and graph-based understanding.", "Medium"),
    ],
  },
  {
    level: 12,
    slug: "class-12",
    title: "CBSE Class 12 Mathematics",
    promise: "Prepare with Confidence",
    description: "Learn calculus, algebra, vectors, probability and exam-oriented problem solving with clarity.",
    chapters: [
      plannedChapter(12, 1, "relations-and-functions", "Relations and Functions", "Types of relations, functions and composition.", "Medium"),
      plannedChapter(12, 2, "inverse-trigonometric-functions", "Inverse Trigonometric Functions", "Principal values, domains, ranges and identities.", "Medium"),
      plannedChapter(12, 3, "matrices", "Matrices", "Matrix operations, determinants and structured calculation.", "Medium"),
    ],
  },
];

export const allChapters = mathClasses.flatMap((mathClass) => mathClass.chapters);
export const allLessons = allChapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ ...lesson, classLevel: chapter.classLevel, chapterSlug: chapter.slug, chapterTitle: chapter.title })));
export const allQuestions = allChapters.flatMap((chapter) => chapter.practice.map((question) => ({ ...question, classLevel: chapter.classLevel, chapterSlug: chapter.slug, chapterTitle: chapter.title })));
export const allFormulas = allChapters.flatMap((chapter) => chapter.formulas.map((formula) => ({ ...formula, chapterTitle: chapter.title })));

export function getClassBySlug(slug?: string) {
  return mathClasses.find((mathClass) => mathClass.slug === slug);
}

export function getChapter(classSlug?: string, chapterSlug?: string) {
  const mathClass = getClassBySlug(classSlug);
  const chapter = mathClass?.chapters.find((item) => item.slug === chapterSlug);
  return mathClass && chapter ? { mathClass, chapter } : undefined;
}

export function getLesson(classSlug?: string, chapterSlug?: string, lessonSlug?: string) {
  const found = getChapter(classSlug, chapterSlug);
  const lesson = found?.chapter.lessons.find((item) => item.slug === lessonSlug);
  return found && lesson ? { ...found, lesson } : undefined;
}
