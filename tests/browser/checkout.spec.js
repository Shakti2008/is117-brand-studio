import { test, expect } from "@playwright/test";

test("checkout saves and retrieves a simulated order", async ({ page }) => {
  await page.goto("/");
  const checkout = page.locator("#simulate-checkout");
  await expect(checkout).toBeDisabled();
  await page.getByLabel("M", { exact: true }).check();
  await page
    .getByRole("button", { name: "Add to demo bag", exact: true })
    .click();
  const response = page.waitForResponse(
    (r) => r.url().endsWith("/api/orders") && r.request().method() === "POST",
  );
  await checkout.click();
  const order = await (await response).json();
  await expect(page.locator("#checkout-status")).toContainText(
    `Simulated order #${order.id}`,
  );
  await expect(page.locator("#checkout-status")).toContainText(
    /Size M.*Quantity 1.*Fictional total \$28\.00/,
  );
  await expect(page.locator("#bag-count")).toHaveText("0");
  const saved = await page.request.get(`/api/orders/${order.id}`);
  expect((await saved.json()).total_cents).toBe(2800);
});

test("checkout blocks mixed sizes and preserves the bag on server errors", async ({
  page,
}) => {
  await page.goto("/");
  const add = page.getByRole("button", {
    name: "Add to demo bag",
    exact: true,
  });
  const checkout = page.locator("#simulate-checkout");
  await page.getByLabel("M", { exact: true }).check();
  await add.click();
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  await page.route("**/api/orders", async (route) => {
    await gate;
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: "{}",
    });
  });
  await checkout.click();
  await expect(checkout).toBeDisabled();
  release();
  await expect(page.locator("#checkout-status")).toContainText(
    "Unable to confirm",
  );
  await expect(page.locator("#bag-count")).toHaveText("1");
  await expect(checkout).toBeEnabled();
  await page.getByLabel("L", { exact: true }).check();
  await add.click();
  await checkout.click();
  await expect(page.locator("#checkout-status")).toContainText("one size");
  await expect(page.locator("#bag-count")).toHaveText("2");
});

test("checkout remains usable at desktop and narrow widths", async ({
  page,
}, testInfo) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#demo-bag");
    await expect(page.locator("#simulate-checkout")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator("#demo-bag").scrollIntoViewIfNeeded();
    await page.locator("#demo-bag").screenshot({
      path: testInfo.outputPath(`checkout-${width}.png`),
    });
  }
});
