import type { Problem } from '@/types/problem'

/** 챕터 메인 메커니즘 종료 직후 등장하는 보너스 응용 문제 (1챕터당 1개). */
export const BONUS_PROBLEMS: Record<number, Problem> = {
  2: {
    id: 'c2-bonus',
    kind: 'numeric',
    difficulty: 2,
    scenario:
      '식량 점검 마무리! 8일치 식량 중 매일 1/8씩 5일을 먹었다. 남은 식량의 분자는?',
    prompt: '남은 식량 X/8 — X는?',
    hint: '8 − 5 = ?',
    answer: 3,
    unit: '',
  },
  3: {
    id: 'c3-bonus',
    kind: 'mcq',
    difficulty: 2,
    scenario:
      '아스트로파지가 도주 직전 마지막 환영을 띄웠어. 진짜 등가 분수만 골라.',
    prompt: '4/6과 크기가 같은 분수를 모두 골라.',
    hint: '약분 또는 동치로 검산.',
    choices: ['2/3', '6/9', '8/12', '10/14', '12/18'],
    correctIndexes: [0, 1, 2, 4],
    multiple: true,
  },
  4: {
    id: 'c4-bonus',
    kind: 'fraction',
    difficulty: 2,
    scenario:
      '디펜스 통과! 마지막 회수 보고서를 분수로 적어. 연료 1/4 + 1/6 = ? (기약)',
    prompt: '합을 기약분수로',
    hint: '공통분모 12.',
    answer: { numerator: 5, denominator: 12 },
    requireSimplified: true,
  },
  5: {
    id: 'c5-bonus',
    kind: 'compare',
    difficulty: 2,
    scenario:
      '리액터 안정화 보고서 — 두 라인의 잔량을 비교해.',
    prompt: '5/8 와 0.6 중 어느 쪽이 더 큰가?',
    hint: '5/8 = 0.625.',
    left: { numerator: 5, denominator: 8 },
    right: { decimal: 0.6 },
    correctOp: '>',
  },
  6: {
    id: 'c6-bonus',
    kind: 'fraction',
    difficulty: 3,
    scenario:
      '배양 마무리! 대분수 2¾를 가분수로 변환해.',
    prompt: '2¾ 를 가분수로 (기약).',
    hint: '2 × 4 + 3 = 11, 분모 4.',
    answer: { numerator: 11, denominator: 4 },
    requireSimplified: true,
  },
  7: {
    id: 'c7-bonus',
    kind: 'multi',
    difficulty: 3,
    scenario:
      '귀환 좌표 잠금 해제 — 어떤 분수의 분자에 7을 더하고 5로 약분하니 3/5가 됐다. 원래 분수를 기약으로!',
    prompt: '풀이 과정 + 기약분수 답',
    hint: '5로 약분 후 3/5 → 약분 전 15/25. 분자 -7 = 8 → 8/25.',
    workspacePlaceholder: '예: 3/5 = 15/25, 15-7=8 → 8/25',
    finalAnswer: { numerator: 8, denominator: 25 },
    requireSimplified: true,
  },
}
