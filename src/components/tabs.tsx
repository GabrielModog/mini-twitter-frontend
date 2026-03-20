import { useState, type ReactNode } from "react"

export interface TabProps {
  label: string
  content: ReactNode
}

export interface TabsProps {
  defaultTab?: number
  tabs: TabProps[]
}

export default function Tabs(props: TabsProps) {
  const { defaultTab = 0, tabs } = props
  const [active, setActive] = useState(defaultTab)
  return (
    <div className="w-full mx-auto">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActive(idx)}
            className={`
              flex-1 py-4 text-center font-bold transition-colors
              ${active === idx
                ? 'border-b-4 border-sky-500 text-sky-500'
                : 'text-gray-500 hover:text-gray-400'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-8">{tabs[active].content}</div>
    </div>
  )
}