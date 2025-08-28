// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());           // Allow requests from frontend
app.use(bodyParser.json()); // Parse JSON body

// POST /check endpoint
app.post("/check", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  // Placeholder response
  res.json({
    level: "low",               // Risk level
    model: { label: "safe", prob: 0.95 }, // Dummy model prediction
    rules: [],                   // Placeholder for rule-based reasons
    similar_cases: []            // Placeholder for similar examples
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`SafeText backend running at http://localhost:${PORT}`);
});