const express = require("express");
const db = require("../../database/db");

const app = express();
app.use(express.json());

app.get("/orders/:userId", (req, res) => {
  res.json(db.prepare("SELECT * FROM orders WHERE user_id = ?").all(req.params.userId));
});

app.post("/orders", (req, res) => {
  const {userId, total} = req.body;
  const result = db.prepare(
    "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)"
  ).run(userId, total, "CREATED");
  res.status(201).json({id: result.lastInsertRowid, status: "CREATED"});
});

app.listen(4004, () => console.log("Order service: 4004"));
