


// src/context/AuthContext.js - FINAL SIMPLIFIED VERSION
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- VITAL: The refresh logic is REMOVED from here and placed entirely in api.js ---

  const checkUserStatus = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        // This request will either succeed OR be transparently handled by the api.js interceptor:
        // 1. If token is good: Succeeds.
        // 2. If token is expired: Interceptor refreshes it and retries, THEN succeeds.
        // 3. If refresh fails: Interceptor clears tokens and redirects to /login.
        const res = await api.get('/accounts/profile/');
        setUser(res.data);
      } catch (error) {
        // Any remaining error (e.g., 404, 500, or a final 401 after retry/redirect) means we clear state locally.
        if (error.response?.status !== 401) {
            // Only log out if the error is non-authentication (as 401 is handled by redirect)
            // But usually, we just ensure the user state is clear.
            setUser(null); 
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const login = async (phone_number, password) => {
    try {
      // Standard login: returns tokens, which the interceptor will use immediately.
      const res = await api.post('/accounts/login/', { phone_number, password });
      const { access, refresh } = res.data;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Check status to immediately populate the user object (using the newly set tokens)
      await checkUserStatus(); 
      toast.success('Login successful!');
      return true;
    } catch (error) {
      const errorDetail = error.response?.data?.detail || 'Login failed. Check phone or password.';
      toast.error(errorDetail);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    toast.info('Logged out.');
  };

  const contextData = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    fetchProfileData: checkUserStatus, // Expose helper for components like Seller Registration
  };

  return (
    <AuthContext.Provider value={contextData}>
      {/* Only render children when status check is complete to prevent flashing content */}
      {!loading && children} 
    </AuthContext.Provider>
  );
};