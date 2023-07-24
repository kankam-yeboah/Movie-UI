import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthRoute from "./pages/AuthRoute";
import { AuthProvider } from "./utils/auth";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Netflix />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/player"
            element={
              <ProtectedRoute>
                <Player />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
