import type { Fraction } from '@/types/fraction'
import { lcm, subtractFractions } from '@/lib/fractionMath'

export interface ReactorBreach {
  id: string
  a: Fraction
  b: Fraction
  /** 누출 위치 */
  location: '냉각 펌프' | '연료 라인' | '추진 노즐' | '생명 유지'
  /** 응용 독해 시나리오 — 단순 계산이 아닌 문맥 문제 */
  story: string
}

/**
 * 챕터 5 — 모든 누출의 계산 결과가 NOT 기약 → 반드시 약분해야 클리어.
 * (이전: 결과가 이미 기약인 경우가 많아 simplify 단계가 중복됐던 버그 수정)
 */
export const chapter5Breaches: ReactorBreach[] = [
  {
    // 5/6 - 1/2 → 2/6 → 1/3
    id: 'c5-1',
    a: { numerator: 5, denominator: 6 }, b: { numerator: 1, denominator: 2 },
    location: '냉각 펌프',
    story:
      '냉각 펌프의 액체가 5/6 통 채워져 있었는데, 1/2 통 분량이 균열로 빠져나갔어. 통분 후 기약분수로 잔량을 계산해 누출을 막자.',
  },
  {
    // 11/12 - 1/4 → 8/12 → 2/3
    id: 'c5-2',
    a: { numerator: 11, denominator: 12 }, b: { numerator: 1, denominator: 4 },
    location: '연료 라인',
    story:
      '연료 라인이 11/12 만큼 충전됐는데, 응급 추진 명령으로 1/4 통이 소모됐어. 남은 연료를 기약분수로 적어 라인 압력을 안정시키자.',
  },
  {
    // 9/10 - 2/5 → 5/10 → 1/2
    id: 'c5-3',
    a: { numerator: 9, denominator: 10 }, b: { numerator: 2, denominator: 5 },
    location: '추진 노즐',
    story:
      '추진 노즐의 가스 압력은 9/10 단계까지 차 있었어. 점화 시퀀스가 2/5 단계만큼 빠르게 소비했지. 남은 압력을 기약분수로!',
  },
  {
    // 17/20 - 1/4 → 12/20 → 3/5
    id: 'c5-4',
    a: { numerator: 17, denominator: 20 }, b: { numerator: 1, denominator: 4 },
    location: '생명 유지',
    story:
      '생명유지 산소 농도가 17/20 으로 유지되고 있었는데, 1/4 만큼 누출이 시작됐어. 통분해서 빼고 약분해 잔여 농도를 알려줘.',
  },
  {
    // 5/6 - 7/12 → 3/12 → 1/4
    id: 'c5-5',
    a: { numerator: 5, denominator: 6 }, b: { numerator: 7, denominator: 12 },
    location: '냉각 펌프',
    story:
      '냉각 펌프 백업 라인이 5/6 채워져 있었지만 메인 라인 정비로 7/12 만큼 흘려보냈어. 백업 잔량을 기약분수로!',
  },
  {
    // 11/15 - 1/3 → 6/15 → 2/5
    id: 'c5-6',
    a: { numerator: 11, denominator: 15 }, b: { numerator: 1, denominator: 3 },
    location: '연료 라인',
    story:
      '예비 연료 11/15 통 중 1/3 통을 비상 발전기로 옮겼어. 라인에 남아 있는 양을 기약분수로 적어 라인 봉인을 풀자.',
  },
  {
    // 13/18 - 1/2 → 4/18 → 2/9
    id: 'c5-7',
    a: { numerator: 13, denominator: 18 }, b: { numerator: 1, denominator: 2 },
    location: '추진 노즐',
    story:
      '노즐 1번이 13/18 만큼 가열됐고, 1/2 의 열을 방열판으로 흘려보냈어. 노즐에 남은 열량을 기약분수로!',
  },
  {
    // 7/12 - 1/4 → 4/12 → 1/3
    id: 'c5-8',
    a: { numerator: 7, denominator: 12 }, b: { numerator: 1, denominator: 4 },
    location: '생명 유지',
    story:
      '생명유지 모듈의 정수 필터 1통 중 7/12 가 깨끗했어. 사용 중 1/4 통이 오염됐다. 아직 깨끗한 정수의 비율을 기약분수로!',
  },
]

export interface BreachSolution {
  commonDenom: number // 통분
  result: Fraction // 계산 결과 (약분 전)
  simplified: Fraction // 기약
}

export const solveBreach = (b: ReactorBreach): BreachSolution => {
  const commonDenom = lcm(b.a.denominator, b.b.denominator)
  const raw = subtractFractions(b.a, b.b) // already gives lcm denom by current impl
  const r = { numerator: raw.numerator, denominator: raw.denominator }
  // 약분 — gcd 사용
  const gcd = (x: number, y: number): number => {
    x = Math.abs(x); y = Math.abs(y)
    while (y !== 0) { [x, y] = [y, x % y] }
    return x || 1
  }
  const g = gcd(r.numerator, r.denominator)
  return {
    commonDenom,
    result: { numerator: r.numerator, denominator: r.denominator },
    simplified: { numerator: r.numerator / g, denominator: r.denominator / g },
  }
}
