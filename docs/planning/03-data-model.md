# Data Model

Keep this lightweight and implementation-oriented. The app can use in-memory data, but the model should still be deliberate.

## Entities

### Deck

- Purpose:
- Required fields:
- Optional fields:
- Derived fields:

### Flashcard

- Purpose:
- Required fields:
- Optional fields:
- Derived fields:

### Study State

- Purpose:
- Required fields:
- Optional fields:
- Derived fields:

## Relationships

- A deck has many flashcards
- A flashcard belongs to one deck
- Study state is tracked per:

## Field Draft

```ts
type Deck = {};

type Flashcard = {};

type StudyState = {};
```

## In-Memory Shape

```ts
const seedData = {
  decks: [],
  flashcards: [],
  studyState: [],
};
```

## Validation Rules

- Deck name:
- Card front:
- Card back:
- Delete behavior:
- Ordering behavior:

## Notes

- Any assumptions that simplify the MVP:
- Migration path if a real database were added later:
