"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropletsIcon, ShoppingCartIcon, User, Menu, X, ChevronDown } from "lucide-react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart/cart-sheet"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"

export function Header() {
  const { totalItems } = useCart()
  const { user, loading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navigationLinks = [
    { href: "/products", label: "منتجاتنا" },
    { href: "/#story", label: "قصتنا" },
    { href: "/#contact", label: "تواصل معنا" },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Sheet>
      <header
        className={`px-4 lg:px-8 h-20 flex items-center sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
            : "bg-white/80 backdrop-blur-lg shadow-sm"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center group" prefetch={false}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <DropletsIcon className="h-7 w-7 text-white" />
            </div>
          </div>
          <div className="mr-4 flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              نقاء
            </span>
            <span className="text-xs text-gray-500 font-medium -mt-1">المياه الطبيعية</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="mr-auto hidden lg:flex items-center gap-8">
          {navigationLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2"
              prefetch={false}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden mr-auto">
            <Button variant="ghost" size="icon" className="hover:bg-blue-50 transition-colors duration-300">
              <Menu className="h-6 w-6 text-gray-700" />
              <span className="sr-only">فتح القائمة</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[320px] sm:w-[400px] bg-white/95 backdrop-blur-xl border-l border-gray-200/50"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <DropletsIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  نقاء
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex flex-col gap-2">
              {navigationLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between p-4 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-300"
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-[-90deg]" />
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              {!loading &&
                (user ? (
                  <Link href="/account" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start gap-3 h-12 bg-transparent">
                      <User className="h-5 w-5" />
                      الحساب الشخصي
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      تسجيل الدخول
                    </Button>
                  </Link>
                ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-blue-50 transition-colors duration-300 group"
            >
              <ShoppingCartIcon className="h-5 w-5 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
              <span className="sr-only">عربة التسوق</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-xs text-white font-bold shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </Button>
          </SheetTrigger>

          {/* User Authentication */}
          {!loading &&
            (user ? (
              <Link href="/account">
                <Button variant="ghost" size="icon" className="hover:bg-blue-50 transition-colors duration-300 group">
                  <User className="h-5 w-5 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
                  <span className="sr-only">الحساب الشخصي</span>
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hidden sm:flex">
                  تسجيل الدخول
                </Button>
                {/* Mobile login button */}
                <Link href="/login" className="sm:hidden">
                  <Button variant="ghost" size="icon" className="hover:bg-blue-50 transition-colors duration-300">
                    <User className="h-5 w-5 text-gray-700" />
                  </Button>
                </Link>
              </Link>
            ))}
        </div>
      </header>

      {/* Cart Sheet */}
      <CartSheet />
    </Sheet>
  )
}
