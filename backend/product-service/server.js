const express = require("express");
const cors = require("cors");
const db = require("../../database/db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/products", (req, res) => {
  res.json(db.prepare("SELECT * FROM products").all());
});

app.get("/products/:id", (req, res) => {
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  product ? res.json(product) : res.status(404).json({error: "Product not found"});
});

app.listen(4001, () => console.log("Product service: 4001"));
