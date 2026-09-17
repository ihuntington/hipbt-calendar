# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A calendar UI ("Have I Played Bowie Today? Calendar") that renders a user's music listening history (from a separate "Bowie" scrobbling API, plus Spotify metadata) as calendar events, in the style of the macOS Calendar app. Currently hardcoded to a single user's data. This is a personal/experimental project — see `Ideas.md` for planned features and `Notes.md` for design notes (e.g. dark theme colour values).

## Commands

- `npm run dev` — start the Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run `next lint` (ESLint, config extends `next/core-web-vitals`)

There is no test suite/framework configured in this repo (no test script, no Jest/Vitest config).

### Local dependencies

- **Redis** must be running locally on port `63790` (hardcoded in `lib/redis.ts`, not the Redis default of 6379) — used to cache Spotify track lookups.
- Required environment variables (no `.env.example` committed): `API_URL`, `API_AUTH` (for the Bowie scrobbles API in `lib/bowie.ts`), `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` (for Spotify client-credentials auth in `lib/spotify.ts`).

## Architecture

### Data flow

1. **`lib/bowie.ts`** — `Bowie` class fetches raw scrobble/play data from an external "Bowie" API (`API_URL`/scrobbles endpoint), keyed by date range + username.
2. **`lib/calendar.ts`** — `CalendarWeek` is the core domain class. It takes plays from `Bowie` and groups consecutive tracks into `ListenEvent`s (a block of listening, not one event per track): plays within `MINUTES_BETWEEN_EVENTS` (15 min) of each other are merged into the same event. It then fetches album art for each event's first track via `lib/spotify.ts`, using `lib/redis.ts` as a 5-minute cache in front of the Spotify API.
3. **`lib/spotify.ts`** — `Spotify` class handles OAuth client-credentials auth and track lookups against the Spotify Web API.
4. **API routes** expose this to the frontend:
   - `pages/api/week.ts` → `CalendarWeek.getEvents()`, the primary endpoint the week view consumes.
   - `pages/api/calendar.ts` → raw per-day plays via `Bowie` directly (used for month view style listing).
5. Frontend data fetching uses TanStack Query (`@tanstack/react-query`), with a fresh `QueryClient` created in `WeekPage`.

### Pages / routing (Next.js Pages Router)

- `pages/calendar/index.tsx` — month view.
- `pages/calendar/week/[[...slug]].tsx` — week view; optional catch-all `slug` (3 segments) encodes the target date, parsed server-side in `getServerSideProps` and passed down as `initialDate`/`now`.
- `pages/ui.tsx` — scratch page for isolated component work (currently just renders `HourGrid`).
- `pages/api/*` — the two endpoints above.

### Calendar state

`components/Calendar/context/CalendarContext.tsx` provides two contexts (split for render-perf reasons):
- `CalendarStateContext` — current `date`/`time`/`view` plus derived day/week bounds.
- `CalendarActionContext` — `setDate`/`setTime` actions.

The provider also runs a `setTimeout` tick loop to advance `time` once per minute, which drives the "current time" marker in the week/hour grid (`HourGrid.tsx`'s `CurrentTimeMarker`).

### Component structure

- `components/Calendar/` is the main feature area, with view-specific subcomponents under `components/Calendar/components/` (e.g. `WeekView`, `WeekGrid`, `WeekHeader`, `DayCell`, `HourGrid`, `MonthNav`, `MonthYearTitle`). Each subcomponent folder typically re-exports itself via an `index.ts`, and `components/Calendar/components/index.ts` re-exports all of them as a barrel.
- `components/App/App.tsx` wraps every page; it injects an inline script that toggles a `dark` class on `<html>` based on `localStorage.theme` / `prefers-color-scheme`, before hydration (avoids flash of wrong theme).
- Layout/positioning of events in the week grid is computed from time offsets: `CalendarEvent.tsx` positions itself via CSS custom properties (`assignInlineVars` from vanilla-extract) computed from minutes-since-midnight, at a fixed pixel-per-minute multiplier (`MULTIPLIER`/`multiplier = 2`) — this constant is duplicated across `CalendarEvent.tsx` and `HourGrid.tsx` rather than shared.
- Track/event detail on click is shown in a Radix `Popover` (`components/Popover`), rendering `EventPanel`.

### Styling

- Styling is [Vanilla Extract](https://vanilla-extract.style/): most components have a co-located `<Name>.css.ts` exporting `style(...)` classes, imported as `import * as styles from "./X.css"`. The project README notes the approach is intentionally inconsistent across files ("first time using the library... implementation is a bit messy") — expect to see different patterns (raw `style()`, CSS vars via `createVar`/`assignInlineVars`, container queries) in different components.
- `styles/theme.css.ts` defines global theme tokens (colours, spacing, font sizes, shadows, radii) via `createGlobalTheme`. Light/dark theme variants are present but commented out — dark mode is currently handled ad hoc per-component with `.dark &` / `['.dark &']` selectors, not via vanilla-extract theme classes.
- `styles/sprinkles.css.ts` defines a small set of atomic utility props (`fontSize`, `lineHeight`, `fontWeight`, `position`, `overflowX/Y`) via `@vanilla-extract/sprinkles`, used as `sprinkles({ ... })` (commonly aliased `s`) combined with `clsx`.
- `styles/vars.css` (plain CSS, not vanilla-extract) defines the light/dark page background/text vars keyed off `html[data-color-theme]`.
- A few components mix in a plain `.module.css` file alongside `.css.ts` (e.g. `CalendarEvent.module.css`) — these are largely empty placeholders, not the primary styling mechanism.
- Next.js is configured (`next.config.js`) to alias React to Preact (`preact/compat`) in client production builds only — dev and server builds still use real React.

### Import conventions

Path aliases are configured in `tsconfig.json`: `@/components/*`, `@/styles/*`, `@/services/*` (baseUrl `.`). In practice the codebase is inconsistent — some files use `@/...` aliases, others use relative paths (`../../components`), and `lib/*` imports (e.g. `import { Bowie } from "lib/bowie"`) rely on bare `baseUrl` resolution rather than a dedicated alias (no `@/lib/*` alias exists, and no `services/` directory currently exists despite the alias being defined). Follow the existing convention within whichever file you're editing rather than assuming one style project-wide.

### Formatting

- Indentation is tabs (see `.editorconfig`: `indent_style = tab`, `indent_size = 4`, max line length 100). Prettier (2.8.3) is a dependency but there is no committed `.prettierrc` — check `.prettierignore` for excluded paths (`.eslintrc.json`, `tsconfig.json`, `.next`, `.vscode`, `package*.json`, `*.md`).
