"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropletsIcon, ShoppingCartIcon, User } from 'lucide-react'
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart/cart-sheet"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const { totalItems } = useCart()
  const { user, loading } = useAuth()

  return (
    <Sheet>
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <DropletsIcon className="h-6 w-6 text-primary" />
          <span className="mr-3 text-xl font-bold text-primary">لأ</span>
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
        <div className="flex items-center gap-2">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCartIcon className="h-5 w-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Button>
          </SheetTrigger>
          {!loading && (
            user ? (
              <Link href="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5 text-gray-700" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline">تسجيل الدخول</Button>
              </Link>
            )
          )}
        </div>
      </header>
      <CartSheet />
    </Sheet>
  )
}
