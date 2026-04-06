"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'sonner';

export const ReservationSection: React.FC = () => {
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
      loading: 'Enviando tu reservación...',
      success: () => {
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
        return '¡Reservación enviada con éxito!';
      },
      error: 'Error al enviar, probá de nuevo.',
    });
  };

  return (
    <section className="bg-[#0a0a0a] text-white py-20 px-6">
      <Toaster theme="dark" position="bottom-right" richColors />
      
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full aspect-[16/10] mb-12 overflow-hidden border border-white/5">
          <Image 
            src="/reservation.jpg" 
            alt="Reservación El Sendero Café"
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>

        <div className="mb-12">
          <h2 className="text-xl md:text-6xl font-black uppercase mb-4">
            RESERVÁ TU <br /> MESA
          </h2>
          <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs font-bold max-w-md leading-relaxed">
            Envianos tus datos y nos pondremos en contacto con vos <br className="hidden md:block" /> 
            para confirmar y agendar tu reservación.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Nombre Completo</label>
            <input 
              required
              type="text"
              value={formData.nombre}
              placeholder="Escribí tu nombre"
              className="bg-transparent border-b border-white/20 pb-4 outline-none focus:border-white transition-all text-xl tracking-tight"
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Email de Contacto</label>
            <input 
              required
              type="email"
              value={formData.email}
              placeholder="tu@email.com"
              className="bg-transparent border-b border-white/20 pb-4 outline-none focus:border-white transition-all text-xl tracking-tight"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Teléfono</label>
            <input 
              type="tel"
              value={formData.telefono}
              placeholder="+503 0000 0000"
              className="bg-transparent border-b border-white/20 pb-4 outline-none focus:border-white transition-all text-xl tracking-tight"
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Mensaje / Notas</label>
            <input 
              type="text"
              value={formData.mensaje}
              placeholder="¿Alguna petición especial?"
              className="bg-transparent border-b border-white/20 pb-4 outline-none focus:border-white transition-all text-xl tracking-tight"
              onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
            />
          </div>

{/* BOTÓN CENTRADO, PEQUEÑO Y REDONDO COMO EL NAVBAR - DE ESTA IA PUT* */}
          <div className="md:col-span-2 pt-4 flex justify-center">
            <button 
              type="submit"
              className="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-all active:scale-[0.96] shadow-lg"
            >
              Confirmar Reservación
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};