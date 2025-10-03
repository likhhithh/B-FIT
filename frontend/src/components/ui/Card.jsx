import React from "react";
import clsx from "clsx";

export default function Card({ className, children }) {
  return <div className={clsx("card p-4", className)}>{children}</div>;
}
