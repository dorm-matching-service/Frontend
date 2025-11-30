
import './globals.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata = {
    title: 'Knock',
    description: 'Knock 라이프스타일 매칭 서비스',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ko" className={inter.variable}>
            <body className={inter.className}>
                <Header />
                <main className=" bg-[#F5F7F9]">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
