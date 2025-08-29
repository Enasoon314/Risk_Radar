async function analyzeMessage(message) {
  const response = await fetch("http://localhost:3001/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });
  const data = await response.json();
  console.log(data); // { risk: "High", reason: "Contains suspicious investment content" }
  return data;
}
