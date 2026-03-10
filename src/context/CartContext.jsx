import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'cake-junction-cart-v1'

const getInitialCart = () => {
  if (typeof window === 'undefined') return []
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const buildItemKey = (item) => {
  const optionsKey = item.options ? JSON.stringify(item.options) : ''
  return `${item.id}::${optionsKey}`
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getInitialCart)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items])

  const addItem = (item) => {
    setItems((prev) => {
      const parsedQuantity = Number(item.quantity)
      const quantity = Number.isFinite(parsedQuantity) && parsedQuantity > 0 ? parsedQuantity : 1
      const key = buildItemKey(item)
      const existingIndex = prev.findIndex((entry) => entry.key === key)
      if (existingIndex >= 0) {
        const updated = [...prev]
        const existing = updated[existingIndex]
        updated[existingIndex] = {
          ...existing,
          quantity: existing.quantity + quantity,
        }
        return updated
      }
      return [...prev, { ...item, quantity, key }]
    })
  }

  const removeItem = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key))
  }

  const updateQuantity = (key, nextQuantity) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.key !== key) return item
        const safeQuantity = Math.max(1, Number(nextQuantity) || 1)
        return { ...item, quantity: safeQuantity }
      })
    )
  }

  const clearCart = () => setItems([])

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        if (typeof item.unitPrice !== 'number') return sum
        return sum + item.unitPrice * item.quantity
      }, 0),
    [items]
  )

  const unpricedCount = useMemo(
    () => items.filter((item) => typeof item.unitPrice !== 'number').length,
    [items]
  )

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    unpricedCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
