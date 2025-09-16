import React, { useEffect, useState } from "react";
import "./SuccessPage.css";

function SuccessPage({ user, onLogout }) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowAnimation(true), 100);
  }, []);

  // Role-based dashboard navigation
  const goToDashboard = () => {
    if (user.role === "student") window.location.href = "/student";
    else if (user.role === "teacher") window.location.href = "/teacher";
    else if (user.role === "admin") window.location.href = "/admin";
    else window.location.href = "/"; // fallback
  };

  return (
    <div className="success-container">
      <div className="success-card">
        {/* Success Animation */}
        <div className={`success-animation ${showAnimation ? "show" : ""}`}>
          <div className={`success-circle ${showAnimation ? "pulse" : ""}`}>
            <span className="success-check">✓</span>
          </div>
        </div>

        {/* Header */}
        <div className="success-header">
          <h1>Login Successful! 🎉</h1>
          <h3>Welcome to Nexora</h3>
          <p>Smart Curriculum Activity And Attendance App</p>
        </div>

        {/* User Info Card */}
        <div className="user-info">
          <h3>User Information</h3>
          <div className="user-details">
            <div>
              <span className="label">Name:</span>
              <span className="value">{user.fullName || user.name || user.username}</span>
            </div>
            <div>
              <span className="label">Email:</span>
              <span className="value">{user.email || "Not provided"}</span>
            </div>
            <div>
              <span className="label">Role:</span>
              <span className="value">{user.role || "N/A"}</span>
            </div>
            <div>
              <span className="label">Status:</span>
              <span className="status">Active</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actions">
          <button className="btn-primary" onClick={goToDashboard}>
            Continue to Dashboard
          </button>
          <button className="btn-secondary" onClick={onLogout}>
            Logout
          </button>
        </div>

        {/* Footer */}
        <div className="footer">
          <h4>Nexora - Next Generation Learning</h4>
          <p>University College System v1.0</p>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
