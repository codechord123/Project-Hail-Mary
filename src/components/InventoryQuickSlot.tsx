import { useGameStore } from '@/store/gameStore'
import { ITEMS, type ItemId } from '@/data/items'

type ItemEffect = (id: ItemId) => void

interface Props {
  /** 챕터 내 아이템 효과 매핑 */
  onUseOxygen?: () => void
  onUseBomb?: () => void
  onUseMagnet?: () => void
  onUseShield?: () => void
  onUseTimeFreeze?: () => void
  onUseSimplifyAid?: () => void
  /** shield 활성 여부 표시 */
  shieldActive?: boolean
  /** simplify-aid 활성 여부 표시 */
  simplifyAidActive?: boolean
}

export function InventoryQuickSlot(props: Props) {
  const store = useGameStore()

  const handlers: Record<ItemId, () => void> = {
    'oxygen-pack': () => {
      if (store.useItem('oxygen-pack')) {
        store.addOxygen(25)
        props.onUseOxygen?.()
      }
    },
    'time-freeze': () => {
      if (store.useItem('time-freeze')) props.onUseTimeFreeze?.()
    },
    'simplify-aid': () => {
      if (store.useItem('simplify-aid')) props.onUseSimplifyAid?.()
    },
    bomb: () => {
      if (store.useItem('bomb')) props.onUseBomb?.()
    },
    magnet: () => {
      if (store.useItem('magnet')) props.onUseMagnet?.()
    },
    shield: () => {
      if (store.useItem('shield')) props.onUseShield?.()
    },
  }

  const enabled: Record<ItemId, boolean> = {
    'oxygen-pack': !!props.onUseOxygen,
    'time-freeze': !!props.onUseTimeFreeze,
    'simplify-aid': !!props.onUseSimplifyAid && !props.simplifyAidActive,
    bomb: !!props.onUseBomb,
    magnet: !!props.onUseMagnet,
    shield: !!props.onUseShield && !props.shieldActive,
  }

  const ids: ItemId[] = ['oxygen-pack', 'bomb', 'magnet', 'shield', 'time-freeze', 'simplify-aid']

  return (
    <div className="flex flex-wrap gap-1.5 text-xs">
      {ids.map((id) => {
        const qty = store.items[id] ?? 0
        const item = ITEMS[id]
        const disabled = qty < 1 || !enabled[id]
        const isActive =
          (id === 'shield' && props.shieldActive) || (id === 'simplify-aid' && props.simplifyAidActive)
        return (
          <button
            key={id}
            onClick={handlers[id]}
            disabled={disabled}
            title={`${item.name} — ${item.description}`}
            className={`px-2 py-1 rounded border text-white/80 disabled:opacity-30 ${
              isActive
                ? 'border-emerald-400 bg-emerald-500/30'
                : 'border-white/20 bg-white/10 hover:bg-white/20'
            }`}
          >
            {item.icon} ×{qty}
            {isActive && ' ✓'}
          </button>
        )
      })}
    </div>
  )
}

export type { ItemEffect }
