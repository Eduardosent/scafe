'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ProductFormInput, productSchema, type ProductFormValues } from '@/types/forms/product'
import { useCategories, useCreateProduct } from '@/hooks/queries'

export default function NewProductPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ProductFormInput, any, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      category_ids: []
    }
  })

  const { data: categories } = useCategories()
  const { mutate: createProduct, isPending } = useCreateProduct()

  const selectedCategories = watch('category_ids') || []

  const toggleCategory = (id: string) => {
    const next = selectedCategories.includes(id) 
      ? selectedCategories.filter(c => c !== id) 
      : [...selectedCategories, id]
    setValue('category_ids', next, { shouldValidate: true })
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="size-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Nuevo Producto</h1>
      </div>

      <form 
        onSubmit={handleSubmit((data) => {
          createProduct(data, {
            onSuccess: () => {
              router.push('/admin');
            }
          });
        })}
        className="space-y-6 bg-white p-8 border rounded-xl shadow-sm"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <input 
            {...register('title')} 
            placeholder="Ej. Café de Especialidad Bourbon"
            className="w-full p-2 border rounded-md outline-none focus:ring-1 focus:ring-black" 
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción</label>
          <textarea 
            {...register('description')} 
            rows={4} 
            placeholder="Describe las notas de cata, origen o características del producto..."
            className="w-full p-2 border rounded-md outline-none focus:ring-1 focus:ring-black resize-none" 
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Precio ($)</label>
            <input 
              type="number" 
              step="0.01" 
              {...register('price')} 
              placeholder="0.00"
              className="w-full p-2 border rounded-md outline-none focus:ring-1 focus:ring-black" 
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Categorías</label>
            <div className="flex flex-wrap gap-2">
              {categories?.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all ${
                    selectedCategories.includes(cat.id)
                      ? 'bg-black text-white border-black'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            {errors.category_ids && <p className="text-red-500 text-xs mt-1">{errors.category_ids.message}</p>}
          </div>
        </div>

        <div className="pt-4 border-t mt-8 flex justify-end">
          <Button 
            type="submit"
            disabled={isPending}
            className="w-full md:w-auto"
          >
            <Plus className="size-4 mr-2" />
            {isPending ? 'Agregando...' : 'Agregar Producto'}
          </Button>
        </div>
      </form>
    </div>
  )
}