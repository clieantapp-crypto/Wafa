import { collection, addDoc, query, where, orderBy, getDocs, doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import type { CartItem } from "@/contexts/cart-context"

export interface Order {
  id?: string
  userId: string
  items: CartItem[]
  total: number
  shippingInfo: {
    fullName: string
    address: string
    city: string
    country: string
    phone: string
  }
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  updatedAt: string
}

export async function createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<string> {
  try {
    const now = new Date().toISOString()
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: now,
      updatedAt: now,
    })
    return docRef.id
  } catch (error) {
    console.error("Error creating order:", error)
    throw new Error("فشل في إنشاء الطلب")
  }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const q = query(collection(db, "orders"), where("userId", "==", userId), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    const orders: Order[] = []
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
      } as Order)
    })

    return orders
  } catch (error) {
    console.error("Error fetching user orders:", error)
    throw new Error("فشل في جلب الطلبات")
  }
}

export async function updateOrderStatus(orderId: string, status: Order["status"]): Promise<void> {
  try {
    const orderRef = doc(db, "orders", orderId)
    await updateDoc(orderRef, {
      status,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error updating order status:", error)
    throw new Error("فشل في تحديث حالة الطلب")
  }
}
