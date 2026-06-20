import type { Problem } from '@/types/problem'

/**
 * 챕터 3 — 「미지의 신호」 (이분모 응용 종합)
 * 5학년 1학기 4단원 심화 패턴 — 이분모 덧·뺄셈, 분수↔소수 변환, 비교, 다단계 역산.
 * 모든 문제는 통분 또는 소수↔분수 변환이 핵심.
 */
export const chapter3Problems: Problem[] = [
  {
    id: 'c3-1', // 이분모 덧셈 응용 (C 공통인수, 약분 X)
    kind: 'fraction',
    scenario:
      '로키의 산소가 5/12 통, 우리 산소가 3/8 통이야. 두 통을 합치면 (기약)?',
    prompt: '기약분수로 답해',
    hint: '공통분모 24. 10/24 + 9/24.',
    difficulty: 2,
    answer: { numerator: 19, denominator: 24 },
    requireSimplified: true,
  },
  {
    id: 'c3-2', // 소수 둘째자리 → 분수 변환
    kind: 'fraction',
    scenario:
      '로키의 계측기는 0.36 을 가리키고 있어. 같은 값을 기약분수로 적어줘.',
    prompt: '같은 값을 기약분수로',
    hint: '0.36 = 36/100 → ÷4.',
    difficulty: 2,
    answer: { numerator: 9, denominator: 25 },
    requireSimplified: true,
  },
  {
    id: 'c3-3', // 이분모 뺄셈 응용 (C 공통인수)
    kind: 'fraction',
    scenario:
      '연료 11/12 통에서 5/8 통을 사용했어. 남은 양 (기약)?',
    prompt: '기약분수로 답해',
    hint: '공통분모 24. 22/24 − 15/24.',
    difficulty: 3,
    answer: { numerator: 7, denominator: 24 },
    requireSimplified: true,
  },
  {
    id: 'c3-4', // 다단계 역산 (이분모)
    kind: 'multi',
    scenario:
      '항법 모듈 잠금: 어떤 분수의 분자에 4를 더하고 결과를 6으로 약분했더니 3/4가 됐어. 원래 분수를 기약분수로!',
    prompt: '풀이 + 기약 답',
    hint: '6으로 약분해서 3/4 → 약분 전 18/24. 분자 −4 = 14 → 14/24 → ÷2.',
    difficulty: 3,
    workspacePlaceholder: '여기에 풀이 과정을 적어 보세요 (선택)',
    finalAnswer: { numerator: 7, denominator: 12 },
    requireSimplified: true,
  },
  {
    id: 'c3-5', // 분수 vs 소수 비교
    kind: 'compare',
    scenario:
      '두 측정값을 비교해. 우리 센서는 7/20, 로키의 센서는 0.4 야.',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '7/20 = 0.35.',
    difficulty: 2,
    left: { numerator: 7, denominator: 20 },
    right: { decimal: 0.4 },
    correctOp: '<',
  },
  {
    id: 'c3-6', // 두 분수 비교 (이분모)
    kind: 'compare',
    scenario:
      '두 신호 강도를 비교해.',
    prompt: '더 큰 쪽 (= 이면 등호) 선택',
    hint: '공통분모 24. 15/24 vs 14/24.',
    difficulty: 2,
    left: { numerator: 5, denominator: 8 },
    right: { numerator: 7, denominator: 12 },
    correctOp: '>',
  },
  {
    id: 'c3-7', // 소수+분수 자연수 카운트 (이분모 응용)
    kind: 'numeric',
    scenario:
      '0.4 보다 크고 7/10 보다 작은 분수 중에서, 분모가 20인 진분수는 모두 몇 개일까?',
    prompt: '식: 0.4 < □/20 < 7/10 — 자연수 □ 의 개수',
    hint: '0.4 = 8/20, 7/10 = 14/20.',
    difficulty: 3,
    answer: 5,
    unit: '개',
  },
  {
    id: 'c3-8', // 소수 + 분수 혼합 합 (이분모 응용)
    kind: 'fraction',
    scenario:
      '귀환 좌표 — 신호 0.25 와 5/12 를 합한 값을 기약분수로!',
    prompt: '기약분수로 답해',
    hint: '0.25 = 1/4 = 3/12. 3/12 + 5/12.',
    difficulty: 3,
    answer: { numerator: 2, denominator: 3 },
    requireSimplified: true,
  },
]

// 보스 설정
export const CHAPTER3_BOSS = {
  name: '아스트로파지 정찰병',
  maxHp: chapter3Problems.length * 20, // 정답 1개당 평균 데미지 20 = 정확히 모든 정답으로 처치
}
