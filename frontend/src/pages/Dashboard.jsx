import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
        }}
      >
        ✈️ AI Travel Planner
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#666",
        }}
      >
        Plan smarter. Travel better.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Link to="/create-trip">
          <button
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Create New Trip
          </button>
        </Link>
      </div>

      <h2 style={{ marginTop: "40px" }}>My Trips</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600"
            alt="Paris"
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          <h3>Paris Trip</h3>

          <p>5 Days • Medium Budget</p>

          <Link to="/trip/1">
            <button
              style={{
                background: "#10b981",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              View Trip
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}