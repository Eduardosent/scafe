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
    { src: '/spot-1.png', alt: 'Café de especialidad El Sendero' },
    { src: '/spot-3.png', alt: 'Preparación artesanal' },
    { src: '/spot-2.jpg', alt: 'Granos de café seleccionados' },
    { src: '/spot-5.jpg', alt: 'Ambiente rústico El Sendero' },
    { src: '/spot-4.jpg', alt: 'Barista en acción' },
    { src: '/spot-6.jpg', alt: 'Taza de café recién hecho' },
    // ... el resto de tus imágenes se mantienen igual
    { src: '/spot-7.jpg', alt: 'Spotlight image 7' },
    { src: '/spot-8.jpg', alt: 'Spotlight image 8' },
    { src: '/spot-9.jpg', alt: 'Spotlight image 9' },
    { src: '/spot-10.jpg', alt: 'Spotlight image 10' },
    { src: '/spot-11.jpg', alt: 'Spotlight image 11' },
    { src: '/spot-15.jpg', alt: 'Spotlight image 15' },
    { src: '/spot-13.jpg', alt: 'Spotlight image 13' },
    { src: '/spot-14.jpg', alt: 'Spotlight image 14' },
    { src: '/spot-12.jpg', alt: 'Spotlight image 12' },
    { src: '/spot-16.jpg', alt: 'Spotlight image 16' },
    { src: '/spot-17.jpg', alt: 'Spotlight image 17' },
    { src: '/spot-18.jpg', alt: 'Spotlight image 18' },
    { src: '/spot-19.jpg', alt: 'Spotlight image 19' },
    { src: '/spot-20.jpg', alt: 'Spotlight image 20' },
    { src: '/spot-21.jpg', alt: 'Spotlight image 21' },
    { src: '/spot-23.jpg', alt: 'Spotlight image 23' },
    { src: '/spot-22.jpg', alt: 'Spotlight image 22' },
    { src: '/spot-24.jpg', alt: 'Spotlight image 24' },
    { src: '/spot-25.jpg', alt: 'Spotlight image 25' },
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
        
        {/* IMAGEN DEL CRÁNEO (Optimización LCP) */}
        <div className="flex justify-center mb-4">
          <Image 
            src="/skull.png" 
            alt="Icono representativo de cultura local - El Sendero Café" 
            width={500} 
            height={500} 
            priority // Muy importante si aparece arriba del fold
            sizes="(max-width: 768px) 320px, 480px"
            className="w-80 h-80 md:w-120 md:h-120 object-contain"
          />
        </div>

        {/* Título */}
        <div className="border-b border-white/10 mb-8 pb-6">
          <TextParis as="p" className="text-4xl md:text-7xl tracking-tighter leading-none font-light">
            {t('title')}
          </TextParis>
        </div>

        {/* CONTENEDOR GRID */}
        <div className="relative">
          {images.length > 6 && (
            <>
              <button 
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 border border-white/10 rounded-full hover:bg-black transition-all opacity-0 group-hover:opacity-100 hidden md:block focus:ring-2 focus:ring-white outline-none"
                aria-label="Ver imágenes anteriores"
              >
                <ChevronLeft size={32} strokeWidth={1} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 border border-white/10 rounded-full hover:bg-black transition-all opacity-0 group-hover:opacity-100 hidden md:block focus:ring-2 focus:ring-white outline-none"
                aria-label="Ver siguientes imágenes"
              >
                <ChevronRight size={32} strokeWidth={1} />
              </button>
            </>
          )}

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-2 no-scrollbar pb-12 snap-x snap-mandatory scroll-smooth"
          >
            {chunks.map((group, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 grid grid-cols-12 grid-rows-2 gap-2 w-[90vw] md:w-[1300px] h-[450px] md:h-[650px] snap-start"
              >
                {/* Optimizamos el renderizado: 
                   - 'priority' solo para el primer chunk
                   - 'sizes' calculados según el col-span (ej: 7/12 de 1300px es aprox 750px)
                */}
                <div className="col-span-7 relative">
                  {group[0] && (
                    <Image 
                      src={group[0].src} 
                      alt={group[0].alt} 
                      fill 
                      sizes="(max-width: 768px) 60vw, 750px"
                      priority={idx === 0} 
                      className="object-cover brightness-75" 
                    />
                  )}
                </div>
                <div className="col-span-3 relative">
                  {group[3] && (
                    <Image 
                      src={group[3].src} 
                      alt={group[3].alt} 
                      fill 
                      sizes="(max-width: 768px) 30vw, 320px"
                      priority={idx === 0}
                      className="object-cover brightness-75" 
                    />
                  )}
                </div>
                <div className="col-span-2 relative">
                  {group[4] && (
                    <Image 
                      src={group[4].src} 
                      alt={group[4].alt} 
                      fill 
                      sizes="(max-width: 768px) 20vw, 220px"
                      priority={idx === 0}
                      className="object-cover brightness-75" 
                    />
                  )}
                </div>

                <div className="col-span-4 relative">
                  {group[1] && (
                    <Image 
                      src={group[1].src} 
                      alt={group[1].alt} 
                      fill 
                      sizes="(max-width: 768px) 40vw, 430px"
                      priority={idx === 0}
                      className="object-cover brightness-75" 
                    />
                  )}
                </div>
                <div className="col-span-2 relative">
                  {group[2] && (
                    <Image 
                      src={group[2].src} 
                      alt={group[2].alt} 
                      fill 
                      sizes="(max-width: 768px) 20vw, 220px"
                      priority={idx === 0}
                      className="object-cover brightness-75" 
                    />
                  )}
                </div>
                <div className="col-span-6 relative">
                  {group[5] && (
                    <Image 
                      src={group[5].src} 
                      alt={group[5].alt} 
                      fill 
                      sizes="(max-width: 768px) 50vw, 650px"
                      priority={idx === 0}
                      className="object-cover brightness-75" 
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer de sección */}
        <div className="w-full flex flex-row justify-between items-end">
          <TextParis as="p" className="text-xl md:text-3xl md:max-w-[420px] leading-[0.9] tracking-tight text-neutral-200">
            {t('text')}
          </TextParis>
          <TextParis as="p" className="[writing-mode:vertical-rl] text-md opacity-50 hover:opacity-100 transition-opacity">
            Quote by Anastasio Aquino (1792–1833)
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