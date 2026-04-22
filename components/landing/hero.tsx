'use client';

import { useTranslations } from 'next-intl';
import { HeroImages } from './hero-images';
import { HeroText } from './hero-text';
import { TextParis } from '../ui';

export const Hero = () => {
  const t = useTranslations('Landing.Hero');

  return (
    <div className='bg-[#0a0a0a] mt-20'>
      <HeroText />
      <HeroImages />
      
      <TextParis 
        as="h2" 
        className='mt-20 text-center text-white text-2xl md:text-7xl leading-[0.8] tracking-tighter mb-4 font-[300]'
      >
        {t('subtitle')}
      </TextParis>

      {/* Contenedor Flex para alinear logo y textos sin alterarlos */}
      <div className='flex flex-col md:flex-row items-center md:items-center justify-center max-w-7xl mx-auto gap-8'>
        
        {/* LOGO A LA IZQUIERDA - Convertido a blanco puro sin fondo */}
        <div className='flex-shrink-0'>
          <img 
            src="/logo.jpg" 
            alt="Logo" 
            className='w-64 md:w-[450px] h-auto invert mix-blend-screen' 
          />
        </div>

        {/* COLUMNA DE TEXTOS A LA DERECHA */}
        <div className='flex flex-col'>
          <TextParis variant='fraunces' 
            className='mt-6 text-center md:text-left text-white text-lg md:text-4xl max-w-[370px] md:max-w-[470px] leading-[1] tracking-[-0.05em] opacity-90 font-semibold transform scale-y-110'
          >
            {t('description')}
          </TextParis>
          
          <TextParis variant='fraunces' 
            className='mt-28 text-center md:text-left text-white text-lg md:text-4xl max-w-[370px] md:max-w-[400px] leading-[0.85] tracking-[-0.05em] opacity-90 font-[200]'
          >
            {t('events')}
          </TextParis>
        </div>
      </div>

    </div>
  );
};