import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainMenu } from '@/pages/MainMenu'
import { ChapterSelect } from '@/pages/ChapterSelect'
import { Cabinet } from '@/pages/Cabinet'
import { Dashboard } from '@/pages/Dashboard'
import { Leaderboard } from '@/pages/Leaderboard'
import { ChapterClear } from '@/pages/ChapterClear'
import { useGameStore } from '@/store/gameStore'
import { setMuted } from '@/lib/sfx'
import { setBgmMuted, setBgmVolume, stop as stopBgm } from '@/lib/bgm'
import { saveCurrentSlot } from '@/lib/profileSwitch'

const Chapter1 = lazy(() => import('@/pages/Chapter1').then((m) => ({ default: m.Chapter1 })))
const Chapter1Clear = lazy(() => import('@/pages/Chapter1').then((m) => ({ default: m.Chapter1Clear })))
const Chapter2 = lazy(() => import('@/pages/Chapter2').then((m) => ({ default: m.Chapter2 })))
const Chapter3 = lazy(() => import('@/pages/Chapter3').then((m) => ({ default: m.Chapter3 })))
const Chapter4 = lazy(() => import('@/pages/Chapter4').then((m) => ({ default: m.Chapter4 })))
const Chapter5 = lazy(() => import('@/pages/Chapter5').then((m) => ({ default: m.Chapter5 })))
const Chapter6 = lazy(() => import('@/pages/Chapter6').then((m) => ({ default: m.Chapter6 })))
const Chapter7 = lazy(() => import('@/pages/Chapter7').then((m) => ({ default: m.Chapter7 })))
const Endless = lazy(() => import('@/pages/Endless').then((m) => ({ default: m.Endless })))
const DailyChallenge = lazy(() => import('@/pages/DailyChallenge').then((m) => ({ default: m.DailyChallenge })))
const StoryRecap = lazy(() => import('@/pages/StoryRecap').then((m) => ({ default: m.StoryRecap })))

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white/60 text-sm">
      ✨ 우주선 시스템 로드 중...
    </div>
  )
}

export default function App() {
  const muted = useGameStore((s) => s.muted)
  const presentationMode = useGameStore((s) => s.presentationMode)
  const bgmEnabled = useGameStore((s) => s.bgmEnabled)
  const bgmVolume = useGameStore((s) => s.bgmVolume)
  useEffect(() => {
    setMuted(muted)
    setBgmMuted(muted || !bgmEnabled)
    if (muted || !bgmEnabled) stopBgm()
  }, [muted, bgmEnabled])
  useEffect(() => {
    setBgmVolume(bgmVolume)
  }, [bgmVolume])

  // 진도 자동 저장 — 어떤 페이지에서도 변경 감지
  const studentName = useGameStore((s) => s.studentName)
  const totalXp = useGameStore((s) => s.totalXp)
  const clearedChapters = useGameStore((s) => s.clearedChapters)
  const chapterRecords = useGameStore((s) => s.chapterRecords)
  useEffect(() => {
    if (studentName.trim()) saveCurrentSlot()
  }, [studentName, totalXp, clearedChapters, chapterRecords])

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen bg-gradient-to-b from-space-900 via-space-800 to-space-900 text-white ${
          presentationMode ? 'text-lg sm:text-xl' : ''
        }`}
      >
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/chapters" element={<ChapterSelect />} />
            <Route path="/chapter/1" element={<Chapter1 />} />
            <Route path="/chapter/1/clear" element={<Chapter1Clear />} />
            <Route path="/chapter/2" element={<Chapter2 />} />
            <Route path="/chapter/3" element={<Chapter3 />} />
            <Route path="/chapter/4" element={<Chapter4 />} />
            <Route path="/chapter/5" element={<Chapter5 />} />
            <Route path="/chapter/6" element={<Chapter6 />} />
            <Route path="/chapter/7" element={<Chapter7 />} />
            <Route path="/chapter/:chapter/clear" element={<ChapterClear />} />
            <Route path="/cabinet" element={<Cabinet />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/endless" element={<Endless />} />
            <Route path="/daily" element={<DailyChallenge />} />
            <Route path="/story" element={<StoryRecap />} />
            <Route path="*" element={<MainMenu />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}
