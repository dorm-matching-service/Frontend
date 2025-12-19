import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center py-28">
          {children}
      </main>
      <Footer />
    </div>
  );
}