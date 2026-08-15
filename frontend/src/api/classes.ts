import { getJson } from "./client";
import { apiClassSchema, envelope } from "./schemas";

export function fetchClasses() {
  return getJson("/classes", envelope(apiClassSchema.array()));
}

export function fetchClass(classNumber: number) {
  return getJson(`/classes/${classNumber}`, envelope(apiClassSchema));
}
