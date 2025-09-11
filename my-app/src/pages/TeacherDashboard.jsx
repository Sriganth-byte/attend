export default function TeacherDashboard({ user, onSignout }) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">👩‍🏫 Teacher Dashboard</h1>
        <button
          onClick={onSignout}
          className="rounded-xl px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>Date of Birth: {user.dob}</p>
    </div>
  );
}
