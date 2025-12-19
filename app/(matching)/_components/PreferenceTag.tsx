interface PreferenceTagProps {
    content: string;
}

export default function PreferenceTag({content}: PreferenceTagProps) {
  return (
    <div className=" shrink-0 max-h-[39px] flex items-center justify-center px-6 py-6 bg-gray-100 border">
        <span className="text-gray-800 text-15 font-medium whitespace-nowrap"># {content}</span>
    </div>
  )
}
 