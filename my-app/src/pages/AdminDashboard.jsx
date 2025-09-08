export default function AdminDashboard({ user }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">⚙️ Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>Date of Birth: {user.dob}</p>
    </div>
  );
}
