import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Image from 'next/image';
import Link from 'next/link';
import { molds } from '../assets/data/molds';

const labels = { Title: 'תפריט כלים', Powder: 'אבקה', Binder: 'נוזל' };

export default function Home() {
  const moldsArray = molds;
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-4 sm:p-6 md:p-8 lg:p-12'>
      <Link href='https://www.instagram.com/starrazzo_/'>
        <Image
          src='/starrazzo.png'
          alt='Instagram'
          width={500}
          height={250}
          className='rounded-t-xl object-cover'
        />
      </Link>
      <section className='w-full py-4 sm:py-6'>
        <div className='container mx-auto'>
          <div className='mb-6 sm:mb-8'>
            <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
              {labels.Title}{' '}
            </h1>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
            {moldsArray.map((mold) => (
              <Card
                key={mold.id}
                className='bg-background rounded-xl shadow-lg overflow-hidden flex flex-col'>
                <div className='relative w-full '>
                  <Image
                    src={mold.image}
                    alt={mold.title}
                    width={500}
                    height={250}
                    className='rounded-t-xl object-cover'
                  />
                </div>
                <div className='p-4 flex-grow'>
                  <CardTitle className='text-lg font-semibold mb-2'>
                    {mold.title}
                  </CardTitle>
                  <CardContent className='grid gap-2'>
                    <p className='text-sm text-muted-foreground'>
                      {labels.Powder}:{' '}
                      <span className='px-2'>{Number(mold.powder)}</span>
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {labels.Binder}:{' '}
                      <span className='px-2'>{Number(mold.binder)}</span>
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
