
'use client';

import React from 'react';
import Image from 'next/image';
import { TextParis } from '../ui';
import { VerticalTexts } from './vertical-texts';

export const HeroImages = () => {
  return (
    <div className="bg-[#0a0a0a] w-full py-8 flex justify-center">
      <div className="w-full max-w-[320px] md:max-w-4xl px-4 relative flex justify-center">
        
        {/* Contenedor de Textos Verticales - Alineados en horizontal */}
        <VerticalTexts />

        {/* Contenedor de la Imagen principal */}
        <div className="w-full max-w-2xl">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/5">
            <Image
              src="/hero-cafe.avif"
              alt="Hero café"
              width={800}
              height={450}
              className="w-full h-auto object-contain block"
              priority
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};