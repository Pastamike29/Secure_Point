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
  const storedUser = sessionStorage.getItem('user'); // ✅ Ensure it checks storage

  if (isAuthenticated || storedUser) {
    return <Navigate to={role === 'admin' ? '/admin/UserManagement' : '/'} replace />;
  }

  return <>{children}</>;
};


// ProtectedAdminRoute for admin users only
export const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/LoginPage" replace />;  // Redirect to login if not authenticated
  }

  if (role !== 'admin') {
    return <Navigate to="/404" replace />;  // Redirect non-admins to 404
  }


  return <>{children}</>; // ✅ Render children if user is an admin

};