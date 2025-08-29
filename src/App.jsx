// src/App.jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!message) return;
    try {
      const response = await fetch("http://localhost:3001/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Determine color based on risk level
  const getRiskColor = (risk) => {
    switch (risk) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <div className="App">
      <h1>Risk Radar</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter the message to analyze..."
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleAnalyze}>Analyze</button>

      {result && (
        <div className="result">
          <h2>
            Risk Level:{" "}
            <span style={{ color: getRiskColor(result.risk) }}>
              {result.risk}
            </span>
          </h2>
          <p>Reason: {result.reason}</p>
        </div>
      )}
    </div>
  );
}

export default App;
