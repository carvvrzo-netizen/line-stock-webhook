const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("LINE webhook running ✅");
});

app.post("/webhook", (req, res) => {

  const event = req.body.events?.[0];

  if (!event) {
    return res.status(200).send("OK");
  }

  // ✅ GROUP ID อยู่ตรงนี้
  if (event.source.type === "group") {
    console.log("✅ GROUP ID =", event.source.groupId);
  }

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 8080;
app.listen(1453, () => {
  console.log("Server running on", PORT);
});

