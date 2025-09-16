import React from "react";
import "./Students.css";

export default function Student() {
  const students = [
    { id: 1, name: "John Doe", roll: "101", course: "AI & DS" },
    { id: 2, name: "Jane Smith", roll: "102", course: "CSE" },
    { id: 3, name: "David Lee", roll: "103", course: "IT" },
  ];

  return (
    <div className="students-page">
      <h1 className="students-title">Students</h1>
      <div className="students-grid">
        {students.map((s) => (
          <div key={s.id} className="student-card">
            <h3>{s.name}</h3>
            <p>Roll: {s.roll}</p>
            <p>Course: {s.course}</p>
            <button className="student-btn">View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
}
