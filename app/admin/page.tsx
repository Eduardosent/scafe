'use client'

import React from 'react'
import Image from 'next/image'
import { Edit2, Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui'
import { Product } from '@/types/api'
import { ProductTable } from '@/components/ui/admin/ui'

const MOCK_PRODUCTS: Product[] = [
  {
    id: '01',
    title: 'Café de Especialidad - Bourbon',
    description: 'Notas de chocolate y caramelo de San Juan Talpa.',
    price: 18.50,
    category_ids: ['Café', 'Grano'],
    images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400&auto=format&fit=crop'],
    created_at: '2026-03-20T10:00:00Z'
  },
  {
    id: '02',
    title: 'Prensa Francesa',
    description: 'Acero inoxidable, capacidad 800ml.',
    price: 35.00,
    category_ids: ['Accesorios'],
    images: ['https://images.unsplash.com/photo-1544190153-060cb6bb3a0a?q=80&w=400&auto=format&fit=crop'],
    created_at: '2026-03-22T14:30:00Z'
  }
]

export default function AdminPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-10">
      {/* Header con Flexbox Real - Sin encimarse */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 border-b border-black pb-10">
        <div className="space-y-4">
          <h1 className="text-6xl font-black uppercase tracking-tighter italic leading-none text-black">
            Inventario
          </h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-black/40 font-bold">
            Control de productos / Sendero Café
          </p>
        </div>
        
        <Button variant="fit" className="!h-16 !px-12 shrink-0 shadow-lg hover:translate-y-[-2px]">
          <Plus size={18} className="mr-3" />
          <span>Add Product</span>
        </Button>
      </header>

      <div className='mx-4'>
        <ProductTable/>
      </div>
    </div>
  )
}