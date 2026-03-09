"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TopNav } from "@/components/layout/top-nav";
import {
  defaultCardCount,
  defaultDifficulty,
  minimumLoadingDurationMs,
} from "@/constants/deck";
import { GenerateDeckForm } from "@/features/generate-deck/generate-deck-form";
import { GenerateDeckLoadingScreen } from "@/features/generate-deck/generate-deck-loading-screen";
import { GenerateDeckPreviewScreen } from "@/features/generate-deck/generate-deck-preview-screen";
import { StudySessionScreen } from "@/features/study-session/study-session-screen";
import { isDeckSaved, saveGeneratedDeck, useSavedDecks } from "@/lib/saved-decks-store";
import type { GenerateDeckErrorResponse, GeneratedDeck } from "@/types/ai";
import type { CardCount, Difficulty } from "@/types/deck";

type ScreenState = "form" | "loading" | "preview" | "study" | "error";

type GenerateDeckScreenProps = {
  minimumLoadingMs?: number;
  requestDeck?: typeof requestGeneratedDeck;
};

async function requestGeneratedDeck(input: {
  topic: string;
  difficulty: Difficulty;
  cardCount: CardCount;
}): Promise<GeneratedDeck> {
  const response = await fetch("/api/decks/generate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = (await response.json()) as GenerateDeckErrorResponse;
    throw new Error(error.message);
  }

  return response.json() as Promise<GeneratedDeck>;
}

export function GenerateDeckScreen({
  minimumLoadingMs = minimumLoadingDurationMs,
  requestDeck = requestGeneratedDeck,
}: GenerateDeckScreenProps) {
  useSavedDecks();
  const [cardCount, setCardCount] = useState<CardCount>(defaultCardCount);
  const [deck, setDeck] = useState<GeneratedDeck | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultDifficulty);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [screen, setScreen] = useState<ScreenState>("form");
  const [topic, setTopic] = useState("");

  async function generateDeck() {
    const trimmed = topic.trim();
    if (!trimmed) return;

    setScreen("loading");
    setErrorMessage(null);

    try {
      const startedAt = Date.now();
      const nextDeck = await requestDeck({ topic: trimmed, difficulty, cardCount });
      const remainingDelay = minimumLoadingMs - (Date.now() - startedAt);

      if (remainingDelay > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, remainingDelay));
      }

      setDeck(nextDeck);
      setScreen("preview");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setScreen("error");
    }
  }

  function returnToEditScreen() {
    setScreen("form");
  }

  function startStudying() {
    setScreen("study");
  }

  function returnToPreview() {
    setScreen("preview");
  }

  if (screen === "study" && deck) {
    return (
      <StudySessionScreen
        deck={deck}
        onClose={returnToPreview}
        onGenerateNewDeck={returnToEditScreen}
      />
    );
  }

  return (
    <main className={`screen-shell screen-shell-${screen === "error" ? "form" : screen}`}>
      <div className="screen-frame">
        <TopNav />
        <div className="screen-content">
          {screen === "form" ? (
            <section className="screen-panel">
              <GenerateDeckForm
                cardCount={cardCount}
                difficulty={difficulty}
                onCardCountChange={setCardCount}
                onDifficultyChange={setDifficulty}
                onSubmit={generateDeck}
                onTopicChange={setTopic}
                submitting={false}
                topic={topic}
              />
            </section>
          ) : null}

          {screen === "loading" ? <GenerateDeckLoadingScreen /> : null}

          {screen === "error" ? (
            <section className="screen-panel">
              <div className="form-stack">
                <p className="field-label">Generation failed</p>
                <p className="field-help">{errorMessage}</p>
                <Button onClick={returnToEditScreen} type="button">
                  Try again
                </Button>
              </div>
            </section>
          ) : null}

          {screen === "preview" && deck ? (
            <GenerateDeckPreviewScreen
              deck={deck}
              isSavedDeck={isDeckSaved(deck)}
              onRegenerate={returnToEditScreen}
              onSaveDeck={() => saveGeneratedDeck(deck)}
              onStartStudying={startStudying}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}

