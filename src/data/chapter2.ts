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
  // 다른 분모 위주로 난이도 상향. 답은 모두 기약 가능한 형태.
  {
    id: 'c2-1',
    a: { numerator: 7, denominator: 8 },
    b: { numerator: 1, denominator: 4 },
    enemy: '🐛',
    speedSec: 14,
    requireSimplified: true,
    story: '식량 7/8 중 1/4 도난. 남은 양 (기약)?',
  },
  {
    id: 'c2-2',
    a: { numerator: 9, denominator: 10 },
    b: { numerator: 2, denominator: 5 },
    enemy: '👾',
    speedSec: 13,
    requireSimplified: true,
    story: '물 9/10 에서 2/5 증발. 남은 양 (기약)?',
  },
  {
    id: 'c2-3',
    a: { numerator: 11, denominator: 12 },
    b: { numerator: 1, denominator: 3 },
    enemy: '🪳',
    speedSec: 12,
    requireSimplified: true,
    story: '연료 11/12 중 1/3 누출. 남은 (기약)?',
  },
  {
    id: 'c2-4',
    a: { numerator: 5, denominator: 6 },
    b: { numerator: 1, denominator: 4 },
    enemy: '🦠',
    speedSec: 11,
    requireSimplified: true,
    story: '에너지 5/6 − 1/4 = ? (기약)',
  },
  {
    id: 'c2-5',
    a: { numerator: 7, denominator: 9 },
    b: { numerator: 1, denominator: 3 },
    enemy: '🐛',
    speedSec: 10,
    requireSimplified: true,
    story: '비상 라인 7/9 − 1/3 = ? (기약)',
  },
  {
    id: 'c2-6',
    a: { numerator: 11, denominator: 12 },
    b: { numerator: 1, denominator: 4 },
    enemy: '🛸',
    speedSec: 9,
    requireSimplified: true,
    story: '보스 침입! 11/12 − 1/4 = ? (기약!)',
  },
]
