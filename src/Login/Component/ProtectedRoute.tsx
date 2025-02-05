import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// ProtectedRoute for general logged-in users
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = !!sessionStorage.getItem('user'); // Check sessionStorage for user data

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/LoginPage" />;
  }

  // If logged in, render the requested page (children)
  return <>{children}</>;
};

// GuestRoute for unauthenticated users only
export const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  console.log('GuestRoute - isAuthenticated:', isAuthenticated, 'role:', role); // Debugging

  if (isAuthenticated) {
    // Redirect to respective home page based on role
    return <Navigate to={role === 'admin' ? '/admin/Usermanagement' : '/'} replace />;
  }

  return <>{children}</>;
};

// ProtectedAdminRoute for admin users only
export const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/404" replace />;  // Redirect to your custom 404 page or login page
  }


  return <>{children}</>;
};
