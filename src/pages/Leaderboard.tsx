import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGameStore } from '@/store/gameStore'
import {
  upsertRoster,
  leaderboardByStars,
  leaderboardByEndless,
  removeRoster,
  type RosterEntry,
} from '@/lib/classRoster'
import { computeLevelInfo } from '@/lib/leveling'
import { isFirebaseConfigured } from '@/lib/firebase'
import { cloudPushRoster, cloudFetchRoster } from '@/lib/cloudSync'

const ENDLESS_HI_KEY = 'hailmary-endless-hi'

export function Leaderboard() {
  const store = useGameStore()
  const [tab, setTab] = useState<'stars' | 'endless'>('stars')
  const [filterCode, setFilterCode] = useState(store.classCode)
  const [cloudEntries, setCloudEntries] = useState<RosterEntry[] | null>(null)
  const [syncing, setSyncing] = useState(false)
  const info = computeLevelInfo(store.totalXp)
  const cloudOn = isFirebaseConfigured()

  // 현재 학생을 명부에 자동 등록 (mount 시)
  useEffect(() => {
    if (!store.studentName.trim()) return
    const totalStars = Object.values(store.chapterRecords).reduce((s, r) => s + r.stars, 0)
    let endlessBest = 0
    try {
      endlessBest = parseInt(localStorage.getItem(ENDLESS_HI_KEY) || '0', 10) || 0
    } catch { /* ignore */ }
    const entry: RosterEntry = {
      name: store.studentName,
      classCode: store.classCode,
      level: info.level,
      title: info.title,
      totalXp: store.totalXp,
      clearedCount: store.clearedChapters.length,
      totalStars,
      endlessBest,
      lastUpdated: Date.now(),
    }
    upsertRoster(entry)
    if (cloudOn) cloudPushRoster(entry).catch(() => {})
  }, [
    store.studentName, store.classCode, store.totalXp,
    store.clearedChapters.length, store.chapterRecords, info.level, info.title,
  ])

  const entries = useMemo(() => {
    const code = filterCode.trim()
    const local = tab === 'stars'
      ? leaderboardByStars(code || undefined)
      : leaderboardByEndless(code || undefined)
    if (!cloudEntries) return local
    // 클라우드 + 로컬 머지 (name+code 키)
    const map = new Map<string, RosterEntry>()
    ;[...local, ...cloudEntries].forEach((e) => {
      const k = `${e.name}|${e.classCode}`
      const prev = map.get(k)
      if (!prev || e.lastUpdated > prev.lastUpdated) map.set(k, e)
    })
    const merged = Array.from(map.values())
    return tab === 'stars'
      ? merged.sort((a, b) => b.totalStars - a.totalStars || b.level - a.level)
      : merged.sort((a, b) => b.endlessBest - a.endlessBest)
  }, [tab, filterCode, cloudEntries, store.studentName, store.totalXp])

  const fetchCloud = async () => {
    if (!cloudOn || !filterCode.trim()) return
    setSyncing(true)
    const data = await cloudFetchRoster(filterCode.trim())
    setCloudEntries(data)
    setSyncing(false)
  }

  const handleRemove = (e: RosterEntry) => {
    if (window.confirm(`${e.name}(${e.classCode || '미지정'}) 항목을 명부에서 제거할까요?`)) {
      removeRoster(e.name, e.classCode)
      setFilterCode((c) => c + '') // 강제 리렌더
    }
  }

  return (
    <div className="min-h-screen px-6 py-8 max-w-3xl mx-auto">
      <Link to="/" className="text-white/60 hover:text-white text-sm">
        ← 메인으로
      </Link>
      <h2 className="mt-3 text-3xl font-bold text-white">🏆 학급 리더보드</h2>
      <p className="text-white/60 text-sm mt-1">
        같은 단말의 학생들이 자동 등록돼. 외부 서버 없음 — 단말 안에서만 비교 가능.
      </p>

      <div className="mt-4 flex gap-2 items-center">
        <input
          value={filterCode}
          onChange={(e) => setFilterCode(e.target.value)}
          placeholder="학급 코드 필터 (예: 5-3)"
          className="flex-1 px-3 py-2 rounded bg-black/40 text-white border border-white/20 focus:outline-none focus:border-space-accent text-sm"
        />
        {cloudOn ? (
          <button
            onClick={fetchCloud}
            disabled={syncing || !filterCode.trim()}
            className="px-3 py-2 rounded bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 text-sm disabled:opacity-40"
          >
            {syncing ? '동기화 중...' : '☁ 클라우드 동기화'}
          </button>
        ) : (
          <span className="text-xs text-white/40 px-2">☁ 클라우드 OFF</span>
        )}
      </div>
      {cloudOn && cloudEntries && (
        <div className="mt-1 text-xs text-emerald-300">
          ☁ 클라우드 {cloudEntries.length}명 + 로컬 머지 표시 중
        </div>
      )}

      <div className="mt-4 flex gap-1 border-b border-white/10">
        <button
          onClick={() => setTab('stars')}
          className={`px-4 py-2 text-sm font-bold ${
            tab === 'stars'
              ? 'text-yellow-300 border-b-2 border-yellow-300'
              : 'text-white/50'
          }`}
        >
          ⭐ 총 별 순위
        </button>
        <button
          onClick={() => setTab('endless')}
          className={`px-4 py-2 text-sm font-bold ${
            tab === 'endless'
              ? 'text-pink-300 border-b-2 border-pink-300'
              : 'text-white/50'
          }`}
        >
          🎮 엔들리스 최고기록
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="mt-8 text-center text-white/40 text-sm">
          아직 등록된 학생이 없어. 메인 화면 → 진도판에서 학생 이름을 설정해.
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {entries.map((e, i) => {
            const isMe = e.name === store.studentName && e.classCode === store.classCode
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`
            return (
              <li
                key={`${e.name}-${e.classCode}`}
                className={`p-3 rounded-lg flex items-center gap-3 ${
                  isMe
                    ? 'bg-space-accent/15 border border-space-accent/40'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className="text-2xl w-10 text-center font-mono">{medal}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold truncate">
                    {e.name}
                    {isMe && <span className="ml-2 text-xs text-space-accent">(나)</span>}
                    {e.classCode && <span className="ml-2 text-xs text-white/40">· {e.classCode}</span>}
                  </div>
                  <div className="text-xs text-white/60">
                    Lv.{e.level} {e.title} · 클리어 {e.clearedCount}/7
                  </div>
                </div>
                <div className="text-right">
                  {tab === 'stars' ? (
                    <div className="text-yellow-300 font-bold">⭐ {e.totalStars}</div>
                  ) : (
                    <div className="text-pink-300 font-bold font-mono">
                      {e.endlessBest.toLocaleString()}
                    </div>
                  )}
                </div>
                {!isMe && (
                  <button
                    onClick={() => handleRemove(e)}
                    className="text-white/30 hover:text-red-300 text-xs px-1"
                    title="명부에서 제거"
                  >
                    ✕
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
