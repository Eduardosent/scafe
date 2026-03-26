'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginForm } from '@/types/forms/login'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/hooks'
import { Button } from '@/components/ui'

export default function AdminLoginPage() {
  const { signIn } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: LoginForm) => {
    setLoading(true)
    setError(null)

    try {
      // El provider ya maneja la redirección y el estado global del User
      await signIn(values.email, values.password)
    } catch (e: any) {
      setError('Credenciales inválidas.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6 text-black antialiased">
      <div className="w-full max-w-[350px] space-y-8">
        
        <header className="space-y-2">
          <h1 className="text-2xl font-bold tracking-[0.1em] uppercase">Admin Access</h1>
          <p className="text-[10px] tracking-[0.2em] text-black/50 uppercase">Sendero Café / Control Panel</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest">Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="admin@email"
                className="w-full border-b border-black/20 bg-transparent py-2 text-sm outline-none focus:border-black transition-colors"
              />
              {errors.email && (
                <p className="text-[10px] text-red-500 font-bold uppercase">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1 relative">
              <label className="text-[10px] font-bold uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••"
                  className="w-full border-b border-black/20 bg-transparent py-2 pr-10 text-sm outline-none focus:border-black transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 hover:text-black cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-500 font-bold uppercase">{errors.password.message}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-black text-white p-3 text-[10px] font-bold uppercase tracking-widest text-center">
              {error}
            </div>
          )}

<Button type="submit" loading={loading}>
  Entrar
</Button>
        </form>

        <footer className="pt-8 text-center text-[9px] text-black/30 uppercase tracking-[0.2em]">
          Acceso restringido / Solo personal autorizado
        </footer>
      </div>
    </div>
  )
}