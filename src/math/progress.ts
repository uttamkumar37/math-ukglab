import type { QuestionDifficulty } from "./types";

export const progressKey = "math-ukglab-progress-v1";

export type TopicProgress = {
  topicKey: string;
  title: string;
  path: string;
  classLevel: number;
  chapter: string;
  conceptOpenedAt?: string;
  solutionReviews: Record<QuestionDifficulty, string[]>;
  latestTest?: {
    correct: number;
    total: number;
    submittedAt: string;
  };
};

export type ProgressStore = {
  version: 1;
  topics: Record<string, TopicProgress>;
};

const emptyReviews = (): TopicProgress["solutionReviews"] => ({ Simple: [], Medium: [], Hard: [] });

export function readProgress(): ProgressStore {
  try {
    const parsed = JSON.parse(localStorage.getItem(progressKey) ?? "null") as ProgressStore | null;
    return parsed?.version === 1 ? parsed : { version: 1, topics: {} };
  } catch {
    return { version: 1, topics: {} };
  }
}

function writeProgress(store: ProgressStore) {
  localStorage.setItem(progressKey, JSON.stringify(store));
}

function ensureTopic(store: ProgressStore, input: Pick<TopicProgress, "topicKey" | "title" | "path" | "classLevel" | "chapter">) {
  return store.topics[input.topicKey] ?? { ...input, solutionReviews: emptyReviews() };
}

export function recordConceptOpened(input: Pick<TopicProgress, "topicKey" | "title" | "path" | "classLevel" | "chapter">) {
  const store = readProgress();
  const topic = ensureTopic(store, input);
  store.topics[input.topicKey] = { ...topic, ...input, conceptOpenedAt: new Date().toISOString() };
  writeProgress(store);
}

export function recordSolutionReview(input: Pick<TopicProgress, "topicKey" | "title" | "path" | "classLevel" | "chapter"> & { difficulty: QuestionDifficulty; questionSlug: string }) {
  const store = readProgress();
  const topic = ensureTopic(store, input);
  const reviewed = topic.solutionReviews[input.difficulty] ?? [];
  store.topics[input.topicKey] = {
    ...topic,
    topicKey: input.topicKey,
    title: input.title,
    path: input.path,
    classLevel: input.classLevel,
    chapter: input.chapter,
    solutionReviews: {
      ...topic.solutionReviews,
      [input.difficulty]: reviewed.includes(input.questionSlug) ? reviewed : [...reviewed, input.questionSlug],
    },
  };
  writeProgress(store);
}

export function recordTestResult(input: Pick<TopicProgress, "topicKey" | "title" | "path" | "classLevel" | "chapter"> & { correct: number; total: number }) {
  const store = readProgress();
  const topic = ensureTopic(store, input);
  store.topics[input.topicKey] = {
    ...topic,
    topicKey: input.topicKey,
    title: input.title,
    path: input.path,
    classLevel: input.classLevel,
    chapter: input.chapter,
    latestTest: { correct: input.correct, total: input.total, submittedAt: new Date().toISOString() },
  };
  writeProgress(store);
}
