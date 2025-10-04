import React from "react";
import logo from "../../assets/logo.svg";

export default function Logo({ className = "h-8", withText = true }) {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="B-FIT logo" className={className} />
      {withText && <span className="font-display text-xl">B-FIT</span>}
    </div>
  );
}
