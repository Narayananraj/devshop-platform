const express = require("express");

const app = express();
app.use(express.json());

app.post("/payments", (req, res) => {
  const {orderId, amount} = req.body;
  res.json({
    orderId,
    amount,
    status: "SUCCESS",
    message: "Demo payment completed"
  });
});

app.get("/payments/:id", (req, res) => {
  res.json({paymentId: req.params.id, status: "SUCCESS"});
});

app.listen(4005, () => console.log("Payment service: 4005"));
