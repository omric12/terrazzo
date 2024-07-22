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
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <section className='w-full py-4 md:py-6'>
        <div className='container grid gap-6 md:gap-8 px-4 md:px-6'>
          <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8'>
            <h1 className='text-2xl font-bold tracking-tight'>תפריט כלים </h1>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8'>
            {moldsArray.map((mold) => (
              <Card
                key={mold.id}
                className='bg-background rounded-xl shadow-lg overflow-hidden '>
                <Image
                  src={mold.image}
                  alt={mold.title}
                  width={600}
                  height={400}
                  className='w-full h-48 object-cover rounded-lg'
                />
                <div className='p-6 space-y-4'>
                  <CardTitle className='text-xl font-semibold'>
                    {mold.title}
                  </CardTitle>
                  <CardContent className='grid gap-4'>
                    <p className='text-muted-foreground'>
                      אבקה:{' '}
                      <span className='px-2'>
                        {/* $ */}
                        {Number(mold.powder).toFixed(1)}
                      </span>
                    </p>
                    <p className='text-muted-foreground'>
                      נוזל:{' '}
                      <span className='px-2'>
                        {/* $ */}
                        {Number(mold.binder)}
                      </span>
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
