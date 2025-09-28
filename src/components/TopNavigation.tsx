import React from "react";
import { Bell, Search, User, Settings, LogOut } from "lucide-react";

// --- Updated props interface ---
interface TopNavigationProps {
  doctorName: string;
  doctorSpecialty: string;
  notificationCount: number;
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
}

export default function TopNavigation({
  doctorName,
  doctorSpecialty,
  notificationCount,
  searchTerm,
  onSearchChange,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}: TopNavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MD</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">MedCare Pro</h1>
        </div>

        {/* Search Bar (Now a controlled component) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications (Now shows a count) */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs text-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Doctor Profile (Now shows dynamic name and specialty) */}
          <div className="relative">
            <button
              onClick={onProfileClick}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  Dr. {doctorName}
                </p>
                <p className="text-xs text-gray-500">{doctorSpecialty}</p>
              </div>
            </button>
          </div>

          {/* Settings */}
          <button
            onClick={onSettingsClick}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Logout (Now functional) */}
          <button
            onClick={onLogoutClick}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
