# User Stories

These stories match the actual MVP: AI-generated study decks with a short study loop.

## Primary User

- A solo learner who wants to quickly study a topic without manually creating flashcards.

## P0 Stories

- As a learner, I want to enter a topic and generate a deck so that I can begin studying quickly.
- As a learner, I want to choose difficulty and card count so that the generated deck matches my study need.
- As a learner, I want to preview the generated deck before studying so that I understand what was created.
- As a learner, I want to study one card at a time so that I can focus on recall.
- As a learner, I want to reveal the answer after thinking first so that the session feels like active recall.
- As a learner, I want to mark a card as `Blank`, `Wobbly`, or `Locked` so that I can measure my confidence.
- As a learner, I want to see a simple session summary so that I know what I understood and what I should revisit.
- As a learner, I want to generate another deck after a session so that I can continue studying without extra setup.

## P1 Stories

- As a learner, I want to regenerate a deck if the generated questions do not look useful.
- As a learner, I want the app to remember decks and session data in a lightweight local store so that I do not lose progress during the challenge demo.
- As a learner, I want to review weak cards from the session so that I can revisit uncertain material.

## Not In Scope

- As a user, I do not need an account system for this MVP.
- As a user, I do not need social sharing or collaboration for this MVP.
- As a user, I do not need deep analytics or profile history for this MVP.

## Acceptance Criteria

### Generate Deck

- Given a valid topic
- When the user submits the form with a difficulty and card count
- Then the app starts deck generation and shows a loading state

### Preview Deck

- Given a generated deck
- When generation succeeds
- Then the user sees the deck title, card count, and generated question list

### Study Card

- Given a started session
- When the user is on a card
- Then the app shows the card front first and allows the answer to be revealed

### Mark Confidence

- Given a revealed answer
- When the user chooses `Blank`, `Wobbly`, or `Locked`
- Then that result is recorded and the session advances

### Session Summary

- Given a completed session
- When the user reaches the end of the deck
- Then the app shows totals for `Blank`, `Wobbly`, and `Locked`

## Build Priority

- P0: generate -> preview -> study -> mark confidence -> summary
- P1: regenerate deck, review weak cards, lightweight persistence
- P2: card editing and other conveniences
