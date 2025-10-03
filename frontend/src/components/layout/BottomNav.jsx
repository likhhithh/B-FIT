import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart3, Target, User, PlusSquare } from "lucide-react";

export default function BottomNav() {
  const items = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/log", label: "Log", icon: PlusSquare },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/goals", label: "Goals", icon: Target },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/90 dark:bg-[#0B1220]/90 border-t border-slate-200/70 dark:border-white/10 backdrop-blur">
      <div className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 text-xs ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-300"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
