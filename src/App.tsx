import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import api from "./api/api"; // Your central API client
import TopNavigation from "./components/TopNavigation";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./components/DashboardOverview";
import PatientManagement from "./components/PatientManagement";
import AppointmentManagement from "./components/AppointmentManagement";
import TreatmentPlanning from "./components/TreatmentPlanning";
import OTPRecordAccess from "./components/OTPRecordAccess";

// --- Define the shape of your user profile data ---
interface DoctorProfile {
  _id: string;
  name: string;
  specialty?: string;
}

function App() {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // --- Handle Logout ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // --- Fetch the doctor's profile on initial load ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get<DoctorProfile>("/doctor/navbar/profile");
        setProfile(data);
      } catch (error) {
        console.error("Authentication failed", error);
        handleLogout(); // If we can't get the profile, the token is bad, so log out.
      }
    };
    fetchProfile();
  }, []);

  // Show a loading screen while the profile is being fetched
  if (!profile) {
    return <div>Loading Application...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation
        doctorName={profile.name}
        doctorSpecialty={profile.specialty || "Doctor"}
        // Pass other navbar props like search and notifications here
        onLogoutClick={handleLogout}
        onProfileClick={() => {
          /* Navigate to profile page */
        }}
        onSettingsClick={() => {
          /* Navigate to settings page */
        }}
      />

      <div className="flex">
        {/* Mobile Menu Button - no changes needed */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Sidebar */}
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          ${sidebarCollapsed ? "lg:w-16" : "lg:w-64"}
        `}
        >
          <div className="h-full pt-16 lg:pt-0">
            {/* The sidebar now handles navigation via Links, not state */}
            <Sidebar
              isCollapsed={sidebarCollapsed}
              onLinkClick={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>

        {/* Main Content Area with Routes */}
        <div className="flex-1 lg:ml-0">
          <main className="p-6 lg:p-8">
            <Routes>
              <Route path="/dashboard" element={<DashboardOverview />} />
              <Route path="/patients" element={<PatientManagement />} />
              <Route path="/appointments" element={<AppointmentManagement />} />
              <Route path="/treatment-plans" element={<TreatmentPlanning />} />
              <Route path="/otp-access" element={<OTPRecordAccess />} />
              {/* Add a default route */}
              <Route path="/" element={<DashboardOverview />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
