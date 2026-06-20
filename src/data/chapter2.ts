import type { Fraction } from '@/types/fraction'
import { subtractFractions } from '@/lib/fractionMath'

export interface ShooterWave {
  id: string
  a: Fraction
  b: Fraction
  enemy: '🐛' | '👾' | '🪳' | '🦠' | '🛸'
  speedSec: number // 화면 최상단에서 바닥 도달까지 초
  requireSimplified: boolean
  /** 문제 독해용 시나리오 (응용 문항) */
  story?: string
}

const expected = (a: Fraction, b: Fraction): Fraction => subtractFractions(a, b)
export { expected as chapter2Expected }

// 속도 ↑ — 응용 독해 시간 확보를 위해 +6~+8초.
export const chapter2Waves: ShooterWave[] = [
  {
    id: 'c2-1', // 5/6 - 1/4 = 10/12 - 3/12 = 7/12
    a: { numerator: 5, denominator: 6 },
    b: { numerator: 1, denominator: 4 },
    enemy: '🐛',
    speedSec: 42,
    requireSimplified: true,
    story: '식량 통이 5/6 만큼 차 있었어. 미생물이 1/4 통을 먹었어. 남은 식량은?',
  },
  {
    id: 'c2-2', // 11/12 - 1/3 = 11/12 - 4/12 = 7/12
    a: { numerator: 11, denominator: 12 },
    b: { numerator: 1, denominator: 3 },
    enemy: '👾',
    speedSec: 40,
    requireSimplified: true,
    story: '물탱크에 11/12 통이 있었어. 새벽에 1/3 통이 증발했어. 남은 물은?',
  },
  {
    id: 'c2-3', // 5/8 - 1/3 = 15/24 - 8/24 = 7/24
    a: { numerator: 5, denominator: 8 },
    b: { numerator: 1, denominator: 3 },
    enemy: '🪳',
    speedSec: 38,
    requireSimplified: true,
    story: '연료가 5/8 통 있었어. 워프 한 번에 1/3 통을 썼어. 남은 연료는?',
  },
  {
    id: 'c2-4', // 9/10 - 2/5 = 9/10 - 4/10 = 5/10 → 1/2 (약분!)
    a: { numerator: 9, denominator: 10 },
    b: { numerator: 2, denominator: 5 },
    enemy: '🦠',
    speedSec: 36,
    requireSimplified: true,
    story: '전지가 9/10 차 있었어. 통신기가 2/5 만큼 끌어 썼어. 남은 전력은?',
  },
  {
    id: 'c2-5', // 4/5 - 1/3 = 12/15 - 5/15 = 7/15
    a: { numerator: 4, denominator: 5 },
    b: { numerator: 1, denominator: 3 },
    enemy: '🐛',
    speedSec: 35,
    requireSimplified: true,
    story: '산소가 4/5 통 있었어. 균열로 1/3 통이 새어 나갔어. 남은 산소는?',
  },
  {
    id: 'c2-6', // 11/15 - 1/6 = 22/30 - 5/30 = 17/30
    a: { numerator: 11, denominator: 15 },
    b: { numerator: 1, denominator: 6 },
    enemy: '👾',
    speedSec: 34,
    requireSimplified: true,
    story: '냉각수가 11/15 통이었어. 누출로 1/6 통이 사라졌어. 남은 냉각수는?',
  },
  {
    id: 'c2-7', // 7/8 - 5/12 = 21/24 - 10/24 = 11/24
    a: { numerator: 7, denominator: 8 },
    b: { numerator: 5, denominator: 12 },
    enemy: '🪳',
    speedSec: 32,
    requireSimplified: true,
    story: '산소팩에 7/8 통이 있었어. 수리에 5/12 통을 썼어. 남은 산소는?',
  },
  {
    id: 'c2-8', // 보스 — 7/9 - 1/4 = 28/36 - 9/36 = 19/36
    a: { numerator: 7, denominator: 9 },
    b: { numerator: 1, denominator: 4 },
    enemy: '🛸',
    speedSec: 32,
    requireSimplified: true,
    story: '🛸 보스 등장! 보호막이 7/9 였어. 첫 일격에 1/4 만큼 깎였어. 남은 보호막은?',
  },
]
