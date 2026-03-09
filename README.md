# Deck

Deck is a minimal AI-generated flashcard MVP built for a timeboxed take-home challenge.

## Current MVP

- Generate a deck from a topic, difficulty, and card count
- Review the generated deck before studying
- Run a study session with `Blank`, `Wobbly`, and `Locked` confidence ratings
- Save decks locally in the browser for later review
- Optionally gate the app behind a server-verified access code

## Stack

- Next.js 16 App Router
- React 19
- Vanilla CSS with shared design tokens
- OpenAI Responses API via the official `openai` SDK
- Vitest + React Testing Library
- `localStorage` for saved decks

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Add environment variables in `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-nano

# Optional app gate for deployed environments
ACCESS_CODE=your_secret_passcode
```

3. Start the app:

```bash
pnpm dev
```

4. Run checks:

```bash
pnpm test
pnpm lint
pnpm build
```

## Notes

- Saved decks are intentionally browser-local for MVP speed.
- The access gate is enforced on the server through middleware and a server-issued auth cookie.
- The AI generation pipeline is split into prompt building, provider execution, normalization, and retry handling to keep failures isolated and testable.
