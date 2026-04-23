  // "use client";

  // import { useState, useEffect } from 'react';
  // import { getCookie, setCookie } from 'cookies-next';
  // import { useRouter } from 'next/navigation';
  // import { useLocale } from 'next-intl';

  // export const LanguageSwitcher = () => {
  //   const router = useRouter();
  //   const locale = useLocale();
  //   const [mounted, setMounted] = useState(false);

  //   // Evitamos errores de hidratación
  //   useEffect(() => {
  //     setMounted(true);
  //   }, []);

  //   const toggleLanguage = () => {
  //     const nextLocale = locale === 'es' ? 'en' : 'es';
      
  //     // 1. Seteamos la cookie que manda en el i18n config
  //     setCookie('NEXT_LOCALE', nextLocale, { maxAge: 60 * 60 * 24 * 365 });
      
  //     // 2. Refrescamos para que el server renderice con el nuevo json sin cambiar la URL
  //     router.refresh();
  //   };

  //   if (!mounted) return null;

  //   return (
  //     <button
  //       onClick={toggleLanguage}
  //       className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full transition-all duration-300 group active:scale-95"
  //     >
  //       <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[10px] font-bold text-black uppercase">
  //         {locale}
  //       </div>
  //       <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 group-hover:text-white transition-colors">
  //         {locale === 'es' ? 'English' : 'Español'}
  //       </span>
  //     </button>
  //   );
  // };

"use client";
import { useState, useEffect } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggle = () => {
    setCookie('NEXT_LOCALE', locale === 'es' ? 'en' : 'es');
    router.refresh();
  };

  if (!mounted) return null;

  return (
    <button 
      onClick={toggle}
      className="group flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 rounded-full hover:bg-white/10 transition-all active:scale-95"
    >
      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white text-[8px] font-black text-black uppercase">
        {locale}
      </span>
      <span className="text-[9px] font-bold tracking-widest text-zinc-400 group-hover:text-zinc-100 uppercase">
        {locale === 'es' ? 'EN' : 'ES'}
      </span>
    </button>
  );
};