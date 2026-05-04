import { forwardRef } from "react"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = "", ...props }, ref) => (
    <div className="w-full">
      <textarea
        ref={ref}
        {...props}
        className={`w-full p-2 border rounded-md outline-none focus:ring-1 focus:ring-black resize-none transition-all ${
          error ? 'border-red-500' : 'border-slate-200'
        } ${className}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
)
Textarea.displayName = "Textarea"