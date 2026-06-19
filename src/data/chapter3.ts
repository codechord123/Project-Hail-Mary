import type { Problem } from '@/types/problem'

/**
 * 챕터 3 — 「미지의 신호」 (약분과 통분 심화)
 * 5학년 1학기 4단원 심화2 문제집 패턴에서 모티프를 가져와 우주 서사로 재구성.
 * 학생이 약분/통분에 능통하다고 가정한 응용 문항.
 */
export const chapter3Problems: Problem[] = [
  {
    id: 'c3-1',
    kind: 'fraction',
    scenario:
      '로키의 산소 농도계는 눈금이 12개, 우리 계측기는 눈금이 4개야. 로키의 계측기가 3눈금을 가리키고 있을 때, 같은 농도를 우리 계측기로 표시하면 분자가 얼마일까?',
    prompt: '3/12 와 크기가 같은, 분모가 4인 분수를 적어줘.',
    hint: '분자와 분모를 같은 수로 나눠봐.',
    difficulty: 1,
    answer: { numerator: 1, denominator: 4 },
    requireSimplified: true,
  },
  {
    id: 'c3-2',
    kind: 'mcq',
    scenario:
      '로키가 다섯 개의 신호를 보냈는데, 분수의 크기가 모두 같아 보여. 정말 같은 게 어느 것들일까?',
    prompt: '아래 중 2/3과 크기가 같은 분수를 모두 골라.',
    hint: '분자·분모에 같은 수를 곱했는지 확인해봐.',
    difficulty: 2,
    multiple: true,
    choices: ['4/6', '6/9', '5/8', '8/12', '10/14'],
    correctIndexes: [0, 1, 3],
  },
  {
    id: 'c3-3',
    kind: 'numeric',
    scenario:
      '비상 신호의 분자에 6을 더했더니 우주선 시스템이 분수의 크기가 변하지 않았다고 응답했어. 원래 분수가 2/5일 때, 분모에는 얼마를 더해야 했을까?',
    prompt: '분모에 더해야 할 수는?',
    hint: '분자가 2 → 8로 4배가 됐어. 분모는?',
    difficulty: 2,
    answer: 15,
    unit: '',
  },
  {
    id: 'c3-4',
    kind: 'multi',
    scenario:
      '항법 모듈이 손상됐어. 어떤 분수의 분자에 4를 더하고, 결과를 8로 약분했더니 3/4가 됐대. 원래 분수를 기약분수로 알려줘.',
    prompt: '풀이 과정을 적고, 답을 기약분수로 입력해.',
    hint: '8로 약분해서 3/4 → 약분 전 분수는 6/8 (또는 동치). 거기서 분자 -4 = 2, 분모 그대로 8.',
    difficulty: 3,
    workspacePlaceholder: '예: 8로 약분 → 3/4 = 6/8, 분자 -4 = 2 → 원래 분수 2/8',
    finalAnswer: { numerator: 1, denominator: 4 },
    requireSimplified: true,
  },
  {
    id: 'c3-5',
    kind: 'mcq',
    scenario:
      '로키가 보낸 분수 3/4와 5/6을 통분하려고 해. 우주선 계산기는 후보 중에서 골라야 한다는데, 공통분모가 될 수 있는 건 몇 개일까?',
    prompt: '후보 [12, 24, 36, 48, 72, 80] 중 3/4와 5/6의 공통분모가 될 수 있는 건 몇 개?',
    hint: '공통분모는 두 분모(4, 6)의 공배수여야 해.',
    difficulty: 2,
    multiple: false,
    choices: ['1개', '2개', '3개', '4개', '5개'],
    correctIndexes: [4], // 12·24·36·48·72 = 5개 (80 제외)
  },
  {
    id: 'c3-6',
    kind: 'compare',
    scenario:
      '동력실에서 두 측정값이 도착했어. 우리 센서는 4/5, 로키의 센서는 0.7을 가리켜. 어느 쪽이 더 큰지 비교해줘.',
    prompt: '4/5와 0.7 비교',
    hint: '4/5를 소수로 바꾸면 0.8. 0.7과 비교해봐.',
    difficulty: 2,
    left: { numerator: 4, denominator: 5 },
    right: { decimal: 0.7 },
    correctOp: '>',
  },
  {
    id: 'c3-7',
    kind: 'numeric',
    scenario:
      '0.5보다 크고 4/5보다 작은 자연수 분자 □을 분모 10에 넣으려고 해. □/10 (단, □는 자연수)에 들어갈 수 있는 자연수는 모두 몇 개일까?',
    prompt: '0.5 < □/10 < 4/5 를 만족하는 자연수 □의 개수',
    hint: '0.5 = 5/10, 4/5 = 8/10. 그 사이의 자연수 분자는?',
    difficulty: 3,
    answer: 2,
    unit: '개',
  },
  {
    id: 'c3-8',
    kind: 'numeric',
    scenario:
      '귀환 좌표를 풀려면 분모가 10인 진분수 중에서 기약분수가 몇 개인지 알아야 해. 로키, 도와줘!',
    prompt: '분모가 10인 진분수 중 기약분수는 몇 개?',
    hint: '1/10, 2/10, ..., 9/10 중 약분되지 않는 것만 세어봐.',
    difficulty: 2,
    answer: 4,
    unit: '개',
  },
]

// 보스 설정
export const CHAPTER3_BOSS = {
  name: '아스트로파지 정찰병',
  maxHp: chapter3Problems.length * 20, // 정답 1개당 평균 데미지 20 = 정확히 모든 정답으로 처치
}
