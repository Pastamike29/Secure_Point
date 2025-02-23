import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  login: (userRole: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [logoutTimeout, setLogoutTimeout] = useState<NodeJS.Timeout | null>(null);

  // ✅ Runs on page load - Ensures timeout starts if the user is logged in
  useEffect(() => {
    const storedRole = sessionStorage.getItem('userRole');
    const storedToken = document.cookie.split('; ').find(row => row.startsWith('token='));

    if (storedRole && storedToken) {
      setIsAuthenticated(true);
      setRole(storedRole);
      startAutoLogout();
    }

  }, []);

  const startAutoLogout = useCallback(() => {
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }

    const timeout = setTimeout(() => {
      logout();
    }, 300000); // 5 minutes (300,000 ms)

    setLogoutTimeout(timeout);
  }, [logoutTimeout]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setRole(null);

    localStorage.removeItem('userRole'); // 🔹 Remove role on logout
    localStorage.removeItem('token'); // 🔹 Ensure token is also cleared
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // ❌ Expire token

    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
      setLogoutTimeout(null);
    }
    console.log("User has been logged out.");
  }, [logoutTimeout]);

  const login = (userRole: string) => {
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('userRole', userRole);

    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }

    // Auto-logout after 1 hour
    const timeout = setTimeout(() => {
      logout();
    }, 300000);

    setLogoutTimeout(timeout);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
