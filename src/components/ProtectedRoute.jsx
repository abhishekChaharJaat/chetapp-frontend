import React from "react";
import { Navigate } from "react-router-dom";
import Home from "./Home";

const ProtectedRoute = ({ element }) => {
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    return <Navigate to="/" />;
  }
  return <Home />;
};

export default ProtectedRoute;
