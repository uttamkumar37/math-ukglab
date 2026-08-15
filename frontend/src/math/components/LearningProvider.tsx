import { useMemo, useState, type ReactNode } from "react";
import { LearningContext, type LearningContextValue } from "../learningContext";
import { defaultLearningPreferences, learningPreferencesKey, readLearningPreferences } from "../learningPreferences";
import type { StudentPreferences } from "../types";

export function LearningProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<StudentPreferences>(() => readLearningPreferences());

  const persist = (next: StudentPreferences) => {
    setPreferences(next);
    localStorage.setItem(learningPreferencesKey, JSON.stringify(next));
  };

  const value = useMemo<LearningContextValue>(() => ({
    preferences,
    selectGoal: (goal) => persist({
      ...preferences,
      goal,
      classLevel: goal === "school" ? preferences.classLevel : null,
      exam: goal === "jee" ? preferences.exam : null,
    }),
    selectClass: (classLevel) => persist({ ...preferences, goal: "school", classLevel, exam: null }),
    selectExam: (exam) => persist({ ...preferences, goal: "jee", classLevel: null, exam }),
    setLearningLevel: (learningLevel) => persist({ ...preferences, learningLevel }),
    resetPreferences: () => persist(defaultLearningPreferences),
  }), [preferences]);

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}
