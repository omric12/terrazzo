import './globals.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'סתיו טראצו | יצירת טראצו מודרני',
    template: '%s | סתיו טראצו',
  },
  description:
    'סדנאות טראצו, מוצרי DIY וחומרי גלם איכותיים ליצירת טראצו מודרני. הצטרפו אלינו לחוויית יצירה ייחודית',
  keywords: [
    'טראצו',
    'סדנאות יצירה',
    'DIY',
    'עיצוב הבית',
    'אומנות ישראלית',
    'סתיו טראצו',
  ],
  authors: [{ name: 'סתיו טראצו' }],
  creator: 'סתיו טראצו',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://www.starrazzo.com',
    title: 'סתיו טראצו | יצירת טראצו מודרני',
    description:
      'סדנאות טראצו, מוצרי DIY וחומרי גלם איכותיים ליצירת טראצו מודרני',
    siteName: 'סתיו טראצו',
    images: [
      {
        url: '/starrazzo.png',
        width: 1200,
        height: 630,
        alt: 'סתיו טראצו',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'סתיו טראצו | יצירת טראצו מודרני',
    description:
      'סדנאות טראצו, מוצרי DIY וחומרי גלם איכותיים ליצירת טראצו מודרני',
    images: ['/starrazzo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://www.starrazzo.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' dir='rtl'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
