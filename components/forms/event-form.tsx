'use client'

import React, { useEffect } from 'react'
import { useForm, useFieldArray, Controller, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Textarea, ImageUploader, Calendar, TimeRangePicker } from '@/components/forms/inputs'
import { eventSchema, type EventFormInput, type EventFormValues } from '@/types/forms/event'
import { Button } from '../ui'

interface EventFormProps {
  onSubmit: (data: EventFormValues) => void
  isPending?: boolean
  defaultValues?: Partial<EventFormInput>
}

export function EventForm({ onSubmit, isPending, defaultValues }: EventFormProps) {
  const form = useForm<EventFormInput, any, EventFormValues>({
    resolver: zodResolver(eventSchema) as unknown as Resolver<EventFormInput>,
    defaultValues: {
      title: "",
      description: "",
      images: [],
      is_free: true,
      price: 0,
      capacity: null,
      start_date: undefined,
      end_date: undefined,
      schedules: [],
      ...defaultValues
    }
  })

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = form
  const { fields, replace } = useFieldArray({ control, name: "schedules" })

  const isFree = watch('is_free')
  const startDate = watch('start_date') as Date | undefined | null
  const endDate = watch('end_date') as Date | undefined | null

  useEffect(() => {
    if (!startDate) {
      replace([])
      return
    }
    const days = []
    let current = new Date(startDate)
    const last = endDate ? new Date(endDate) : new Date(startDate)
    current.setHours(0, 0, 0, 0)
    last.setHours(0, 0, 0, 0)

    while (current <= last) {
      days.push({
        date: new Date(current),
        times: { start: "", end: "" } 
      })
      current.setDate(current.getDate() + 1)
      if (days.length > 31) break 
    }
    replace(days)
  }, [startDate, endDate, replace])

  useEffect(() => {
    if (isFree) setValue('price', 0)
  }, [isFree, setValue])

  const handleDebugSubmit = (data: EventFormValues) => {
    console.log("✅ FORMULARIO ENVIADO:", data)
    onSubmit(data)
  }

  const onInvalid = (formErrors: any) => {
    console.log("❌ ERRORES DE VALIDACIÓN (ZOD):", formErrors)
  }

  return (
    <form 
      onSubmit={handleSubmit(handleDebugSubmit, onInvalid)}
      className="space-y-8 bg-white p-6"
    >
      <ImageUploader label="Galería del Evento" name="images" form={form} />

      <div className="space-y-4">
        <div className="w-full flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black">Título del Evento</label>
            <Input {...register('title')} placeholder="Ej. Noche de Jazz" error={errors.title?.message} />
          </div>

          <div className="md:w-32 md:max-w-[150px] space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black">Capacidad</label>
            <Input 
              type="number" 
              {...register('capacity')} 
              placeholder="Ilimitada" 
              error={errors.capacity?.message} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-black">Descripción</label>
          <Textarea {...register('description')} rows={4} placeholder="Detalles..." error={errors.description?.message} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-black/5 items-stretch md:items-end">
          <div className="flex-1 flex items-center gap-4 p-4 bg-gray-50 border border-black/10 h-[66px]">
            <input type="checkbox" id="is_free" {...register('is_free')} className="size-4 accent-black" />
            <label htmlFor="is_free" className="text-sm font-bold uppercase cursor-pointer">Evento Gratuito</label>
          </div>

          <div className="flex-1 min-h-[66px]">
            {!isFree && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black">Precio Entrada ($)</label>
                <Input 
                  type="number" 
                  step="0.01" 
                  {...register('price', { valueAsNumber: true })} 
                  placeholder="0.00" 
                  error={errors.price?.message} 
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-black">Selecciona la fecha</label>
          <Calendar 
            value={{ start: startDate ?? null, end: endDate ?? null }} 
            onChange={(range) => {
              setValue('start_date', range.start as Date, { shouldValidate: true });
              setValue('end_date', range.end ?? undefined, { shouldValidate: true });
            }} 
          />
          {(errors.start_date || errors.end_date) && (
            <p className="text-red-500 text-xs font-bold uppercase">
              {String(errors.start_date?.message || errors.end_date?.message || '')}
            </p>
          )}
        </div>

        {fields.length > 0 && (
          <div className="space-y-4 pt-4 border-t-2 border-black">
            <p className="text-xs font-bold uppercase tracking-widest">Horarios por día:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field, index) => (
                <div key={field.id} className="p-3 border border-black/10 bg-gray-50">
                  <p className="text-[10px] font-black uppercase mb-2">
                    {field.date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}
                  </p>
                  <Controller
                    control={control}
                    name={`schedules.${index}.times`}
                    render={({ field: { value, onChange } }) => (
                      <TimeRangePicker value={value} onChange={onChange} />
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Procesando..." : "Crear Evento"}
        </Button>
      </div>
    </form>
  )
}