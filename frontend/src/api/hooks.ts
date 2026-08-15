import { QueryClient, useQuery } from "@tanstack/react-query";
import { fetchClass, fetchClasses } from "./classes";
import { fetchChapter, fetchChapters, type ChapterFilters } from "./chapters";
import { fetchLesson } from "./lessons";
import { fetchQuestion, fetchQuestions, type QuestionFilters } from "./questions";
import { fetchTopic, fetchTopics } from "./topics";
import { fetchClassUnits, fetchUnit } from "./units";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

export function useClasses() {
  return useQuery({ queryKey: ["classes"], queryFn: fetchClasses });
}

export function useClass(classNumber: number) {
  return useQuery({ queryKey: ["class", classNumber], queryFn: () => fetchClass(classNumber), enabled: classNumber > 0 });
}

export function useClassUnits(classNumber: number) {
  return useQuery({ queryKey: ["class", classNumber, "units"], queryFn: () => fetchClassUnits(classNumber), enabled: classNumber > 0 });
}

export function useUnit(classNumber: number, slug?: string) {
  return useQuery({ queryKey: ["class", classNumber, "unit", slug], queryFn: () => fetchUnit(classNumber, slug ?? ""), enabled: classNumber > 0 && Boolean(slug) });
}

export function useChapters(filters: ChapterFilters) {
  return useQuery({ queryKey: ["chapters", filters], queryFn: () => fetchChapters(filters) });
}

export function useChapter(slug?: string) {
  return useQuery({ queryKey: ["chapter", slug], queryFn: () => fetchChapter(slug ?? ""), enabled: Boolean(slug) });
}

export function useTopics() {
  return useQuery({ queryKey: ["topics"], queryFn: fetchTopics });
}

export function useTopic(slug?: string) {
  return useQuery({ queryKey: ["topic", slug], queryFn: () => fetchTopic(slug ?? ""), enabled: Boolean(slug) });
}

export function useLesson(slug?: string) {
  return useQuery({ queryKey: ["lesson", slug], queryFn: () => fetchLesson(slug ?? ""), enabled: Boolean(slug) });
}

export function useQuestions(filters: QuestionFilters) {
  return useQuery({ queryKey: ["questions", filters], queryFn: () => fetchQuestions(filters) });
}

export function useQuestion(slug?: string) {
  return useQuery({ queryKey: ["question", slug], queryFn: () => fetchQuestion(slug ?? ""), enabled: Boolean(slug) });
}
