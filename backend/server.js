// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Updated keyword-based risk analysis
function analyzeMessage(message) {
  let risk = "Low";
  let reason = "No suspicious content detected";

  const msgLower = message.toLowerCase();

  // High risk keywords
  const highRiskKeywords = [
    "urgent",
    "verify",
    "account suspended",
    "password",
    "credit card",
    "confirm",
    "immediate action required",
    "payment failed",
    "unauthorized login",
    "suspicious activity"
  ];

  // Medium risk keywords
  const mediumRiskKeywords = [
    "prize",
    "winner",
    "free",
    "offer",
    "claim",
    "limited time",
    "urgent response needed",
    "investment",
    "check attachment",
    "unsubscribe"
  ];

  // Low risk keywords
  const lowRiskKeywords = [
    "dear customer",
    "support",
    "update",
    "invoice",
    "notification",
    "service",
    "document",
    "download",
    "click here",
    "account"
  ];

  // Check high risk first
  if (highRiskKeywords.some(keyword => msgLower.includes(keyword))) {
    risk = "High";
    reason = "Contains high-risk keywords often used in scams";
  } 
  // Check medium risk next
  else if (mediumRiskKeywords.some(keyword => msgLower.includes(keyword))) {
    risk = "Medium";
    reason = "Contains medium-risk keywords commonly used in phishing or promotional scams";
  } 
  // Check low risk
  else if (lowRiskKeywords.some(keyword => msgLower.includes(keyword))) {
    risk = "Low";
    reason = "Contains low-risk keywords; generally safe but monitor context";
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
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
