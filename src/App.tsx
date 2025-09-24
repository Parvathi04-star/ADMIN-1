import React, { useState, useEffect, useRef } from 'react';
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
  Upload,
  Building
} from 'lucide-react';

declare const L: any;

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

interface Enrollment {
  id: string;
  hospitalName: string;
  facilityType: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  lat: number | null;
  lng: number | null;
  contactEmail: string;
  contactPhone: string;
  registrationNumber: string;
  documents: { name: string; size: number }[];
  createdAt: string;
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Enrollment state
  const [enrollmentForm, setEnrollmentForm] = useState({
    hospitalName: '',
    facilityType: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    lat: '',
    lng: '',
    contactEmail: '',
    contactPhone: '',
    registrationNumber: '',
    documents: [] as File[],
  });
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [enrollSuccess, setEnrollSuccess] = useState<string | null>(null);
  const [docTab, setDocTab] = useState<'list' | 'preview'>('list');
  const [branchSearch, setBranchSearch] = useState('');
  const [branchFilterType, setBranchFilterType] = useState('');
  const [branchFilterState, setBranchFilterState] = useState('');
  const [branchFilterCity, setBranchFilterCity] = useState('');
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const geocodeTimeout = useRef<any>(null);

  const osmUrl = (lat: number, lng: number, zoom = 15) => {
    const delta = 0.02;
    const left = lng - delta;
    const right = lng + delta;
    const top = lat + delta;
    const bottom = lat - delta;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lng}`;
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `${Date.now()}`;
    const latNum = parseFloat(enrollmentForm.lat);
    const lngNum = parseFloat(enrollmentForm.lng);
    const newEnrollment: Enrollment = {
      id,
      hospitalName: enrollmentForm.hospitalName.trim(),
      facilityType: enrollmentForm.facilityType,
      address: {
        street: enrollmentForm.street,
        city: enrollmentForm.city,
        state: enrollmentForm.state,
        zip: enrollmentForm.zip,
        country: enrollmentForm.country,
      },
      lat: !isNaN(latNum) ? latNum : null,
      lng: !isNaN(lngNum) ? lngNum : null,
      contactEmail: enrollmentForm.contactEmail,
      contactPhone: enrollmentForm.contactPhone,
      registrationNumber: enrollmentForm.registrationNumber,
      documents: (enrollmentForm.documents || []).map(f => ({ name: f.name, size: f.size })),
      createdAt: new Date().toISOString(),
    };
    setEnrollments(prev => [newEnrollment, ...prev]);
    setEnrollSuccess('Hospital enrolled successfully');
    setEnrollmentForm({
      hospitalName: '',
      facilityType: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      lat: '',
      lng: '',
      contactEmail: '',
      contactPhone: '',
      registrationNumber: '',
      documents: [],
    });
    setTimeout(() => setEnrollSuccess(null), 3000);
  };

  // Initialize Leaflet map when enrollment section is active
  useEffect(() => {
    if (activeSection !== 'enrollment') return;

    if (!mapRef.current) {
      const map = L.map('leaflet-map', {
        center: [20, 0],
        zoom: 2,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Initialize a real marker at the current center
      markerRef.current = L.marker(map.getCenter(), { interactive: false, opacity: 1 }).addTo(map);

      map.on('movestart', () => {
        setIsDragging(true);
        if (markerRef.current) markerRef.current.setOpacity(0);
      });
      map.on('moveend', () => {
        setIsDragging(false);
        const c = map.getCenter();
        if (markerRef.current) {
          markerRef.current.setLatLng(c).setOpacity(1);
        }
        setEnrollmentForm(prev => ({
          ...prev,
          lat: String(Number(c.lat).toFixed(6)),
          lng: String(Number(c.lng).toFixed(6)),
        }));
      });

      mapRef.current = map;
    }

    // ensure correct sizing on entry or tab change
    setTimeout(() => mapRef.current.invalidateSize?.(), 100);
  }, [activeSection]);

  // Keep map centered on field changes if different
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const latNum = parseFloat(enrollmentForm.lat);
    const lngNum = parseFloat(enrollmentForm.lng);
    if (isNaN(latNum) || isNaN(lngNum)) return;
    const c = map.getCenter();
    const diff = Math.abs(c.lat - latNum) + Math.abs(c.lng - lngNum);
    if (diff > 0.0001) {
      map.setView([latNum, lngNum], Math.max(map.getZoom(), 15));
    }
    if (markerRef.current && !isNaN(latNum) && !isNaN(lngNum)) {
      markerRef.current.setLatLng([latNum, lngNum]).setOpacity(1);
    }
  }, [enrollmentForm.lat, enrollmentForm.lng]);

  // Geocode address to coordinates and center the map
  useEffect(() => {
    const parts = [
      enrollmentForm.street,
      enrollmentForm.city,
      enrollmentForm.state,
      enrollmentForm.zip,
      enrollmentForm.country,
    ]
      .map((s) => s?.trim())
      .filter(Boolean);

    if (geocodeTimeout.current) clearTimeout(geocodeTimeout.current);
    if (parts.length < 2) return; // need at least city + country (or similar)

    geocodeTimeout.current = setTimeout(async () => {
      try {
        const q = parts.join(', ');
        const resp = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`,
          { headers: { Accept: 'application/json' } }
        );
        const data = await resp.json();
        if (Array.isArray(data) && data.length > 0) {
          const { lat, lon } = data[0];
          setEnrollmentForm((prev) => ({ ...prev, lat: String(lat), lng: String(lon) }));
        }
      } catch (e) {
        // silent fail
      }
    }, 700);

    return () => clearTimeout(geocodeTimeout.current);
  }, [
    enrollmentForm.street,
    enrollmentForm.city,
    enrollmentForm.state,
    enrollmentForm.zip,
    enrollmentForm.country,
  ]);

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
    { id: 'enrollment', name: 'Hospital Enrollment', icon: MapPin },
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

  const renderBranches = () => {
    // Build filter options from existing branches and enrollments
    const typeOptions = Array.from(new Set([
      ...branches.map(b => (b.type === 'hospital' ? 'General Hospital' : 'Clinic')),
      ...enrollments.map(e => e.facilityType).filter(Boolean),
    ])).sort();

    // For states and cities, use data from enrollments where we have structured addresses
    const stateOptions = Array.from(new Set(
      enrollments.map(e => e.address.state).filter(Boolean)
    )).sort();
    const cityOptions = Array.from(new Set(
      enrollments.map(e => e.address.city).filter(Boolean)
    )).sort();

    // Normalize data into a common list for filtering
    const items = [
      ...branches.map((b) => ({
        id: `branch-${b.id}`,
        name: b.name,
        facilityType: b.type === 'hospital' ? 'General Hospital' : 'Clinic',
        city: (b.location.split(',')[0] || '').trim(),
        state: (b.location.split(',')[1] || '').trim(),
        addressText: b.location,
        staff: b.staff,
        status: b.status,
      })),
      ...enrollments.map((e) => ({
        id: `enroll-${e.id}`,
        name: e.hospitalName,
        facilityType: e.facilityType || 'Hospital',
        city: e.address.city || '',
        state: e.address.state || '',
        addressText: [e.address.street, e.address.city, e.address.state, e.address.zip, e.address.country].filter(Boolean).join(', '),
        staff: undefined,
        status: 'active' as const,
      })),
    ];

    const filtered = items.filter((it) => {
      const matchesSearch = branchSearch
        ? it.name.toLowerCase().includes(branchSearch.toLowerCase())
        : true;
      const matchesType = branchFilterType
        ? (it.facilityType || '').toLowerCase() === branchFilterType.toLowerCase()
        : true;
      const matchesState = branchFilterState
        ? (it.state || '').toLowerCase() === branchFilterState.toLowerCase()
        : true;
      const matchesCity = branchFilterCity
        ? (it.city || '').toLowerCase() === branchFilterCity.toLowerCase()
        : true;
      return matchesSearch && matchesType && matchesState && matchesCity;
    });

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Branches & Clinics</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={branchFilterType}
                onChange={(e) => setBranchFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {typeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
              <select
                value={branchFilterState}
                onChange={(e) => setBranchFilterState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All States</option>
                {stateOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                value={branchFilterCity}
                onChange={(e) => setBranchFilterCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Cities</option>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    item.facilityType.toLowerCase().includes('hospital') ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <Building className={`h-5 w-5 ${
                      item.facilityType.toLowerCase().includes('hospital') ? 'text-red-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {item.addressText}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {item.facilityType}
                  </span>
                  {typeof item.staff === 'number' && (
                    <span className="text-sm text-gray-600">
                      {item.staff} staff members
                    </span>
                  )}
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
          {filtered.length === 0 && (
            <div className="p-4 text-sm text-gray-500 bg-white rounded-lg border">
              No results match current filters.
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEnrollment = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Hospital Enrollment</h2>
      </div>

      {enrollSuccess && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm">{enrollSuccess}</span>
        </div>
      )}

      <form id="enrollment-form" onSubmit={handleEnrollSubmit} className="bg-white rounded-lg shadow-sm border p-4 space-y-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Hospital Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Hospital Name</label>
              <input
                type="text"
                value={enrollmentForm.hospitalName}
                onChange={(e) => setEnrollmentForm(prev => ({ ...prev, hospitalName: e.target.value }))}
                placeholder="e.g., City General Hospital"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Type of Facility</label>
              <select
                value={enrollmentForm.facilityType}
                onChange={(e) => setEnrollmentForm(prev => ({ ...prev, facilityType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="" disabled>Select type</option>
                <option value="Clinic">Clinic</option>
                <option value="General Hospital">General Hospital</option>
                <option value="Specialty">Specialty</option>
                <option value="Research Center">Research Center</option>
                <option value="Diagnostic Center">Diagnostic Center</option>
                <option value="Urgent Care">Urgent Care</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                value={enrollmentForm.street}
                onChange={(e) => setEnrollmentForm(prev => ({ ...prev, street: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={enrollmentForm.city}
                onChange={(e) => setEnrollmentForm(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">State/Province</label>
              <input
                type="text"
                value={enrollmentForm.state}
                onChange={(e) => setEnrollmentForm(prev => ({ ...prev, state: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Zip/Postal Code</label>
              <input
                type="text"
                value={enrollmentForm.zip}
                onChange={(e) => setEnrollmentForm(prev => ({ ...prev, zip: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={enrollmentForm.country}
                onChange={(e) => setEnrollmentForm(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Map Location</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={enrollmentForm.lat}
                    onChange={(e) => setEnrollmentForm(prev => ({ ...prev, lat: e.target.value }))}
                    placeholder="e.g., 40.7128"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={enrollmentForm.lng}
                    onChange={(e) => setEnrollmentForm(prev => ({ ...prev, lng: e.target.value }))}
                    placeholder="e.g., -74.0060"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">Enter coordinates or leave blank if unknown.</p>
            </div>
            <div className="w-full">
              <div className="relative">
                <div id="leaflet-map" className="w-full h-64 border border-gray-200 rounded-lg overflow-hidden"></div>
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full drop-shadow">
                  <MapPin className={`h-8 w-8 text-red-600 ${isDragging ? 'animate-bounce' : ''}`} />
                  <div className="h-2 w-2 bg-red-600/70 rounded-full mx-auto -mt-1"></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Drag the map to set the exact location. Coordinates update automatically.</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Contacts & Registration</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={enrollmentForm.contactEmail}
                onChange={(e) => setEnrollmentForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="name@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Contact Phone Number</label>
              <input
                type="text"
                value={enrollmentForm.contactPhone}
                onChange={(e) => setEnrollmentForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="e.g., +1 555-123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Registration/License Number</label>
              <input
                type="text"
                value={enrollmentForm.registrationNumber}
                onChange={(e) => setEnrollmentForm(prev => ({ ...prev, registrationNumber: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Upload Facility Documents</h3>
          <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">Upload licenses, certifications, etc.</p>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB each</p>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={(e) => setEnrollmentForm(prev => ({ ...prev, documents: Array.from(e.target.files || []) }))}
              />
              <span className="text-sm text-blue-600">Browse</span>
            </label>

            {enrollmentForm.documents && enrollmentForm.documents.length > 0 && (
              <div className="mt-4">
                <div className="flex text-sm border-b">
                  <button
                    type="button"
                    onClick={() => setDocTab('list')}
                    className={`px-3 py-2 -mb-px border-b-2 ${docTab === 'list' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    List
                  </button>
                  <button
                    type="button"
                    onClick={() => setDocTab('preview')}
                    className={`px-3 py-2 -mb-px border-b-2 ${docTab === 'preview' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Preview
                  </button>
                </div>

                {docTab === 'list' ? (
                  <div className="mt-3 text-xs text-gray-600">
                    {enrollmentForm.documents.map((f, idx) => (
                      <div key={idx} className="flex justify-between py-1">
                        <span className="truncate mr-2">{f.name}</span>
                        <span className="text-gray-400">{Math.round(f.size / 1024)} KB</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {enrollmentForm.documents.map((f, idx) => {
                      const url = URL.createObjectURL(f);
                      const isImage = f.type.startsWith('image/');
                      const isPdf = f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf');
                      return (
                        <div key={idx} className="bg-white border rounded-lg p-2 shadow-sm">
                          <div className="text-xs text-gray-700 truncate mb-2">{f.name}</div>
                          {isImage ? (
                            <img src={url} alt={f.name} className="w-full h-40 object-contain rounded" />
                          ) : isPdf ? (
                            <object data={url} type="application/pdf" className="w-full h-40 rounded">
                              <p className="text-xs text-gray-500 p-2">PDF preview not supported in this browser.</p>
                            </object>
                          ) : (
                            <div className="h-40 flex items-center justify-center text-xs text-gray-500 bg-gray-100 rounded">
                              No preview available
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">Enroll Hospital</span>
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Registry</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {enrollments.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No hospitals enrolled yet.</div>
          ) : (
            enrollments.map((h) => (
              <div key={h.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{h.hospitalName}</p>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{h.address.street}, {h.address.city}, {h.address.state} {h.address.zip}, {h.address.country}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{h.facilityType}</span>
                        {h.registrationNumber && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Reg: {h.registrationNumber}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{h.contactEmail || '—'}</div>
                    <div className="text-sm text-gray-600">{h.contactPhone || '—'}</div>
                    {h.lat !== null && h.lng !== null && (
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${h.lat}&mlon=${h.lng}#map=15/${h.lat}/${h.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View on map
                      </a>
                    )}
                  </div>
                </div>
                {h.documents && h.documents.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="font-medium text-gray-700">Documents:</span>{' '}
                    {h.documents.map((d, i) => (
                      <span key={i} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full mr-2 mt-1">
                        {d.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
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
      case 'enrollment': return renderEnrollment();
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
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}>
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
      <div className="flex-1 lg:ml-64 flex flex-col h-screen">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-30">
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
        <main className="flex-1 overflow-y-auto p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;