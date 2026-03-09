import {
  buildDeckGenerationPrompt,
  deckGenerationInstructions,
} from "@/lib/ai/build-deck-generation-prompt";

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

  it("defines provider instructions separately from the user prompt", () => {
    expect(deckGenerationInstructions).toContain("Follow the required JSON schema exactly.");
    expect(deckGenerationInstructions).toContain("Do not include commentary outside the JSON response.");
  });
});
