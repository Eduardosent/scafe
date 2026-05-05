import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Event } from "@/types/api";
import { Edit2, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { R2_URL } from "@/config";

export const EventTable = ({ events }: { events: Event[] }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="rounded-lg border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-neutral-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-10 px-4 font-bold text-neutral-400 tracking-wider uppercase text-[9px]">
                Evento
              </TableHead>
              <TableHead className="h-10 px-4 font-bold text-neutral-400 tracking-wider uppercase text-[9px]">
                Estado / Precio
              </TableHead>
              <TableHead className="h-10 px-4 font-bold text-neutral-400 tracking-wider uppercase text-[9px]">
                Asistencia
              </TableHead>
              <TableHead className="h-10 px-4 font-bold text-neutral-400 tracking-wider uppercase text-[9px]">
                Días del Evento
              </TableHead>
              <TableHead className="h-10 px-4 text-right font-bold text-neutral-400 tracking-wider uppercase text-[9px]">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.map((event) => (
              <TableRow key={event.id} className="hover:bg-neutral-50/40 transition-colors">
                {/* 1. Imagen (100x50) y Título */}
                <TableCell className="py-2 px-4">
                  <div className="flex items-center gap-3">
                    {/* Contenedor con medidas fijas e inyectadas */}
                    <div 
                      className="flex-shrink-0 overflow-hidden rounded-md border border-neutral-100"
                      style={{ width: '100px', height: '50px', minWidth: '100px', minHeight: '50px' }}
                    >
                      <img
                        src={`${R2_URL}${event.images[0]}`}
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-neutral-900 text-sm leading-tight truncate max-w-[180px]">
                        {event.title}
                      </span>
                      <span className="text-neutral-400 text-[10px] mt-0.5">
                        {new Date(event.created_at).toLocaleDateString('es')}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* 2. Precio / Gratis */}
                <TableCell className="py-2 px-4">
                  {event.is_free ? (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-green-50 text-green-600 font-bold border border-green-100 uppercase">
                      Gratis
                    </span>
                  ) : (
                    <span className="font-semibold text-neutral-900 text-sm tabular-nums">
                      ${Number(event.price).toFixed(2)}
                    </span>
                  )}
                </TableCell>

                {/* 3. Registros / Capacidad */}
                <TableCell className="py-2 px-4">
                  <div className="flex items-center gap-1.5 text-neutral-500">
                    <Users className="size-3" />
                    <span className="text-[11px] font-medium">
                      {event.registrations} / {event.capacity ?? "∞"}
                    </span>
                  </div>
                </TableCell>

                {/* 4. Fechas del Evento */}
                <TableCell className="py-2 px-4">
                  <div className="flex gap-1 flex-wrap max-w-[150px]">
                    {event.event_dates.map((date) => (
                      <span
                        key={date.id}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 border border-neutral-200/50"
                      >
                        {new Date(date.date).toLocaleDateString('es', { day: '2-digit', month: 'short' })}
                      </span>
                    ))}
                  </div>
                </TableCell>

                {/* 5. Acciones */}
                <TableCell className="py-2 px-4 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="size-7 text-neutral-400 hover:text-blue-600">
                      <Edit2 className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-7 text-neutral-400 hover:text-red-600">
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};