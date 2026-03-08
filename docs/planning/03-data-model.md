# Data Model

This app uses one persistent in-memory JSON object. The model should stay intentionally small and map directly to the MVP flow.

## Model Decisions

- Use one top-level app store object.
- Keep `cards` nested inside `decks`.
- Track only one active session at a time.
- Store per-card confidence results inside the active session.
- Derive summary totals from session answers instead of storing duplicate aggregate fields.
- Do not model users, profiles, analytics, sharing, or settings.

## Entities

### Deck

- Purpose: a generated study deck for a single topic and generation settings
- Required fields:
  - `id`
  - `topic`
  - `title`
  - `difficulty`
  - `cardCount`
  - `cards`
  - `createdAt`
  - `updatedAt`
- Optional fields:
  - `source`
- Derived fields:
  - `completedSessions`
  - `lastStudiedAt`

### Flashcard

- Purpose: one generated question-and-answer pair inside a deck
- Required fields:
  - `id`
  - `question`
  - `answer`
  - `position`
- Optional fields:
  - `note`
- Derived fields:
  - `latestConfidence`

### Active Session

- Purpose: the current study run for one deck
- Required fields:
  - `id`
  - `deckId`
  - `mode`
  - `cardOrder`
  - `currentCardIndex`
  - `revealedCardIds`
  - `answers`
  - `startedAt`
- Optional fields:
  - `completedAt`
- Derived fields:
  - `isComplete`
  - `remainingCount`
  - `summary`

### Session Answer

- Purpose: the learner's confidence result for one reviewed card
- Required fields:
  - `cardId`
  - `confidence`
  - `answeredAt`
- Derived fields:
  - none

## Relationships

- A deck has many flashcards
- A flashcard belongs to one deck by nesting, not by separate foreign-key storage
- An active session belongs to one deck
- A session answer belongs to one card in that session

## Enums

```ts
type Difficulty = "easy" | "medium" | "hard";

type Confidence = "blank" | "wobbly" | "locked";

type SessionMode = "full" | "weak-review";
```

## Type Draft

```ts
type AppStore = {
  version: 1;
  decks: Deck[];
  activeSession: StudySession | null;
  updatedAt: string;
};

type Deck = {
  id: string;
  topic: string;
  title: string;
  difficulty: Difficulty;
  cardCount: number;
  cards: Flashcard[];
  createdAt: string;
  updatedAt: string;
  source?: {
    provider: "openai";
    model?: string;
  };
};

type Flashcard = {
  id: string;
  question: string;
  answer: string;
  position: number;
  note?: string;
};

type StudySession = {
  id: string;
  deckId: string;
  mode: SessionMode;
  cardOrder: string[];
  currentCardIndex: number;
  revealedCardIds: string[];
  answers: SessionAnswer[];
  startedAt: string;
  completedAt?: string;
};

type SessionAnswer = {
  cardId: string;
  confidence: Confidence;
  answeredAt: string;
  elapsedMs?: number;
};
```

## In-Memory Shape

```ts
const seedData: AppStore = {
  version: 1,
  decks: [],
  activeSession: null,
  updatedAt: new Date().toISOString(),
};
```

## Example Object

```ts
const exampleDeck: Deck = {
  id: "deck_geo_001",
  topic: "Basic Geography",
  title: "Basic Geography",
  difficulty: "easy",
  cardCount: 5,
  cards: [
    {
      id: "card_geo_001",
      question: "What is the capital of France?",
      answer: "Paris",
      position: 0,
    },
  ],
  createdAt: "2026-03-08T18:00:00.000Z",
  updatedAt: "2026-03-08T18:00:00.000Z",
  source: {
    provider: "openai",
  },
};
```

## Validation Rules

- Topic:
  - required
  - trim leading and trailing whitespace
  - minimum 2 visible characters
  - maximum 120 characters
- Deck title:
  - required after generation
  - fallback to trimmed topic if generation does not provide one
  - maximum 120 characters
- Difficulty:
  - must be one of `easy | medium | hard`
- Card count:
  - must be one of `5 | 10 | 15`
- Card question:
  - required
  - trimmed
  - maximum 240 characters
- Card answer:
  - required
  - trimmed
  - maximum 500 characters
- Card ordering:
  - `position` must be unique within a deck
  - `cardOrder` must reference only cards in the chosen deck
- Session answers:
  - one answer per card per session
  - `confidence` must be one of `blank | wobbly | locked`
- Delete behavior:
  - deleting a deck removes the active session if it belongs to that deck
  - deleting a deck removes all nested cards with it

## Derived Logic

- `isComplete` is true when `answers.length === cardOrder.length`
- `remainingCount` is `cardOrder.length - answers.length`
- `summary.blank` is the number of answers with confidence `blank`
- `summary.wobbly` is the number of answers with confidence `wobbly`
- `summary.locked` is the number of answers with confidence `locked`
- `latestConfidence` for a card is derived from the most recent answer in the latest session for that deck

## What We Persist

- Decks
- Nested flashcards
- One active session
- Session answers for the active session

## What We Do Not Persist

- User identity
- Session analytics dashboards
- Long-term spaced repetition history
- Cross-device sync data
- Multiple concurrent sessions
- Full provider request/response payloads

## Notes

- Assumptions that simplify the MVP:
  - one active session only
  - cards are generated as a complete deck, not streamed individually
  - decks remain editable as data later if needed, but edit fields are not modeled now
- Migration path if a real database were added later:
  - `Deck`, `Flashcard`, `StudySession`, and `SessionAnswer` can become tables
  - nested `cards` can be normalized later without changing the user-facing flow
  - `version` on the store allows a simple migration hook if the JSON shape changes
