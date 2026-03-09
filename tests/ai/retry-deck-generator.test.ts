import { AIServiceError } from "@/lib/ai/errors";
import { retryDeckGenerator } from "@/lib/ai/retry-deck-generator";

describe("retryDeckGenerator", () => {
  it("retries exactly once for retryable provider failures", async () => {
    const generator = vi
      .fn()
      .mockRejectedValueOnce(
        new AIServiceError("provider_error", "try again", {
          retryable: true,
          statusCode: 502,
        }),
      )
      .mockResolvedValueOnce({
        title: "Basic Geography",
        cards: [{ question: "Q1", answer: "A1" }],
        source: { provider: "openai", model: "gpt-4.1-nano" },
      });

    const result = await retryDeckGenerator(generator)({
      instructions: "system prompt",
      input: { topic: "basic geography", difficulty: "easy", cardCount: 1 },
      prompt: "user prompt",
    });

    expect(result.title).toBe("Basic Geography");
    expect(generator).toHaveBeenCalledTimes(2);
  });

  it("does not retry non-retryable failures", async () => {
    const generator = vi.fn().mockRejectedValue(
      new AIServiceError("provider_error", "fatal", {
        retryable: false,
        statusCode: 502,
      }),
    );

    await expect(
      retryDeckGenerator(generator)({
        instructions: "system prompt",
        input: { topic: "basic geography", difficulty: "easy", cardCount: 1 },
        prompt: "user prompt",
      }),
    ).rejects.toThrow("fatal");

    expect(generator).toHaveBeenCalledTimes(1);
  });
});
