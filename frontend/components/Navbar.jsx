import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        background: "#2563eb",
      }}
    >
      <Link
        to="/dashboard"
        style={{
          color: "white",
          textDecoration: "none",
          marginRight: "20px",
        }}
      >
        Dashboard
      </Link>

      <Link
        to="/create-trip"
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        Create Trip
      </Link>
    </nav>
  );
}

export default Navbar;