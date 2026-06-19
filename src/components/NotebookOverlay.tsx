import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
}

const COLORS = ['#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#ffffff', '#000000']

export function NotebookOverlay({ open, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawing = useRef(false)
  const last = useRef<{ x: number; y: number } | null>(null)
  const [color, setColor] = useState('#fbbf24')
  const [size, setSize] = useState(3)
  const [erase, setErase] = useState(false)

  useEffect(() => {
    if (!open) return
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    // Resize to display size (devicePixelRatio aware)
    const dpr = window.devicePixelRatio || 1
    const rect = c.getBoundingClientRect()
    c.width = rect.width * dpr
    c.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [open])

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!
    const rect = c.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    drawing.current = true
    last.current = point(e)
    ;(e.target as HTMLCanvasElement).setPointerCapture(e.pointerId)
  }

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const c = canvasRef.current!
    const ctx = c.getContext('2d')!
    const p = point(e)
    const l = last.current!
    ctx.globalCompositeOperation = erase ? 'destination-out' : 'source-over'
    ctx.strokeStyle = color
    ctx.lineWidth = erase ? size * 4 : size
    ctx.beginPath()
    ctx.moveTo(l.x, l.y)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
    last.current = p
  }

  const end = () => {
    drawing.current = false
    last.current = null
  }

  const clear = () => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.restore()
  }

  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-40 bg-black/70 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="w-full max-w-3xl h-[80vh] rounded-2xl bg-amber-50 border-4 border-amber-700 flex flex-col overflow-hidden shadow-2xl"
      >
        {/* 툴바 */}
        <div className="flex items-center gap-2 p-2 bg-amber-100 border-b border-amber-700/40">
          <span className="text-amber-900 font-bold text-sm">📝 풀이 노트</span>
          <div className="flex gap-1 ml-3">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => { setColor(c); setErase(false) }}
                aria-label={`색상 ${c}`}
                className={`w-6 h-6 rounded-full border-2 ${
                  color === c && !erase ? 'border-amber-700' : 'border-amber-700/30'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="flex gap-1 ml-2 items-center">
            <span className="text-xs text-amber-900">굵기</span>
            <input
              type="range" min={1} max={10} step={1}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value, 10))}
              className="w-20"
            />
          </div>
          <button
            onClick={() => setErase((e) => !e)}
            className={`px-2 py-1 rounded text-xs ${
              erase ? 'bg-amber-700 text-white' : 'bg-white text-amber-900 border border-amber-700/40'
            }`}
          >
            🩹 지우개
          </button>
          <button
            onClick={clear}
            className="px-2 py-1 rounded text-xs bg-white text-amber-900 border border-amber-700/40"
          >
            🗑 전체 비우기
          </button>
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-amber-700 text-white text-sm font-bold"
          >
            ✕ 닫기
          </button>
        </div>

        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          className="flex-1 touch-none cursor-crosshair bg-amber-50"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="text-center text-xs text-amber-900/60 py-1 bg-amber-100 border-t border-amber-700/40">
          손가락이나 펜으로 자유롭게 풀이 과정을 적어보자. 채점되지 않아 — 학습 보조 도구.
        </div>
      </motion.div>
    </motion.div>
  )
}
