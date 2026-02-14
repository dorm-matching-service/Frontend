import "./globals.css";
import Providers from "./provider";
import { Inter } from "next/font/google";
import Header from "@src/components/ui/Header";
import Footer from "@src/components/ui/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}
      >
        <Providers>
          
          <Header />
          {children}
          <Footer />
          </Providers>
      </body>
    </html>
  );
}