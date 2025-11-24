import React from "react";

interface AuthButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export default function AuthButton({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full h-[55px] rounded-[15px]
        bg-gray-300 text-white
        transition 
        hover:bg-main
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-40 
        disabled:hover:bg-gray-300
      ${className}
      `}
    >
      <p className="text-16 font-bold">{children}</p>
    </button>
  );
}
