import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainMenu } from '@/pages/MainMenu'
import { ChapterSelect } from '@/pages/ChapterSelect'
import { Chapter1, Chapter1Clear } from '@/pages/Chapter1'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-space-900 via-space-800 to-space-900 text-white">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/chapters" element={<ChapterSelect />} />
          <Route path="/chapter/1" element={<Chapter1 />} />
          <Route path="/chapter/1/clear" element={<Chapter1Clear />} />
          <Route path="*" element={<MainMenu />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
