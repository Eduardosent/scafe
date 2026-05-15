"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'sonner';
import { useTranslations } from 'next-intl';

export const ReservationSection: React.FC = () => {
  const t = useTranslations('Landing.Reservations');
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceID = 'service_47nvla8';
    const templateID = 'template_1ke6epi';
    const publicKey = 'l4sdlpWSYGenWF1l9';

    const templateParams = {
      name: formData.nombre,
      email: formData.email,
      phone: formData.telefono || 'No proporcionado',
      message: formData.mensaje || 'Sin mensaje adicional'
    };

    toast.promise(emailjs.send(serviceID, templateID, templateParams, publicKey), {
      loading: t('toast.loading'),
      success: () => {
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
        return t('toast.success');
      },
      error: t('toast.error'),
    });
  };

  return (
    <section className="bg-[#0a0a0a] text-white py-20 px-6">
      <Toaster theme="dark" position="bottom-right" richColors />
      
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full aspect-[16/10] mb-12 overflow-hidden border border-white/5">
          <Image 
            src="/reservation.jpg" 
            alt="Interior de El Sendero Café - Ambiente para reservaciones" 
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>

        <div className="mb-12">
          <h2 
            className="text-xl md:text-6xl font-black uppercase mb-4"
            dangerouslySetInnerHTML={{ __html: t('title') }}
          />
          <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs font-bold max-w-md leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {/* Campo: Nombre */}
          <div className="flex flex-col gap-3">
            <label 
              htmlFor="nombre-input" 
              className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold"
            >
              {t('nameLabel')}
            </label>
            <input 
              id="nombre-input"
              name="user_name"
              required
              type="text"
              value={formData.nombre}
              placeholder={t('namePlaceholder')}
              className="bg-transparent border-b border-white/20 pb-4 outline-none focus:border-white transition-all text-xl tracking-tight"
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>

          {/* Campo: Email */}
          <div className="flex flex-col gap-3">
            <label 
              htmlFor="email-input" 
              className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold"
            >
              {t('emailLabel')}
            </label>
            <input 
              id="email-input"
              name="user_email"
              required
              type="email"
              value={formData.email}
              placeholder={t('emailPlaceholder')}
              className="bg-transparent border-b border-white/20 pb-4 outline-none focus:border-white transition-all text-xl tracking-tight"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Campo: Teléfono */}
          <div className="flex flex-col gap-3">
            <label 
              htmlFor="telefono-input" 
              className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold"
            >
              {t('phoneLabel')}
            </label>
            <input 
              id="telefono-input"
              name="user_phone"
              type="tel"
              value={formData.telefono}
              placeholder={t('phonePlaceholder')}
              className="bg-transparent border-b border-white/20 pb-4 outline-none focus:border-white transition-all text-xl tracking-tight"
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
            />
          </div>

          {/* Campo: Mensaje */}
          <div className="flex flex-col gap-3">
            <label 
              htmlFor="mensaje-input" 
              className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold"
            >
              {t('messageLabel')}
            </label>
            <input 
              id="mensaje-input"
              name="message"
              type="text"
              value={formData.mensaje}
              placeholder={t('messagePlaceholder')}
              className="bg-transparent border-b border-white/20 pb-4 outline-none focus:border-white transition-all text-xl tracking-tight"
              onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
            />
          </div>

          <div className="md:col-span-2 pt-4 flex justify-center">
            <button 
              type="submit"
              aria-label={t('submitButton')}
              className="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-all active:scale-[0.96] shadow-lg"
            >
              {t('submitButton')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};