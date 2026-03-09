import { toDeckTitle } from "@/lib/ai/to-deck-title";
import type { GenerateDeckInput, GeneratedDeck, RawGeneratedDeck } from "@/types/ai";

function normalizeText(value: string, label: string): string {
  const normalized = value.trim();

  if (!normalized) {
    throw new Error(`Generated ${label} cannot be empty.`);
  }

  return normalized;
}

export function normalizeGeneratedDeck(
  input: GenerateDeckInput,
  rawDeck: RawGeneratedDeck,
): GeneratedDeck {
  if (rawDeck.cards.length !== input.cardCount) {
    throw new Error("Generated card count does not match request.");
  }

  return {
    topic: input.topic.trim(),
    title: toDeckTitle(input.topic, input.difficulty),
    difficulty: input.difficulty,
    cardCount: input.cardCount,
    cards: rawDeck.cards.map((card, position) => ({
      question: normalizeText(card.question, "question"),
      answer: normalizeText(card.answer, "answer"),
      position,
    })),
    source: rawDeck.source ?? { provider: "mock" },
  };
}
