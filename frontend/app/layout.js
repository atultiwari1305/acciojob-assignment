import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Load custom fonts and assign them to CSS variables
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

// Define metadata for the entire app
export const metadata = {
  title: 'AccioJob AI Builder',
  description: 'A micro-frontend generator built using Next.js',
};

// Root layout for the entire app
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black min-h-screen`}
      >
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
