interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function ProfileSection({
  title,
  children,
}: ProfileSectionProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h3 className="text-main font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
