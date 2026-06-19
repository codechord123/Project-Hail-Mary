import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import type { Fraction } from '@/types/fraction'
import { SCENE_THEMES, type SceneThemeId } from './themes'

interface Particle {
  id: number
  x: number
  y: number
  color: string
}

interface Props {
  a: Fraction
  b: Fraction
  themeId: SceneThemeId
  /** problem.id 변경 시 셀 초기화 */
  resetKey: string
  /** 학생이 모든 셀을 결과로 옮겼을 때 호출 — 답 자동 제안 */
  onComplete?: (combined: Fraction) => void
  /** 셀이 결과로 이동/이탈할 때 — sfx 트리거용 */
  onTransfer?: () => void
}

type Slot = 'A' | 'B' | 'result'
interface Cell {
  id: string
  origin: 'A' | 'B'
  slot: Slot
}

export function ManipulationScene({ a, b, themeId, resetKey, onComplete, onTransfer }: Props) {
  // 같은 분모일 때만 의미 있음
  if (a.denominator !== b.denominator) return null
  const theme = SCENE_THEMES[themeId]
  const denom = a.denominator

  const initialCells = useMemo<Cell[]>(() => {
    const out: Cell[] = []
    for (let i = 0; i < a.numerator; i++) out.push({ id: `a-${i}`, origin: 'A', slot: 'A' })
    for (let i = 0; i < b.numerator; i++) out.push({ id: `b-${i}`, origin: 'B', slot: 'B' })
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])

  const [cells, setCells] = useState<Cell[]>(initialCells)
  const [particles, setParticles] = useState<Particle[]>([])
  const particleIdRef = useRef(0)
  const completedRef = useRef(false)

  const burstParticles = () => {
    const id = ++particleIdRef.current
    const batch: Particle[] = Array.from({ length: 4 }).map((_, i) => ({
      id: id * 10 + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: theme.particleColor,
    }))
    setParticles((ps) => [...ps, ...batch])
    setTimeout(() => {
      setParticles((ps) => ps.filter((p) => !batch.some((b) => b.id === p.id)))
    }, 700)
  }

  useEffect(() => {
    setCells(initialCells)
    completedRef.current = false
  }, [initialCells])

  const inA = cells.filter((c) => c.slot === 'A')
  const inB = cells.filter((c) => c.slot === 'B')
  const inResult = cells.filter((c) => c.slot === 'result')

  const totalCells = cells.length

  useEffect(() => {
    if (inResult.length === totalCells && totalCells > 0 && !completedRef.current) {
      completedRef.current = true
      onComplete?.({ numerator: inResult.length, denominator: denom })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inResult.length, totalCells])

  const transfer = (id: string) => {
    setCells((cs) => cs.map((c) => (c.id === id ? { ...c, slot: 'result' } : c)))
    onTransfer?.()
    burstParticles()
  }

  const sendBack = (id: string) => {
    setCells((cs) => cs.map((c) => (c.id === id ? { ...c, slot: c.origin } : c)))
    onTransfer?.()
    completedRef.current = false
  }

  const resetAll = () => {
    setCells(initialCells)
    completedRef.current = false
  }

  return (
    <div className={`relative w-full p-3 rounded-2xl bg-gradient-to-b ${theme.bgGradient}`}>
      {/* 전송 파티클 */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 1, scale: 1 }}
            animate={{ top: `${p.y - 30}%`, opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
            style={{ backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}` }}
          />
        ))}
      </AnimatePresence>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-white/60">손가락으로 셀을 옮겨 합쳐봐 👆</div>
        <button
          onClick={resetAll}
          className="text-xs px-2 py-1 rounded bg-white/10 text-white/70 hover:bg-white/20"
        >
          ↺ 다시 배치
        </button>
      </div>

      <LayoutGroup>
        {/* 결과 컨테이너 (위) */}
        <Container
          label={theme.labelResult}
          subLabel={`${inResult.length} / ${denom}`}
          theme={theme}
          isResult
          highlight={inResult.length === totalCells}
        >
          <AnimatePresence>
            {inResult.map((cell) => (
              <CellChip
                key={cell.id}
                cell={cell}
                theme={theme}
                onTap={() => sendBack(cell.id)}
              />
            ))}
            {/* 빈 슬롯 플레이스홀더 */}
            {Array.from({ length: denom - inResult.length }).map((_, i) => (
              <EmptySlot key={`r-empty-${i}`} theme={theme} />
            ))}
          </AnimatePresence>
        </Container>

        {/* 소스 두 개 (아래) */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Container
            label={theme.labelA}
            subLabel={`${inA.length} / ${denom} 남음`}
            theme={theme}
          >
            <AnimatePresence>
              {inA.map((cell) => (
                <CellChip
                  key={cell.id}
                  cell={cell}
                  theme={theme}
                  onTap={() => transfer(cell.id)}
                />
              ))}
              {Array.from({ length: denom - inA.length }).map((_, i) => (
                <EmptySlot key={`a-empty-${i}`} theme={theme} />
              ))}
            </AnimatePresence>
          </Container>

          <Container
            label={theme.labelB}
            subLabel={`${inB.length} / ${denom} 남음`}
            theme={theme}
          >
            <AnimatePresence>
              {inB.map((cell) => (
                <CellChip
                  key={cell.id}
                  cell={cell}
                  theme={theme}
                  onTap={() => transfer(cell.id)}
                />
              ))}
              {Array.from({ length: denom - inB.length }).map((_, i) => (
                <EmptySlot key={`b-empty-${i}`} theme={theme} />
              ))}
            </AnimatePresence>
          </Container>
        </div>
      </LayoutGroup>
    </div>
  )
}

function Container({
  label,
  subLabel,
  theme,
  children,
  isResult,
  highlight,
}: {
  label: string
  subLabel: string
  theme: ReturnType<typeof getTheme>
  children: React.ReactNode
  isResult?: boolean
  highlight?: boolean
}) {
  return (
    <motion.div
      animate={highlight ? { scale: [1, 1.03, 1] } : {}}
      transition={{ duration: 0.5, repeat: highlight ? Infinity : 0, repeatType: 'reverse' }}
      className={`relative p-2 sm:p-3 border-2 ${theme.containerClass} ${theme.containerRounded} ${
        isResult ? 'min-h-[88px]' : 'min-h-[72px]'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10px] sm:text-xs font-semibold text-white/80">{label}</div>
        <div className="text-[10px] text-white/50">{subLabel}</div>
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </motion.div>
  )
}

function CellChip({
  cell,
  theme,
  onTap,
}: {
  cell: Cell
  theme: ReturnType<typeof getTheme>
  onTap: () => void
}) {
  const shapeClass =
    theme.cellShape === 'circle'
      ? 'rounded-full'
      : theme.cellShape === 'pill'
        ? 'rounded-full'
        : theme.cellShape === 'hex'
          ? 'rounded-md rotate-3'
          : 'rounded-md'
  return (
    <motion.button
      layoutId={cell.id}
      onClick={onTap}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      className={`${theme.cellColor} ${theme.cellGlow} ${shapeClass} w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-sm`}
      aria-label={`${cell.origin} 셀`}
    >
      <span className="select-none">{theme.cellIcon}</span>
    </motion.button>
  )
}

function EmptySlot({ theme }: { theme: ReturnType<typeof getTheme> }) {
  const shapeClass =
    theme.cellShape === 'circle' || theme.cellShape === 'pill' ? 'rounded-full' : 'rounded-md'
  return (
    <div
      className={`w-8 h-8 sm:w-9 sm:h-9 border border-dashed border-white/15 ${shapeClass}`}
    />
  )
}

// 타입 헬퍼 (Container/CellChip 시그니처용)
function getTheme(_id: SceneThemeId) {
  return SCENE_THEMES.oxygen
}
