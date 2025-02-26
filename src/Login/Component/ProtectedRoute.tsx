import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

// ✅ ProtectedRoute for general logged-in users
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = Cookies.get('auth_token');

  if (!token) {
    return <Navigate to="/LoginPage" />;
  }

  return <>{children}</>;
};

// ✅ GuestRoute for unauthenticated users only
export const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/check', { withCredentials: true });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserRole(Cookies.get('user_role'));
        }
      } catch (error) {
        console.error("Authentication check failed", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={userRole === 'admin' ? '/admin/UserManagement' : '/'} replace />;
  }

  return <>{children}</>;
};


// ✅ ProtectedAdminRoute for admin users only
export const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/check', { withCredentials: true });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserRole(Cookies.get('user_role')); // Get from non-HttpOnly cookie
        }
      } catch (error) {
        console.error("Authentication check failed", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Prevents premature redirection
  }

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/LoginPage" replace />;
  }

  return <>{children}</>;
};