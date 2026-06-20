import type { Fraction } from '@/types/fraction'
import { subtractFractions } from '@/lib/fractionMath'

export interface ShooterWave {
  id: string
  a: Fraction
  b: Fraction
  enemy: '🐛' | '👾' | '🪳' | '🦠' | '🛸'
  speedSec: number // 화면 최상단에서 바닥 도달까지 초
  requireSimplified: boolean
  /** 표시될 식 — 일반 뺄셈 */
  story?: string
}

const expected = (a: Fraction, b: Fraction): Fraction => subtractFractions(a, b)
export { expected as chapter2Expected }

export const chapter2Waves: ShooterWave[] = [
  // 분모 패턴 다양화: 배수(B), 공통인수(C), 서로소(A) 혼합. 모두 기약 가능.
  {
    id: 'c2-1', // B 배수: LCM=8
    a: { numerator: 7, denominator: 8 },
    b: { numerator: 1, denominator: 4 },
    enemy: '🐛',
    speedSec: 14,
    requireSimplified: true,
    story: '식량 7/8 중 1/4 도난. 남은 양 (기약)?',
  },
  {
    id: 'c2-2', // B 배수: LCM=10. 9/10-4/10=5/10=1/2
    a: { numerator: 9, denominator: 10 },
    b: { numerator: 2, denominator: 5 },
    enemy: '👾',
    speedSec: 13,
    requireSimplified: true,
    story: '물 9/10 에서 2/5 증발. 남은 양 (기약)?',
  },
  {
    id: 'c2-3', // A 서로소: LCM=21. 4/3-1/7? 다른 예: 5/7 - 1/3 = 15/21 - 7/21 = 8/21
    a: { numerator: 5, denominator: 7 },
    b: { numerator: 1, denominator: 3 },
    enemy: '🪳',
    speedSec: 12,
    requireSimplified: true,
    story: '연료 5/7 중 1/3 누출. 남은 (기약)?',
  },
  {
    id: 'c2-4', // C 공통인수: LCM=12. 10/12 - 3/12 = 7/12
    a: { numerator: 5, denominator: 6 },
    b: { numerator: 1, denominator: 4 },
    enemy: '🦠',
    speedSec: 11,
    requireSimplified: true,
    story: '에너지 5/6 − 1/4 = ? (기약)',
  },
  {
    id: 'c2-5', // B 배수: 7/9 - 1/3 = 4/9
    a: { numerator: 7, denominator: 9 },
    b: { numerator: 1, denominator: 3 },
    enemy: '🐛',
    speedSec: 10,
    requireSimplified: true,
    story: '비상 라인 7/9 − 1/3 = ? (기약)',
  },
  {
    id: 'c2-6', // C 공통인수: 11/15-2/5 = 11/15-6/15 = 5/15 = 1/3
    a: { numerator: 11, denominator: 15 },
    b: { numerator: 2, denominator: 5 },
    enemy: '👾',
    speedSec: 9,
    requireSimplified: true,
    story: '냉각수 11/15 − 2/5 = ? (기약)',
  },
  {
    id: 'c2-7', // A 서로소: 5/8 - 1/3 = 15/24 - 8/24 = 7/24
    a: { numerator: 5, denominator: 8 },
    b: { numerator: 1, denominator: 3 },
    enemy: '🪳',
    speedSec: 8,
    requireSimplified: true,
    story: '비상 산소 5/8 − 1/3 = ? (기약)',
  },
  {
    id: 'c2-8', // 보스: 11/12 - 1/4 = 8/12 = 2/3 (C 공통인수, 약분 필요)
    a: { numerator: 11, denominator: 12 },
    b: { numerator: 1, denominator: 4 },
    enemy: '🛸',
    speedSec: 8,
    requireSimplified: true,
    story: '보스 침입! 11/12 − 1/4 = ? (기약!)',
  },
]
