import type { GenerateDeckInput } from "@/types/ai";

export const deckGenerationInstructions = [
  "You generate flashcard decks for focused study.",
  "Return concise, accurate cards only.",
  "Follow the required JSON schema exactly.",
  "Do not include commentary outside the JSON response.",
].join("\n");

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
