import type { Fraction } from '@/types/fraction'
import { addFractions } from '@/lib/fractionMath'

export interface DefenseTarget {
  id: string
  a: Fraction
  b: Fraction
  enemy: string
  requireSimplified: boolean
  /** 응용 시나리오 — 독해해서 푸는 문제 */
  story: string
}

export const chapter4Targets: DefenseTarget[] = [
  {
    id: 'c4-1', // 5/8 + 1/3 = 15/24 + 8/24 = 23/24
    a: { numerator: 5, denominator: 8 }, b: { numerator: 1, denominator: 3 },
    enemy: '👽', requireSimplified: true,
    story: '보급선 A 가 5/8 통, 보급선 B 가 1/3 통을 가져왔어. 두 보급선의 자원을 합치면 얼마?',
  },
  {
    id: 'c4-2', // 5/6 + 3/8 = 20/24 + 9/24 = 29/24 (가분수)
    a: { numerator: 5, denominator: 6 }, b: { numerator: 3, denominator: 8 },
    enemy: '🤖', requireSimplified: true,
    story: '드론이 5/6 통, 정찰선이 3/8 통의 에너지를 가져왔어. 두 자원의 합은?',
  },
  {
    id: 'c4-3', // 5/12 + 1/8 = 10/24 + 3/24 = 13/24
    a: { numerator: 5, denominator: 12 }, b: { numerator: 1, denominator: 8 },
    enemy: '🦑', requireSimplified: true,
    story: '화물칸 1번에 5/12 통, 2번에 1/8 통이 있어. 두 칸을 합치면 얼마?',
  },
  {
    id: 'c4-4', // 3/5 + 1/4 = 12/20 + 5/20 = 17/20
    a: { numerator: 3, denominator: 5 }, b: { numerator: 1, denominator: 4 },
    enemy: '👹', requireSimplified: true,
    story: '항해사가 임무의 3/5 를, 로키가 1/4 을 끝냈어. 둘이 합쳐서 끝낸 비율은?',
  },
  {
    id: 'c4-5', // 2/7 + 3/4 = 8/28 + 21/28 = 29/28 (가분수)
    a: { numerator: 2, denominator: 7 }, b: { numerator: 3, denominator: 4 },
    enemy: '🐙', requireSimplified: true,
    story: '냉각액이 2/7 통 남아 있어. 추가로 3/4 통을 부으면 총 얼마?',
  },
  {
    id: 'c4-6', // 3/4 + 5/12 = 9/12 + 5/12 = 14/12 = 7/6 (약분 필요)
    a: { numerator: 3, denominator: 4 }, b: { numerator: 5, denominator: 12 },
    enemy: '👽', requireSimplified: true,
    story: '비축 식량이 3/4 박스, 신규 보급이 5/12 박스 들어왔어. 총 식량은?',
  },
  {
    id: 'c4-7', // 7/10 + 3/5 = 7/10 + 6/10 = 13/10 (가분수)
    a: { numerator: 7, denominator: 10 }, b: { numerator: 3, denominator: 5 },
    enemy: '🦠', requireSimplified: true,
    story: '백신 농축액 7/10 통과 일반 농축액 3/5 통을 섞으면 총 얼마?',
  },
  {
    id: 'c4-8', // 7/15 + 1/6 = 14/30 + 5/30 = 19/30
    a: { numerator: 7, denominator: 15 }, b: { numerator: 1, denominator: 6 },
    enemy: '🛸', requireSimplified: true,
    story: '무기 충전이 7/15 였어. 보조 발전기로 1/6 만큼 더 모았어. 지금 충전량은?',
  },
  {
    id: 'c4-9', // 7/12 + 5/18 = 21/36 + 10/36 = 31/36
    a: { numerator: 7, denominator: 12 }, b: { numerator: 5, denominator: 18 },
    enemy: '🤖', requireSimplified: true,
    story: '메인 실드가 7/12, 보조 실드가 5/18 가동 중. 둘을 합한 총 방어력은?',
  },
  {
    id: 'c4-10', // 5/9 + 1/6 = 10/18 + 3/18 = 13/18
    a: { numerator: 5, denominator: 9 }, b: { numerator: 1, denominator: 6 },
    enemy: '👽', requireSimplified: true,
    story: '구조 신호가 행성 A 에 5/9, 행성 B 에 1/6 도달. 둘을 합한 도달률은?',
  },
  {
    id: 'c4-11', // 1/2 + 3/10 = 5/10 + 3/10 = 8/10 = 4/5 (약분 필요)
    a: { numerator: 1, denominator: 2 }, b: { numerator: 3, denominator: 10 },
    enemy: '🦑', requireSimplified: true,
    story: '항해 일정의 1/2 를 마쳤고, 추가로 3/10 을 더 갔어. 지금까지 진행률은?',
  },
  {
    id: 'c4-12', // 4/9 + 1/2 = 8/18 + 9/18 = 17/18
    a: { numerator: 4, denominator: 9 }, b: { numerator: 1, denominator: 2 },
    enemy: '🐙', requireSimplified: true,
    story: '아군이 4/9, 동맹군이 1/2 진형에 도착. 두 함대 합쳐 진형 도달률은?',
  },
]

export const chapter4Expected = (t: DefenseTarget) => addFractions(t.a, t.b)

/** 한 적이 화면 끝에 도달하기까지 (초) — 응용 독해 시간 확보 */
export const LANE_ADVANCE_SEC = 42
/** 동시 등장 레인 수 */
export const LANE_COUNT = 3
