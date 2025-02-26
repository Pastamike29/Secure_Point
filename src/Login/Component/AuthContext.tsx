import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // ✅ Manages client-side cookies

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  login: (userRole: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);

  // ✅ Check if user is authenticated on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/check', { withCredentials: true });

        if (response.data.authenticated) {
          setIsAuthenticated(true);
          setRole(response.data.role);
        } else {
          logout(); // Auto-logout if not authenticated
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        logout();
      }
    };
    checkAuth();
  }, []);

  // ✅ Login Function (Sets Secure Cookie)
  const login = async (userRole: string, token: string) => {
    try {
      await axios.post(
        'http://localhost:5000/auth/login',
        {},
        {
          withCredentials: true, // ✅ Ensures token is stored in a **Secure HTTP-Only Cookie**
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsAuthenticated(true);
      setRole(userRole);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // ✅ Logout Function (Clears Cookie)
  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });

      setIsAuthenticated(false);
      setRole(null);

      Cookies.remove('token'); // Removes any remaining client-side token (if any)
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook for Authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
