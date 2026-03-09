import { AIServiceError } from "@/lib/ai/errors";
import type { DeckGenerationRequest, DeckGenerator, RawGeneratedDeck } from "@/types/ai";

export function retryDeckGenerator(generator: DeckGenerator): DeckGenerator {
  return async function retryingDeckGenerator(
    request: DeckGenerationRequest,
  ): Promise<RawGeneratedDeck> {
    try {
      return await generator(request);
    } catch (error) {
      if (!(error instanceof AIServiceError) || !error.retryable) {
        throw error;
      }

      return generator(request);
    }
  };
}
