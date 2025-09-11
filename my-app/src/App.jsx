import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import SigninForm from "./components/SigninForm";
import SignupForm from "./components/SignupForm";
import SuccessPage from "./pages/SuccessPage";

import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [showSignup, setShowSignup] = useState(false);

  const handleSignup = (userData) => setUser(userData);
  const handleSignin = (userData) => setUser(userData);

  const handleSignout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Default Login/Signup page */}
        {!user ? (
          <>
            <Route
              path="/"
              element={
                showSignup ? (
                  <SignupForm onSignup={handleSignup} onSwitch={() => setShowSignup(false)} />
                ) : (
                  <SigninForm onSignin={handleSignin} onSwitch={() => setShowSignup(true)} />
                )
              }
            />
            {/* Redirect any unknown path to "/" */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {/* After login/signup */}
            <Route path="/success" element={<SuccessPage user={user} onLogout={handleSignout} />} />
            <Route path="/student/*" element={<StudentDashboard user={user} onSignout={handleSignout} />} />
            <Route path="/teacher/*" element={<TeacherDashboard user={user} onSignout={handleSignout} />} />
            <Route path="/admin/*" element={<AdminDashboard user={user} onLogout={handleSignout} />} />
            {/* Redirect unknown paths to success page */}
            <Route path="*" element={<Navigate to="/success" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
