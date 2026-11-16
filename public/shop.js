"use strict";

(() => {
  const form = document.querySelector("#product-form");
  if (!form) return;

  const sizeError = document.querySelector("#size-error");
  const bagCount = document.querySelector("#bag-count");
  const bagStatus = document.querySelector("#bag-status");
  const bagItems = document.querySelector("#bag-items");
  const clearBag = document.querySelector("#clear-bag");
  const checkout = document.querySelector("#simulate-checkout");
  const checkoutStatus = document.querySelector("#checkout-status");
  let submitting = false;
  const sizes = ["S", "M", "L", "XL"];
  const bag = [];

  const renderBag = () => {
    bagCount.textContent = String(bag.length);
    bagCount.classList.remove("bag-feedback");
    void bagCount.offsetWidth;
    bagCount.classList.add("bag-feedback");
    clearBag.disabled = submitting || bag.length === 0;
    checkout.disabled = submitting || bag.length === 0;
    bagItems.replaceChildren();
    sizes.forEach((size) => {
      const quantity = bag.filter((item) => item === size).length;
      if (!quantity) return;
      const item = document.createElement("li");
      item.textContent = `White T-shirt · Size ${size} · Quantity ${quantity}`;
      bagItems.append(item);
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (submitting) return;
    const selected = form.querySelector('input[name="size"]:checked');
    if (!selected || !sizes.includes(selected.value)) {
      sizeError.hidden = false;
      form.querySelectorAll('input[name="size"]').forEach((input) => {
        input.setAttribute("aria-invalid", "true");
      });
      form.querySelector('input[name="size"]').focus();
      return;
    }

    sizeError.hidden = true;
    bag.push(selected.value);
    renderBag();
    const itemWord = bag.length === 1 ? "item" : "items";
    bagStatus.textContent = `Added a white T-shirt in size ${selected.value}. Your demo bag has ${bag.length} ${itemWord}.`;
  });

  form.addEventListener("change", () => {
    sizeError.hidden = true;
    form.querySelectorAll('input[name="size"]').forEach((input) => {
      input.removeAttribute("aria-invalid");
    });
  });

  clearBag.addEventListener("click", () => {
    if (submitting) return;
    bag.length = 0;
    renderBag();
    bagStatus.textContent =
      "Your demo bag is empty. Choose a size to try it again.";
    form.querySelector('input[name="size"]:checked')?.focus();
  });
  checkout.addEventListener("click", async () => {
    if (submitting) return;
    if (
      !bag.length ||
      bag.length > 20 ||
      new Set(bag).size !== 1 ||
      !sizes.includes(bag[0])
    ) {
      checkoutStatus.textContent =
        "Use 1–20 shirts of one size per simulated order. Empty the bag to change its contents.";
      return;
    }
    const size = bag[0],
      quantity = bag.length;
    submitting = true;
    checkout.textContent = "Simulating…";
    checkout.setAttribute("aria-busy", "true");
    checkoutStatus.textContent = "Saving simulated order…";
    renderBag();
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ size, quantity }),
      });
      if (!response.ok) throw new Error("Checkout failed");
      const order = await response.json();
      if (
        !Number.isSafeInteger(order.id) ||
        order.id < 1 ||
        order.size !== size ||
        order.quantity !== quantity ||
        order.total_cents !== quantity * 2800 ||
        order.status !== "simulated"
      )
        throw new Error("Invalid confirmation");
      checkoutStatus.textContent = `Simulated order #${order.id} saved. Size ${size} · Quantity ${quantity} · Fictional total $${(order.total_cents / 100).toFixed(2)}. No payment, purchase, or shipping.`;
      bag.length = 0;
      bagStatus.textContent =
        "Your demo bag is empty after simulated checkout.";
    } catch {
      checkoutStatus.textContent =
        "Unable to confirm simulated checkout. Your bag is unchanged. Check that the Node server is running. A lost response may still have saved an order; retrying may create another simulation.";
    } finally {
      submitting = false;
      checkout.textContent = "Simulate checkout";
      checkout.removeAttribute("aria-busy");
      renderBag();
    }
  });
})();
