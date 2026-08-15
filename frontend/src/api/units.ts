import { getJson } from "./client";
import { apiUnitSchema, envelope } from "./schemas";

export function fetchClassUnits(classNumber: number) {
  return getJson(`/classes/${classNumber}/units`, envelope(apiUnitSchema.array()));
}

export function fetchUnit(classNumber: number, slug: string) {
  return getJson(`/classes/${classNumber}/units/${slug}`, envelope(apiUnitSchema));
}
