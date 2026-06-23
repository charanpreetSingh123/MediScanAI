import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{
      background: "white",
      borderBottom: "1px solid #f1f5f9",
      padding: "0 28px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      fontFamily: "Inter, sans-serif"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "linear-gradient(135deg, #1e40af, #3b82f6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px"
        }}>
          🏥
        </div>
        <span style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>
          MediScan <span style={{ color: "#3b82f6" }}>AI</span>
        </span>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          background: "#f8fafc", padding: "8px 14px", borderRadius: "10px",
          border: "1px solid #f1f5f9"
        }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: "linear-gradient(135deg, #1e40af, #3b82f6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: "13px", fontWeight: "700"
          }}>
            {name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a", margin: 0 }}>{name}</p>
            <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0, textTransform: "capitalize" }}>{role}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "#fef2f2", color: "#ef4444",
            padding: "8px 14px", borderRadius: "10px",
            border: "1px solid #fee2e2", cursor: "pointer",
            fontSize: "13px", fontWeight: "600", fontFamily: "Inter, sans-serif"
          }}
        >
          ↩ Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;