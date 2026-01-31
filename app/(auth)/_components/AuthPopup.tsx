import Button from "@src/components/ui/Button";

interface AuthPopupProps {
  message: string;
  onClose: () => void;
}

export default function AuthPopup({ message, onClose }: AuthPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div
        className="
          bg-white w-[500px] 
          max-h-[300px] 
          rounded-[15px] 
          shadow-card 
          flex flex-col
          overflow-hidden  
        "
      >

        {/* 스크롤 영역 */}
        <div className="p-6 overflow-y-auto flex-1">
          <p className="text-16 leading-relaxed whitespace-pre-line">
            {message}
          </p>
        </div>

        {/* 버튼 (하단 고정) */}
        <div className="p-6 border-t">
          <Button onClick={onClose}>닫기</Button>
        </div>

      </div>
    </div>
  );
}
