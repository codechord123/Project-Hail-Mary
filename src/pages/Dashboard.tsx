import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGameStore } from '@/store/gameStore'
import { computeLevelInfo } from '@/lib/leveling'
import { CharacterAvatar } from '@/components/CharacterAvatar'

const CHAPTERS = [
  { id: 1, title: '깨어남', topic: '같은 분모 +', genre: '🤲 조작' },
  { id: 2, title: '식량 점검', topic: '같은 분모 −', genre: '🚀 슈팅' },
  { id: 3, title: '미지의 신호', topic: '약분 통분', genre: '🕹 보스' },
  { id: 4, title: '첫 만남', topic: '다른 분모 +', genre: '🛡 디펜스' },
  { id: 5, title: '동력실', topic: '다른 분모 −', genre: '⚡ 리액터' },
  { id: 6, title: '배양', topic: '대분수', genre: '🃏 매칭' },
  { id: 7, title: '귀환', topic: '종합', genre: '👹 풀보스' },
]

export function Dashboard() {
  const store = useGameStore()
  const info = computeLevelInfo(store.totalXp)
  const [editName, setEditName] = useState(store.studentName)
  const [editCode, setEditCode] = useState(store.classCode)

  const totalCleared = store.clearedChapters.length
  const totalStars = Object.values(store.chapterRecords).reduce((s, r) => s + r.stars, 0)

  return (
    <div className="min-h-screen px-6 py-8 max-w-3xl mx-auto">
      <Link to="/" className="text-white/60 hover:text-white text-sm">
        ← 메인으로
      </Link>
      <h2 className="mt-3 text-3xl font-bold text-white">📊 항해 진도판</h2>
      <p className="text-white/60 text-sm mt-1">선생님 / 보호자가 학습 진행을 한눈에 확인할 수 있어요.</p>

      {/* 학생 정보 */}
      <section className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-4">
          <CharacterAvatar size={80} />
          <div className="flex-1">
            <div className="text-white/60 text-xs">학생 이름</div>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => store.setStudentName(editName)}
              placeholder="이름 입력"
              className="w-full mt-1 px-3 py-1.5 rounded bg-black/40 text-white border border-white/20 focus:outline-none focus:border-space-accent"
            />
            <div className="mt-2 text-white/60 text-xs">학급 코드 (선택)</div>
            <input
              value={editCode}
              onChange={(e) => setEditCode(e.target.value)}
              onBlur={() => store.setClassCode(editCode)}
              placeholder="예: 5-3 또는 6반"
              className="w-full mt-1 px-3 py-1.5 rounded bg-black/40 text-white border border-white/20 focus:outline-none focus:border-space-accent text-sm"
            />
          </div>
        </div>
      </section>

      {/* 요약 통계 */}
      <section className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Stat label="레벨" value={`Lv.${info.level}`} accent={info.titleColor} />
        <Stat label="칭호" value={info.title} accent={info.titleColor} />
        <Stat label="클리어 챕터" value={`${totalCleared} / 7`} accent="text-cyan-300" />
        <Stat label="총 별" value={`${totalStars} / 21`} accent="text-yellow-300" />
      </section>

      {/* 챕터별 진도 */}
      <section className="mt-4 p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-bold text-white mb-3">챕터별 진도</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-white/50 text-xs">
                <th className="py-1">챕터</th>
                <th>장르</th>
                <th>주제</th>
                <th>상태</th>
                <th>별</th>
                <th>최고 콤보</th>
              </tr>
            </thead>
            <tbody>
              {CHAPTERS.map((c) => {
                const cleared = store.clearedChapters.includes(c.id)
                const record = store.chapterRecords[c.id]
                return (
                  <tr key={c.id} className="border-t border-white/10">
                    <td className="py-2 text-white font-semibold">{c.id}. {c.title}</td>
                    <td className="text-white/70 text-xs">{c.genre}</td>
                    <td className="text-white/60 text-xs">{c.topic}</td>
                    <td>
                      {cleared ? (
                        <span className="text-emerald-300 text-xs font-bold">✓ 클리어</span>
                      ) : (
                        <span className="text-white/30 text-xs">미진행</span>
                      )}
                    </td>
                    <td className="text-yellow-300">
                      {record ? '★'.repeat(record.stars) : '—'}
                      <span className="text-white/15">{record ? '★'.repeat(3 - record.stars) : ''}</span>
                    </td>
                    <td className="text-pink-300 text-xs">{record ? `×${record.bestCombo}` : '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 학급 적용 옵션 */}
      <section className="mt-4 p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-bold text-white mb-3">수업 활용 옵션</h3>
        <label className="flex items-center justify-between p-3 rounded-lg bg-black/30 cursor-pointer">
          <div>
            <div className="text-white font-semibold">📺 발표 모드</div>
            <div className="text-xs text-white/60 mt-0.5">UI 단순화 + 글자 키움. 교실 빔프로젝터용.</div>
          </div>
          <input
            type="checkbox"
            checked={store.presentationMode}
            onChange={() => store.togglePresentationMode()}
            className="w-5 h-5 accent-space-accent"
          />
        </label>
        <button
          onClick={() => {
            if (window.confirm('정말 모든 진도와 캐릭터를 초기화할까요?')) {
              store.reset()
            }
          }}
          className="mt-3 w-full px-3 py-2 rounded-lg bg-red-500/15 text-red-300 border border-red-500/30 text-sm"
        >
          🗑 진도 전체 초기화 (다음 학생 사용 전)
        </button>
      </section>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="p-3 rounded-lg bg-black/30 border border-white/10">
      <div className="text-[10px] text-white/50 uppercase">{label}</div>
      <div className={`text-xl font-bold ${accent} mt-0.5`}>{value}</div>
    </div>
  )
}
