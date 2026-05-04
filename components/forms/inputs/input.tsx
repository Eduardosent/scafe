import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => (
    <div className="w-full">
      <input
        ref={ref}
        {...props}
        className={`w-full p-2 border rounded-md outline-none focus:ring-1 focus:ring-black transition-all ${
          error ? 'border-red-500' : 'border-slate-200'
        } ${className}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
)
Input.displayName = "Input"