import React from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  Shield, 
  Activity, 
  BarChart3,
  Home,
  Stethoscope
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'patients', label: 'Patient Management', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'treatment', label: 'Treatment Plans', icon: Stethoscope },
  { id: 'records', label: 'Medical Records', icon: FileText },
  { id: 'otp-access', label: 'OTP Record Access', icon: Shield },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'vitals', label: 'Patient Vitals', icon: Activity },
];

export default function Sidebar({ activeTab, onTabChange, isCollapsed }: SidebarProps) {
  return (
    <div className={`bg-white shadow-sm border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}