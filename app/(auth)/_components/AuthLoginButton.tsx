import React from "react";

interface AuthLoginButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button";
  className?: string;
}

export default function AuthLoginButton({
  children,
  onClick,
  type = "button",
  className = "",
}: AuthLoginButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        w-full h-[55px] rounded-[10px]
        bg-white text-gray-800 
        transition 
        active:scale-95
        border border-gray-500 hover:border-gray-600 
        font-medium
      ${className}
      `}
    >
      <p className="text-20">{children}</p>
    </button>
  );
}
