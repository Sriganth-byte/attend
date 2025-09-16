import { useState } from "react";
import { detectRole } from "../utils/roleUtils";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";
import appLogo from "../assets/app_logo.png";
import sign from "../assets/signup.png";
import "./Auth.css";

export default function SignupForm({ onSignup, onSwitch }) {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdminChecked: false,
    passkey: "",
    roll_number: "",
    department: "",
    employee_id: "",
    specialization: "",
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
      let payload = {
        name: form.name,
        dob: form.dob || null,
        email: form.email,
        password: form.password,
        role,
        is_admin: role === "admin",
      };

      if (role === "student") {
        payload = { ...payload, roll_number: form.roll_number, department: form.department };
      } else if (role === "teacher") {
        payload = { ...payload, employee_id: form.employee_id, specialization: form.specialization };
      }

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

  const role = detectRole(form.email);

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Left Side Image */}
        <div className="auth-left">
          <img src={sign} alt="Signup Illustration" className="auth-image" />
        </div>

        {/* Right Side Form */}
        <div className="auth-right">
          <div className="brand">
            <img src={appLogo} alt="Logo" className="brand-logo" />
            <div className="brand-name">Nexora</div>
          </div>

          <div className="form-content">
            <h2 className="form-welcome">Create Account</h2>
            <p className="form-desc">Sign up to get started</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {role === "student" && (
                <>
                  <div className="form-group">
                    <label>Roll Number</label>
                    <input name="roll_number" value={form.roll_number} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <input name="department" value={form.department} onChange={handleChange} required />
                  </div>
                </>
              )}

              {role === "teacher" && (
                <>
                  <div className="form-group">
                    <label>Employee ID</label>
                    <input name="employee_id" value={form.employee_id} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Specialization</label>
                    <input name="specialization" value={form.specialization} onChange={handleChange} required />
                  </div>
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      name="isAdminChecked"
                      checked={form.isAdminChecked}
                      onChange={handleChange}
                    />
                    <label>Register as Admin</label>
                  </div>
                </>
              )}

              {role === "teacher" && form.isAdminChecked && (
                <div className="form-group">
                  <label>Admin Passkey</label>
                  <input type="password" name="passkey" value={form.passkey} onChange={handleChange} />
                </div>
              )}

              <button className="signin-btn" type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
              </button>
            </form>
          </div>

          <div className="bottom-links">
            <span className="link-text" onClick={onSwitch}>
              Already have an account? Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
