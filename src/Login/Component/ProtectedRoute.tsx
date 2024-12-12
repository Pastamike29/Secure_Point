import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// This function checks if the user is logged in by checking localStorage
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!sessionStorage.getItem('user'); // Check if user data is stored in localStorage

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/LoginPage" />;
  }

  // If logged in, render the requested page (children)
  return children;
};


const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, role } = useAuth();

  // Check if user is not authenticated or not an admin
  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
