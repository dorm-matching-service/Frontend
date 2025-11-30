'use client';

type StepTabsProps = {
    steps: string[];
    currentStep: number;
};

export function StepTabs({ steps, currentStep }: StepTabsProps) {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-5xl overflow-x-auto px-4 scrollbar-none">
                <div className="flex w-full gap-6 pt-6">
                    {steps.map((step, index) => {
                        const isActive = index === currentStep;
                        return (
                            <div key={step} className="flex flex-col items-center text-sm whitespace-nowrap">
                                <button
                                    className={`pb-3 ${isActive ? 'font-semibold text-[#4CB7A5]' : 'text-gray-500'}`}
                                >
                                    {step}
                                </button>
                                <div
                                    className={`h-0.5 w-full rounded-full ${
                                        isActive ? 'bg-[#4CB7A5]' : 'bg-transparent'
                                    }`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
