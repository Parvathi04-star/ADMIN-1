import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import api from "../api/api";
import TopNavigation from "../components/TopNavigation";
import Sidebar from "../components/Sidebar";
import DashboardOverview from "../components/DashboardOverview";
import PatientManagement from "../components/PatientManagement";
import AppointmentManagement from "../components/AppointmentManagement";
import TreatmentPlanning from "../components/TreatmentPlanning";
import OTPRecordAccess from "../components/OTPRecordAccess";

// --- Interfaces for our data ---
interface DoctorProfile {
  _id: string;
  name: string;
  specialty?: string;
}

interface Notification {
  _id: string;
  message: string;
  read: boolean;
}

interface SearchResults {
  patients: any[];
  appointments: any[];
}

const ProtectedLayout: React.FC = () => {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // --- State for notifications and search ---
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:5173/login"; // Adjust if needed
  };

  // --- Fetch initial data (profile AND notifications) ---
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [profileRes, notificationsRes] = await Promise.all([
          api.get<DoctorProfile>("/doctor/navbar/profile"),
          api.get<Notification[]>("/doctor/navbar/notifications"),
        ]);
        setProfile(profileRes.data);
        setNotifications(notificationsRes.data);
      } catch (error) {
        console.error("Authentication failed", error);
        handleLogout();
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      fetchInitialData();
    } else {
      handleLogout();
    }
  }, []);

  // --- useEffect for handling search ---
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults(null);
      return;
    }
    const fetchSearch = async () => {
      try {
        const { data } = await api.get<SearchResults>("/doctor/navbar/search", {
          params: { q: searchTerm },
        });
        setSearchResults(data);
      } catch (error) {
        console.error("Search failed", error);
      }
    };
    const debounceTimer = setTimeout(() => fetchSearch(), 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  if (!profile) {
    return <div>Loading Application...</div>;
  }

  // Calculate unread notification count
  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pass all the required props to TopNavigation */}
      <TopNavigation
        doctorName={profile.name}
        doctorSpecialty={profile.specialty || "Doctor"}
        notificationCount={unreadNotificationCount}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onLogoutClick={handleLogout}
        onProfileClick={() => navigate("/profile")}
        onSettingsClick={() => navigate("/settings")}
      />

      <div className="flex">
        <div
          className={`fixed lg:static inset-y-0 left-0 z-40 transform transition-all duration-300 ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          } ${sidebarCollapsed ? "lg:w-16" : "lg:w-64"}`}
        >
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onLinkClick={() => setMobileMenuOpen(false)}
          />
        </div>

        <div className="flex-1">
          <main className="p-6 lg:p-8">
            <Routes>
              <Route path="/dashboard" element={<DashboardOverview />} />
              <Route path="/patients" element={<PatientManagement />} />
              <Route path="/appointments" element={<AppointmentManagement />} />
              <Route path="/treatment-plans" element={<TreatmentPlanning />} />
              <Route path="/otp-access" element={<OTPRecordAccess />} />
              <Route path="/" element={<DashboardOverview />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
