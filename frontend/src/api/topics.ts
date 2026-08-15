import { getJson } from "./client";
import { apiTopicSchema, envelope } from "./schemas";

export function fetchTopics() {
  return getJson("/topics", envelope(apiTopicSchema.array()));
}

export function fetchTopic(slug: string) {
  return getJson(`/topics/${slug}`, envelope(apiTopicSchema));
}
