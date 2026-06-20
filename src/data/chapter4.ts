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
    story:
      '함대 보급선 A 가 1통의 5/8 를, 보급선 B 가 1/3 을 운반 중. 두 보급선이 합류하면 베이스의 총 자원량은 (기약)?',
  },
  {
    id: 'c4-2', // 5/6 + 3/8 = 20/24 + 9/24 = 29/24 (가분수)
    a: { numerator: 5, denominator: 6 }, b: { numerator: 3, denominator: 8 },
    enemy: '🤖', requireSimplified: true,
    story:
      '아군 드론이 5/6 통의 에너지를 가져왔고, 정찰선이 3/8 통을 더 발견했어. 두 자원을 합한 총량을 (기약 가분수)로!',
  },
  {
    id: 'c4-3', // 5/12 + 1/8 = 10/24 + 3/24 = 13/24
    a: { numerator: 5, denominator: 12 }, b: { numerator: 1, denominator: 8 },
    enemy: '🦑', requireSimplified: true,
    story:
      '화물칸 1번이 5/12, 2번이 1/8 만큼 채워져 있어. 두 칸을 합칠 때 전체 적재량은 (기약)?',
  },
  {
    id: 'c4-4', // 3/5 + 1/4 = 12/20 + 5/20 = 17/20
    a: { numerator: 3, denominator: 5 }, b: { numerator: 1, denominator: 4 },
    enemy: '👹', requireSimplified: true,
    story:
      '항해사가 임무의 3/5 를, 로키가 1/4 을 완료했어. 두 사람이 합쳐서 한 임무의 얼마를 끝낸 셈일까? (기약)',
  },
  {
    id: 'c4-5', // 2/7 + 3/4 = 8/28 + 21/28 = 29/28 (가분수)
    a: { numerator: 2, denominator: 7 }, b: { numerator: 3, denominator: 4 },
    enemy: '🐙', requireSimplified: true,
    story:
      '냉각 시스템에 2/7 통의 액체가 남아 있는데, 추가 보급 3/4 통을 부으면 총량은 1통을 넘는다. 정확히 얼마? (기약 가분수)',
  },
  {
    id: 'c4-6', // 3/4 + 5/12 = 9/12 + 5/12 = 14/12 = 7/6 (약분 필요)
    a: { numerator: 3, denominator: 4 }, b: { numerator: 5, denominator: 12 },
    enemy: '👽', requireSimplified: true,
    story:
      '비축 식량 3/4 박스 + 신규 보급 5/12 박스를 모았어. 총 식량을 기약 가분수로!',
  },
  {
    id: 'c4-7', // 7/10 + 3/5 = 7/10 + 6/10 = 13/10 (가분수)
    a: { numerator: 7, denominator: 10 }, b: { numerator: 3, denominator: 5 },
    enemy: '🦠', requireSimplified: true,
    story:
      '백신 농축액 7/10 통과 일반 농축액 3/5 통을 혼합하려고 해. 총량을 기약 가분수로 적어!',
  },
  {
    id: 'c4-8', // 7/15 + 1/6 = 14/30 + 5/30 = 19/30
    a: { numerator: 7, denominator: 15 }, b: { numerator: 1, denominator: 6 },
    enemy: '🛸', requireSimplified: true,
    story:
      '함선 무기 충전이 7/15 까지 됐는데, 보조 발전기로 1/6 을 더 모았어. 지금 무기 충전량 (기약)?',
  },
  {
    id: 'c4-9', // 7/12 + 5/18 = 21/36 + 10/36 = 31/36
    a: { numerator: 7, denominator: 12 }, b: { numerator: 5, denominator: 18 },
    enemy: '🤖', requireSimplified: true,
    story:
      '메인 실드 7/12 + 보조 실드 5/18 가 동시에 가동. 총 방어력은? (기약)',
  },
  {
    id: 'c4-10', // 5/9 + 1/6 = 10/18 + 3/18 = 13/18
    a: { numerator: 5, denominator: 9 }, b: { numerator: 1, denominator: 6 },
    enemy: '👽', requireSimplified: true,
    story:
      '구조 신호 도달률이 행성 A 5/9, 행성 B 1/6 이야. 두 행성에 닿은 신호의 합은? (기약)',
  },
  {
    id: 'c4-11', // 1/2 + 3/10 = 5/10 + 3/10 = 8/10 = 4/5 (약분 필요)
    a: { numerator: 1, denominator: 2 }, b: { numerator: 3, denominator: 10 },
    enemy: '🦑', requireSimplified: true,
    story:
      '항해 일정의 1/2 + 추가 비행 3/10 을 마쳤어. 지금까지 완료한 항해 비율은 (기약)?',
  },
  {
    id: 'c4-12', // 4/9 + 1/2 = 8/18 + 9/18 = 17/18
    a: { numerator: 4, denominator: 9 }, b: { numerator: 1, denominator: 2 },
    enemy: '🐙', requireSimplified: true,
    story:
      '아군 함선 4/9 와 동맹군 함선 1/2 의 위치가 합류 지점에 다다랐어. 합쳐진 함대의 전체 진형 비율은? (기약)',
  },
]

export const chapter4Expected = (t: DefenseTarget) => addFractions(t.a, t.b)

/** 한 적이 화면 끝에 도달하기까지 (초) — 응용 독해 시간 확보 */
export const LANE_ADVANCE_SEC = 32
/** 동시 등장 레인 수 */
export const LANE_COUNT = 3
