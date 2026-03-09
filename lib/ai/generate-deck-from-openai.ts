import OpenAI from "openai";
import { AIServiceError } from "@/lib/ai/errors";
import { generateDeckWithProvider } from "@/lib/ai/generate-deck-with-provider";
import { getOpenAIModel, getOpenAITimeoutMs, hasOpenAIKey } from "@/lib/ai/openai-config";
import { createOpenAIDeckGenerator } from "@/lib/ai/openai-deck-generator";
import { retryDeckGenerator } from "@/lib/ai/retry-deck-generator";
import type { GenerateDeckInput, GeneratedDeck } from "@/types/ai";

export async function generateDeckFromOpenAI(
  input: GenerateDeckInput,
): Promise<GeneratedDeck> {
  if (!hasOpenAIKey()) {
    throw new AIServiceError("missing_api_key", "OpenAI API key is not configured.", {
      statusCode: 500,
    });
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    maxRetries: 0,
  });

  const generator = retryDeckGenerator(
    createOpenAIDeckGenerator({
      client,
      model: getOpenAIModel(),
      timeoutMs: getOpenAITimeoutMs(),
    }),
  );

  return generateDeckWithProvider(input, generator);
}
