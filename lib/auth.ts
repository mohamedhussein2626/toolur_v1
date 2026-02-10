// Authentication utilities for token management

const USER_TOKEN_KEY = 'auth-token';
const ADMIN_TOKEN_KEY = 'admin-auth-token';
const USER_DATA_KEY = 'user-data';
const ADMIN_DATA_KEY = 'admin-data';

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

// User Token Management
export const userAuth = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_TOKEN_KEY, token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(USER_TOKEN_KEY);
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
    }
  },

  setUserData: (user: UserData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    }
  },

  getUserData: (): UserData | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return userAuth.getToken() !== null;
  },
};

// Admin Token Management
export const adminAuth = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_TOKEN_KEY, token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ADMIN_TOKEN_KEY);
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_DATA_KEY);
    }
  },

  setAdminData: (admin: AdminData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(admin));
    }
  },

  getAdminData: (): AdminData | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(ADMIN_DATA_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return adminAuth.getToken() !== null;
  },
};

// Clear all auth data
export const clearAllAuth = () => {
  userAuth.removeToken();
  adminAuth.removeToken();
};

