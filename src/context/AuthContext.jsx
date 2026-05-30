import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    
    if (token && role) {
      // In a real app, verify the token. 
      // Here we just restore from local storage for the demo.
      setUser({ token, role, name: name || 'User' });
    }
    setLoading(false);
  }, []);

  const login = async (role, id, password) => {
    try {
      // Typically this goes to backend: await api.post('/auth/login', { role, id, password })
      // For demo, we simulate
      const mockToken = "mock-jwt-token";
      const userObj = { token: mockToken, role, name: id };
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('role', role);
      localStorage.setItem('name', id);
      
      setUser(userObj);
      navigate(`/${role}/dashboard`);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
