import type { GenerateDeckInput } from "@/types/ai";

export function buildDeckGenerationPrompt(input: GenerateDeckInput): string {
  return [
    "Generate a flashcard deck as valid JSON.",
    `Topic: ${input.topic}`,
    `Difficulty: ${input.difficulty}`,
    `Card count: ${input.cardCount}`,
    'Return exactly this shape: {"title":"string","cards":[{"question":"string","answer":"string"}]}',
    "Return exactly the requested number of cards.",
    "Keep each question and answer concise and study-oriented.",
  ].join("\n");
}
