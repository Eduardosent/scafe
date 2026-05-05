'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TextParis } from '@/components/ui';
import { Calendar } from '@/components/forms/inputs';
import { useEvents } from '@/hooks/queries';
import { Event, EventFilters } from '@/types/api';
import { R2_URL } from '@/config';

// --- COMPONENTE INTERNO: EVENT CARD ---
const EventCard = ({ event }: { event: Event }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const currentYear = 2026;

  useEffect(() => {
    if (!event.images || event.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % event.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [event.images]);

  const formatEventDates = () => {
    if (!event.event_dates || event.event_dates.length === 0) return "TBD";
    
    const sortedDates = [...event.event_dates].sort((a, b) => a.date.localeCompare(b.date));
    const start = new Date(sortedDates[0].date + 'T00:00:00');
    const end = new Date(sortedDates[sortedDates.length - 1].date + 'T00:00:00');

    const hasDifferentYear = start.getFullYear() !== currentYear || end.getFullYear() !== currentYear;
    
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short',
      ...(hasDifferentYear && { year: 'numeric' })
    };

    const startStr = start.toLocaleDateString('es-ES', options);
    if (start.getTime() === end.getTime()) return startStr;

    const endStr = end.toLocaleDateString('es-ES', options);
    return `${startStr} — ${endStr}`;
  };

  return (
    <article className="relative h-[300px] md:h-[350px] w-full border-b border-white/10 group overflow-hidden bg-black">
      {/* Carrusel de Fondo con escala suave */}
      {event.images?.map((img, idx) => (
        <Image
          key={img}
          src={`${R2_URL}${img}`}
          alt={event.title}
          fill
          className={`object-cover brightness-[0.3] transition-all duration-[1500ms] ease-in-out group-hover:grayscale-0 group-hover:scale-105
            ${idx === currentImgIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      <div className="relative z-10 h-full p-10 flex flex-row items-end justify-between">
        <div className="max-w-[60%]">
          <span className="text-white/60 text-xs tracking-widest uppercase block mb-1">
            {formatEventDates()}
          </span>
          <h2 className="text-white text-4xl md:text-6xl tracking-tighter leading-none font-medium">
            {event.title}
          </h2>
          {event.description && (
            <p className="text-white/40 text-sm mt-3 line-clamp-1 font-light italic">
              {event.description}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <span className="text-white text-2xl font-light tracking-tighter block">
              {event.is_free ? 'GRATIS' : `$${Number(event.price).toFixed(2)}`}
            </span>
            {event.capacity && (
              <span className="text-white/40 text-[10px] tracking-widest uppercase block">
                {event.registrations} / {event.capacity} Reservas
              </span>
            )}
          </div>
          
          <button className="group border border-white/40 hover:bg-white transition-all bg-black/20 backdrop-blur-sm">
  <p className="w-full text-sm tracking-tight text-white hover:text-black transition-colors px-8 py-3">
    Reserve
  </p>
</button>
        </div>
      </div>
    </article>
  );
};

// --- PÁGINA PRINCIPAL ---
export default function EventsCalendarPage() {
  const [filter, setFilter] = useState<EventFilters>({
    startDate: null,
    endDate: null
  });
  
  const { data: paginatedEvents } = useEvents(filter);

  const handleFilterChange = (range: { start: Date | null; end: Date | null }) => {
    // Formateo manual a YYYY-MM-DD para evitar problemas de zona horaria si fuera necesario
    const startStr = range.start ? range.start.toISOString().split('T')[0] : null;
    const endStr = range.end ? range.end.toISOString().split('T')[0] : null;

    setFilter({
      ...filter,
      startDate: startStr,
      endDate: endStr
    });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <header className="text-center mb-16">
          <TextParis as="h1" className="text-5xl md:text-8xl tracking-tighter leading-none font-light text-white">
            Events Calendar
          </TextParis>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10">
          
          {/* LADO IZQUIERDO: CALENDARIO */}
          <section className="lg:col-span-4 border-r border-white/10 p-8 bg-white/[0.02]">
            <Calendar onChange={handleFilterChange} />
          </section>

          {/* LADO DERECHO: LISTA DINÁMICA */}
          <section className="lg:col-span-8 flex flex-col bg-black min-h-[400px]">
            {paginatedEvents?.data && paginatedEvents.data.length > 0 ? (
              paginatedEvents.data.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center p-20 opacity-20">
                <p className="text-white text-xl uppercase tracking-[0.3em]">No hay eventos</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}