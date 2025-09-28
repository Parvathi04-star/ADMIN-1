import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import apiClient from '../api'; // Import the API client

interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onRememberMeChange: (remember: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  rememberMe,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      try {
        const response = await apiClient.post('/auth/login', { email, password });
        console.log(response.data); // Handle successful login
      } catch (error) {
        console.error('Login failed:', error); // Handle login error
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... rest of your form ... */}
    </form>
  );
};

export default LoginForm;