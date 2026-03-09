import { handleGenerateDeckRequest } from "@/app/api/decks/generate/route";
import { AIServiceError } from "@/lib/ai/errors";

describe("handleGenerateDeckRequest", () => {
  it("returns a generated deck for valid input", async () => {
    const request = new Request("http://localhost/api/decks/generate", {
      method: "POST",
      body: JSON.stringify({
        topic: "basic geography",
        difficulty: "easy",
        cardCount: 5,
      }),
      headers: { "content-type": "application/json" },
    });

    const response = await handleGenerateDeckRequest(request, {
      hasProviderConfig: () => true,
      generateDeck: async (input) => ({
        ...input,
        title: "Basic Geography",
        cards: Array.from({ length: 5 }, (_, position) => ({
          question: `Question ${position + 1}`,
          answer: `Answer ${position + 1}`,
          position,
        })),
        source: { provider: "openai", model: "gpt-4.1-nano" },
      }),
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      title: "Basic Geography",
      source: { provider: "openai", model: "gpt-4.1-nano" },
    });
  });

  it("returns 400 for invalid input", async () => {
    const request = new Request("http://localhost/api/decks/generate", {
      method: "POST",
      body: JSON.stringify({
        topic: "x",
        difficulty: "easy",
        cardCount: 7,
      }),
      headers: { "content-type": "application/json" },
    });

    const response = await handleGenerateDeckRequest(request, {
      hasProviderConfig: () => true,
      generateDeck: vi.fn(),
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      code: "invalid_input",
    });
  });

  it("returns 400 for malformed JSON", async () => {
    const request = new Request("http://localhost/api/decks/generate", {
      method: "POST",
      body: "{bad json",
      headers: { "content-type": "application/json" },
    });

    const response = await handleGenerateDeckRequest(request, {
      hasProviderConfig: () => true,
      generateDeck: vi.fn(),
    });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      code: "invalid_input",
    });
  });

  it("returns 500 when the API key is missing", async () => {
    const request = new Request("http://localhost/api/decks/generate", {
      method: "POST",
      body: JSON.stringify({
        topic: "basic geography",
        difficulty: "easy",
        cardCount: 5,
      }),
      headers: { "content-type": "application/json" },
    });

    const response = await handleGenerateDeckRequest(request, {
      hasProviderConfig: () => false,
      generateDeck: vi.fn(),
    });

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({
      code: "missing_api_key",
    });
  });

  it("returns 502 when provider generation fails", async () => {
    const request = new Request("http://localhost/api/decks/generate", {
      method: "POST",
      body: JSON.stringify({
        topic: "basic geography",
        difficulty: "easy",
        cardCount: 5,
      }),
      headers: { "content-type": "application/json" },
    });

    const response = await handleGenerateDeckRequest(request, {
      hasProviderConfig: () => true,
      generateDeck: async () => {
        throw new AIServiceError("provider_error", "Deck generation failed.", {
          statusCode: 502,
        });
      },
    });

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toMatchObject({
      code: "provider_error",
    });
  });
});
