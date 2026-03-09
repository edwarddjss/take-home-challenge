import { createOpenAIDeckGenerator } from "@/lib/ai/openai-deck-generator";

describe("createOpenAIDeckGenerator", () => {
  it("calls the Responses API with structured output settings", async () => {
    const create = vi.fn().mockResolvedValue({
      error: null,
      output_text:
        '{"title":"Basic Geography","cards":[{"question":"What is the capital of France?","answer":"Paris"}]}',
    });

    const generator = createOpenAIDeckGenerator({
      client: {
        responses: { create },
      } as never,
      model: "gpt-4.1-nano",
      timeoutMs: 15000,
    });

    const deck = await generator({
      instructions: "system prompt",
      input: { topic: "basic geography", difficulty: "easy", cardCount: 5 },
      prompt: "user prompt",
    });

    expect(deck.source?.provider).toBe("openai");
    expect(deck.source?.model).toBe("gpt-4.1-nano");
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "gpt-4.1-nano",
        instructions: "system prompt",
        input: "user prompt",
        store: false,
        text: expect.objectContaining({
          format: expect.objectContaining({
            type: "json_schema",
            name: "deck_generation",
            strict: true,
          }),
        }),
      }),
      expect.objectContaining({
        maxRetries: 0,
        timeout: 15000,
      }),
    );
  });
});
