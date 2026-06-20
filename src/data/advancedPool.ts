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
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '5/8 = 0.625.',
    left: { numerator: 5, denominator: 8 }, right: { decimal: 0.6 }, correctOp: '>',
  },
  {
    id: 'adv-dec-2', kind: 'fraction', difficulty: 2,
    scenario: '0.75를 기약분수로 바꿔.',
    prompt: '같은 값을 기약분수로',
    hint: '0.75 = 75/100 → 약분.',
    answer: { numerator: 3, denominator: 4 }, requireSimplified: true,
  },
  {
    id: 'adv-dec-3', kind: 'mcq', difficulty: 2,
    scenario: '아래 중 0.4와 같은 값을 가진 분수를 모두 고르세요.',
    prompt: '같은 값을 가지는 분수를 모두 선택',
    hint: '0.4 = 4/10 = 2/5.',
    choices: ['2/5', '4/10', '6/15', '8/20', '3/8'],
    correctIndexes: [0, 1, 2, 3], multiple: true,
  },
  {
    id: 'adv-dec-4', kind: 'fraction', difficulty: 3,
    scenario: '0.625을 기약분수로 바꿔.',
    prompt: '같은 값을 기약분수로',
    hint: '625/1000 → 약분 (÷125).',
    answer: { numerator: 5, denominator: 8 }, requireSimplified: true,
  },
  {
    id: 'adv-dec-5', kind: 'compare', difficulty: 2,
    scenario: '실험 두 시료 비교.',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '공통분모 20. 15/20 vs 14/20.',
    left: { numerator: 3, denominator: 4 }, right: { numerator: 7, denominator: 10 }, correctOp: '>',
  },
  {
    id: 'adv-dec-6', kind: 'compare', difficulty: 2,
    scenario: '두 압력 값 비교.',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '공통분모 18. 8/18 vs 9/18.',
    left: { numerator: 4, denominator: 9 }, right: { numerator: 1, denominator: 2 }, correctOp: '<',
  },

  // === 실생활 비율 / 세 분수 ===
  {
    id: 'adv-life-1', kind: 'fraction', difficulty: 3,
    scenario: '음료수 한 병 1L에서 1/4 L를 마시고, 친구가 1/3 L를 마셨어. 남은 양 (기약)?',
    prompt: '남은 양을 기약분수로',
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
    prompt: '합을 기약분수로',
    hint: '공통분모 12. 3/12 + 4/12 + 5/12 = 12/12.',
    answer: { numerator: 1, denominator: 1 }, requireSimplified: true,
  },
  {
    id: 'adv-life-4', kind: 'fraction', difficulty: 3,
    scenario: '연료 1/2 통, 산소 2/5 통, 물 3/10 통을 합쳤어. 총 (기약, 가분수 OK)?',
    prompt: '합을 기약분수로',
    hint: '공통분모 10. 5/10 + 4/10 + 3/10 = 12/10 = 6/5.',
    answer: { numerator: 6, denominator: 5 }, requireSimplified: true,
  },

  // === 서로소 분모 (LCM = 곱) ===
  {
    id: 'adv-cop-1', kind: 'fraction', difficulty: 2,
    scenario: '서로소 분모 합: 3/5 + 1/3 (기약)',
    prompt: '합을 기약분수로',
    hint: '공통분모 15. 9/15 + 5/15 = 14/15.',
    answer: { numerator: 14, denominator: 15 }, requireSimplified: true,
  },
  {
    id: 'adv-cop-2', kind: 'fraction', difficulty: 3,
    scenario: '서로소 분모: 2/7 + 3/4 (기약)',
    prompt: '합을 기약분수로',
    hint: '공통분모 28. 8/28 + 21/28 = 29/28.',
    answer: { numerator: 29, denominator: 28 }, requireSimplified: true,
  },
  {
    id: 'adv-cop-3', kind: 'fraction', difficulty: 3,
    scenario: '5/9 + 1/4 (기약)',
    prompt: '합을 기약분수로',
    hint: '공통분모 36. 20/36 + 9/36 = 29/36.',
    answer: { numerator: 29, denominator: 36 }, requireSimplified: true,
  },
  {
    id: 'adv-cop-4', kind: 'fraction', difficulty: 3,
    scenario: '뺄셈: 7/8 - 2/5 (기약)',
    prompt: '차를 기약분수로',
    hint: '공통분모 40. 35/40 - 16/40 = 19/40.',
    answer: { numerator: 19, denominator: 40 }, requireSimplified: true,
  },

  // === 배수 관계 분모 (LCM = 큰 분모) ===
  {
    id: 'adv-mult-1', kind: 'fraction', difficulty: 2,
    scenario: '배수 분모: 3/4 + 5/12 (기약, 가분수 OK)',
    prompt: '합을 기약분수로',
    hint: '공통분모 12. 9/12 + 5/12 = 14/12 → 약분 7/6.',
    answer: { numerator: 7, denominator: 6 }, requireSimplified: true,
  },
  {
    id: 'adv-mult-2', kind: 'fraction', difficulty: 2,
    scenario: '5/6 - 1/3 (기약)',
    prompt: '차를 기약분수로',
    hint: '공통분모 6. 5/6 - 2/6 = 3/6 → 1/2.',
    answer: { numerator: 1, denominator: 2 }, requireSimplified: true,
  },
  {
    id: 'adv-mult-3', kind: 'fraction', difficulty: 3,
    scenario: '11/15 - 2/5 (기약)',
    prompt: '차를 기약분수로',
    hint: '공통분모 15. 11/15 - 6/15 = 5/15 → 1/3.',
    answer: { numerator: 1, denominator: 3 }, requireSimplified: true,
  },

  // === 공통인수 분모 (LCM < 곱) ===
  {
    id: 'adv-gcd-1', kind: 'fraction', difficulty: 3,
    scenario: '공통인수 분모: 5/6 + 2/9 (기약)',
    prompt: '합을 기약분수로',
    hint: '공통분모 18. 15/18 + 4/18 = 19/18.',
    answer: { numerator: 19, denominator: 18 }, requireSimplified: true,
  },
  {
    id: 'adv-gcd-2', kind: 'fraction', difficulty: 3,
    scenario: '5/8 + 1/6 (기약)',
    prompt: '합을 기약분수로',
    hint: '공통분모 24. 15/24 + 4/24 = 19/24.',
    answer: { numerator: 19, denominator: 24 }, requireSimplified: true,
  },
  {
    id: 'adv-gcd-3', kind: 'fraction', difficulty: 3,
    scenario: '7/12 - 1/8 (기약)',
    prompt: '차를 기약분수로',
    hint: '공통분모 24. 14/24 - 3/24 = 11/24.',
    answer: { numerator: 11, denominator: 24 }, requireSimplified: true,
  },
  {
    id: 'adv-gcd-4', kind: 'fraction', difficulty: 3,
    scenario: '11/15 - 1/6 (기약)',
    prompt: '차를 기약분수로',
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
    // 이분모 범위 (2/3, 5/6 분모 다름)
    id: 'adv-multi-2', kind: 'numeric', difficulty: 3,
    scenario: '아군 함대 위치는 2/3 광년 너머이고, 적군 함대는 5/6 광년 안쪽에 있어. 우리 좌표 분모 18 의 자연수 □ 가 두 함대 사이에 들어갈 수 있는 경우는 몇 가지?',
    prompt: '가능한 자연수 □ 의 개수',
    hint: '2/3 = 12/18, 5/6 = 15/18. □ ∈ {13, 14} → 2개.',
    answer: 2, unit: '개',
  },
  {
    // 이분모 범위 (0.3, 0.7 → 3/10, 7/10 — diversify with 분모 20)
    id: 'adv-multi-3', kind: 'numeric', difficulty: 3,
    scenario: '비상 출력은 0.3 단계보다 높고 0.7 단계보다 낮아야 안전해. 우리 계측기 분모 20 의 자연수 출력 □ 는 모두 몇 개?',
    prompt: '가능한 자연수 □ 의 개수',
    hint: '0.3 = 6/20, 0.7 = 14/20. □ ∈ {7...13} → 7개.',
    answer: 7, unit: '개',
  },
  {
    // 이분모 범위 (1/6, 1/3 분모 다름)
    id: 'adv-multi-4', kind: 'numeric', difficulty: 3,
    scenario: '항법 안전 범위는 1/6 광년 이상 1/3 광년 이하야. 분모 24 의 자연수 좌표 □ 가 가능한 경우는?',
    prompt: '가능한 자연수 □ 의 개수',
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
    prompt: '두 분모의 최소공배수 (LCM)',
    hint: '6 = 2·3, 10 = 2·5. LCM = 2·3·5.',
    answer: 30, unit: '',
  },
  {
    id: 'adv-lcm-2', kind: 'mcq', difficulty: 2,
    scenario: '3/4 와 5/6의 공통분모로 쓸 수 있는 수를 모두 고르세요.',
    prompt: '가능한 공통분모를 모두 선택',
    hint: 'LCM(4,6) = 12. 12의 배수들.',
    choices: ['12', '24', '30', '36', '48'],
    correctIndexes: [0, 1, 3, 4], multiple: true,
  },
  {
    id: 'adv-lcm-3', kind: 'numeric', difficulty: 3,
    scenario: '세 분모 4, 6, 9의 최소공배수는?',
    prompt: '두 분모의 최소공배수 (LCM)',
    hint: '4=2², 6=2·3, 9=3² → LCM = 2²·3² = 36.',
    answer: 36, unit: '',
  },
  {
    id: 'adv-lcm-4', kind: 'mcq', difficulty: 3,
    scenario: '7/8 과 5/12 의 공통분모로 쓸 수 있는 것을 모두 고르세요.',
    prompt: '가능한 공통분모를 모두 선택',
    hint: 'LCM(8,12) = 24. 24의 배수.',
    choices: ['24', '36', '48', '72', '96'],
    correctIndexes: [0, 2, 3, 4], multiple: true,
  },

  // === 동치 분수 함정 (분모 다양) ===
  {
    id: 'adv-eq-1', kind: 'mcq', difficulty: 2,
    scenario: '진짜 5/8과 같은 분수만 골라낼 수 있어?',
    prompt: '같은 값을 가지는 분수를 모두 선택',
    hint: '분자·분모를 같은 수로 곱했는지 검산.',
    choices: ['10/16', '15/24', '20/32', '10/18', '25/40'],
    correctIndexes: [0, 1, 2, 4], multiple: true,
  },
  {
    id: 'adv-eq-2', kind: 'mcq', difficulty: 3,
    scenario: '3/7과 같은 분수만 골라.',
    prompt: '같은 값을 가지는 분수를 모두 선택',
    hint: '×2, ×3, ×4 ... 모든 배수.',
    choices: ['6/14', '9/21', '12/28', '15/35', '18/49'],
    correctIndexes: [0, 1, 2, 3], multiple: true,
  },
  {
    id: 'adv-eq-3', kind: 'fraction', difficulty: 2,
    scenario: '5/12 와 같은 값을 가지면서 분모가 24인 분수의 분자는?',
    prompt: '같은 값의 분수 (분모는 시나리오에 명시) 를 적어',
    hint: '5/12 = X/24. ×2.',
    answer: { numerator: 10, denominator: 24 }, requireSimplified: false,
  },

  // === 비율 / 백분율 ↔ 분수 ===
  {
    id: 'adv-pct-1', kind: 'fraction', difficulty: 2,
    scenario: '학급 인원의 35% 가 안경을 써. 이를 기약분수로 표현하면?',
    prompt: '같은 값을 기약분수로',
    hint: '35/100 → 약분 (÷5).',
    answer: { numerator: 7, denominator: 20 }, requireSimplified: true,
  },
  {
    id: 'adv-pct-2', kind: 'fraction', difficulty: 3,
    scenario: '연료의 60% 를 사용. 사용한 양을 기약분수로 표현하면?',
    prompt: '같은 값을 기약분수로',
    hint: '60/100 → 약분.',
    answer: { numerator: 3, denominator: 5 }, requireSimplified: true,
  },

  // === 소수 둘째자리 → 분수 변환 (2 decimal place) ===
  {
    id: 'adv-dec2-1', kind: 'fraction', difficulty: 2,
    scenario: '0.25 를 기약분수로 바꿔.',
    prompt: '같은 값을 기약분수로',
    hint: '0.25 = 25/100 → 25와 100을 25로 약분 → 1/4.',
    answer: { numerator: 1, denominator: 4 }, requireSimplified: true,
  },
  {
    id: 'adv-dec2-2', kind: 'fraction', difficulty: 2,
    scenario: '0.36 을 기약분수로.',
    prompt: '같은 값을 기약분수로',
    hint: '36/100 → ÷4 = 9/25.',
    answer: { numerator: 9, denominator: 25 }, requireSimplified: true,
  },
  {
    id: 'adv-dec2-3', kind: 'fraction', difficulty: 2,
    scenario: '0.45 를 기약분수로.',
    prompt: '같은 값을 기약분수로',
    hint: '45/100 → ÷5 = 9/20.',
    answer: { numerator: 9, denominator: 20 }, requireSimplified: true,
  },
  {
    id: 'adv-dec2-4', kind: 'fraction', difficulty: 3,
    scenario: '0.08 을 기약분수로.',
    prompt: '같은 값을 기약분수로',
    hint: '8/100 → ÷4 = 2/25.',
    answer: { numerator: 2, denominator: 25 }, requireSimplified: true,
  },
  {
    id: 'adv-dec2-5', kind: 'fraction', difficulty: 3,
    scenario: '0.84 를 기약분수로.',
    prompt: '같은 값을 기약분수로',
    hint: '84/100 → ÷4 = 21/25.',
    answer: { numerator: 21, denominator: 25 }, requireSimplified: true,
  },
  {
    id: 'adv-dec2-6', kind: 'fraction', difficulty: 2,
    scenario: '0.65 를 기약분수로.',
    prompt: '같은 값을 기약분수로',
    hint: '65/100 → ÷5 = 13/20.',
    answer: { numerator: 13, denominator: 20 }, requireSimplified: true,
  },
  {
    id: 'adv-dec2-7', kind: 'fraction', difficulty: 3,
    scenario: '0.16 을 기약분수로.',
    prompt: '같은 값을 기약분수로',
    hint: '16/100 → ÷4 = 4/25.',
    answer: { numerator: 4, denominator: 25 }, requireSimplified: true,
  },
  {
    id: 'adv-dec2-8', kind: 'mcq', difficulty: 2,
    scenario: '아래 중 0.75 와 같은 분수를 모두 골라.',
    prompt: '같은 값을 가지는 분수를 모두 선택',
    hint: '0.75 = 75/100 = 3/4.',
    choices: ['3/4', '6/8', '15/20', '9/12', '5/8'],
    correctIndexes: [0, 1, 2, 3], multiple: true,
  },
  {
    id: 'adv-dec2-9', kind: 'mcq', difficulty: 2,
    scenario: '아래 중 0.6 과 같은 분수만 골라.',
    prompt: '같은 값을 가지는 분수를 모두 선택',
    hint: '0.6 = 6/10 = 3/5.',
    choices: ['3/5', '6/10', '9/15', '12/20', '4/7'],
    correctIndexes: [0, 1, 2, 3], multiple: true,
  },

  // === 소수 + 분수 혼합 계산 (이분모 응용) ===
  {
    id: 'adv-mix-1', kind: 'fraction', difficulty: 3,
    scenario: '연료 0.25 L 와 1/3 L 를 합쳤어. 기약분수로 답해.',
    prompt: '기약분수로 답해',
    hint: '0.25 = 1/4. 1/4 + 1/3 = 3/12 + 4/12 = 7/12.',
    answer: { numerator: 7, denominator: 12 }, requireSimplified: true,
  },
  {
    id: 'adv-mix-2', kind: 'fraction', difficulty: 3,
    scenario: '물 0.4 L 에서 1/6 L 가 증발. 남은 양 (기약)?',
    prompt: '기약분수로 답해',
    hint: '0.4 = 2/5. 2/5 - 1/6 = 12/30 - 5/30 = 7/30.',
    answer: { numerator: 7, denominator: 30 }, requireSimplified: true,
  },
  {
    id: 'adv-mix-3', kind: 'fraction', difficulty: 3,
    scenario: '산소 0.75 L 에서 5/8 L 를 사용했어. 남은 양 (기약)?',
    prompt: '기약분수로 답해',
    hint: '0.75 = 3/4 = 6/8. 6/8 - 5/8 = 1/8.',
    answer: { numerator: 1, denominator: 8 }, requireSimplified: true,
  },
  {
    id: 'adv-mix-4', kind: 'compare', difficulty: 2,
    scenario: '두 시료의 무게 비교.',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '7/20 = 0.35.',
    left: { numerator: 7, denominator: 20 }, right: { decimal: 0.4 }, correctOp: '<',
  },
  {
    id: 'adv-mix-5', kind: 'compare', difficulty: 2,
    scenario: '두 측정값.',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '0.45 = 9/20. 9/20 = 45/100, 9/25 = 36/100.',
    left: { decimal: 0.45 }, right: { numerator: 9, denominator: 25 }, correctOp: '>',
  },
  {
    id: 'adv-mix-6', kind: 'compare', difficulty: 3,
    scenario: '비밀 좌표 비교.',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '3/8 = 0.375.',
    left: { numerator: 3, denominator: 8 }, right: { decimal: 0.4 }, correctOp: '<',
  },
  {
    // 이분모 범위 (0.3 = 3/10, 1/2 → 분모 다름)
    id: 'adv-mix-7', kind: 'numeric', difficulty: 3,
    scenario: '연료 라인 압력이 0.3 단계 ~ 1/2 단계 사이에 있어야 안전 운행 가능. 분모 20 의 자연수 압력 □ 는 몇 가지?',
    prompt: '가능한 자연수 □ 의 개수',
    hint: '0.3 = 6/20, 1/2 = 10/20. □ ∈ {7, 8, 9} → 3개.',
    answer: 3, unit: '개',
  },
  {
    id: 'adv-mix-8', kind: 'fraction', difficulty: 3,
    scenario: '용액 A 0.6 L 와 용액 B 1/4 L 를 합쳤어. 기약분수로!',
    prompt: '기약분수로 답해',
    hint: '0.6 = 3/5. 3/5 + 1/4 = 12/20 + 5/20 = 17/20.',
    answer: { numerator: 17, denominator: 20 }, requireSimplified: true,
  },

  // === 타우 세티 항로 비교 응용 (route comparison) ===
  {
    id: 'adv-route-1', kind: 'compare', difficulty: 3,
    scenario: '타우 세티로 가는 두 항로. 항로 A는 5/6 광년, 항로 B는 7/8 광년. 어느 항로가 더 가까울까?',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '공통분모 24. 20/24 vs 21/24.',
    left: { numerator: 5, denominator: 6 }, right: { numerator: 7, denominator: 8 }, correctOp: '<',
  },
  {
    id: 'adv-route-2', kind: 'compare', difficulty: 3,
    scenario: '소행성대 우회 항로 — 위쪽 경로 7/12 광년, 아래쪽 경로 0.6 광년. 어느 쪽이 더 짧은가?',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '7/12 ≈ 0.583.',
    left: { numerator: 7, denominator: 12 }, right: { decimal: 0.6 }, correctOp: '<',
  },
  {
    id: 'adv-route-3', kind: 'compare', difficulty: 3,
    scenario: '두 화물선이 화성으로 출발했어. A선은 3/8 일 만에, B선은 0.4 일 만에 도착. 누가 더 빨라?',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '3/8 = 0.375.',
    left: { numerator: 3, denominator: 8 }, right: { decimal: 0.4 }, correctOp: '<',
  },
  {
    id: 'adv-route-4', kind: 'fraction', difficulty: 3,
    scenario: '타우 세티 항로 — 첫 구간 3/8 광년 + 두 번째 구간 5/12 광년. 총 거리 (기약)?',
    prompt: '기약분수로 답해',
    hint: '공통분모 24. 9/24 + 10/24 = 19/24.',
    answer: { numerator: 19, denominator: 24 }, requireSimplified: true,
  },
  {
    id: 'adv-route-5', kind: 'fraction', difficulty: 3,
    scenario: '항해 일지: 어제 7/10 광년, 오늘 3/4 광년 이동. 이틀 총합 (기약, 가분수 OK)?',
    prompt: '기약분수로 답해',
    hint: '공통분모 20. 14/20 + 15/20 = 29/20.',
    answer: { numerator: 29, denominator: 20 }, requireSimplified: true,
  },
  {
    id: 'adv-route-6', kind: 'fraction', difficulty: 3,
    scenario: '여정 11/12 광년 중 5/8 광년을 지나왔어. 남은 거리 (기약)?',
    prompt: '기약분수로 답해',
    hint: '공통분모 24. 22/24 − 15/24 = 7/24.',
    answer: { numerator: 7, denominator: 24 }, requireSimplified: true,
  },
  {
    id: 'adv-route-7', kind: 'fraction', difficulty: 3,
    scenario: '귀환 항로 — 0.75 광년 짜리 경로에서 3/8 광년을 이동. 남은 거리 (기약)?',
    prompt: '기약분수로 답해',
    hint: '0.75 = 3/4 = 6/8. 6/8 − 3/8 = 3/8.',
    answer: { numerator: 3, denominator: 8 }, requireSimplified: true,
  },
  {
    id: 'adv-route-8', kind: 'compare', difficulty: 3,
    scenario: '세 경로 중 가장 짧은 두 후보 — 경로 X: 5/8 광년, 경로 Y: 11/16 광년. 어느 쪽이 짧을까?',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '5/8 = 10/16.',
    left: { numerator: 5, denominator: 8 }, right: { numerator: 11, denominator: 16 }, correctOp: '<',
  },
  {
    id: 'adv-route-9', kind: 'fraction', difficulty: 3,
    scenario: '타우 세티 도착까지 4/5 광년. 그 중 1/3 광년을 워프로 단축. 남은 비워프 거리 (기약)?',
    prompt: '기약분수로 답해',
    hint: '공통분모 15. 12/15 − 5/15 = 7/15.',
    answer: { numerator: 7, denominator: 15 }, requireSimplified: true,
  },
  {
    id: 'adv-route-10', kind: 'fraction', difficulty: 3,
    scenario: '구조선은 3 갈래 경로를 동시에 분석 중. A: 1/4, B: 1/3, C: 5/12 광년. 셋의 합 (기약)?',
    prompt: '기약분수로 답해',
    hint: '공통분모 12. 3/12 + 4/12 + 5/12 = 12/12 = 1.',
    answer: { numerator: 1, denominator: 1 }, requireSimplified: true,
  },

  // === 우주 응용 — 시간/자원/속도 ===
  {
    id: 'adv-app-1', kind: 'fraction', difficulty: 3,
    scenario: '연료 셀 1번 0.45 L, 2번 1/3 L 를 합쳤어. 합 (기약)?',
    prompt: '기약분수로 답해',
    hint: '0.45 = 9/20. 공통분모 60. 27/60 + 20/60 = 47/60.',
    answer: { numerator: 47, denominator: 60 }, requireSimplified: true,
  },
  {
    id: 'adv-app-2', kind: 'compare', difficulty: 3,
    scenario: '두 명의 항해사가 같은 미션을 수행. 항해사 A는 미션의 5/8, 항해사 B는 0.65 를 완료. 누가 더 진행?',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '5/8 = 0.625.',
    left: { numerator: 5, denominator: 8 }, right: { decimal: 0.65 }, correctOp: '<',
  },
  {
    id: 'adv-app-3', kind: 'fraction', difficulty: 3,
    scenario: '산소 탱크의 7/12 이 차 있고, 새로 1/8 통을 채웠어. 총 양 (기약)?',
    prompt: '기약분수로 답해',
    hint: '공통분모 24. 14/24 + 3/24 = 17/24.',
    answer: { numerator: 17, denominator: 24 }, requireSimplified: true,
  },
  {
    id: 'adv-app-4', kind: 'multi', difficulty: 3,
    scenario: '암호 해독: 어떤 분수의 분자에서 5를 빼고 분모에 3을 더했더니 1/4 이 됐어. 원래 분수가 9/X 였다면 X 는?',
    prompt: '풀이 + 원래 분수의 기약',
    hint: '1/4 → 약분 전 (9-5)/X = 4/X. X = 16 → 분모 13. 원래 9/13.',
    workspacePlaceholder: '예: (9-5)/X = 1/4 → X = 16. X에서 3 빼면 원래 분모.',
    finalAnswer: { numerator: 9, denominator: 13 }, requireSimplified: true,
  },
  {
    // 이분모 범위 (1/4, 2/3 → 분모 다름)
    id: 'adv-app-5', kind: 'numeric', difficulty: 3,
    scenario: '구조 신호의 발신 거리는 1/4 광년 ~ 2/3 광년 사이로 잡혀. 우리 좌표 분모 12 의 자연수 발신 거리 □ 의 후보는 몇 개?',
    prompt: '가능한 자연수 □ 의 개수',
    hint: '1/4 = 3/12, 2/3 = 8/12. 분자 4, 5, 6, 7 → 4개.',
    answer: 4, unit: '개',
  },
  {
    id: 'adv-app-6', kind: 'compare', difficulty: 3,
    scenario: '두 행성의 자전 주기 — 행성 X 는 0.36 일, 행성 Y 는 9/25 일. 같을까 다를까?',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '9/25 = 36/100 = 0.36.',
    left: { decimal: 0.36 }, right: { numerator: 9, denominator: 25 }, correctOp: '=',
  },
  {
    id: 'adv-app-7', kind: 'fraction', difficulty: 3,
    scenario: '워프 1구간 5/8 광년, 2구간 7/12 광년 — 1구간이 더 짧다면 그 차이는? (기약)',
    prompt: '두 구간의 차를 기약분수로',
    hint: '5/8 = 15/24, 7/12 = 14/24. 차 = 1/24.',
    answer: { numerator: 1, denominator: 24 }, requireSimplified: true,
  },
  {
    id: 'adv-app-8', kind: 'numeric', difficulty: 3,
    scenario: '두 행성 사이 거리는 3/4 광년. 그 중 0.4 광년 지점에 정거장이 있어. 정거장에서 다음 행성까지 거리는 100분의 몇 광년? (정수 분자만 적어, 분모는 100)',
    prompt: '거리(분모 100)의 분자만 적어',
    hint: '3/4 = 0.75 = 75/100. 0.4 = 40/100. 차 = 35/100.',
    answer: 35, unit: '',
  },

  // === 최상급 난이도 — 3-step 응용 ===
  {
    id: 'adv-hard-1', kind: 'fraction', difficulty: 3,
    scenario: '연료 1통 중 어제 1/4, 오늘 5/12 를 사용했어. 남은 연료 (기약)?',
    prompt: '기약분수로 답해',
    hint: '공통분모 12. 12/12 − 3/12 − 5/12 = 4/12 = 1/3.',
    answer: { numerator: 1, denominator: 3 }, requireSimplified: true,
  },
  {
    id: 'adv-hard-2', kind: 'fraction', difficulty: 3,
    scenario: '귀환선이 0.8 광년을 가야 해. 이미 3/8 광년을 갔고, 어제 1/6 광년을 더 갔어. 남은 거리 (기약)?',
    prompt: '기약분수로 답해',
    hint: '0.8 = 4/5. 공통분모 120. 96/120 − 45/120 − 20/120 = 31/120.',
    answer: { numerator: 31, denominator: 120 }, requireSimplified: true,
  },
  {
    id: 'adv-hard-3', kind: 'compare', difficulty: 3,
    scenario: '두 항로 비교 — 항로 P: 3/8 + 1/4 광년, 항로 Q: 0.6 광년. 어느 쪽이 더 짧을까?',
    prompt: '두 항로 중 더 짧은 쪽 (= 이면 등호) 선택',
    hint: '3/8 + 1/4 = 3/8 + 2/8 = 5/8 = 0.625.',
    left: { numerator: 5, denominator: 8 }, right: { decimal: 0.6 }, correctOp: '>',
  },
  {
    id: 'adv-hard-4', kind: 'fraction', difficulty: 3,
    scenario: '식량 5/6 통 중 3/8 통은 우주식, 나머지는 비상식. 비상식의 양 (기약)?',
    prompt: '기약분수로 답해',
    hint: '공통분모 24. 20/24 − 9/24 = 11/24.',
    answer: { numerator: 11, denominator: 24 }, requireSimplified: true,
  },
  {
    id: 'adv-hard-5', kind: 'multi', difficulty: 3,
    scenario: '항법 해제: 어떤 분수에 0.25 를 더했더니 3/4 이 됐어. 원래 분수를 기약으로!',
    prompt: '풀이 + 기약 답',
    hint: '0.25 = 1/4. 3/4 − 1/4 = 2/4 = 1/2.',
    workspacePlaceholder: '예: 0.25 = 1/4. 3/4 − 1/4 = 2/4 = 1/2',
    finalAnswer: { numerator: 1, denominator: 2 }, requireSimplified: true,
  },
  {
    id: 'adv-hard-6', kind: 'multi', difficulty: 3,
    scenario: '귀환 코드: 어떤 분수의 분자에 5 를 더하고 분모를 2 배 했더니 7/12 이 됐어. 원래 분수를 기약으로!',
    prompt: '풀이 + 기약 답',
    hint: '(X분자 + 5) / (X분모 × 2) = 7/12. X분모 × 2 = 12 → X분모 = 6. X분자 + 5 = 7 → X분자 = 2. 2/6 → 약분 1/3.',
    workspacePlaceholder: '예: (X분자+5)/(X분모×2) = 7/12 → 분모 6, 분자 2 → 2/6 = 1/3',
    finalAnswer: { numerator: 1, denominator: 3 }, requireSimplified: true,
  },
  {
    // 이분모 범위 (3/8, 7/12 → 분모 다름)
    id: 'adv-hard-7', kind: 'numeric', difficulty: 3,
    scenario: '항해사가 잠입할 행성의 안전 구역은 3/8 광년 ~ 7/12 광년 사이. 우리 좌표 분모 24 의 자연수 잠입 좌표 □ 의 가능한 수는?',
    prompt: '가능한 자연수 □ 의 개수',
    hint: '3/8 = 9/24, 7/12 = 14/24. □ ∈ {10, 11, 12, 13} → 4개.',
    answer: 4, unit: '개',
  },
  {
    id: 'adv-hard-8', kind: 'fraction', difficulty: 3,
    scenario: '항해 일지 — 3일간 5/12, 1/3, 7/24 광년씩 이동. 총 이동 거리를 기약 가분수로!',
    prompt: '기약분수로 답해',
    hint: '공통분모 24. 10/24 + 8/24 + 7/24 = 25/24.',
    answer: { numerator: 25, denominator: 24 }, requireSimplified: true,
  },

  // === 소수 둘째자리 ↔ 분수 응용 (분수 다양화 — 새 분모 도입) ===
  {
    // 0.55 = 11/20 — 분수 다양화 (분모 20)
    id: 'adv-dec3-1', kind: 'fraction', difficulty: 3,
    scenario: '함선 외부 압력이 0.55 단위로 측정됐어. 같은 값을 분모 20 의 기약분수로 적어 인계 서류에 기록해.',
    prompt: '같은 값을 기약분수로',
    hint: '55/100 → ÷5 = 11/20.',
    answer: { numerator: 11, denominator: 20 }, requireSimplified: true,
  },
  {
    // 0.12 = 3/25 — 새 분모 25
    id: 'adv-dec3-2', kind: 'fraction', difficulty: 3,
    scenario: '실험실 농도 미터가 0.12 를 가리켜. 분모 25 의 기약분수로 보고서에 적어줘.',
    prompt: '같은 값을 기약분수로',
    hint: '12/100 → ÷4 = 3/25.',
    answer: { numerator: 3, denominator: 25 }, requireSimplified: true,
  },
  {
    // 0.95 = 19/20
    id: 'adv-dec3-3', kind: 'fraction', difficulty: 3,
    scenario: '비상 전력 충전률이 0.95 까지 도달했어. 분모 20 의 기약분수로 메인 컴퓨터에 등록!',
    prompt: '같은 값을 기약분수로',
    hint: '95/100 → ÷5 = 19/20.',
    answer: { numerator: 19, denominator: 20 }, requireSimplified: true,
  },
  {
    // 분수+소수 차 응용 (새 분수 11/16)
    id: 'adv-dec3-4', kind: 'fraction', difficulty: 3,
    scenario: '메인 산소통이 11/16 채워져 있었는데, 응급 보충 0.25 통을 추가했어. 산소통의 현재 양을 기약분수로!',
    prompt: '기약분수로 답해',
    hint: '0.25 = 1/4 = 4/16. 11/16 + 4/16 = 15/16.',
    answer: { numerator: 15, denominator: 16 }, requireSimplified: true,
  },
  {
    // 분수 차 — 새 분수 13/18
    id: 'adv-dec3-5', kind: 'fraction', difficulty: 3,
    scenario: '냉각수가 13/18 만큼 있었어. 그 중 0.4 만큼이 증발. 남은 냉각수를 기약분수로!',
    prompt: '기약분수로 답해',
    hint: '0.4 = 2/5. 공통분모 90. 65/90 − 36/90 = 29/90.',
    answer: { numerator: 29, denominator: 90 }, requireSimplified: true,
  },
  {
    // 분수 vs 소수 비교 — 새 분수 7/16
    id: 'adv-dec3-6', kind: 'compare', difficulty: 3,
    scenario: '두 우주선 속도 비교 — 우리 선박은 7/16 광속, 적 선박은 0.5 광속이야. 누가 더 빠른가?',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '7/16 = 0.4375.',
    left: { numerator: 7, denominator: 16 }, right: { decimal: 0.5 }, correctOp: '<',
  },
  {
    // 분수 vs 소수 비교 — 새 분수 13/25
    id: 'adv-dec3-7', kind: 'compare', difficulty: 3,
    scenario: '두 행성의 자전 속도 — 행성 X 는 13/25, 행성 Y 는 0.52. 두 행성의 속도는 같을까?',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '13/25 = 52/100 = 0.52.',
    left: { numerator: 13, denominator: 25 }, right: { decimal: 0.52 }, correctOp: '=',
  },
  {
    // 이분모 범위 — 새 분모 36 / 분수 다양화
    id: 'adv-dec3-8', kind: 'numeric', difficulty: 3,
    scenario: '워프 안전 범위는 1/4 광년 ~ 5/9 광년. 분모 36 자연수 워프 좌표 □ 의 가능한 수는?',
    prompt: '가능한 자연수 □ 의 개수',
    hint: '1/4 = 9/36, 5/9 = 20/36. □ ∈ {10...19} → 10개.',
    answer: 10, unit: '개',
  },
  {
    // 이분모 범위 — 새 분모 40 / 소수 + 분수 bounds
    id: 'adv-dec3-9', kind: 'numeric', difficulty: 3,
    scenario: '비상 출력 안전 범위는 0.2 단계 ~ 7/10 단계. 분모 40 의 자연수 출력 □ 가 안전 구간에 들어가는 경우는?',
    prompt: '가능한 자연수 □ 의 개수',
    hint: '0.2 = 8/40, 7/10 = 28/40. □ ∈ {9...27} → 19개.',
    answer: 19, unit: '개',
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
