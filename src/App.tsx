import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import TopNavigation from './components/TopNavigation';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import PatientManagement from './components/PatientManagement';
import OTPRecordAccess from './components/OTPRecordAccess';
import TreatmentPlanning from './components/TreatmentPlanning';
import AppointmentManagement from './components/AppointmentManagement';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'patients':
        return <PatientManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'treatment':
        return <TreatmentPlanning />;
      case 'otp-access':
        return <OTPRecordAccess />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <TopNavigation
        doctorName="Sarah Mitchell"
        onProfileClick={() => console.log('Profile clicked')}
        onSettingsClick={() => console.log('Settings clicked')}
        onLogoutClick={() => console.log('Logout clicked')}
      />

      <div className="flex">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}
        `}>
          <div className="h-full pt-16 lg:pt-0">
            <Sidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
              }}
              isCollapsed={sidebarCollapsed}
            />
          </div>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-6 lg:p-8">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Sidebar Toggle Button (Desktop) */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="hidden lg:block fixed top-20 left-4 z-30 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
      >
        <Menu className="w-4 h-4" />
      </button>
    </div>
  );
}

export default App;