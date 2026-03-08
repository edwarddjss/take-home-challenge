# MVP Scope

This app is a minimal AI-assisted study flow, not a full flashcard platform.

## Core Outcome

- A user can enter a topic, generate a flashcard deck, study each card, mark confidence, and finish with a simple summary.

## Must Have

- Topic input on the home screen
- Difficulty selection
- Card count selection
- Generate deck action
- Loading state while the deck is being created
- Generated deck preview with title and question list
- `Regenerate deck` action
- `Start studying` action
- Study session with one card at a time
- Reveal answer interaction
- Confidence rating per card:
  - `Blank`
  - `Wobbly`
  - `Locked`
- Session progress indicator
- Summary screen with totals for each confidence state
- `Generate new deck` action
- Persistent in-memory JSON storage for decks and current session data

## Should Have

- Basic validation for empty topic input
- Helpful empty/loading/error states
- Ability to review weak cards from the just-finished session
- Ability to persist the most recent generated deck list in the in-memory store

## Nice to Have

- Edit generated cards before studying
- Regenerate a single card
- Keyboard shortcuts during study

## Explicitly Out of Scope

- Authentication
- User profiles
- Settings pages
- Search
- Share actions
- Public deck URLs
- Database integration
- Rate limiting UI
- Long-term analytics
- Achievements, streaks, or gamification
- Complex deck library management
- Multi-user collaboration

## Data Rule

The MVP should only require data that can be stored cleanly in a persistent in-memory JSON object. If a feature implies a real database, do not include it.

## Timebox Plan

### Hour 0 to 1

- Finalize flow, design tokens, and data model
- Lock the MVP and cut list

### Hour 1 to 4

- Build home, loading, preview, study, and summary screens
- Build the AI generation path
- Build session state and confidence tracking

### Hour 4 to 5.5

- Polish UI
- Add validation
- Add tests for critical logic
- Write README notes

### Hour 5.5 to 6

- Verify challenge deliverables
- Final pass on README and planning artifacts
- Submit

## Cut List If Time Slips

1. `Review weak cards`
2. Editing generated cards before study
3. Any non-essential decorative UI or secondary helper copy
