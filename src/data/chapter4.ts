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
  { id: 'c4-1', a: { numerator: 1, denominator: 3 }, b: { numerator: 1, denominator: 4 }, enemy: '👽', requireSimplified: true },
  { id: 'c4-2', a: { numerator: 2, denominator: 5 }, b: { numerator: 1, denominator: 2 }, enemy: '🤖', requireSimplified: true },
  { id: 'c4-3', a: { numerator: 1, denominator: 6 }, b: { numerator: 1, denominator: 4 }, enemy: '🦑', requireSimplified: true },
  { id: 'c4-4', a: { numerator: 3, denominator: 8 }, b: { numerator: 1, denominator: 3 }, enemy: '👹', requireSimplified: true },
  { id: 'c4-5', a: { numerator: 2, denominator: 7 }, b: { numerator: 1, denominator: 2 }, enemy: '🐙', requireSimplified: true },
  { id: 'c4-6', a: { numerator: 1, denominator: 4 }, b: { numerator: 3, denominator: 8 }, enemy: '👽', requireSimplified: true },
  { id: 'c4-7', a: { numerator: 1, denominator: 5 }, b: { numerator: 3, denominator: 10 }, enemy: '🦠', requireSimplified: true },
  { id: 'c4-8', a: { numerator: 2, denominator: 9 }, b: { numerator: 1, denominator: 3 }, enemy: '🛸', requireSimplified: true },
  { id: 'c4-9', a: { numerator: 1, denominator: 6 }, b: { numerator: 5, denominator: 12 }, enemy: '🤖', requireSimplified: true },
]

export const chapter4Expected = (t: DefenseTarget) => addFractions(t.a, t.b)

/** 한 적이 화면 끝에 도달하기까지 (초) */
export const LANE_ADVANCE_SEC = 14
/** 동시 등장 레인 수 */
export const LANE_COUNT = 3
