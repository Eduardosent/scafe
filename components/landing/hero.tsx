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
          className=' mt-20 text-center text-white text-2xl md:text-7xl leading-[0.8] tracking-tighter mb-4 font-[300]'
        >
          {t('subtitle')}
        </TextParis>

        {/* Description - Limpio (Minúsculas en el JSON) */}
<TextParis 
  className='mt-6 text-center md:text-left md:ml-150 text-white text-lg md:text-4xl max-w-[370px] md:max-w-[470px] leading-[0.75] tracking-[-0.05em] opacity-90 mx-auto font-semibold inline-block transform scale-y-110'
>
  {t('description')}
</TextParis>
<TextParis 
  className='mt-28 text-center md:text-left md:ml-150 text-white text-lg md:text-4xl max-w-[370px] md:max-w-[400px] leading-[0.65] tracking-[-0.05em] opacity-90 mx-auto font-[300] inline-block transform scale-y-110'
>
  {t('events')}
</TextParis>
    </div>
  );
};