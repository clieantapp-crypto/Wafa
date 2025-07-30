"use client"

import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function OrderSummary() {
  const { items, totalPrice } = useCart()
  const shippingCost = 2.0 // Example shipping cost

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>ملخص الطلب</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">{(item.price * item.quantity).toFixed(2)} دينار</p>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-600">المجموع الفرعي</p>
            <p className="font-medium">{totalPrice.toFixed(2)} دينار</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">الشحن</p>
            <p className="font-medium">{shippingCost.toFixed(2)} دينار</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <p>المجموع الكلي</p>
          <p>{(totalPrice + shippingCost).toFixed(2)} دينار</p>
        </div>
      </CardContent>
    </Card>
  )
}
