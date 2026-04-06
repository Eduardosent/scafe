import localFont from 'next/font/local';
import React from 'react';

// Cargamos la fuente una sola vez aquí, pinche basura que soy
const helloParis = localFont({
  src: '../../public/fonts/helloparisserif-bold.ttf', // Ajustá los '../' según tu carpeta
  display: 'swap',
});

interface TextParisProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'; // Para que sea flexible
}

export const TextParis: React.FC<TextParisProps> = ({ 
  children, 
  className = "", 
  as: Component = 'p' 
}) => {
  return (
    <Component className={`${helloParis.className} ${className}`}>
      {children}
    </Component>
  );
};