import React from "react";
import { Link, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Students from "./Students";
import Teachers from "./Teachers";
import Departments from "./Departments";
import Subjects from "./Subjects";
import Timetable from "./Timetable";
import Attendance from "./Attendance";
import Reports from "./Reports";
import Tasks from "./Tasks";

function Topbar({ user, onLogout }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem", background: "#1f2937", color: "white" }}>
      <span>Welcome, {user.name}</span>
      <button onClick={onLogout} style={{ background: "#ef4444", color: "white", padding: "0.5rem 1rem", borderRadius: "4px" }}>
        Logout
      </button>
    </div>
  );
}

function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Students", path: "/admin/students" },
    { name: "Teachers", path: "/admin/teachers" },
    { name: "Departments", path: "/admin/departments" },
    { name: "Subjects", path: "/admin/subjects" },
    { name: "Timetable", path: "/admin/timetable" },
    { name: "Attendance", path: "/admin/attendance" },
    { name: "Tasks", path: "/admin/tasks" },
    { name: "Reports", path: "/admin/reports" },
  ];

  return (
    <div style={{ width: "200px", background: "#e5e7eb", padding: "1rem", minHeight: "100vh" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map((link) => (
          <li key={link.path} style={{ margin: "0.5rem 0" }}>
            <Link to={link.path} style={{ textDecoration: "none", color: "#1f2937" }}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AdminDashboard({ user, onLogout }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Topbar user={user} onLogout={onLogout} />
        <div style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="departments" element={<Departments />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
