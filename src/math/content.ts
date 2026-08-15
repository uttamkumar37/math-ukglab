import type { Chapter, ClassLevel, Curriculum, Formula, JeeExam, LearningLevel, Lesson, LessonDepth, MathBranch, MathClass, PracticeQuestion } from "./types";

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
  { id: "branch-number-systems", name: "Number System", slug: "number-systems", description: "Build a strong understanding of rational and irrational numbers, representations and number properties.", order: 1, identity: "numbers", curriculumId: "cbse-ix-math-2026-27", unitNumber: 1, shortTitle: "Number System" },
  { id: "branch-algebra", name: "Algebra", slug: "algebra", description: "Focus on algebraic reasoning, polynomials, identities, equations, sequences and related curriculum concepts.", order: 2, identity: "algebra", curriculumId: "cbse-ix-math-2026-27", unitNumber: 2, shortTitle: "Algebra" },
  { id: "branch-coordinate-geometry", name: "Coordinate Geometry", slug: "coordinate-geometry", description: "Develop understanding of coordinate systems and geometric representation.", order: 3, identity: "coordinate", curriculumId: "cbse-ix-math-2026-27", unitNumber: 3, shortTitle: "Coordinate Geometry" },
  { id: "branch-geometry", name: "Geometry", slug: "geometry", description: "Develop mathematical reasoning through Euclidean geometry, lines, angles, triangles, quadrilaterals and circles.", order: 4, identity: "geometry", curriculumId: "cbse-ix-math-2026-27", unitNumber: 4, shortTitle: "Geometry" },
  { id: "branch-mensuration", name: "Mensuration", slug: "mensuration", description: "Learn measurement-related concepts including area, perimeter, surface area and volume where prescribed.", order: 5, identity: "mensuration", curriculumId: "cbse-ix-math-2026-27", unitNumber: 5, shortTitle: "Mensuration" },
  { id: "branch-statistics-probability", name: "Statistics & Probability", slug: "statistics-probability", description: "Learn how to understand data and introductory probability concepts.", order: 6, identity: "statistics", curriculumId: "cbse-ix-math-2026-27", unitNumber: 6, shortTitle: "Statistics & Probability" },
  { id: "branch-trigonometry", name: "Trigonometry", slug: "trigonometry", description: "Ratios, identities, angles, functions and applications.", order: 5, identity: "trigonometry" },
  { id: "branch-calculus", name: "Calculus", slug: "calculus", description: "Limits, continuity, differentiation, integration and change.", order: 6, identity: "calculus" },
  { id: "branch-sets-relations", name: "Sets & Relations", slug: "sets-relations", description: "Sets, relations, functions, domain and range.", order: 8, identity: "sets" },
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

export const curricula: Curriculum[] = [
  {
    id: "cbse-ix-math-2026-27",
    board: "CBSE",
    academicYear: "2026-27",
    classLevel: 9,
    subject: "Mathematics",
    version: "2026-27-official-curriculum-v1",
    status: "active",
    sourceLabel: "CBSE Academic Curriculum 2026-27, Secondary Curriculum, Mathematics",
    sourceUrl: "https://cbseacademic.nic.in/curriculum_2027.html",
  },
];

const class9Curriculum = curricula[0];

type Class9ChapterSeed = {
  unitId: string;
  branchSlug: string;
  order: number;
  slug: string;
  title: string;
  description: string;
  overview: string;
  topics: string[];
  formulas?: Formula[];
};

const class9NumberSystemsLessons: Lesson[] = [
  {
    id: "lesson-c9-number-real-numbers",
    slug: "real-numbers-and-the-number-line",
    title: "Real Numbers and the Number Line",
    order: 1,
    summary: "Place rational and irrational numbers together on one continuous number line.",
    conceptTitle: "Real Numbers",
    what: "Real numbers are all numbers that can be placed on the number line, including rational and irrational numbers.",
    whyItMatters: "Most school mathematics uses real numbers, so this chapter builds the language for algebra, geometry and measurement.",
    howItWorks: "Classify the number first, then use its exact value or an approximation to locate it on the number line.",
    levelContent: {
      simple: {
        summary: "Understand that every rational or irrational number has a place on the number line.",
        what: "A real number is any number you can mark on a number line. Whole numbers, fractions, decimals and numbers like $\\sqrt{2}$ are all real numbers.",
        whyItMatters: "Once numbers live on one line, we can compare them and see which is greater or smaller.",
        howItWorks: "Start at 0. Move right for positive numbers and left for negative numbers. Use fractions or decimal approximations for numbers between integers.",
        objectives: ["Identify real numbers.", "Place simple fractions and decimals on a number line.", "Compare numbers by their position."],
      },
      hard: {
        summary: "Connect the completeness of the number line with rational and irrational placement.",
        what: "The real number system fills the entire number line: rational numbers are dense, but irrational numbers are needed to represent lengths such as a unit-square diagonal.",
        whyItMatters: "This explains why geometry creates numbers that fractions alone cannot express.",
        howItWorks: "Use exact forms like $\\sqrt{n}$ when possible, and approximations only for locating or comparing.",
        objectives: ["Distinguish exact value from decimal approximation.", "Explain why rational numbers alone do not fill every geometric length.", "Represent irrational lengths on the number line."],
      },
    },
    objectives: ["Classify rational and irrational numbers.", "Represent real numbers on the number line.", "Compare real numbers using order."],
    visual: "number-line",
    content: [
      { type: "paragraph", text: "The real number system contains rational numbers such as $\\frac{3}{4}$ and irrational numbers such as $\\sqrt{2}$." },
      { type: "paragraph", text: "A number line gives each real number one position. Greater numbers lie to the right, smaller numbers lie to the left." },
    ],
    example: {
      problem: "Place $\\frac{5}{4}$ and $\\sqrt{2}$ roughly on a number line.",
      steps: ["$\\frac{5}{4}=1.25$, so it lies between 1 and 2.", "$\\sqrt{2}\\approx1.414$, so it also lies between 1 and 2.", "Since $1.414>1.25$, $\\sqrt{2}$ is to the right of $\\frac{5}{4}$."],
    },
    why: "Position on a number line turns comparison into geometry: the point farther right is the greater number.",
    commonMistake: "Do not assume an irrational number cannot be located. It may need an exact construction or an approximate mark.",
    tryIt: {
      question: "Which is greater: $\\frac{7}{5}$ or $\\sqrt{2}$?",
      solution: ["$\\frac{7}{5}=1.4$.", "$\\sqrt{2}\\approx1.414$.", "Therefore $\\sqrt{2}$ is slightly greater."],
    },
    status: "sample",
    estimatedMinutes: 12,
    jeeRelevance: "FOUNDATION",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "lesson-c9-number-rational-irrational",
    slug: "rational-and-irrational-numbers",
    title: "Rational and Irrational Numbers",
    order: 2,
    summary: "Separate numbers that can be written as fractions from numbers that cannot.",
    conceptTitle: "Rational and Irrational Numbers",
    what: "A rational number can be written as $\\frac{p}{q}$ where $p,q$ are integers and $q\\ne0$. An irrational number cannot be written in that form.",
    whyItMatters: "This classification helps students understand decimals, roots and exact values.",
    howItWorks: "Check whether the decimal terminates, repeats, or goes on without a repeating pattern.",
    levelContent: {
      simple: {
        summary: "Learn the difference between fraction-type numbers and non-repeating decimals.",
        what: "Rational numbers are numbers we can write as a fraction. Irrational numbers cannot be written exactly as a fraction.",
        whyItMatters: "It tells us whether a decimal has a neat repeating pattern.",
        howItWorks: "Terminating decimals and repeating decimals are rational. Non-terminating, non-repeating decimals are irrational.",
        objectives: ["Recognize terminating decimals.", "Recognize repeating decimals.", "Identify common irrational numbers."],
      },
      hard: {
        summary: "Use decimal expansion and contradiction-style reasoning to classify numbers.",
        what: "Rational numbers are exactly those with terminating or eventually repeating decimal expansions.",
        whyItMatters: "This bridges arithmetic representation with proof-oriented number theory.",
        howItWorks: "Convert fractions to decimals for rational examples, and use known irrational roots carefully without treating approximations as exact.",
        objectives: ["Classify from decimal expansion.", "Avoid proving irrationality from rounded decimals.", "Use exact notation for roots."],
      },
    },
    objectives: ["Define rational and irrational numbers.", "Classify common numbers correctly.", "Use decimal expansion as evidence."],
    visual: "number-line",
    content: [
      { type: "paragraph", text: "Numbers such as $-3$, $0.75$ and $0.\\overline{6}$ are rational because they can be written as fractions." },
      { type: "paragraph", text: "Numbers such as $\\sqrt{2}$ and $\\pi$ are irrational because their decimal expansions do not terminate or repeat." },
    ],
    example: {
      problem: "Classify $0.125$, $0.333\\ldots$ and $\\sqrt{5}$.",
      steps: ["$0.125=\\frac{1}{8}$, so it is rational.", "$0.333\\ldots=\\frac{1}{3}$, so it is rational.", "$\\sqrt{5}$ is irrational because 5 is not a perfect square."],
    },
    why: "Fraction form creates terminating or repeating decimal patterns; irrational numbers do not settle into such patterns.",
    commonMistake: "A long decimal is not automatically irrational. If it repeats, it is rational.",
    tryIt: {
      question: "Classify $2.75$ and $\\sqrt{7}$.",
      solution: ["$2.75=\\frac{11}{4}$, so it is rational.", "$\\sqrt{7}$ is irrational because 7 is not a perfect square."],
    },
    status: "sample",
    estimatedMinutes: 14,
    jeeRelevance: "FOUNDATION",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "lesson-c9-number-decimals",
    slug: "decimal-expansions",
    title: "Decimal Expansions",
    order: 3,
    summary: "Use terminating and recurring decimals to understand rational numbers.",
    objectives: ["Identify terminating decimals.", "Identify non-terminating recurring decimals.", "Connect decimal behavior to rational numbers."],
    visual: "number-line",
    content: [
      { type: "paragraph", text: "A decimal expansion can terminate, repeat forever, or continue without repetition." },
      { type: "list", items: ["Terminating: $0.25$", "Recurring: $0.\\overline{3}$", "Non-recurring: $1.414213\\ldots$"] },
    ],
    example: { problem: "What type of decimal is $\\frac{7}{8}$?", steps: ["Divide 7 by 8.", "$\\frac{7}{8}=0.875$.", "The decimal terminates, so the number is rational."] },
    why: "Decimal patterns give a quick way to recognize rational numbers.",
    commonMistake: "Do not round a recurring decimal and treat the rounded value as the exact number.",
    tryIt: { question: "Is $0.\\overline{27}$ rational?", solution: ["Yes. It repeats the block 27 forever.", "Every recurring decimal is rational."] },
    status: "sample",
    estimatedMinutes: 12,
    jeeRelevance: "FOUNDATION",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "lesson-c9-number-roots",
    slug: "square-roots-and-irrationality",
    title: "Square Roots and Irrationality",
    order: 4,
    summary: "Understand when square roots are rational and when they are irrational.",
    objectives: ["Identify perfect-square roots.", "Recognize irrational roots.", "Keep root values exact."],
    visual: "triangle",
    content: [
      { type: "paragraph", text: "If $n$ is a perfect square, $\\sqrt{n}$ is rational. If $n$ is not a perfect square, $\\sqrt{n}$ is irrational." },
      { type: "equation", math: "\\sqrt{9}=3, \\quad \\sqrt{10}\\text{ is irrational}" },
    ],
    example: { problem: "Classify $\\sqrt{49}$ and $\\sqrt{50}$.", steps: ["$49=7^2$, so $\\sqrt{49}=7$ is rational.", "50 is not a perfect square.", "Therefore $\\sqrt{50}$ is irrational."] },
    why: "Perfect squares reverse neatly under square root; non-perfect squares do not produce exact fractions.",
    commonMistake: "Do not write $\\sqrt{50}=7.07$ as exact. It is only an approximation.",
    tryIt: { question: "Is $\\sqrt{36}+\\sqrt{2}$ rational or irrational?", solution: ["$\\sqrt{36}=6$.", "$6+\\sqrt{2}$ is irrational because an irrational part remains."] },
    status: "sample",
    estimatedMinutes: 15,
    jeeRelevance: "FOUNDATION",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "lesson-c9-number-operations",
    slug: "operations-on-real-numbers",
    title: "Operations on Real Numbers",
    order: 5,
    summary: "Use properties of real numbers while simplifying expressions.",
    objectives: ["Apply closure for rational numbers.", "Simplify root expressions carefully.", "Use properties without changing value."],
    visual: "number-line",
    content: [
      { type: "paragraph", text: "Real numbers can be added, subtracted, multiplied and divided by non-zero real numbers." },
      { type: "paragraph", text: "When irrational numbers are involved, keep exact form until approximation is needed." },
    ],
    example: { problem: "Simplify $3\\sqrt{2}+5\\sqrt{2}$.", steps: ["Both terms contain the same irrational part $\\sqrt{2}$.", "Add the coefficients: $3+5=8$.", "So $3\\sqrt{2}+5\\sqrt{2}=8\\sqrt{2}$."] },
    why: "Like terms can be combined because the same number is being counted multiple times.",
    commonMistake: "Do not combine unlike roots: $\\sqrt{2}+\\sqrt{3}$ is not $\\sqrt{5}$.",
    tryIt: { question: "Simplify $7\\sqrt{3}-2\\sqrt{3}$.", solution: ["Subtract coefficients: $7-2=5$.", "The result is $5\\sqrt{3}$."] },
    status: "sample",
    estimatedMinutes: 15,
    jeeRelevance: "FOUNDATION",
    createdAt: now,
    updatedAt: now,
  },
];

const class9NumberSystemsPractice: PracticeQuestion[] = [
  {
    id: "q-c9-number-classify-terminating",
    slug: "classify-0-625",
    type: "Short Answer",
    difficulty: "Simple",
    topic: "Rational and Irrational Numbers",
    concept: "Terminating decimals",
    question: "Classify $0.625$ as rational or irrational.",
    answer: "Rational",
    hints: ["Check whether the decimal stops.", "A terminating decimal can be written as a fraction."],
    approach: ["Identify the decimal type.", "Convert it into fraction form if needed.", "Use the definition of rational number."],
    conceptReminder: "A number is rational if it can be written as $\\frac{p}{q}$, $q\\ne0$.",
    solutionSteps: ["$0.625$ is a terminating decimal.", "$0.625=\\frac{625}{1000}=\\frac{5}{8}$.", "Therefore it is rational."],
    finalAnswer: "Rational",
    explanation: "A terminating decimal always has a power of 10 in the denominator.",
    sourceType: "UKG_ORIGINAL",
  },
  {
    id: "q-c9-number-root-classification",
    slug: "classify-root-18",
    type: "Short Answer",
    difficulty: "Medium",
    topic: "Square Roots and Irrationality",
    concept: "Non-perfect square roots",
    question: "Classify $\\sqrt{18}$ as rational or irrational. Give a reason.",
    answer: "Irrational",
    hints: ["Check whether 18 is a perfect square.", "Simplify the root without rounding it."],
    approach: ["Factor the number under the square root.", "Look for a perfect-square factor.", "Decide whether an irrational root remains."],
    conceptReminder: "$\\sqrt{n}$ is irrational when $n$ is not a perfect square.",
    solutionSteps: ["$18=9\\times2$.", "$\\sqrt{18}=3\\sqrt{2}$.", "$\\sqrt{2}$ is irrational, so $3\\sqrt{2}$ is irrational."],
    finalAnswer: "Irrational",
    explanation: "Multiplying a non-zero rational number by $\\sqrt{2}$ does not make it rational.",
    sourceType: "UKG_ORIGINAL",
  },
  {
    id: "q-c9-number-compare-values",
    slug: "compare-7-by-5-and-root-2",
    type: "Numerical",
    difficulty: "Simple",
    topic: "Real Numbers and the Number Line",
    concept: "Comparison on number line",
    question: "Which is greater: $\\frac{7}{5}$ or $\\sqrt{2}$?",
    answer: "$\\sqrt{2}$",
    hints: ["Write $\\frac{7}{5}$ as a decimal.", "Use $\\sqrt{2}\\approx1.414$ for comparison."],
    approach: ["Estimate both values.", "Compare their positions on the number line.", "Select the larger value."],
    conceptReminder: "The greater real number lies farther right on the number line.",
    solutionSteps: ["$\\frac{7}{5}=1.4$.", "$\\sqrt{2}\\approx1.414$.", "Since $1.414>1.4$, $\\sqrt{2}$ is greater."],
    finalAnswer: "$\\sqrt{2}$",
    explanation: "A small decimal difference still changes the order on the number line.",
    sourceType: "UKG_ORIGINAL",
  },
  {
    id: "q-c9-number-recurring-decimal",
    slug: "is-0-27-recurring-rational",
    type: "MCQ",
    difficulty: "Medium",
    topic: "Decimal Expansions",
    concept: "Recurring decimals",
    question: "The number $0.\\overline{27}$ is:",
    options: ["Rational", "Irrational", "Neither real nor rational", "Only an integer"],
    answer: "Rational",
    hints: ["Look for a repeating block.", "Every recurring decimal is rational."],
    approach: ["Identify the repeating digits.", "Recall the decimal test for rational numbers.", "Choose the matching option."],
    conceptReminder: "Terminating and recurring decimals represent rational numbers.",
    solutionSteps: ["The block 27 repeats forever.", "A recurring decimal can be written as a fraction.", "Therefore $0.\\overline{27}$ is rational."],
    finalAnswer: "Rational",
    explanation: "Repeating structure is enough to express the number as a ratio of integers.",
    sourceType: "NCERT_ALIGNED",
  },
  {
    id: "q-c9-number-unlike-roots",
    slug: "simplify-root2-plus-root3",
    type: "Short Answer",
    difficulty: "Medium",
    topic: "Operations on Real Numbers",
    concept: "Like and unlike surds",
    question: "Can $\\sqrt{2}+\\sqrt{3}$ be simplified to $\\sqrt{5}$? Explain.",
    answer: "No",
    hints: ["Square roots do not distribute over addition.", "Test with approximate values if needed."],
    approach: ["Recall the rule for adding like roots.", "Check whether the irrational parts match.", "Explain why the proposed simplification changes the value."],
    conceptReminder: "Only like surds such as $3\\sqrt{2}+5\\sqrt{2}$ can be combined.",
    solutionSteps: ["$\\sqrt{2}$ and $\\sqrt{3}$ are unlike surds.", "They cannot be combined into one square root by addition.", "Also $\\sqrt{2}+\\sqrt{3}\\approx3.146$, while $\\sqrt{5}\\approx2.236$."],
    finalAnswer: "No, $\\sqrt{2}+\\sqrt{3}\\ne\\sqrt{5}$.",
    explanation: "The square-root operation does not distribute across addition.",
    commonMistakes: ["Writing $\\sqrt{a}+\\sqrt{b}=\\sqrt{a+b}$."],
    sourceType: "UKG_ORIGINAL",
  },
  {
    id: "q-c9-number-density",
    slug: "rational-between-two-rationals",
    type: "Short Answer",
    difficulty: "Hard",
    topic: "Real Numbers and the Number Line",
    concept: "Numbers between numbers",
    question: "Find one rational number between $\\frac{2}{3}$ and $\\frac{3}{4}$.",
    answer: "$\\frac{17}{24}$",
    hints: ["Use a common denominator.", "There may be many valid answers."],
    approach: ["Rewrite both fractions with a common denominator.", "Choose a numerator strictly between them.", "Verify the order."],
    conceptReminder: "There are infinitely many rational numbers between any two distinct rational numbers.",
    solutionSteps: ["Use denominator 24: $\\frac{2}{3}=\\frac{16}{24}$ and $\\frac{3}{4}=\\frac{18}{24}$.", "A fraction between them is $\\frac{17}{24}$.", "So $\\frac{16}{24}<\\frac{17}{24}<\\frac{18}{24}$."],
    finalAnswer: "$\\frac{17}{24}$",
    explanation: "A common denominator makes the order visible.",
    alternativeMethods: [{ title: "Average method", steps: ["Take the average: $\\frac{1}{2}\\left(\\frac{2}{3}+\\frac{3}{4}\\right)$.", "This equals $\\frac{1}{2}\\cdot\\frac{17}{12}=\\frac{17}{24}$.", "The average of two numbers lies between them."] }],
    sourceType: "CBSE_STYLE",
  },
  {
    id: "q-c9-number-surd-combination",
    slug: "simplify-surd-expression",
    type: "Numerical",
    difficulty: "Hard",
    topic: "Operations on Real Numbers",
    concept: "Surd simplification",
    question: "Simplify $2\\sqrt{12}+3\\sqrt{27}-\\sqrt{75}$.",
    answer: "$8\\sqrt{3}$",
    hints: ["Simplify each radical first.", "$\\sqrt{12}=2\\sqrt{3}$, $\\sqrt{27}=3\\sqrt{3}$ and $\\sqrt{75}=5\\sqrt{3}$."],
    approach: ["Break each number under the root into a perfect-square factor and another factor.", "Rewrite all terms as multiples of $\\sqrt{3}$.", "Combine coefficients."],
    conceptReminder: "Like surds can be combined by adding or subtracting coefficients.",
    solutionSteps: ["$2\\sqrt{12}=2\\cdot2\\sqrt{3}=4\\sqrt{3}$.", "$3\\sqrt{27}=3\\cdot3\\sqrt{3}=9\\sqrt{3}$.", "$\\sqrt{75}=5\\sqrt{3}$.", "So the expression is $(4+9-5)\\sqrt{3}=8\\sqrt{3}$."],
    finalAnswer: "$8\\sqrt{3}$",
    explanation: "After simplification, every term has the same irrational part.",
    sourceType: "EXEMPLAR_STYLE",
  },
];

const class9NumberSystemsChapterExtras: Pick<Chapter, "notes" | "workedExamples" | "ncertCompanion" | "revision"> = {
  notes: {
    definitions: ["Rational number: a number of the form $\\frac{p}{q}$ where $p,q$ are integers and $q\\ne0$.", "Irrational number: a real number that cannot be written as a ratio of two integers.", "Real numbers: rational and irrational numbers together."],
    keyConcepts: ["Every real number has a position on the number line.", "Terminating and recurring decimals are rational.", "Non-terminating, non-recurring decimals are irrational.", "Square roots of non-perfect squares are irrational."],
    formulas: ["$\\sqrt{ab}=\\sqrt{a}\\sqrt{b}$ for non-negative $a,b$.", "$a\\sqrt{x}+b\\sqrt{x}=(a+b)\\sqrt{x}$."],
    properties: ["Between any two distinct rational numbers there are infinitely many rational numbers.", "A non-zero rational multiple of an irrational number remains irrational in standard Class 9 cases."],
    commonMistakes: ["Treating rounded decimals as exact values.", "Writing $\\sqrt{a}+\\sqrt{b}=\\sqrt{a+b}$.", "Calling every long decimal irrational."],
    examReminders: ["Always give a reason when asked to classify a number.", "Use exact surd form unless a decimal approximation is requested."],
    quickRevision: ["Classify the number.", "Check the decimal behavior.", "Use number-line order for comparison.", "Simplify roots before combining terms."],
  },
  workedExamples: [
    {
      level: "Simple",
      title: "Basic Example",
      question: "Classify $\\frac{-11}{4}$.",
      thinking: "A number written directly as a fraction with a non-zero denominator is rational.",
      approach: ["Check numerator and denominator.", "Apply the definition."],
      steps: ["The numerator $-11$ and denominator $4$ are integers.", "The denominator is not zero.", "So the number is rational."],
      finalAnswer: "Rational",
      whyItWorks: "The definition of rational number is exactly fraction form.",
    },
    {
      level: "Medium",
      title: "Standard Example",
      question: "Simplify $5\\sqrt{8}-2\\sqrt{18}$.",
      thinking: "Both roots can be converted into multiples of $\\sqrt{2}$.",
      approach: ["Simplify each radical.", "Combine like surds."],
      steps: ["$\\sqrt{8}=2\\sqrt{2}$, so $5\\sqrt{8}=10\\sqrt{2}$.", "$\\sqrt{18}=3\\sqrt{2}$, so $2\\sqrt{18}=6\\sqrt{2}$.", "$10\\sqrt{2}-6\\sqrt{2}=4\\sqrt{2}$."],
      finalAnswer: "$4\\sqrt{2}$",
      whyItWorks: "After simplification both terms contain the same root part.",
    },
    {
      level: "Hard",
      title: "Challenge Example",
      question: "Find one irrational number between 2 and 3.",
      thinking: "Use square roots whose values are known to lie between 2 and 3.",
      approach: ["Square the boundary numbers.", "Choose a non-perfect square between those squares.", "Take its square root."],
      steps: ["$2^2=4$ and $3^2=9$.", "Choose 5, which lies between 4 and 9 and is not a perfect square.", "Then $2<\\sqrt{5}<3$ and $\\sqrt{5}$ is irrational."],
      finalAnswer: "$\\sqrt{5}$",
      whyItWorks: "The square-root function preserves order for positive numbers.",
    },
  ],
  ncertCompanion: {
    chapterContext: "Use this area beside the NCERT Class 9 Mathematics chapter on Number Systems. UKG Lab provides original concept support and solution thinking without reproducing textbook content.",
    conceptSupport: ["Rational versus irrational classification", "Decimal expansion of rational numbers", "Number-line representation", "Operations on real numbers and surds"],
    exerciseSupport: ["Before starting an exercise, identify whether it asks for classification, representation, comparison or simplification.", "For exercise questions involving roots, first check perfect-square factors."],
    questionSupport: ["Read the NCERT question from your book.", "Match it to the closest UKG Lab topic.", "Use hints first, then approach, then solution logic."],
  },
  revision: {
    keyConcepts: ["Real numbers include rational and irrational numbers.", "The number line can represent every real number.", "Decimal expansion reveals rationality.", "Surds must be simplified before combining."],
    formulae: ["$\\sqrt{ab}=\\sqrt{a}\\sqrt{b}$", "$a\\sqrt{x}+b\\sqrt{x}=(a+b)\\sqrt{x}$"],
    properties: ["Terminating decimal means rational.", "Recurring decimal means rational.", "Non-terminating non-recurring decimal means irrational."],
    diagrams: ["Number line for comparing real numbers", "Right-triangle construction for irrational roots"],
    commonMistakes: ["Combining unlike surds", "Dropping the repeating bar in recurring decimals", "Using a decimal approximation as an exact proof"],
    fiveMinuteRevision: ["Write definitions from memory.", "Classify five mixed numbers.", "Simplify two surd expressions.", "Compare two close real numbers.", "Solve one higher reasoning question."],
  },
};

const class9ChapterSeeds: Class9ChapterSeed[] = [
  {
    unitId: "unit-c9-number-system",
    branchSlug: "number-systems",
    order: 1,
    slug: "number-systems",
    title: "Number Systems",
    description: "Rational and irrational numbers, decimal expansions, number-line representation and real-number operations.",
    overview: "Number Systems builds the foundation for Class 9 Mathematics by helping students recognize, compare, represent and operate on real numbers.",
    topics: ["Real Numbers and the Number Line", "Rational and Irrational Numbers", "Decimal Expansions", "Square Roots and Irrationality", "Operations on Real Numbers"],
  },
  {
    unitId: "unit-c9-algebra",
    branchSlug: "algebra",
    order: 2,
    slug: "introduction-to-polynomials",
    title: "Introduction to Polynomials",
    description: "Variables, coefficients, degree, value of a polynomial and zeros.",
    overview: "Students begin algebraic structure through polynomial language, evaluation and simple identities.",
    topics: ["Polynomial vocabulary", "Degree and coefficients", "Value of a polynomial", "Zeros of a polynomial", "Basic polynomial operations"],
  },
  {
    unitId: "unit-c9-algebra",
    branchSlug: "algebra",
    order: 3,
    slug: "sequences-and-progressions",
    title: "Sequences and Progressions",
    description: "Patterns, terms, rules and introductory sequence reasoning where prescribed.",
    overview: "This chapter develops pattern recognition and rule formation for algebraic thinking.",
    topics: ["Patterns and terms", "Writing a rule", "Arithmetic pattern thinking", "Missing-term reasoning"],
  },
  {
    unitId: "unit-c9-algebra",
    branchSlug: "algebra",
    order: 4,
    slug: "exploring-algebraic-identities",
    title: "Exploring Algebraic Identities",
    description: "Algebraic identities, expansion and factorisation support for Class 9 problem solving.",
    overview: "Students learn identities as reusable structures rather than formulas to memorize.",
    topics: ["Identity versus equation", "Square identities", "Product identities", "Using identities for calculation", "Factorisation with identities"],
  },
  {
    unitId: "unit-c9-algebra",
    branchSlug: "algebra",
    order: 5,
    slug: "linear-equations-in-two-variables",
    title: "Linear Equations in Two Variables",
    description: "Equations of the form $ax+by+c=0$, solutions and graph representation.",
    overview: "This chapter connects algebraic equations with coordinate geometry and graphs.",
    topics: ["Two-variable equations", "Solutions as ordered pairs", "Graph of a linear equation", "Reading solutions from a graph"],
  },
  {
    unitId: "unit-c9-coordinate-geometry",
    branchSlug: "coordinate-geometry",
    order: 6,
    slug: "coordinate-geometry",
    title: "Coordinate Geometry",
    description: "Cartesian plane, axes, quadrants and plotting points.",
    overview: "Coordinate Geometry gives students a visual language for locating and interpreting points.",
    topics: ["Cartesian plane", "Coordinates of a point", "Quadrants", "Plotting points", "Reading positions"],
  },
  {
    unitId: "unit-c9-geometry",
    branchSlug: "geometry",
    order: 7,
    slug: "euclids-geometry-axioms-and-postulates",
    title: "Introduction to Euclid's Geometry: Axioms and Postulates",
    description: "Basic geometric terms, axioms, postulates and deductive reasoning.",
    overview: "This chapter introduces proof language and the logical structure of geometry.",
    topics: ["Undefined terms", "Axioms", "Postulates", "Logical reasoning in geometry"],
  },
  {
    unitId: "unit-c9-geometry",
    branchSlug: "geometry",
    order: 8,
    slug: "lines-and-angles",
    title: "Lines and Angles",
    description: "Angle pairs, parallel lines and transversal relationships.",
    overview: "Students learn angle relationships that power later geometry proofs.",
    topics: ["Intersecting lines", "Angle pairs", "Parallel lines", "Transversal angle properties"],
  },
  {
    unitId: "unit-c9-geometry",
    branchSlug: "geometry",
    order: 9,
    slug: "triangles-congruence-theorems",
    title: "Triangles - Congruence Theorems",
    description: "Congruence criteria and triangle reasoning.",
    overview: "This chapter develops proof-based thinking through congruent triangles.",
    topics: ["Triangle basics", "Congruence meaning", "SSS, SAS, ASA and RHS", "Using congruence in proofs"],
  },
  {
    unitId: "unit-c9-geometry",
    branchSlug: "geometry",
    order: 10,
    slug: "quadrilaterals",
    title: "Quadrilaterals",
    description: "Parallelogram properties and reasoning with four-sided figures.",
    overview: "Students study structured properties of quadrilaterals and use them in proofs.",
    topics: ["Types of quadrilaterals", "Parallelogram properties", "Midpoint theorem ideas", "Proof applications"],
  },
  {
    unitId: "unit-c9-geometry",
    branchSlug: "geometry",
    order: 11,
    slug: "circles",
    title: "Circles",
    description: "Circle parts, chords, arcs, angles and related geometric reasoning.",
    overview: "Circle geometry links symmetry, angle relationships and proof.",
    topics: ["Circle vocabulary", "Chords and arcs", "Angles in circles", "Cyclic reasoning"],
  },
  {
    unitId: "unit-c9-mensuration",
    branchSlug: "mensuration",
    order: 12,
    slug: "area-and-perimeter",
    title: "Area and Perimeter",
    description: "Measurement of plane figures and area reasoning where prescribed.",
    overview: "Students connect formulas with geometric meaning for plane measurement.",
    topics: ["Perimeter meaning", "Area meaning", "Triangle and quadrilateral area", "Composite figures"],
  },
  {
    unitId: "unit-c9-mensuration",
    branchSlug: "mensuration",
    order: 13,
    slug: "surface-area-and-volume",
    title: "Surface Area and Volume",
    description: "Surface area and volume of standard solids included in the Class 9 course.",
    overview: "This chapter builds 3D measurement sense for cubes, cuboids, cylinders, cones and spheres where prescribed.",
    topics: ["Surface area", "Volume", "Cuboids and cubes", "Cylinders, cones and spheres", "Unit conversion"],
  },
  {
    unitId: "unit-c9-statistics-probability",
    branchSlug: "statistics-probability",
    order: 14,
    slug: "statistics",
    title: "Statistics",
    description: "Data organization, presentation and measures of central tendency.",
    overview: "Statistics teaches students to organize data and draw careful conclusions.",
    topics: ["Raw and grouped data", "Frequency tables", "Graphs", "Mean, median and mode"],
  },
  {
    unitId: "unit-c9-statistics-probability",
    branchSlug: "statistics-probability",
    order: 15,
    slug: "introduction-to-probability",
    title: "Introduction to Probability",
    description: "Introductory chance, outcomes and simple probability reasoning.",
    overview: "Probability introduces students to uncertainty through outcomes and event likelihood.",
    topics: ["Experiments and outcomes", "Events", "Simple probability", "Interpreting probability values"],
  },
];

function class9TopicLesson(seed: Class9ChapterSeed, topicTitle: string, index: number): Lesson {
  const slug = topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    id: `lesson-c9-${seed.slug}-${slug}`,
    slug,
    title: topicTitle,
    order: index + 1,
    summary: `A focused Class 9 topic in ${seed.title}, ready for notes, examples and practice expansion.`,
    objectives: [`Understand ${topicTitle.toLowerCase()}.`, "Connect the idea with solved examples.", "Prepare for chapter practice and revision."],
    visual: seed.branchSlug === "geometry" ? "triangle" : seed.branchSlug === "coordinate-geometry" ? "curve" : "number-line",
    content: [{ type: "paragraph", text: `This topic belongs to the CBSE Class 9 ${seed.title} chapter. UKG Lab keeps this as an original lesson slot so complete teaching content can be added without changing React pages.` }],
    example: { problem: `Try a basic question from ${topicTitle}.`, steps: ["Identify the concept being tested.", "Write the given information clearly.", "Apply the relevant rule or property.", "Check that the result answers the question."] },
    why: `${topicTitle} supports the chapter's main mathematical reasoning.`,
    commonMistake: "Do not memorize a rule without checking when it applies.",
    tryIt: { question: `Write one fact you know about ${topicTitle}.`, solution: ["State the fact clearly.", "Add one example to confirm that you understand it."] },
    status: "planned",
    estimatedMinutes: 10,
    jeeRelevance: "FOUNDATION",
    createdAt: now,
    updatedAt: now,
  };
}

function class9Chapter(seed: Class9ChapterSeed): Chapter {
  const isNumberSystems = seed.slug === "number-systems";
  return {
    ...plannedChapter(9, seed.branchSlug, seed.order, seed.slug, seed.title, seed.description, seed.order <= 2 ? "Easy" : "Medium"),
    curriculumId: class9Curriculum.id,
    unitId: seed.unitId,
    overview: seed.overview,
    lessons: isNumberSystems ? class9NumberSystemsLessons : seed.topics.map((topic, index) => class9TopicLesson(seed, topic, index)),
    practice: isNumberSystems ? class9NumberSystemsPractice.map((question) => ({ ...question, curriculumId: class9Curriculum.id, unitId: seed.unitId, chapterId: seed.slug })) : [],
    formulas: seed.formulas ?? [],
    ...(isNumberSystems ? class9NumberSystemsChapterExtras : {}),
  };
}

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
    description: "Master Class 9 Mathematics with concept notes, worked examples, practice questions, hints, step-by-step solutions and chapter tests.",
    curriculum: class9Curriculum,
    chapters: class9ChapterSeeds.map(class9Chapter),
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
