"use client";

"use client";

import { useState } from "react";
import { TopNav } from "@/components/layout/top-nav";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field-label";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { TextField } from "@/components/ui/text-field";
import type { CardCount, Difficulty } from "@/types/deck";

const difficulties = [
  { label: "easy", value: "easy" },
  { label: "medium", value: "medium" },
  { label: "hard", value: "hard" },
] satisfies { label: string; value: Difficulty }[];

const cardCounts = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
] satisfies { label: string; value: CardCount }[];

export function GenerateDeckScreen() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [cardCount, setCardCount] = useState<CardCount>(10);

  return (
    <main className="screen-shell">
      <TopNav />

      <header className="hero-block">
        <h1 className="app-title">Deck</h1>
      </header>

      <section className="screen-panel">
        <form className="form-stack" onSubmit={(event) => event.preventDefault()}>
          <div className="field-stack">
            <FieldLabel htmlFor="topic">What do you want to learn?</FieldLabel>
            <TextField
              id="topic"
              type="text"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
            />
            <p className="field-help">AI generates a study deck from your topic.</p>
          </div>

          <SegmentedControl
            label="Difficulty"
            onChange={setDifficulty}
            options={difficulties}
            value={difficulty}
          />

          <SegmentedControl
            label="Number of cards"
            onChange={setCardCount}
            options={cardCounts}
            value={cardCount}
          />

          <Button type="submit">
            Generate deck
          </Button>
        </form>
      </section>
    </main>
  );
}
