import { buildDeckGenerationPrompt } from "@/lib/ai/build-deck-generation-prompt";
import { normalizeGeneratedDeck } from "@/lib/ai/normalize-generated-deck";
import type { DeckGenerator, GenerateDeckInput, GeneratedDeck } from "@/types/ai";

export async function generateDeckWithProvider(
  input: GenerateDeckInput,
  generator: DeckGenerator,
): Promise<GeneratedDeck> {
  const prompt = buildDeckGenerationPrompt(input);
  const rawDeck = await generator({ input, prompt });

  return normalizeGeneratedDeck(input, rawDeck);
}
