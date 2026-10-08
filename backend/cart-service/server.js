const express = require("express");
const db = require("../../database/db");

const app = express();
app.use(express.json());

app.get("/cart/:userId", (req, res) => {
  const items = db.prepare("SELECT * FROM cart_items WHERE user_id = ?").all(req.params.userId);
  res.json(items);
});

app.post("/cart/:userId", (req, res) => {
  const {productId, quantity} = req.body;
  db.prepare(
    "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)"
  ).run(req.params.userId, productId, quantity || 1);
  res.status(201).json({message: "Added to cart"});
});

app.listen(4003, () => console.log("Cart service: 4003"));
