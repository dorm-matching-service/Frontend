import React from "react";

interface AccountSettingItemProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  danger?: boolean;
}

export default function AccountSettingItem({
  title,
  description,
  action,
  danger,
}: AccountSettingItemProps) {
  return (
    <div
      className={`flex w-full justify-between items-start rounded-lg p-4 ${
        danger ? "bg-red-50" : ""
      }`}
    >
      <div className="flex flex-col gap-1">
        <p className={`font-semibold text-16 text-gray-900 ${danger ? "text-red-600" : ""}`}>{title}</p>
        <p className="text-sm text-gray-700">{description}</p>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
