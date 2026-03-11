# Architecture Review: Is this codebase "normal" for an MVP?

## Short answer

Yes — this is a legit, interview-ready MVP architecture.

The structure is recognizable and standard for a modern Next.js App Router project:

- `app/` for route composition and API boundaries
- `features/` for feature/screen orchestration
- `components/` for reusable primitives
- `lib/` for business and integration logic
- `types/` and `constants/` for shared contracts
- `tests/` for behavior coverage

This is not overengineered. If anything, it is slightly **more disciplined than average** for a 6-hour challenge.

---

## What is solid and standard

### 1) Clear boundary between routing and feature logic

Your page files are tiny composition shells, which is exactly what we want in App Router:

- `app/page.tsx` renders `GenerateDeckScreen`
- `app/decks/page.tsx` renders `SavedDecksScreen`

That keeps route files stable and pushes behavior into feature modules.

### 2) Feature-first organization is appropriate

`features/generate-deck`, `features/study-session`, and `features/saved-decks` are a good decomposition for MVP-level domain slices.

This is better than dumping everything into `app/` or making a giant "components" folder without ownership boundaries.

### 3) AI integration is decoupled enough for MVP

`app/api/decks/generate/route.ts` validates request shape and maps service errors; provider mechanics are handled in `lib/ai/*`.

This is a good boundary because it keeps transport concerns (HTTP) separate from provider concerns (OpenAI call/retry/normalization).

### 4) Data normalization and validation exist at the boundary

You normalize provider payload before it can leak into UI/store shape. For AI-generated data, this is a major maturity signal.

### 5) Local persistence pattern is pragmatic

`lib/saved-decks-store.ts` uses `localStorage` + `useSyncExternalStore`, which is a clean no-dependency approach for single-user MVP state.

For this challenge, that is absolutely normal and appropriate.

### 6) Tests target critical flows and seams

You have tests at multiple levels:

- API route behavior and error mapping
- AI normalization/retry/prompt logic
- feature interaction flows
- saved deck persistence semantics

For a take-home, this is stronger than average and supports "legit MVP" credibility.

---

## What is slightly extra (but still reasonable)

### 1) Access-code gate (`proxy.ts`) is optional complexity

Because auth/gating is usually out of scope for MVP take-homes, this adds extra surface area. That said, yours is simple and isolated. So it is "extra" but not "too much".

### 2) CSS file granularity is high

`app/layout.tsx` imports many style files. This is not wrong, but for long-term scaling this can become harder to track than collocated styles/CSS modules per feature.

For a small app it's fine.

### 3) Planning artifacts are extensive

Keeping planning docs can be a positive signal. Just make sure they are cleanly linked and consistent with repo paths (see recommendations below).

---

## Risks / non-standard edges to tighten

### 1) Saved deck ID collision strategy is simplistic

IDs are based on `topic + difficulty`, so two different generations with same topic/difficulty will overwrite each other. For MVP maybe acceptable, but it can surprise users.

Recommendation:

- Keep current id for deterministic lookup if desired
- Also store a true unique `savedAt`/UUID-based key, and expose one deck per save action

### 2) One feature component currently orchestrates many states

`GenerateDeckScreen` handles form/loading/preview/study/error and persistence integration. This is still understandable, but this is likely first refactor hotspot as features expand.

Recommendation:

- Keep state machine idea, but move transitions into a reducer or dedicated controller hook if adding more paths.

### 3) Planning docs use absolute local filesystem links

Some planning markdown links point to `/home/nazk/...`, which will break for reviewers cloning your repo.

Recommendation:

- Convert to repo-relative links only.

---

## Is it "too AI-coded" or "too extra"?

From structure alone: **no**.

Signals that this looks legitimate:

- coherent module ownership
- explicit domain types
- tests around failure paths (not only happy path)
- constrained dependencies (no unnecessary state libs)
- boundary validation and normalization for external AI data

If an interviewer inspects architecture, this reads as a deliberate MVP build, not a random AI dump.

---

## MVP verdict

### Overall: **Yes, legit MVP architecture**

- **Cleanliness:** good
- **Organization:** good
- **Modularization:** good for current scope
- **Excessiveness:** low-to-moderate (mostly from optional access gate + many CSS files)

You are in a strong place for take-home expectations.

---

## If you wanted one "next step" before showing this widely

Do this tiny hardening pass:

1. fix planning doc links to relative paths,
2. switch saved deck IDs to unique IDs,
3. optionally add a short "Architecture Decisions" section in README that explains why `features/` + `lib/ai/` + localStorage were chosen.

That would make the repo feel even more intentional with minimal extra work.
