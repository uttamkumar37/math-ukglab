import { createContext, useContext } from "react";
import type { ClassLevel, JeeExam, LearningLevel, StudentGoal, StudentPreferences } from "./types";

export type LearningContextValue = {
  preferences: StudentPreferences;
  selectGoal: (goal: StudentGoal) => void;
  selectClass: (classLevel: ClassLevel) => void;
  selectExam: (exam: JeeExam) => void;
  setLearningLevel: (level: LearningLevel) => void;
  resetPreferences: () => void;
};

export const LearningContext = createContext<LearningContextValue | null>(null);

export function useLearningPreferences() {
  const context = useContext(LearningContext);
  if (!context) throw new Error("useLearningPreferences must be used inside LearningProvider");
  return context;
}
