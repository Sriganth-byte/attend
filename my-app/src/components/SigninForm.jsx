import React, { useState } from "react";
import "./Form.css";
import { signin } from "../api";
import { useNavigate } from "react-router-dom";

function SigninForm({ onSignin, onSwitch }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    staySignedIn: false,
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const user = await signin({
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("user", JSON.stringify(user));
      if (onSignin) onSignin(user);

      // Redirect to success page
      navigate("/success");
    } catch (err) {
      alert("Signin failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <div className="avatar"></div>
        <h2>Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="options">
          <div className="stay-signed-in">
            <input
              type="checkbox"
              id="stay"
              name="staySignedIn"
              checked={form.staySignedIn}
              onChange={handleChange}
            />
            <label htmlFor="stay">Stay signed in</label>
          </div>
          <a href="#">Need help?</a>
        </div>

        <div className="create">
          <span
            className="link-text"
            onClick={onSwitch}
            style={{
              cursor: "pointer",
              color: "#007bff",
              textDecoration: "underline",
            }}
          >
            Create an account
          </span>
        </div>
      </form>
    </div>
  );
}

export default SigninForm;
