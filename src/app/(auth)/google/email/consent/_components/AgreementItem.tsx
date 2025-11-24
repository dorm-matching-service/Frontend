import CheckBox from "./CheckBox";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface AgreementItemProps {
  children: React.ReactNode;
  checked: boolean;
  onToggle: () => void;
  onDetail: () => void;
}

export default function AgreementItem({
  children,
  checked,
  onToggle,
  onDetail,
}: AgreementItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 ">
        <CheckBox checked={checked} onToggle={onToggle}/>
        <p className="text-accent text-24">(필수)</p>
        <p className="text-gray-900 text-24">{children}</p>
      </div>

      <div className="flex gap-2" onClick={onDetail}>
        <p className="text-gray-700">상세보기</p>
        <ChevronRightIcon className="w-6 h-6 text-gray-700" />
      </div>
    </div>
  );
}
