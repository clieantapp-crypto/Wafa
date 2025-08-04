"use client"
import { createContext, useState, useContext, useMemo, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  const addToCart = (itemToAdd: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id)
      if (existingItem) {
        return prevItems.map((item) => (item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }]
    })
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `${itemToAdd.name} أُضيف إلى عربة التسوق.`,
    })
  }

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }, [items])

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [items])

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
