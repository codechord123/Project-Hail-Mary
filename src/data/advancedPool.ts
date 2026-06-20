/**
 * 이분모 능통 학생을 위한 응용 문제 풀.
 * 분수↔소수, 단위 변환, 비율/실생활 문장제, 다단계 추론.
 */

import type { Problem } from '@/types/problem'

export const ADVANCED_PROBLEMS: Problem[] = [
  // === 분수 ↔ 소수 ===
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

  // === 실생활 비율 ===
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

  // === 다단계 추론 ===
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
    hint: '4/10, 5/10=1/2, 6/10=3/5 중 기약은 사용 분모가 10이어야 → 7/10 안돼... 4/10 약분→2/5 (분모5), 5/10 약분→1/2 (분모2), 6/10 약분→3/5 (분모5). 분모 10 유지하는 기약은 없음? 0이라고 답하지 말고 직접 따져봐.',
    answer: 0, unit: '개',
  },

  // === 통분 활용 ===
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

  // === 동치 분수 함정 ===
  {
    id: 'adv-eq-1', kind: 'mcq', difficulty: 2,
    scenario: '진짜 5/8과 같은 분수만 골라낼 수 있어?',
    prompt: '5/8과 같은 분수',
    hint: '분자·분모를 같은 수로 곱했는지 검산.',
    choices: ['10/16', '15/24', '20/32', '10/18', '25/40'],
    correctIndexes: [0, 1, 2, 4], multiple: true,
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
