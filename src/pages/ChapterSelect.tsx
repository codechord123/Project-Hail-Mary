import { Link } from 'react-router-dom'
import { useGameStore } from '@/store/gameStore'

const CHAPTERS = [
  { id: 1, title: '깨어남', topic: '분모가 같은 분수의 덧셈', available: true },
  { id: 2, title: '식량 점검', topic: '분모가 같은 분수의 뺄셈', available: false },
  { id: 3, title: '미지의 신호', topic: '약분과 통분', available: false },
  { id: 4, title: '첫 만남', topic: '분모가 다른 분수의 덧셈', available: false },
  { id: 5, title: '위기의 동력실', topic: '분모가 다른 분수의 뺄셈', available: false },
  { id: 6, title: '아스트로파지 배양', topic: '대분수의 덧셈과 뺄셈', available: false },
  { id: 7, title: '귀환 미션', topic: '종합 보스전', available: false },
]

export function ChapterSelect() {
  const cleared = useGameStore((s) => s.clearedChapters)

  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <Link to="/" className="text-white/60 hover:text-white text-sm">
        ← 메인으로
      </Link>
      <h2 className="mt-4 text-3xl font-bold text-white">챕터 선택</h2>
      <p className="text-white/60 mt-1">학습 순서대로 진행해보세요.</p>

      <ul className="mt-8 space-y-3">
        {CHAPTERS.map((c) => {
          const isCleared = cleared.includes(c.id)
          const inner = (
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <div className="text-white font-semibold">
                  Chapter {c.id}. {c.title}
                  {isCleared && <span className="ml-2 text-green-400 text-sm">✓ 클리어</span>}
                </div>
                <div className="text-white/50 text-sm">{c.topic}</div>
              </div>
              <span className="text-space-accent text-2xl">
                {c.available ? '▶' : '🔒'}
              </span>
            </div>
          )
          return c.available ? (
            <li key={c.id}>
              <Link to={`/chapter/${c.id}`} className="block hover:opacity-90">
                {inner}
              </Link>
            </li>
          ) : (
            <li key={c.id} className="opacity-40 cursor-not-allowed">
              {inner}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
