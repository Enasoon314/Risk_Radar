// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'; // Load environment variables from .env
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Test environment variable
console.log("OPENAI_API_KEY =", process.env.OPENAI_API_KEY); // Should print your key

// Analyze message risk using OpenAI GPT model
async function analyzeMessageWithAI(message) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a financial scam detection assistant. Classify messages into Low, Medium, High risk and provide a short reason.'
        },
        {
          role: 'user',
          content: message
        }
      ]
    });

    const resultText = response.choices[0].message.content.trim();
    const riskMatch = resultText.match(/Risk:\s*(Low|Medium|High)/i);
    const reasonMatch = resultText.match(/Reason:\s*(.*)/i);

    const risk = riskMatch ? riskMatch[1] : 'Low';
    const reason = reasonMatch ? reasonMatch[1] : 'No reason provided';

    return { risk, reason };
  } catch (err) {
    console.error(err);
    return { risk: 'Unknown', reason: 'Error analyzing message' };
  }
}

// Backend API endpoint
app.post('/api/analyze', async (req, res) => {
  const { message } = req.body;
  const result = await analyzeMessageWithAI(message);
  res.json(result);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
