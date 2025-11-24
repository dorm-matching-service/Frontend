import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function AgreementModal({
  open,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] p-6 rounded-[15px] shadow-xl flex flex-col">
        <h2 className="text-24 font-bold text-gray-900 mb-4 self-center">{title}</h2>

        <div className="text-gray-700 mb-6">{children}</div>

        <button
          onClick={onClose}
          className="bg-main text-white w-full py-3 rounded-[10px] active:scale-95 transition"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
