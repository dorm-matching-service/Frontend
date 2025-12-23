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
      className={`shadow-profileCard w-[300px] rounded-[15px] overflow-hidden ${className}`}
    >
      <div className="flex flex-col gap-5 px-6 py-6 justify-center">
        {children}
      </div>
    </div>
  );
}
