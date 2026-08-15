import { z } from "zod";

export const apiTopicSchema = z.object({
  id: z.string(),
  chapter_id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  description: z.string().default(""),
  display_order: z.number().default(0),
});

export const apiChapterSchema = z.object({
  id: z.string(),
  unit_id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  description: z.string().default(""),
  display_order: z.number().default(0),
  topics: z.array(apiTopicSchema).optional().default([]),
});

export const apiUnitSchema = z.object({
  id: z.string(),
  class_id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  description: z.string().default(""),
  display_order: z.number().default(0),
  chapters: z.array(apiChapterSchema).optional().default([]),
});

export const apiClassSchema = z.object({
  id: z.string(),
  class_number: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string().default(""),
  display_order: z.number().default(0),
});

export const apiLessonSchema = z.object({
  id: z.string(),
  topic_id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().default(""),
  simple_content: z.string().default(""),
  medium_content: z.string().default(""),
  hard_content: z.string().default(""),
  formula_content: z.string().default(""),
  revision_content: z.string().default(""),
  common_mistake: z.string().default(""),
});

export const apiQuestionHintSchema = z.object({
  id: z.string(),
  question_id: z.string(),
  hint_order: z.number(),
  hint_text: z.string(),
});

export const apiSolutionStepSchema = z.object({
  id: z.string(),
  question_id: z.string(),
  step_order: z.number(),
  step_text: z.string(),
});

export const apiQuestionSchema = z.object({
  id: z.string(),
  topic_id: z.string(),
  slug: z.string(),
  course_type: z.enum(["SCHOOL", "JEE_MAIN", "JEE_ADVANCED"]),
  difficulty: z.enum(["SIMPLE", "MEDIUM", "HARD"]),
  question_type: z.enum(["MCQ", "NUMERICAL", "SHORT_ANSWER", "LONG_ANSWER"]),
  question_text: z.string(),
  approach: z.string().default(""),
  final_answer: z.string().default(""),
  explanation: z.string().default(""),
  alternative_methods: z.string().default(""),
  common_mistakes: z.string().default(""),
  hints: z.array(apiQuestionHintSchema).optional().default([]),
  solution_steps: z.array(apiSolutionStepSchema).optional().default([]),
});

export function envelope<T extends z.ZodTypeAny>(schema: T) {
  return z.object({ data: schema });
}

export type ApiClass = z.infer<typeof apiClassSchema>;
export type ApiUnit = z.infer<typeof apiUnitSchema>;
export type ApiChapter = z.infer<typeof apiChapterSchema>;
export type ApiTopic = z.infer<typeof apiTopicSchema>;
export type ApiLesson = z.infer<typeof apiLessonSchema>;
export type ApiQuestion = z.infer<typeof apiQuestionSchema>;
