import axios from 'axios';

// Base URL - change this to your actual API URL
// For Android physical device: Use your computer's IP address (e.g., 'http://192.168.1.100:3000')
// For Android emulator: Use 'http://10.0.2.2:3000'
// For iOS simulator: Use 'http://localhost:3000'
const BASE_URL = __DEV__ 
  ? 'http://localhost:3000' // Development - Update this to your computer's IP for Android device
  : 'https://your-production-api.com'; // Production

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
    // Token will be added from Redux store if needed
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
    if (error.response) {
      // Server responded with error status
      return Promise.reject({
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
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

// API endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
};

export default api;

