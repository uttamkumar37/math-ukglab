import { getJson } from "./client";
import { apiLessonSchema, envelope } from "./schemas";

export function fetchLesson(slug: string) {
  return getJson(`/lessons/${slug}`, envelope(apiLessonSchema));
}
