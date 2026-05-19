// 'use client';

// import React, { useRef } from 'react';
// import Image from 'next/image';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useTranslations } from 'next-intl';
// import { TextParis } from '../ui/text-paris';

// export const ExperiencesSection: React.FC = () => {
//   const t = useTranslations('Landing.Experiences');
//   const containerRef = useRef(null);
  
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   // Las experiencias ahora se definen dentro para usar las traducciones
//   const experiences = [
//     {
//       title: t('spitFired'),
//       description: t('spitFiredDesc'),
//       bgColor: "bg-[#C2C0B8]",
//       image: "/carne.jpg",
//       strength: 80 
//     },
//     {
//       title: t('teasCoffees'),
//       description: t('teasCoffeesDesc'),
//       bgColor: "bg-[#2ECC71]",
//       image: "/cafe.jpg",
//       strength: -40 
//     },
//     {
//       title: t('pastriesSnacks'),
//       description: t('pastriesSnacksDesc'),
//       bgColor: "bg-[#C2C0B8]",
//       image: "/postre.jpg",
//       strength: 120
//     }
//   ];

//   return (
//     <section ref={containerRef} className="bg-black text-white py-24 px-4 overflow-hidden">
//       <div className="max-w-[1200px] mx-auto">
        
//         {/* Título de Sección */}
//         <div className="border-b border-white/20 mb-12 pb-4">
//           <TextParis as="h2" className="text-4xl md:text-6xl uppercase tracking-tighter leading-tight">
//             {t('mainTitle')}
//           </TextParis>
//         </div>

//         {/* Grid de Experiencias */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
//           {experiences.map((exp, index) => {
//             const y = useTransform(
//               scrollYProgress, 
//               [0, 0.5, 1], 
//               [exp.strength, 0, -exp.strength]
//             );

//             return (
//               <motion.div 
//                 key={index} 
//                 style={{ y }} 
//                 className="flex flex-col"
//               >
//                 {/* Bloque de Color */}
//                 <div className={`${exp.bgColor} text-black p-5 min-h-[180px] md:min-h-[220px] flex flex-col justify-start`}>
//                   <TextParis as="h3" className="text-2xl md:text-3xl mb-3 leading-none uppercase">
//                     {exp.title}
//                   </TextParis>
//                   <p className="text-sm md:text-base leading-tight font-medium">
//                     {exp.description}
//                   </p>
//                 </div>

//                 {/* Imagen Base */}
//                 <div className="relative w-full h-[200px] md:h-[240px]">
//                   <Image
//                     src={exp.image}
//                     alt={exp.title}
//                     fill
//                     className="object-cover"
//                     priority={index === 0}
//                   />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TextParis } from '../ui/text-paris';

export const ExperiencesSection: React.FC = () => {
  const t = useTranslations('Landing.Experiences');

  const experiences = [
    {
      title: t('spitFired'),
      description: t('spitFiredDesc'),
      verticalTexts: ["烤肉串或烤肉", "やきとり & 揚げ物", "የጥብስ ስጋ", "لحم مشوي"],
      bgColor: "bg-[#C2C0B8]",
      image: "/carne.jpg",
    },
    {
      title: t('teasCoffees'),
      description: t('teasCoffeesDesc'),
      verticalTexts: ["茶和甜飲料", "紅茶と甘い飲み物", "ሻይ እና ጣፋጭ መጠጦች", "الشاي والمشروبات الحلوة"],
      bgColor: "bg-[#2ECC71]",
      image: "/cafe.jpg",
    },
    {
      title: t('pastriesSnacks'),
      description: t('pastriesSnacksDesc'),
      verticalTexts: ["糕點和小吃", "ペストリーと軽食", "መጋገሪያዎች እና መክሰስ", "المعجنات والوجبات الخفيفة"],
      bgColor: "bg-[#C2C0B8]",
      image: "/postre.jpg",
    }
  ];

  return (
    <section className="bg-black text-white py-24 px-4 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="border-b border-white/20 mb-12 pb-4">
          <TextParis as="p" className="text-center text-4xl md:text-8xl tracking-tighter leading-tight font-[300]">
            {t('mainTitle')}
          </TextParis>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {experiences.map((exp, index) => (
            <div key={index} className="flex flex-col">
              
              {/* Bloque de Texto */}
              <div className={`${exp.bgColor} text-black p-5 min-h-[220px] md:min-h-[260px] flex flex-col justify-start`}>
                <TextParis as="h3" className="text-2xl md:text-4xl mb-3 leading-none font-[500]">
                  {exp.title}
                </TextParis>

                {/* Contenedor Flex para poner el texto vertical a la par de la descripción */}
                <div className="flex flex-row justify-between items-start flex-grow gap-2">
                  
                  {/* Descripción (Izquierda) */}
                  <div className="max-w-[180px] md:max-w-[220px]">
                    <TextParis as="p" className="text-xl md:text-2xl leading-[1] font-medium tracking-[-0.05em] font-[500]">
                      {exp.description}
                    </TextParis>
                  </div>

                  {/* Texto Vertical (Derecha) */}
                  <div className="flex flex-row-reverse gap-1 pr-2">
                    {exp.verticalTexts.map((text, i) => (
                      <p 
                        key={i}
                        className="text-[10px] md:text-[11px]"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                      >
                        {text}
                      </p>
                    ))}
                  </div>

                </div>
              </div>

              {/* Imagen */}
              <div className="relative w-full h-[200px] md:h-[240px] overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  priority={index === 0}
                  quality={85}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};