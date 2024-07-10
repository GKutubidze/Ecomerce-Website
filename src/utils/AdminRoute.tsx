import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Update path based on your structure

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    // Handle loading state, maybe show a loading indicator
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user || !user.isAdmin) {
    // Redirect if not authenticated or not an admin
    return <Navigate to="/my-account" />;
  }

  return <>{children}</>; // Render the protected content if authenticated as admin
};

export default AdminRoute;
