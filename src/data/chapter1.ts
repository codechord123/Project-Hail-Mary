import type { Fraction } from '@/types/fraction'
import type { SceneThemeId } from '@/components/manipulation/themes'

export interface FractionProblem {
  id: string
  story: string
  a: Fraction
  b: Fraction
  operation: 'add'
  requireSimplified: boolean
  hint: string
  scene: SceneThemeId
}

export const chapter1Problems: FractionProblem[] = [
  {
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
