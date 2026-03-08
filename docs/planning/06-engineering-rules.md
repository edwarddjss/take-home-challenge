# Engineering Rules

This is the implementation contract for the codebase. If a change breaks these rules, rework it before continuing.

## Architecture

- Build only the 5 MVP screens defined in [04-mvp-scope.md](/home/nazk/Projects/deck/docs/planning/04-mvp-scope.md).
- Keep the app single-user with one persistent in-memory JSON store.
- Put OpenAI integration behind one server-side module.
- Normalize AI output before it reaches routes, components, or storage.
- Keep business logic out of page files whenever it can live in a feature or lib module.

## Code Organization

- Use this structure when implementation starts:
  - `app/` routes and route-level composition only
  - `components/` shared UI primitives
  - `features/` feature-specific UI and logic
  - `lib/` storage, helpers, provider integrations
  - `types/` shared domain types
  - `tests/` unit and feature tests
- Prefer one responsibility per file.
- Target under 100 lines per file.
- Hard stop at 150 lines per file unless the file is pure configuration.
- Split files before they become mixed-purpose.
- Use conventional file names only.
- Prefer lowercase kebab-case file names such as `generate-deck-screen.tsx` or `text-field.tsx`.

## DRY Rules

- Do not duplicate domain types across files.
- Do not hardcode repeated colors, spacing, radius, borders, or shadows in components.
- Put design tokens in one shared source and reference them semantically.
- If planned screens already make reuse obvious, extract the shared primitive in the first implementation instead of waiting for later refactors.
- Do not build generic abstractions for hypothetical future features.

## TypeScript Rules

- Use strict TypeScript everywhere.
- Shared domain types live in `types/`.
- Feature-local view models can live with the feature if they are not reused.
- Avoid `any`.
- Prefer explicit return types for exported functions.
- Type and validate provider payloads at the boundary.

## Component Rules

- Reusable components should be presentational and composable.
- Feature components may coordinate state, but should not own unrelated concerns.
- Page files should mostly assemble sections and call feature modules.
- When the screen plan already shows repeated controls across screens, build shared UI primitives first.
- If a component grows multiple variants, extract shared primitives instead of copying JSX.
- Delete unused components immediately.

## Styling Rules

- Use the design system in [design-tokens.md](/home/nazk/Projects/deck/docs/design-tokens.md).
- Centralize tokens in global CSS variables and map them into Tailwind usage patterns.
- Use semantic token names such as `--color-primary`, not screen-specific names.
- No inline hardcoded hex values in components unless they are being removed in the same change.
- Keep styling local, readable, and reusable.

## State and Data Rules

- Use the smallest state surface that works.
- Keep transient UI state local to the feature that owns it.
- Persist only data that supports the MVP:
  - generated decks
  - flashcards
  - active session progress
  - summary results
- Do not add models for profiles, analytics, sharing, or settings.

## Testing Rules

- Use test-driven development for feature work.
- Before implementing a feature, write the failing test first.
- Every feature must ship with unit tests for its critical logic.
- Pure functions and storage logic must be tested directly.
- Complex UI interactions should be covered where behavior can regress.
- No feature is complete until its tests pass.

## Quality Gates

- Required before a feature is done:
  - lint passes
  - type checks pass
  - tests pass
  - dead code is removed
- No commented-out code.
- No placeholder components, copy, or starter assets.
- If a file or dependency is unused, remove it in the same change.

## Git Rules

- Commit small, coherent changes.
- Keep commit messages specific and action-oriented.
- Do not mix refactors with new behavior unless the refactor is required for the feature.
- If a rule must be broken for speed, document the tradeoff in the README or planning docs.
- Never start the development server from the agent. The user owns `pnpm dev` and will run it manually.
