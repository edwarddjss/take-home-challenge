import { getSessionSummary } from "@/lib/study-session/get-session-summary";

describe("getSessionSummary", () => {
  it("derives counts and percentages from session answers", () => {
    const summary = getSessionSummary(
      [
        { cardPosition: 0, confidence: "blank" },
        { cardPosition: 1, confidence: "wobbly" },
        { cardPosition: 2, confidence: "locked" },
        { cardPosition: 3, confidence: "locked" },
      ],
      4,
    );

    expect(summary).toEqual({
      blank: 1,
      confidenceScore: 63,
      locked: 2,
      reviewedCards: 4,
      strongRecallRate: 50,
      totalCards: 4,
      weakCards: 2,
      wobbly: 1,
    });
  });
});
