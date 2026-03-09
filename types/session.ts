export type Confidence = "blank" | "wobbly" | "locked";

export type SessionAnswer = {
  cardPosition: number;
  confidence: Confidence;
};
