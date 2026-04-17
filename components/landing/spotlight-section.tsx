'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TextParis } from '../ui/text-paris';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SpotlightSection: React.FC = () => {
  const t = useTranslations('Landing.Spotlight');
  const scrollRef = useRef<HTMLDivElement>(null);

const images = [
  { src: '/spot-1.png', alt: 'Carousel Image' },
  { src: '/spot-3.png', alt: 'Carousel Image' },
  { src: '/spot-2.jpg', alt: 'Carousel Image' },
  { src: '/spot-5.jpg', alt: 'Carousel Image' },
  { src: '/spot-4.jpg', alt: 'Carousel Image' },
  { src: '/spot-6.jpg', alt: 'Carousel Image' },
  { src: '/spot-7.jpg', alt: 'Carousel Image' },
  { src: '/spot-8.jpg', alt: 'Carousel Image' },
  { src: '/spot-9.jpg', alt: 'Carousel Image' },
  { src: '/spot-10.jpg', alt: 'Carousel Image' },
  { src: '/spot-11.jpg', alt: 'Carousel Image' },
  { src: '/spot-15.jpg', alt: 'Carousel Image' },
  { src: '/spot-13.jpg', alt: 'Carousel Image' },
  { src: '/spot-14.jpg', alt: 'Carousel Image' },
  { src: '/spot-12.jpg', alt: 'Carousel Image' },
  { src: '/spot-16.jpg', alt: 'Carousel Image' },
  { src: '/spot-17.jpg', alt: 'Carousel Image' },
  { src: '/spot-18.jpg', alt: 'Carousel Image' },
  { src: '/spot-19.jpg', alt: 'Carousel Image' },
  { src: '/spot-20.jpg', alt: 'Carousel Image' },
  { src: '/spot-21.jpg', alt: 'Carousel Image' },
  { src: '/spot-23.jpg', alt: 'Carousel Image' },
  { src: '/spot-22.jpg', alt: 'Carousel Image' },
  { src: '/spot-24.jpg', alt: 'Carousel Image' },
  { src: '/spot-25.jpg', alt: 'Carousel Image' },
];

  const chunks = [];
  for (let i = 0; i < images.length; i += 6) {
    chunks.push(images.slice(i, i + 6));
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-black text-white py-16 md:py-20 px-6 overflow-hidden">
      <div className="max-w-[1600px] mx-auto relative group">
        
        {/* IMAGEN DEL CRÁNEO (SKULL) */}
        <div className="flex justify-center mb-4">
          <Image 
            src="/skull.png" 
            alt="Skull Image" 
            width={500} 
            height={500} 
            className="w-80 h-80 md:w-120 md:h-120 object-contain"
          />
        </div>
        {/* Título */}
        <div className="border-b border-white/10 mb-8 pb-6">
          <TextParis as="h2" className="text-4xl md:text-7xl tracking-tighter leading-none font-light">
            {t('title')}
          </TextParis>
        </div>

        {/* CONTENEDOR RELATIVO PARA EL GRID Y BOTONES */}
        <div className="relative">
          
          {/* Botones Flotantes en medio del Grid */}
          {images.length > 6 && (
            <>
              <button 
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 border border-white/10 rounded-full hover:bg-black transition-all opacity-0 group-hover:opacity-100 hidden md:block"
                aria-label="Anterior"
              >
                <ChevronLeft size={32} strokeWidth={1} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 border border-white/10 rounded-full hover:bg-black transition-all opacity-0 group-hover:opacity-100 hidden md:block"
                aria-label="Siguiente"
              >
                <ChevronRight size={32} strokeWidth={1} />
              </button>
            </>
          )}

          {/* GRID SCROLLABLE */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-2 no-scrollbar pb-12 snap-x snap-mandatory scroll-smooth"
          >
            {chunks.map((group, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 grid grid-cols-12 grid-rows-2 gap-2 w-[90vw] md:w-[1300px] h-[450px] md:h-[650px] snap-start"
              >
                {/* FILA SUPERIOR (7 - 3 - 2) */}
                <div className="col-span-7 relative">
                  {group[0] && <Image src={group[0].src} alt={group[0].alt} fill className="object-cover brightness-75" />}
                </div>
                <div className="col-span-3 relative">
                  {group[3] && <Image src={group[3].src} alt={group[3].alt} fill className="object-cover brightness-75" />}
                </div>
                <div className="col-span-2 relative">
                  {group[4] && <Image src={group[4].src} alt={group[4].alt} fill className="object-cover brightness-75" />}
                </div>

                {/* FILA INFERIOR (4 - 2 - 6) */}
                <div className="col-span-4 relative">
                  {group[1] && <Image src={group[1].src} alt={group[1].alt} fill className="object-cover brightness-75" />}
                </div>
                <div className="col-span-2 relative">
                  {group[2] && <Image src={group[2].src} alt={group[2].alt} fill className="object-cover brightness-75" />}
                </div>
                <div className="col-span-6 relative">
                  {group[5] && <Image src={group[5].src} alt={group[5].alt} fill className="object-cover brightness-75" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Texto Inferior */}
        <div className="max-w-2xl mt-4">
          <TextParis as="p" className="text-xl md:text-3xl md:max-w-[420px] leading-[0.9] tracking-tight text-neutral-200">
            {t('text')}
          </TextParis>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};