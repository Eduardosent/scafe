"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-white shadow-sm z-[100] flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 md:px-10">
        
        {/* --- LOGO SIN RECORTES --- */}
        <Link href="/" className="relative flex items-center gap-3 group">
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image
              src="/logo.jpg"
              alt="El Sendero Café Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="hidden sm:block font-bold text-black tracking-tight text-xl">
            EL SENDERO <span className="text-stone-500">CAFÉ</span>
          </span>
        </Link>

        {/* --- ACCIÓN --- */}
        <div className="flex items-center">
          <Link href="/products">
            <button className="bg-black text-white px-5 py-2.5 md:px-8 md:py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg active:scale-95">
              Ver Productos
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
};