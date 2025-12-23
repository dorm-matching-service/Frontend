import MyProfileCard from "./_components/MyProfileCard";

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* <MyProfileCard /> */}

      {/* <MypageSidebar /> */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
