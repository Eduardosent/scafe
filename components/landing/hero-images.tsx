"use client";

import Image from 'next/image';

export const HeroImages = () => {
  return (
    <div className="bg-[#0a0a0a] w-full">
      {/* Contenedor sin altura fija que se ajusta a las imágenes */}
      <div className="max-w-5xl mx-auto flex items-center justify-around px-4">
        
        <div className="relative w-28 h-28 md:w-60 md:h-60 animate-float">
          <Image
            src="/carne-tortilla.png" 
            alt="Carne Tortilla"
            width={240}
            height={240}
            className="object-contain"
            priority
          />
        </div>

        <div className="relative w-28 h-28 md:w-64 md:h-64 animate-float-slow">
          <Image
            src="/frapuchino.png"
            alt="Frapuchino"
            width={256}
            height={256}
            className="object-contain"
            priority
          />
        </div>

        <div className="relative w-36 h-36 md:w-72 md:h-72 animate-float-delayed">
          <Image
            src="/taco.png"
            alt="Taco Especial"
            width={288}
            height={288}
            className="object-contain"
            priority
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out infinite; animation-delay: 1s; }
        .animate-float-slow { animation: float 8s ease-in-out infinite; animation-delay: 0.5s; }
      `}</style>
    </div>
  );
};