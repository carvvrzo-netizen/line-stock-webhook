const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const LINE_TOKEN = "xW/JpwcUbvQn26zS2++6xorbbgSGSAOEhky4Gpde5K0ImVfAhjJ5YS+yEuZRWb6iUSczDzycPdwP4Edy6LLZGlDLH1MoCEptqr7MHsAbULCBqp/RWf6fbVaOGrKo1/LeYOZalpVrAolxgQBYblGWugdB04t89/1O/w1cDnyilFU=";

// ===============================
// webhook
// ===============================
app.post("/webhook", async (req, res) => {

  console.log(JSON.stringify(req.body));

  const event = req.body.events?.[0];
  if (!event) return res.sendStatus(200);

  const text = event.message?.text;
  const source = event.source;

  if (source?.groupId) {
    await axios.post(
      "https://api.line.me/v2/bot/message/push",
      {
        to: source.groupId,
        messages: [
          {
            type: "text",
            text: `📦 ได้รับคำสั่ง:\n${text}`
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${LINE_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
  }

  res.sendStatus(200);
});

// ===============================
app.get("/", (req, res) => {
  res.send("LINE webhook running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
