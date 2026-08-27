# ParkSafe — Product & Technical Spec

_Last updated: 2026-08-27_

ParkSafe answers one question: **"Can I park here right now?"** You type what a parking
sign says, confirm the day and time, and get a color-coded verdict with a plain-language
explanation of the reasoning.

---

## 1. Product overview

| | |
|---|---|
| **Core loop** | Paste sign text → AI parses it into structured rules → pick day/time → verdict |
| **Verdicts** | Green (safe), Amber (move soon / caution), Red (violation) |
| **Accounts** | Optional. Checking is fully anonymous; saving spots requires sign-in |
| **Platform** | Mobile-first responsive web app |
| **Disclaimer** | Guidance only, not legal advice — the posted sign always wins |

### Verdict semantics

- **Green — Safe to park.** No restrictive rule is active at the selected moment and none
  begins within the next 30 minutes.
- **Amber — Move soon / caution.** A restriction starts within 30 minutes, a posted time
  limit would expire before the next boundary, or the parser flagged an unclear fragment
  of the sign (cautious downgrade).
- **Red — Violation.** A restrictive rule (`no_parking`, `no_stopping`, `street_cleaning`,
  `permit_only`) is in force right now.

Every verdict carries a headline, a "why" paragraph, an optional deadline string
("Move by 8:00 AM Tuesday"), and supporting detail lines.

---

## 2. Routes

| Route | Purpose | Auth |
|---|---|---|
| `/` | The checker: sign textarea, example chips, time selector, verdict card, rule breakdown, save panel | Public |
| `/demo` | Four-step guided tour using a real photographed sign, no AI call, no account | Public |
| `/auth` | Email + password sign in / sign up, plus Google OAuth | Public |
| `/spots` | Saved signs, each re-evaluated live against the current time | Signed-in |

Each route defines its own `head()` metadata (title, description, og:title, og:description).

### `/` — Checker

- Textarea (max 2000 chars) with three one-tap example signs.
- "Check this sign" calls the AI parser; loading and error states surface via toasts.
- `TimeSelector` prefills the real current day/time after hydration, is fully editable,
  and has a "Back to now" reset.
- Verdict recomputes instantly and client-side whenever day/time changes — no extra AI call.
- Rule breakdown lists parsed rules as readable chips plus any "unclear" notes.
- Save panel: nickname + optional location note; signed-out users see a prompt to sign in.
- Search params: `?spot=<uuid>` hydrates a saved sign; `?demo=1` prefills the demo sign text.

### `/demo` — Guided tour (no sign-up)

Four steps over a genuinely confusing three-plate stacked sign (photo included as an asset):

1. **The sign** — the real photo, with a note that ParkSafe reads the plain text.
2. **What we understood** — the structured rules, including a note about the ambiguous
   left-arrow "No parking any time" plate.
3. **Try the clock** — live day/time scrubbing with three shortcut moments that produce
   green (Mon 2:00 PM), amber (Mon 5:45 PM), and red (Mon 8:00 PM).
4. **Your turn** — color recap and a CTA into the real checker with the sign prefilled.

The tour is skippable, restartable, deterministic, and writes nothing to the database.
Its rules are a hardcoded `ParsedSign` object, so it is instant and free.

### `/spots` — Saved spots

Lists the signed-in user's saved signs with their cached parsed rules, re-evaluated
against the current time so the list is a live at-a-glance status board. One tap re-opens
a spot in the checker.

---

## 3. Data model

`public.saved_signs`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | primary key |
| `user_id` | uuid | owner, references the auth user |
| `label` | text | nickname, ≤80 chars |
| `location_note` | text, nullable | ≤160 chars |
| `raw_text` | text | the sign text as typed |
| `parsed_rules` | jsonb | cached `ParkingRule[]` so re-checks are instant and free |
| `notes` | jsonb / text[] | unclear fragments from the parser |
| `created_at` / `updated_at` | timestamptz | |

Row-level security scopes every row to its owner, with explicit grants to `authenticated`
and `service_role`. There are no anonymous reads.

---

## 4. Parsing (AI)

- **Where:** `src/lib/parking/parse-sign.server.ts`, invoked by the `parseSign` server
  function in `src/lib/parking.functions.ts` (TanStack `createServerFn`, POST).
- **Model:** `google/gemini-3.7-flash` via the Lovable AI gateway.
- **Contract:** strict JSON schema — an array of rules plus a `notes` array.
- **Input validation:** zod, 3–2000 characters.
- **Normalization:** rule types are clamped to the known enum, minute values clamped to
  0–1440, empty summaries and blank notes filtered out.
- **Error handling:** friendly messages for 429 (rate limited) and 402 (out of credits).
- **Text only.** There is currently **no vision/VLM path** — the demo shows a photo but
  never sends it to a model. Photo-to-rules would be a new pipeline.

### `ParkingRule` shape

```ts
type RuleType =
  | "no_parking" | "no_stopping" | "street_cleaning"
  | "permit_only" | "time_limit" | "metered" | "free";

interface ParkingRule {
  type: RuleType;
  days: number[];        // 0 = Sunday … 6 = Saturday; [] = every day
  startMinute: number;   // minutes from midnight
  endMinute: number;     // may be < startMinute for overnight windows
  allDay: boolean;
  limitMinutes: number | null;
  permit: string | null;
  summary: string;
}
```

---

## 5. Evaluation (deterministic, client-side)

`src/lib/parking/evaluate.ts` is pure TypeScript over the parsed rule set — no AI, no
network. It expands rules onto a minute-of-week timeline (handling overnight and
multi-day windows), then computes:

- the active restrictive rule, if any,
- minutes to the next boundary,
- the 30-minute warning threshold,
- human-readable clock/day/duration strings (durations over 24 hours render as days + hours),
- the headline, explanation, deadline, and detail lines of the `Verdict`.

Because evaluation is local, scrubbing the day/time is instant and costs nothing.

---

## 6. Design system — "Civic Blue"

- Navy background with deeper blue raised surfaces, white type, official-signage feel.
- Traffic-signal status accents: safe green, warning amber, danger red — each with a soft
  variant for backgrounds.
- Typography: **Barlow Condensed** for signage-style headings (`--font-display`),
  **Public Sans** for body (`--font-sans`).
- All colors are OKLCH semantic tokens in `src/styles.css` (Tailwind v4 `@theme inline`);
  components never hardcode color utilities.
- Mobile-first single column, max-width 2xl, large tap targets, sticky header,
  subtle transitions when the verdict changes.

---

## 7. Technical stack

- **Framework:** TanStack Start v1 (React 19, file-based routing, SSR) on Vite 7.
- **Styling:** Tailwind CSS v4 via `src/styles.css`, shadcn/ui components.
- **Server logic:** `createServerFn` for app-internal calls; no edge functions.
- **Backend:** Lovable Cloud — Postgres with RLS, auth, and the AI gateway.
- **Auth:** email + password (no confirmation delay) and Google OAuth.
- **State/data:** TanStack Query for the parse mutation; local React state elsewhere.
- **Notifications:** sonner toasts.

### Key files

```
src/routes/index.tsx                    checker page
src/routes/demo.tsx                     guided tour + hardcoded DEMO_PARSED sign
src/routes/spots.tsx                    saved spots
src/routes/auth.tsx                     sign in / sign up
src/components/parksafe/VerdictCard.tsx status card
src/components/parksafe/RuleList.tsx    parsed rules + unclear notes
src/components/parksafe/TimeSelector.tsx day/time picker
src/components/parksafe/SiteHeader.tsx  nav, auth controls
src/lib/parking.functions.ts            parseSign server function
src/lib/parking/parse-sign.server.ts    AI gateway prompt + schema
src/lib/parking/evaluate.ts             deterministic verdict engine
src/lib/parking/types.ts                shared rule/verdict types
src/styles.css                          Civic Blue design tokens
```

---

## 8. Not built (possible next steps)

- Photo upload with a vision model reading the sign directly.
- Location/GPS awareness and holiday-calendar exemptions.
- Reminders/notifications before a limit expires.
- Sharing a spot with another person.
