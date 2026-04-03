import React from 'react';
import { motion } from 'framer-motion';
import { HeroImages } from './hero-images';
import { HeroText } from './hero-text';

export const Hero = () => {

  return (
    <div className='bg-[#0a0a0a] mt-20'>
    <HeroText />
    <HeroImages />
    <p className='text-white text-center mt-4 md:text-3xl max-w-[900px] mx-auto mb-10'>
        El Sendero Café es una cafetería única en las montañas de San Juan Talpa, El Salvador.
    </p>
    </div>
  );
};