import React from "react";
import clsx from "clsx";

export default function Card({ className, children }) {
  return <div className={clsx("card p-5 md:p-6", className)}>{children}</div>;
}
