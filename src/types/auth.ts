// Authentication types based on API spec

export interface LoginRequest { 
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      name: string;
      email: string;
      role: 'admin' | 'customer';
    };
    token: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}
