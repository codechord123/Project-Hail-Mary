import { useState, useEffect } from 'react'
import { FractionInput } from '@/components/FractionInput'
import type { Fraction } from '@/types/fraction'

interface Props {
  placeholder: string
  onChange: (data: { workspace: string; value: Fraction | null }) => void
  resetKey: string
  disabled?: boolean
}

export function MultiPartAnswer({ placeholder, onChange, resetKey, disabled }: Props) {
  const [workspace, setWorkspace] = useState('')
  const [value, setValue] = useState<Fraction | null>(null)
  useEffect(() => {
    setWorkspace('')
    setValue(null)
  }, [resetKey])
  useEffect(() => {
    onChange({ workspace, value })
  }, [workspace, value, onChange])

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <textarea
        value={workspace}
        disabled={disabled}
        onChange={(e) => setWorkspace(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full p-3 rounded-lg bg-white/95 text-space-900 text-sm focus:outline-none focus:ring-2 focus:ring-space-accent"
      />
      <div className="text-xs text-white/60">최종 답</div>
      <FractionInput key={resetKey} onChange={setValue} disabled={disabled} />
    </div>
  )
}
