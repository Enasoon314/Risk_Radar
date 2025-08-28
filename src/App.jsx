// src/App.jsx
import { useState } from "react";
import "./App.css";

function App() {
  // State for user input text
  const [text, setText] = useState("");

  // State for backend result
  const [result, setResult] = useState(null);

  // Function to call backend /check API
  const analyzeText = async () => {
    if (!text) return; // Do nothing if input is empty

    try {
      const resp = await fetch("http://localhost:5000/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }), // Send input text to backend
      });
      const data = await resp.json();
      setResult(data); // Update result state with backend response
    } catch (err) {
      console.error("Error calling backend:", err);
    }
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>SafeText — Scam Risk Detector</h1>

      {/* Input box */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste message or email here..."
        rows={5}
        cols={50}
      />

      <br />
      {/* Analyze button */}
      <button onClick={analyzeText} style={{ marginTop: "10px", padding: "10px 20px" }}>
        Analyze
      </button>

      {/* Display backend result */}
      {result && (
        <div style={{ marginTop: "20px", textAlign: "left", display: "inline-block" }}>
          <h3>Risk Level: {result.level}</h3>
          <p>
            Model Prediction: {result.model.label} ({result.model.prob})
          </p>
          <p>Rules Triggered: {result.rules.length > 0 ? result.rules.join(", ") : "None"}</p>
          <p>Similar Cases: {result.similar_cases.length > 0 ? result.similar_cases.join("; ") : "None"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
