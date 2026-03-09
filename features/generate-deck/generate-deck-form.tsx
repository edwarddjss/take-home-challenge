"use client";

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

type GenerateDeckFormProps = {
  cardCount: CardCount;
  difficulty: Difficulty;
  onCardCountChange: (value: CardCount) => void;
  onDifficultyChange: (value: Difficulty) => void;
  onSubmit: () => void;
  submitting: boolean;
  topic: string;
  onTopicChange: (value: string) => void;
};

export function GenerateDeckForm({
  cardCount,
  difficulty,
  onCardCountChange,
  onDifficultyChange,
  onSubmit,
  onTopicChange,
  submitting,
  topic,
}: GenerateDeckFormProps) {
  return (
    <form
      className="form-stack"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="field-stack">
        <FieldLabel htmlFor="topic">What do you want to learn?</FieldLabel>
        <TextField
          id="topic"
          type="text"
          value={topic}
          onChange={(event) => onTopicChange(event.target.value)}
        />
        <p className="field-help">AI generates a study deck from your topic.</p>
      </div>

      <SegmentedControl
        label="Difficulty"
        onChange={onDifficultyChange}
        options={difficulties}
        value={difficulty}
      />

      <SegmentedControl
        label="Number of cards"
        onChange={onCardCountChange}
        options={cardCounts}
        value={cardCount}
      />

      <Button disabled={submitting} type="submit">
        Generate deck
      </Button>
    </form>
  );
}
