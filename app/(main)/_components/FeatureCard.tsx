
interface FeatureCardProps {
    title: string;
    description: string;
}

export default function FeatureCard({title, description}: FeatureCardProps) {
  return (
    <div className="max-w-[280px] shadow-cardSoft flex flex-col items-center justify-center px-6 py-6 bg-white border">
        <p className="text-main text-20 leading-[28px] font-bold">{title}</p>
        <p className="text-gray-900 text-16 text-center">{description}</p>
    </div>
  )
}
