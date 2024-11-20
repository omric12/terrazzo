import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'סתיו טראצו',
  description: 'Stav terrazzo DIY',
};
function Nav() {
  return (
    <header className='w-full px-4 py-6 flex items-center justify-between md:px-8 shadow-lg'>
      <div className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
        MyApp
      </div>
      <NavigationMenu>
        <NavigationMenuList className='flex gap-4'>
          <NavigationMenuLink asChild>
            <Link
              href='#'
              className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
              prefetch={false}>
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' dir='rtl'>
      <body className={inter.className}>
        <>
          <Nav />

          {children}
        </>
      </body>
    </html>
  );
}
