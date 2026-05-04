'use client'

import React from 'react'
import Link from 'next/link'
import { Package, Calendar } from 'lucide-react'

export default function AdminDashboard() {
  const adminModules = [
    {
      title: 'Productos',
      description: 'Gestionar el catálogo de café y bebidas',
      href: '/admin/products',
      icon: <Package className="size-8" />,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Eventos',
      description: 'Organizar talleres, catas y música en vivo',
      href: '/admin/events',
      icon: <Calendar className="size-8" />,
      color: 'bg-blue-100 text-blue-600',
    },
  ]

  return (
    <div className="flex flex-col gap-8 p-8 max-w-5xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Panel de Administración</h1>
        <p className="text-slate-500">Selecciona el módulo que deseas gestionar</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminModules.map((module) => (
          <Link 
            key={module.href} 
            href={module.href}
            className="group p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-slate-300 flex flex-col gap-4"
          >
            <div className={`p-3 w-fit rounded-xl ${module.color} group-hover:scale-110 transition-transform`}>
              {module.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800">{module.title}</h2>
              <p className="text-slate-500 text-sm">{module.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}