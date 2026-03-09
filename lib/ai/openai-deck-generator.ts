import OpenAI from "openai";
import { deckGenerationSchema } from "@/lib/ai/deck-generation-schema";
import { AIServiceError } from "@/lib/ai/errors";
import type { DeckGenerationRequest, DeckGenerator, RawGeneratedDeck } from "@/types/ai";

type OpenAIClientLike = Pick<OpenAI, "responses">;

function isRawGeneratedDeck(value: unknown): value is RawGeneratedDeck {
  if (!value || typeof value !== "object") {
    return false;
  }

  const deck = value as Record<string, unknown>;
  return (
    typeof deck.title === "string" &&
    Array.isArray(deck.cards) &&
    deck.cards.every(
      (card) =>
        card &&
        typeof card === "object" &&
        typeof (card as Record<string, unknown>).question === "string" &&
        typeof (card as Record<string, unknown>).answer === "string",
    )
  );
}

export function createOpenAIDeckGenerator(config: {
  client: OpenAIClientLike;
  model: string;
  timeoutMs: number;
}): DeckGenerator {
  return async function openAIDeckGenerator({
    instructions,
    input,
    prompt,
  }: DeckGenerationRequest): Promise<RawGeneratedDeck> {
    const response = await config.client.responses.create(
      {
        model: config.model,
        instructions,
        input: prompt,
        store: false,
        text: {
          format: {
            type: "json_schema",
            name: "deck_generation",
            strict: true,
            schema: deckGenerationSchema,
          },
        },
      },
      {
        maxRetries: 0,
        timeout: config.timeoutMs,
      },
    );

    if (response.error || !response.output_text) {
      throw new AIServiceError("provider_error", "OpenAI did not return usable output.", {
        retryable: true,
        statusCode: 502,
      });
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(response.output_text);
    } catch {
      throw new AIServiceError("provider_error", "OpenAI returned invalid JSON.", {
        retryable: true,
        statusCode: 502,
      });
    }

    if (!isRawGeneratedDeck(parsed)) {
      throw new AIServiceError("provider_error", "OpenAI returned an invalid deck shape.", {
        retryable: true,
        statusCode: 502,
      });
    }

    return {
      ...parsed,
      title: parsed.title || input.topic,
      source: {
        provider: "openai",
        model: config.model,
      },
    };
  };
}
