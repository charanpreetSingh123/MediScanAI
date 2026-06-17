import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/api";
import toast from "react-hot-toast";
import { Activity, User, Mail, Lock, Stethoscope } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "patient" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "420px",
        padding: "40px",
        boxSizing: "border-box"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            background: "#2563eb",
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px"
          }}>
            <Activity color="white" size={28} />
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b", margin: "0 0 4px" }}>
            Create Account
          </h1>
          <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0 }}>
            Join MediScan AI today
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Full Name</label>
            <div style={{ position: "relative" }}>
              <User size={16} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%", padding: "12px 14px 12px 40px",
                  border: "1.5px solid #e2e8f0", borderRadius: "10px",
                  fontSize: "14px", color: "#1e293b", outline: "none",
                  boxSizing: "border-box", fontFamily: "Inter, sans-serif"
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%", padding: "12px 14px 12px 40px",
                  border: "1.5px solid #e2e8f0", borderRadius: "10px",
                  fontSize: "14px", color: "#1e293b", outline: "none",
                  boxSizing: "border-box", fontFamily: "Inter, sans-serif"
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%", padding: "12px 14px 12px 40px",
                  border: "1.5px solid #e2e8f0", borderRadius: "10px",
                  fontSize: "14px", color: "#1e293b", outline: "none",
                  boxSizing: "border-box", fontFamily: "Inter, sans-serif"
                }}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>I am a</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "patient" })}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: "600",
                  cursor: "pointer", border: `2px solid ${form.role === "patient" ? "#2563eb" : "#e2e8f0"}`,
                  background: form.role === "patient" ? "#eff6ff" : "white",
                  color: form.role === "patient" ? "#2563eb" : "#94a3b8",
                  fontFamily: "Inter, sans-serif"
                }}
              >
                <User size={16} /> Patient
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "doctor" })}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: "600",
                  cursor: "pointer", border: `2px solid ${form.role === "doctor" ? "#2563eb" : "#e2e8f0"}`,
                  background: form.role === "doctor" ? "#eff6ff" : "white",
                  color: form.role === "doctor" ? "#2563eb" : "#94a3b8",
                  fontFamily: "Inter, sans-serif"
                }}
              >
                <Stethoscope size={16} /> Doctor
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#93c5fd" : "#2563eb",
              color: "white", padding: "13px", borderRadius: "10px",
              border: "none", fontSize: "15px", fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "4px", fontFamily: "Inter, sans-serif"
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "14px", color: "#94a3b8", marginTop: "24px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;