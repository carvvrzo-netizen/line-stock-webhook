const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("LINE webhook running ✅");
});

// webhook endpoint
app.post("/webhook", (req, res) => {
  console.log("LINE EVENT:", JSON.stringify(req.body, null, 2));
  res.status(200).send("OK");
});

// ⭐ สำคัญที่สุด ⭐
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port", 1453);
});
