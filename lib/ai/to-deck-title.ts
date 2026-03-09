import type { Difficulty } from "@/types/deck";

function toTitleCase(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function toDeckTitle(topic: string, difficulty: Difficulty): string {
  return `${toTitleCase(topic)} - ${toTitleCase(difficulty)}`;
}
