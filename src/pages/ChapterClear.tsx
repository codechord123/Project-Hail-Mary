import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { computeLevelInfo } from '@/lib/leveling'
import { ITEMS, type ItemId } from '@/data/items'

const NEXT_CHAPTER: Record<string, string> = {
  '1': '/chapter/3', // (챕터 2가 잠금되어 있을 때 가이드)
  '2': '/chapter/3',
  '3': '/chapter/4',
  '4': '/chapter/5',
  '5': '/chapter/6',
  '6': '/chapter/7',
  '7': '/',
}

const RANK_COLOR: Record<string, string> = {
  S: 'text-yellow-300 drop-shadow-[0_0_24px_rgba(253,224,71,0.7)]',
  A: 'text-pink-300',
  B: 'text-cyan-300',
  C: 'text-white/70',
}

export function ChapterClear() {
  const { chapter } = useParams<{ chapter: string }>()
  const totalXp = useGameStore((s) => s.totalXp)
  const info = computeLevelInfo(totalXp)
  const state = (window.history.state?.usr ?? {}) as {
    stars?: number
    rank?: string
    maxCombo?: number
    score?: number
    rewardItemId?: ItemId
    bossDefeated?: boolean
  }
  const stars = state.stars ?? 1
  const rank = state.rank ?? 'C'
  const reward = state.rewardItemId ? ITEMS[state.rewardItemId] : null
  const nextRoute = NEXT_CHAPTER[chapter ?? '1'] ?? '/chapters'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className={`text-9xl font-black font-mono ${RANK_COLOR[rank] ?? RANK_COLOR.C}`}
      >
        {rank}
      </motion.div>
      <h2 className="mt-2 text-3xl font-bold text-white">
        {state.bossDefeated ? '🏆 보스 처치!' : `챕터 ${chapter} 클리어`}
      </h2>
      <div className="mt-3 text-yellow-300 text-3xl">
        {'★'.repeat(stars)}<span className="text-white/15">{'★'.repeat(3 - stars)}</span>
      </div>

      <div className="mt-4 font-mono text-white/80 space-y-1">
        <div>SCORE: <span className="text-yellow-200">{(state.score ?? 0).toLocaleString()}</span></div>
        <div>MAX COMBO: <span className="text-pink-200">×{state.maxCombo ?? 0}</span></div>
        <div>현재 레벨: <span className={info.titleColor}>Lv.{info.level} {info.title}</span></div>
      </div>

      {reward && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="mt-5 p-4 rounded-xl bg-yellow-400/15 border border-yellow-300/40"
        >
          <div className="text-xs text-yellow-200">획득 보상</div>
          <div className="text-2xl mt-1">{reward.icon} {reward.name}</div>
        </motion.div>
      )}

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link to={`/chapter/${chapter}`} className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20">
          ↺ 재도전
        </Link>
        <Link to={nextRoute} className="px-6 py-3 rounded-xl bg-space-accent text-space-900 font-bold">
          다음 →
        </Link>
        <Link to="/chapters" className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20">
          챕터 선택
        </Link>
      </div>
    </div>
  )
}
