# SQLite simulated checkout

Implementation date: 2026-11-16. This is the requested technical extension to the existing ASCEND storefront; it does not change approved brand decisions or claim new learner observations.

## Implementation

- Preserve the existing `demo_orders` schema and parameterized POST insert. No migrations, order deletion, or overwrite operations.
- `server.mjs`: open the existing project-root `ascend-orders.sqlite` by default, close the connection with the server, and allow `ASCEND_DATABASE_PATH` / `createApp({ databasePath })` for isolated tests. Add parameterized `GET /api/orders/:id`, with 400 for invalid IDs, 404 for missing records, and 500 for storage errors. Distinguish malformed JSON from server failures.
- Server validation allows S/M/L/XL and integer quantities 1�20. The server computes the fictional total at 2800 cents per shirt, ignoring any client-supplied price.
- `public/index.html` and `public/shop.js`: use existing button styles and live announcements for Simulate checkout, loading, failure, and confirmation. Prevent concurrent submissions and bag edits during submission. Empty bags disable checkout. Mixed-size and oversized bags receive helpful feedback, preserving the existing single-size order contract. Success clears the temporary bag; errors retain it.
- Confirmation includes the saved order ID, size, quantity, fictional total, and explicit absence of payment/purchase/shipping. Network failure cannot establish whether an insert succeeded; the message warns that retrying could create another simulation. Idempotent retries are outside this implementation.
- SQLite persistence requires the Node server. Static GitHub Pages cannot host the API. No localStorage, payment details, shipping information, or real purchases.
- `database.mjs`: formatting only; the existing initialization script and schema remain intact. README and SPEC wording distinguish persisted fictional orders from real checkout.

## Verification

- Before edits: `npm.cmd test` passed all 7 existing server tests.
- Tests use in-memory SQLite or a fresh temporary SQLite file; they do not add to, overwrite, or remove existing project orders.
- Server tests cover all sizes, quantity bounds/types, malformed JSON, oversized requests, injection-shaped input, server-controlled price, retrieval, invalid IDs, and missing orders.
- Persistence test creates an order, closes the HTTP server and SQLite connection, opens a new server and connection against the same file, retrieves the original order, and confirms another insert does not overwrite it.
- Browser tests cover actual POST/GET checkout, confirmation, empty-bag disabling, loading state, mixed sizes, and retaining the bag after HTTP 500.
- `npm.cmd run check` passed with exit code 0: formatting, ESLint, HTML validation, Stylelint, 9/9 server tests and 20/20 Chromium tests (27.9 seconds for the browser suite), including the existing motion, shared identity, keyboard, axe, and narrow-screen checks.
- Earlier runs exposed two new test defects (separator encoding and loading-state timing); corrected the assertions and replaced a short delay with a controlled response gate. An earlier sandbox run also left test-server cleanup pending; it was interrupted, and the successful full run completed outside the sandbox.
- After the final wording/screenshot-only change: `npx.cmd playwright test tests/browser/checkout.spec.js` passed 3/3 tests (7.5 seconds), and `npm.cmd run format:check`, `npm.cmd run lint`, and `git diff --check` passed. Inspected actual checkout screenshots at 1440px and 390px: controls and disclosure remain readable in the existing layout. Screenshots are local ignored artifacts under `test-results/`.

No commit or push is authorized. Learner browser review of this extension has not been supplied. Existing learning-record excerpts remain unchanged.

# IS117 Review 2 — Plan — ASCEND T-shirt

**Repository:** https://github.com/Shakti2008/is117-brand-studio  
**Status:** Plan drafted; SQLite build/testing and peer review pending.

## Brand and audience
ASCEND's Hero promise is “ASCEND transforms an everyday essential into a reminder to keep moving toward your goals.” Tagline: “Become your own next.” The primary audience hypothesis is ambitious college students ages 18–24 seeking versatile clothing and motivation. Secondary hypothesis: creative technology-oriented adults ages 22–30 seeking originality and practicality. These are hypotheses, not interviewed users.

## Compare two approaches
| Approach | Benefit | Tradeoff | Decision |
| --- | --- | --- | --- |
| A — Direct product-first experience | Quickly presents white shirt, sizes, fictional $28 price and checkout | Less brand storytelling | **Choose A** for core shopping path |
| B — Immersive Hero storytelling | Expresses brand identity through geometry and animation | Can distract from shopping | Retain restrained motion from B, keep controls stable |

## Five user stories and checks
| ID | User story | Essential feature | Observable check |
| --- | --- | --- | --- |
| US-01 | As a busy student, I want to understand the brand and product quickly. | Clear hero, shirt and CTA | Desktop and narrow viewport show legible message, product and CTA without overflow. |
| US-02 | As a shopper, I want to choose a size before adding the shirt. | S–XL selector and validation | Missing size blocks add; selected size adds correct item. |
| US-03 | As a shopper, I want to see the cost before proceeding. | Fictional $28 price and bag total | Quantity × $28 equals total; demo status clearly shown. |
| US-04 | As a shopper, I want to simulate checkout without payment information. | Bag review, simulated checkout and confirmation | Empty bag cannot checkout; valid bag gets clearly labeled demo order; no payment requested. |
| US-05 | As a returning demo visitor, I want to reopen a saved simulated order. | SQLite persistence | Create order, stop/restart server, retrieve same record; invalid input rejected. |

## Visual and persuasion choices
Preserve the learner-approved Modernist/Bauhaus-inspired geometry, charcoal-and-white identity, ASCEND wordmark, restrained ring/circle and staggered animations, reduced-motion support, and stable shopping controls.

1. “Your goals. Your pace.” — a motivational statement, not a performance guarantee.
2. Optional Focus/Explore messages — visitor choice without signup or purchase.

No fabricated scarcity, reviews, discounts, materials, shipping or sustainability claims.

## Required SQLite backend implementation plan
The current project records a temporary demo bag; **SQLite has not been verified**. Browser storage alone is insufficient.

1. Extend existing Node server with SQLite storage outside public files.
2. Store `demo_orders`: generated ID, S/M/L/XL size, positive integer quantity, unit price 2800 cents, demo status, timestamp.
3. Add validated create/read endpoints with parameterized SQL; calculate totals server-side.
4. Connect existing bag to **Simulate checkout**; do not collect payments or imply real orders.
5. Verify no-size, empty-bag, invalid quantity, correct total, and create → save → restart → reopen → retrieve. Link actual test results and code commits when performed.

## Peer review and decision record
**Review question to request:** “Can you explain US-04 or US-05 and its check? Is the distinction between a demo bag, simulated checkout and persistent SQLite order clear?”

**Feedback received:** Not yet verified for Review 2. **Decision:** Pending actual peer question. Record implement/investigate/defer/decline, reasoning, linked commit, verification and reviewer retry in an issue; leave unfinished work open.

## AI assistance and honesty
AI drafted this plan from the existing learner-approved SPEC and project record. No new student interviews, peer feedback, SQLite build, tests or deployment are claimed. The student should review and be able to explain the plan.

## Canvas update
Updated the existing ASCEND plan with two approaches, five user stories and observable checks, Hero identity and honest persuasion, and the SQLite simulated-checkout implementation plan. Backend implementation/testing and peer review remain pending until verified. Repository: https://github.com/Shakti2008/is117-brand-studio
