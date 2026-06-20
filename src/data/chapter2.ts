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
    speedSec: 22,
    requireSimplified: true,
    story:
      '식량 모듈에 비축된 양은 한 통의 5/6 이었어. 그런데 야간에 미생물이 1/4 통을 갉아먹었다. 남은 식량을 기약분수로!',
  },
  {
    id: 'c2-2', // 11/12 - 1/3 = 11/12 - 4/12 = 7/12
    a: { numerator: 11, denominator: 12 },
    b: { numerator: 1, denominator: 3 },
    enemy: '👾',
    speedSec: 20,
    requireSimplified: true,
    story:
      '물탱크에 11/12 통의 물이 있었지만, 새벽에 1/3 통이 증발했어. 지금 탱크에 남은 물은 (기약)?',
  },
  {
    id: 'c2-3', // 5/8 - 1/3 = 15/24 - 8/24 = 7/24
    a: { numerator: 5, denominator: 8 },
    b: { numerator: 1, denominator: 3 },
    enemy: '🪳',
    speedSec: 19,
    requireSimplified: true,
    story:
      '항해 전 연료 통이 5/8 차 있었어. 이번 워프 점화로 1/3 통이 소비됐다. 남은 연료의 비율은 (기약)?',
  },
  {
    id: 'c2-4', // 9/10 - 2/5 = 9/10 - 4/10 = 5/10 → 1/2 (약분!)
    a: { numerator: 9, denominator: 10 },
    b: { numerator: 2, denominator: 5 },
    enemy: '🦠',
    speedSec: 18,
    requireSimplified: true,
    story:
      '비상 에너지 전지의 9/10 만큼 충전돼 있었어. 통신 시스템이 2/5 통을 끌어 썼다. 남은 충전량을 기약분수로!',
  },
  {
    id: 'c2-5', // 4/5 - 1/3 = 12/15 - 5/15 = 7/15
    a: { numerator: 4, denominator: 5 },
    b: { numerator: 1, denominator: 3 },
    enemy: '🐛',
    speedSec: 17,
    requireSimplified: true,
    story:
      '응급 산소 라인 4/5 만큼이 활성화됐는데, 작은 균열로 1/3 통이 빠져나갔어. 지금 사용 가능한 산소는 (기약)?',
  },
  {
    id: 'c2-6', // 11/15 - 1/6 = 22/30 - 5/30 = 17/30
    a: { numerator: 11, denominator: 15 },
    b: { numerator: 1, denominator: 6 },
    enemy: '👾',
    speedSec: 16,
    requireSimplified: true,
    story:
      '냉각수 11/15 통에서 누출이 발생해 1/6 통이 사라졌어. 반응로를 식힐 수 있는 잔량은 (기약)?',
  },
  {
    id: 'c2-7', // 7/8 - 5/12 = 21/24 - 10/24 = 11/24
    a: { numerator: 7, denominator: 8 },
    b: { numerator: 5, denominator: 12 },
    enemy: '🪳',
    speedSec: 15,
    requireSimplified: true,
    story:
      '비상 산소팩 7/8 통 중에서 응급 수리 작업으로 5/12 통을 썼어. 다음 임무에 쓸 수 있는 산소를 기약분수로 적어!',
  },
  {
    id: 'c2-8', // 보스 — 7/9 - 1/4 = 28/36 - 9/36 = 19/36
    a: { numerator: 7, denominator: 9 },
    b: { numerator: 1, denominator: 4 },
    enemy: '🛸',
    speedSec: 15,
    requireSimplified: true,
    story:
      '🛸 보스 침입! 우주선 외벽 보호막이 7/9 였는데, 보스의 첫 일격이 1/4 만큼 깎아냈어. 남은 보호막을 기약분수로!',
  },
]
