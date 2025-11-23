import React from "react";
import clsx from "clsx";

export default function Box({
  children,
  className,

}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("w-full max-w-md rounded-2xl p-6 shadow-card", className)}>

      {children}
    </div>

  )
}
