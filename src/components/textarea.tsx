import { type UseFormRegister } from "react-hook-form"

export interface TextareaProps {
  label?: string
  name: string
  placeholder: string
  register: UseFormRegister<any>
  error?: string
  rows?: number
  disabled?: boolean
}

export function Textarea(props: TextareaProps) {
  const { label, name, placeholder, error, register, rows = 3, disabled = false } = props

  return (
    <div className="space-y-2">
      {label && <label htmlFor={name} className="block text-sm font-normal text-gray-500">
        {label}
      </label>}
      <textarea
        id={name}
        placeholder={placeholder}
        className={`
          w-full px-6 pt-6 
          text-gray-900 placeholder-gray-500 
          bg-transparent border-none 
          focus:outline-none focus:ring-0 
          resize-none text-lg
          dark:text-gray-500
          ${error ? 'border-red-500' : 'border-gray-200'}
        `}
        rows={rows}
        disabled={disabled}
        {...register(name)}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}