import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store/authStore.js";

export default function RequireAuth({ children }) {
  const { user, initialized, fetchMe } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!initialized) fetchMe();
  }, [initialized, fetchMe]);

  if (!initialized) {
    return (
      <div className="h-40 grid place-items-center text-sm text-slate-500">
        Checking session...
      </div>
    );
  }

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  return children;
}
