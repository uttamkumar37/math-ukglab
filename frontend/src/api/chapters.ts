import { getJson } from "./client";
import { apiChapterSchema, envelope } from "./schemas";

export type ChapterFilters = {
  classNumber?: number;
  unit?: string;
};

export function fetchChapters(filters: ChapterFilters = {}) {
  const params = new URLSearchParams();
  if (filters.classNumber) params.set("class", String(filters.classNumber));
  if (filters.unit) params.set("unit", filters.unit);
  const suffix = params.toString() ? `?${params.toString()}` : "";
  return getJson(`/chapters${suffix}`, envelope(apiChapterSchema.array()));
}

export function fetchChapter(slug: string) {
  return getJson(`/chapters/${slug}`, envelope(apiChapterSchema));
}
