import React, { useState } from 'react';
import { Heart, Leaf } from 'lucide-react';
import RoleSelector from './RoleSelector';
import LoginForm from './LoginForm';
import { LoginFormData, LoginResponse } from '../types/auth';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    role: 'ADMIN',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  // Mock login function - replace with actual authentication logic
  const handleLogin = async (loginData: LoginFormData): Promise<LoginResponse> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation - replace with real authentication
    if (loginData.email === 'admin@hospital.com' && loginData.password === 'admin123' && loginData.role === 'ADMIN') {
      return {
        success: true,
        user: {
          id: '1',
          email: loginData.email,
          role: loginData.role,
          name: 'Admin User'
        }
      };
    } else if (loginData.email === 'doctor@hospital.com' && loginData.password === 'doctor123' && loginData.role === 'DOCTOR') {
      return {
        success: true,
        user: {
          id: '2',
          email: loginData.email,
          role: loginData.role,
          name: 'Dr. Smith'
        }
      };
    }
    
    return {
      success: false,
      message: 'Invalid credentials. Please check your email, password, and selected role.'
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginMessage('');

    try {
      const response = await handleLogin(formData);
      
      if (response.success) {
        setLoginMessage(`Welcome ${response.user?.name}! Redirecting to ${formData.role.toLowerCase()} dashboard...`);
        // Here you would typically redirect to the main app or store the user session
        console.log('Login successful:', response.user);
      } else {
        setLoginMessage(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoginMessage('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Medical Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-600/20 z-10"></div>
        <img 
          src="/doc.jpg" 
          alt="Medical stethoscope with green leaves representing natural healthcare" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8">
            <div className="flex items-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full mr-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Natural Healthcare</h2>
            </div>
            <p className="text-lg text-white/90 leading-relaxed">
              Combining modern medical expertise with natural wellness approaches for comprehensive patient care.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-4 rounded-2xl shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h1>
            <p className="text-gray-600 text-lg">Please sign in to your healthcare portal</p>
          </div>



          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 backdrop-blur-sm">
            <RoleSelector
              selectedRole={formData.role}
              onRoleChange={(role) => setFormData({ ...formData, role })}
            />
            
            <LoginForm
              email={formData.email}
              password={formData.password}
              rememberMe={formData.rememberMe}
              isLoading={isLoading}
              onEmailChange={(email) => setFormData({ ...formData, email })}
              onPasswordChange={(password) => setFormData({ ...formData, password })}
              onRememberMeChange={(rememberMe) => setFormData({ ...formData, rememberMe })}
              onSubmit={handleSubmit}
            />

            {loginMessage && (
              <div className={`
                mt-4 p-4 rounded-xl text-sm font-medium
                ${loginMessage.includes('Welcome') 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
                }
              `}>
                {loginMessage}
              </div>
            )}
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
              Demo Credentials
            </h4>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="font-medium">Admin:</span>
                <span className="text-xs font-mono">admin@hospital.com / admin123</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="font-medium">Doctor:</span>
                <span className="text-xs font-mono">doctor@hospital.com / doctor123</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© 2025 Healthcare System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;