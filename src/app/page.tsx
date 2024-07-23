import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import Image from 'next/image';
import { molds } from '../assets/data/molds';

export default function Home() {
  const moldsArray = molds;
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-4 sm:p-6 md:p-8 lg:p-12'>
      <section className='w-full py-4 sm:py-6'>
        <div className='container mx-auto'>
          <div className='mb-6 sm:mb-8'>
            <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
              תפריט כלים
            </h1>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
            {moldsArray.map((mold) => (
              <Card
                key={mold.id}
                className='bg-background rounded-xl shadow-lg overflow-hidden flex flex-col'>
                <div className='relative w-full pt-[56.25%]'>
                  <Image
                    src={mold.image}
                    alt={mold.title}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-t-xl'
                  />
                </div>
                <div className='p-4 flex-grow'>
                  <CardTitle className='text-lg font-semibold mb-2'>
                    {mold.title}
                  </CardTitle>
                  <CardContent className='grid gap-2'>
                    <p className='text-sm text-muted-foreground'>
                      אבקה: <span className='px-2'>{Number(mold.powder)}</span>
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      נוזל: <span className='px-2'>{Number(mold.binder)}</span>
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
