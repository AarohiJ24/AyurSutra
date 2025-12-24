// routes/feedback.js
const express = require("express");
const router = express.Router();
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

router.post("/analyze", async (req, res) => {
  try {
    const { feedback } = req.body;
    if (!feedback) return res.status(400).json({ error: "Feedback text required" });

    const result = sentiment.analyze(feedback);
    

    if (result.score > 1) category = "Positive";
    else if (result.score < -1) category = "Warning";

    res.json({
      score: result.score,
      category: category
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
