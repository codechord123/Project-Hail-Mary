import { Link } from 'react-router-dom'
import { useGameStore } from '@/store/gameStore'
import { CharacterAvatar } from '@/components/CharacterAvatar'
import { LevelBadge } from '@/components/LevelBadge'

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
  const records = useGameStore((s) => s.chapterRecords)

  return (
    <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <Link to="/" className="text-white/60 hover:text-white text-sm">
        ← 메인으로
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <CharacterAvatar size={70} />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">챕터 선택</h2>
          <LevelBadge compact />
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {CHAPTERS.map((c) => {
          const record = records[c.id]
          const inner = (
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <div className="text-white font-semibold flex items-center gap-2">
                  Chapter {c.id}. {c.title}
                  {record && (
                    <span className="text-yellow-300">
                      {'★'.repeat(record.stars)}
                      <span className="text-white/20">{'★'.repeat(3 - record.stars)}</span>
                    </span>
                  )}
                </div>
                <div className="text-white/50 text-sm">{c.topic}</div>
                {record && (
                  <div className="text-xs text-white/40 mt-0.5">최고 콤보 {record.bestCombo}</div>
                )}
              </div>
              <span className="text-space-accent text-2xl">{c.available ? '▶' : '🔒'}</span>
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
