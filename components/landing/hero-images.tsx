// "use client";

// import Image from 'next/image';

// export const HeroImages = () => {
//   return (
//     <div className="bg-[#0a0a0a] w-full">
//       {/* Contenedor sin altura fija que se ajusta a las imágenes */}
//       <div className="max-w-5xl mx-auto flex items-center justify-around px-4">
        
//         <div className="relative w-28 h-28 md:w-60 md:h-60 animate-float">
//           <Image
//             src="/carne-tortilla.png" 
//             alt="Carne Tortilla"
//             width={240}
//             height={240}
//             className="object-contain"
//             priority
//           />
//         </div>

//         <div className="relative w-28 h-28 md:w-64 md:h-64 animate-float-slow">
//           <Image
//             src="/frapuchino.png"
//             alt="Frapuchino"
//             width={256}
//             height={256}
//             className="object-contain"
//             priority
//           />
//         </div>

//         <div className="relative w-36 h-36 md:w-72 md:h-72 animate-float-delayed">
//           <Image
//             src="/taco.png"
//             alt="Taco Especial"
//             width={288}
//             height={288}
//             className="object-contain"
//             priority
//           />
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//           100% { transform: translateY(0px); }
//         }
//         .animate-float { animation: float 5s ease-in-out infinite; }
//         .animate-float-delayed { animation: float 6s ease-in-out infinite; animation-delay: 1s; }
//         .animate-float-slow { animation: float 8s ease-in-out infinite; animation-delay: 0.5s; }
//       `}</style>
//     </div>
//   );
// };

'use client';

import React from 'react';
import Image from 'next/image';
import { TextParis } from '../ui';

export const HeroImages = () => {
  return (
    <div className="bg-[#0a0a0a] w-full py-8 flex justify-center">
      <div className="w-full max-w-[320px] md:max-w-4xl px-4 relative flex justify-center">
        
        {/* Contenedor de Textos Verticales - Alineados en horizontal */}
        <div className="hidden md:flex absolute lg:-left-42 flex-row gap-3 text-white uppercase tracking-widest text-[9px] lg:text-[11px] font-light">
          <TextParis as='p' className="[writing-mode:vertical-rl] rotate-180支撑 whitespace-nowrap font-medium text-lg">
            El Sendero Café & Restaurant
          </TextParis>
          <p className="[writing-mode:vertical-rl] rotate-180支撑 whitespace-nowrap font-medium text-lg">
            山の中のバーとレストラン
          </p>
          <p className="[writing-mode:vertical-rl] rotate-180支撑 whitespace-nowrap font-medium text-lg">
            道路咖啡馆和餐厅
          </p>
          <p className="[writing-mode:vertical-rl] rotate-180支撑 whitespace-nowrap font-medium text-lg">
            የበረሃ ካፌ እና ምግብ ቤት
          </p>
          <p className="[writing-mode:vertical-rl] rotate-180支撑 whitespace-nowrap font-medium text-lg">
            مقهى ومطعم الطريق
          </p>
        </div>

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