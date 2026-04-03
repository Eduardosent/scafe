"use client";

import React, { useState, useEffect, useCallback, Fragment } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  gridClasses: string;
}

const images: GalleryItem[] = [
  { id: 1, src: '/galery-1.jpg', alt: 'Gallery Image 1', gridClasses: 'md:col-span-2 md:row-span-2' },
  { id: 2, src: '/galery-2.jpg', alt: 'Gallery Image 2', gridClasses: 'md:col-span-1 md:row-span-1' },
  { id: 3, src: '/galery-3.jpg', alt: 'Gallery Image 3', gridClasses: 'md:col-span-1 md:row-span-1' },
  { id: 4, src: '/galery-4.jpg', alt: 'Gallery Image 4', gridClasses: 'md:col-span-2 md:row-span-1' },
  { id: 5, src: '/galery-5.jpg', alt: 'Gallery Image 5', gridClasses: 'md:col-span-1 md:row-span-1' },
  { id: 6, src: '/galery-6.jpg', alt: 'Gallery Image 6', gridClasses: 'md:col-span-1 md:row-span-1' },
  { id: 7, src: '/galery-7.jpg', alt: 'Gallery Image 7', gridClasses: 'md:col-span-1 md:row-span-1' },
  { id: 8, src: '/galery-8.jpg', alt: 'Gallery Image 8', gridClasses: 'md:col-span-1 md:row-span-1' },
];

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const showNext = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    setSelectedImage(images[(currentIndex + 1) % images.length]);
  }, [selectedImage]);

  const showPrev = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]);
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, showNext, showPrev]);

  return (
    <>
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black uppercase tracking-tighter">Nuestra Galería</h2>
            <div className="w-20 h-1 bg-black mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[150px] md:auto-rows-[250px]">
            {images.map((img) => (
              <div
                key={img.id}
                className={`relative overflow-hidden group bg-zinc-100 cursor-pointer ${img.gridClasses}`}
                onClick={() => setSelectedImage(img)}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-white border-2 border-white px-4 py-2 text-xs font-bold uppercase tracking-widest">View Space</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Transition appear show={!!selectedImage} as={Fragment}>
        <Dialog as="div" className="relative z-[200]" onClose={() => setSelectedImage(null)}>
          <div className="fixed inset-0 bg-black/95 transition-opacity" />

          <div className="fixed inset-0 z-10 overflow-hidden">
            <div className="flex h-full flex-col items-center justify-center p-4">
              
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center">
                  
                  {/* --- BOTÓN CERRAR (CORREGIDO) --- */}
                  <button 
                    onClick={() => setSelectedImage(null)} 
                    // Se ha movido más hacia adentro y añadido un fondo para que destaque.
                    className="absolute top-4 right-4 md:top-6 md:right-6 text-white bg-black/50 hover:bg-black/80 z-[60] p-3 rounded-full transition-colors"
                    aria-label="Close Gallery"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* ÁREA DE IMAGEN CENTRAL */}
                  <div className="relative w-full flex-grow flex items-center justify-center group mt-12 md:mt-16">
                    {selectedImage && (
                      <div className="relative w-full h-full max-h-[70vh]">
                        <Image
                          src={selectedImage.src}
                          alt={selectedImage.alt}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    )}

                    {/* NAVEGACIÓN LATERAL */}
                    <button onClick={showPrev} className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={showNext} className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>

                  {/* MINIATURAS CENTRADAS */}
                  <div className="w-full flex justify-center mt-8 gap-2 overflow-x-auto py-2">
                    {images.map((img) => (
                      <div
                        key={img.id}
                        onClick={() => setSelectedImage(img)}
                        className={`relative flex-shrink-0 w-16 h-12 md:w-24 md:h-16 cursor-pointer transition-all duration-300 ${
                          selectedImage?.id === img.id ? 'ring-2 ring-white scale-110 opacity-100' : 'opacity-40 hover:opacity-100'
                        }`}
                      >
                        <Image src={img.src} alt={img.alt} fill className="object-cover rounded-sm" />
                      </div>
                    ))}
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};