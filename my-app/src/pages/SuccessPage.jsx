import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SuccessPage({ user, onLogout }) {
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setShowAnimation(true), 100);
  }, []);

  const goToDashboard = () => {
    if (user.role === "student") navigate("/student");
    else if (user.role === "teacher") navigate("/teacher");
    else if (user.role === "admin") navigate("/admin");
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        padding: "3rem 2rem",
        width: "100%",
        maxWidth: "500px",
        textAlign: "center"
      }}>
        {/* Success Animation */}
        <div style={{
          marginBottom: "2rem",
          transform: showAnimation ? "scale(1)" : "scale(0)",
          transition: "transform 0.5s ease-out"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#10b981",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem auto",
            animation: showAnimation ? "pulse 2s infinite" : "none"
          }}>
            <span style={{ color: "white", fontSize: "32px" }}>✓</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1f2937", margin: "0 0 0.5rem 0" }}>
            Login Successful! 🎉
          </h1>
          <p style={{ fontSize: "16px", color: "#6b7280", margin: 0 }}>
            Welcome back, {user.name}!
          </p>
        </div>

        {/* User Info Card */}
        <div style={{
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          padding: "1.5rem",
          marginBottom: "2rem",
          border: "1px solid #e5e7eb",
          textAlign: "left"
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#374151", margin: "0 0 1rem 0" }}>
            User Information
          </h3>
          <div style={{ marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280", display: "inline-block", width: "80px" }}>
              Name:
            </span>
            <span style={{ fontSize: "14px", color: "#1f2937", fontWeight: "500" }}>
              {user.name}
            </span>
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280", display: "inline-block", width: "80px" }}>
              Email:
            </span>
            <span style={{ fontSize: "14px", color: "#1f2937", fontWeight: "500" }}>
              {user.email}
            </span>
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280", display: "inline-block", width: "80px" }}>
              Status:
            </span>
            <span style={{
              fontSize: "14px",
              color: "#10b981",
              fontWeight: "500",
              backgroundColor: "#d1fae5",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px"
            }}>
              Active
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={goToDashboard}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "0.75rem 1.5rem",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Go to Dashboard
          </button>
          <button
            onClick={onLogout}
            style={{
              backgroundColor: "transparent",
              color: "#6b7280",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "0.75rem 1.5rem",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

export default SuccessPage;
