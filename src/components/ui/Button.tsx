import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  variant?: "primary" | "secondary" | "auth";
}

const variantStyles: Record<string, string> = {
  primary: `
    min-w-[311px]
    px-8 py-4
    text-24 font-bold
    bg-main text-white
    active:scale-95

  `,
  auth: `
    bg-gray-300 text-white
    hover:bg-main
    active:scale-95
    disabled:cursor-not-allowed
    disabled:opacity-40 
    disabled:hover:bg-gray-300
    text-16
    w-full 
    h-[55px]
  `,
  // secondary: `
  //   /* 아직 필요 없다면 주석 처리 */
  // `,
};

export default function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  variant = "auth",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-[15px]
        transition
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
