import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainMenu } from '@/pages/MainMenu'
import { ChapterSelect } from '@/pages/ChapterSelect'
import { Chapter1, Chapter1Clear } from '@/pages/Chapter1'
import { Chapter3, Chapter3Clear } from '@/pages/Chapter3'
import { Cabinet } from '@/pages/Cabinet'
import { useGameStore } from '@/store/gameStore'
import { setMuted } from '@/lib/sfx'

export default function App() {
  const muted = useGameStore((s) => s.muted)
  useEffect(() => {
    setMuted(muted)
  }, [muted])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-space-900 via-space-800 to-space-900 text-white">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/chapters" element={<ChapterSelect />} />
          <Route path="/chapter/1" element={<Chapter1 />} />
          <Route path="/chapter/1/clear" element={<Chapter1Clear />} />
          <Route path="/chapter/3" element={<Chapter3 />} />
          <Route path="/chapter/3/clear" element={<Chapter3Clear />} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="*" element={<MainMenu />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
