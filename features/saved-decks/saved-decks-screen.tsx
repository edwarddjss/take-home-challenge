"use client";

import Link from "next/link";
import { TopNav } from "@/components/layout/top-nav";
import { useSavedDecks } from "@/lib/saved-decks-store";

function formatSavedAt(savedAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(savedAt));
}

export function SavedDecksScreen() {
  const savedDecks = useSavedDecks();

  return (
    <main className="screen-shell screen-shell-form">
      <div className="screen-frame">
        <TopNav />
        <div className="screen-content">
          <section className="saved-decks-shell">
            <header className="saved-decks-header">
              <h1 className="saved-decks-title">Saved decks</h1>
            </header>

            {savedDecks.length === 0 ? (
              <section className="saved-decks-empty">
                <p className="saved-decks-empty-title">No saved decks yet.</p>
                <p className="saved-decks-empty-copy">
                  Save a deck from the preview screen and it will appear here.
                </p>
              </section>
            ) : (
              <div className="saved-decks-list">
                {savedDecks.map((entry) => (
                  <Link className="saved-deck-card" href={`/decks/${entry.id}`} key={entry.id}>
                    <div className="saved-deck-copy">
                      <h2 className="saved-deck-title">{entry.deck.title}</h2>
                      <p className="saved-deck-meta">
                        {entry.deck.cardCount} cards • {formatSavedAt(entry.savedAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
