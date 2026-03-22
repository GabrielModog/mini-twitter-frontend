type LogoSizes = "sm" | "md" | "lg"

export interface LogoProps {
  size?: LogoSizes
}

const sizeStyles: Record<LogoSizes, string> = {
  "sm": "text-xl",
  "md": "text-2xl",
  "lg": "text-4xl"
}

const baseClass = "font-bold text-sky-500 dark:text-white"

const buildStyleClasses = (size: LogoSizes) =>
  `
    ${baseClass}
    ${sizeStyles[size]}
  `
    .trim()
    .replace(/\s+/, " ")

export default function Logo(props: LogoProps) {
  const { size = "lg" } = props
  const className = buildStyleClasses(size)
  return <h1 className={className}>
    Mini Twitter
  </h1>
}