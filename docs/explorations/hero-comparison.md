# ASCEND hero comparison

Status: both explorations preserved. The learner reviewed both and selected Bauhaus-inspired Modernism; the full reasoning is recorded in [SPEC.md](../../SPEC.md#learner-review-reasoning-and-prediction). The final storefront uses that direction and has received personal visual approval.

## Shared content

Both previews use the existing unmodified `public/assets/white-shirt.svg`, headline “Become your own next.”, support “A clear start. Your way.”, and CTA “Choose your next step.” The CTA links to the starter shop's existing product form.

Identical facts: plain white T-shirt; demo sizes S, M, L, XL; white; no supplied product claims; $28 USD explicitly fictional demo price. Identical classroom disclaimer: no order, payment, or personal information collected. ASCEND is presented as the exploration identity, not a product quality claim.

## References directly inspected

Museum source images downloaded to the OS temporary directory and opened with the image viewer before implementation on 2026-11-01. They are research references, not shipped assets.

### Bauhaus-inspired modernist

[Herbert Bayer, Bauhaus Ausstellung Weimar Juli–August–September 1923, 1923, MoMA](https://www.moma.org/collection/works/189319).

Direct image inspection: a large black circle intersects a blue triangle; a red square, thin construction lines, and bold lettering organize the printed sheet.

- A repeatable grid and aligned text establish a functional reading order rather than copying the reference artwork.
- A red circular field and fine gold frame translate geometric construction into a constrained ASCEND palette.
- One sans-serif family and economical flat shapes suit reproducible screen layout; no historical font authenticity is claimed.

Hypothesis: deliberate hierarchy may communicate focus and make the student's next action easy to locate. Risk: The precision may feel institutional or less expressive than the intended personal motivation.

### Pop Art-inspired postmodernist

[Roy Lichtenstein, Drowning Girl, 1963, MoMA](https://www.moma.org/collection/works/80249).

Direct image inspection: a cropped face and hand sit among thick wave contours, dotted color fields, and a large thought balloon.

- A dotted background and strong frame quote the visual language of commercial comic printing without reproducing the painting.
- A white headline panel, offset red shadow, and angled background panel layer different graphic registers while leaving text horizontal.
- Sans-serif display lettering and monospace support deliberately mix typographic languages within ASCEND's shared palette.

The painting is Pop Art. Quotation, layering, and mixing graphic languages are the proposed postmodern strategy for this website; the movement labels are not synonymous. No reproduction of the painting or its narrative is included.

Hypothesis: familiar print references and layered framing may support originality and memorability. Risk: Comic associations and layering may feel playful or busy rather than premium. Dots stay behind the image, away from reading text.

## Access and comparison

Use the existing development server's printed origin with:

- `/explorations/modernist.html`
- `/explorations/postmodernist.html`

Shared system fonts avoid external loading dependencies. Semantic content remains available without JavaScript. The same short entrance translation is disabled for reduced motion; hover transitions also stop. Decorations are CSS only. Both directions use the same DOM reading order, image sizing, content, and CTA target.

## Verification

Both previews were rendered and visually inspected in Chromium at 1440 × 1000 and 390 × 1000. A temporary browser-check script verified exact headline/support/CTA, identical product facts, loaded original shirt imagery at equal rendered widths, no horizontal overflow, working skip links, CTA navigation to the unchanged starter form, no page errors, entrance animation availability, and animation/transition suppression under reduced motion. Axe reported zero violations in all four viewport/direction combinations. The first keyboard check exposed a non-focusable skip target; adding `tabindex="-1"` to each preview's main element fixed it, and the checks were rerun successfully.

Screenshots were saved outside the repository in the OS temporary directory as `ascend-modernist-1440.png`, `ascend-postmodernist-1440.png`, `ascend-modernist-390.png`, and `ascend-postmodernist-390.png`. The temporary verification server was stopped afterward; use the learner's visible development terminal for ongoing preview access.

Historical preview-stage result: formatting and full-project lint passed. That full `npm.cmd run check` rerun reported 7 passing server tests and 10 passing browser tests, but remained running after the results and was interrupted.

Subsequent final checks completed successfully: 7 server tests and 17 browser tests; repeated CTA regression 12/12 passed with four workers. Learner test interpretation and keyboard/mobile observations remain pending. Automated checks do not establish audience fit or complete accessibility. Screen-reader and other-browser/device verification were not performed.
