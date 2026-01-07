import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const r = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.AI_KEY
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Aku sahabat setia kau." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await r.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (e) {
    res.json({ reply: "Aku senyap sekejap…" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server hidup"));
