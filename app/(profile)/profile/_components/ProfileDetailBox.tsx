
interface ProfileDetailBoxProps {
  children: React.ReactNode;
}
export default function ProfileDetailBox({children}: ProfileDetailBoxProps) {
  return (
    <div className='w-full border border-gray-50 rounded-[15px] flex flex-col'>
        {children}
    </div>
  )
}
