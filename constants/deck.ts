import type { CardCount, Difficulty } from "@/types/deck";

export const defaultCardCount: CardCount = 10;
export const defaultDifficulty: Difficulty = "medium";
export const minimumLoadingDurationMs = 500;

export const difficultyOptions = [
  { label: "easy", value: "easy" },
  { label: "medium", value: "medium" },
  { label: "hard", value: "hard" },
] satisfies { label: string; value: Difficulty }[];

export const cardCountOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
] satisfies { label: string; value: CardCount }[];

export const previewCardLabels = [
  "Fundamental concept",
  "Execution context",
  "Comparison",
  "Performance",
  "Best practices",
];
