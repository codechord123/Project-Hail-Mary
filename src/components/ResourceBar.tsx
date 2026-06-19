import { useGameStore } from '@/store/gameStore'

export function ResourceBar() {
  const { oxygen, energy, bond } = useGameStore()
  return (
    <div className="flex gap-4 text-sm text-white/90">
      <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40">
        🫁 산소 {oxygen}
      </span>
      <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/40">
        ⚡ 에너지 {energy}
      </span>
      <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40">
        🤝 신뢰도 {bond}
      </span>
    </div>
  )
}
