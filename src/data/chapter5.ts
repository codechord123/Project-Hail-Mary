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
  // 이분모 뺄셈 8건 — 분모 다양 / 약분 또는 큰 LCM
  // 5/6 - 3/8 = 20/24 - 9/24 = 11/24 (C 공통인수)
  { id: 'c5-1', a: { numerator: 5, denominator: 6 }, b: { numerator: 3, denominator: 8 }, location: '냉각 펌프' },
  // 7/10 - 3/8 = 28/40 - 15/40 = 13/40 (C 공통인수)
  { id: 'c5-2', a: { numerator: 7, denominator: 10 }, b: { numerator: 3, denominator: 8 }, location: '연료 라인' },
  // 7/12 - 1/8 = 14/24 - 3/24 = 11/24 (C 공통인수)
  { id: 'c5-3', a: { numerator: 7, denominator: 12 }, b: { numerator: 1, denominator: 8 }, location: '추진 노즐' },
  // 4/5 - 1/3 = 12/15 - 5/15 = 7/15 (A 서로소)
  { id: 'c5-4', a: { numerator: 4, denominator: 5 }, b: { numerator: 1, denominator: 3 }, location: '생명 유지' },
  // 11/12 - 5/8 = 22/24 - 15/24 = 7/24 (C 공통인수)
  { id: 'c5-5', a: { numerator: 11, denominator: 12 }, b: { numerator: 5, denominator: 8 }, location: '냉각 펌프' },
  // 9/10 - 2/5 = 9/10 - 4/10 = 5/10 = 1/2 (B 배수, 약분 필요)
  { id: 'c5-6', a: { numerator: 9, denominator: 10 }, b: { numerator: 2, denominator: 5 }, location: '연료 라인' },
  // 11/15 - 1/6 = 22/30 - 5/30 = 17/30 (C 공통인수)
  { id: 'c5-7', a: { numerator: 11, denominator: 15 }, b: { numerator: 1, denominator: 6 }, location: '추진 노즐' },
  // 5/6 - 1/4 = 10/12 - 3/12 = 7/12 (C 공통인수)
  { id: 'c5-8', a: { numerator: 5, denominator: 6 }, b: { numerator: 1, denominator: 4 }, location: '생명 유지' },
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
