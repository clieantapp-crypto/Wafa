"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropletsIcon, ShoppingCartIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart/cart-sheet"
import { useCart } from "@/contexts/cart-context"

export function Header() {
  const { totalItems } = useCart()

  return (
    <Sheet>
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <DropletsIcon className="h-6 w-6 text-primary" />
          <span className="mr-3 text-xl font-bold text-primary">لوجو</span>
        </Link>
        <nav className="mr-auto hidden lg:flex gap-6">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-700 hover:text-primary hover:underline underline-offset-4 transition-colors"
            prefetch={false}
          >
            منتجاتنا
          </Link>
          <Link
            href="/#story"
            className="text-sm font-medium text-gray-700 hover:text-primary hover:underline underline-offset-4 transition-colors"
            prefetch={false}
          >
            قصتنا
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium text-gray-700 hover:text-primary hover:underline underline-offset-4 transition-colors"
            prefetch={false}
          >
            تواصل معنا
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCartIcon className="h-5 w-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">عربة التسوق</span>
            </Button>
          </SheetTrigger>
          <Link href="/checkout" passHref>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground hidden sm:inline-flex">
              تسوق الآن
            </Button>
          </Link>
        </div>
      </header>
      <CartSheet />
    </Sheet>
  )
}
