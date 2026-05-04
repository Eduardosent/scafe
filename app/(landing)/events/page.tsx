'use client';
import { useState } from 'react';
import { TextParis } from '@/components/ui';
import Image from 'next/image';
import { Calendar } from '@/components/forms/inputs'; // Asegúrate de que la ruta sea correcta

const upcomingEvents = [
  { id: 1, name: "Event 1", date: "Sábado 20 Abril", time: "19:00", img: "/event-1.jpg" },
  { id: 2, name: "Event 2", date: "Viernes 26 Abril", time: "20:30", img: "/event-2.jpg" },
  { id: 3, name: "Event 3", date: "Jueves 02 Mayo", time: "18:00", img: "/event-3.jpg" },
];

export default function EventsCalendarPage() {
  const [filter, setFilter] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const handleFilterChange = (range: { start: Date | null; end: Date | null }) => {
    setFilter(range);
    // Aquí podrías filtrar la lista de 'upcomingEvents' basada en el rango
    console.log("Filtrando desde:", range.start, "hasta:", range.end);
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
          
          {/* LADO IZQUIERDO: CALENDARIO INTERACTIVO */}
          <section className="lg:col-span-4 border-r border-white/10 p-8 bg-white/[0.02]">
            <Calendar onChange={handleFilterChange} />
          </section>

          {/* LADO DERECHO: LISTA DE EVENTOS CON IMAGEN DE FONDO */}
          <section className="lg:col-span-8 flex flex-col bg-black">
            {upcomingEvents.map((event) => (
              <article key={event.id} className="relative h-[300px] md:h-[350px] w-full border-b border-white/10 group overflow-hidden">
                {/* Imagen de fondo del evento */}
                <Image 
                  src={event.img} 
                  alt={event.name} 
                  fill 
                  className="object-cover brightness-[0.3] grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                
                <div className="relative z-10 h-full p-10 flex flex-row items-end justify-between">
                  <div>
                    <TextParis className="text-white text-4xl md:text-6xl tracking-tighter leading-none">
                      {event.name}
                    </TextParis>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <TextParis className="text-white/80 text-sm tracking-tight block">
                        {event.date}
                      </TextParis>
                      <TextParis className="text-white/60 text-xs tracking-widest uppercase block">
                        {event.time}
                      </TextParis>
                    </div>
                    
                    <button className="border border-white/40 hover:bg-white hover:text-black transition-all px-8 py-3 bg-black/20 backdrop-blur-sm">
                      <TextParis className="text-sm tracking-tight">
                        Reserve
                      </TextParis>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

        </div>
      </div>
    </main>
  );
}