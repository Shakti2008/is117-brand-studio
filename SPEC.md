# Brand Studio decisions

This is the durable agreement between the learner and agent. Keep it concise and update it only with agreed choices or actual evidence. `Not chosen yet` is a valid status. Persona cards are hypotheses unless supported by real research.

[LEARNING.md](LEARNING.md) holds the short, reviewable record of learner explanations and help received. Keep the brand decisions and implementation evidence here; link rather than duplicate them.

## Current stage

- Stage: Final ASCEND storefront personally reviewed; Modernist visual direction and animation enhancements approved.
- Current feature: `BRAND-001` — first branded storefront and live style guide.
- Status: BRAND-001 implementation visually approved; learning-record accuracy review complete. Repository handoff pending; not yet kept or merged.
- Next small decision: Review the pull request after the authorized feature-branch commit/push is verified; merging requires a separate learner decision.
- Workflow: Learner supplied [BRAND-001 issue #1](https://github.com/Shakti2008/is117-brand-studio/issues/1). Local feature branch: `feature/brand-001-ascend`.

## Product boundary

The product is the same white T-shirt throughout the comparison. The baseline offers a size selector and temporary demo bag. No real orders, payment, accounts, or persistence. Keep product facts stable between directions; do not add unsupported claims about materials, manufacturing, sustainability, fit, delivery, scarcity, reviews, or sales.

## Audience hypotheses

The primary need guides the page. Give the secondary card one contrasting need to check that same page; keep both cards brief.

| Tiny card                             | Primary audience                                                            | Secondary audience                                                                           |
| ------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Person in a concrete situation        | Ambitious college students ages 18–24, going between classes and activities | Creative, technology-oriented young adults ages 22–30, going between work and casual outings |
| Goal or meaning they seek             | Versatile clothing and motivational branding                                | Originality and futuristic design                                                            |
| Concern before choosing               | Comfort, versatility, and value                                             | Originality balanced with practicality                                                       |
| What the page should help them decide | Whether ASCEND fits their desire for versatility and motivation             | Whether ASCEND expresses originality and futuristic identity while remaining practical       |
| Evidence or assumption                | Learner-approved hypothesis; not validated                                  | Learner-approved hypothesis; not validated                                                   |

## Early brand brief

| Decision                                 | Agreement                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brand name                               | ASCEND                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| One-sentence promise                     | “ASCEND transforms an everyday essential into a reminder to keep moving toward your goals”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Primary archetype: the brand's character | Hero                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Three voice traits                       | Confident, encouraging, direct. Additional approved quality: independent.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| One example line in this voice           | Approved tagline: “Become your own next.”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Learner's predicted audience effect      | Learner-authored prediction, not verified research or measured customer behavior: “I predict that ASCEND's dark, futuristic design will make college students feel empowered and motivated. Since students often encounter bright, conventional designs, I think ASCEND's darker colors and intense visual style will stand out and create a memorable impression. Even if visitors do not immediately purchase the shirt, I believe the branding could encourage them to remember ASCEND and return later. Combined with motivational wording like 'Become your own next,' the design could create a stronger emotional connection with the audience and encourage them to explore the product.” The comparison with designs students encounter and the anticipated feelings, recall, return visits, and exploration are unvalidated assumptions. |

## Visual decision

Compare two small hero previews before building the whole page. Hold the product, headline, supporting copy, and action identical. Use specific real design references and annotate visual choices, intended effect, and risk.

A simple original SVG wordmark is enough. Show small-size and one-color presentations; they may use the same asset when it works.

| Item                                              | Agreement or evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Shared headline / support / action                | Headline: “Become your own next.” Support: “A clear start. Your way”. CTA: “Choose your next step.” Identical across both preserved comparison previews, with the original plain white T-shirt and identical product facts.                                                                                                                                                                                                                                                          |
| Modernist preview, reference, and annotations     | Built and learner-reviewed: [preview](public/explorations/modernist.html). Bauhaus-inspired geometric hierarchy; [Bayer reference, annotations, and verification](docs/explorations/hero-comparison.md). Museum image directly inspected before implementation.                                                                                                                                                                                                                      |
| Postmodernist preview, reference, and annotations | Built and learner-reviewed: [preview](public/explorations/postmodernist.html). Pop Art-inspired quotation and layering; [Lichtenstein reference, historical distinction, and verification](docs/explorations/hero-comparison.md). Museum image directly inspected before implementation. Preserved for comparison.                                                                                                                                                                   |
| Chosen direction and reason                       | Learner selected Bauhaus-inspired Modernism after personally reviewing both previews: bold visuals balanced with organization; geometric shapes create structure and interest. Full learner-authored reasoning and prediction below. Not verified audience research.                                                                                                                                                                                                                 |
| Original SVG logo                                 | Learner approved the [original geometric ASCEND wordmark](public/assets/ascend-wordmark.svg) after personally reviewing the [isolated board](public/explorations/logo-review.html). Applied to the storefront and live style guide using the same SVG source.                                                                                                                                                                                                                        |
| Monochrome and small-size variants                | Approved primary: white on charcoal. Alternate: black on white for light backgrounds. Same one-color vector paths; keep readable at approximately 175 × 28px navigation size.                                                                                                                                                                                                                                                                                                        |
| Logo review at actual use size                    | Learner personally reviewed the browser board and approved the wordmark. Preferred white on charcoal as clean, futuristic, premium, and striking without being overwhelming; connects it to the chosen Modernist direction and Hero archetype. Personal review and reasoning, not verified audience research.                                                                                                                                                                        |
| Shared palette, typography, spacing, and assets   | Implemented futuristic Modernist target: oversized responsive system typography, charcoal #111, white #fff, deep red #8b1e2d, gold #c4a15a, shared spacing and original SVG assets. Shop and Guide share scoped CSS tokens and matching display metrics; Studio retains baseline tokens. Original shirt SVG and comparison previews unchanged. Shop and live guide now use the separately generated, transparently backed white-shirt-realistic.png; no polygon clipping is applied. |

### Learner review, reasoning, and prediction

The learner personally reviewed both previews and selected the Bauhaus-inspired Modernist direction. The following is learner-authored personal reasoning and prediction, not verified audience research or measured customer behavior:

> I chose the Bauhaus-inspired Modernist direction for ASCEND because I believe it creates a better balance between bold visuals and a clean, organized design. Although Postmodernism has an expressive and energetic style, I personally found it a little overwhelming and too visually busy for the college students I want to reach.
>
> Modernism, on the other hand, uses striking colors, geometric shapes, and strong typography without making the website feel cluttered. I especially like geometric shapes because they make the design feel structured while still being visually interesting.
>
> I believe this direction better represents ASCEND's Hero archetype by communicating confidence, focus, and motivation. My hope is that visitors will find the website visually appealing and memorable enough to want to return, even if they do not immediately purchase the shirt.

Both previews and their research documentation remain preserved. The selected direction and subsequently approved logo guide the implemented storefront. The learner personally reviewed the final storefront and approved its Modernist visual direction and animation enhancements. No further visual redesign is requested. This approval does not establish unreported keyboard/mobile testing or authorize a merge.

### Approved visual refinement and image provenance

Learner personally reviewed the first completed storefront and liked its design, logo, typography, colors, controls, and persuasion elements. They subsequently requested a more realistic plain white shirt, tighter composition, restrained geometry/texture, and more noticeable viewport animations. In a later personal review, they liked the realistic shirt and Modernist direction but requested more varied circle/ring, pop-in, opposing side entrances, and staggered effects; they explicitly approved this one-shot motion plan. This is personal feedback, not audience research. The learner personally reviewed the final storefront and approved its Modernist visual direction and animation enhancements. No further visual redesign is requested. This approval does not establish unreported keyboard/mobile testing or authorize a merge.

New asset: [white-shirt-realistic.png](public/assets/white-shirt-realistic.png), created with the built-in image generation tool, then copied into the project. This is an AI-generated fictional product visualization, not a real product photograph, proof of materials, or fit evidence. No third-party photography was imported. The original shirt SVG and both comparison previews remain unchanged. A disclosure appears with the hero image and in the live guide.

Approved motion experiment: one-shot red-circle expansion (80% to 100%) and ring draw over 1000ms; hero text enters from the left over 750ms with 48px travel and 100ms stagger. Product text enters left and decorative panel frames enter right over 750ms with 40px travel. Price accent pops from 85% to 100% over 450ms without overshoot; price text stays still. Direction text/rule use 700ms; bag heading uses 650ms/32px with labels delayed 90ms. Phone travel is 24px. The realistic shirt, CTA, controls, and their containers stay stationary during reveal sequences. Reduced motion shows the complete static design; all content remains visible without JavaScript. Focus/anchor navigation settles only its own group, preserving later reveals.

<details>
<summary>Exact image prompts (generation and refinement)</summary>

Generation:

Use case: product-mockup. Asset type: transparent ecommerce hero cutout for fictional ASCEND classroom storefront. Generate one completely plain white short-sleeved crew-neck T-shirt, front view, centered, isolated on genuinely transparent background. Photorealistic studio product visualization with a believable ribbed round collar, natural subtle fabric folds, realistic stitching, gentle fabric depth, soft directional lighting and soft self-shadows. Premium understated presentation; naturally draped garment, symmetrical enough for a product hero without looking rigid or vector-like. Entire shirt and sleeves visible with a small transparent margin. No person, body, mannequin, hanger, tags, logos, lettering, graphics, text, watermark, props or additional garments. Keep white neutral and avoid plastic or glossy appearance. This is an original fictional product visualization, not an image of a real brand or proof of actual material specifications.

Refinement:

Refine this product cutout only: retain the same completely plain white crew-neck T-shirt, front view, realistic texture, natural folds, collar, sleeves, and proportions. Clean the transparent background carefully: remove all detached white speckles, fringe, noise, and stray pixels around and below the garment. Produce a crisp natural fabric silhouette with clean alpha and a 5% fully transparent margin. No logos, text, graphics, props, mannequin or hanger. Do not flatten fabric depth or change the white color. This is a fictional AI-generated product visualization.

</details>

## Ethical persuasion

Choose two applications that help the visitor make a voluntary, informed decision. Record their real implementation and mechanism rather than a principle name alone. Required size selection or validation alone does not establish consistency. Do not invent social proof, scarcity, authority, or product facts.

The learner approved both proposals and requested subtle integration beneath the hero and shopping hierarchy. The mechanisms and benefits below are design intentions based on personal judgment, not proven audience research or measured effects.

| Principle                                     | Actual copy or interaction                                                                                                                                                                         | Visitor benefit / factual support                                                                                                                                                                                                                                                                                        |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unity — approved application                  | “Your goals. Your pace.” with inclusive wording respecting different paths, in the secondary personal-direction section.                                                                           | Shared identification through respect for individual progress. Learner reasoning: encourage confidence, independence, and belonging without pressure to conform; views peer pressure and finding belonging as student challenges. Personal judgment, not verified research; no existing community or membership claimed. |
| Commitment/Consistency — approved application | Optional Focus/Explore buttons show short encouraging messages and an optional styling suggestion consistent with the chosen intention; clear action and reload reset it. Shopping is never gated. | Voluntary prior commitment is the chosen intention; a related optional styling action follows it. Learner values a small personal connection without signup or purchase. Intended benefit, not a proven audience effect. No data storage or enrollment.                                                                  |

## BRAND-001 — first branded storefront and live style guide

**Scope:** turn the working neutral storefront into the chosen brand's first coherent page. Keep the existing size selector and demo bag usable. Do not add checkout or all future features.

Approved identity: ASCEND, as recorded above. Apply the selected identity to the storefront and shared live style guide after comparing previews and reviewing the logo and persuasion applications. The approved identity is now implemented. The learner personally reviewed the final storefront and approved its Modernist visual direction and animation enhancements. No further visual redesign is requested. This approval does not establish unreported keyboard/mobile testing or authorize a merge.

Planned motion: a polished hero entrance, scroll-triggered text reveals, hover transitions, and subtle demo-bag feedback. Keep content available without JavaScript or animation; respect reduced-motion preferences. Preserve keyboard access, visible focus, readable contrast, mobile responsiveness, and accessible bag feedback. Information must not depend on motion or hover alone. Implemented hero entrance, once-only scroll reveals, hover transitions, and bag feedback; essential content remains visible. Reduced-motion and responsive verification results are recorded in Evidence.

Keep when:

- The learner has chosen the audience hypotheses, brief, visual direction, and logo; the page visibly expresses those choices.
- Two annotated hero directions compare modernist/postmodernist thinking with the same content and real source links.
- The selected SVG logo works at small size and in one color; the presentations may share one asset.
- The storefront and live style guide share CSS variables, typography, components, and assets; they do not drift into separate identities.
- Two ethical persuasion applications are visible and their claims are supportable.
- Prepared checks pass, the agent has reviewed the slice and discussed one actual check, and the learner has reported a browser impression plus keyboard/mobile observations.
- The issue, branch, commit, and PR explain this feature in the learner's repository; agreed decisions and actual evidence are saved here. The learner has approved keeping and merging the change, and the merge into `main` is verified. Publishing is a separate choice.

## Evidence

Write a short result and link only evidence that exists. A passing browser check is evidence for its assertions, not customer research or proof of full accessibility.

| Spec ID   | Files                                                                                                                                                                                                                                                                                                                                                                                              | Issue / PR                                                                                                                                        | Actual checks and observations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BRAND-001 | [Storefront](public/index.html), [shared styles](public/styles.css), [motion and intentions](public/motion.js), [generated fictional visualization](public/assets/white-shirt-realistic.png), [live guide](public/styleguide.html), [browser tests](tests/browser/studio.spec.js), [PNG refresh regression](tests/browser/development.spec.js). Original assets and comparison previews preserved. | [BRAND-001 issue #1](https://github.com/Shakti2008/is117-brand-studio/issues/1) supplied by the learner. Branch: feature/brand-001-ascend. No PR. | Current motion experiment: npm.cmd run check passed with exit 0 outside the sandbox: formatting, all linters, 7 server tests and 17 Chromium tests including axe, reduced motion, no-JavaScript content, motion vocabulary, shared identity, shopping, and PNG refresh. CTA regression repeated 12 times with 4 workers: all passed. Scroll reveals continue after product interaction. Six desktop/mobile axe scans found zero violations. Moving-state overflow sampling at 375, 390, 768, 1024 and 1440px found zero horizontal overflow. No shutdown hang in unrestricted final runs. Earlier SVG-test mismatch and moving-CTA bug resolved without removing assertions. Final visual review and approval supplied by the learner. Learner explained that the missing-size test prevents an item entering the bag without a selected size and correctly distinguished demo behavior from real orders; see [LEARNING.md](LEARNING.md). Learner reports Enter successfully activated an unspecified control and a narrow browser review worked without noticed overlap; see the personal testing observations below. The control, keyboard route, viewport width, and physical-device testing were not specified. Screen-reader and other-browser checks were not performed; these are verification limits, not additional required learner reflections. Issue URL supplied by the learner; PR and verified merge remain pending. |

### Baseline browser observation

Learner-reported observations (paraphrased from the learner's actual report, not AI-generated test results):

- Opened the local starter website and checked the Shop, Style Guide, and Studio pages. All three loaded and displayed their expected starter content.
- On the Shop page, selected size M, added the white T-shirt to the demo bag, confirmed that the bag updated, and emptied the bag successfully.

These observations concern the starter website only; they do not establish keyboard or mobile review, accessibility verification, or review of an implemented ASCEND brand.

### Final learner visual review

Learner-authored statement:

> I have personally reviewed the final ASCEND storefront and I love the finished design. I approve the final Modernist visual direction and animation enhancements.

This records personal visual review and approval, not verified audience research. Earlier specific feedback on the logo, typography, colors, realistic shirt, controls, and persuasion elements remains recorded. No new keyboard, mobile, or product-interaction observations were supplied with this final approval.

### Final learner keyboard and narrow-window observations

Learner-reported testing, recorded separately from automated results:

- Keyboard: used the keyboard to activate a control; pressing Enter worked successfully. The specific control and navigation sequence were not identified. This does not establish that every control or the entire keyboard journey was tested.
- Narrow browser window: reported that everything worked during their review and that they noticed no overlapping elements. This was a narrowed browser-window review; no viewport dimensions or physical-phone testing were reported.
- The learner stated that their personal testing of the final website was complete. These observations supplement the final visual approval and earlier missing-size test explanation; they do not establish complete accessibility or customer research.

### Learning-record accuracy review

On 2026-11-01 the learner explicitly confirmed that the updated learning-record entries accurately reflect their personal decisions, missing-size test explanation, and keyboard/narrow-window observations, and approved them for final submission. Accuracy review is complete for the current record. This does not establish unreported testing or authorize commit, push, or merge; later substantive excerpts require review.

## Later

No follow-up is selected. After keeping `BRAND-001`, choose one next cycle: perhaps a brand story, a supported fit guide, or richer demo-bag behavior. Agree its scope and add one new spec ID at that time.


## Research — T-Shirt (November 9, 2026)
### Competitive Website Research

**Research date:** November 9, 2026

**1. Nike — Motivational Branding**

Source: https://www.nike.com/

Observation: Nike uses motivational messaging and strong visuals to connect its clothing with ambition and achievement.

What this suggests: ASCEND can use motivational messaging to give the plain white T-shirt a meaning beyond its basic appearance.

**2. Uniqlo — Minimalist Everyday Clothing**

Source: https://www.uniqlo.com/us/en/

Observation: Uniqlo emphasizes simplicity, versatility, and everyday clothing through clean layouts and product-focused content.

What this suggests: ASCEND should use a minimalist website layout that makes the T-shirt easy to see and understand.

**3. Gymshark — Lifestyle and Community**

Source: https://www.gymshark.com/

Observation: Gymshark connects its clothing with fitness, personal improvement, and a specific community.

What this suggests: ASCEND should focus on a clearly defined audience rather than trying to appeal to everyone.

### Two Brand Positions

**Position 1 — Minimalist Everyday Wear**

This position would focus on comfort, simplicity, and versatility. The website would use neutral colors, basic product photography, and straightforward descriptions.

**Position 2 — Motivational Lifestyle Brand**

This position would focus on ambition, individuality, and personal growth. The website would use bold typography, motivational messaging, and a modern visual style.

**Chosen position:** Motivational Lifestyle Brand.

I chose this position because it connects with ASCEND's Hero archetype and the idea of overcoming challenges and making progress.

### Two Customer Persona Hypotheses

**Persona 1 — Ambitious College Student**

- Age: 18–24
- Interests: Technology, fashion, academics, and personal development
- Needs: Versatile everyday clothing
- Motivation: Express confidence and individuality
- Assumption: Students who value personal growth may connect with ASCEND's message.

**Persona 2 — Young Creative Professional**

- Age: 22–30
- Interests: Technology, innovation, minimalist fashion, and career development
- Needs: Simple clothing suitable for casual environments
- Motivation: Express an independent and forward-thinking identity
- Assumption: Young professionals may appreciate minimalist clothing with meaningful branding.

### Selected Target Audience

ASCEND's primary target audience is ambitious college students ages 18–24.

I chose this audience because ASCEND's message of determination and personal growth may connect with students working toward their academic, personal, and career goals.

Young creative professionals ages 22–30 are a possible secondary audience.

These are audience hypotheses that still need feedback and testing.

### Visual Style and Brand Character

**Brand:** ASCEND

**Archetype:** Hero

**Slogan:** Become Your Own Next.

ASCEND will use a modern, minimalist, and futuristic visual style. Black and white will be the main colors, with burgundy and gold accents.

Bold typography will communicate confidence, while white space will keep the website organized and readable.

The Hero archetype represents determination, courage, and personal progress.

### Honest Persuasion

ASCEND will use storytelling to connect the plain white T-shirt with personal growth.

The website will not claim that wearing the shirt guarantees confidence or success. Instead, it will communicate the brand's values while providing clear and accurate product information.

### Research Decisions

From Nike, I learned the value of motivational messaging.

From Uniqlo, I identified the importance of simplicity and product-focused design.

From Gymshark, I identified the importance of targeting a specific audience.

ASCEND will combine these approaches through a minimalist website, bold messaging, and a clear focus on ambitious college students.

### Assumptions and Open Questions

**Assumptions:**
- College students may respond positively to motivational branding.
- A minimalist website may make the product easier to understand.
- Brand storytelling may help differentiate a plain white T-shirt.

**Open questions:**
- Would students prefer motivational messaging or simpler product descriptions?
- Which accent color best communicates ASCEND's identity?
- Does the website clearly explain how ASCEND differs from other clothing brands?

### AI Assistance

ChatGPT assisted with organizing the competitor comparisons, developing persona hypotheses, and drafting the research. The competitor observations and sources should be verified against the linked websites.

