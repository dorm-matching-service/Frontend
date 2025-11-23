import "./globals.css";
import Providers from "./provider";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen"> {children} </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
