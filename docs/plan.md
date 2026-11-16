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
