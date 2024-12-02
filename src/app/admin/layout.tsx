import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'סתיו טראצו | יצירת טראצו מודרני',
  description: 'סדנאות טראצו, מוצרי DIY וחומרי גלם איכותיים',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='he' dir='rtl'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
