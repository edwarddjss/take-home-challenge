import { NextResponse } from "next/server";
import { AIServiceError, toErrorResponse } from "@/lib/ai/errors";
import { generateDeckFromOpenAI } from "@/lib/ai/generate-deck-from-openai";
import { hasOpenAIKey } from "@/lib/ai/openai-config";
import { validateGenerateDeckInput } from "@/lib/ai/validate-generate-deck-input";
import type { GenerateDeckInput, GeneratedDeck } from "@/types/ai";

type RouteDependencies = {
  generateDeck: (input: GenerateDeckInput) => Promise<GeneratedDeck>;
  hasProviderConfig: () => boolean;
};

const defaultDependencies: RouteDependencies = {
  generateDeck: generateDeckFromOpenAI,
  hasProviderConfig: hasOpenAIKey,
};

export async function handleGenerateDeckRequest(
  request: Request,
  dependencies: RouteDependencies = defaultDependencies,
) {
  try {
    if (!dependencies.hasProviderConfig()) {
      throw new AIServiceError("missing_api_key", "OpenAI API key is not configured.", {
        statusCode: 500,
      });
    }

    let payload: unknown;

    try {
      payload = await request.json();
    } catch {
      throw new AIServiceError("invalid_input", "Request body must be valid JSON.", {
        statusCode: 400,
      });
    }

    const input = validateGenerateDeckInput(payload);
    const deck = await dependencies.generateDeck(input);

    return NextResponse.json(deck, { status: 200 });
  } catch (error) {
    if (error instanceof AIServiceError) {
      return NextResponse.json(toErrorResponse(error), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      {
        code: "provider_error",
        message: "Deck generation failed.",
      },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  return handleGenerateDeckRequest(request);
}
