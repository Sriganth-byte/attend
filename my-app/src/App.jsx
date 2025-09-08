import { useState } from "react";
import SigninForm from "./components/SigninForm";
import SignupForm from "./components/SignupForm";

import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const handleSignup = (userData) => setUser(userData);
  const handleSignin = (userData) => setUser(userData);

  if (!user) {
    return (
      <div>
        {showSignup ? (
          <SignupForm onSignup={handleSignup} onSwitch={() => setShowSignup(false)} />
        ) : (
          <SigninForm onSignin={handleSignin} onSwitch={() => setShowSignup(true)} />
        )}
      </div>
    );
  }

  if (user.role === "student") return <StudentDashboard user={user} />;
  if (user.role === "teacher") return <TeacherDashboard user={user} />;
  if (user.role === "admin") return <AdminDashboard user={user} />;

  return <div>Invalid role</div>;
}

export default App;
