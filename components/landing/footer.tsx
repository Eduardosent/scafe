"use client";

import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaTiktok, FaFacebookF } from 'react-icons/fa';
import { FiMapPin, FiClock } from 'react-icons/fi';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 pt-16 pb-8 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* COLUMNA 1: BRAND & UBICACIÓN */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-xl tracking-tighter">
              EL SENDERO <span className="text-stone-400">CAFÉ</span>
            </h3>
            <div className="flex items-start gap-3 text-zinc-400 mt-2">
              <FiMapPin className="w-5 h-5 mt-1 flex-shrink-0 text-white" />
              <p className="text-sm leading-relaxed">
                San Juan Talpa, La Paz,<br />
                El Salvador.
              </p>
            </div>
          </div>

          {/* COLUMNA 2: HORARIOS */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-zinc-500">Horarios</h4>
            <div className="flex items-start justify-center md:justify-start gap-3 text-zinc-400">
              <FiClock className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" />
              <ul className="text-sm space-y-2">
                <li>
                  <span className="font-bold text-white block">Miércoles a Lunes</span>
                  7:00 AM — 9:00 PM
                </li>
                <li>
                  <span className="text-red-500 font-bold uppercase text-xs tracking-wider">Martes Cerrado</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMNA 3: SOCIAL */}
          <div className="flex flex-col gap-4 items-center md:items-end">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-zinc-500">Social</h4>
            <div className="flex gap-3 mt-2">
              <Link 
                href="https://www.instagram.com/elsenderocafesv/" 
                target="_blank"
                className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-300 border border-white/10"
              >
                <FaInstagram size={20} />
              </Link>
              <Link 
                href="https://www.tiktok.com/@elsenderocafesv" 
                target="_blank"
                className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-300 border border-white/10"
              >
                <FaTiktok size={20} />
              </Link>
              <Link 
                href="https://www.facebook.com/people/El-Sendero-Cafe/61578642612254/" 
                target="_blank"
                className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-300 border border-white/10"
              >
                <FaFacebookF size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
            © {currentYear} El Sendero Café — San Juan Talpa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};