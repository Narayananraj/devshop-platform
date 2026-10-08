const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "shopping.db"));

db.exec(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  total REAL NOT NULL,
  status TEXT NOT NULL
);
`);

const count = db.prepare("SELECT COUNT(*) AS count FROM products").get().count;
if (count === 0) {
  const insert = db.prepare(
    "INSERT INTO products (name, description, price) VALUES (?, ?, ?)"
  );
  insert.run("Laptop", "Developer laptop", 55000);
  insert.run("Keyboard", "Mechanical keyboard", 3500);
  insert.run("Headphones", "Wireless headphones", 2500);
}

const users = db.prepare("SELECT COUNT(*) AS count FROM users").get().count;
if (users === 0) {
  db.prepare("INSERT INTO users (name, email) VALUES (?, ?)")
    .run("Demo User", "demo@example.com");
}

module.exports = db;
