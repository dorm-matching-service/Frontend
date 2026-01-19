import MyPageSidebar from "./_components/MypageSidebar";

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-[320px] shrink-0 p-6">
        <MyPageSidebar />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
