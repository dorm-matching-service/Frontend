import "./globals.css";
import Providers from "./provider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // css 변수로 등록 (선택)
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
