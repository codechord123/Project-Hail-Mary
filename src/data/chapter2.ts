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
  // 이분모 뺄셈 8웨이브 — 모두 약분 필요 / LCM 다양화
  {
    id: 'c2-1', // C 공통인수: 5/6 − 1/4 = 10/12 − 3/12 = 7/12
    a: { numerator: 5, denominator: 6 },
    b: { numerator: 1, denominator: 4 },
    enemy: '🐛',
    speedSec: 14,
    requireSimplified: true,
    story: '식량 5/6 중 1/4 도난. 남은 양 (기약)?',
  },
  {
    id: 'c2-2', // B 배수: 11/12 − 1/3 = 11/12 − 4/12 = 7/12
    a: { numerator: 11, denominator: 12 },
    b: { numerator: 1, denominator: 3 },
    enemy: '👾',
    speedSec: 13,
    requireSimplified: true,
    story: '물 11/12 에서 1/3 증발. 남은 양 (기약)?',
  },
  {
    id: 'c2-3', // A 서로소: 5/8 − 1/3 = 15/24 − 8/24 = 7/24
    a: { numerator: 5, denominator: 8 },
    b: { numerator: 1, denominator: 3 },
    enemy: '🪳',
    speedSec: 12,
    requireSimplified: true,
    story: '연료 5/8 중 1/3 누출. 남은 (기약)?',
  },
  {
    id: 'c2-4', // B 배수: 9/10 − 2/5 = 9/10 − 4/10 = 5/10 → 1/2 (약분 필요)
    a: { numerator: 9, denominator: 10 },
    b: { numerator: 2, denominator: 5 },
    enemy: '🦠',
    speedSec: 11,
    requireSimplified: true,
    story: '에너지 9/10 − 2/5 = ? (기약)',
  },
  {
    id: 'c2-5', // A 서로소: 4/5 − 1/3 = 12/15 − 5/15 = 7/15
    a: { numerator: 4, denominator: 5 },
    b: { numerator: 1, denominator: 3 },
    enemy: '🐛',
    speedSec: 10,
    requireSimplified: true,
    story: '비상 라인 4/5 − 1/3 = ? (기약)',
  },
  {
    id: 'c2-6', // C 공통인수: 11/15 − 1/6 = 22/30 − 5/30 = 17/30
    a: { numerator: 11, denominator: 15 },
    b: { numerator: 1, denominator: 6 },
    enemy: '👾',
    speedSec: 9,
    requireSimplified: true,
    story: '냉각수 11/15 − 1/6 = ? (기약)',
  },
  {
    id: 'c2-7', // C 공통인수: 7/8 − 5/12 = 21/24 − 10/24 = 11/24
    a: { numerator: 7, denominator: 8 },
    b: { numerator: 5, denominator: 12 },
    enemy: '🪳',
    speedSec: 8,
    requireSimplified: true,
    story: '비상 산소 7/8 − 5/12 = ? (기약)',
  },
  {
    id: 'c2-8', // 보스 — A 서로소: 7/9 − 1/4 = 28/36 − 9/36 = 19/36
    a: { numerator: 7, denominator: 9 },
    b: { numerator: 1, denominator: 4 },
    enemy: '🛸',
    speedSec: 8,
    requireSimplified: true,
    story: '보스 침입! 7/9 − 1/4 = ? (기약!)',
  },
]
