import { AIServiceError } from "@/lib/ai/errors";
import type { CardCount, Difficulty } from "@/types/deck";
import type { GenerateDeckInput } from "@/types/ai";

const cardCounts = new Set<CardCount>([5, 10, 15]);
const difficulties = new Set<Difficulty>(["easy", "medium", "hard"]);

export function validateGenerateDeckInput(input: unknown): GenerateDeckInput {
  if (!input || typeof input !== "object") {
    throw new AIServiceError("invalid_input", "Invalid deck generation input.", {
      statusCode: 400,
    });
  }

  const { cardCount, difficulty, topic } = input as Record<string, unknown>;

  if (typeof topic !== "string" || topic.trim().length < 2 || topic.trim().length > 120) {
    throw new AIServiceError("invalid_input", "Topic must be between 2 and 120 characters.", {
      statusCode: 400,
    });
  }

  if (typeof difficulty !== "string" || !difficulties.has(difficulty as Difficulty)) {
    throw new AIServiceError("invalid_input", "Difficulty is invalid.", {
      statusCode: 400,
    });
  }

  if (typeof cardCount !== "number" || !cardCounts.has(cardCount as CardCount)) {
    throw new AIServiceError("invalid_input", "Card count is invalid.", {
      statusCode: 400,
    });
  }

  return {
    topic: topic.trim(),
    difficulty: difficulty as Difficulty,
    cardCount: cardCount as CardCount,
  };
}
