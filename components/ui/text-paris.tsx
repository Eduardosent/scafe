import localFont from 'next/font/local';
import React from 'react';

// Cargamos las fuentes una sola vez
const helloParis = localFont({
  src: '../../public/fonts/helloparisserif-medium.ttf',
  display: 'swap',
});

const fraunces = localFont({
  src: '../../public/fonts/fraunces.ttf',
  display: 'swap',
});

interface TextParisProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  variant?: 'paris' | 'fraunces'; // Nueva prop para elegir fuente
}

export const TextParis: React.FC<TextParisProps> = ({ 
  children, 
  className = "", 
  as: Component = 'p',
  variant = 'paris' // Por defecto usa la que ya tenías
}) => {
  // Seleccionamos la clase de la fuente según el variant
  const fontClass = variant === 'fraunces' ? fraunces.className : helloParis.className;

  return (
    <Component className={`${fontClass} ${className}`}>
      {children}
    </Component>
  );
};