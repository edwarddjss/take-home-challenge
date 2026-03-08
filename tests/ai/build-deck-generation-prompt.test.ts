import { buildDeckGenerationPrompt } from "@/lib/ai/build-deck-generation-prompt";

describe("buildDeckGenerationPrompt", () => {
  it("includes the exact generation constraints in the prompt", () => {
    const prompt = buildDeckGenerationPrompt({
      topic: "basic geography",
      difficulty: "hard",
      cardCount: 15,
    });

    expect(prompt).toContain("Topic: basic geography");
    expect(prompt).toContain("Difficulty: hard");
    expect(prompt).toContain("Card count: 15");
    expect(prompt).toContain('"title"');
    expect(prompt).toContain('"question"');
    expect(prompt).toContain('"answer"');
  });
});
