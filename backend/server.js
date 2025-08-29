// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Enable CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json());

// Simple scam detection function
function analyzeMessage(message) {
  let risk = "Low"; // Default risk
  let reason = "No suspicious content detected"; // Default reason

  // Basic keyword checks
  if (message.includes("investment") || message.includes("money")) {
    risk = "High";
    reason = "Contains suspicious investment/money content";
  } else if (message.includes("click here")) {
    risk = "Medium";
    reason = "Contains a link phrase";
  }

  return { risk, reason };
}

// Backend API endpoint
app.post('/api/analyze', (req, res) => {
  const { message } = req.body;
  const result = analyzeMessage(message);
  res.json(result);
});

// Start the server
app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
