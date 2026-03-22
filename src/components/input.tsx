import { Eye, EyeOff } from "lucide-react"
import { useState, type ReactNode } from "react"
import { type UseFormRegister } from "react-hook-form"

export interface InputProps {
  label: string
  name: string
  type: string
  placeholder: string
  register: UseFormRegister<any>
  error?: string
  icon?: ReactNode | null
}

export function Input(props: InputProps) {
  const { label, name, type, placeholder, error, register, icon } = props

  const [showPassword, setShowPasword] = useState(false)

  const isPasswordField = type === "password" || name.includes("password")
  const hasIcon = !isPasswordField && icon
  const inputType = isPasswordField && showPassword ? "text" : type

  return (
    <div className="space-y-2">
      <label htmlFor={`${name}-${type}`} className="block text-sm font-normal text-gray-500">
        {label}
      </label>
      <div className="relative">
        <input
          id={`${name}-${type}`} 
          type={inputType}
          placeholder={placeholder}
          className={`
            w-full h-14.25 bg-white px-4 py-3 border rounded-lg outline-none
            focus:border-blue-500 transition text-gray-800 font-medium
            ${error ? 'border-red-500' : 'border-gray-200'}
          `}
          {...register(name)}
        />
        {hasIcon && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none transition">{icon}</span>}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPasword(prev => !prev)}
            aria-label={showPassword ? "Ocultar Senha" : "Mostrar Senha"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer focus:outline-none transition"
          >
            {showPassword ? (<EyeOff className="w-5 h-5" />) : (<Eye className="w-5 h-5" />)}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}