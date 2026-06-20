import type { Problem } from '@/types/problem'

/** 페이즈별로 문제 유형이 다른 종합 보스전 */
export const chapter7Phases: { name: string; subtitle: string; problems: Problem[] }[] = [
  {
    name: 'PHASE 1 · 정탐',
    subtitle: '이분모 덧셈/비교 기초 점검',
    problems: [
      {
        id: 'c7-1', kind: 'fraction', difficulty: 2,
        scenario: '여왕이 첫 번째 시험을 던졌어. 통분해서 빠르게 답해.',
        prompt: '5/6 + 3/4 (기약 가분수)',
        hint: '공통분모 12. 10/12 + 9/12 = 19/12.',
        answer: { numerator: 19, denominator: 12 }, requireSimplified: true,
      },
      {
        id: 'c7-2', kind: 'compare', difficulty: 2,
        scenario: '두 통신 신호의 강도를 비교해.',
        prompt: '5/8 vs 7/12',
        hint: '공통분모 24. 15/24 vs 14/24.',
        left: { numerator: 5, denominator: 8 }, right: { numerator: 7, denominator: 12 }, correctOp: '>',
      },
      {
        id: 'c7-3', kind: 'numeric', difficulty: 2,
        scenario: '여왕이 던진 함정 — 자연수 개수를 세어.',
        prompt: '1/4 < □/12 < 5/6 을 만족하는 자연수 □의 개수',
        hint: '1/4=3/12, 5/6=10/12. □는 4~9.',
        answer: 6, unit: '개',
      },
    ],
  },
  {
    name: 'PHASE 2 · 광폭화',
    subtitle: '여왕이 분노한다! 소수↔분수 변환 + 이분모',
    problems: [
      {
        id: 'c7-4', kind: 'fraction', difficulty: 2,
        scenario: '여왕의 첫 공격! 0.45 를 기약분수로 변환해 방패에 쓸 수 있어.',
        prompt: '0.45 = ? (기약)',
        hint: '0.45 = 45/100 → ÷5 = 9/20.',
        answer: { numerator: 9, denominator: 20 }, requireSimplified: true,
      },
      {
        id: 'c7-5', kind: 'fraction', difficulty: 3,
        scenario: '연속 공격! 소수 + 분수 혼합 — 0.6 + 1/4 를 기약분수로 응수!',
        prompt: '0.6 + 1/4 (기약)',
        hint: '0.6 = 3/5. 3/5 + 1/4 = 12/20 + 5/20 = 17/20.',
        answer: { numerator: 17, denominator: 20 }, requireSimplified: true,
      },
      {
        id: 'c7-6', kind: 'compare', difficulty: 3,
        scenario: '환영 비교 — 분수와 소수 중 어느 쪽이 큰가?',
        prompt: '3/8 vs 0.4',
        hint: '3/8 = 0.375.',
        left: { numerator: 3, denominator: 8 }, right: { decimal: 0.4 }, correctOp: '<',
      },
    ],
  },
  {
    name: 'PHASE 3 · 최후',
    subtitle: '대분수 + 다단계 — 여왕을 봉인하라',
    problems: [
      {
        id: 'c7-7', kind: 'multi', difficulty: 3,
        scenario: '여왕의 결계 — 다단계 풀이로 부숴.',
        prompt: '어떤 분수의 분자에 5를 더하고 4로 약분하니 3/4가 됐다. 원래 분수를 기약으로.',
        hint: '4로 약분 후 3/4 → 약분 전 12/16. 분자 -5 = 7. 7/16 (기약).',
        workspacePlaceholder: '예: 3/4 = 12/16, 12 - 5 = 7 → 7/16',
        finalAnswer: { numerator: 7, denominator: 16 }, requireSimplified: true,
      },
      {
        id: 'c7-8', kind: 'fraction', difficulty: 3,
        scenario: '대분수의 합 — 봉인 직전.',
        prompt: '1¾ + 2⅔ 를 가분수로 변환 후 합. 가분수 그대로 답.',
        hint: '7/4 + 8/3 = 21/12 + 32/12 = 53/12.',
        answer: { numerator: 53, denominator: 12 }, requireSimplified: true,
      },
      {
        id: 'c7-9', kind: 'fraction', difficulty: 3,
        scenario: '마지막 일격! 차이를 구해 결계 해제.',
        prompt: '3⅖ − 1¾ = ? (가분수 기약)',
        hint: '17/5 - 7/4 = 68/20 - 35/20 = 33/20.',
        answer: { numerator: 33, denominator: 20 }, requireSimplified: true,
      },
    ],
  },
]

export const QUEEN = {
  name: '아스트로파지 여왕',
  maxHp: 300,
}
