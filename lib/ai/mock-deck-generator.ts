import { toDeckTitle } from "@/lib/ai/to-deck-title";
import type { DeckGenerator, RawGeneratedCard } from "@/types/ai";

function buildMockCard(
  topic: string,
  difficulty: string,
  index: number,
): RawGeneratedCard {
  return {
    question: `Question ${index + 1} about ${topic}?`,
    answer: `Answer ${index + 1} for ${topic} at ${difficulty} difficulty.`,
  };
}

export function createMockDeckGenerator(): DeckGenerator {
  return async function mockDeckGenerator({ input }) {
    const title = toDeckTitle(input.topic, input.difficulty);
    const cards = Array.from({ length: input.cardCount }, (_, index) =>
      buildMockCard(title, input.difficulty, index),
    );

    return {
      title,
      cards,
      source: {
        provider: "mock",
      },
    };
  };
}
