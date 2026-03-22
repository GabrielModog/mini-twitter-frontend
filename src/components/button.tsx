type ButtonSize = 'sm' | 'md' | 'full'
type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps {
  label: string
  type: 'button' | 'submit'
  size?: ButtonSize
  variant?: ButtonVariant
  className?: string
  disabled?: boolean
  loading?: boolean
  loadingMessage?: string
  onClick?: () => void
}

const baseClass = `
  flex items-center justify-center
  text-white py-3 
  bg-sky-500 hover:bg-sky-700
  font-medium 
  transition disabled:opacity-60
  cursor-pointer  
  shadow-blue-200
  dark:shadow-sky-900
  focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2
`

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8.25 px-6 text-sm font-bold rounded-full shadow-sm',
  md: 'px-5 py-2.5 text-base rounded-lg shadow-lg',
  full: 'w-full h-14 px-6 py-3 text-base rounded-4xl shadow-lg',
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    text-white
    bg-sky-500
    hover:bg-sky-700
    focus:ring-sky-500
  `,
  secondary: `
    bg-gray-200 text-gray-900
    hover:bg-gray-300
    focus:ring-gray-400
  `,
}

const buildStyleClasses = (className: string, size: ButtonSize, variant: ButtonVariant) => 
  `
    ${baseClass}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `
  .trim()
  .replace(/\s+/g, ' ')

export default function Button(props: ButtonProps) {
  const { type = 'button', label, onClick, loading = false, loadingMessage = 'Carregando...', disabled = false, className = '', variant = 'primary', size = 'full' } = props
  const classes = buildStyleClasses(className, size, variant)
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      className={classes}
      onClick={onClick}
    >
      {loading ? loadingMessage : label}
    </button>
  )
}