interface PreferenceTagProps {
    content: string;
}

export default function PreferenceTag({content}: PreferenceTagProps) {
  return (
    <div className=" shrink-0 max-h-[39px] flex items-center justify-center px-2 py-2 bg-gray-100 border rounded-[5px]">
        <span className="text-gray-800 text-15 font-medium whitespace-nowrap"># {content}</span>
    </div>
  )
}
 