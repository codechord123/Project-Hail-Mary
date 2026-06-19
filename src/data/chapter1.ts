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
  // 응용 문제 — 직접 조작이 끝난 뒤 짧은 독해 응용 두 문제
  {
    kind: 'application',
    story: '로키가 신호를 보내왔어. 머리도 깨워두자.',
    problem: {
      id: 'c1-app-1',
      kind: 'numeric',
      difficulty: 2,
      scenario:
        '산소 탱크 7/10이 정상 상태였는데, 1/10이 새고 또 2/10이 새었어. 남은 산소는 분자가 얼마일까?',
      prompt: '남은 산소를 X/10 형태로 적을 때 분자 X는?',
      hint: '7 − 1 − 2 = ?',
      answer: 4,
      unit: '',
    },
  },
  {
    kind: 'application',
    story: '마지막 한 문제 — 항법 비밀번호.',
    problem: {
      id: 'c1-app-2',
      kind: 'mcq',
      difficulty: 2,
      scenario:
        '같은 분모 분수 두 개를 더한 값이 정확히 1이 되는 짝을 찾아. 우주선 잠금이 풀린다!',
      prompt: '합이 1이 되는 짝을 모두 골라.',
      hint: '분자의 합 = 분모.',
      choices: ['3/8 + 5/8', '2/7 + 4/7', '1/6 + 5/6', '2/9 + 6/9', '4/11 + 7/11'],
      correctIndexes: [0, 2, 4],
      multiple: true,
    },
  },
]
