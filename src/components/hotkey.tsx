export interface HotkeyProps {
  label: string
}

export default function Hotkey(props: HotkeyProps) {
  const { label } = props
  return <kbd className="rounded bg-gray-300 text-gray-800 text-xs px-2 py-1 dark:bg-gray-600 dark:text-gray-300 opacity-30">{label}</kbd>
}
