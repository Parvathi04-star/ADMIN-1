import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  Stethoscope,
  FileText,
  KeyRound as Shield, // Using 'as' to rename for consistency with your original code
  BarChart3,
  Activity,
} from "lucide-react";

// 1. Define the props the component now accepts
interface SidebarProps {
  isCollapsed: boolean;
  onLinkClick: () => void; // For closing the mobile menu
}

// 2. The menu items now use a 'path' for the URL
const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: Home },
  { path: "/patients", label: "Patient Management", icon: Users },
  { path: "/appointments", label: "Appointments", icon: Calendar },
  { path: "/treatment-plans", label: "Treatment Plans", icon: Stethoscope },
  { path: "/records", label: "Medical Records", icon: FileText }, // Example path
  { path: "/otp-access", label: "OTP Record Access", icon: Shield },
  { path: "/analytics", label: "Analytics", icon: BarChart3 }, // Example path
  { path: "/vitals", label: "Patient Vitals", icon: Activity }, // Example path
];

export default function Sidebar({ isCollapsed, onLinkClick }: SidebarProps) {
  // 3. Use the 'useLocation' hook to get the current browser path
  const location = useLocation();

  return (
    <div
      className={`bg-white shadow-sm border-r border-gray-200 transition-all duration-300 h-full ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // 4. The active state is now determined by matching the URL path
            const isActive = location.pathname.startsWith(item.path);

            return (
              // 5. Replace <button> with <Link> from react-router-dom
              <Link
                key={item.path}
                to={item.path}
                onClick={onLinkClick} // Closes mobile menu on navigation
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : // Your original UI had a border, which we can replicate with a pseudo-element if needed,
                      // but this background/text color change is cleaner for a start.
                      "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-blue-700" : "text-gray-500"
                  }`}
                />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
