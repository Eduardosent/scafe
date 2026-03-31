'use client'

import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui'
import { ProductTable } from '@/components/admin'
import Link from 'next/link'
import { useProducts } from '@/hooks/queries'

export default function AdminPage() {
  const { data: products } = useProducts()
  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Contenedor del encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        
        {/* Enlace al formulario de creación */}
        <Link href="/admin/add">
          <Button className="flex items-center gap-2">
            <Plus className="size-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      {/* Tabla debajo */}
      <div className="w-full">
        <ProductTable products={products ?? []} />
      </div>
    </div>
  )
}