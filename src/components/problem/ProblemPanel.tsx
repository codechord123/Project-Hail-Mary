import { useCallback, useState } from 'react'
import type { Problem, StudentAnswer } from '@/types/problem'
import { FractionInput } from '@/components/FractionInput'
import { NumericAnswer } from './NumericAnswer'
import { MCQAnswer } from './MCQAnswer'
import { CompareAnswer } from './CompareAnswer'
import { MultiPartAnswer } from './MultiPartAnswer'

interface Props {
  problem: Problem
  onAnswerChange: (a: StudentAnswer) => void
  disabled?: boolean
}

export function ProblemPanel({ problem, onAnswerChange, disabled }: Props) {
  const [, setRev] = useState(0)
  const resetKey = problem.id

  const handleFraction = useCallback(
    (v: any) => onAnswerChange({ kind: 'fraction', value: v }),
    [onAnswerChange],
  )
  const handleNumeric = useCallback(
    (v: any) => onAnswerChange({ kind: 'numeric', value: v }),
    [onAnswerChange],
  )
  const handleMcq = useCallback(
    (vs: number[]) => onAnswerChange({ kind: 'mcq', values: vs }),
    [onAnswerChange],
  )
  const handleCompare = useCallback(
    (op: any) => onAnswerChange({ kind: 'compare', op }),
    [onAnswerChange],
  )
  const handleMulti = useCallback(
    ({ workspace, value }: { workspace: string; value: any }) =>
      onAnswerChange({ kind: 'multi', workspace, value }),
    [onAnswerChange],
  )

  // resetKey 변경 시 자식 리마운트 유도
  useState(() => setRev((r) => r + 1))

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {problem.kind === 'fraction' && (
        <FractionInput onChange={handleFraction} disabled={disabled} />
      )}
      {problem.kind === 'numeric' && (
        <NumericAnswer
          unit={problem.unit}
          onChange={handleNumeric}
          resetKey={resetKey}
          disabled={disabled}
        />
      )}
      {problem.kind === 'mcq' && (
        <MCQAnswer
          choices={problem.choices}
          multiple={problem.multiple}
          onChange={handleMcq}
          resetKey={resetKey}
          disabled={disabled}
        />
      )}
      {problem.kind === 'compare' && (
        <CompareAnswer
          left={problem.left}
          right={problem.right}
          onChange={handleCompare}
          resetKey={resetKey}
          disabled={disabled}
        />
      )}
      {problem.kind === 'multi' && (
        <MultiPartAnswer
          placeholder={problem.workspacePlaceholder}
          onChange={handleMulti}
          resetKey={resetKey}
          disabled={disabled}
        />
      )}
    </div>
  )
}
