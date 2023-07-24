import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();

  return auth.user ? <Navigate to="/" /> : children;
}
