export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'DOCTOR';
  name?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  role: 'ADMIN' | 'DOCTOR';
  rememberMe: boolean;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
}