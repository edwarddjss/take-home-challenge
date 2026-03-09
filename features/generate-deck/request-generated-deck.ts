import type { GenerateDeckErrorResponse, GeneratedDeck } from "@/types/ai";
import type { CardCount, Difficulty } from "@/types/deck";

type RequestGeneratedDeckInput = {
  topic: string;
  difficulty: Difficulty;
  cardCount: CardCount;
};

export async function requestGeneratedDeck(
  input: RequestGeneratedDeckInput,
): Promise<GeneratedDeck> {
  const response = await fetch("/api/decks/generate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = (await response.json()) as GenerateDeckErrorResponse;
    throw new Error(error.message);
  }

  return response.json() as Promise<GeneratedDeck>;
}
