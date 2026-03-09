import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen w-full bg-slate-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  // While checking auth status, show loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // If user is authenticated, show the component
  if (user) {
    return children;
  }

  // If not authenticated, redirect to login
  return <Navigate to="/signup/login" replace />;
};

export default ProtectedRoute;
