// src/components/AuthCallback.tsx
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard"); // Redirect to the doctor's dashboard
    } else {
      // If no token is found, redirect back to the main login page
      window.location.href = "http://localhost:5173/login"; // Adjust if your login URL is different
    }
  }, [navigate, searchParams]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
