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
  // 이분모 덧셈 12종 — 분모 다양 / 약분 필요 / 서로소·배수·공통인수 혼합
  // A 서로소: 5/8 + 1/3 = 15/24 + 8/24 = 23/24
  { id: 'c4-1', a: { numerator: 5, denominator: 8 }, b: { numerator: 1, denominator: 3 }, enemy: '👽', requireSimplified: true },
  // C 공통인수: 5/6 + 3/8 = 20/24 + 9/24 = 29/24 (가분수)
  { id: 'c4-2', a: { numerator: 5, denominator: 6 }, b: { numerator: 3, denominator: 8 }, enemy: '🤖', requireSimplified: true },
  // C 공통인수: 5/12 + 1/8 = 10/24 + 3/24 = 13/24
  { id: 'c4-3', a: { numerator: 5, denominator: 12 }, b: { numerator: 1, denominator: 8 }, enemy: '🦑', requireSimplified: true },
  // A 서로소: 3/5 + 1/4 = 12/20 + 5/20 = 17/20
  { id: 'c4-4', a: { numerator: 3, denominator: 5 }, b: { numerator: 1, denominator: 4 }, enemy: '👹', requireSimplified: true },
  // A 서로소: 2/7 + 3/4 = 8/28 + 21/28 = 29/28 (가분수)
  { id: 'c4-5', a: { numerator: 2, denominator: 7 }, b: { numerator: 3, denominator: 4 }, enemy: '🐙', requireSimplified: true },
  // B 배수: 3/4 + 5/12 = 9/12 + 5/12 = 14/12 = 7/6 (약분 필요)
  { id: 'c4-6', a: { numerator: 3, denominator: 4 }, b: { numerator: 5, denominator: 12 }, enemy: '👽', requireSimplified: true },
  // B 배수: 7/10 + 3/5 = 7/10 + 6/10 = 13/10 (가분수)
  { id: 'c4-7', a: { numerator: 7, denominator: 10 }, b: { numerator: 3, denominator: 5 }, enemy: '🦠', requireSimplified: true },
  // C 공통인수: 7/15 + 1/6 = 14/30 + 5/30 = 19/30
  { id: 'c4-8', a: { numerator: 7, denominator: 15 }, b: { numerator: 1, denominator: 6 }, enemy: '🛸', requireSimplified: true },
  // C 공통인수: 7/12 + 5/18 = 21/36 + 10/36 = 31/36
  { id: 'c4-9', a: { numerator: 7, denominator: 12 }, b: { numerator: 5, denominator: 18 }, enemy: '🤖', requireSimplified: true },
  // C 공통인수: 5/9 + 1/6 = 10/18 + 3/18 = 13/18
  { id: 'c4-10', a: { numerator: 5, denominator: 9 }, b: { numerator: 1, denominator: 6 }, enemy: '👽', requireSimplified: true },
  // B 배수: 1/2 + 3/10 = 5/10 + 3/10 = 8/10 = 4/5 (약분 필요)
  { id: 'c4-11', a: { numerator: 1, denominator: 2 }, b: { numerator: 3, denominator: 10 }, enemy: '🦑', requireSimplified: true },
  // A 서로소: 4/9 + 1/2 = 8/18 + 9/18 = 17/18
  { id: 'c4-12', a: { numerator: 4, denominator: 9 }, b: { numerator: 1, denominator: 2 }, enemy: '🐙', requireSimplified: true },
]

export const chapter4Expected = (t: DefenseTarget) => addFractions(t.a, t.b)

/** 한 적이 화면 끝에 도달하기까지 (초) */
export const LANE_ADVANCE_SEC = 14
/** 동시 등장 레인 수 */
export const LANE_COUNT = 3
