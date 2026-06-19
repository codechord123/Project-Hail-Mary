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
  {
    id: 'c2-1',
    a: { numerator: 7, denominator: 8 },
    b: { numerator: 3, denominator: 8 },
    enemy: '🐛',
    speedSec: 14,
    requireSimplified: false,
    story: '식량 도둑 출현! 7/8에서 3/8을 가져가면 남는 양은?',
  },
  {
    id: 'c2-2',
    a: { numerator: 9, denominator: 10 },
    b: { numerator: 4, denominator: 10 },
    enemy: '👾',
    speedSec: 13,
    requireSimplified: false,
    story: '물탱크 9/10 중 4/10을 외계충이 마셨다. 남은 물은?',
  },
  {
    id: 'c2-3',
    a: { numerator: 11, denominator: 12 },
    b: { numerator: 5, denominator: 12 },
    enemy: '🪳',
    speedSec: 12,
    requireSimplified: false,
    story: '연료 11/12에서 5/12를 잃었다.',
  },
  {
    id: 'c2-4',
    a: { numerator: 5, denominator: 6 },
    b: { numerator: 1, denominator: 6 },
    enemy: '🦠',
    speedSec: 11,
    requireSimplified: true,
    story: '기약분수로 응답! 5/6 - 1/6 = ?',
  },
  {
    id: 'c2-5',
    a: { numerator: 7, denominator: 9 },
    b: { numerator: 4, denominator: 9 },
    enemy: '🐛',
    speedSec: 10,
    requireSimplified: true,
    story: '기약분수로! 7/9 - 4/9 = ?',
  },
  {
    id: 'c2-6',
    a: { numerator: 11, denominator: 12 },
    b: { numerator: 3, denominator: 12 },
    enemy: '🛸',
    speedSec: 9,
    requireSimplified: true,
    story: '보스 침입! 11/12 - 3/12 (기약!)',
  },
]
