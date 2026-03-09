import { generateDeckWithProvider } from "@/lib/ai/generate-deck-with-provider";
import { createMockDeckGenerator } from "@/lib/ai/mock-deck-generator";

describe("generateDeckWithProvider", () => {
  it("returns a normalized deck from the mock generator", async () => {
    const deck = await generateDeckWithProvider(
      { topic: "javascript closures", difficulty: "medium", cardCount: 5 },
      createMockDeckGenerator(),
    );

    expect(deck.title).toBe("Javascript Closures - Medium");
    expect(deck.cards).toHaveLength(5);
    expect(deck.source.provider).toBe("mock");
    expect(deck.cards[0]?.position).toBe(0);
  });

  it("preserves provider source metadata from a real generator", async () => {
    const deck = await generateDeckWithProvider(
      { topic: "basic geography", difficulty: "easy", cardCount: 5 },
      async () => ({
        title: "Basic Geography",
        cards: Array.from({ length: 5 }, (_, position) => ({
          question: `Question ${position + 1}`,
          answer: `Answer ${position + 1}`,
        })),
        source: {
          provider: "openai",
          model: "gpt-4.1-nano",
        },
      }),
    );

    expect(deck.title).toBe("Basic Geography - Easy");
    expect(deck.source.provider).toBe("openai");
    expect(deck.source.model).toBe("gpt-4.1-nano");
  });
});
