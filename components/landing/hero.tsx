'use client';

import { useTranslations } from 'next-intl';
import { HeroImages } from './hero-images';
import { HeroText } from './hero-text';

export const Hero = () => {
  const t = useTranslations('Landing.Hero');

  return (
    <div className='bg-[#0a0a0a] mt-20'>
      <HeroText />
      <HeroImages />
      <p className='text-white text-center mt-4 md:text-3xl max-w-[900px] mx-auto mb-10'>
        {t('description')}
      </p>
    </div>
  );
};