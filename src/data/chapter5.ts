import type { Fraction } from '@/types/fraction'
import { lcm, subtractFractions } from '@/lib/fractionMath'

export interface ReactorBreach {
  id: string
  a: Fraction
  b: Fraction
  /** 누출 위치 */
  location: '냉각 펌프' | '연료 라인' | '추진 노즐' | '생명 유지'
}

export const chapter5Breaches: ReactorBreach[] = [
  // 2/3 - 1/6 = 1/2 (약분 필요: 3/6 → 1/2)
  { id: 'c5-1', a: { numerator: 2, denominator: 3 }, b: { numerator: 1, denominator: 6 }, location: '냉각 펌프' },
  // 7/10 - 2/5 = 3/10 (이미 기약)
  { id: 'c5-2', a: { numerator: 7, denominator: 10 }, b: { numerator: 2, denominator: 5 }, location: '연료 라인' },
  // 5/6 - 1/3 = 1/2 (약분 필요: 3/6 → 1/2)
  { id: 'c5-3', a: { numerator: 5, denominator: 6 }, b: { numerator: 1, denominator: 3 }, location: '추진 노즐' },
  // 4/5 - 1/4 = 11/20 (이미 기약)
  { id: 'c5-4', a: { numerator: 4, denominator: 5 }, b: { numerator: 1, denominator: 4 }, location: '생명 유지' },
  // 11/12 - 1/4 = 2/3 (약분 필요: 8/12 → 2/3)
  { id: 'c5-5', a: { numerator: 11, denominator: 12 }, b: { numerator: 1, denominator: 4 }, location: '냉각 펌프' },
]

export interface BreachSolution {
  commonDenom: number // 통분
  result: Fraction // 계산 결과 (약분 전)
  simplified: Fraction // 기약
}

export const solveBreach = (b: ReactorBreach): BreachSolution => {
  const commonDenom = lcm(b.a.denominator, b.b.denominator)
  const raw = subtractFractions(b.a, b.b) // already gives lcm denom by current impl
  const r = { numerator: raw.numerator, denominator: raw.denominator }
  // 약분
  let g = 1
  for (let i = 2; i <= Math.abs(r.numerator) && i <= r.denominator; i++) {
    if (r.numerator % i === 0 && r.denominator % i === 0) g = i
  }
  return {
    commonDenom,
    result: { numerator: r.numerator, denominator: r.denominator },
    simplified: { numerator: r.numerator / g, denominator: r.denominator / g },
  }
}
