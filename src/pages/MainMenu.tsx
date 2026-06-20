import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CharacterAvatar } from '@/components/CharacterAvatar'
import { LevelBadge } from '@/components/LevelBadge'
import { unlockAudio, setMuted } from '@/lib/sfx'
import { useGameStore } from '@/store/gameStore'

export function MainMenu() {
  const muted = useGameStore((s) => s.muted)
  const toggleMute = useGameStore((s) => s.toggleMute)
  const studentName = useGameStore((s) => s.studentName)
  const bgmEnabled = useGameStore((s) => s.bgmEnabled)
  const bgmVolume = useGameStore((s) => s.bgmVolume)
  const toggleBgmEnabled = useGameStore((s) => s.toggleBgmEnabled)
  const setBgmVolume = useGameStore((s) => s.setBgmVolume)

  const start = () => {
    unlockAudio()
    setMuted(muted)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
      {/* 우상단 미니 오디오 컨트롤 */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur rounded-full px-2 py-1 border border-white/10">
        <button
          onClick={() => toggleBgmEnabled()}
          aria-label={bgmEnabled ? 'BGM 끄기' : 'BGM 켜기'}
          className="text-base hover:scale-110 transition"
        >
          {bgmEnabled ? '🎵' : '🎶'}
        </button>
        <input
          type="range"
          min="0" max="100" step="5"
          aria-label="BGM 음량"
          disabled={!bgmEnabled || muted}
          value={Math.round(bgmVolume * 100)}
          onChange={(e) => setBgmVolume(parseInt(e.target.value, 10) / 100)}
          className="w-20 accent-space-accent disabled:opacity-30"
        />
        <span className="text-[10px] text-white/60 font-mono w-7 text-right">
          {Math.round(bgmVolume * 100)}
        </span>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl sm:text-6xl font-display font-bold text-white tracking-tight"
      >
        🚀 헤일메리 분수 미션
      </motion.h1>
      <p className="mt-3 text-space-accent text-lg">지구를 구하는 25명의 항해사</p>

      <div className="mt-8 flex flex-col items-center gap-3">
        <CharacterAvatar size={130} />
        {studentName && (
          <div className="text-white/80 text-sm">⛑ 항해사 <span className="font-bold text-white">{studentName}</span></div>
        )}
        <LevelBadge />
      </div>

      <div className="mt-10 flex flex-col gap-3 w-full max-w-xs">
        <Link
          to="/chapters"
          onClick={start}
          className="px-6 py-3 rounded-xl bg-space-accent text-space-900 font-bold hover:brightness-110 active:scale-95 transition"
        >
          항해 시작
        </Link>
        <Link
          to="/daily"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold border border-yellow-200/50"
        >
          🌟 오늘의 챌린지 (DAILY)
        </Link>
        <Link
          to="/endless"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold border border-yellow-300/40"
        >
          🎮 끝없는 항해 (ENDLESS)
        </Link>
        <Link
          to="/cabinet"
          className="px-6 py-3 rounded-xl bg-pink-400/20 text-pink-200 border border-pink-300/40 hover:bg-pink-400/30 transition"
        >
          🧳 내 캐비닛
        </Link>
        <Link
          to="/dashboard"
          className="px-6 py-2 rounded-xl bg-white/5 text-white/70 border border-white/15 text-sm hover:bg-white/10 transition"
        >
          📊 진도판 / 학급 설정
        </Link>
        <Link
          to="/leaderboard"
          className="px-6 py-2 rounded-xl bg-yellow-400/10 text-yellow-200 border border-yellow-300/30 text-sm hover:bg-yellow-400/20 transition"
        >
          🏆 학급 리더보드
        </Link>
        <Link
          to="/story"
          className="px-6 py-2 rounded-xl bg-purple-400/10 text-purple-200 border border-purple-300/30 text-sm hover:bg-purple-400/20 transition"
        >
          📚 항해 일지 (스토리 회상)
        </Link>
        <button
          onClick={() => {
            toggleMute()
            setMuted(!muted)
          }}
          className="px-6 py-2 rounded-xl bg-white/10 text-white/70 border border-white/20 text-sm"
        >
          {muted ? '🔇 소리 꺼짐' : '🔊 소리 켜짐'}
        </button>
      </div>

      <p className="mt-10 text-white/30 text-xs">© Project Hail Mary 영감 · 학급 교육용</p>
    </div>
  )
}
