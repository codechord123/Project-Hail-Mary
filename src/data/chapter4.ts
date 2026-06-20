import type { Fraction } from '@/types/fraction'
import { addFractions } from '@/lib/fractionMath'

export interface DefenseTarget {
  id: string
  a: Fraction
  b: Fraction
  enemy: string
  requireSimplified: boolean
}

export const chapter4Targets: DefenseTarget[] = [
  // 패턴 다양화: 서로소(A) / 배수(B) / 공통인수(C) 골고루
  // A: 1/3 + 1/4 = 7/12 (서로소)
  { id: 'c4-1', a: { numerator: 1, denominator: 3 }, b: { numerator: 1, denominator: 4 }, enemy: '👽', requireSimplified: true },
  // A: 2/5 + 1/2 = 9/10 (서로소)
  { id: 'c4-2', a: { numerator: 2, denominator: 5 }, b: { numerator: 1, denominator: 2 }, enemy: '🤖', requireSimplified: true },
  // C: 1/6 + 1/4 = 5/12 (공통인수)
  { id: 'c4-3', a: { numerator: 1, denominator: 6 }, b: { numerator: 1, denominator: 4 }, enemy: '🦑', requireSimplified: true },
  // A: 3/8 + 1/3 = 17/24 (서로소)
  { id: 'c4-4', a: { numerator: 3, denominator: 8 }, b: { numerator: 1, denominator: 3 }, enemy: '👹', requireSimplified: true },
  // A: 2/7 + 1/2 = 11/14 (서로소)
  { id: 'c4-5', a: { numerator: 2, denominator: 7 }, b: { numerator: 1, denominator: 2 }, enemy: '🐙', requireSimplified: true },
  // B: 1/4 + 3/8 = 5/8 (배수)
  { id: 'c4-6', a: { numerator: 1, denominator: 4 }, b: { numerator: 3, denominator: 8 }, enemy: '👽', requireSimplified: true },
  // B: 1/5 + 3/10 = 5/10 = 1/2 (배수, 약분 필요)
  { id: 'c4-7', a: { numerator: 1, denominator: 5 }, b: { numerator: 3, denominator: 10 }, enemy: '🦠', requireSimplified: true },
  // B: 2/9 + 1/3 = 5/9 (배수)
  { id: 'c4-8', a: { numerator: 2, denominator: 9 }, b: { numerator: 1, denominator: 3 }, enemy: '🛸', requireSimplified: true },
  // B: 1/6 + 5/12 = 7/12 (배수)
  { id: 'c4-9', a: { numerator: 1, denominator: 6 }, b: { numerator: 5, denominator: 12 }, enemy: '🤖', requireSimplified: true },
  // C: 5/6 + 1/4 = 10/12 + 3/12 = 13/12 (공통인수, 가분수)
  { id: 'c4-10', a: { numerator: 5, denominator: 6 }, b: { numerator: 1, denominator: 4 }, enemy: '👽', requireSimplified: true },
  // A: 3/5 + 1/4 = 12/20 + 5/20 = 17/20 (서로소)
  { id: 'c4-11', a: { numerator: 3, denominator: 5 }, b: { numerator: 1, denominator: 4 }, enemy: '🦑', requireSimplified: true },
  // C: 5/9 + 1/6 = 10/18 + 3/18 = 13/18 (공통인수)
  { id: 'c4-12', a: { numerator: 5, denominator: 9 }, b: { numerator: 1, denominator: 6 }, enemy: '🐙', requireSimplified: true },
]

export const chapter4Expected = (t: DefenseTarget) => addFractions(t.a, t.b)

/** 한 적이 화면 끝에 도달하기까지 (초) */
export const LANE_ADVANCE_SEC = 14
/** 동시 등장 레인 수 */
export const LANE_COUNT = 3
