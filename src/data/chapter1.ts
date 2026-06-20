import type { Fraction } from '@/types/fraction'
import type { SceneThemeId } from '@/components/manipulation/themes'
import type { Problem } from '@/types/problem'

export interface ManipulationProblem {
  kind: 'manipulation'
  id: string
  story: string
  a: Fraction
  b: Fraction
  operation: 'add'
  requireSimplified: boolean
  hint: string
  scene: SceneThemeId
}

export interface ApplicationProblem {
  kind: 'application'
  story: string
  problem: Problem
}

export type Chapter1Problem = ManipulationProblem | ApplicationProblem

// 하위 호환용 alias (기존 코드)
export type FractionProblem = ManipulationProblem

export const chapter1Problems: Chapter1Problem[] = [
  {
    kind: 'manipulation',
    id: 'c1-1',
    story:
      '산소 탱크 A에 3/8, 탱크 B에 2/8이 남아 있어. 셀을 옮겨 한 탱크에 모아봐.',
    a: { numerator: 3, denominator: 8 },
    b: { numerator: 2, denominator: 8 },
    operation: 'add',
    requireSimplified: false,
    hint: '분모가 같으면 분자끼리만 더하면 돼.',
    scene: 'oxygen',
  },
  {
    kind: 'manipulation',
    id: 'c1-2',
    story:
      '수경 재배기 1번 칸에 물이 2/5, 2번 칸에 1/5 차 있어. 한 통에 옮겨 담아.',
    a: { numerator: 2, denominator: 5 },
    b: { numerator: 1, denominator: 5 },
    operation: 'add',
    requireSimplified: false,
    hint: '분모는 그대로, 분자만 더해. 2 + 1 = ?',
    scene: 'water',
  },
  {
    kind: 'manipulation',
    id: 'c1-3',
    story: '연료 셀 두 개를 합쳐야 해. 셀1 = 4/9, 셀2 = 3/9. 합성기에 옮겨봐.',
    a: { numerator: 4, denominator: 9 },
    b: { numerator: 3, denominator: 9 },
    operation: 'add',
    requireSimplified: false,
    hint: '분자끼리 더하면 4+3=7. 분모는?',
    scene: 'fuel',
  },
  {
    kind: 'manipulation',
    id: 'c1-4',
    story:
      '비상 배터리 A=1/6, B=3/6. 둘을 직렬 연결해 충전기에 모아봐. (기약분수로!)',
    a: { numerator: 1, denominator: 6 },
    b: { numerator: 3, denominator: 6 },
    operation: 'add',
    requireSimplified: true,
    hint: '먼저 더해서 4/6. 분자 분모를 같은 수로 나눠 약분해봐.',
    scene: 'battery',
  },
  {
    kind: 'manipulation',
    id: 'c1-5',
    story:
      '항법 코드 조각을 모은다. 조각1=5/12, 조각2=3/12. 메인 모듈로 옮겨. (기약분수로!)',
    a: { numerator: 5, denominator: 12 },
    b: { numerator: 3, denominator: 12 },
    operation: 'add',
    requireSimplified: true,
    hint: '8/12를 4로 나눠 약분.',
    scene: 'code',
  },
]

/** 챕터 1 응용 문제 풀 — manipulation 5개 끝난 후 풀에서 2개 랜덤 픽.
 *  학생들이 약분/통분에 능숙하므로 다른 분모 위주 응용 문제로 구성. */
export const CHAPTER1_APPLICATION_POOL: ApplicationProblem[] = [
  {
    kind: 'application',
    story: '로키와 산소 자원 합치기.',
    problem: {
      id: 'c1-app-1',
      kind: 'fraction', difficulty: 2,
      scenario: '로키의 산소가 1/3, 너의 산소가 1/6 남았어. 두 자원을 합치면 (기약)?',
      prompt: '합 (기약분수)',
      hint: '공통분모 6. 2/6 + 1/6 = 3/6 → 약분.',
      answer: { numerator: 1, denominator: 2 }, requireSimplified: true,
    },
  },
  {
    kind: 'application',
    story: '식량 분해 작업.',
    problem: {
      id: 'c1-app-2',
      kind: 'fraction', difficulty: 2,
      scenario: '식량 비축 2/5에서 1/10을 사용했어. 남은 양 (기약)?',
      prompt: '남은 양 (기약분수)',
      hint: '공통분모 10. 4/10 - 1/10 = 3/10.',
      answer: { numerator: 3, denominator: 10 }, requireSimplified: true,
    },
  },
  {
    kind: 'application',
    story: '항법 코드 변환.',
    problem: {
      id: 'c1-app-3',
      kind: 'numeric', difficulty: 2,
      scenario: '1/4 와 같은 값을 분모 12로 표현할 때 분자는 얼마?',
      prompt: '분자 = ?',
      hint: '1/4 = X/12. 분모 4를 12로 만들려면 ×3.',
      answer: 3, unit: '',
    },
  },
  {
    kind: 'application',
    story: '미지의 신호 — 다단계 해독.',
    problem: {
      id: 'c1-app-4',
      kind: 'multi', difficulty: 3,
      scenario: '어떤 분수의 분자에 2를 더하고 5로 약분했더니 1/3이 됐어. 원래 분수를 기약으로 알려줘.',
      prompt: '풀이 과정 + 최종 기약 답',
      hint: '5로 약분 후 1/3 → 약분 전 5/15. 분자 -2 = 3 → 3/15 = 1/5.',
      workspacePlaceholder: '예: 1/3 = 5/15, 5-2=3 → 3/15 = 1/5',
      finalAnswer: { numerator: 1, denominator: 5 }, requireSimplified: true,
    },
  },
  {
    kind: 'application',
    story: '복합 임무 — 세 자원 합산.',
    problem: {
      id: 'c1-app-5',
      kind: 'fraction', difficulty: 3,
      scenario: '식량 1/2, 산소 1/3, 연료 1/4 를 합치면 한 단위를 넘는다. 총합을 기약 가분수로 적어.',
      prompt: '총합 (기약 가분수)',
      hint: '공통분모 12. 6/12 + 4/12 + 3/12 = 13/12.',
      answer: { numerator: 13, denominator: 12 }, requireSimplified: true,
    },
  },
  {
    kind: 'application',
    story: '로키의 함정 — 동치 분수 골라내기.',
    problem: {
      id: 'c1-app-6',
      kind: 'mcq', difficulty: 2,
      scenario: '아래 중 3/4 와 크기가 같은 분수만 모두 골라.',
      prompt: '3/4 의 동치 분수',
      hint: '분자·분모에 같은 수를 곱하거나 나눠 검산.',
      choices: ['6/8', '9/12', '12/16', '10/14', '15/20'],
      correctIndexes: [0, 1, 2, 4], multiple: true,
    },
  },
  {
    kind: 'application',
    story: '비상 연산 — 분수와 자연수.',
    problem: {
      id: 'c1-app-7',
      kind: 'numeric', difficulty: 3,
      scenario: '1/3 < □/12 < 5/6 을 만족하는 자연수 □의 개수는?',
      prompt: '자연수 □의 개수',
      hint: '1/3 = 4/12, 5/6 = 10/12. 그 사이 정수 분자.',
      answer: 5, unit: '개',
    },
  },
]

/** 풀에서 N개 비복원 추출 (Fisher-Yates 셔플 기반) */
export const pickApplicationProblems = (n = 2): ApplicationProblem[] => {
  const pool = [...CHAPTER1_APPLICATION_POOL]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(n, pool.length))
}
