/**
 * 이분모 능통 학생을 위한 응용 문제 풀.
 * 분모 조합 패턴별로 다양화:
 *   A. 서로소 (LCM = 두 분모 곱):  3·5, 4·5, 4·9, 5·7, 5·8, 7·12
 *   B. 배수 관계 (LCM = 큰 분모):  2·4, 3·9, 5·15
 *   C. 공통인수 (LCM < 두 분모 곱): 4·6, 6·9, 6·10, 8·12, 9·15
 * 응용 유형: 합/차/세 분수/분수↔소수/동치/자연수 카운트/다단계 역산/비율
 */

import type { Problem } from '@/types/problem'

export const ADVANCED_PROBLEMS: Problem[] = [
  // === 분수 ↔ 소수 변환 ===
  {
    id: 'adv-dec-1', kind: 'compare', difficulty: 2,
    scenario: '실험실에서 두 측정값이 도착했어.',
    prompt: '5/8 vs 0.6 — 어느 쪽이 큰가?',
    hint: '5/8 = 0.625.',
    left: { numerator: 5, denominator: 8 }, right: { decimal: 0.6 }, correctOp: '>',
  },
  {
    id: 'adv-dec-2', kind: 'fraction', difficulty: 2,
    scenario: '0.75를 기약분수로 바꿔.',
    prompt: '0.75 = ? (기약분수)',
    hint: '0.75 = 75/100 → 약분.',
    answer: { numerator: 3, denominator: 4 }, requireSimplified: true,
  },
  {
    id: 'adv-dec-3', kind: 'mcq', difficulty: 2,
    scenario: '아래 중 0.4와 같은 값을 가진 분수를 모두 고르세요.',
    prompt: '0.4와 같은 분수',
    hint: '0.4 = 4/10 = 2/5.',
    choices: ['2/5', '4/10', '6/15', '8/20', '3/8'],
    correctIndexes: [0, 1, 2, 3], multiple: true,
  },
  {
    id: 'adv-dec-4', kind: 'fraction', difficulty: 3,
    scenario: '0.625을 기약분수로 바꿔.',
    prompt: '0.625 = ? (기약분수)',
    hint: '625/1000 → 약분 (÷125).',
    answer: { numerator: 5, denominator: 8 }, requireSimplified: true,
  },
  {
    id: 'adv-dec-5', kind: 'compare', difficulty: 2,
    scenario: '실험 두 시료 비교.',
    prompt: '3/4 vs 7/10 — 어느 쪽이 큰가?',
    hint: '공통분모 20. 15/20 vs 14/20.',
    left: { numerator: 3, denominator: 4 }, right: { numerator: 7, denominator: 10 }, correctOp: '>',
  },
  {
    id: 'adv-dec-6', kind: 'compare', difficulty: 2,
    scenario: '두 압력 값 비교.',
    prompt: '4/9 vs 1/2 — 어느 쪽이 큰가?',
    hint: '공통분모 18. 8/18 vs 9/18.',
    left: { numerator: 4, denominator: 9 }, right: { numerator: 1, denominator: 2 }, correctOp: '<',
  },

  // === 실생활 비율 / 세 분수 ===
  {
    id: 'adv-life-1', kind: 'fraction', difficulty: 3,
    scenario: '음료수 한 병 1L에서 1/4 L를 마시고, 친구가 1/3 L를 마셨어. 남은 양 (기약)?',
    prompt: '남은 양 (기약 분수, L 단위)',
    hint: '1 - 1/4 - 1/3. 공통분모 12.',
    answer: { numerator: 5, denominator: 12 }, requireSimplified: true,
  },
  {
    id: 'adv-life-2', kind: 'fraction', difficulty: 3,
    scenario: '피자 한 판을 6조각으로 나눴어. 형이 1/2판, 누나가 1/3판을 먹었다면 내 몫(기약)?',
    prompt: '내 몫 (기약 분수)',
    hint: '1 - 1/2 - 1/3 = 6/6 - 3/6 - 2/6.',
    answer: { numerator: 1, denominator: 6 }, requireSimplified: true,
  },
  {
    id: 'adv-life-3', kind: 'fraction', difficulty: 3,
    scenario: '리터 단위 연료: 1/4 + 1/3 + 5/12 — 세 통을 합치면? (기약)',
    prompt: '합 (기약)',
    hint: '공통분모 12. 3/12 + 4/12 + 5/12 = 12/12.',
    answer: { numerator: 1, denominator: 1 }, requireSimplified: true,
  },
  {
    id: 'adv-life-4', kind: 'fraction', difficulty: 3,
    scenario: '연료 1/2 통, 산소 2/5 통, 물 3/10 통을 합쳤어. 총 (기약, 가분수 OK)?',
    prompt: '총합 (기약)',
    hint: '공통분모 10. 5/10 + 4/10 + 3/10 = 12/10 = 6/5.',
    answer: { numerator: 6, denominator: 5 }, requireSimplified: true,
  },

  // === 서로소 분모 (LCM = 곱) ===
  {
    id: 'adv-cop-1', kind: 'fraction', difficulty: 2,
    scenario: '서로소 분모 합: 3/5 + 1/3 (기약)',
    prompt: '합 (기약)',
    hint: '공통분모 15. 9/15 + 5/15 = 14/15.',
    answer: { numerator: 14, denominator: 15 }, requireSimplified: true,
  },
  {
    id: 'adv-cop-2', kind: 'fraction', difficulty: 3,
    scenario: '서로소 분모: 2/7 + 3/4 (기약)',
    prompt: '합 (기약)',
    hint: '공통분모 28. 8/28 + 21/28 = 29/28.',
    answer: { numerator: 29, denominator: 28 }, requireSimplified: true,
  },
  {
    id: 'adv-cop-3', kind: 'fraction', difficulty: 3,
    scenario: '5/9 + 1/4 (기약)',
    prompt: '합 (기약)',
    hint: '공통분모 36. 20/36 + 9/36 = 29/36.',
    answer: { numerator: 29, denominator: 36 }, requireSimplified: true,
  },
  {
    id: 'adv-cop-4', kind: 'fraction', difficulty: 3,
    scenario: '뺄셈: 7/8 - 2/5 (기약)',
    prompt: '차 (기약)',
    hint: '공통분모 40. 35/40 - 16/40 = 19/40.',
    answer: { numerator: 19, denominator: 40 }, requireSimplified: true,
  },

  // === 배수 관계 분모 (LCM = 큰 분모) ===
  {
    id: 'adv-mult-1', kind: 'fraction', difficulty: 2,
    scenario: '배수 분모: 3/4 + 5/12 (기약, 가분수 OK)',
    prompt: '합 (기약)',
    hint: '공통분모 12. 9/12 + 5/12 = 14/12 → 약분 7/6.',
    answer: { numerator: 7, denominator: 6 }, requireSimplified: true,
  },
  {
    id: 'adv-mult-2', kind: 'fraction', difficulty: 2,
    scenario: '5/6 - 1/3 (기약)',
    prompt: '차 (기약)',
    hint: '공통분모 6. 5/6 - 2/6 = 3/6 → 1/2.',
    answer: { numerator: 1, denominator: 2 }, requireSimplified: true,
  },
  {
    id: 'adv-mult-3', kind: 'fraction', difficulty: 3,
    scenario: '11/15 - 2/5 (기약)',
    prompt: '차 (기약)',
    hint: '공통분모 15. 11/15 - 6/15 = 5/15 → 1/3.',
    answer: { numerator: 1, denominator: 3 }, requireSimplified: true,
  },

  // === 공통인수 분모 (LCM < 곱) ===
  {
    id: 'adv-gcd-1', kind: 'fraction', difficulty: 3,
    scenario: '공통인수 분모: 5/6 + 2/9 (기약)',
    prompt: '합 (기약)',
    hint: '공통분모 18. 15/18 + 4/18 = 19/18.',
    answer: { numerator: 19, denominator: 18 }, requireSimplified: true,
  },
  {
    id: 'adv-gcd-2', kind: 'fraction', difficulty: 3,
    scenario: '5/8 + 1/6 (기약)',
    prompt: '합 (기약)',
    hint: '공통분모 24. 15/24 + 4/24 = 19/24.',
    answer: { numerator: 19, denominator: 24 }, requireSimplified: true,
  },
  {
    id: 'adv-gcd-3', kind: 'fraction', difficulty: 3,
    scenario: '7/12 - 1/8 (기약)',
    prompt: '차 (기약)',
    hint: '공통분모 24. 14/24 - 3/24 = 11/24.',
    answer: { numerator: 11, denominator: 24 }, requireSimplified: true,
  },
  {
    id: 'adv-gcd-4', kind: 'fraction', difficulty: 3,
    scenario: '11/15 - 1/6 (기약)',
    prompt: '차 (기약)',
    hint: '공통분모 30. 22/30 - 5/30 = 17/30.',
    answer: { numerator: 17, denominator: 30 }, requireSimplified: true,
  },

  // === 다단계 역산 ===
  {
    id: 'adv-multi-1', kind: 'multi', difficulty: 3,
    scenario: '어떤 분수의 분자에 3을 더하고 분모를 4 빼고 약분 6으로 했더니 1/2이 됐어. 원래 분수를 기약으로!',
    prompt: '원래 분수 (기약)',
    hint: '1/2 = 6/12 (×6 약분 전). 약분 전 분자 6에서 3 뺀 게 원래 분자, 분모 12에 4 더한 게 원래 분모. 즉 3/16.',
    workspacePlaceholder: '예: 1/2 = 6/12, 6-3=3, 12+4=16 → 3/16',
    finalAnswer: { numerator: 3, denominator: 16 }, requireSimplified: true,
  },
  {
    id: 'adv-multi-2', kind: 'numeric', difficulty: 3,
    scenario: '2/3 보다 크고 5/6 보다 작은 수 중에서, 분모가 12인 진분수의 개수는?',
    prompt: '개수',
    hint: '2/3 = 8/12, 5/6 = 10/12. 9/12 만.',
    answer: 1, unit: '개',
  },
  {
    id: 'adv-multi-3', kind: 'numeric', difficulty: 3,
    scenario: '0.3보다 크고 0.7보다 작은 수 중에서, 분모가 10인 기약 분수는 모두 몇 개?',
    prompt: '개수',
    hint: '4/10, 5/10, 6/10 모두 약분 가능. 분모 10 유지하는 기약은 0개.',
    answer: 0, unit: '개',
  },
  {
    id: 'adv-multi-4', kind: 'numeric', difficulty: 3,
    scenario: '1/6 < □/24 < 1/3 을 만족하는 자연수 □의 개수는?',
    prompt: '개수',
    hint: '1/6 = 4/24, 1/3 = 8/24. □는 5, 6, 7.',
    answer: 3, unit: '개',
  },
  {
    id: 'adv-multi-5', kind: 'multi', difficulty: 3,
    scenario: '어떤 분수에 1/8을 더하고 3으로 약분했더니 5/8이 됐어. 원래 분수를 기약으로!',
    prompt: '원래 분수 (기약)',
    hint: '5/8 약분 전 15/24. 15/24 - 1/8 = 15/24 - 3/24 = 12/24 → 약분 1/2.',
    workspacePlaceholder: '예: 5/8 = 15/24, 15/24 - 3/24 = 12/24 = 1/2',
    finalAnswer: { numerator: 1, denominator: 2 }, requireSimplified: true,
  },

  // === 통분 활용 (LCM / 공통분모 후보) ===
  {
    id: 'adv-lcm-1', kind: 'numeric', difficulty: 2,
    scenario: '두 분모 6, 10의 최소공배수를 구해서 통분 준비.',
    prompt: 'LCM(6, 10)',
    hint: '6 = 2·3, 10 = 2·5. LCM = 2·3·5.',
    answer: 30, unit: '',
  },
  {
    id: 'adv-lcm-2', kind: 'mcq', difficulty: 2,
    scenario: '3/4 와 5/6의 공통분모로 쓸 수 있는 수를 모두 고르세요.',
    prompt: '공통분모 후보',
    hint: 'LCM(4,6) = 12. 12의 배수들.',
    choices: ['12', '24', '30', '36', '48'],
    correctIndexes: [0, 1, 3, 4], multiple: true,
  },
  {
    id: 'adv-lcm-3', kind: 'numeric', difficulty: 3,
    scenario: '세 분모 4, 6, 9의 최소공배수는?',
    prompt: 'LCM(4, 6, 9)',
    hint: '4=2², 6=2·3, 9=3² → LCM = 2²·3² = 36.',
    answer: 36, unit: '',
  },
  {
    id: 'adv-lcm-4', kind: 'mcq', difficulty: 3,
    scenario: '7/8 과 5/12 의 공통분모로 쓸 수 있는 것을 모두 고르세요.',
    prompt: '공통분모 후보',
    hint: 'LCM(8,12) = 24. 24의 배수.',
    choices: ['24', '36', '48', '72', '96'],
    correctIndexes: [0, 2, 3, 4], multiple: true,
  },

  // === 동치 분수 함정 (분모 다양) ===
  {
    id: 'adv-eq-1', kind: 'mcq', difficulty: 2,
    scenario: '진짜 5/8과 같은 분수만 골라낼 수 있어?',
    prompt: '5/8과 같은 분수',
    hint: '분자·분모를 같은 수로 곱했는지 검산.',
    choices: ['10/16', '15/24', '20/32', '10/18', '25/40'],
    correctIndexes: [0, 1, 2, 4], multiple: true,
  },
  {
    id: 'adv-eq-2', kind: 'mcq', difficulty: 3,
    scenario: '3/7과 같은 분수만 골라.',
    prompt: '3/7 의 동치 분수',
    hint: '×2, ×3, ×4 ... 모든 배수.',
    choices: ['6/14', '9/21', '12/28', '15/35', '18/49'],
    correctIndexes: [0, 1, 2, 3], multiple: true,
  },
  {
    id: 'adv-eq-3', kind: 'fraction', difficulty: 2,
    scenario: '5/12 와 같은 값을 가지면서 분모가 24인 분수의 분자는?',
    prompt: '동치 분수 (분모 24)',
    hint: '5/12 = X/24. ×2.',
    answer: { numerator: 10, denominator: 24 }, requireSimplified: false,
  },

  // === 비율 / 백분율 ↔ 분수 ===
  {
    id: 'adv-pct-1', kind: 'fraction', difficulty: 2,
    scenario: '학급 인원의 35% 가 안경을 써. 이를 기약분수로 표현하면?',
    prompt: '35% 의 기약분수',
    hint: '35/100 → 약분 (÷5).',
    answer: { numerator: 7, denominator: 20 }, requireSimplified: true,
  },
  {
    id: 'adv-pct-2', kind: 'fraction', difficulty: 3,
    scenario: '연료의 60% 를 사용. 사용한 양을 기약분수로 표현하면?',
    prompt: '60% 의 기약분수',
    hint: '60/100 → 약분.',
    answer: { numerator: 3, denominator: 5 }, requireSimplified: true,
  },
]

/** 풀에서 N개 랜덤 픽 */
export const pickAdvancedProblems = (n: number): Problem[] => {
  const pool = [...ADVANCED_PROBLEMS]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(n, pool.length))
}
