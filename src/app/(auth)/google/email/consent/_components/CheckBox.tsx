import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

interface CheckBoxProps {
  checked: boolean;
  onToggle: () => void;
  className?: string;
}

export default function CheckBox({
  checked,
  onToggle,
  className = "",
}: CheckBoxProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center justify-center w-[37px] h-[37px] rounded-[5px] transition border
    ${checked ? "bg-main border-main" : "bg-white border-gray-300"}
    ${className}
    `}
    >
     <CheckIcon
        className={`
          w-6 h-6
          ${checked ? "text-white" : "text-gray-600"}  
        `}
      />
    </button>
  );
}
