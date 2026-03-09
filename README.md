# Deck

Deck is a minimal AI-generated flashcard MVP built for a timeboxed take-home challenge.

## Features

- Generate a deck from a topic, difficulty, and card count
- Review the generated deck before studying
- Run a study session with `Blank`, `Wobbly`, and `Locked` confidence ratings
- Save decks locally in the browser for later review
- Optionally gate the app behind a server-enforced access code

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Vanilla CSS
- OpenAI Responses API via the official `openai` SDK
- Vitest + React Testing Library
- Browser `localStorage` for saved decks

## Architecture

- `app/`: routes, layout, server action, and API route
- `features/`: screen-level feature modules
- `components/`: shared UI and layout primitives
- `lib/ai/`: prompt building, provider call, normalization, retry, and validation
- `lib/saved-decks-store.ts`: browser-local saved deck store
- `lib/access/`: access-code token helpers
- `types/` and `constants/`: shared domain types and config

## Setup

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

3. Run the app:

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

- Deck generation is served through `POST /api/decks/generate`.
- Saved decks are browser-local and not shared across devices.
- Access control is enforced through `proxy.ts` and a server-issued auth cookie.
