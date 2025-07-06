// src/utils/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const isGuest = localStorage.getItem("guest") === "true";

  // console.log("🚦 PrivateRoute → token:", token, "guest:", isGuest);

  if (token || isGuest) {
    return children;
  }

  return <Navigate to="/login" replace />;
}
