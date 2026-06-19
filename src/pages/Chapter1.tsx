import { useState, useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { chapter1Problems } from '@/data/chapter1'
import { addFractions, valueEquals, isSimplified } from '@/lib/fractionMath'
import { FractionInput } from '@/components/FractionInput'
import { FractionExpression } from '@/components/FractionDisplay'
import { ResourceBar } from '@/components/ResourceBar'
import { DialogueBox } from '@/components/DialogueBox'
import { useGameStore } from '@/store/gameStore'
import type { Fraction } from '@/types/fraction'

type Feedback =
  | { kind: 'idle' }
  | { kind: 'correct' }
  | { kind: 'wrong'; message: string }
  | { kind: 'need-simplify' }

export function Chapter1() {
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState<Fraction | null>(null)
  const [feedback, setFeedback] = useState<Feedback>({ kind: 'idle' })
  const [showHint, setShowHint] = useState(false)
  const { addOxygen, addEnergy, addBond, clearChapter, energy } = useGameStore()
  const navigate = useNavigate()

  const problem = chapter1Problems[idx]
  const expected = useMemo(() => addFractions(problem.a, problem.b), [problem])
  const isLast = idx === chapter1Problems.length - 1

  const submit = useCallback(() => {
    if (!answer) return
    if (!valueEquals(answer, expected)) {
      addOxygen(-10)
      setFeedback({
        kind: 'wrong',
        message: '아직 맞지 않아. 분모는 그대로, 분자끼리 더해봐.',
      })
      return
    }
    if (problem.requireSimplified && !isSimplified(answer)) {
      addOxygen(-5)
      setFeedback({ kind: 'need-simplify' })
      return
    }
    addEnergy(2)
    addBond(1)
    setFeedback({ kind: 'correct' })
  }, [answer, expected, problem.requireSimplified, addOxygen, addEnergy, addBond])

  const next = useCallback(() => {
    if (isLast) {
      clearChapter(1)
      navigate('/chapter/1/clear')
      return
    }
    setIdx((i) => i + 1)
    setAnswer(null)
    setFeedback({ kind: 'idle' })
    setShowHint(false)
  }, [isLast, clearChapter, navigate])

  const useHint = () => {
    if (energy < 1) return
    addEnergy(-1)
    setShowHint(true)
  }

  return (
    <div className="min-h-screen px-6 py-6 max-w-2xl mx-auto flex flex-col">
      <header className="flex items-center justify-between">
        <Link to="/chapters" className="text-white/60 hover:text-white text-sm">
          ← 챕터 선택
        </Link>
        <ResourceBar />
      </header>

      <h2 className="mt-6 text-2xl font-bold text-white">
        Chapter 1. 깨어남 <span className="text-white/40 text-base">({idx + 1}/{chapter1Problems.length})</span>
      </h2>

      <div className="mt-4 space-y-3">
        <DialogueBox speaker="시스템" tone="system" text={problem.story} />
        {showHint && (
          <DialogueBox speaker="로키" tone="rocky" text={problem.hint} />
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
        <FractionExpression a={problem.a} b={problem.b} operation="add" />
        <FractionInput
          onChange={setAnswer}
          disabled={feedback.kind === 'correct'}
        />
        {problem.requireSimplified && (
          <div className="text-xs text-yellow-300/90">⚠ 기약분수로 답해야 정답이야.</div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {feedback.kind === 'correct' && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-xl bg-green-500/15 border border-green-400/40 text-green-200"
          >
            ✅ 정답! 시스템 복구 +2⚡ / 로키 신뢰도 +1🤝
          </motion.div>
        )}
        {feedback.kind === 'wrong' && (
          <motion.div
            key="ng"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-xl bg-red-500/15 border border-red-400/40 text-red-200"
          >
            ❌ {feedback.message} (산소 -10🫁)
          </motion.div>
        )}
        {feedback.kind === 'need-simplify' && (
          <motion.div
            key="simp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-xl bg-yellow-500/15 border border-yellow-400/40 text-yellow-200"
          >
            🤏 값은 맞지만 더 줄일 수 있어! 기약분수로 다시 입력해줘. (산소 -5🫁)
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex gap-3">
        {feedback.kind === 'correct' ? (
          <button
            onClick={next}
            className="flex-1 px-4 py-3 rounded-xl bg-space-accent text-space-900 font-bold hover:brightness-110 active:scale-95 transition"
          >
            {isLast ? '챕터 완료' : '다음 문제 →'}
          </button>
        ) : (
          <>
            <button
              onClick={submit}
              disabled={!answer}
              className="flex-1 px-4 py-3 rounded-xl bg-space-accent text-space-900 font-bold disabled:opacity-40 hover:brightness-110 active:scale-95 transition"
            >
              제출
            </button>
            <button
              onClick={useHint}
              disabled={showHint || energy < 1}
              className="px-4 py-3 rounded-xl bg-rocky/20 text-rocky border border-rocky/40 disabled:opacity-30 hover:bg-rocky/30 transition"
            >
              💡 힌트 (⚡1)
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export function Chapter1Clear() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl"
      >
        🛰️
      </motion.div>
      <h2 className="mt-6 text-3xl font-bold text-white">챕터 1 클리어!</h2>
      <p className="mt-2 text-white/70 max-w-md">
        산소 탱크와 비상 전원이 복구되었다. 깊은 정적 너머에서 무언가 신호가 들린다…
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          to="/chapters"
          className="px-6 py-3 rounded-xl bg-space-accent text-space-900 font-bold"
        >
          챕터 선택으로
        </Link>
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20"
        >
          메인으로
        </Link>
      </div>
    </div>
  )
}
