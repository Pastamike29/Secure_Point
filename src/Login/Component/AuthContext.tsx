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

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole'); // 🔹 Load stored role
    if (storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }
  }, []);


  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('userRole'); // 🔹 Remove role on logout
    localStorage.removeItem('token'); // 🔹 Ensure token is also cleared

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

    // Redirect based on role
    if (userRole === 'admin') {
      window.location.href = '/admin/UserManagement';  // 🔹 Admins go to /admin
    } else {
      window.location.href = '/LoginPage'; // 🔹 Normal users go to /LoginPage
    }

    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }

    // Auto-logout after 1 hour
    const timeout = setTimeout(() => {
      logout();
    }, 3600000);

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
