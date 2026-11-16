import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createApp } from "../server.mjs";

let app;
let base;
before(async () => {
  app = createApp({ databasePath: ":memory:" });
  app.listen(0, "127.0.0.1");
  await once(app, "listening");
  base = `http://127.0.0.1:${app.address().port}`;
});
after(() => new Promise((resolve) => app.close(resolve)));

test("serves the storefront and shared stylesheet with useful MIME types", async () => {
  const page = await fetch(base);
  assert.equal(page.status, 200);
  assert.match(page.headers.get("content-type"), /text\/html/);
  const css = await fetch(`${base}/styles.css`);
  assert.equal(css.status, 200);
  assert.match(css.headers.get("content-type"), /text\/css/);
});

test("returns 404 for missing files and private project files", async () => {
  for (const url of [
    "/does-not-exist",
    "/.env",
    "/README.md",
    "/docs/assessment.md",
    "/%2e%2e%2fpackage.json",
    "/%2e%2e%5cpackage.json",
  ]) {
    assert.equal((await fetch(`${base}${url}`)).status, 404, url);
  }
});

test("rejects malformed paths and POST requests", async () => {
  assert.equal((await fetch(`${base}/%E0%A4%A`)).status, 400);
  const response = await fetch(base, { method: "POST" });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET, HEAD");
});

test("HEAD returns headers without downloading a page body", async () => {
  const response = await fetch(base, { method: "HEAD" });
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "");
});

test("plain preview serves original HTML without development routes", async () => {
  const original = await readFile(
    new URL("../public/index.html", import.meta.url),
    "utf8",
  );
  assert.equal(await (await fetch(base)).text(), original);
  for (const route of ["/__dev/reload.js", "/__dev/events"]) {
    assert.equal((await fetch(`${base}${route}`)).status, 404);
  }
});

test("development injects its client into responses without changing saved HTML", async () => {
  const filename = new URL("../public/index.html", import.meta.url);
  const original = await readFile(filename, "utf8");
  const development = createApp({
    development: true,
    databasePath: ":memory:",
  });
  development.listen(0, "127.0.0.1");
  await once(development, "listening");
  const address = `http://127.0.0.1:${development.address().port}`;
  try {
    const response = await fetch(address);
    assert.match(
      await response.text(),
      /<script src="\/__dev\/reload.js" defer><\/script>/,
    );
    const script = await fetch(`${address}/__dev/reload.js`);
    assert.match(script.headers.get("content-type"), /text\/javascript/);
    assert.match(await script.text(), /EventSource/);
    assert.equal(await readFile(filename, "utf8"), original);
    assert.equal((await fetch(`${address}/README.md`)).status, 404);
  } finally {
    await new Promise((resolve) => development.close(resolve));
  }
});

test("a symlink cannot expose a file outside the public directory", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "brand-studio-private-"));
  const publicRoot = path.join(directory, "public");
  const privateRoot = path.join(directory, "private");
  await mkdir(publicRoot);
  await mkdir(privateRoot);
  await writeFile(path.join(privateRoot, "notes.txt"), "private project notes");
  await symlink(privateRoot, path.join(publicRoot, "leak"), "junction");
  const isolated = createApp({ publicRoot, databasePath: ":memory:" });
  isolated.listen(0, "127.0.0.1");
  await once(isolated, "listening");
  try {
    assert.equal(
      (
        await fetch(
          `http://127.0.0.1:${isolated.address().port}/leak/notes.txt`,
        )
      ).status,
      404,
    );
  } finally {
    await new Promise((resolve) => isolated.close(resolve));
    await rm(directory, { recursive: true, force: true });
  }
});

test("checkout validates input and retrieves simulated orders", async () => {
  const post = (body) =>
    fetch(`${base}/api/orders`, { method: "POST", body: JSON.stringify(body) });
  for (const body of [
    null,
    {},
    { size: "XXL", quantity: 1 },
    { size: "M", quantity: 0 },
    { size: "M", quantity: 21 },
    { size: "M", quantity: 1.5 },
    { size: "M", quantity: "1" },
    { size: "M'--", quantity: 1 },
  ]) {
    assert.equal((await post(body)).status, 400);
  }
  assert.equal(
    (await fetch(`${base}/api/orders`, { method: "POST", body: "{" })).status,
    400,
  );
  assert.equal(
    (
      await fetch(`${base}/api/orders`, {
        method: "POST",
        body: "x".repeat(10001),
      })
    ).status,
    413,
  );
  for (const size of ["S", "M", "L", "XL"]) {
    const response = await post({ size, quantity: 20, total_cents: 1 });
    assert.equal(response.status, 201);
    const order = await response.json();
    assert.equal(order.size, size);
    assert.equal(order.quantity, 20);
    assert.equal(order.total_cents, 56000);
    assert.equal(order.status, "simulated");
    const saved = await fetch(`${base}/api/orders/${order.id}`);
    assert.equal(saved.status, 200);
    const record = await saved.json();
    assert.ok(record.created_at);
    delete record.created_at;
    assert.deepEqual(record, order);
  }
  assert.equal((await fetch(`${base}/api/orders/999999`)).status, 404);
  for (const id of ["0", "-1", "abc", "1.5", "9007199254740992"])
    assert.equal((await fetch(`${base}/api/orders/${id}`)).status, 400);
});

test("SQLite retains orders after server and database close and reopen", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "ascend-orders-"));
  const databasePath = path.join(directory, "orders.sqlite");
  const start = async () => {
    const server = createApp({ databasePath });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    return server;
  };
  let server = await start();
  try {
    const address = () =>
      `http://127.0.0.1:${server.address().port}/api/orders`;
    const response = await fetch(address(), {
      method: "POST",
      body: JSON.stringify({ size: "M", quantity: 1 }),
    });
    assert.equal(response.status, 201);
    const order = await response.json();
    await new Promise((resolve) => server.close(resolve));
    server = await start();
    const saved = await fetch(`${address()}/${order.id}`);
    assert.equal(saved.status, 200);
    const record = await saved.json();
    assert.equal(record.id, order.id);
    assert.equal(record.size, "M");
    assert.equal(record.quantity, 1);
    assert.equal(record.total_cents, 2800);
    const next = await fetch(address(), {
      method: "POST",
      body: JSON.stringify({ size: "S", quantity: 2 }),
    });
    assert.ok((await next.json()).id > order.id);
    assert.equal((await fetch(`${address()}/${order.id}`)).status, 200);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await rm(directory, { recursive: true, force: true });
  }
});
