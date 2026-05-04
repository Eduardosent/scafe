// 'use client';
// import { useState, useEffect } from 'react';
// import { TextParis } from '@/components/ui';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface CalendarProps {
//   onChange?: (range: { start: Date | null; end: Date | null }) => void;
// }

// export function Calendar({ onChange }: CalendarProps) {
//   const [start, setStart] = useState<Date | null>(null);
//   const [end, setEnd] = useState<Date | null>(null);
  
//   // 1. El mes por defecto ahora es el actual
//   const [viewDate, setViewDate] = useState(() => {
//     const now = new Date();
//     return new Date(now.getFullYear(), now.getMonth(), 1);
//   });

//   const currentYear = viewDate.getFullYear();
//   const currentMonth = viewDate.getMonth();

//   const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//   const monthNames = [
//     'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
//     'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
//   ];

//   const handlePrevMonth = () => setViewDate(new Date(currentYear, currentMonth - 1, 1));
//   const handleNextMonth = () => setViewDate(new Date(currentYear, currentMonth + 1, 1));

//   const handleDateClick = (day: number) => {
//     const clickedDate = new Date(currentYear, currentMonth, day);
//     if (!start || (start && end)) {
//       setStart(clickedDate);
//       setEnd(null);
//     } else {
//       if (clickedDate.getTime() === start.getTime()) {
//         setStart(null);
//         setEnd(null);
//       } else if (clickedDate < start) {
//         setStart(clickedDate);
//         setEnd(null);
//       } else {
//         setEnd(clickedDate);
//       }
//     }
//   };

//   useEffect(() => {
//     if (onChange) onChange({ start, end });
//   }, [start, end, onChange]);

//   return (
//     <div className="w-full bg-black select-none">
//       <div className="mb-8 flex justify-between items-center px-2">
//         {/* 2. Iconos reales en lugar de texto 3xl */}
//         <button 
//           onClick={handlePrevMonth} 
//           className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all"
//         >
//           <ChevronLeft size={20} />
//         </button>
        
//         <TextParis className="text-white text-2xl font-medium lowercase tracking-widest">
//           {monthNames[currentMonth]} {currentYear}
//         </TextParis>

//         <button 
//           onClick={handleNextMonth} 
//           className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all"
//         >
//           <ChevronRight size={20} />
//         </button>
//       </div>

//       <div className="grid grid-cols-7 gap-2 text-center">
//         {['d', 'l', 'm', 'm', 'j', 'v', 's'].map((d, i) => (
//           <TextParis key={`${d}-${i}`} className="text-white/30 text-lg mb-2 lowercase">
//             {d}
//           </TextParis>
//         ))}
        
//         {Array.from({ length: firstDayOfMonth }).map((_, i) => (
//           <div key={`empty-${i}`} className="aspect-square" />
//         ))}

//         {Array.from({ length: daysInMonth }).map((_, i) => {
//           const day = i + 1;
//           const d = new Date(currentYear, currentMonth, day);
//           const isStart = start?.getTime() === d.getTime();
//           const isEnd = end?.getTime() === d.getTime();
//           const inRange = start && end && d > start && d < end;

//           return (
//             <div
//               key={`${currentMonth}-${day}`}
//               onClick={() => handleDateClick(day)}
//               className={`
//                 aspect-square flex items-center justify-center border transition-all duration-200 cursor-pointer text-sm
//                 ${isStart || isEnd ? 'bg-white text-black border-white' : 'border-white/5 text-white/70 hover:border-white/40'}
//                 ${inRange ? 'bg-white/10' : ''}
//               `}
//             >
//               <TextParis className="lowercase leading-none">{day}</TextParis>
//             </div>
//           );
//         })}
//       </div>

//       {start && (
//         <div className="mt-6 flex justify-between items-center border-t border-white/10 pt-4 px-2">
//           <TextParis className="text-[10px] text-white/40 lowercase tracking-[0.2em]">
//             {start.toLocaleDateString('es')} {end ? `— ${end.toLocaleDateString('es')}` : '(fecha única)'}
//           </TextParis>
//           <button 
//             onClick={() => { setStart(null); setEnd(null); }}
//             className="text-[10px] text-white/20 hover:text-white lowercase border-b border-white/10"
//           >
//             clear
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import { TextParis } from '@/components/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  // Añadimos value para que sea compatible con React Hook Form y filtros externos
  value?: { start: Date | null; end: Date | null };
  onChange?: (range: { start: Date | null; end: Date | null }) => void;
}

export function Calendar({ value, onChange }: CalendarProps) {
  // Inicializamos el estado interno con lo que venga por props (si existe)
  const [start, setStart] = useState<Date | null>(value?.start || null);
  const [end, setEnd] = useState<Date | null>(value?.end || null);
  
  const [viewDate, setViewDate] = useState(() => {
    // Si viene una fecha de inicio, mostramos ese mes, si no, el actual
    const baseDate = value?.start || new Date();
    return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  });

  // Sincronización: Si el valor externo cambia (reset de formulario o filtros),
  // actualizamos el estado interno.
  useEffect(() => {
    setStart(value?.start || null);
    setEnd(value?.end || null);
  }, [value]);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const handlePrevMonth = () => setViewDate(new Date(currentYear, currentMonth - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(currentYear, currentMonth + 1, 1));

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    let newStart: Date | null = start;
    let newEnd: Date | null = end;

    if (!start || (start && end)) {
      newStart = clickedDate;
      newEnd = null;
    } else {
      if (clickedDate.getTime() === start.getTime()) {
        newStart = null;
        newEnd = null;
      } else if (clickedDate < start) {
        newStart = clickedDate;
        newEnd = null;
      } else {
        newEnd = clickedDate;
      }
    }

    // Actualizamos estado local
    setStart(newStart);
    setEnd(newEnd);

    // Notificamos al padre inmediatamente
    if (onChange) {
      onChange({ start: newStart, end: newEnd });
    }
  };

  const clearDates = () => {
    setStart(null);
    setEnd(null);
    if (onChange) onChange({ start: null, end: null });
  };

  return (
    <div className="w-full bg-black p-8 select-none shadow-2xl">
      {/* Header: Mes y Navegación */}
      <div className="mb-8 flex justify-between items-center px-2">
        <button 
          type="button"
          onClick={handlePrevMonth} 
          className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        
        <TextParis className="text-white text-2xl font-medium lowercase tracking-widest">
          {monthNames[currentMonth]} {currentYear}
        </TextParis>

        <button 
          type="button"
          onClick={handleNextMonth} 
          className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Grid del Calendario */}
      <div className="grid grid-cols-7 text-center">
        {['d', 'l', 'm', 'm', 'j', 'v', 's'].map((d, i) => (
          <TextParis key={`${d}-${i}`} className="text-white/30 text-lg mb-4 lowercase">
            {d}
          </TextParis>
        ))}
        
        {/* Espacios vacíos */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Días del mes */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const d = new Date(currentYear, currentMonth, day);
          const isStart = start?.getTime() === d.getTime();
          const isEnd = end?.getTime() === d.getTime();
          const inRange = start && end && d > start && d < end;

          return (
            <div
              key={`${currentMonth}-${day}`}
              onClick={() => handleDateClick(day)}
              className={`
                aspect-square flex items-center justify-center border transition-all duration-200 cursor-pointer text-base
                ${isStart || isEnd 
                  ? 'bg-white text-black border-white font-bold' 
                  : 'border-white/5 text-white/70 hover:border-white/40'}
                ${inRange ? 'bg-white/10' : ''}
              `}
            >
              <TextParis className="lowercase leading-none">{day}</TextParis>
            </div>
          );
        })}
      </div>

      {/* Footer: Resumen y Limpieza */}
      {start && (
        <div className="mt-10 flex justify-between items-center border-t border-white/10 pt-6 px-2">
          <div className="flex flex-col">
            <TextParis className="text-xs text-white/40 lowercase tracking-[0.2em]">
              {start.toLocaleDateString('es')} {end ? `— ${end.toLocaleDateString('es')}` : '(fecha única)'}
            </TextParis>
          </div>
          <button 
            type="button"
            onClick={clearDates}
            className="text-xs text-white/20 hover:text-white lowercase border-b border-white/10"
          >
            clear
          </button>
        </div>
      )}
    </div>
  );
}