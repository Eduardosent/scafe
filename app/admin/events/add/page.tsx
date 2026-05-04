'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EventForm } from '@/components/forms/event-form'
import { type EventFormValues } from '@/types/forms/event'
import { useCreateEvent } from '@/hooks/queries' // Hook que acabamos de crear

export default function NewEventPage() {
  // Inicializamos la mutación
  const { mutate, isPending } = useCreateEvent()
  
  const handleCreateEvent = (data: EventFormValues) => {
    // La data ya viene validada por Zod desde el EventForm
    // El hook se encarga de convertir todo a FormData internamente
    mutate(data)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header con navegación atrás */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full border-black hover:bg-black hover:text-white transition-colors"
            disabled={isPending}
          >
            <ChevronLeft className="size-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">Crear Evento</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">El Sendero Café • Panel de Administración</p>
        </div>
      </div>

      {/* Formulario conectado al hook de TanStack Query */}
      <EventForm 
        onSubmit={handleCreateEvent} 
        isPending={isPending} 
      />

      {/* Footer informativo opcional */}
      <div className="mt-8 p-4 border border-dashed border-gray-300">
        <p className="text-[10px] text-gray-400 uppercase leading-relaxed">
          Asegúrate de que las imágenes tengan buena resolución. Los eventos publicados aparecerán 
          automáticamente en la cartelera principal ordenados por fecha de inicio.
        </p>
      </div>
    </div>
  )
}