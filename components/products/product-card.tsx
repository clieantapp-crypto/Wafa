"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/data/products"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"

interface ProductCardProps {
  product: Product
  delay?: string
}

export function ProductCard({ product, delay }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <AnimateOnScroll delay={delay}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="relative aspect-square w-full">
            <Image src={product.image || "/placeholder.svg"} fill alt={product.name} className="object-cover" />
          </div>
          <div className="p-4 grid gap-2 flex-grow">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
          </div>
          <div className="p-4 pt-0 mt-auto">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold text-primary">{product.price.toFixed(2)} دينار</h4>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => addToCart(product)}
              >
                أضف للسلة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimateOnScroll>
  )
}
