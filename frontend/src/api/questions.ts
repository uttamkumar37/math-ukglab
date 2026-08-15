import { getJson } from "./client";
import { apiQuestionSchema, envelope } from "./schemas";

export type QuestionFilters = {
  classNumber?: number;
  topic?: string;
  difficulty?: "simple" | "medium" | "hard";
};

export function fetchQuestions(filters: QuestionFilters = {}) {
  const params = new URLSearchParams();
  if (filters.classNumber) params.set("class", String(filters.classNumber));
  if (filters.topic) params.set("topic", filters.topic);
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  const suffix = params.toString() ? `?${params.toString()}` : "";
  return getJson(`/questions${suffix}`, envelope(apiQuestionSchema.array()));
}

export function fetchQuestion(slug: string) {
  return getJson(`/questions/${slug}`, envelope(apiQuestionSchema));
}
