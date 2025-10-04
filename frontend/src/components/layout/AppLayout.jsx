import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import BottomNav from "./BottomNav.jsx";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1">
        <div className="container-app py-6 pb-24 md:pb-10">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
