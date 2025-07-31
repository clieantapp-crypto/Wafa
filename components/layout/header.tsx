"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropletsIcon, ShoppingCartIcon, User, Menu } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart/cart-sheet"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"

export function Header() {
  const { totalItems } = useCart()
  const { user, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationLinks = [
    { href: "/products", label: "منتجاتنا" },
    { href: "/#story", label: "قصتنا" },
    { href: "/#contact", label: "تواصل معنا" }
  ]

  return (
    <Sheet>
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <DropletsIcon className="h-6 w-6 text-primary" />
          <span className="mr-3 text-xl font-bold text-primary">Go</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="mr-auto hidden lg:flex gap-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-primary hover:underline underline-offset-4 transition-colors"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden mr-auto">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5 text-gray-700" />
              <span className="sr-only">فتح القائمة</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2"
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Cart Button */}
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCartIcon className="h-5 w-5 text-gray-700" />
              <span className="sr-only">عربة التسوق</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white font-medium">
                  {totalItems}
                </span>
              )}
            </Button>
          </SheetTrigger>

          {/* User Authentication */}
          {!loading && (
            user ? (
              <Link href="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="sr-only">الحساب الشخصي</span>
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  تسجيل الدخول
                </Button>
              </Link>
            )
          )}
        </div>
      </header>

      {/* Cart Sheet */}
      <CartSheet />
    </Sheet>
  )
}
