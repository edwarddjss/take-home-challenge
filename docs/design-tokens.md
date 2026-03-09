# Design Tokens

This doc captures the design system used for the MVP, trimmed down to the actual screens and interactions we kept.

## Design Intent

- Style: soft brutalist / pastel brutalist
- Tone: calm, playful, editorial, slightly quirky
- Product feel: focused study tool, not a dashboard app
- Rule: keep the structure bold, but soften the edges, shadows, and color contrast

## Keep

- Large rounded cards
- Thin to medium dark outlines
- Pastel color blocking
- Pill-shaped primary actions
- Space Grotesk-style typography
- Sparse icon use
- Clean centered layouts
- High-contrast single-purpose screens

## Cut

- Profile avatars
- Settings menus
- Search
- Share actions
- Recent decks section
- Explore links
- Footer nav
- Dashboard/stats views
- Retention metrics
- Response-time metrics
- Multi-screen utility chrome that implies a larger product than the MVP

## MVP Screens

- Home / Generate Deck
- Loading
- Deck Preview
- Study Session
- Session Summary

## Core Tokens

### Colors

Use this as the main palette:

```css
:root {
  --color-bg: #fdfaf1;
  --color-surface: #ffffff;
  --color-surface-alt: #f1efff;
  --color-primary: #13ec80;
  --color-mint: #d1fae5;
  --color-butter: #fdf3a3;
  --color-peach: #ffcfbf;
  --color-sky: #e0f2fe;
  --color-charcoal: #1a1a1a;
  --color-muted: rgba(26, 26, 26, 0.6);
  --color-border: #1a1a1a;
  --color-status-blank: #ffcfbf;
  --color-status-wobbly: #fdf3a3;
  --color-status-locked: #13ec80;
}
```

Color usage rules:
- Default page background: `--color-bg`
- Primary CTA and positive emphasis: `--color-primary`
- Secondary surfaces: `--color-surface`, `--color-surface-alt`, `--color-sky`
- Blank status: `--color-status-blank`
- Wobbly status: `--color-status-wobbly`
- Locked status: `--color-status-locked`
- Text and border: `--color-charcoal`

Avoid:
- Dark themes for MVP
- Saturated magenta blocks from the mockups
- Heavy gradients
- Purple-dominant UI

### Typography

```css
:root {
  --font-display: "Space Grotesk", sans-serif;
}
```

Type rules:
- Use one main typeface for the MVP
- Headlines: bold to black, tight tracking
- Body copy: regular to medium
- Labels and helper text: small, restrained, slightly muted
- Keep copy short and functional

Suggested scale:
- Hero title: `text-5xl` to `text-7xl`
- Screen title: `text-3xl` to `text-5xl`
- Card question: `text-2xl` to `text-4xl`
- Body: `text-base` to `text-lg`
- Label: `text-sm`
- Meta text: `text-xs`

### Radius

```css
:root {
  --radius-card: 1rem;
  --radius-panel: 1.5rem;
  --radius-pill: 9999px;
}
```

Rules:
- Cards and panels: rounded, never sharp
- Inputs: rounded-xl
- Primary buttons: pill shape
- Avoid square corners unless needed for a tiny accent detail

### Border

```css
:root {
  --border-width: 2px;
}
```

Rules:
- Use a consistent `2px` charcoal border
- Borders should be visible but not feel aggressive
- No hairline gray SaaS borders

### Shadow

```css
:root {
  --shadow-soft-brutalist: 3px 3px 0 0 #1a1a1a;
  --shadow-soft-brutalist-sm: 2px 2px 0 0 #1a1a1a;
}
```

Rules:
- Use offset shadows sparingly
- Prefer `2px` or `3px` offsets over harsher `4px+` when possible
- Remove or reduce shadow on press/active states

## Layout Rules

- Prefer centered layouts with one dominant content column
- Use generous whitespace around the main card
- Desktop first, but mobile-safe
- One primary action per screen
- Avoid complex sidebars and dense nav

Suggested container widths:
- Main flow screens: `max-w-2xl` to `max-w-4xl`
- Study screen: `max-w-4xl`
- Summary screen: `max-w-5xl`

## Component Spec

### App Shell

- Minimal top bar with only brand mark and wordmark
- No profile, settings, or utility icons in MVP

### Buttons

- Primary button:
  - `--color-primary` background
  - pill radius
  - bold label
  - visible border
  - soft brutalist shadow
- Secondary button:
  - white or pastel surface
  - same border and radius

### Inputs

- Large input height
- Rounded corners
- Light surface fill
- Strong label above input
- One helper text line allowed below

### Option Selectors

- Segmented or grouped button controls
- Difficulty: `Easy`, `Medium`, `Hard`
- Card count: `5`, `10`, `15`
- Selected state should use a pastel fill or primary tint

### Flashcard

- Large centered card
- One question at a time
- Front first, answer revealed in place
- Avoid decorative clutter inside the study card

### Confidence Actions

- Three equal-weight buttons after reveal
- `Blank`, `Wobbly`, `Locked`
- Distinct background color per state
- Strong, obvious tap targets

### Summary Blocks

- Show only the 3 confidence totals
- Optional simple note or ratio
- No analytics dashboard
- Optional `Review weak cards` CTA is acceptable because it can be derived from in-memory session data

## Motion

- Short hover lifts or pressed-state flattening
- Gentle transitions only
- No complex animation system required
- Loading state can use a small custom progress treatment or calm illustration

## Iconography

- Use icons sparingly
- Prefer simple outline icons
- Icons should support comprehension, not decorate every component

## Content Rules

- Use concise product copy
- Prefer study-oriented wording over marketing language
- Example topics:
  - `Basic Geography`
  - `Photosynthesis`
  - `JavaScript Closures`

## Screen-Specific Notes

### Home

- Keep only the topic input, difficulty selector, card count selector, and generate CTA

### Loading

- Keep it minimal and intentional
- Remove any promise of editing or advanced controls from this screen

### Deck Preview

- Keep generated title, card list, `Start studying`, and `Regenerate deck`
- Remove share and overflow menus

### Study Session

- Keep progress, card, reveal action, and confidence actions
- Remove close button unless it is needed as a simple `Back` action

### Summary

- Keep session complete headline, confidence totals, `Generate new deck`
- `Review weak cards` is optional
- Remove profile, settings, stats breakdowns, badges, and footer navigation

## Data Implications

Safe to support with a persistent in-memory JSON object:
- Generated decks
- Deck metadata
- Flashcards
- Current session progress
- Session summary counts
- Optional weak-card review from the same session

Do not design for in MVP:
- User profiles
- Cross-user sharing
- Achievement systems
- Long-term analytics
- Multi-device history
- Notifications or reminders
