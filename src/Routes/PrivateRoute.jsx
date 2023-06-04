import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/authContext";
import GlobalSpinner from "../pages/shared/GlobalSpinner";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <GlobalSpinner />;
  }

  if (currentUser) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default PrivateRoute;
