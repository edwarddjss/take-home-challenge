"use client";

import { useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/layout/top-nav";
import { GenerateDeckPreviewScreen } from "@/features/generate-deck/generate-deck-preview-screen";
import { StudySessionScreen } from "@/features/study-session/study-session-screen";
import { getSavedDeckById } from "@/lib/saved-decks-store";

type SavedDeckDetailScreenProps = {
  deckId: string;
};

export function SavedDeckDetailScreen({
  deckId,
}: SavedDeckDetailScreenProps) {
  const [screen, setScreen] = useState<"preview" | "study">("preview");
  const entry = getSavedDeckById(deckId);

  if (!entry) {
    return (
      <main className="screen-shell screen-shell-form">
        <div className="screen-frame">
          <TopNav />
          <div className="screen-content">
            <section className="saved-decks-empty">
              <p className="saved-decks-empty-title">Saved deck not found.</p>
              <p className="saved-decks-empty-copy">
                <Link href="/decks">Return to saved decks</Link> and choose another deck.
              </p>
            </section>
          </div>
        </div>
      </main>
    );
  }

  if (screen === "study") {
    return (
      <StudySessionScreen
        deck={entry.deck}
        onClose={() => setScreen("preview")}
        onGenerateNewDeck={() => setScreen("preview")}
      />
    );
  }

  return (
    <main className="screen-shell screen-shell-preview">
      <div className="screen-frame">
        <TopNav />
        <div className="screen-content">
          <GenerateDeckPreviewScreen
            deck={entry.deck}
            isSavedDeck
            onStartStudying={() => setScreen("study")}
          />
        </div>
      </div>
    </main>
  );
}
