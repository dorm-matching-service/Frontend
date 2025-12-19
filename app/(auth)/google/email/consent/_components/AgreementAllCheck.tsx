import CheckBox from "./CheckBox"


interface Props {
  checked: boolean;
  onToggle: () => void;
}


export default function AgreementAllCheck({ checked, onToggle }: Props) {
  return (
    <div className="flex flex-col">
        <div className="flex gap-2 mb-3">
            <CheckBox checked={checked} onToggle={onToggle}/>
            <p className="text-gray-900 text-24 font-medium">전체 동의합니다</p>

        </div>

        <p className="text-gray-700 text-20 ml-11">서비스 이용 약관 동의, 개인정보 수집 및 이용에 동의, 마케팅 정보 수신동의를 포함합니다. </p>
        

    </div>
  )
}
