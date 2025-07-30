"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, ShoppingCart } from "lucide-react"

export function CartSheet() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart()

  return (
    <SheetContent className="flex flex-col">
      <SheetHeader>
        <SheetTitle>عربة التسوق ({totalItems})</SheetTitle>
      </SheetHeader>
      {items.length > 0 ? (
        <>
          <ScrollArea className="flex-1 pr-4 -mr-4">
            <div className="flex flex-col gap-4 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    width={64}
                    height={64}
                    alt={item.name}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.price.toFixed(2)} دينار</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value, 10))}
                      className="w-16 h-8 text-center"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="mt-auto">
            <div className="w-full space-y-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>المجموع الكلي</span>
                <span>{totalPrice.toFixed(2)} دينار</span>
              </div>
              <SheetClose asChild>
                <Link href="/checkout" passHref>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    المتابعة إلى الدفع
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium">عربة التسوق فارغة</h3>
          <p className="mt-1 text-sm text-gray-500">ابدأ بإضافة بعض المنتجات لراوي عطشك.</p>
        </div>
      )}
    </SheetContent>
  )
}
