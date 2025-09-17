import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Bell, 
  Settings, 
  Users, 
  MapPin, 
  Calendar, 
  FileText, 
  BarChart3, 
  HelpCircle, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Filter,
  ChevronRight,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  UserPlus,
  Building
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface Branch {
  id: string;
  name: string;
  location: string;
  type: 'clinic' | 'hospital';
  status: 'active' | 'inactive';
  staff: number;
}

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: string;
}

interface LogEntry {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  ip: string;
  status: 'success' | 'failed';
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock data
  const users: User[] = [
    { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah@clinic.com', role: 'Doctor', status: 'active', lastLogin: '2 hours ago' },
    { id: '2', name: 'Mike Chen', email: 'mike@clinic.com', role: 'Nurse', status: 'active', lastLogin: '1 day ago' },
    { id: '3', name: 'Emily Davis', email: 'emily@clinic.com', role: 'Admin', status: 'inactive', lastLogin: '3 days ago' },
  ];

  const branches: Branch[] = [
    { id: '1', name: 'Downtown Clinic', location: 'New York, NY', type: 'clinic', status: 'active', staff: 15 },
    { id: '2', name: 'General Hospital', location: 'Los Angeles, CA', type: 'hospital', status: 'active', staff: 45 },
    { id: '3', name: 'Suburban Care', location: 'Chicago, IL', type: 'clinic', status: 'inactive', staff: 8 },
  ];

  const appointments: Appointment[] = [
    { id: '1', patient: 'John Doe', doctor: 'Dr. Smith', time: '10:00 AM', status: 'scheduled', type: 'Consultation' },
    { id: '2', patient: 'Jane Wilson', doctor: 'Dr. Johnson', time: '2:30 PM', status: 'completed', type: 'Follow-up' },
    { id: '3', patient: 'Bob Brown', doctor: 'Dr. Lee', time: '4:00 PM', status: 'cancelled', type: 'Surgery' },
  ];

  const logs: LogEntry[] = [
    { id: '1', user: 'admin@clinic.com', action: 'User login', timestamp: '2024-01-15 09:30', ip: '192.168.1.1', status: 'success' },
    { id: '2', user: 'dr.smith@clinic.com', action: 'Patient record access', timestamp: '2024-01-15 10:15', ip: '192.168.1.5', status: 'success' },
    { id: '3', user: 'nurse@clinic.com', action: 'Failed login attempt', timestamp: '2024-01-15 11:00', ip: '192.168.1.10', status: 'failed' },
  ];

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Activity },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'branches', name: 'Branches & Clinics', icon: Building },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'logs', name: 'Access Logs', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'support', name: 'Support', icon: HelpCircle },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">1,248</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Clinics</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Building className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">84</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">System Health</p>
              <p className="text-2xl font-bold text-green-600">98.5%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full">
              <UserPlus className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New user registered</p>
              <p className="text-xs text-gray-500">Dr. Michael Brown joined as a cardiologist</p>
            </div>
            <span className="text-xs text-gray-400">2m ago</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Appointment completed</p>
              <p className="text-xs text-gray-500">Surgery procedure finished successfully</p>
            </div>
            <span className="text-xs text-gray-400">15m ago</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-orange-100 rounded-full">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">System maintenance</p>
              <p className="text-xs text-gray-500">Scheduled maintenance at 2:00 AM</p>
            </div>
            <span className="text-xs text-gray-400">1h ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div key={user.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{user.role}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Last login: {user.lastLogin}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBranches = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Branches & Clinics</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Branch</span>
        </button>
      </div>
      
      <div className="grid gap-4">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  branch.type === 'hospital' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <Building className={`h-5 w-5 ${
                    branch.type === 'hospital' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {branch.location}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                branch.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {branch.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
                  {branch.type}
                </span>
                <span className="text-sm text-gray-600">
                  {branch.staff} staff members
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Appointment Oversight</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Schedule</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-xs text-gray-500">Scheduled</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">18</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">3</p>
              <p className="text-xs text-gray-500">Cancelled</p>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-500">with {appointment.doctor}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{appointment.time}</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {appointment.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    appointment.status === 'scheduled' 
                      ? 'bg-blue-100 text-blue-700'
                      : appointment.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {appointment.status}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Access Logs</h2>
        <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">1,247</p>
              <p className="text-xs text-gray-500">Successful Logins</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">12</p>
              <p className="text-xs text-gray-500">Failed Attempts</p>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {logs.map((log) => (
            <div key={log.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-500">{log.user}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{log.timestamp}</span>
                    <span className="text-xs text-gray-500">IP: {log.ip}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  log.status === 'success' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Analytics & Reports</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Patient Growth</h3>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">+23.5%</p>
          <p className="text-sm text-green-600">vs last month</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Revenue</h3>
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">$47,580</p>
          <p className="text-sm text-blue-600">This month</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="font-medium text-gray-900 mb-4">Popular Services</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">General Consultation</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
              </div>
              <span className="text-sm text-gray-500">80%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Surgery</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-3/5"></div>
              </div>
              <span className="text-sm text-gray-500">60%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Emergency Care</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full w-2/5"></div>
              </div>
              <span className="text-sm text-gray-500">40%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-900 mb-3">General Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">System Maintenance Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-900 mb-3">Security Settings</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Password Policy</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Session Management</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Support & Help</h2>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid gap-3">
            <button className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <HelpCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Contact Support Team</span>
            </button>
            <button className="flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">View Documentation</span>
            </button>
            <button className="flex items-center space-x-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
              <Download className="h-5 w-5" />
              <span className="text-sm font-medium">Download User Manual</span>
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-900 mb-3">System Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Version:</span>
              <span className="text-gray-900">v2.1.4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Updated:</span>
              <span className="text-gray-900">Jan 15, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Server Status:</span>
              <span className="text-green-600">Online</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-900 mb-3">FAQ</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">How do I reset a user's password?</p>
              <p className="text-xs text-gray-500 mt-1">Navigate to User Management, select the user, and click "Reset Password".</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">How do I backup system data?</p>
              <p className="text-xs text-gray-500 mt-1">Go to Settings {'>'} Data Management {'>'} Create Backup.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'users': return renderUsers();
      case 'branches': return renderBranches();
      case 'appointments': return renderAppointments();
      case 'logs': return renderLogs();
      case 'analytics': return renderAnalytics();
      case 'settings': return renderSettings();
      case 'support': return renderSupport();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">MedAdmin</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <nav className="mt-4 px-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 capitalize">
                {activeSection === 'dashboard' ? 'Dashboard' : menuItems.find(item => item.id === activeSection)?.name}
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">AD</span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;