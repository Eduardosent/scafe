// "use client";

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useTranslations } from 'next-intl';
// import { LanguageSwitcher, TextParis } from '../ui';

// export const Navbar: React.FC = () => {
//   // Hook apuntando a la jerarquía Landing -> Navbar
//   const t = useTranslations('Landing.Navbar');

//   return (
//     <nav className="fixed top-0 left-0 w-full h-20 bg-[#0a0a0a] border-b border-white/10 z-[100] flex items-center">
//       <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 md:px-10">
        
//         {/* --- LOGO BLANCO --- */}
//         <Link href="/" className="relative flex items-center gap-3 group">
//           <div className="relative w-12 h-12 md:w-16 md:h-16">
//             <Image
//               src="/logo.jpg"
//               alt="El Sendero Café Logo"
//               fill
//               className="object-contain invert brightness-200"
//               priority
//             />
//           </div>
//           <TextParis className="hidden sm:block font-bold text-white tracking-tight text-3xl">
//             El Sendero Café
//           </TextParis>
//         </Link>

//         {/* ACCIONES */}
//         <div className="flex items-center gap-4 md:gap-6">
//           {/* AQUÍ VA EL SWITCHER */}
//           <LanguageSwitcher />

//           <Link href="/products">
//             <button className="bg-white text-black px-5 py-2.5 md:px-8 md:py-3 rounded-full text-sm font-semibold transition-all hover:bg-stone-200">
//               {t('viewProducts')}
//             </button>
//           </Link>
//         </div>

//       </div>
//     </nav>
//   );
// };

"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageSwitcher, TextParis } from '../ui';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-[#0a0a0a] border-b border-white/10 z-[100] flex items-center mx-0">
      {/* El Switcher ahora vive en la esquina absoluta de la pantalla */}
      <div className="fixed top-4 right-6 z-[110]">
        <LanguageSwitcher />
      </div>

      <div className="max-w-7xl mx-auto w-full flex items-center md:pl-10 justify-between">
        {/* LOGO */}
        <Link href="/" className="relative flex items-center gap-3 group">
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image
              src="/logo.jpg"
              alt="El Sendero Café Logo"
              fill
              className="object-contain invert brightness-200"
              priority
            />
          </div>
          <TextParis className="hidden sm:block font-bold text-white tracking-tight text-3xl">
            El Sendero Café
          </TextParis>
        </Link>
        <div className='flex flex-row'>
          <div className='flex flex-col justify-evenly w-40'>
            <TextParis className="hidden sm:block font-medium text-white tracking-tight text-xl">
              about
            </TextParis>
            <Link href="/menu">
            <TextParis className="hidden sm:block font-medium text-white tracking-tight text-xl">
              menu
            </TextParis>
            </Link>
            <TextParis className="hidden sm:block font-medium text-white tracking-tight text-xl">
              order online
            </TextParis>
          </div>
          <div className='flex flex-col justify-evenly w-70 border-l border-white'>
            <TextParis className="ml-6 font-medium text-white tracking-tight text-2xl">
              mining supplies
            </TextParis>
            <TextParis className="ml-6 font-medium text-white tracking-tight text-2xl">
              book a table
            </TextParis>
          </div>
        </div>
      </div>
    </nav>
  );
};