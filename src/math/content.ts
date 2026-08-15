import type { Chapter, ClassLevel, Formula, JeeExam, LearningLevel, Lesson, LessonDepth, MathBranch, MathClass, PracticeQuestion } from "./types";

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
  levelContent: {
    simple: {
      summary: "Learn division as complete groups plus the amount left over.",
      what: "When we divide one whole number by another, we get complete groups and sometimes a small amount left over. That leftover is the remainder.",
      whyItMatters: "It turns ordinary division into a clear equation that we can check.",
      howItWorks: "Find how many complete groups fit, multiply to check them, and call the leftover amount the remainder.",
      objectives: ["Name the dividend, divisor, quotient and remainder.", "Write $a = bq + r$.", "Check that the remainder is smaller than the divisor."],
      content: [
        { type: "paragraph", text: "Suppose 17 objects are placed into groups of 5. We can make 3 complete groups and 2 objects remain." },
        { type: "equation", math: "17 = 5 \\times 3 + 2" },
        { type: "paragraph", text: "Here 17 is the dividend, 5 is the divisor, 3 is the quotient and 2 is the remainder." },
      ],
      example: {
        problem: "Write 23 in division form when divided by 4.",
        steps: ["Four fits into 23 five complete times.", "$4 \\times 5 = 20$.", "$23 - 20 = 3$, so the remainder is 3.", "Therefore $23 = 4 \\times 5 + 3$."],
      },
      commonMistake: "Do not choose a remainder equal to or larger than the divisor. Another complete group would still fit.",
    },
    hard: {
      summary: "Use uniqueness of quotient and remainder as a proof tool for divisibility and number-theoretic arguments.",
      what: "For fixed positive integers $a$ and $b$, the representation $a=bq+r$ with $0 \\le r<b$ exists and is unique.",
      whyItMatters: "The uniqueness condition supports the Euclidean algorithm, congruence arguments and proofs about integer structure.",
      howItWorks: "The quotient selects the unique interval $bq \\le a < b(q+1)$; subtracting $bq$ gives the only valid remainder.",
      objectives: ["Justify the bound $0 \\le r < b$.", "Explain why quotient and remainder are unique.", "Use division form inside a short proof."],
      content: [
        { type: "paragraph", text: "The multiples of $b$ partition the integers into intervals of width $b$. Exactly one interval contains $a$." },
        { type: "equation", math: "bq \\le a < b(q+1) \\Longrightarrow a=bq+r,\\;0\\le r<b" },
        { type: "paragraph", text: "If two valid representations existed, subtracting them would make a non-zero multiple of $b$ have magnitude smaller than $b$, which is impossible." },
      ],
      example: {
        problem: "Show that the square of every integer is of the form $3m$ or $3m+1$.",
        steps: ["Write any integer as $n=3q+r$, where $r$ is 0, 1 or 2.", "Square each case modulo 3.", "If $r=0$, then $n^2$ is divisible by 3.", "If $r=1$ or $2$, then $r^2$ leaves remainder 1.", "Therefore $n^2=3m$ or $3m+1$."],
      },
      commonMistake: "A pattern from a few examples is not a proof; all possible remainders must be handled.",
    },
  },
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
  examLevels: ["jee-main", "jee-advanced"],
  levelContent: {
    simple: {
      summary: "Use one reliable formula to find the two possible values of $x$ in a quadratic equation.",
      what: "A quadratic equation has $x^2$ as its highest power. The quadratic formula is a step-by-step rule that finds its roots.",
      whyItMatters: "Some equations are difficult to factor. The formula still works when the equation is written as $ax^2+bx+c=0$.",
      howItWorks: "First find $a$, $b$ and $c$. Put them into the formula carefully, calculate the square-root part, then use both the plus and minus signs.",
      objectives: ["Spot $a$, $b$ and $c$ including their signs.", "Substitute into the quadratic formula.", "Use both $+$ and $-$ to find both roots."],
      content: [
        { type: "paragraph", text: "In $x^2-5x+6=0$, the values are $a=1$, $b=-5$ and $c=6$. Keep the minus sign with 5." },
        { type: "equation", math: "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" },
        { type: "list", items: ["Copy the equation in standard form.", "Write down $a$, $b$ and $c$.", "Calculate $b^2-4ac$.", "Use plus once and minus once."] },
      ],
      example: {
        problem: "Solve $x^2-5x+6=0$.",
        steps: ["Here $a=1$, $b=-5$ and $c=6$.", "$b^2-4ac=25-24=1$.", "$x=\\frac{5\\pm1}{2}$.", "So $x=3$ or $x=2$."],
      },
      commonMistake: "Keep the sign of $b$. Here $b=-5$, so $-b=5$.",
      tryIt: {
        question: "Solve $x^2-7x+12=0$ using the formula.",
        solution: ["$a=1$, $b=-7$, $c=12$.", "$b^2-4ac=49-48=1$.", "$x=\\frac{7\\pm1}{2}$.", "So $x=4$ or $x=3$."],
      },
    },
    hard: {
      summary: "Derive the quadratic formula, interpret the discriminant and use the structure behind it in non-routine problems.",
      what: "The quadratic formula is the closed-form result of completing the square for the general second-degree polynomial $ax^2+bx+c$.",
      whyItMatters: "Beyond computing roots, it exposes symmetry about $x=-b/(2a)$ and classifies roots through the discriminant.",
      howItWorks: "Normalize by $a$, complete the square, and isolate $x$. The term $b^2-4ac$ records whether the graph meets the $x$-axis twice, once or not over the reals.",
      objectives: ["Derive the formula by completing the square.", "Connect the discriminant with root geometry.", "Use coefficients and root conditions without calculating blindly."],
      content: [
        { type: "paragraph", text: "Divide $ax^2+bx+c=0$ by $a$, move the constant term, and complete the square." },
        { type: "equation", math: "\\left(x+\\frac{b}{2a}\\right)^2=\\frac{b^2-4ac}{4a^2}" },
        { type: "paragraph", text: "Taking both square roots produces the $\\pm$ and reveals the discriminant $D=b^2-4ac$." },
        { type: "equation", math: "x=-\\frac{b}{2a}\\pm\\frac{\\sqrt{D}}{2a}" },
      ],
      example: {
        problem: "Solve $2x^2-4x-3=0$ and interpret the roots geometrically.",
        steps: ["$a=2$, $b=-4$, $c=-3$, so $D=16+24=40$.", "$x=\\frac{4\\pm\\sqrt{40}}{4}=1\\pm\\frac{\\sqrt{10}}{2}$.", "Because $D>0$, the parabola crosses the $x$-axis at two distinct real points.", "Their midpoint is $x=1$, the axis of symmetry $x=-b/(2a)$."],
      },
      why: "Completing the square separates the horizontal shift from the root separation, so coefficient information becomes geometric information.",
      commonMistake: "Do not replace $\\sqrt{b^2-4ac}$ with $b-2\\sqrt{ac}$; square roots do not distribute over subtraction.",
      tryIt: {
        question: "Find all $k$ for which $x^2-(k+1)x+k=0$ has roots differing by 3.",
        solution: ["The polynomial factors as $(x-1)(x-k)$.", "Its roots are 1 and $k$.", "$|k-1|=3$.", "Therefore $k=4$ or $k=-2$."],
      },
    },
  },
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
    difficulty: "Simple",
    concept: "Euclidean Division Lemma",
    topic: "Euclidean Division Lemma",
    question: "Write 98 in the form $a = bq + r$ when divided by 7.",
    answer: "$98 = 7 \\times 14 + 0$",
    hints: ["Identify $a$ and $b$ first.", "Find the largest multiple of 7 that is not greater than 98."],
    hintsByLevel: {
      simple: ["The number being divided is 98, and the group size is 7.", "Ask how many groups of 7 make exactly 98.", "A division with nothing left has remainder 0."],
      hard: ["Check whether 7 divides 98 exactly."],
    },
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
    difficulty: "Medium",
    concept: "Euclidean Division Lemma",
    topic: "Euclidean Division Lemma",
    question: "Which expression is valid for division by 9?",
    options: ["$74 = 9 \\times 7 + 11$", "$74 = 9 \\times 8 + 2$", "$74 = 9 \\times 9 - 7$", "$74 = 9 \\times 6 + 20$"],
    answer: "$74 = 9 \\times 8 + 2$",
    hints: ["The expression must equal 74.", "The remainder must be at least 0 and less than 9."],
    hintsByLevel: {
      simple: ["First check which remainders are between 0 and 8.", "Then multiply 9 by the quotient and add the remainder."],
      hard: ["Enforce both equality and $0\\le r<9$."],
    },
    approach: ["Reject any option with an invalid remainder.", "Then check whether the expression equals 74."],
    conceptReminder: "For $a = bq + r$, the condition is $0 \\le r < b$.",
    solutionSteps: ["Check the remainder condition for each option.", "Only 2 is a valid remainder for divisor 9.", "$9 \\times 8 + 2 = 74$.", "So the second option is valid."],
    finalAnswer: "$74 = 9 \\times 8 + 2$",
    explanation: "A valid representation must satisfy both the value equation and the remainder condition.",
  },
];

const quadraticPractice: PracticeQuestion[] = [
  {
    id: "q-c10-quadratic-direct-roots",
    slug: "solve-x2-minus-5x-plus-6",
    type: "Short Answer",
    difficulty: "Simple",
    topic: "Quadratic Formula",
    concept: "Identifying coefficients",
    examLevels: ["jee-main", "jee-advanced"],
    question: "Solve $x^2-5x+6=0$ using the quadratic formula.",
    answer: "$x=2$ or $x=3$",
    hints: ["Identify $a=1$, $b=-5$ and $c=6$.", "The discriminant is $25-24$.", "Use both signs in $5\\pm1$."],
    hintsByLevel: {
      simple: ["Write the formula first and keep the minus sign with $b=-5$.", "Calculate $b^2-4ac=25-24=1$.", "Now find both $\\frac{5+1}{2}$ and $\\frac{5-1}{2}$."],
      hard: ["Compute the discriminant, then exploit its perfect-square value."],
    },
    approach: ["Put the equation in standard form.", "Read $a$, $b$ and $c$ with their signs.", "Calculate the discriminant.", "Substitute and evaluate both roots."],
    conceptReminder: "For $ax^2+bx+c=0$, use $x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$.",
    solutionSteps: ["$a=1$, $b=-5$, $c=6$.", "$D=(-5)^2-4(1)(6)=1$.", "$x=\\frac{5\\pm1}{2}$.", "Therefore $x=3$ or $x=2$."],
    finalAnswer: "$x=2$ or $x=3$",
    explanation: "The two signs produce the two roots of the quadratic.",
  },
  {
    id: "q-c10-quadratic-formula-roots",
    slug: "solve-x2-minus-7x-plus-10",
    type: "Long Answer",
    difficulty: "Medium",
    topic: "Quadratic Formula",
    concept: "Quadratic Formula",
    examLevels: ["jee-main", "jee-advanced"],
    question: "Solve $x^2 - 7x + 10 = 0$ using the quadratic formula.",
    answer: "$x = 5$ or $x = 2$",
    hints: ["First identify $a$, $b$ and $c$ from standard form.", "Calculate the discriminant $b^2 - 4ac$.", "Remember that $-b$ changes the sign of $b$."],
    hintsByLevel: {
      simple: ["Here $a=1$, $b=-7$ and $c=10$.", "Calculate $(-7)^2-4(1)(10)$.", "Use $x=\\frac{7\\pm3}{2}$ and evaluate both signs."],
      hard: ["The discriminant is a perfect square; compare the formula with factorisation."],
    },
    approach: ["We need the roots of a quadratic equation.", "Identify $a = 1$, $b = -7$, $c = 10$.", "Find the discriminant to simplify the square root.", "Apply the quadratic formula and separate the two values created by $\\pm$."],
    conceptReminder: "For $ax^2 + bx + c = 0$, use $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.",
    solutionSteps: ["The equation is already in standard form: $x^2 - 7x + 10 = 0$.", "So $a = 1$, $b = -7$, $c = 10$.", "Discriminant: $D = (-7)^2 - 4(1)(10) = 49 - 40 = 9$.", "Substitute: $x = \\frac{-(-7) \\pm \\sqrt{9}}{2(1)} = \\frac{7 \\pm 3}{2}$.", "This gives $x = \\frac{10}{2} = 5$ or $x = \\frac{4}{2} = 2$."],
    finalAnswer: "$x = 5$ or $x = 2$",
    explanation: "Both roots satisfy the original equation, and the formula works because it is derived from completing the square.",
    alternativeMethods: [{ title: "Factorisation", steps: ["Find two numbers with product 10 and sum -7.", "The numbers are -5 and -2.", "$x^2 - 7x + 10 = (x - 5)(x - 2)$.", "So $x = 5$ or $x = 2$."] }],
  },
  {
    id: "q-c10-quadratic-parameter-roots",
    slug: "parameter-roots-differ-by-three",
    type: "Long Answer",
    difficulty: "Hard",
    topic: "Quadratic Formula",
    concept: "Root relationships",
    examLevels: ["jee-main", "jee-advanced"],
    question: "Find all real values of $k$ for which $x^2-(k+1)x+k=0$ has roots differing by 3.",
    answer: "$k=4$ or $k=-2$",
    hints: ["Relate the root difference to the discriminant.", "For a monic quadratic, the absolute difference of roots is $\\sqrt{D}$."],
    hintsByLevel: {
      simple: ["The expression factors as $(x-1)(x-k)$.", "So the roots are 1 and $k$.", "Set $|k-1|=3$ and solve both cases."],
      medium: ["Try factorising first, then compare the two roots.", "Translate 'differing by 3' into an absolute-value equation."],
      hard: ["Use either hidden factorisation or the root-difference identity."],
    },
    approach: ["Look for structure before expanding the quadratic formula.", "Identify the roots from factorisation or use the discriminant.", "Convert the difference condition into an equation in $k$.", "Check every resulting value."],
    conceptReminder: "If roots are $\\alpha$ and $\\beta$, their difference can be studied through factorisation or $D=a^2(\\alpha-\\beta)^2$.",
    solutionSteps: ["Factor: $x^2-(k+1)x+k=(x-1)(x-k)$.", "The roots are $1$ and $k$.", "They differ by 3, so $|k-1|=3$.", "Thus $k-1=3$ or $k-1=-3$.", "Hence $k=4$ or $k=-2$."],
    finalAnswer: "$k=4$ or $k=-2$",
    explanation: "Both values produce real roots exactly three units apart.",
    alternativeMethods: [{ title: "Discriminant method", steps: ["Here $D=(k+1)^2-4k=(k-1)^2$.", "For this monic quadratic, the root difference is $\\sqrt{D}=|k-1|$.", "Set $|k-1|=3$.", "So $k=4$ or $k=-2$."] }],
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

function plannedChapter(classLevel: ClassLevel, branchSlug: string, order: number, slug: string, title: string, description: string, difficulty?: Chapter["difficulty"], examLevels: JeeExam[] = []): Chapter {
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
    examLevels,
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
        examLevels: ["jee-main", "jee-advanced"],
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
      plannedChapter(11, "sets-relations", 1, "sets", "Sets", "Representation, operations and Venn diagram reasoning.", "Easy", ["jee-main", "jee-advanced"]),
      plannedChapter(11, "sets-relations", 2, "relations-and-functions", "Relations and Functions", "Mappings, domain, range and function behavior.", "Medium", ["jee-main", "jee-advanced"]),
      plannedChapter(11, "trigonometry", 3, "trigonometric-functions", "Trigonometric Functions", "Angles, identities and graph-based understanding.", "Medium", ["jee-main", "jee-advanced"]),
    ],
  },
  {
    level: 12,
    slug: "class-12",
    title: "CBSE Class 12 Mathematics",
    promise: "Prepare with Confidence",
    description: "Learn calculus, algebra, vectors, probability and exam-oriented problem solving with clarity.",
    chapters: [
      plannedChapter(12, "sets-relations", 1, "relations-and-functions", "Relations and Functions", "Types of relations, functions and composition.", "Medium", ["jee-main", "jee-advanced"]),
      plannedChapter(12, "trigonometry", 2, "inverse-trigonometric-functions", "Inverse Trigonometric Functions", "Principal values, domains, ranges and identities.", "Medium", ["jee-main", "jee-advanced"]),
      plannedChapter(12, "algebra", 3, "matrices", "Matrices", "Matrix operations, determinants and structured calculation.", "Medium", ["jee-main", "jee-advanced"]),
    ],
  },
];

export const allChapters = mathClasses.flatMap((mathClass) => mathClass.chapters.map((chapter) => ({ ...chapter, branch: mathBranches.find((branch) => branch.slug === chapter.branchSlug)! })));
export const allLessons = allChapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ ...lesson, examLevels: lesson.examLevels ?? chapter.examLevels, classLevel: chapter.classLevel, branchSlug: chapter.branchSlug, branchName: chapter.branch.name, chapterSlug: chapter.slug, chapterTitle: chapter.title })));
export const allQuestions = allChapters.flatMap((chapter) => chapter.practice.map((question) => ({ ...question, examLevels: question.examLevels ?? chapter.examLevels, classLevel: chapter.classLevel, branchSlug: chapter.branchSlug, branchName: chapter.branch.name, chapterSlug: chapter.slug, chapterTitle: chapter.title })));
export const allFormulas = allChapters.flatMap((chapter) => chapter.formulas.map((formula) => ({ ...formula, examLevels: chapter.examLevels, chapterTitle: chapter.title })));

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

export function getChaptersForExam(exam: JeeExam) {
  return allChapters.filter((chapter) => chapter.examLevels?.includes(exam));
}

export function resolveLessonDepth(lesson: Lesson, level: LearningLevel): LessonDepth {
  const base: LessonDepth = {
    summary: lesson.summary,
    what: lesson.what ?? lesson.summary,
    whyItMatters: lesson.whyItMatters ?? lesson.why,
    howItWorks: lesson.howItWorks ?? lesson.summary,
    objectives: lesson.objectives,
    content: lesson.content,
    example: lesson.example,
    why: lesson.why,
    commonMistake: lesson.commonMistake,
    tryIt: lesson.tryIt,
  };

  return {
    ...base,
    ...(lesson.levelContent?.medium ?? {}),
    ...(lesson.levelContent?.[level] ?? {}),
  };
}

export function getQuestionHints(question: PracticeQuestion, level: LearningLevel) {
  return question.hintsByLevel?.[level] ?? question.hints;
}
