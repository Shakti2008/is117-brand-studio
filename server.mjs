import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { readFile, realpath } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { createDevelopmentReload } from "./dev-reload.mjs";

const publicDirectory = path.resolve(
  fileURLToPath(new URL("./public/", import.meta.url)),
);

function openDatabase(databasePath) {
  const db = new DatabaseSync(databasePath);

  db.exec(`
  CREATE TABLE IF NOT EXISTS demo_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    size TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    total_cents INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'simulated',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);
  return db;
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json; charset=utf-8",
};

// Local server only. GitHub Pages serves the unchanged public/ files.
export function createApp({
  development = false,
  publicRoot = publicDirectory,
  databasePath = process.env.ASCEND_DATABASE_PATH ??
    fileURLToPath(new URL("./ascend-orders.sqlite", import.meta.url)),
} = {}) {
  const db = openDatabase(databasePath);
  const reload = development ? createDevelopmentReload(publicRoot) : undefined;
  const app = createServer(async (request, response) => {
    if (request.method === "GET" && request.url.startsWith("/api/orders/")) {
      response.setHeader("Content-Type", "application/json");
      const id = new URL(request.url, "http://localhost").pathname.slice(12);
      if (!/^[1-9][0-9]*$/.test(id) || !Number.isSafeInteger(Number(id))) {
        response.writeHead(400);
        response.end(JSON.stringify({ error: "Invalid order ID" }));
        return;
      }
      try {
        const order = db
          .prepare("SELECT * FROM demo_orders WHERE id = ?")
          .get(Number(id));
        response.writeHead(order ? 200 : 404);
        response.end(
          JSON.stringify(order ?? { error: "Simulated order not found" }),
        );
      } catch {
        response.writeHead(500);
        response.end(JSON.stringify({ error: "Unable to retrieve order" }));
      }
      return;
    }
    if (
      request.method === "POST" &&
      new URL(request.url, "http://localhost").pathname === "/api/orders"
    ) {
      response.setHeader("Content-Type", "application/json");

      try {
        let body = "";

        for await (const chunk of request) {
          body += chunk;

          if (body.length > 10000) {
            response.writeHead(413);
            response.end(JSON.stringify({ error: "Request too large" }));
            return;
          }
        }

        let data;
        try {
          data = JSON.parse(body);
        } catch {
          response.writeHead(400);
          response.end(JSON.stringify({ error: "Invalid JSON" }));
          return;
        }
        const { size, quantity } = data ?? {};

        if (
          !["S", "M", "L", "XL"].includes(size) ||
          !Number.isInteger(quantity) ||
          quantity < 1 ||
          quantity > 20
        ) {
          response.writeHead(400);
          response.end(JSON.stringify({ error: "Invalid size or quantity" }));
          return;
        }

        const totalCents = quantity * 2800;

        const result = db
          .prepare(
            `INSERT INTO demo_orders
             (size, quantity, total_cents)
             VALUES (?, ?, ?)`,
          )
          .run(size, quantity, totalCents);

        response.writeHead(201);
        response.end(
          JSON.stringify({
            id: Number(result.lastInsertRowid),
            size,
            quantity,
            total_cents: totalCents,
            status: "simulated",
          }),
        );
      } catch {
        response.writeHead(500);
        response.end(
          JSON.stringify({ error: "Unable to save simulated order" }),
        );
      }

      return;
    }

    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" });
      response.end("Method not allowed.");
      return;
    }
    try {
      const pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
      if (reload?.handle(pathname, request, response)) return;
      const segments = pathname.split("/");
      if (
        segments.some((segment) => segment.startsWith(".")) ||
        pathname.includes("\\") ||
        pathname.includes("\0")
      ) {
        response.writeHead(404);
        response.end("File not found");
        return;
      }
      const filename = path.resolve(
        publicRoot,
        `.${pathname.endsWith("/") ? `${pathname}index.html` : pathname}`,
      );
      const resolvedRoot = await realpath(publicRoot);
      const resolvedFile = await realpath(filename);
      if (!resolvedFile.startsWith(`${resolvedRoot}${path.sep}`)) {
        response.writeHead(404);
        response.end("File not found");
        return;
      }
      const content = await readFile(resolvedFile);
      const servedContent =
        reload && path.extname(filename) === ".html"
          ? reload.inject(content)
          : content;
      response.writeHead(200, {
        "Content-Type":
          types[path.extname(filename)] ?? "application/octet-stream",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      });
      response.end(request.method === "HEAD" ? undefined : servedContent);
    } catch (error) {
      response.writeHead(error instanceof URIError ? 400 : 404);
      response.end(
        error instanceof URIError ? "Invalid file path" : "File not found",
      );
    }
  });
  app.on("close", () => {
    reload?.close();
    db.close();
  });
  return app;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const port = Number(process.env.PORT ?? 5173);
  const host = process.env.HOST ?? "127.0.0.1";
  const development = process.argv.includes("--dev");
  const app = createApp({ development });
  app.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Stop the other preview or choose another PORT.`,
      );
    } else {
      console.error(error.message);
    }
    process.exitCode = 1;
  });
  app.listen(port, host, () => {
    console.log(`Brand studio: http://${host}:${port}`);
    console.log(
      development
        ? "Development mode: save public/ files to refresh the browser automatically."
        : "Plain preview mode: refresh the browser yourself after saving files.",
    );
    console.log(
      "Press Ctrl+C to stop. Local changes do not publish to GitHub Pages.",
    );
  });
}
