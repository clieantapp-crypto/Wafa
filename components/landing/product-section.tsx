"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"
import { useCart } from "@/contexts/cart-context"

const products = [
  {
    id: "prod_01",
    name: "مياه الواحة النقية",
    description: "عبوة 500 مل",
    price: 2.5,
    image: "/product-1.png",
  },
  {
    id: "prod_02",
    name: "نجمة الصحراء الفوارة",
    description: "عبوة 750 مل",
    price: 3.75,
    image: "/product-2.png",
  },
  {
    id: "prod_03",
    name: "كنز العائلة",
    description: "عبوة 5 لتر",
    price: 7.0,
    image: "/product-3.png",
  },
]

export function ProductSection() {
  const { addToCart } = useCart()

  return (
    <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <AnimateOnScroll className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">تشكيلتنا الفاخرة</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              اكتشف مجموعتنا من عبوات المياه الفاخرة، المثالية لكل مناسبة.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
          {products.map((product, index) => (
            <AnimateOnScroll key={product.id} delay={`${(index + 1) * 100}ms`}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-0">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    width="400"
                    height="400"
                    alt={product.name}
                    className="aspect-square object-cover"
                  />
                  <div className="p-4 grid gap-2">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.description}</p>
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
          ))}
        </div>
      </div>
    </section>
  )
}
