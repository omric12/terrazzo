import { Button } from '@/components/ui/button';
import Gallery from './gallery';
import Link from 'next/link';
import React from 'react';

function Hero() {
  return (
    <section className='relative min-h-screen overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400'>
      <div className='absolute inset-0 bg-grid-white/25 bg-grid-8 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]'></div>
      <div className='container relative mx-auto px-4 py-32 flex items-center min-h-screen'>
        <div className='flex flex-col items-center justify-center space-y-8 text-center text-white'>
          <h1 className='text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl/none animate-fade-up'>
            סתיו טראצ'ו
          </h1>
          <p className='mx-auto max-w-[700px] text-xl md:text-2xl animate-fade-up opacity-90'>
            אומנות הטראצו המודרנית - יצירת חלומות במו ידיך
          </p>
          <div className='flex flex-col sm:flex-row gap-6 animate-fade-up'>
            <Link href='#gallery' scroll={false}>
              <Button className='bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105'>
                גלריית העבודות
              </Button>
            </Link>
            <Link href='#contact' scroll={false}>
              <Button className='bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300'>
                צור קשר
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className='py-24 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8 text-purple-800'>
            האומנות שמאחורי הטראצו
          </h2>
          <p className='text-lg text-gray-600 leading-relaxed mb-12'>
            טראצו היא אומנות עתיקה שמשלבת חומרים טבעיים ליצירת משטחים ייחודיים
            ומרהיבים. אנחנו מביאים את המסורת הזו לעידן המודרני, עם דגש על קיימות
            ועיצוב עכשווי.
          </p>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      title: 'בחירת העיצוב',
      description: 'בחרו את הדוגמה המושלמת עבורכם מתוך מגוון האפשרויות',
      icon: '🎨',
    },
    {
      title: 'הכנת החומרים',
      description: 'אנחנו מספקים את כל החומרים הדרושים באיכות הגבוהה ביותר',
      icon: '🛠️',
    },
    {
      title: 'יצירה והדרכה',
      description: 'ליווי מקצועי לאורך כל תהליך היצירה',
      icon: '✨',
    },
  ];

  return (
    <section className='py-24 bg-purple-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-16 text-purple-800'>
          תהליך העבודה
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {steps.map((step, idx) => (
            <div key={idx} className='text-center'>
              <div className='text-5xl mb-6'>{step.icon}</div>
              <h3 className='text-xl font-semibold mb-4 text-purple-700'>
                {step.title}
              </h3>
              <p className='text-gray-600'>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id='contact'
      className='py-24 bg-gradient-to-br from-purple-900 to-pink-900 text-white'>
      <div className='container mx-auto px-4'>
        <div className='max-w-2xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8'>
            בואו ניצור משהו מיוחד
          </h2>
          <p className='text-lg mb-12 opacity-90'>
            מוזמנים ליצור קשר לשאלות, הזמנות או סתם לומר שלום
          </p>
          <div className='flex justify-center gap-8'>
            <Link
              href='https://instagram.com'
              className='hover:text-pink-400 transition-colors text-lg'>
              Instagram @starrazzo
            </Link>
            <Link
              href='mailto:contact@example.com'
              className='hover:text-pink-400 transition-colors text-lg'>
              שלחו מייל
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className='bg-background'>
      <Hero />
      <About />
      <Process />
      <section id='gallery' className='py-24 bg-white'>
        <Gallery />
      </section>
      <Contact />
    </div>
  );
}
