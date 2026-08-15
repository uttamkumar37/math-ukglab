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
  { id: "branch-orienting-yourself-use-of-coordinates", name: "Orienting Yourself: The Use of Coordinates", slug: "orienting-yourself-use-of-coordinates", description: "Coordinate orientation from the 2026 NCERT Grade 9 Ganita Manjari textbook.", order: 1, identity: "coordinate", curriculumId: "cbse-ix-math-2026-27", unitNumber: 1, shortTitle: "Use of Coordinates" },
  { id: "branch-introduction-to-linear-polynomials", name: "Introduction to Linear Polynomials", slug: "introduction-to-linear-polynomials", description: "Linear polynomial chapter from the 2026 NCERT Grade 9 Ganita Manjari textbook.", order: 2, identity: "algebra", curriculumId: "cbse-ix-math-2026-27", unitNumber: 2, shortTitle: "Linear Polynomials" },
  { id: "branch-world-of-numbers", name: "The World of Numbers", slug: "world-of-numbers", description: "Number chapter from the 2026 NCERT Grade 9 Ganita Manjari textbook.", order: 3, identity: "numbers", curriculumId: "cbse-ix-math-2026-27", unitNumber: 3, shortTitle: "World of Numbers" },
  { id: "branch-exploring-algebraic-identities", name: "Exploring Algebraic Identities", slug: "exploring-algebraic-identities", description: "Algebraic identities chapter from the 2026 NCERT Grade 9 Ganita Manjari textbook.", order: 4, identity: "algebra", curriculumId: "cbse-ix-math-2026-27", unitNumber: 4, shortTitle: "Algebraic Identities" },
  { id: "branch-im-up-and-down-and-round-and-round", name: "I’m Up and Down, and Round and Round", slug: "im-up-and-down-and-round-and-round", description: "Geometry chapter from the 2026 NCERT Grade 9 Ganita Manjari textbook.", order: 5, identity: "geometry", curriculumId: "cbse-ix-math-2026-27", unitNumber: 5, shortTitle: "Up and Down" },
  { id: "branch-measuring-space-perimeter-and-area", name: "Measuring Space: Perimeter and Area", slug: "measuring-space-perimeter-and-area", description: "Perimeter and area chapter from the 2026 NCERT Grade 9 Ganita Manjari textbook.", order: 6, identity: "mensuration", curriculumId: "cbse-ix-math-2026-27", unitNumber: 6, shortTitle: "Perimeter and Area" },
  { id: "branch-introduction-to-probability", name: "The Mathematics of Maybe: Introduction to Probability", slug: "introduction-to-probability", description: "Probability chapter from the 2026 NCERT Grade 9 Ganita Manjari textbook.", order: 7, identity: "statistics", curriculumId: "cbse-ix-math-2026-27", unitNumber: 7, shortTitle: "Probability" },
  { id: "branch-sequences-and-progressions", name: "Predicting What Comes Next: Exploring Sequences and Progressions", slug: "sequences-and-progressions", description: "Sequences and progressions chapter from the 2026 NCERT Grade 9 Ganita Manjari textbook.", order: 8, identity: "algebra", curriculumId: "cbse-ix-math-2026-27", unitNumber: 8, shortTitle: "Sequences" },
  { id: "branch-real-numbers", name: "Real Numbers", slug: "real-numbers", description: "Real numbers and divisibility.", order: 1, identity: "numbers" },
  { id: "branch-polynomials", name: "Polynomials", slug: "polynomials", description: "Polynomial expressions and equations.", order: 2, identity: "algebra" },
  { id: "branch-pair-of-linear-equations-in-two-variables", name: "Pair of Linear Equations in Two Variables", slug: "pair-of-linear-equations-in-two-variables", description: "Linear equation pairs in two variables.", order: 3, identity: "algebra" },
  { id: "branch-quadratic-equations", name: "Quadratic Equations", slug: "quadratic-equations", description: "Quadratic equations and solution methods.", order: 4, identity: "algebra" },
  { id: "branch-arithmetic-progressions", name: "Arithmetic Progressions", slug: "arithmetic-progressions", description: "Arithmetic sequences and sums.", order: 5, identity: "algebra" },
  { id: "branch-triangles", name: "Triangles", slug: "triangles", description: "Triangle similarity and geometry.", order: 6, identity: "geometry" },
  { id: "branch-coordinate-geometry", name: "Coordinate Geometry", slug: "coordinate-geometry", description: "Coordinate plane geometry.", order: 7, identity: "coordinate" },
  { id: "branch-introduction-to-trigonometry", name: "Introduction to Trigonometry", slug: "introduction-to-trigonometry", description: "Trigonometric ratios and identities.", order: 8, identity: "trigonometry" },
  { id: "branch-some-applications-of-trigonometry", name: "Some Applications of Trigonometry", slug: "some-applications-of-trigonometry", description: "Heights, distances and trigonometric applications.", order: 9, identity: "trigonometry" },
  { id: "branch-circles", name: "Circles", slug: "circles", description: "Circle geometry.", order: 10, identity: "geometry" },
  { id: "branch-areas-related-to-circles", name: "Areas Related to Circles", slug: "areas-related-to-circles", description: "Areas of circular regions.", order: 11, identity: "mensuration" },
  { id: "branch-surface-areas-and-volumes", name: "Surface Areas and Volumes", slug: "surface-areas-and-volumes", description: "Surface area and volume of solids.", order: 12, identity: "mensuration" },
  { id: "branch-statistics", name: "Statistics", slug: "statistics", description: "Data representation and measures.", order: 13, identity: "statistics" },
  { id: "branch-probability", name: "Probability", slug: "probability", description: "Chance and probability.", order: 14, identity: "statistics" },
  { id: "branch-sets", name: "Sets", slug: "sets", description: "Sets and set operations.", order: 1, identity: "sets" },
  { id: "branch-relations-and-functions", name: "Relations and Functions", slug: "relations-and-functions", description: "Relations, functions, domains and ranges.", order: 2, identity: "sets" },
  { id: "branch-trigonometric-functions", name: "Trigonometric Functions", slug: "trigonometric-functions", description: "Trigonometric functions and identities.", order: 3, identity: "trigonometry" },
  { id: "branch-complex-numbers-and-quadratic-equations", name: "Complex Numbers and Quadratic Equations", slug: "complex-numbers-and-quadratic-equations", description: "Complex numbers and quadratic equations.", order: 4, identity: "algebra" },
  { id: "branch-linear-inequalities", name: "Linear Inequalities", slug: "linear-inequalities", description: "Linear inequalities and solution regions.", order: 5, identity: "algebra" },
  { id: "branch-permutations-and-combinations", name: "Permutations and Combinations", slug: "permutations-and-combinations", description: "Counting arrangements and selections.", order: 6, identity: "algebra" },
  { id: "branch-binomial-theorem", name: "Binomial Theorem", slug: "binomial-theorem", description: "Binomial expansions.", order: 7, identity: "algebra" },
  { id: "branch-sequences-and-series", name: "Sequences and Series", slug: "sequences-and-series", description: "Sequences and series.", order: 8, identity: "algebra" },
  { id: "branch-straight-lines", name: "Straight Lines", slug: "straight-lines", description: "Coordinate geometry of lines.", order: 9, identity: "coordinate" },
  { id: "branch-conic-sections", name: "Conic Sections", slug: "conic-sections", description: "Circle, parabola, ellipse and hyperbola.", order: 10, identity: "coordinate" },
  { id: "branch-introduction-to-three-dimensional-geometry", name: "Introduction to Three Dimensional Geometry", slug: "introduction-to-three-dimensional-geometry", description: "Three dimensional coordinates.", order: 11, identity: "coordinate" },
  { id: "branch-limits-and-derivatives", name: "Limits and Derivatives", slug: "limits-and-derivatives", description: "Limits and introductory derivatives.", order: 12, identity: "calculus" },
  { id: "branch-inverse-trigonometric-functions", name: "Inverse Trigonometric Functions", slug: "inverse-trigonometric-functions", description: "Inverse trigonometric functions.", order: 2, identity: "trigonometry" },
  { id: "branch-matrices", name: "Matrices", slug: "matrices", description: "Matrix operations.", order: 3, identity: "algebra" },
  { id: "branch-determinants", name: "Determinants", slug: "determinants", description: "Determinants and applications.", order: 4, identity: "algebra" },
  { id: "branch-continuity-and-differentiability", name: "Continuity and Differentiability", slug: "continuity-and-differentiability", description: "Continuity and differentiability.", order: 5, identity: "calculus" },
  { id: "branch-application-of-derivatives", name: "Application of Derivatives", slug: "application-of-derivatives", description: "Applications of derivatives.", order: 6, identity: "calculus" },
  { id: "branch-integrals", name: "Integrals", slug: "integrals", description: "Indefinite and definite integrals.", order: 7, identity: "calculus" },
  { id: "branch-application-of-integrals", name: "Application of Integrals", slug: "application-of-integrals", description: "Applications of integration.", order: 8, identity: "calculus" },
  { id: "branch-differential-equations", name: "Differential Equations", slug: "differential-equations", description: "Differential equations.", order: 9, identity: "calculus" },
  { id: "branch-vector-algebra", name: "Vector Algebra", slug: "vector-algebra", description: "Vectors and vector algebra.", order: 10, identity: "coordinate" },
  { id: "branch-three-dimensional-geometry", name: "Three Dimensional Geometry", slug: "three-dimensional-geometry", description: "Three dimensional geometry.", order: 11, identity: "coordinate" },
  { id: "branch-linear-programming", name: "Linear Programming", slug: "linear-programming", description: "Linear programming.", order: 12, identity: "algebra" },
];

const formulas: Formula[] = [
  {
    id: "formula-c10-real-euclidean",
    slug: "euclidean-division-form",
    title: "Euclidean Division Form",
    statement: "a = bq + r, \\quad 0 \\le r < b",
    note: "Used to express division with quotient and remainder.",
    classLevel: 10,
    branchSlug: "real-numbers",
    chapterSlug: "real-numbers",
  },
  {
    id: "formula-c10-quadratic",
    slug: "quadratic-formula",
    title: "Quadratic Formula",
    statement: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    note: "Used to solve $ax^2 + bx + c = 0$ when $a \\ne 0$.",
    classLevel: 10,
    branchSlug: "quadratic-equations",
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
    sourceLabel: "NCERT Ganita Manjari - Textbook of Mathematics for Grade 9, Part I, First Edition April 2026",
    sourceUrl: "https://ncert.nic.in/textbook/pdf/iemh1ps.pdf",
  },
  {
    id: "cbse-x-math-ncert-current",
    board: "CBSE",
    academicYear: "2026-27",
    classLevel: 10,
    subject: "Mathematics",
    version: "ncert-current-main-chapters-v1",
    status: "active",
    sourceLabel: "NCERT Mathematics Textbook for Class X",
    sourceUrl: "https://ncert.nic.in/textbook/pdf/jemh1ps.pdf",
  },
  {
    id: "cbse-xi-math-ncert-current",
    board: "CBSE",
    academicYear: "2026-27",
    classLevel: 11,
    subject: "Mathematics",
    version: "ncert-current-main-chapters-v1",
    status: "active",
    sourceLabel: "NCERT Mathematics Textbook for Class XI",
    sourceUrl: "https://ncert.nic.in/textbook/pdf/kemh1ps.pdf",
  },
  {
    id: "cbse-xii-math-ncert-current",
    board: "CBSE",
    academicYear: "2026-27",
    classLevel: 12,
    subject: "Mathematics",
    version: "ncert-current-main-chapters-v1",
    status: "active",
    sourceLabel: "NCERT Mathematics Textbook for Class XII, Parts I and II",
    sourceUrl: "https://ncert.nic.in/textbook/pdf/lemh1ps.pdf",
  },
];

const class9Curriculum = curricula[0];
const class10Curriculum = curricula[1];
const class11Curriculum = curricula[2];
const class12Curriculum = curricula[3];

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
    unitId: "unit-c9-orienting-yourself-use-of-coordinates",
    branchSlug: "orienting-yourself-use-of-coordinates",
    order: 1,
    slug: "orienting-yourself-use-of-coordinates",
    title: "Orienting Yourself: The Use of Coordinates",
    description: "Official NCERT Grade 9 Ganita Manjari chapter on using coordinates to orient and locate positions.",
    overview: "This chapter follows the 2026 NCERT Grade 9 Ganita Manjari sequence and introduces coordinates as the first Class 9 Mathematics chapter.",
    topics: [],
  },
  {
    unitId: "unit-c9-introduction-to-linear-polynomials",
    branchSlug: "introduction-to-linear-polynomials",
    order: 2,
    slug: "introduction-to-linear-polynomials",
    title: "Introduction to Linear Polynomials",
    description: "Official NCERT Grade 9 Ganita Manjari chapter introducing linear polynomials.",
    overview: "This chapter follows the 2026 NCERT Grade 9 Ganita Manjari sequence and introduces linear polynomial thinking.",
    topics: [],
  },
  {
    unitId: "unit-c9-world-of-numbers",
    branchSlug: "world-of-numbers",
    order: 3,
    slug: "world-of-numbers",
    title: "The World of Numbers",
    description: "Official NCERT Grade 9 Ganita Manjari chapter on the world of numbers.",
    overview: "This chapter follows the 2026 NCERT Grade 9 Ganita Manjari sequence and carries the current NCERT number chapter title.",
    topics: [],
  },
  {
    unitId: "unit-c9-exploring-algebraic-identities",
    branchSlug: "exploring-algebraic-identities",
    order: 4,
    slug: "exploring-algebraic-identities",
    title: "Exploring Algebraic Identities",
    description: "Official NCERT Grade 9 Ganita Manjari chapter on exploring algebraic identities.",
    overview: "This chapter follows the 2026 NCERT Grade 9 Ganita Manjari sequence and keeps the NCERT chapter title intact.",
    topics: [],
  },
  {
    unitId: "unit-c9-im-up-and-down-and-round-and-round",
    branchSlug: "im-up-and-down-and-round-and-round",
    order: 5,
    slug: "im-up-and-down-and-round-and-round",
    title: "I’m Up and Down, and Round and Round",
    description: "Official NCERT Grade 9 Ganita Manjari chapter with the current Grade 9 geometry title.",
    overview: "This chapter follows the 2026 NCERT Grade 9 Ganita Manjari sequence and replaces older standalone geometry chapter names.",
    topics: [],
  },
  {
    unitId: "unit-c9-measuring-space-perimeter-and-area",
    branchSlug: "measuring-space-perimeter-and-area",
    order: 6,
    slug: "measuring-space-perimeter-and-area",
    title: "Measuring Space: Perimeter and Area",
    description: "Official NCERT Grade 9 Ganita Manjari chapter on perimeter and area.",
    overview: "This chapter follows the 2026 NCERT Grade 9 Ganita Manjari sequence for measurement of space.",
    topics: [],
  },
  {
    unitId: "unit-c9-introduction-to-probability",
    branchSlug: "introduction-to-probability",
    order: 7,
    slug: "introduction-to-probability",
    title: "The Mathematics of Maybe: Introduction to Probability",
    description: "Official NCERT Grade 9 Ganita Manjari chapter introducing probability.",
    overview: "This chapter follows the 2026 NCERT Grade 9 Ganita Manjari sequence and carries the current NCERT probability title.",
    topics: [],
  },
  {
    unitId: "unit-c9-sequences-and-progressions",
    branchSlug: "sequences-and-progressions",
    order: 8,
    slug: "sequences-and-progressions",
    title: "Predicting What Comes Next: Exploring Sequences and Progressions",
    description: "Official NCERT Grade 9 Ganita Manjari chapter on sequences and progressions.",
    overview: "This chapter follows the 2026 NCERT Grade 9 Ganita Manjari sequence and keeps the current final chapter title.",
    topics: [],
  },
];

function class9TopicLesson(seed: Class9ChapterSeed, topicTitle: string, index: number): Lesson {
  const slug = topicTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const chapterContext = `${seed.title} develops ${seed.description.toLowerCase()}`;
  const topicLower = topicTitle.toLowerCase();

  return {
    id: `lesson-c9-${seed.slug}-${slug}`,
    slug,
    title: topicTitle,
    order: index + 1,
    summary: `Learn ${topicTitle} through meaning, method, a worked example and a quick self-check.`,
    conceptTitle: topicTitle,
    what: `${topicTitle} is one of the key ideas inside ${seed.title}. It helps you name the object or relation correctly before solving.`,
    whyItMatters: `${topicTitle} supports the main reasoning of ${seed.title}: ${seed.overview}`,
    howItWorks: "Read the given information, identify the mathematical object, choose the relevant property or representation, then verify the result against the question.",
    levelContent: {
      simple: {
        summary: `Build a clear first understanding of ${topicTitle}.`,
        what: `Think of ${topicTitle} as a named idea in ${seed.title}. First learn what it means, then use one small example.`,
        whyItMatters: "Clear meaning prevents formula memorisation and makes later questions easier.",
        howItWorks: "Underline the given terms, draw or write a small representation, then apply the rule step by step.",
        objectives: [`Say what ${topicLower} means.`, `Recognize ${topicLower} in a simple question.`, "Solve one basic example without skipping steps."],
      },
      hard: {
        summary: `Use ${topicTitle} in deeper reasoning and mixed Class 9 questions.`,
        what: `${topicTitle} becomes powerful when you connect the definition with diagrams, expressions, conditions or data from the chapter.`,
        whyItMatters: "Harder questions often hide the concept inside a statement, graph, expression or figure.",
        howItWorks: "Identify the condition that makes the concept valid, translate it into mathematical language, solve, then justify why the answer follows.",
        objectives: [`Use ${topicLower} in a mixed problem.`, "State the condition or property being used.", "Check the final answer with reasoning, not only calculation."],
      },
    },
    objectives: [`Understand ${topicLower}.`, "Connect the idea with solved examples.", "Use the idea in practice and revision."],
    visual: seed.branchSlug === "geometry" ? "triangle" : seed.branchSlug === "coordinate-geometry" ? "curve" : "number-line",
    content: [
      { type: "paragraph", text: chapterContext },
      { type: "paragraph", text: `For ${topicTitle}, first separate the definition from the method. The definition tells you what the object is; the method tells you how to work with it.` },
      { type: "list", items: ["Identify the given information.", "Choose the matching definition, formula, diagram or property.", "Solve one step at a time.", "Check whether the result answers the exact question."] },
    ],
    example: {
      problem: `A question asks you to use ${topicTitle}. What should you do first?`,
      steps: [
        `Write the meaning of ${topicTitle} in your own words.`,
        "Mark the given values, terms, points or conditions.",
        "Select the property or representation that matches the condition.",
        "Complete the calculation or reasoning and verify the answer.",
      ],
    },
    why: `${topicTitle} supports ${seed.title} because it turns a broad chapter idea into a usable solving step.`,
    commonMistake: "Do not apply a formula or property before checking that its conditions match the question.",
    tryIt: {
      question: `Create a two-line solution plan for a question on ${topicTitle}.`,
      solution: [
        `Line 1: Identify what ${topicTitle} means in the question.`,
        "Line 2: State the property, formula, diagram or calculation you will use.",
      ],
    },
    status: "sample",
    estimatedMinutes: 10,
    jeeRelevance: "FOUNDATION",
    createdAt: now,
    updatedAt: now,
  };
}

function createClass9ChapterPractice(seed: Class9ChapterSeed): PracticeQuestion[] {
  const primaryTopic = seed.topics[0];
  const middleTopic = seed.topics[Math.floor(seed.topics.length / 2)] ?? primaryTopic;
  const finalTopic = seed.topics[seed.topics.length - 1] ?? primaryTopic;
  const baseSlug = seed.slug;

  return [
    {
      id: `q-c9-${baseSlug}-basic-concept`,
      slug: `${baseSlug}-basic-concept-check`,
      type: "Short Answer",
      difficulty: "Simple",
      topic: primaryTopic,
      concept: primaryTopic,
      question: `In ${seed.title}, explain the idea of ${primaryTopic} in one clear sentence.`,
      answer: `A correct answer defines ${primaryTopic} clearly and connects it to ${seed.title}.`,
      hints: [`Start with the meaning of ${primaryTopic}.`, `Mention how it is used in ${seed.title}.`],
      hintsByLevel: {
        simple: [`Write: "${primaryTopic} means..."`, "Add one small example or representation."],
        hard: ["State the definition and one condition under which it is valid."],
      },
      approach: ["Recall the definition.", "Use precise mathematical words.", "Add one example, diagram idea or condition."],
      conceptReminder: `${seed.title}: ${seed.description}`,
      solutionSteps: [`${primaryTopic} should be defined before using a formula or property.`, `A good answer connects the definition to ${seed.title}.`, "The final sentence should be specific, not memorised wording."],
      finalAnswer: `Define ${primaryTopic} and connect it to ${seed.title}.`,
      explanation: "Concept-first answers show understanding before calculation.",
      sourceType: "UKG_ORIGINAL",
      curriculumId: class9Curriculum.id,
      unitId: seed.unitId,
      chapterId: seed.slug,
    },
    {
      id: `q-c9-${baseSlug}-method-order`,
      slug: `${baseSlug}-method-order`,
      type: "MCQ",
      difficulty: "Medium",
      topic: middleTopic,
      concept: "Solution approach",
      question: `Which is the best first step for a Class 9 question on ${middleTopic}?`,
      options: [
        "Apply a formula immediately without reading the conditions",
        "Identify the given information and the concept being tested",
        "Copy the final answer from memory",
        "Skip the diagram, table or expression even when the question needs it",
      ],
      answer: "Identify the given information and the concept being tested",
      hints: ["The first step should reduce confusion.", "A formula works only after you know what is given and what is asked."],
      hintsByLevel: {
        simple: ["Look for the option that asks you to read the question carefully first.", "Avoid options that say to skip reasoning."],
        hard: ["Choose the step that makes later justification possible."],
      },
      approach: ["Compare each option with concept-first learning.", "Reject options that skip conditions or reasoning.", "Pick the option that prepares a valid solution."],
      conceptReminder: "In mathematics, the method depends on the conditions in the question.",
      solutionSteps: ["The best first step is to identify the given information and the concept being tested.", "Only then should you select a formula, property, theorem, graph or calculation.", "This prevents applying a correct rule in the wrong situation."],
      finalAnswer: "Identify the given information and the concept being tested",
      explanation: "This approach keeps the solution connected to the question instead of relying on memorisation.",
      sourceType: "CBSE_STYLE",
      curriculumId: class9Curriculum.id,
      unitId: seed.unitId,
      chapterId: seed.slug,
    },
    {
      id: `q-c9-${baseSlug}-reasoning-check`,
      slug: `${baseSlug}-reasoning-check`,
      type: "Long Answer",
      difficulty: "Hard",
      topic: finalTopic,
      concept: "Reasoning and verification",
      question: `A student solved a ${seed.title} problem on ${finalTopic} but did not check any condition. Write a better solution approach.`,
      answer: "Identify the concept, check conditions, apply the correct property or formula, and verify the result.",
      hints: ["Mention the concept first.", "Then mention the condition or property.", "End with verification."],
      hintsByLevel: {
        simple: ["Use three words: identify, apply, verify.", "Add the topic name in the first line."],
        medium: ["Explain why the condition must be checked before solving."],
        hard: ["Include how the final answer should be justified in words."],
      },
      approach: ["Name the concept involved.", "List the given information and condition.", "Apply the relevant mathematical property.", "Verify that the result answers the question."],
      conceptReminder: `${finalTopic} should be used with its matching definition, diagram, expression or property.`,
      solutionSteps: [
        `First identify that the question belongs to ${finalTopic}.`,
        "Write down the given information and the required result.",
        "Check the condition that allows the selected formula, theorem, graph or property to be used.",
        "Solve step by step and verify the final statement.",
      ],
      finalAnswer: "Identify the concept, check conditions, apply the correct method, and verify.",
      explanation: "A complete Class 9 solution is not only an answer; it also explains why the answer follows.",
      commonMistakes: ["Using a formula before checking whether it applies.", "Writing only the final result without reasoning."],
      sourceType: "UKG_ORIGINAL",
      curriculumId: class9Curriculum.id,
      unitId: seed.unitId,
      chapterId: seed.slug,
    },
  ];
}

function createClass9ChapterExtras(seed: Class9ChapterSeed): Pick<Chapter, "notes" | "workedExamples" | "ncertCompanion" | "revision"> {
  const firstTopic = seed.topics[0];
  const secondTopic = seed.topics[1] ?? firstTopic;
  const finalTopic = seed.topics[seed.topics.length - 1] ?? firstTopic;

  return {
    notes: {
      definitions: seed.topics.slice(0, 4).map((topic) => `${topic}: a core idea used in ${seed.title} for identifying, representing or solving chapter questions.`),
      keyConcepts: [`${seed.title} is about ${seed.description}`, ...seed.topics.slice(0, 5).map((topic) => `Learn ${topic} by connecting its meaning with one solved example.`)],
      formulas: seed.formulas?.length ? seed.formulas.map((formula) => `${formula.title}: $${formula.statement}$`) : ["Use the chapter definition, diagram, property or representation before choosing a formula."],
      properties: [`Always check the condition before applying a rule in ${seed.title}.`, "A clear diagram, expression, table or labelled figure often prevents mistakes."],
      commonMistakes: ["Starting from memorised steps without reading what is given.", `Confusing ${firstTopic} with ${secondTopic}.`, "Skipping the verification line in a reasoning question."],
      examReminders: ["Write the concept name before the calculation when the question asks for explanation.", "Use exact mathematical language and avoid unsupported shortcuts."],
      quickRevision: seed.topics.slice(0, 5).map((topic) => `Revise ${topic} with one definition and one example.`),
    },
    workedExamples: [
      {
        level: "Simple",
        title: "Concept Check",
        question: `Explain ${firstTopic} in the context of ${seed.title}.`,
        thinking: "Start with the definition before using a formula or method.",
        approach: ["Name the idea.", "Connect it to the chapter.", "Give one small example or representation."],
        steps: [`${firstTopic} is one of the first ideas in ${seed.title}.`, `It helps with ${seed.description.toLowerCase()}`, "A complete answer states meaning plus use."],
        finalAnswer: `${firstTopic} is a key concept in ${seed.title} and should be used with its definition and condition.`,
        whyItWorks: "The explanation shows meaning before method.",
      },
      {
        level: "Medium",
        title: "Method Example",
        question: `How should you approach a question on ${secondTopic}?`,
        thinking: "A good method identifies given information, selects the right property, then checks the answer.",
        approach: ["Read the question.", "Mark the concept and givens.", "Apply the matching method.", "Verify the result."],
        steps: [`Identify ${secondTopic}.`, "Write the known information clearly.", "Use the correct definition, formula, diagram or theorem.", "Check whether the result matches the question."],
        finalAnswer: "Identify, apply, verify.",
        whyItWorks: "The method protects against using the right rule in the wrong place.",
      },
    ],
    ncertCompanion: {
      chapterContext: `Use this UKG Lab chapter beside your CBSE Class 9 ${seed.title} study. The explanations are original and focus on concept clarity, examples, practice and revision.`,
      conceptSupport: seed.topics.slice(0, 5).map((topic) => `${topic}: definition, example and common mistake support.`),
      exerciseSupport: ["Read the exercise question, identify the topic, then open the matching UKG Lab topic before solving.", "Use hints first and view the full solution only after trying."],
      questionSupport: ["Match the question to the nearest topic.", "Write the given information.", "Use approach steps before checking the final solution."],
    },
    revision: {
      keyConcepts: seed.topics.slice(0, 5),
      formulae: seed.formulas?.length ? seed.formulas.map((formula) => `$${formula.statement}$`) : ["Definition + condition + method + verification"],
      properties: [`Main chapter idea: ${seed.overview}`, "Every solution should show why the chosen method applies."],
      diagrams: ["Use a labelled diagram, graph, table, expression or figure whenever it makes the concept visible."],
      commonMistakes: ["Skipping definitions", "Using formulas without conditions", "Writing unsupported final answers"],
      fiveMinuteRevision: [`Define ${firstTopic}.`, `Solve one question from ${secondTopic}.`, `State one common mistake in ${finalTopic}.`, "Review one worked example.", "Try one practice question."],
    },
  };
}

function class9Chapter(seed: Class9ChapterSeed): Chapter {
  const hasTopics = seed.topics.length > 0;
  const isNumberSystems = seed.slug === "number-systems" && hasTopics;
  const generatedExtras = hasTopics && !isNumberSystems ? createClass9ChapterExtras(seed) : undefined;
  return {
    ...plannedChapter(9, seed.branchSlug, seed.order, seed.slug, seed.title, seed.description, seed.order <= 2 ? "Easy" : "Medium"),
    curriculumId: class9Curriculum.id,
    unitId: seed.unitId,
    overview: seed.overview,
    lessons: isNumberSystems ? class9NumberSystemsLessons : hasTopics ? seed.topics.map((topic, index) => class9TopicLesson(seed, topic, index)) : [],
    practice: isNumberSystems ? class9NumberSystemsPractice.map((question) => ({ ...question, curriculumId: class9Curriculum.id, unitId: seed.unitId, chapterId: seed.slug })) : hasTopics ? createClass9ChapterPractice(seed) : [],
    formulas: seed.formulas ?? [],
    ...(isNumberSystems ? class9NumberSystemsChapterExtras : generatedExtras ?? {}),
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
    overview: "This chapter is part of the structured CBSE Mathematics roadmap with concept learning, examples, practice and revision support.",
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
    description: "Study the current NCERT Grade 9 Mathematics chapter sequence from Ganita Manjari.",
    curriculum: class9Curriculum,
    chapters: class9ChapterSeeds.map(class9Chapter),
  },
  {
    level: 10,
    slug: "class-10",
    title: "CBSE Class 10 Mathematics",
    promise: "Master the Boards",
    description: "Prepare for board-level mathematics through concepts, examples, practice and chapter tests.",
    curriculum: class10Curriculum,
    chapters: [
      {
        ...plannedChapter(10, "real-numbers", 1, "real-numbers", "Real Numbers", "Euclidean division, HCF, irrationality and decimal expansion.", "Easy"),
        curriculumId: class10Curriculum.id,
        unitId: "unit-c10-real-numbers",
        overview: "Real Numbers connects divisibility, HCF, primes and decimal expansion. It is a foundation chapter for proof-oriented mathematical thinking.",
        lessons: [euclideanLesson],
        practice: realNumbersPractice,
        formulas: [formulas[0]],
      },
      { ...plannedChapter(10, "polynomials", 2, "polynomials", "Polynomials", "Zeros of polynomials and relationships between roots and coefficients.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-polynomials" },
      { ...plannedChapter(10, "pair-of-linear-equations-in-two-variables", 3, "pair-of-linear-equations-in-two-variables", "Pair of Linear Equations in Two Variables", "Graphical and algebraic methods for two-variable equations.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-pair-of-linear-equations-in-two-variables" },
      {
        ...plannedChapter(10, "quadratic-equations", 4, "quadratic-equations", "Quadratic Equations", "Factorisation, completing the square and formula-based solving.", "Medium"),
        curriculumId: class10Curriculum.id,
        unitId: "unit-c10-quadratic-equations",
        examLevels: ["jee-main", "jee-advanced"],
        lessons: [quadraticLesson],
        practice: quadraticPractice,
        formulas: [formulas[1]],
      },
      { ...plannedChapter(10, "arithmetic-progressions", 5, "arithmetic-progressions", "Arithmetic Progressions", "Arithmetic progressions and sums.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-arithmetic-progressions" },
      { ...plannedChapter(10, "triangles", 6, "triangles", "Triangles", "Triangle similarity and geometric reasoning.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-triangles" },
      { ...plannedChapter(10, "coordinate-geometry", 7, "coordinate-geometry", "Coordinate Geometry", "Coordinate geometry in the plane.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-coordinate-geometry" },
      { ...plannedChapter(10, "introduction-to-trigonometry", 8, "introduction-to-trigonometry", "Introduction to Trigonometry", "Trigonometric ratios and identities.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-introduction-to-trigonometry" },
      { ...plannedChapter(10, "some-applications-of-trigonometry", 9, "some-applications-of-trigonometry", "Some Applications of Trigonometry", "Heights, distances and applications of trigonometry.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-some-applications-of-trigonometry" },
      { ...plannedChapter(10, "circles", 10, "circles", "Circles", "Circle geometry.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-circles" },
      { ...plannedChapter(10, "areas-related-to-circles", 11, "areas-related-to-circles", "Areas Related to Circles", "Areas of sectors, segments and circular regions.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-areas-related-to-circles" },
      { ...plannedChapter(10, "surface-areas-and-volumes", 12, "surface-areas-and-volumes", "Surface Areas and Volumes", "Surface area and volume of standard solids.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-surface-areas-and-volumes" },
      { ...plannedChapter(10, "statistics", 13, "statistics", "Statistics", "Data handling and measures of central tendency.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-statistics" },
      { ...plannedChapter(10, "probability", 14, "probability", "Probability", "Introductory probability.", "Medium"), curriculumId: class10Curriculum.id, unitId: "unit-c10-probability" },
    ],
  },
  {
    level: 11,
    slug: "class-11",
    title: "CBSE Class 11 Mathematics",
    promise: "Strengthen Advanced Concepts",
    description: "Develop deeper algebra, trigonometry, coordinate geometry, limits and probability foundations.",
    curriculum: class11Curriculum,
    chapters: [
      { ...plannedChapter(11, "sets", 1, "sets", "Sets", "Representation, operations and Venn diagram reasoning.", "Easy", ["jee-main", "jee-advanced"]), curriculumId: class11Curriculum.id, unitId: "unit-c11-sets" },
      { ...plannedChapter(11, "relations-and-functions", 2, "relations-and-functions", "Relations and Functions", "Mappings, domain, range and function behavior.", "Medium", ["jee-main", "jee-advanced"]), curriculumId: class11Curriculum.id, unitId: "unit-c11-relations-and-functions" },
      { ...plannedChapter(11, "trigonometric-functions", 3, "trigonometric-functions", "Trigonometric Functions", "Angles, identities and graph-based understanding.", "Medium", ["jee-main", "jee-advanced"]), curriculumId: class11Curriculum.id, unitId: "unit-c11-trigonometric-functions" },
      { ...plannedChapter(11, "complex-numbers-and-quadratic-equations", 4, "complex-numbers-and-quadratic-equations", "Complex Numbers and Quadratic Equations", "Complex numbers and quadratic equations.", "Medium"), curriculumId: class11Curriculum.id, unitId: "unit-c11-complex-numbers-and-quadratic-equations" },
      { ...plannedChapter(11, "linear-inequalities", 5, "linear-inequalities", "Linear Inequalities", "Linear inequalities and their solution sets.", "Medium"), curriculumId: class11Curriculum.id, unitId: "unit-c11-linear-inequalities" },
      { ...plannedChapter(11, "permutations-and-combinations", 6, "permutations-and-combinations", "Permutations and Combinations", "Counting arrangements and selections.", "Medium"), curriculumId: class11Curriculum.id, unitId: "unit-c11-permutations-and-combinations" },
      { ...plannedChapter(11, "binomial-theorem", 7, "binomial-theorem", "Binomial Theorem", "Binomial expansion.", "Medium"), curriculumId: class11Curriculum.id, unitId: "unit-c11-binomial-theorem" },
      { ...plannedChapter(11, "sequences-and-series", 8, "sequences-and-series", "Sequences and Series", "Sequences and series.", "Medium"), curriculumId: class11Curriculum.id, unitId: "unit-c11-sequences-and-series" },
      { ...plannedChapter(11, "straight-lines", 9, "straight-lines", "Straight Lines", "Coordinate geometry of straight lines.", "Medium"), curriculumId: class11Curriculum.id, unitId: "unit-c11-straight-lines" },
      { ...plannedChapter(11, "conic-sections", 10, "conic-sections", "Conic Sections", "Circle, parabola, ellipse and hyperbola.", "Medium"), curriculumId: class11Curriculum.id, unitId: "unit-c11-conic-sections" },
      { ...plannedChapter(11, "introduction-to-three-dimensional-geometry", 11, "introduction-to-three-dimensional-geometry", "Introduction to Three Dimensional Geometry", "Three dimensional coordinates.", "Medium"), curriculumId: class11Curriculum.id, unitId: "unit-c11-introduction-to-three-dimensional-geometry" },
      { ...plannedChapter(11, "limits-and-derivatives", 12, "limits-and-derivatives", "Limits and Derivatives", "Limits and introductory derivatives.", "Medium"), curriculumId: class11Curriculum.id, unitId: "unit-c11-limits-and-derivatives" },
      { ...plannedChapter(11, "statistics", 13, "statistics", "Statistics", "Statistics.", "Medium"), curriculumId: class11Curriculum.id, unitId: "unit-c11-statistics" },
      { ...plannedChapter(11, "probability", 14, "probability", "Probability", "Probability.", "Medium"), curriculumId: class11Curriculum.id, unitId: "unit-c11-probability" },
    ],
  },
  {
    level: 12,
    slug: "class-12",
    title: "CBSE Class 12 Mathematics",
    promise: "Prepare with Confidence",
    description: "Learn calculus, algebra, vectors, probability and exam-oriented problem solving with clarity.",
    curriculum: class12Curriculum,
    chapters: [
      { ...plannedChapter(12, "relations-and-functions", 1, "relations-and-functions", "Relations and Functions", "Types of relations, functions and composition.", "Medium", ["jee-main", "jee-advanced"]), curriculumId: class12Curriculum.id, unitId: "unit-c12-relations-and-functions" },
      { ...plannedChapter(12, "inverse-trigonometric-functions", 2, "inverse-trigonometric-functions", "Inverse Trigonometric Functions", "Principal values, domains, ranges and identities.", "Medium", ["jee-main", "jee-advanced"]), curriculumId: class12Curriculum.id, unitId: "unit-c12-inverse-trigonometric-functions" },
      { ...plannedChapter(12, "matrices", 3, "matrices", "Matrices", "Matrix operations.", "Medium", ["jee-main", "jee-advanced"]), curriculumId: class12Curriculum.id, unitId: "unit-c12-matrices" },
      { ...plannedChapter(12, "determinants", 4, "determinants", "Determinants", "Determinants and applications.", "Medium"), curriculumId: class12Curriculum.id, unitId: "unit-c12-determinants" },
      { ...plannedChapter(12, "continuity-and-differentiability", 5, "continuity-and-differentiability", "Continuity and Differentiability", "Continuity and differentiability.", "Medium"), curriculumId: class12Curriculum.id, unitId: "unit-c12-continuity-and-differentiability" },
      { ...plannedChapter(12, "application-of-derivatives", 6, "application-of-derivatives", "Application of Derivatives", "Applications of derivatives.", "Medium"), curriculumId: class12Curriculum.id, unitId: "unit-c12-application-of-derivatives" },
      { ...plannedChapter(12, "integrals", 7, "integrals", "Integrals", "Indefinite and definite integrals.", "Medium"), curriculumId: class12Curriculum.id, unitId: "unit-c12-integrals" },
      { ...plannedChapter(12, "application-of-integrals", 8, "application-of-integrals", "Application of Integrals", "Applications of integration.", "Medium"), curriculumId: class12Curriculum.id, unitId: "unit-c12-application-of-integrals" },
      { ...plannedChapter(12, "differential-equations", 9, "differential-equations", "Differential Equations", "Differential equations.", "Medium"), curriculumId: class12Curriculum.id, unitId: "unit-c12-differential-equations" },
      { ...plannedChapter(12, "vector-algebra", 10, "vector-algebra", "Vector Algebra", "Vectors and vector algebra.", "Medium"), curriculumId: class12Curriculum.id, unitId: "unit-c12-vector-algebra" },
      { ...plannedChapter(12, "three-dimensional-geometry", 11, "three-dimensional-geometry", "Three Dimensional Geometry", "Three dimensional geometry.", "Medium"), curriculumId: class12Curriculum.id, unitId: "unit-c12-three-dimensional-geometry" },
      { ...plannedChapter(12, "linear-programming", 12, "linear-programming", "Linear Programming", "Linear programming.", "Medium"), curriculumId: class12Curriculum.id, unitId: "unit-c12-linear-programming" },
      { ...plannedChapter(12, "probability", 13, "probability", "Probability", "Probability.", "Medium"), curriculumId: class12Curriculum.id, unitId: "unit-c12-probability" },
    ],
  },
];

function branchForChapter(chapter: Chapter): MathBranch {
  const branch = mathBranches.find((item) => item.slug === chapter.branchSlug);
  return {
    ...(branch ?? {
      id: `branch-${chapter.branchSlug}`,
      name: chapter.title,
      slug: chapter.branchSlug,
      description: chapter.description,
      order: chapter.order,
      identity: "algebra" as const,
    }),
    name: chapter.title,
    description: chapter.description,
    order: chapter.order,
    unitNumber: chapter.order,
  };
}

export const allChapters = mathClasses.flatMap((mathClass) => mathClass.chapters.map((chapter) => ({ ...chapter, branch: branchForChapter(chapter) })));
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
    .map((branch) => {
      const chapters = mathClass.chapters.filter((chapter) => chapter.branchSlug === branch.slug).sort((a, b) => a.order - b.order);
      const firstChapter = chapters[0];
      return {
        ...branch,
        name: firstChapter?.title ?? branch.name,
        description: firstChapter?.description ?? branch.description,
        order: firstChapter?.order ?? branch.order,
        unitNumber: firstChapter?.order ?? branch.unitNumber,
        chapters,
      };
    })
    .filter((branch) => branch.chapters.length)
    .sort((a, b) => (a.chapters[0]?.order ?? a.order) - (b.chapters[0]?.order ?? b.order));
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
