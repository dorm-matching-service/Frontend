import React from "react";

interface ProfileBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProfileBox({
  children,
  className = "",
}: ProfileBoxProps) {
  return (
    <div
      className={`    w-[320px]
    h-[260px]
    shrink-0 shadow-profileCard rounded-[15px] overflow-hidden  ${className}`}
    >
      <div className="flex flex-col gap-5 px-6 py-6 justify-between h-full ">
        {children}
      </div>
    </div>
  );
}
