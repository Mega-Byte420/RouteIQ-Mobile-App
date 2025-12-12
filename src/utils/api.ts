import axios from 'axios';
import {Platform} from 'react-native';
import {store} from '../store/store';
import {clearUserInfo} from '../store/user/userSlices';
import {isTokenExpired} from './jwt';

// Base URL - change this to your actual API URL
// For Android physical device: Use your computer's IP address (e.g., 'http://192.168.1.100:3000')
// For Android emulator: Use 'http://10.0.2.2:3000'
// For iOS simulator: Use 'http://localhost:3000'
// 
// IMPORTANT: Your computer's IP address for Android emulator/physical device
// This is more reliable than 10.0.2.2 in many cases
// Find your IP: Windows (ipconfig) | Mac/Linux (ifconfig)
const ANDROID_PHYSICAL_DEVICE_IP = '192.168.100.53'; // Your computer's IP address

const getBaseURL = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      // Use your computer's IP address (works for both emulator and physical device)
      // Alternative: Use 'http://10.0.2.2:3000' for Android emulator only
      return `http://${ANDROID_PHYSICAL_DEVICE_IP}:3000`;
    } else {
      // iOS simulator
      return 'http://localhost:3000';
    }
  }
  return 'https://your-production-api.com'; // Production
};

const BASE_URL = getBaseURL();

// Log the API URL being used (only in development)
if (__DEV__) {
  console.log('API Base URL:', BASE_URL);
  console.log('Platform:', Platform.OS);
}

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    // Log request details in development
    if (__DEV__) {
      console.log('🌐 API Request:', {
        method: config.method?.toUpperCase(),
        url: `${config.baseURL}${config.url}`,
        hasToken: !!config.headers.Authorization,
      });
    }
    
    // Get token from Redux store
    const state = store.getState();
    const token = state.userSlices.token;
    
    // Add token to Authorization header if available
    if (token) {
      // Check if token is expired before making the request
      if (isTokenExpired(token)) {
        // Token is expired, clear user info
        store.dispatch(clearUserInfo());
        return Promise.reject({
          message: 'Token expired. Please login again.',
          status: 401,
        });
      }
      
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log detailed error for debugging
    console.error('API Error Details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
      baseURL: BASE_URL,
      request: error.request ? 'Request made but no response' : 'No request made',
      platform: Platform.OS,
    });

    if (error.response) {
      // Handle 401 Unauthorized - token expired or invalid
      if (error.response.status === 401) {
        // Clear user info and token
        store.dispatch(clearUserInfo());
        return Promise.reject({
          message: 'Session expired. Please login again.',
          status: 401,
          data: error.response.data,
        });
      }
      
      // Server responded with error status
      return Promise.reject({
        message: error.response.data?.message || error.response.data?.error || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request made but no response - likely network issue or server not running
      let errorMessage = 'Network error. Please check your connection and try again.';
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        errorMessage = `Cannot connect to server at ${BASE_URL}.\n\nTroubleshooting:\n1. Make sure your backend server is running on port 3000\n2. For Android emulator, ensure server is accessible at 10.0.2.2:3000\n3. Check if firewall is blocking the connection`;
      } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
        errorMessage = `Request timed out while connecting to ${BASE_URL}.\n\nPlease check:\n1. Server is running and accessible\n2. Network connection is stable`;
      } else if (error.message === 'Network Error') {
        errorMessage = `Network Error: Cannot reach server at ${BASE_URL}.\n\nPossible causes:\n1. Backend server is not running\n2. Wrong IP address or port\n3. Firewall blocking connection\n4. Android emulator network issue\n\nTry:\n- Start your backend server\n- Verify server is accessible from your computer\n- For Android emulator, use: http://10.0.2.2:3000`;
      }
      
      return Promise.reject({
        message: errorMessage,
        status: 0,
        code: error.code || 'NETWORK_ERROR',
        originalError: error.message,
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0,
      });
    }
  }
);

// Test connection function
export const testConnection = async () => {
  try {
    console.log('Testing connection to:', BASE_URL);
    const response = await api.get('/health', { timeout: 5000 }).catch(() => null);
    if (response) {
      console.log('✅ Connection test successful');
      return true;
    }
    console.log('⚠️ Connection test failed - server might not have /health endpoint');
    return false;
  } catch (error: any) {
    console.log('❌ Connection test failed:', error.message);
    return false;
  }
};

// API endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    console.log('📤 Making login request to:', `${BASE_URL}/auth/login`);
    console.log('📤 Request payload:', { email, password: '***' });
    
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      
      // Log the response structure for debugging
      console.log('✅ Login API Response received');
      console.log('📥 Full axios response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        hasData: !!response.data,
        dataType: typeof response.data,
      });
      console.log('📥 Response data:', response.data);
      console.log('📥 Response data keys:', response.data ? Object.keys(response.data) : []);
      console.log('📥 Response data stringified:', JSON.stringify(response.data, null, 2));
      
      // Check for token in various locations
      const hasToken = !!(
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.access_token ||
        response.data?.data?.token ||
        typeof response.data === 'string'
      );
      console.log('🔑 Token check:', { hasToken });
      
      // Handle different response structures
      // API might return: { token: "..." } or { data: { token: "..." } } or just the token string
      return response.data;
    } catch (error: any) {
      console.error('❌ Login request failed:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        responseData: error.response?.data,
      });
      throw error;
    }
  },
};

// Parent APIs
export const parentAPI = {
  /**
   * Fetch students for the current parent.
   * The backend can derive the parent from the JWT; we also send parentId for clarity.
   */
  getStudentsByParentId: async (parentId?: number | string) => {
    try {
      const response = await api.get('/parent/studentsByParentsId', {
        params: parentId ? { parentId } : undefined,
      });
      return response.data;
    } catch (error) {
      console.error('❌ Fetch students by parent failed:', {
        message: (error as any)?.message,
        status: (error as any)?.response?.status,
        data: (error as any)?.response?.data,
      });
      throw error;
    }
  },
};

export default api;

