import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import { KoHo } from 'next/font/google';
import NavBar from '@/partials/NavBar';
import Footer from '@/partials/Footer';
import './globals.css';

// Define the Kanit font
const kanit = Kanit({
  variable: '--font-kanit',
  subsets: ['latin'],
  weight: '400', // You can specify multiple weights if needed
});

// Define the KoHo font
const koho = KoHo({
  variable: '--font-koho',
  subsets: ['latin'],
  weight: '400', // You can specify multiple weights if needed
});

export const metadata: Metadata = {
  title: 'qua pillars training',
  description: 'qua pillars training website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.variable} ${koho.variable} antialiased w-[100vw] overflow-x-hidden`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}