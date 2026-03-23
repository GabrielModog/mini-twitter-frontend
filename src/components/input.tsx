import { Eye, EyeOff } from "lucide-react"
import { useState, type ReactNode } from "react"
import { type UseFormRegister } from "react-hook-form"

export interface InputProps {
  label?: string
  name: string
  type: string
  placeholder: string
  register: UseFormRegister<any>
  error?: string
  icon?: ReactNode | null
  className?: string
  borderless?: boolean
}

const baseClass = `
            w-full h-14.25px-4 py-3 transition 
            text-gray-800 font-medium dark:font-light
            dark:text-gray-400 px-4 outline-none
          `

const buildClassStyles = (error: boolean, borderless: boolean, customClasses: string) => {
  const err = error ? 'border-red-500' : 'border-gray-200 dark:border-gray-500'
  const border = borderless 
        ? `border-none bg-none text` 
        : `border rounded-lg  bg-white 
            focus:border-blue-500 dark:bg-gray-800 `
  return `
    ${baseClass}
    ${border}
    ${err}
    ${customClasses}
  `
} 

export function Input(props: InputProps) {
  const { label, name, type, placeholder, error, register, icon, className, borderless } = props

  const [showPassword, setShowPasword] = useState(false)

  const isPasswordField = type === "password" || name.includes("password")
  const hasIcon = !isPasswordField && icon
  const inputType = isPasswordField && showPassword ? "text" : type

  const classNames = buildClassStyles(!!error, borderless ?? false, className || "")

  return (
    <div className="space-y-2">
      {label && <label htmlFor={`${name}-${type}`} className="block text-sm font-normal text-gray-500">
        {label}
      </label>}
      <div className="relative">
        <input
          id={`${name}-${type}`}
          type={inputType}
          placeholder={placeholder}
          className={classNames}
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