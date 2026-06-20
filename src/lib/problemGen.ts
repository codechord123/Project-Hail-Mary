import type { Problem } from '@/types/problem'
import { addFractions, subtractFractions, gcd, simplify } from './fractionMath'

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

let idSeq = 0
const nextId = () => `g-${++idSeq}`

/** 작은 분모 풀 — 7, 9, 15 추가로 서로소·공통인수 패턴 다양화 */
const EASY_DENOMS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15]
const pickTwoDenoms = (difficulty: number): [number, number] => {
  const pool = EASY_DENOMS.slice(0, Math.min(EASY_DENOMS.length, 4 + difficulty))
  const d1 = pool[rand(0, pool.length - 1)]
  let d2 = pool[rand(0, pool.length - 1)]
  let guard = 0
  while (d2 === d1 && guard++ < 20) d2 = pool[rand(0, pool.length - 1)]
  if (d2 === d1) d2 = d1 === 2 ? 3 : 2
  return [d1, d2]
}

/** 세 분수 합 생성기 — 세 분모 통분 연습 */
export const genThreeAdd = (difficulty: number): Problem => {
  const [d1, d2] = pickTwoDenoms(difficulty)
  const pool = EASY_DENOMS.slice(0, Math.min(EASY_DENOMS.length, 4 + difficulty))
  let d3 = pool[rand(0, pool.length - 1)]
  let guard = 0
  while ((d3 === d1 || d3 === d2) && guard++ < 20) d3 = pool[rand(0, pool.length - 1)]
  if (d3 === d1 || d3 === d2) d3 = d1 + d2
  const a = { numerator: rand(1, d1 - 1), denominator: d1 }
  const b = { numerator: rand(1, d2 - 1), denominator: d2 }
  const c = { numerator: rand(1, d3 - 1), denominator: d3 }
  const ab = addFractions(a, b)
  const abc = addFractions(ab, c)
  const ans = simplify(abc)
  return {
    id: nextId(), kind: 'fraction', difficulty: 3,
    scenario: `세 분수 합: ${a.numerator}/${a.denominator} + ${b.numerator}/${b.denominator} + ${c.numerator}/${c.denominator}`,
    prompt: '통분 후 기약분수 (가분수 OK)',
    hint: '세 분모의 공통분모(LCM)를 먼저 찾아.',
    answer: ans, requireSimplified: true,
  }
}

// genSameDenAdd / genSameDenSub 는 이름을 유지하되 통분(이분모) 문제를 생성한다.
export const genSameDenAdd = (difficulty: number): Problem => {
  const [d1, d2] = pickTwoDenoms(difficulty)
  const a = { numerator: rand(1, d1 - 1), denominator: d1 }
  const b = { numerator: rand(1, d2 - 1), denominator: d2 }
  const ans = simplify(addFractions(a, b))
  return {
    id: nextId(), kind: 'fraction', difficulty: 2,
    scenario: `통분 덧셈: ${a.numerator}/${a.denominator} + ${b.numerator}/${b.denominator} = ?`,
    prompt: '통분 후 기약분수로 답해',
    hint: `공통분모를 찾아 통분한 뒤 더해.`,
    answer: ans, requireSimplified: true,
  }
}

export const genSameDenSub = (difficulty: number): Problem => {
  let a = { numerator: 0, denominator: 1 }
  let b = { numerator: 0, denominator: 1 }
  let sub = { numerator: -1, denominator: 1 }
  let guard = 0
  do {
    const [d1, d2] = pickTwoDenoms(difficulty)
    a = { numerator: rand(1, d1 - 1), denominator: d1 }
    b = { numerator: rand(1, d2 - 1), denominator: d2 }
    sub = subtractFractions(a, b)
  } while (sub.numerator <= 0 && guard++ < 20)
  if (sub.numerator <= 0) {
    a = { numerator: 2, denominator: 3 }
    b = { numerator: 1, denominator: 4 }
    sub = subtractFractions(a, b)
  }
  const ans = simplify(sub)
  return {
    id: nextId(), kind: 'fraction', difficulty: 2,
    scenario: `통분 뺄셈: ${a.numerator}/${a.denominator} − ${b.numerator}/${b.denominator} = ?`,
    prompt: '통분 후 기약분수로 답해',
    hint: `공통분모로 통분한 뒤 빼.`,
    answer: ans, requireSimplified: true,
  }
}

export const genDiffDenAdd = (difficulty: number): Problem => {
  const d1 = rand(2, 3 + Math.floor(difficulty / 2))
  let d2 = rand(2, 4 + Math.floor(difficulty / 2))
  while (d2 === d1 || gcd(d1, d2) > 1) d2 = rand(2, 6 + difficulty)
  const a = { numerator: rand(1, d1 - 1), denominator: d1 }
  const b = { numerator: rand(1, d2 - 1), denominator: d2 }
  const ans = simplify(addFractions(a, b))
  return {
    id: nextId(), kind: 'fraction', difficulty: 2,
    scenario: `다른 분모 덧셈: ${a.numerator}/${a.denominator} + ${b.numerator}/${b.denominator}`,
    prompt: '기약분수로',
    hint: '통분 먼저.',
    answer: ans, requireSimplified: true,
  }
}

export const genDiffDenSub = (difficulty: number): Problem => {
  const d1 = rand(3, 4 + Math.floor(difficulty / 2))
  let d2 = rand(2, 3 + Math.floor(difficulty / 2))
  while (d2 === d1) d2 = rand(2, 5 + difficulty)
  const a = { numerator: rand(2, d1 - 1), denominator: d1 }
  const b = { numerator: 1, denominator: d2 }
  const sub = subtractFractions(a, b)
  if (sub.numerator <= 0) return genDiffDenAdd(difficulty)
  const ans = simplify(sub)
  return {
    id: nextId(), kind: 'fraction', difficulty: 2,
    scenario: `다른 분모 뺄셈: ${a.numerator}/${a.denominator} − ${b.numerator}/${b.denominator}`,
    prompt: '기약분수로',
    hint: '통분 후 빼.',
    answer: ans, requireSimplified: true,
  }
}

export const genCompare = (_difficulty: number): Problem => {
  const d1 = rand(3, 8)
  const d2 = rand(3, 8)
  const n1 = rand(1, d1 - 1)
  const n2 = rand(1, d2 - 1)
  const v1 = n1 / d1
  const v2 = n2 / d2
  const correctOp: '>' | '<' | '=' = Math.abs(v1 - v2) < 1e-9 ? '=' : v1 > v2 ? '>' : '<'
  return {
    id: nextId(), kind: 'compare', difficulty: 1,
    scenario: '크기 비교!',
    prompt: `${n1}/${d1} ?? ${n2}/${d2}`,
    hint: '통분 또는 소수 변환.',
    left: { numerator: n1, denominator: d1 },
    right: { numerator: n2, denominator: d2 },
    correctOp,
  }
}

export const genNumericNatCount = (_difficulty: number): Problem => {
  // X/N < □/M < Y/N 같은 형태
  const d = rand(8, 14)
  const lo = rand(2, Math.floor(d / 2))
  const hi = rand(lo + 2, d - 1)
  return {
    id: nextId(), kind: 'numeric', difficulty: 2,
    scenario: '범위 안의 자연수 개수를 세어.',
    prompt: `${lo}/${d} < □/${d} < ${hi}/${d}을 만족하는 자연수 □는 몇 개?`,
    hint: `${lo + 1}부터 ${hi - 1}까지.`,
    answer: hi - lo - 1, unit: '개',
  }
}

import { ADVANCED_PROBLEMS } from '@/data/advancedPool'

const ALL_GENS = [genSameDenAdd, genSameDenSub, genDiffDenAdd, genDiffDenSub, genCompare, genNumericNatCount, genThreeAdd]

export const genRandom = (difficulty: number): Problem => {
  // 일정 확률로 사전 응용 문제 풀에서 픽 (난이도 ↑)
  if (difficulty >= 1 && Math.random() < 0.3) {
    const adv = ADVANCED_PROBLEMS[Math.floor(Math.random() * ADVANCED_PROBLEMS.length)]
    return { ...adv, id: `${adv.id}-${nextId()}` }
  }
  const g = ALL_GENS[Math.floor(Math.random() * ALL_GENS.length)]
  return g(difficulty)
}
