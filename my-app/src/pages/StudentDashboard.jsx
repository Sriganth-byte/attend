export default function StudentDashboard({ user }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🎓 Student Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>Date of Birth: {user.dob}</p>
    </div>
  );
}
