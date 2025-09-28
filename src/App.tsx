import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout"; // We will create this
import AuthCallback from "./components/AuthCallback"; // The component from our previous discussion

// A simple component for a public-facing login page link, if needed
const LoginRedirect = () => {
  window.location.href = "http://localhost:5173/login"; // Adjust to your login app's URL
  return <div>Redirecting to login...</div>;
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public route for handling the login redirect token */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* A fallback to the main login page */}
      <Route path="/login" element={<LoginRedirect />} />

      {/* Any other route will be handled by our secure, protected layout */}
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
};

export default App;
