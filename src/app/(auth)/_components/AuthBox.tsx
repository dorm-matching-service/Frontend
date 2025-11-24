import React from "react";
import clsx from "clsx";

export default function AuthBox({
  children,
  className,

}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("min-w-[376.025px] min-h-[330px] rounded-[15px] p-6 shadow-card", className)}>

      {children}
    </div>

  )
}
