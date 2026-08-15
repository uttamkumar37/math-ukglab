import type { JeeExam, LearningLevel, StudentPreferences } from "./types";

export const learningPreferencesKey = "math-ukglab-learning-preferences";

export const defaultLearningPreferences: StudentPreferences = {
  goal: null,
  classLevel: null,
  exam: null,
  learningLevel: "medium",
};

export const learningLevelOptions: Array<{
  value: LearningLevel;
  label: string;
  shortDescription: string;
  description: string;
}> = [
  {
    value: "simple",
    label: "Simple",
    shortDescription: "Slow, clear, guided",
    description: "Simple language, basic examples and more step-by-step guidance.",
  },
  {
    value: "medium",
    label: "Medium",
    shortDescription: "Balanced and standard",
    description: "Balanced concept depth with standard examples and regular practice.",
  },
  {
    value: "hard",
    label: "Hard",
    shortDescription: "Deep reasoning",
    description: "Advanced reasoning, derivations and multi-concept examples.",
  },
];

export const jeeExamOptions: Array<{
  value: JeeExam;
  label: string;
  description: string;
}> = [
  {
    value: "jee-main",
    label: "JEE Main",
    description: "Concept strength, speed and exam-focused application.",
  },
  {
    value: "jee-advanced",
    label: "JEE Main + Advanced",
    description: "Deeper reasoning, alternate methods and multi-concept problems.",
  },
];

export function readLearningPreferences(): StudentPreferences {
  try {
    const stored = JSON.parse(localStorage.getItem(learningPreferencesKey) ?? "null") as Partial<StudentPreferences> | null;
    if (!stored) return defaultLearningPreferences;

    return {
      goal: stored.goal === "school" || stored.goal === "jee" ? stored.goal : null,
      classLevel: [9, 10, 11, 12].includes(stored.classLevel ?? 0) ? stored.classLevel ?? null : null,
      exam: stored.exam === "jee-main" || stored.exam === "jee-advanced" ? stored.exam : null,
      learningLevel: stored.learningLevel === "simple" || stored.learningLevel === "hard" ? stored.learningLevel : "medium",
    };
  } catch {
    return defaultLearningPreferences;
  }
}

export function getSimplerLevel(level: LearningLevel): LearningLevel {
  if (level === "hard") return "medium";
  return "simple";
}

export function getHarderLevel(level: LearningLevel): LearningLevel | null {
  if (level === "simple") return "medium";
  if (level === "medium") return "hard";
  return null;
}

export function formatExam(exam: JeeExam | null) {
  if (exam === "jee-advanced") return "JEE Main + Advanced";
  if (exam === "jee-main") return "JEE Main";
  return "Choose exam";
}
