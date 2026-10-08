const express = require("express");
const db = require("../../database/db");

const app = express();
app.use(express.json());

app.get("/users/:id", (req, res) => {
  const user = db.prepare("SELECT id, name, email FROM users WHERE id = ?").get(req.params.id);
  user ? res.json(user) : res.status(404).json({error: "User not found"});
});

app.post("/users", (req, res) => {
  const {name, email} = req.body;
  const result = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)").run(name, email);
  res.status(201).json({id: result.lastInsertRowid, name, email});
});

app.listen(4002, () => console.log("User service: 4002"));
