import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface GameState {
  oxygen: number
  energy: number
  bond: number
  clearedChapters: number[]
  addOxygen: (delta: number) => void
  addEnergy: (delta: number) => void
  addBond: (delta: number) => void
  resetResources: () => void
  clearChapter: (chapter: number) => void
  reset: () => void
}

const INITIAL = { oxygen: 100, energy: 0, bond: 0, clearedChapters: [] as number[] }

const safeStorage = createJSONStorage(() => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage
    }
  } catch {
    /* localStorage 비활성 — 인메모리 fallback */
  }
  let mem: Record<string, string> = {}
  return {
    getItem: (k: string) => mem[k] ?? null,
    setItem: (k: string, v: string) => {
      mem[k] = v
    },
    removeItem: (k: string) => {
      delete mem[k]
    },
  }
})

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...INITIAL,
      addOxygen: (delta) =>
        set((s) => ({ oxygen: Math.max(0, Math.min(100, s.oxygen + delta)) })),
      addEnergy: (delta) => set((s) => ({ energy: Math.max(0, s.energy + delta) })),
      addBond: (delta) => set((s) => ({ bond: Math.max(0, s.bond + delta) })),
      resetResources: () => set({ oxygen: 100, energy: 0 }),
      clearChapter: (chapter) =>
        set((s) => ({
          clearedChapters: s.clearedChapters.includes(chapter)
            ? s.clearedChapters
            : [...s.clearedChapters, chapter],
        })),
      reset: () => set(INITIAL),
    }),
    { name: 'hailmary-save-v1', storage: safeStorage },
  ),
)
