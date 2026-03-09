import type { SessionAnswer, SessionSummary } from "@/types/session";

export function getSessionSummary(
  answers: SessionAnswer[],
  totalCards: number,
): SessionSummary {
  const blank = answers.filter((answer) => answer.confidence === "blank").length;
  const wobbly = answers.filter((answer) => answer.confidence === "wobbly").length;
  const locked = answers.filter((answer) => answer.confidence === "locked").length;
  const confidenceScore = totalCards === 0
    ? 0
    : Math.round(((locked + wobbly * 0.5) / totalCards) * 100);
  const strongRecallRate = totalCards === 0
    ? 0
    : Math.round((locked / totalCards) * 100);

  return {
    blank,
    confidenceScore,
    locked,
    reviewedCards: answers.length,
    strongRecallRate,
    totalCards,
    weakCards: blank + wobbly,
    wobbly,
  };
}
