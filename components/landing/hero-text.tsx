"use client"

import React from 'react';
import { motion, Variants } from 'framer-motion';

export const HeroText = () => {
  // Definimos el objeto con el tipo Variants
  const marqueeVariants: Variants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop", // Ahora TS sabe que es un tipo RepeatType
          duration: 15,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="relative flex overflow-hidden bg-[#0a0a0a] py-10">
      <motion.div
        className="flex whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
      >
        <h1 className="text-5xl font-semibold uppercase tracking-tighter text-white mx-20">
          El Sendero Café
        </h1>
        <h1 className="text-5xl font-semibold uppercase tracking-tighter text-white mx-20">
          El Sendero Café
        </h1>
        <h1 className="text-5xl font-semibold uppercase tracking-tighter text-white mx-20">
          El Sendero Café
        </h1>
         <h1 className="text-5xl font-semibold uppercase tracking-tighter text-white mx-20">
          El Sendero Café
        </h1>
      </motion.div>
    </div>
  );
};