import { normalizeGeneratedDeck } from "@/lib/ai/normalize-generated-deck";

describe("normalizeGeneratedDeck", () => {
  it("trims provider output, assigns positions, and falls back the title", () => {
    const deck = normalizeGeneratedDeck(
      { topic: " basic geography ", difficulty: "easy", cardCount: 5 },
      {
        cards: [
          { question: " What is the capital of France? ", answer: " Paris " },
          { question: "What is the capital of Japan?", answer: " Tokyo " },
          { question: "What is the capital of Germany?", answer: "Berlin" },
          { question: "What is the capital of Italy?", answer: "Rome" },
          { question: "What is the capital of Spain?", answer: "Madrid" },
        ],
        source: { provider: "mock" },
      },
    );

    expect(deck.title).toBe("Basic Geography - Easy");
    expect(deck.cards).toEqual([
      {
        question: "What is the capital of France?",
        answer: "Paris",
        position: 0,
      },
      {
        question: "What is the capital of Japan?",
        answer: "Tokyo",
        position: 1,
      },
      {
        question: "What is the capital of Germany?",
        answer: "Berlin",
        position: 2,
      },
      {
        question: "What is the capital of Italy?",
        answer: "Rome",
        position: 3,
      },
      {
        question: "What is the capital of Spain?",
        answer: "Madrid",
        position: 4,
      },
    ]);
  });

  it("rejects card counts that do not match the requested amount", () => {
    expect(() =>
      normalizeGeneratedDeck(
        { topic: "planets", difficulty: "medium", cardCount: 5 },
        {
          title: "Planets - Medium",
          cards: [{ question: "One?", answer: "Yes" }],
          source: { provider: "mock" },
        },
      ),
    ).toThrow("Generated card count does not match request.");
  });
});
