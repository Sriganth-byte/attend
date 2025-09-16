import React, { useState } from "react";
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaBuilding, FaBook, FaCalendarAlt, FaCheckCircle, FaTasks, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { Link, Routes, Route } from "react-router-dom";
import "./AdminDashboard.css";

import Dashboard from "./Dashboard";
import Students from "./Students";
import Teachers from "./Teachers";
import Departments from "./Departments";
import Subjects from "./Subjects";
import Timetable from "./Timetable";
import Attendance from "./Attendance";
import Reports from "./Reports";
import Tasks from "./Tasks";

/* ----------------- Topbar ----------------- */
function Topbar({ user, onToggleSidebar }) {
  return (
    <div className="topbar">
      
      <div className="topbar-content">
        <span className="welcome">
          Welcome, <b>{user.name}</b>
        </span>
      </div>
    </div>
  );
}

/* ----------------- Sidebar ----------------- */
function Sidebar({ isOpen, onClose, onLogout, user }) {
  const links = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    { name: "Students", path: "/admin/students", icon: <FaUserGraduate /> },
    { name: "Teachers", path: "/admin/teachers", icon: <FaChalkboardTeacher /> },
    { name: "Departments", path: "/admin/departments", icon: <FaBuilding /> },
    { name: "Subjects", path: "/admin/subjects", icon: <FaBook /> },
    { name: "Timetable", path: "/admin/timetable", icon: <FaCalendarAlt /> },
    { name: "Attendance", path: "/admin/attendance", icon: <FaCheckCircle /> },
    { name: "Tasks", path: "/admin/tasks", icon: <FaTasks /> },
    { name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div style={{ width: '100%', marginBottom: '1.5rem', paddingLeft: 2, paddingRight: 2 }}>
        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#2563eb', marginBottom: 2 }}>Admin Dashboard</div>
        {user && (
          <div style={{ fontSize: '0.97rem', color: '#1e293b', marginBottom: 2 }}>
            {user.name ? user.name : ''}
          </div>
        )}
      </div>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path} onClick={onClose}>
              <span style={{ marginRight: '0.7em', fontSize: '1.1em', verticalAlign: 'middle', display: 'inline-block' }}>{link.icon}</span>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
        <button className="logout-btn" onClick={onLogout} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.7em',
          background: 'none',
          border: 'none',
          color: 'inherit',
          fontSize: '1rem',
          fontWeight: 500,
          cursor: 'pointer',
          padding: '0.5rem 0.8rem',
          margin: 0,
          width: '100%',
          textAlign: 'left',
          boxShadow: 'none',
          borderRadius: 0,
          outline: 'none',
          transition: 'background 0.2s, color 0.2s',
        }}>
          <FaSignOutAlt style={{ fontSize: '1.1em', verticalAlign: 'middle', display: 'inline-block' }} />
          Logout
        </button>
    </div>
  );
}

/* ----------------- Main Admin Dashboard ----------------- */
export default function AdminDashboard({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-container">
      {/* Browser-like frame */}
      <div className="admin-layout">
  <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} onLogout={onLogout} user={user} />

        <div className="main-section">
          <Topbar
            user={user}
            onToggleSidebar={toggleSidebar}
          />
          <div className="page-content">
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
    </div>
  );
}
