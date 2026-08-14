export type ClassLevel = 9 | 10 | 11 | 12;

export type Difficulty = "Easy" | "Medium" | "Hard";
export type QuestionDifficulty = "Basic" | "Standard" | "Advanced";

export type MathBranch = {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  identity: "numbers" | "algebra" | "geometry" | "coordinate" | "trigonometry" | "calculus" | "statistics" | "sets" | "mensuration";
};

export type LessonBlock =
  | { type: "paragraph"; text: string }
  | { type: "equation"; math: string }
  | { type: "list"; items: string[] };

export type Lesson = {
  id: string;
  slug: string;
  title: string;
  order: number;
  summary: string;
  conceptTitle?: string;
  what?: string;
  whyItMatters?: string;
  howItWorks?: string;
  objectives: string[];
  content: LessonBlock[];
  visual: "number-line" | "curve" | "triangle" | "matrix";
  example: {
    problem: string;
    steps: string[];
  };
  why: string;
  commonMistake: string;
  tryIt: {
    question: string;
    solution: string[];
  };
  formula?: string;
  status: "sample" | "planned";
  createdAt: string;
  updatedAt: string;
};

export type PracticeQuestion = {
  id: string;
  slug: string;
  type: "MCQ" | "Numerical" | "Short Answer" | "Long Answer";
  difficulty: QuestionDifficulty;
  concept?: string;
  topic: string;
  question: string;
  options?: string[];
  answer: string;
  hints: string[];
  approach: string[];
  conceptReminder: string;
  solutionSteps: string[];
  solution?: string[];
  explanation: string;
  finalAnswer?: string;
  alternativeMethods?: { title: string; steps: string[] }[];
};

export type Formula = {
  id: string;
  slug: string;
  title: string;
  statement: string;
  note: string;
  classLevel: ClassLevel;
  branchSlug: string;
  chapterSlug: string;
};

export type Chapter = {
  id: string;
  slug: string;
  classLevel: ClassLevel;
  branchSlug: string;
  order: number;
  title: string;
  description: string;
  difficulty?: Difficulty;
  overview: string;
  lessons: Lesson[];
  practice: PracticeQuestion[];
  formulas: Formula[];
};

export type MathClass = {
  level: ClassLevel;
  slug: string;
  title: string;
  promise: string;
  description: string;
  chapters: Chapter[];
};
