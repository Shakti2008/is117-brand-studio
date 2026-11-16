import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("ascend-orders.sqlite");

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

console.log("ASCEND SQLite database is ready!");

db.close();
