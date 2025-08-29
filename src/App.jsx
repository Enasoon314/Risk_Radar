import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setResult(data); // { risk, reason }
    } catch (error) {
      console.error("Error:", error);
      setResult({ risk: "Error", reason: "Failed to analyze message" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Risk Radar</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter message to analyze"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Analyze</button>
      </form>

      {loading && <p>Analyzing...</p>}

      {result && (
        <div className={`result ${result.risk.toLowerCase()}`}>
          <p>Risk Level: {result.risk}</p>
          <p>Reason: {result.reason}</p>
        </div>
      )}
    </div>
  );
}

export default App;

