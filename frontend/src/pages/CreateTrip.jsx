import { useState } from "react";
import ReactMarkdown from "react-markdown";
//import axios from "axios";
import API from "../../services/api";
export default function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("Medium");
  const [interests, setInterests] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await API.post(
        "/generate-trip",
        {
          destination,
          days,
          budget,
          interests,
        }
      );

      setResult(response.data.itinerary);
    } catch (error) {
      console.error(error);
      alert("Failed to generate itinerary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
        }}
      >
        Create New Trip
      </h1>

      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <label>Destination</label>

        <input
          type="text"
          placeholder="Paris"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
          }}
        />

        <label>Duration (Days)</label>

        <input
          type="number"
          placeholder="5"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
          }}
        />

        <label>Budget</label>

        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
          }}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label>Interests</label>

        <input
          type="text"
          placeholder="Food, Museums, Shopping"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Generate AI Itinerary
        </button>

        {loading && (
          <p style={{ marginTop: "20px" }}>
            Generating itinerary...
          </p>
        )}

        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "#f8fafc",
              borderRadius: "10px",
              whiteSpace: "pre-wrap",
            }}
          >
            <h3>Generated Itinerary</h3>
            <ReactMarkdown>
                      {result}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}