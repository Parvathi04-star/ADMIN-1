import React, { useState } from 'react';
import { Heart, Stethoscope, ShieldCheck, ArrowLeft, User, Mail, Phone, MapPin, Calendar, GraduationCap, Award } from 'lucide-react';

type Page = 'landing' | 'login' | 'register-doctor' | 'register-admin';
type UserRole = 'doctor' | 'admin' | null;

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  specialization?: string;
  experience?: string;
  license?: string;
  department?: string;
  qualification?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    specialization: '',
    experience: '',
    license: '',
    department: '',
    qualification: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { role: selectedRole, email: formData.email });
    alert(`Login successful as ${selectedRole}`);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration:', { role: selectedRole, formData });
    alert(`Registration successful as ${selectedRole}`);
    setCurrentPage('login');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      specialization: '',
      experience: '',
      license: '',
      department: '',
      qualification: ''
    });
  };

  const navigateToLogin = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentPage('login');
    resetForm();
  };

  const navigateToRegister = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentPage(role === 'doctor' ? 'register-doctor' : 'register-admin');
    resetForm();
  };

  const goBack = () => {
    if (currentPage === 'login' || currentPage === 'register-doctor' || currentPage === 'register-admin') {
      setCurrentPage('landing');
      setSelectedRole(null);
    }
  };

  const LandingPage = () => (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: 'url(/image.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/90"></div>
      
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-emerald-600 p-3 rounded-full mr-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Ayur Med
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Integrative Healthcare Management System - Where traditional Ayurveda meets modern medicine for holistic healing
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
            {/* Doctor Card */}
            <div 
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100"
            style={{
              backgroundImage: 'url(/img1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            >
            <div className="text-center mb-8">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Doctor Portal</h3>
              <p className="text-gray-600 mb-8">
              Access patient records, manage appointments, prescribe treatments, and monitor healthcare outcomes
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => navigateToLogin('doctor')}
                className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-200 transform hover:scale-105"
              >
                Doctor Login
              </button>
              <button
                onClick={() => navigateToRegister('doctor')}
                className="w-full border-2 border-emerald-600 text-emerald-600 py-4 px-6 rounded-xl font-semibold hover:bg-emerald-50 transition-colors duration-200"
              >
                Register as Doctor
              </button>
            </div>
          </div>

          {/* Admin Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100"
           style={{
              backgroundImage: 'url(/img2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}>
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Admin Portal</h3>
              <p className="text-gray-600 mb-8">
                Manage hospital operations, oversee staff, handle system administration and maintain healthcare records
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => navigateToLogin('admin')}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
              >
                Admin Login
              </button>
              <button
                onClick={() => navigateToRegister('admin')}
                className="w-full border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                Register as Admin
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10">
          <div className="text-center p-6">
            <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-amber-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Holistic Care</h4>
            <p className="text-sm text-gray-600">Integrating Ayurvedic principles with modern healthcare</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-6 w-6 text-teal-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Secure Platform</h4>
            <p className="text-sm text-gray-600">HIPAA-compliant with advanced security measures</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Professional Tools</h4>
            <p className="text-sm text-gray-600">Comprehensive suite for healthcare management</p>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => {
    const roleColor = selectedRole === 'doctor' ? 'emerald' : 'blue';
    const roleIcon = selectedRole === 'doctor' ? Stethoscope : ShieldCheck;
    const RoleIcon = roleIcon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <button
            onClick={goBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Portal Selection
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <div className={`bg-${roleColor}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <RoleIcon className={`h-8 w-8 text-${roleColor}-600`} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedRole === 'doctor' ? 'Doctor Login' : 'Admin Login'}
              </h2>
              <p className="text-gray-600">
                Sign in to access your {selectedRole === 'doctor' ? 'medical' : 'administrative'} dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    placeholder="doctor@ayurcare.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-emerald-600 rounded" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className={`w-full bg-${roleColor}-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-${roleColor}-700 transition-colors duration-200 transform hover:scale-105`}
              >
                Sign In as {selectedRole === 'doctor' ? 'Doctor' : 'Admin'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => navigateToRegister(selectedRole)}
                  className={`text-${roleColor}-600 hover:text-${roleColor}-700 font-medium`}
                >
                  Register here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DoctorRegistrationPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={goBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Portal Selection
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
          <div className="text-center mb-8">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor Registration</h2>
            <p className="text-gray-600">Join our healthcare network and start making a difference</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Dr. John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="doctor@email.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical License Number
                </label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="license"
                    required
                    value={formData.license}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="MD123456789"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <select
                  name="specialization"
                  required
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select Specialization</option>
                  <option value="ayurveda">Ayurveda</option>
                  <option value="general">General Medicine</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="psychiatry">Psychiatry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="experience"
                    required
                    min="0"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="5"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualification
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="qualification"
                  required
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="MBBS, MD, BAMS"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  placeholder="Hospital/Clinic address"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Create password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" required className="h-4 w-4 text-emerald-600 rounded" />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-700">Terms of Service</a> and <a href="#" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 transform hover:scale-105"
            >
              Register as Doctor
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigateToLogin('doctor')}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminRegistrationPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={goBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Portal Selection
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Registration</h2>
            <p className="text-gray-600">Join our administrative team and help manage healthcare operations</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="admin@email.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Department</option>
                  <option value="it">IT & Technology</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance & Billing</option>
                  <option value="operations">Operations</option>
                  <option value="quality">Quality Assurance</option>
                  <option value="records">Medical Records</option>
                  <option value="facilities">Facilities Management</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="experience"
                    required
                    min="0"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualification
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="qualification"
                    required
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MBA, MHA, Bachelor's Degree"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Hospital/Organization address"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" required className="h-4 w-4 text-blue-600 rounded" />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
            >
              Register as Admin
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigateToLogin('admin')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render current page
  switch (currentPage) {
    case 'landing':
      return <LandingPage />;
    case 'login':
      return <LoginPage />;
    case 'register-doctor':
      return <DoctorRegistrationPage />;
    case 'register-admin':
      return <AdminRegistrationPage />;
    default:
      return <LandingPage />;
  }
}

export default App;