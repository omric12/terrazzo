import React from 'react';

const data = [
  {
    imgSrc: 'https://placehold.co/800x600/purple/white?text=Gallery+1',
    title: 'קולקציית אביב',
    description: 'עיצובים מרעננים בהשראת האביב',
  },
  {
    imgSrc: 'https://placehold.co/800x600/pink/white?text=Gallery+2',
    title: 'קולקציית קיץ',
    description: 'צבעים חיים ועיצובים נועזים',
  },
  {
    imgSrc: 'https://placehold.co/800x600/orange/white?text=Gallery+3',
    title: 'קולקציית סתיו',
    description: 'גוונים חמים ומרגיעים',
  },
  {
    imgSrc: 'https://placehold.co/800x600/violet/white?text=Gallery+4',
    title: 'קולקציית חורף',
    description: 'עיצובים אלגנטיים בגוונים עמוקים',
  },
];

export default function Gallery() {
  return (
    <div className='container mx-auto px-4'>
      <h2 className='text-4xl font-bold text-center mb-16 text-purple-800'>
        הגלריה שלנו
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        {data.map((item, idx) => (
          <div
            key={idx}
            className='group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl'>
            <img
              src={item.imgSrc}
              alt={item.title}
              className='w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <div className='absolute bottom-0 left-0 right-0 p-8 text-white'>
                <h3 className='text-2xl font-bold mb-2'>{item.title}</h3>
                <p className='text-lg opacity-90'>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
