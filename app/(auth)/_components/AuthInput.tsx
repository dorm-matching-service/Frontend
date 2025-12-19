import React from "react";


//HTML <input> 태그가 원래 가지고 있는 모든 속성(type, value, placeholder, onChange 등)을 AuthInputProps 안에 자동으로 포함시켜라는 의미
interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rightAddon?: React.ReactNode;
}

export default function AuthInput({
  rightAddon,
  className,
  ...props
}: AuthInputProps) {
  return (
    <div className="h-[55px] relative rounded-[15px] border border-gray-300 px-3 hover:border-main">
      <input
      {...props}
        className="w-full h-full bg-transparent outline-none border-none placeholder-gray-600 focus:placeholder-transparent transition"
      />
      {rightAddon && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-16 ">
          {rightAddon}
        </span>
      )}
    </div>
  );
}
