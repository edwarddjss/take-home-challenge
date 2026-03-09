export type Confidence = "blank" | "wobbly" | "locked";

export type SessionAnswer = {
  cardPosition: number;
  confidence: Confidence;
};

export type SessionSummary = {
  blank: number;
  confidenceScore: number;
  locked: number;
  reviewedCards: number;
  strongRecallRate: number;
  totalCards: number;
  weakCards: number;
  wobbly: number;
};
