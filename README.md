# Deck: AI Flashcards Study App

Deck is an AI-powered flashcard application that generates customized study materials on any topic and helps users learn through spaced-repetition-style confidence tracking.

This project was built for a technical take-home challenge.

## Features

- **AI Generation:** Describe any topic and get a targeted, well-formatted deck of study cards.
- **Study Sessions:** Quiz yourself using a frictionless interface. Mark cards as *Locked*, *Wobbly*, or *Blank* to track your confidence.
- **Local Persistence:** Save your best decks directly to your browser for offline review.
- **Premium UX:** Built with a hyper-focus on clean, distraction-free design, glassmorphism, and responsive layouts.

## Tech Stack & Architecture

- **Framework:** Next.js 15 (App Router)
- **Styling:** Vanilla CSS (Tailwind was permitted, but standard modular CSS with design tokens was chosen for maximum control and clean component code).
- **Testing:** Vitest + React Testing Library.
- **AI Integration:** OpenAI (`gpt-4o-mini`) via `@ai-sdk/openai` and Vercel's AI SDK.
- **Storage:** Simple `localStorage` sync via `useSyncExternalStore` for robust, dependency-free state management.

### Architecture Highlights (SOLID)
- **Feature-sliced design:** UI components, hooks, and tests are grouped by feature (`features/generate-deck`, `features/study-session`) rather than by technical type, maximizing cohesion.
- **Single Responsibility Principle:** The AI pipeline is heavily decoupled. The route handler merely delegates. Building the prompt (`build-deck-generation-prompt.ts`), calling the LLM (`generate-deck-with-provider.ts`), normalizing the output (`normalize-generated-deck.ts`), and handling retries (`retry-deck-generator.ts`) are completely isolated and individually testable pure functions.
- **Clean UI Components:** "Dumb" components like `<StudySessionCard>` only render UI based on props, while "Smart" screens like `<StudySessionScreen>` handle the state machine.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- `pnpm` (recommended)

### 1. Install dependencies
```bash
pnpm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Add a passcode to gate access to the app 
# (Highly recommended if deploying publicly to protect your API quota)
ACCESS_CODE=your_secret_passcode
```

### 3. Run the development server
```bash
pnpm dev
```
Navigate to `http://localhost:3000`.

### 4. Run tests
```bash
pnpm test
```
The suite includes 31 tests covering the AI generation pipeline (mocked), UI interaction flows, and localStorage persistence.

---

## What I'd Improve (Next Steps)

Given a strict timebox for the MVP, some trade-offs were made. If I had another week to work on this, I would focus on:

1. **True Spaced Repetition (SRS):** 
   Currently, the confidence ratings (Blank/Wobbly/Locked) provide great end-of-session analytics but aren't saved to track card-by-card mastery over time. I would implement an algorithm (like SuperMemo-2 or Anki's adaptation) to schedule when individual cards should reappear, rather than reviewing the whole deck sequentially.

2. **Backend Database & User Auth:**
   The `localStorage` approach is fast and private, but users lose their decks if they clear their browser data or switch devices. I would add NextAuth for Google/GitHub login and a Postgres database (via Prisma or Drizzle) to persist decks, study history, and SRS intervals securely.

3. **Editable Decks:**
   The AI occasionally generates a prompt that isn't quite what the user wanted, or the user might want to fix a typo. Allowing users to edit the front/back of individual cards, or add/delete custom cards to an AI-generated deck, would massively improve the long-term utility of the app.

4. **Improved Loading States:**
   Generating 15 hard cards can take a few seconds resulting in a static spinner. Implementing a streaming UI (using `useChat` or `streamObject` from the Vercel AI SDK) to show cards appearing one-by-one would make the generation phase feel much faster and more engaging.
