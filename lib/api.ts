// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Import auth functions (will be imported at runtime to avoid circular dependencies)
let userAuth: any;
let adminAuth: any;

// Lazy load auth to avoid circular dependencies
const getUserAuth = () => {
  if (typeof window === 'undefined') {
    return { getToken: () => '' };
  }
  if (!userAuth) {
    try {
      userAuth = require('./auth').userAuth;
    } catch (e) {
      return { getToken: () => '' };
    }
  }
  return userAuth || { getToken: () => '' };
};

const getAdminAuth = () => {
  if (!adminAuth) {
    adminAuth = require('./auth').adminAuth;
  }
  return adminAuth;
};

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  admin?: Admin;
  token?: string;
  error?: string;
}

// API Functions
export const api = {
  // User Authentication
  async registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Network error occurred',
      };
    }
  },

  async loginUser(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Network error occurred',
      };
    }
  },

  // Admin Authentication
  async registerAdmin(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Network error occurred',
      };
    }
  },

  async loginAdmin(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Network error occurred',
      };
    }
  },

  // Usage Stats
  async getUserUsageStats() {
    const auth = getUserAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/usage/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      // If unauthorized, try to refresh token or redirect to login
      if (response.status === 401) {
        // Clear invalid auth and redirect
        if (auth?.logout) {
          auth.logout();
        }
        throw new Error('Unauthorized. Please login again.');
      }
      throw new Error(data.message || 'Failed to fetch user usage stats');
    }
    // Handle both response formats
    if (data.success && data.stats) {
      return data.stats;
    }
    return data.data || data;
  },

  async getAdminUsageStats() {
    const auth = getAdminAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/usage/admin/all`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch admin usage stats');
    }
    return data.data || data;
  },
};

// Export individual functions for convenience
export const getUserUsageStats = () => api.getUserUsageStats();
export const getAdminUsageStats = () => api.getAdminUsageStats();
export const getAllUsersUsageStats = () => api.getAdminUsageStats(); // Alias for admin stats

  // Admin Users
  async getAllUsers() {
    const auth = getAdminAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/admin/users/all`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        if (auth?.logout) {
          auth.logout();
        }
        throw new Error('Unauthorized. Please login again.');
      }
      throw new Error(data.message || 'Failed to fetch users');
    }
    return data;
  },
};

export const getAllUsers = () => api.getAllUsers();

// PDF Tools API
export const pdfToolsApi = {
  async pdfToWord(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const auth = getUserAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/pdf/pdf-to-word`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to convert PDF to Word');
    return data;
  },


  async wordToPdf(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const auth = getUserAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/pdf/word-to-pdf`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to convert Word to PDF');
    return data;
  },

  async pdfToJpg(file: File, pageNumber?: number) {
    const formData = new FormData();
    formData.append('file', file);
    if (pageNumber) formData.append('pageNumber', pageNumber.toString());
    
    const auth = getUserAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/pdf/pdf-to-jpg`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to convert PDF to JPG');
    return data;
  },

  async getPdfMetadata(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const auth = getUserAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/pdf/metadata`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get PDF metadata');
    return data;
  },
};

// Image Tools API
export const imageToolsApi = {
  async resizeImage(file: File, width?: number, height?: number, maintainAspectRatio: boolean = true) {
    const formData = new FormData();
    formData.append('file', file);
    if (width) formData.append('width', width.toString());
    if (height) formData.append('height', height.toString());
    formData.append('maintainAspectRatio', maintainAspectRatio.toString());
    
    const auth = getUserAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/image/resize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to resize image');
    return data;
  },

  async cropImage(file: File, x: number, y: number, width: number, height: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('x', x.toString());
    formData.append('y', y.toString());
    formData.append('width', width.toString());
    formData.append('height', height.toString());
    
    const auth = getUserAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/image/crop`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to crop image');
    return data;
  },

  async jpgToWord(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const auth = getUserAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/image/jpg-to-word`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to convert JPG to Word');
    return data;
  },

  async imageTextConverter(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const auth = getUserAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/image/image-text-converter`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to extract text from image');
    return data;
  },

  async wordCounter(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const auth = getUserAuth();
    const token = auth?.getToken ? auth.getToken() : '';
    const response = await fetch(`${API_BASE_URL}/api/image/word-counter`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to count words');
    return data;
  },
};

