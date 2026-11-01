import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("motion vocabulary is one-shot and keeps CTA, price, shirt, and form stationary", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 812 });
  await page.goto("/");
  await expect(page.locator(".hero-composition")).toHaveClass(/reveal-arrived/);
  const animation = (selector, pseudo = null) =>
    page.locator(selector).evaluate((element, pseudoElement) => {
      const style = getComputedStyle(element, pseudoElement);
      return {
        name: style.animationName,
        duration: style.animationDuration,
        count: style.animationIterationCount,
      };
    }, pseudo);
  expect(await animation(".hero-orbit")).toEqual({
    name: "ascend-circle",
    duration: "1s",
    count: "1",
  });
  expect(await animation(".hero-ring circle")).toEqual({
    name: "ascend-ring",
    duration: "1s",
    count: "1",
  });
  expect((await animation("#hero-title")).name).toBe("ascend-left");
  await expect
    .poll(() =>
      page
        .locator("#hero-title")
        .evaluate((element) =>
          getComputedStyle(element).getPropertyValue("--motion-travel").trim(),
        ),
    )
    .toBe("24px");
  for (const selector of [
    ".hero-action",
    ".shirt-image",
    ".price-row",
    "#product-form",
  ]) {
    const movingAncestor = await page.locator(selector).evaluate((element) => {
      for (let node = element; node; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (
          style.translate !== "none" &&
          style.translate !== "0px" &&
          style.translate !== "0px 0px"
        )
          return true;
        if (node.hasAttribute("data-reveal-item")) return true;
      }
      return false;
    });
    expect(movingAncestor, selector).toBeFalsy();
  }
  await page.locator(".product-section").scrollIntoViewIfNeeded();
  await expect(page.locator(".product-section")).toHaveClass(/reveal-arrived/);
  expect((await animation(".price-accent")).name).toBe("ascend-pop");
  expect((await animation(".product-information", "::before")).name).toBe(
    "ascend-right",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});

test("natural scroll reveals continue after anchor navigation and product interaction", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 812 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.evaluate(() => {
    window.revealEvents = [];
    document.addEventListener("animationstart", (event) => {
      if (event.animationName === "ascend-rise") {
        window.revealEvents.push(
          event.target.closest("[data-reveal]")?.className,
        );
      }
    });
  });
  await expect(page.locator(".direction-section")).toHaveClass(
    /reveal-waiting/,
  );
  await page
    .getByRole("link", { name: "Choose your next step.", exact: true })
    .click();
  await page.locator('input[name="size"][value="M"]').check();
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  await expect(page.locator("#bag-count")).toHaveText("1");
  await expect(page.locator(".product-section")).toHaveClass(/reveal-settled/);
  for (let step = 0; step < 14; step += 1) {
    if (
      await page
        .locator(".direction-section")
        .evaluate((element) => element.getBoundingClientRect().top < 160)
    )
      break;
    await page.mouse.wheel(0, 240);
    await page.waitForTimeout(100);
  }
  await expect(page.locator(".direction-section")).toHaveClass(
    /reveal-arrived/,
  );
  await expect
    .poll(() =>
      page.evaluate(() =>
        window.revealEvents.some((name) => name?.includes("direction-section")),
      ),
    )
    .toBeTruthy();
  await expect(page.locator("#bag-count")).toHaveText("1");
});

test("realistic hero is loaded, transparently backed, and honestly disclosed", async ({
  page,
}) => {
  await page.goto("/");
  const image = page.locator(".hero-product .shirt-image");
  await expect(image).toHaveAttribute(
    "src",
    "assets/white-shirt-realistic.png",
  );
  const pixels = await image.evaluate((element) => {
    const canvas = document.createElement("canvas");
    canvas.width = element.naturalWidth;
    canvas.height = element.naturalHeight;
    const context = canvas.getContext("2d");
    context.drawImage(element, 0, 0);
    return {
      loaded: element.complete && element.naturalWidth > 0,
      cornerAlpha: context.getImageData(0, 0, 1, 1).data[3],
      centerAlpha: context.getImageData(
        canvas.width / 2,
        canvas.height / 2,
        1,
        1,
      ).data[3],
    };
  });
  expect(pixels.loaded).toBeTruthy();
  expect(pixels.cornerAlpha).toBe(0);
  expect(pixels.centerAlpha).toBeGreaterThan(240);
  await expect(page.locator(".hero-product .image-disclosure")).toContainText(
    "AI-generated fictional product visualization",
  );
  for (const direction of ["modernist", "postmodernist"]) {
    await page.goto(`/explorations/${direction}.html`);
    await expect(page.locator(".shirt")).toHaveAttribute(
      "src",
      "../assets/white-shirt.svg",
    );
  }
});

test("storefront and live guide share actual palette, logo size, and display typography", async ({
  page,
}) => {
  const readIdentity = async () =>
    page.evaluate(() => {
      const tokens = getComputedStyle(document.body);
      const heading = getComputedStyle(
        document.querySelector("#hero-title, .type-display"),
      );
      const logo = document.querySelector(".wordmark").getBoundingClientRect();
      return {
        palette: [
          "--color-paper",
          "--color-ink",
          "--color-accent",
          "--color-gold",
        ].map((name) => tokens.getPropertyValue(name).trim()),
        type: [
          heading.fontFamily,
          heading.fontWeight,
          heading.fontSize,
          heading.letterSpacing,
          heading.lineHeight,
        ],
        logo: [logo.width, logo.height],
      };
    });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const shop = await readIdentity();
    await page.goto("/styleguide.html");
    expect(await readIdentity()).toEqual(shop);
    expect(shop.logo).toEqual([175, 28]);
    await expect(
      page.locator('[data-color-token="--color-accent"]'),
    ).toHaveText(shop.palette[2]);
  }
});

test("optional intentions offer consistent suggestions without gating shopping or persisting", async ({
  page,
}) => {
  await page.goto("/");
  const focus = page.getByRole("button", { name: "Focus", exact: true });
  const explore = page.getByRole("button", { name: "Explore", exact: true });
  await expect(focus).toHaveAttribute("aria-pressed", "false");
  await expect(explore).toHaveAttribute("aria-pressed", "false");
  await focus.click();
  await expect(focus).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#intention-message")).toContainText(
    "simple, familiar outfit",
  );
  await explore.click();
  await expect(focus).toHaveAttribute("aria-pressed", "false");
  await expect(explore).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#intention-message")).toContainText(
    "color or layer",
  );
  await expect(page.locator("#bag-count")).toHaveText("0");
  await page
    .getByRole("button", { name: "Clear my choice", exact: true })
    .click();
  await expect(focus).toBeFocused();
  await expect(explore).toHaveAttribute("aria-pressed", "false");
  await focus.click();
  await page.reload();
  await expect(focus).toHaveAttribute("aria-pressed", "false");
  await page
    .getByRole("link", { name: "Choose your next step.", exact: true })
    .click();
  await expect(page).toHaveURL(/#product-form$/);
  await expect(page.locator("#product-form")).toBeInViewport();
  await page.locator('input[name="size"][value="XL"]').check();
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  await expect(page.locator("#bag-count")).toHaveText("1");
});

test("reduced motion disables entrance, hover, and bag movement", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator('input[name="size"][value="S"]').check();
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  for (const selector of [
    ".hero-copy",
    ".hero-product",
    ".hero-orbit",
    ".hero-axis",
    ".hero-ring circle",
    ".price-accent",
    "#hero-title",
    "#bag-count",
    ".button-primary",
  ]) {
    const styles = await page
      .locator(selector)
      .first()
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          animation: style.animationName,
          transition: style.transitionDuration,
        };
      });
    expect(styles).toEqual({ animation: "none", transition: "0s" });
  }
});

test("core brand content and size controls remain visible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto("/");
    await expect(page.locator("#hero-title")).toBeVisible();
    await expect(page.locator("#product-form")).toBeVisible();
    await expect(page.locator("#intention-fallback")).toBeVisible();
    await expect(page.locator("#intention-controls")).toBeHidden();
    await page.locator('input[name="size"][value="M"]').check();
    await expect(page.locator('input[name="size"][value="M"]')).toBeChecked();
  } finally {
    await context.close();
  }
});

test("negative: choosing no size explains the problem and keeps the bag empty", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  await expect(page.locator("#size-error")).toBeVisible();
  await expect(page.locator("#size-error")).not.toBeEmpty();
  await expect(page.locator("#bag-count")).toHaveText("0");
});

test("positive: a shopper can choose sizes, add items, and empty the demo bag", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('input[name="size"][value="M"]').check();
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  await expect(page.locator("#bag-count")).toHaveText("1");
  await expect(page.locator("#bag-status")).toContainText("M");
  await page.locator('input[name="size"][value="L"]').check();
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  await expect(page.locator("#bag-count")).toHaveText("2");
  await page
    .getByRole("button", { name: "Empty demo bag", exact: true })
    .click();
  await expect(page.locator("#bag-count")).toHaveText("0");
  await page.reload();
  await expect(page.locator("#bag-count")).toHaveText("0");
});

test("keyboard: the skip link reaches main and the size controls work without a mouse", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /skip/i });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  // Focus a native radio, then use its real keyboard behavior and the next control.
  await page.locator('input[name="size"][value="S"]').focus();
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('input[name="size"][value="M"]')).toBeChecked();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Add to demo bag", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#bag-count")).toHaveText("1");
});

for (const route of ["/", "/styleguide.html", "/studio.html"]) {
  test(`page integrity and automated accessibility: ${route}`, async ({
    page,
  }) => {
    const failures = [];
    page.on("pageerror", (error) => failures.push(error.message));
    page.on("response", (response) => {
      if (
        response.url().startsWith("http://127.0.0.1:5174") &&
        response.status() >= 400
      ) {
        failures.push(`${response.status()} ${response.url()}`);
      }
    });
    await page.goto(route);
    await expect(page.getByRole("main")).toBeVisible();
    const brokenImages = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.src),
      );
    expect(brokenImages).toEqual([]);
    const links = await page
      .locator("a[href]")
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href")),
      );
    for (const href of links) {
      if (href.startsWith("#")) {
        expect(
          await page.locator(`[id="${href.slice(1)}"]`).count(),
          href,
        ).toBeGreaterThan(0);
      } else if (!/^(https?:|mailto:)/.test(href)) {
        const response = await page.request.get(new URL(href, page.url()).href);
        expect(response.ok(), href).toBeTruthy();
      }
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(failures).toEqual([]);
  });

  test(`narrow screen: readable page without horizontal overflow ${route}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    await expect(page.getByRole("main")).toBeVisible();
  });
}
