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

/** 챕터 1 응용 문제 풀 — manipulation 5개 끝난 후 풀에서 2개 랜덤 픽 */
export const CHAPTER1_APPLICATION_POOL: ApplicationProblem[] = [
  {
    kind: 'application',
    story: '로키가 신호를 보내왔어. 머리도 깨워두자.',
    problem: {
      id: 'c1-app-1',
      kind: 'numeric', difficulty: 2,
      scenario: '산소 탱크 7/10이 정상이었는데, 1/10이 새고 또 2/10이 새었어. 남은 산소의 분자는?',
      prompt: '남은 산소 X/10 — X는?',
      hint: '7 − 1 − 2 = ?',
      answer: 4, unit: '',
    },
  },
  {
    kind: 'application',
    story: '항법 비밀번호 조각.',
    problem: {
      id: 'c1-app-2',
      kind: 'mcq', difficulty: 2,
      scenario: '같은 분모 분수 두 개를 더한 값이 정확히 1이 되는 짝을 찾아.',
      prompt: '합이 1이 되는 짝을 모두 골라.',
      hint: '분자의 합 = 분모.',
      choices: ['3/8 + 5/8', '2/7 + 4/7', '1/6 + 5/6', '2/9 + 6/9', '4/11 + 7/11'],
      correctIndexes: [0, 2, 4], multiple: true,
    },
  },
  {
    kind: 'application',
    story: '식량 저장고를 점검 중이야.',
    problem: {
      id: 'c1-app-3',
      kind: 'numeric', difficulty: 2,
      scenario: '저장고에 빵 5/9, 통조림 2/9, 비스킷 1/9이 있어. 다 합치면 분자가 얼마야?',
      prompt: '합한 분자 = ?',
      hint: '5 + 2 + 1.',
      answer: 8, unit: '',
    },
  },
  {
    kind: 'application',
    story: '로키가 작은 퀴즈를 냈다.',
    problem: {
      id: 'c1-app-4',
      kind: 'mcq', difficulty: 1,
      scenario: '아래 등식들이 모두 올바르게 계산됐는지 검토해.',
      prompt: '계산이 올바른 식을 모두 골라.',
      hint: '분자끼리 더한 결과가 우변과 같은지 확인.',
      choices: ['2/7 + 3/7 = 5/7', '1/5 + 3/5 = 4/5', '4/9 + 1/9 = 5/9', '2/6 + 2/6 = 4/6', '1/4 + 1/4 = 2/4'],
      correctIndexes: [0, 1, 2, 3, 4], multiple: true,
    },
  },
  {
    kind: 'application',
    story: '항해사 일지 — 합계 검사.',
    problem: {
      id: 'c1-app-5',
      kind: 'fraction', difficulty: 2,
      scenario: '하루 산소 사용량이 오전 3/12, 오후 4/12, 야간 2/12 였어. 총 사용량을 기약으로 적어.',
      prompt: '총 사용량 (기약)',
      hint: '9/12 → 3/4.',
      answer: { numerator: 3, denominator: 4 }, requireSimplified: true,
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
