interface ProfileBoxProps {
  variant?: "header" | "default" | "highlight";
  title?: string;
  children: React.ReactNode;
}

const boxStyle = {
  header: "w-full rounded-xl bg-white px-6 py-5 shadow-profile",
  default: "rounded-xl bg-white px-5 py-4 shadow-profile",
  highlight: "rounded-xl bg-mint-50 px-5 py-4 border border-mint-200",
} as const;

export default function ProfileBox({
  variant = "default",
  title,
  children,
}: ProfileBoxProps) {
  return (
    <section className={boxStyle[variant]}>
      {title && (
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          {title}
        </h3>
      )}
      {children}
    </section>
  );
}
