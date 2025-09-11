import { useState } from "react";
import { detectRole } from "../utils/roleUtils";
import "./Form.css";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";

export default function SignupForm({ onSignup, onSwitch }) {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdminChecked: false,
    passkey: "",
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
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    let role = detectRole(form.email);

    if (role === "teacher" && form.isAdminChecked) {
      if (form.passkey === "8610") {
        role = "admin";
      } else {
        alert("Invalid admin passkey. Registering as Teacher.");
      }
    }

    if (role === "invalid") {
      alert("Invalid email format for role detection.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        dob: form.dob || null,
        email: form.email,
        password: form.password,
        role,
        is_admin: role === "admin",
      };

      const user = await signup(payload);
      localStorage.setItem("user", JSON.stringify(user));
      if (onSignup) onSignup(user);

      navigate("/success");
    } catch (err) {
      alert("Signup failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Create Account</h2>

        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />

        {detectRole(form.email) === "teacher" && (
          <div className="admin-check">
            <label>
              <input type="checkbox" name="isAdminChecked" checked={form.isAdminChecked} onChange={handleChange} />
              Register as Admin
            </label>
          </div>
        )}

        {detectRole(form.email) === "teacher" && form.isAdminChecked && (
          <input name="passkey" type="password" placeholder="Enter Admin Passkey" value={form.passkey} onChange={handleChange} />
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>

        <div className="create">
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>
            Already have an account? Sign in
          </a>
        </div>
      </form>
    </div>
  );
}
