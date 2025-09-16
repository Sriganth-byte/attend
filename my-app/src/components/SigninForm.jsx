import React, { useState } from "react";
import { signin } from "../api";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import appLogo from "../assets/app_logo.png";
import loginImg from "../assets/login.png";

function SigninForm({ onSignin, onSwitch }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    staySignedIn: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await signin({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("user", JSON.stringify(user));
      if (onSignin) onSignin(user);

      navigate("/success");
    } catch (err) {
      console.error("Signin error:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-container">
      <div className="auth-card">
        {/* Left - Image */}
        <div className="form-left">
          <img src={loginImg} alt="Login Illustration" className="left-image" />
        </div>

        {/* Right - Form */}
        <div className="form-right">
          {/* Logo */}
          <div className="brand">
            <img src={appLogo} alt="App Logo" className="brand-logo" />
            <h1 className="brand-name">Nexora</h1>
          </div>

          {/* Form */}
          <div className="form-content">
            <h2 className="form-welcome">Welcome Back</h2>
            <p className="form-desc">Sign in to your account</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                  <span className="input-icon">✉️</span>
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <span className="input-icon">🔒</span>
                </div>
              </div>

              {error && <div className="error-box">{error}</div>}

              <button type="submit" disabled={loading} className="signin-btn">
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="options">
                <label>
                  <input
                    type="checkbox"
                    name="staySignedIn"
                    checked={form.staySignedIn}
                    onChange={handleChange}
                  />
                  Stay signed in
                </label>
                <a href="#">Need help?</a>
              </div>
            </form>
          </div>

          {/* Switch */}
          <div className="create">
            <span className="link-text" onClick={onSwitch}>
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninForm;
