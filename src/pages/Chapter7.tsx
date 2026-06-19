import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { chapter7Phases, QUEEN } from '@/data/chapter7'
import { ProblemPanel } from '@/components/problem/ProblemPanel'
import { Boss } from '@/components/arcade/Boss'
import { DamageFloater, type DamageNumber } from '@/components/arcade/DamageFloater'
import { StageHeader } from '@/components/arcade/StageHeader'
import { ScreenShake } from '@/components/arcade/ScreenShake'
import { CrisisOverlay } from '@/components/CrisisOverlay'
import { CountdownTimer } from '@/components/CountdownTimer'
import { ResourceBar } from '@/components/ResourceBar'
import { LevelBadge } from '@/components/LevelBadge'
import { DialogueBox } from '@/components/DialogueBox'
import { RockyAvatar } from '@/components/RockyAvatar'
import { useChapterRun } from '@/hooks/useChapterRun'
import { judge } from '@/lib/judge'
import { sfx } from '@/lib/sfx'
import type { StudentAnswer } from '@/types/problem'

const TOTAL_PROBLEMS = chapter7Phases.reduce((s, p) => s + p.problems.length, 0)

export function Chapter7() {
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [problemIdx, setProblemIdx] = useState(0)
  const [hp, setHp] = useState(QUEEN.maxHp)
  const [studentAnswer, setStudentAnswer] = useState<StudentAnswer>({ kind: 'fraction', value: null })
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'simplify' | 'timeout' | 'correct'>('idle')
  const [bossHit, setBossHit] = useState(false)
  const [bossDead, setBossDead] = useState(false)
  const [shake, setShake] = useState(0)
  const [damageNumbers, setDamageNumbers] = useState<DamageNumber[]>([])
  const [phaseBanner, setPhaseBanner] = useState<string | null>(null)
  const damageIdRef = useRef(0)
  const run = useChapterRun({ chapterId: 7, maxScore: TOTAL_PROBLEMS * 700 })

  const phase = chapter7Phases[phaseIdx]
  const problem = phase.problems[problemIdx]
  const crisis = phaseIdx >= 2
  const baseTime = run.store.baseTimePerProblem()
  const timer = crisis ? baseTime - 5 : baseTime + 5

  useEffect(() => {
    if (run.isDead) {
      run.store.resetForChapter()
      setHp(QUEEN.maxHp)
      setPhaseIdx(0)
      setProblemIdx(0)
      setBossDead(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run.isDead])

  const pushDamage = (amount: number, type: DamageNumber['type']) => {
    damageIdRef.current += 1
    const id = damageIdRef.current
    setDamageNumbers((ns) => [...ns, { id, amount, type, x: 0.3 + Math.random() * 0.4 }])
    setTimeout(() => setDamageNumbers((ns) => ns.filter((n) => n.id !== id)), 1100)
  }

  const showPhaseBanner = (text: string) => {
    setPhaseBanner(text)
    sfx.bossLaugh()
    setShake((s) => s + 1)
    setTimeout(() => setPhaseBanner(null), 1800)
  }

  const handleTimeout = useCallback(() => {
    if (feedback !== 'idle') return
    run.onTimeout(18)
    setShake((s) => s + 1)
    pushDamage(0, 'miss')
    setFeedback('timeout')
  }, [feedback, run])

  const submit = useCallback(() => {
    const j = judge(problem, studentAnswer)
    if (j.kind === 'wrong') {
      run.onWrong(crisis ? 14 : 10)
      pushDamage(0, 'miss')
      setShake((s) => s + 1)
      setFeedback('wrong')
      return
    }
    if (j.kind === 'need-simplify') {
      run.onWrong(5)
      setFeedback('simplify')
      return
    }
    // 정답
    const isCrit = run.combo >= 4 || (run.combo >= 2 && Math.random() < 0.4)
    const baseDmg = 25 + problem.difficulty * 5 + phaseIdx * 5
    const dmg = Math.round((baseDmg + run.combo * 3) * (isCrit ? 2 : 1))
    const newHp = Math.max(0, hp - dmg)
    setHp(newHp)
    setBossHit(true)
    setTimeout(() => setBossHit(false), 300)
    pushDamage(dmg, isCrit ? 'crit' : 'normal')
    run.onCorrect({ xpBase: 35 + problem.difficulty * 8, scoreGain: 500 + problem.difficulty * 100, crit: isCrit, difficulty: problem.difficulty })
    if (isCrit) sfx.crit()
    else sfx.hit()
    if (isCrit) setShake((s) => s + 1)
    setFeedback('correct')

    if (newHp <= 0) {
      setBossDead(true)
      sfx.bossDie()
      setTimeout(() => run.finish({ bossDefeated: true }), 1800)
      return
    }
    // 다음 페이즈/문제
    setTimeout(() => {
      let nextPhase = phaseIdx
      let nextProblem = problemIdx + 1
      if (nextProblem >= phase.problems.length) {
        nextPhase = phaseIdx + 1
        nextProblem = 0
        if (nextPhase >= chapter7Phases.length) {
          run.finish({ bossDefeated: newHp <= 0 })
          return
        }
        showPhaseBanner(chapter7Phases[nextPhase].name)
      }
      setPhaseIdx(nextPhase)
      setProblemIdx(nextProblem)
      setFeedback('idle')
      setStudentAnswer({ kind: 'fraction', value: null })
    }, 1000)
  }, [problem, studentAnswer, hp, phaseIdx, problemIdx, phase.problems.length, crisis, run])

  const rockyMood = feedback === 'correct' ? 'excited' : feedback === 'wrong' || feedback === 'timeout' ? 'sad' : 'neutral'

  return (
    <div className="min-h-screen px-4 sm:px-6 py-4 max-w-2xl mx-auto flex flex-col">
      <CrisisOverlay active={crisis} />
      <ScreenShake shake={shake}>
        <header className="flex items-center justify-between">
          <Link to="/chapters" className="text-white/60 hover:text-white text-sm">
            ← 챕터 선택
          </Link>
          <LevelBadge compact />
        </header>

        <StageHeader
          stage={`STAGE 7 · FINAL`}
          subtitle={`${phase.name} — ${phase.subtitle}`}
          combo={run.combo}
          score={run.score}
        />
        <ResourceBar />

        <div className="relative mt-3">
          <Boss name={QUEEN.name} hp={hp} maxHp={QUEEN.maxHp} isHit={bossHit} isDead={bossDead} />
          <DamageFloater numbers={damageNumbers} />
        </div>

        <div className="mt-3">
          <CountdownTimer
            durationSec={timer}
            paused={feedback !== 'idle' || bossDead || !!phaseBanner}
            onTimeout={handleTimeout}
            resetKey={`${phaseIdx}-${problemIdx}`}
            crisis={crisis}
          />
        </div>

        <div className="mt-3 flex items-start gap-3">
          <RockyAvatar mood={rockyMood} size={56} />
          <div className="flex-1 space-y-2">
            <DialogueBox speaker={`PHASE ${phaseIdx + 1}`} tone="system" text={problem.scenario} />
            <DialogueBox speaker={`★ 난이도 ${problem.difficulty}`} tone="narrator" text={problem.prompt} />
          </div>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <ProblemPanel
            problem={problem}
            onAnswerChange={setStudentAnswer}
            disabled={feedback === 'correct' || bossDead}
          />
        </div>

        <AnimatePresence>
          {feedback === 'wrong' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 p-2 rounded bg-red-500/20 text-red-200 text-xs text-center">
              ❌ 빗나감 (산소 -{crisis ? 14 : 10})
            </motion.div>
          )}
          {feedback === 'timeout' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 p-2 rounded bg-orange-500/20 text-orange-200 text-xs text-center">
              ⏱ MISS — 여왕의 반격 (산소 -18)
            </motion.div>
          )}
          {feedback === 'simplify' && (
            <div className="mt-2 p-2 rounded bg-yellow-500/20 text-yellow-200 text-xs text-center">
              🤏 기약분수로! (-5)
            </div>
          )}
        </AnimatePresence>

        <div className="mt-3 flex gap-2">
          {feedback === 'correct' || bossDead ? (
            <div className="flex-1 px-4 py-3 rounded-xl bg-emerald-500/20 text-emerald-200 text-center font-bold">
              {bossDead ? '👑 봉인 완료!' : '명중! 다음...'}
            </div>
          ) : feedback === 'idle' ? (
            <button onClick={submit} className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-bold">
              ⚔ 일격
            </button>
          ) : (
            <button onClick={() => setFeedback('idle')} className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20">
              다시 시도
            </button>
          )}
        </div>
      </ScreenShake>

      <AnimatePresence>
        {phaseBanner && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-700 to-purple-900 text-white font-black text-2xl font-mono drop-shadow-[4px_4px_0_rgba(0,0,0,0.6)] border-2 border-yellow-300">
              ⚠ {phaseBanner} ⚠
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
