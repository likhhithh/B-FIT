import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Log from "./pages/Log.jsx";
import Goals from "./pages/Goals.jsx";
import Analytics from "./pages/Analytics.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Achievements from "./pages/Achievements.jsx";

import RequireAuth from "./components/auth/RequireAuth.jsx";
import { useAuth } from "./store/authStore.js";

export default function App() {
  const { initialized, fetchMe } = useAuth();

  useEffect(() => {
    if (!initialized) fetchMe();
  }, [initialized, fetchMe]);

  return (
    <Routes>
      {/* Public (no layout) */}
      <Route path="/login" element={<Login />} />

      {/* Protected app (everything else) */}
      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/log" element={<Log />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
