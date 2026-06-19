import type { Problem } from '@/types/problem'

/**
 * 챕터 메인 메커니즘 종료 후 등장하는 보너스 응용 문제 풀.
 * 챕터당 여러 문항 중 매 진입 시 랜덤 picking → 재플레이 다양성.
 */
const POOLS: Record<number, Problem[]> = {
  2: [
    {
      id: 'c2-bonus-a', kind: 'numeric', difficulty: 2,
      scenario: '식량 점검 마무리! 8일치 식량 중 매일 1/8씩 5일을 먹었다. 남은 식량의 분자는?',
      prompt: '남은 식량 X/8 — X는?', hint: '8 − 5 = ?',
      answer: 3, unit: '',
    },
    {
      id: 'c2-bonus-b', kind: 'fraction', difficulty: 2,
      scenario: '연료 9/10에서 매 시간 1/10씩 3시간 동안 빠져나갔어. 남은 연료를 기약분수로!',
      prompt: '남은 연료 (기약)', hint: '9/10 - 3/10 = 6/10 → 약분',
      answer: { numerator: 3, denominator: 5 }, requireSimplified: true,
    },
    {
      id: 'c2-bonus-c', kind: 'numeric', difficulty: 1,
      scenario: '비상 식수 7/12에서 4/12를 마셨어. 남은 양 X/12의 분자 X는?',
      prompt: 'X = ?', hint: '7 − 4',
      answer: 3, unit: '',
    },
  ],
  3: [
    {
      id: 'c3-bonus-a', kind: 'mcq', difficulty: 2,
      scenario: '아스트로파지의 환영! 진짜 등가 분수만 모두 골라.',
      prompt: '4/6과 크기가 같은 분수를 모두 골라.', hint: '약분 또는 동치로 검산.',
      choices: ['2/3', '6/9', '8/12', '10/14', '12/18'],
      correctIndexes: [0, 1, 2, 4], multiple: true,
    },
    {
      id: 'c3-bonus-b', kind: 'numeric', difficulty: 2,
      scenario: '분모가 12인 진분수 중에서 기약분수는 모두 몇 개야?',
      prompt: '기약분수 개수', hint: '1, 5, 7, 11.',
      answer: 4, unit: '개',
    },
    {
      id: 'c3-bonus-c', kind: 'compare', difficulty: 2,
      scenario: '두 신호 강도 비교.',
      prompt: '3/4 vs 5/7', hint: '3/4 = 21/28, 5/7 = 20/28.',
      left: { numerator: 3, denominator: 4 }, right: { numerator: 5, denominator: 7 },
      correctOp: '>',
    },
  ],
  4: [
    {
      id: 'c4-bonus-a', kind: 'fraction', difficulty: 2,
      scenario: '디펜스 통과! 연료 1/4 + 1/6 = ? (기약)',
      prompt: '합을 기약분수로', hint: '공통분모 12.',
      answer: { numerator: 5, denominator: 12 }, requireSimplified: true,
    },
    {
      id: 'c4-bonus-b', kind: 'fraction', difficulty: 3,
      scenario: '회수된 자원 2/5 + 3/10 = ? (기약)',
      prompt: '합 (기약)', hint: '공통분모 10.',
      answer: { numerator: 7, denominator: 10 }, requireSimplified: true,
    },
    {
      id: 'c4-bonus-c', kind: 'fraction', difficulty: 2,
      scenario: '응원 보고: 1/3 + 1/2 = ? (기약)',
      prompt: '합 (기약)', hint: '공통분모 6.',
      answer: { numerator: 5, denominator: 6 }, requireSimplified: true,
    },
  ],
  5: [
    {
      id: 'c5-bonus-a', kind: 'compare', difficulty: 2,
      scenario: '리액터 라인 잔량 비교.',
      prompt: '5/8 vs 0.6', hint: '5/8 = 0.625.',
      left: { numerator: 5, denominator: 8 }, right: { decimal: 0.6 }, correctOp: '>',
    },
    {
      id: 'c5-bonus-b', kind: 'fraction', difficulty: 3,
      scenario: '잔량 차이 계산: 7/10 − 1/4 = ? (기약)',
      prompt: '차이 (기약)', hint: '공통분모 20.',
      answer: { numerator: 9, denominator: 20 }, requireSimplified: true,
    },
    {
      id: 'c5-bonus-c', kind: 'numeric', difficulty: 3,
      scenario: '두 분모 8과 12의 최소공배수를 입력해.',
      prompt: 'LCM(8,12)', hint: '24.',
      answer: 24, unit: '',
    },
  ],
  6: [
    {
      id: 'c6-bonus-a', kind: 'fraction', difficulty: 3,
      scenario: '배양 마무리! 대분수 2¾를 가분수로 (기약).',
      prompt: '가분수 (기약)', hint: '2×4+3=11, 분모 4.',
      answer: { numerator: 11, denominator: 4 }, requireSimplified: true,
    },
    {
      id: 'c6-bonus-b', kind: 'fraction', difficulty: 3,
      scenario: '1⅗ 를 가분수로 (기약).',
      prompt: '가분수 (기약)', hint: '1×5+3=8, 분모 5.',
      answer: { numerator: 8, denominator: 5 }, requireSimplified: true,
    },
    {
      id: 'c6-bonus-c', kind: 'fraction', difficulty: 3,
      scenario: '가분수 7/2를 대분수로… 가분수 그대로 입력 (기약).',
      prompt: '7/2를 기약 가분수로', hint: '이미 기약.',
      answer: { numerator: 7, denominator: 2 }, requireSimplified: true,
    },
  ],
  7: [
    {
      id: 'c7-bonus-a', kind: 'multi', difficulty: 3,
      scenario: '귀환 잠금: 분자에 7 더하고 5로 약분하니 3/5. 원래 분수 기약으로!',
      prompt: '풀이 + 기약 답', hint: '3/5 = 15/25, 15-7=8 → 8/25.',
      workspacePlaceholder: '예: 3/5 = 15/25, 15-7=8 → 8/25',
      finalAnswer: { numerator: 8, denominator: 25 }, requireSimplified: true,
    },
    {
      id: 'c7-bonus-b', kind: 'multi', difficulty: 3,
      scenario: '분자에 3을 더하고 7로 약분하니 2/3. 원래 분수 기약으로!',
      prompt: '풀이 + 기약 답', hint: '2/3 = 14/21, 14-3=11 → 11/21.',
      workspacePlaceholder: '풀이...',
      finalAnswer: { numerator: 11, denominator: 21 }, requireSimplified: true,
    },
    {
      id: 'c7-bonus-c', kind: 'fraction', difficulty: 3,
      scenario: '대분수의 합 2¼ + 1⅔ = ? (가분수 기약).',
      prompt: '가분수 기약', hint: '9/4 + 5/3 = 27/12 + 20/12 = 47/12.',
      answer: { numerator: 47, denominator: 12 }, requireSimplified: true,
    },
  ],
}

/** 챕터 진입 시 랜덤 1문항 선택 */
export const pickBonusProblem = (chapter: number): Problem => {
  const pool = POOLS[chapter]
  if (!pool || pool.length === 0) throw new Error(`No bonus pool for chapter ${chapter}`)
  return pool[Math.floor(Math.random() * pool.length)]
}

/** 하위 호환 — 첫 번째 문항 */
export const BONUS_PROBLEMS: Record<number, Problem> = Object.fromEntries(
  Object.entries(POOLS).map(([k, v]) => [k, v[0]]),
)
