import { NextResponse } from "next/server"
import { createOrder } from "@/lib/firebase/orders"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { cart, total, shippingInfo, userId } = body

    // Basic validation
    if (!cart || !total || !shippingInfo || !userId) {
      return NextResponse.json({ message: "بيانات الطلب غير مكتملة." }, { status: 400 })
    }

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create order in Firestore
    const orderId = await createOrder({
      userId,
      items: cart,
      total,
      shippingInfo,
      status: "pending",
    })

    console.log("Order created successfully:", { orderId, total, customer: shippingInfo.fullName })

    return NextResponse.json({ success: true, orderId: orderId })
  } catch (error) {
    console.error("Checkout API error:", error)
    return NextResponse.json({ message: "حدث خطأ أثناء معالجة الطلب." }, { status: 500 })
  }
}
