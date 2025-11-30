
interface StepCardProps {
    stepNumber: string;
    title: string;
    description: string;
}

export default function StepCard({stepNumber, title, description}: StepCardProps) {
  return (
    <div className="shadow-mainLift flex flex-col gap-2 px-6 py-6 bg-white border items-center justify-center max-w-[360px]">
        <p className="font-medium text-24">{stepNumber}</p>
        <p className="text-main text-20">{title}</p>
        <p className="text-16 text-center">{description}</p>
    </div>
  )
}
