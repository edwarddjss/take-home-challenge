import type { CardCount, Difficulty } from "@/types/deck";

export type DeckSource = {
  provider: "mock" | "openai";
  model?: string;
};

export type GenerateDeckInput = {
  topic: string;
  difficulty: Difficulty;
  cardCount: CardCount;
};

export type RawGeneratedCard = {
  question: string;
  answer: string;
};

export type RawGeneratedDeck = {
  title?: string;
  cards: RawGeneratedCard[];
  source?: DeckSource;
};

export type GeneratedFlashcard = {
  question: string;
  answer: string;
  position: number;
};

export type GeneratedDeck = {
  topic: string;
  title: string;
  difficulty: Difficulty;
  cardCount: CardCount;
  cards: GeneratedFlashcard[];
  source: DeckSource;
};

export type DeckGenerationRequest = {
  input: GenerateDeckInput;
  prompt: string;
};

export type DeckGenerator = (
  request: DeckGenerationRequest,
) => Promise<RawGeneratedDeck>;
