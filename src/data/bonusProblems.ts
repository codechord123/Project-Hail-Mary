import type { Problem } from '@/types/problem'

/**
 * 챕터 메인 메커니즘 종료 후 등장하는 보너스 응용 문제 풀.
 * 챕터당 여러 문항 중 매 진입 시 랜덤 picking → 재플레이 다양성.
 */
const POOLS: Record<number, Problem[]> = {
  2: [
    {
      id: 'c2-bonus-a', kind: 'fraction', difficulty: 2,
      scenario: '식량 점검 마무리! 비축 식량 3/4 에서 1/8 을 먹었어. 남은 양 (기약)?',
      prompt: '남은 식량 (기약)', hint: '공통분모 8. 6/8 - 1/8 = 5/8.',
      answer: { numerator: 5, denominator: 8 }, requireSimplified: true,
    },
    {
      id: 'c2-bonus-b', kind: 'fraction', difficulty: 2,
      scenario: '연료 5/6 에서 1/3 만큼 빠져나갔어. 남은 연료를 기약분수로!',
      prompt: '남은 연료 (기약)', hint: '공통분모 6. 5/6 - 2/6 = 3/6 → 약분.',
      answer: { numerator: 1, denominator: 2 }, requireSimplified: true,
    },
    {
      id: 'c2-bonus-c', kind: 'fraction', difficulty: 2,
      scenario: '비상 식수 7/10 에서 1/2 을 마셨어. 남은 양 (기약)?',
      prompt: '남은 양 (기약)', hint: '공통분모 10. 7/10 - 5/10 = 2/10 → 약분.',
      answer: { numerator: 1, denominator: 5 }, requireSimplified: true,
    },
    {
      id: 'c2-bonus-d', kind: 'fraction', difficulty: 3,
      scenario: '약품 5/6 에서 3/4 을 사용. 남은 약품을 기약분수로!',
      prompt: '남은 약품 (기약)', hint: '공통분모 12. 10/12 - 9/12 = 1/12.',
      answer: { numerator: 1, denominator: 12 }, requireSimplified: true,
    },
    {
      id: 'c2-bonus-e', kind: 'mcq', difficulty: 2,
      scenario: '통분해서 계산한 결과가 1/2 이 되는 식을 모두 골라.',
      prompt: '결과가 1/2 인 식', hint: '각 식을 통분해서 1/2(=다양한 동치)인지 확인.',
      choices: ['3/4 - 1/4', '5/6 - 1/3', '2/3 - 1/6', '7/8 - 1/4', '3/4 - 1/8'],
      correctIndexes: [0, 1, 2], multiple: true,
    },
    {
      id: 'c2-bonus-f', kind: 'fraction', difficulty: 3,
      scenario: '산소 11/12 에서 2/3 만큼 소비. 남은 산소 (기약)?',
      prompt: '남은 산소 (기약)', hint: '공통분모 12. 11/12 - 8/12 = 3/12 → 약분.',
      answer: { numerator: 1, denominator: 4 }, requireSimplified: true,
    },
    {
      id: 'c2-bonus-g', kind: 'fraction', difficulty: 3,
      scenario: '구조선 식량 5/6 에서 도둑 한 마리당 1/3 씩 두 마리가 가져갔어. 남은 양 (기약)?',
      prompt: '남은 양 (기약)', hint: '5/6 - 4/6 = 1/6.',
      answer: { numerator: 1, denominator: 6 }, requireSimplified: true,
    },
    {
      id: 'c2-bonus-h', kind: 'fraction', difficulty: 3,
      scenario: '비상 전력 7/10 에서 3/5 만큼 누출. 남은 전력 (기약)?',
      prompt: '남은 양 (기약)', hint: '3/5 = 6/10. 7/10 - 6/10 = 1/10.',
      answer: { numerator: 1, denominator: 10 }, requireSimplified: true,
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
    {
      id: 'c3-bonus-d', kind: 'fraction', difficulty: 3,
      scenario: '8/12 와 같은 값을 가지는, 분모가 9인 분수의 분자는? 답을 분수로 입력.',
      prompt: '분모 9 형태의 동치 분수', hint: '8/12 = 2/3 = 6/9.',
      answer: { numerator: 6, denominator: 9 }, requireSimplified: false,
    },
    {
      id: 'c3-bonus-e', kind: 'numeric', difficulty: 2,
      scenario: '분모가 8인 진분수 중 기약분수는 모두 몇 개?',
      prompt: '기약분수 개수', hint: '1, 3, 5, 7.',
      answer: 4, unit: '개',
    },
    {
      id: 'c3-bonus-f', kind: 'compare', difficulty: 2,
      scenario: '두 잔량 비교.',
      prompt: '7/10 vs 0.75', hint: '7/10 = 0.7.',
      left: { numerator: 7, denominator: 10 }, right: { decimal: 0.75 },
      correctOp: '<',
    },
    {
      id: 'c3-bonus-g', kind: 'numeric', difficulty: 3,
      scenario: '2/5 의 분자에 4를 더했더니 분수의 크기가 변하지 않았어. 분모에는 얼마를 더한 거야?',
      prompt: '분모에 더한 수',
      hint: '분자 2 → 6 (×3). 분모도 ×3 → 15. 15 − 5 = ?',
      answer: 10, unit: '',
    },
    {
      id: 'c3-bonus-h', kind: 'multi', difficulty: 3,
      scenario: '어떤 분수의 분모에 3을 더하고 4로 약분했더니 1/3이 됐어. 원래 분수를 기약으로!',
      prompt: '원래 분수 (기약)',
      hint: '4로 약분 후 1/3 → 약분 전 4/12. 분모에 3 더해서 12였으니 원래 분모 9 → 4/9.',
      workspacePlaceholder: '예: 1/3 = 4/12, 12 - 3 = 9 → 4/9',
      finalAnswer: { numerator: 4, denominator: 9 }, requireSimplified: true,
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
    {
      id: 'c4-bonus-d', kind: 'fraction', difficulty: 2,
      scenario: '응원 함대 — 2/3 + 1/4 = ? (기약)',
      prompt: '합 (기약)', hint: '공통분모 12, 8+3=11.',
      answer: { numerator: 11, denominator: 12 }, requireSimplified: true,
    },
    {
      id: 'c4-bonus-e', kind: 'fraction', difficulty: 3,
      scenario: '두 부대 합류: 5/8 + 1/6 = ? (기약)',
      prompt: '합 (기약)', hint: '공통분모 24, 15+4=19.',
      answer: { numerator: 19, denominator: 24 }, requireSimplified: true,
    },
    {
      id: 'c4-bonus-f', kind: 'compare', difficulty: 2,
      scenario: '두 시작 분량 비교.',
      prompt: '1/3 + 1/4 vs 1/2', hint: '1/3+1/4=7/12, 1/2=6/12.',
      left: { numerator: 7, denominator: 12 }, right: { numerator: 1, denominator: 2 },
      correctOp: '>',
    },
    {
      id: 'c4-bonus-g', kind: 'numeric', difficulty: 3,
      scenario: '두 분수 5/12 와 1/4 의 공통분모로 가능한 수가 후보 [12, 24, 30, 36, 48, 50] 중 몇 개?',
      prompt: '공통분모 후보 개수',
      hint: '공통분모는 12와 4의 공배수. 12의 배수 = 12, 24, 36, 48.',
      answer: 4, unit: '개',
    },
    {
      id: 'c4-bonus-h', kind: 'fraction', difficulty: 3,
      scenario: '연료 1/2 + 1/3 + 1/6 — 세 개를 합하면 (기약, 가분수 OK)?',
      prompt: '합 (기약)',
      hint: '공통분모 6. 3/6 + 2/6 + 1/6 = 6/6 = 1.',
      answer: { numerator: 1, denominator: 1 }, requireSimplified: true,
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
    {
      id: 'c5-bonus-d', kind: 'fraction', difficulty: 3,
      scenario: '잔량 차이: 4/5 - 1/3 = ? (기약)',
      prompt: '차이 (기약)', hint: '공통분모 15, 12-5=7.',
      answer: { numerator: 7, denominator: 15 }, requireSimplified: true,
    },
    {
      id: 'c5-bonus-e', kind: 'numeric', difficulty: 2,
      scenario: '두 분모 6과 9의 최소공배수는?',
      prompt: 'LCM(6,9)', hint: '18.',
      answer: 18, unit: '',
    },
    {
      id: 'c5-bonus-f', kind: 'fraction', difficulty: 3,
      scenario: '전력 손실: 5/6 - 2/9 = ? (기약)',
      prompt: '차이 (기약)', hint: '공통분모 18, 15-4=11.',
      answer: { numerator: 11, denominator: 18 }, requireSimplified: true,
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
      id: 'c6-bonus-c', kind: 'mcq', difficulty: 2,
      scenario: '가분수 11/3 을 대분수로 바꾸면?',
      prompt: '11/3 의 대분수 표현 = ?',
      hint: '11 ÷ 3 = 3 나머지 2.',
      choices: ['3⅓', '3⅔', '2⅔', '4⅓', '⅓'],
      correctIndexes: [1], multiple: false,
    },
    {
      id: 'c6-bonus-d', kind: 'fraction', difficulty: 3,
      scenario: '2⅖ 를 가분수로 (기약).',
      prompt: '가분수 (기약)', hint: '2×5+2=12, 분모 5. 약분 X.',
      answer: { numerator: 12, denominator: 5 }, requireSimplified: true,
    },
    {
      id: 'c6-bonus-e', kind: 'fraction', difficulty: 3,
      scenario: '3⅔ 를 가분수로 (기약).',
      prompt: '가분수 (기약)', hint: '3×3+2=11, 분모 3.',
      answer: { numerator: 11, denominator: 3 }, requireSimplified: true,
    },
    {
      id: 'c6-bonus-f', kind: 'mcq', difficulty: 2,
      scenario: '가분수 9/4 와 같은 대분수는?',
      prompt: '9/4의 대분수 표현 = ?', hint: '9 = 4×2 + 1.',
      choices: ['1¾', '2¼', '2¾', '3¼', '1¼'],
      correctIndexes: [1], multiple: false,
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
    {
      id: 'c7-bonus-d', kind: 'fraction', difficulty: 3,
      scenario: '대분수의 차 3⅓ − 1½ = ? (가분수 기약).',
      prompt: '차 (가분수 기약)', hint: '10/3 - 3/2 = 20/6 - 9/6 = 11/6.',
      answer: { numerator: 11, denominator: 6 }, requireSimplified: true,
    },
    {
      id: 'c7-bonus-e', kind: 'mcq', difficulty: 2,
      scenario: '여왕의 마지막 술책 — 1/2 와 크기가 같은 분수는?',
      prompt: '1/2와 동치인 분수를 모두 골라.', hint: '분자×2 = 분모.',
      choices: ['2/4', '3/6', '5/10', '7/14', '4/9'],
      correctIndexes: [0, 1, 2, 3], multiple: true,
    },
    {
      id: 'c7-bonus-f', kind: 'numeric', difficulty: 3,
      scenario: '5/6 보다 크고 1 보다 작은 분수 중에서, 분모가 12인 진분수의 개수는?',
      prompt: '개수', hint: '5/6=10/12, 1=12/12. 11/12 만.',
      answer: 1, unit: '개',
    },
    {
      id: 'c7-bonus-g', kind: 'multi', difficulty: 3,
      scenario: '여왕의 마지막 함정 — 어떤 분수의 분자에 6을 더하고 5로 약분하니 4/5가 됐어. 원래 분수를 기약으로!',
      prompt: '원래 분수 (기약)',
      hint: '5로 약분 후 4/5 → 약분 전 20/25. 분자 -6 = 14 → 14/25.',
      workspacePlaceholder: '예: 4/5 = 20/25, 20-6=14 → 14/25',
      finalAnswer: { numerator: 14, denominator: 25 }, requireSimplified: true,
    },
    {
      id: 'c7-bonus-h', kind: 'numeric', difficulty: 3,
      scenario: '귀환 항로 — 1/3 보다 크고 2/3 보다 작은 분수 중 분모가 9인 진분수는 모두 몇 개?',
      prompt: '개수',
      hint: '1/3=3/9, 2/3=6/9. 분자 4와 5 → 2개.',
      answer: 2, unit: '개',
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
