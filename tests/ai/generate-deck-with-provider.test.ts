import { generateDeckWithProvider } from "@/lib/ai/generate-deck-with-provider";
import { createMockDeckGenerator } from "@/lib/ai/mock-deck-generator";

describe("generateDeckWithProvider", () => {
  it("returns a normalized deck from the mock generator", async () => {
    const deck = await generateDeckWithProvider(
      { topic: "javascript closures", difficulty: "medium", cardCount: 5 },
      createMockDeckGenerator(),
    );

    expect(deck.title).toBe("Javascript Closures");
    expect(deck.cards).toHaveLength(5);
    expect(deck.source.provider).toBe("mock");
    expect(deck.cards[0]?.position).toBe(0);
  });
});
