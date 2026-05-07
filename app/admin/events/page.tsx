'use client'

import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui'
import { EventTable } from '@/components/admin/events'
import Link from 'next/link'
import { useEvents } from '@/hooks/queries'

export default function EventPage() {
  const { data: pagination } = useEvents()

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Contenedor del encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Eventos</h1>
        
        {/* Enlace al formulario de creación */}
        <Link href="/admin/events/add">
          <Button className="flex items-center gap-2">
            <Plus className="size-4" />
            Nuevo Evento
          </Button>
        </Link>
      </div>

      {/* Tabla debajo */}
      <div className="w-full">
        <EventTable events={pagination?.data ?? []} />
      </div>
    </div>
  )
}