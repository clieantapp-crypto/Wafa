import { useCart } from "@/contexts/cart-context"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Truck, Tag } from 'lucide-react'

export function OrderSummary() {
  const { items, totalPrice } = useCart()
  const shippingCost = 5.00
  const tax = totalPrice * 0.16 // 16% tax
  const finalTotal = totalPrice + shippingCost + tax

  return (
    <div className="space-y-4">
      {/* Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <div className="w-12 h-12 bg-slate-200 rounded-md flex items-center justify-center">
              <span className="text-xs font-medium">{item.quantity}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{item.name}</h4>
              <p className="text-xs text-slate-500">{item.price.toFixed(2)} دينار</p>
            </div>
            <div className="text-sm font-medium">
              {(item.price * item.quantity).toFixed(2)} د.أ
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Pricing Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">المجموع الفرعي</span>
          <span>{totalPrice.toFixed(2)} د.أ</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-600">
            <Truck className="h-4 w-4" />
            الشحن
          </span>
          <span>{shippingCost.toFixed(2)} د.أ</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-600">
            <Tag className="h-4 w-4" />
            الضريبة (16%)
          </span>
          <span>{tax.toFixed(2)} د.أ</span>
        </div>
      </div>

      <Separator />

      {/* Total */}
      <div className="flex justify-between items-center text-lg font-bold">
        <span>المجموع الكلي</span>
        <span className="text-primary">{finalTotal.toFixed(2)} د.أ</span>
      </div>

      {/* Shipping Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
        <div className="flex items-center gap-2 text-green-700">
          <Truck className="h-4 w-4" />
          <span className="text-sm font-medium">شحن مجاني للطلبات أكثر من 50 دينار</span>
        </div>
      </div>
    </div>
  )
}
  