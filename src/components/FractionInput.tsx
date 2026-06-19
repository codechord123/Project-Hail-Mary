import { useState, useEffect } from 'react'
import type { Fraction } from '@/types/fraction'

interface Props {
  onChange: (f: Fraction | null) => void
  disabled?: boolean
}

export function FractionInput({ onChange, disabled }: Props) {
  const [num, setNum] = useState('')
  const [den, setDen] = useState('')

  useEffect(() => {
    const n = parseInt(num, 10)
    const d = parseInt(den, 10)
    if (Number.isFinite(n) && Number.isFinite(d) && d >= 1) {
      onChange({ numerator: n, denominator: d })
    } else {
      onChange(null)
    }
  }, [num, den, onChange])

  const clean = (s: string) => s.replace(/[^0-9]/g, '').slice(0, 3)

  return (
    <div className="inline-flex flex-col items-center text-space-900">
      <input
        aria-label="분자"
        inputMode="numeric"
        value={num}
        disabled={disabled}
        onChange={(e) => setNum(clean(e.target.value))}
        className="w-20 h-14 text-3xl text-center rounded-lg border-2 border-space-700 focus:outline-none focus:border-space-accent bg-white"
        placeholder="?"
      />
      <div className="w-24 h-1 bg-space-900 my-1 rounded" />
      <input
        aria-label="분모"
        inputMode="numeric"
        value={den}
        disabled={disabled}
        onChange={(e) => setDen(clean(e.target.value))}
        className="w-20 h-14 text-3xl text-center rounded-lg border-2 border-space-700 focus:outline-none focus:border-space-accent bg-white"
        placeholder="?"
      />
    </div>
  )
}
