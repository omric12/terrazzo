'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Dialog } from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';
import { molds } from '../assets/data/molds';
import { useState } from 'react';

const labels = { Title: 'תפריט כלים', Powder: 'אבקה', Binder: 'נוזל' };

interface Mold {
  id: string;
  title: string;
  powder: number;
  binder: number;
  image: string;
  images?: string[];
}

export default function Home() {
  const moldsArray = molds;
  const [selectedMold, setSelectedMold] = useState<Mold | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className='min-h-screen bg-gradient-to-b from-background to-secondary/20'>
      {/* Hero Section */}
      <div className='w-full bg-background/50 backdrop-blur-sm border-b'>
        <div className='container mx-auto py-12 px-4 flex flex-col items-center justify-center'>
          <Link
            href='https://www.instagram.com/starrazzo_/'
            className='block  transition-transform hover:scale-[1.02] duration-300'>
            <Image
              src='/starrazzo.png'
              alt='Instagram'
              width={400}
              height={200}
              className='w-full rounded-2xl object-cover shadow-lg hover:shadow-xl transition-shadow duration-300'
            />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className='w-full py-12'>
        <div className='container mx-auto px-4'>
          <div className='mb-10'>
            <h1 className='text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
              {labels.Title}
            </h1>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {moldsArray.map((mold) => (
              <Card
                key={mold.id}
                className='group bg-background/50 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer'
                onClick={() => {
                  setSelectedMold(mold);
                  setIsModalOpen(true);
                }}>
                <div className='relative w-full overflow-hidden rounded-t-xl'>
                  <Image
                    src={mold.image}
                    alt={mold.title}
                    width={500}
                    height={250}
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <div className='p-6 flex-grow'>
                  <CardTitle className='text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
                    {mold.title}
                  </CardTitle>
                  <CardContent className='grid gap-3'>
                    <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                      <span className='text-sm font-medium text-muted-foreground'>
                        {labels.Powder}:
                      </span>
                      <span className='px-3 py-1 bg-primary/10 rounded-full text-sm font-semibold'>
                        {Number(mold.powder)}
                      </span>
                    </div>
                    <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                      <span className='text-sm font-medium text-muted-foreground'>
                        {labels.Binder}:
                      </span>
                      <span className='px-3 py-1 bg-primary/10 rounded-full text-sm font-semibold'>
                        {Number(mold.binder)}
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedMold && (
          <div className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm'>
            <div className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg'>
              <div className='flex flex-col space-y-4'>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100'>
                  ✕
                </button>
                <h2 className='text-2xl font-bold'>{selectedMold.title}</h2>
                <Carousel
                  className='w-full max-w-lg'
                  opts={{
                    align: 'start',
                    loop: true,
                  }}>
                  <CarouselContent>
                    {selectedMold.images?.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className='relative h-64'>
                          <Image
                            src={image}
                            alt={`${selectedMold.title} ${index + 1}`}
                            fill
                            className='object-cover rounded-lg'
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className='border-2 border-gray-800 bg-white/80 hover:bg-white [&>svg]:text-gray-800 hover:[&>svg]:text-gray-900' />
                  <CarouselNext className='border-2 border-gray-800 bg-white/80 hover:bg-white [&>svg]:text-gray-800 hover:[&>svg]:text-gray-900' />
                </Carousel>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </main>
  );
}
