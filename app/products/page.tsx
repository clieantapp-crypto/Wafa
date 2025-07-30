"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { products } from "@/data/products"
import { ProductCard } from "@/components/products/product-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"

export default function ProductsPage() {
  const [sortOrder, setSortOrder] = useState("default")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    switch (sortOrder) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name, "ar"))
        break
      default:
        break
    }

    return filtered
  }, [sortOrder, selectedCategories])

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">منتجاتنا</h1>
              <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                اكتشف مجموعتنا الكاملة من المياه النقية والفوارة، المختارة بعناية لتروي عطشك.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay="100ms">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <Label className="shrink-0">فلترة حسب الفئة:</Label>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  value={selectedCategories}
                  onValueChange={(value) => setSelectedCategories(value)}
                  aria-label="فلترة حسب الفئة"
                  className="flex-wrap justify-center"
                >
                  {categories.map((category) => (
                    <ToggleGroupItem key={category} value={category} aria-label={category}>
                      {category}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Label htmlFor="sort-order">ترتيب حسب:</Label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger id="sort-order" className="w-[200px]">
                    <SelectValue placeholder="الترتيب الافتراضي" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">الترتيب الافتراضي</SelectItem>
                    <SelectItem value="price-asc">السعر: من الأقل إلى الأعلى</SelectItem>
                    <SelectItem value="price-desc">السعر: من الأعلى إلى الأقل</SelectItem>
                    <SelectItem value="name-asc">الاسم: أبجديًا</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AnimateOnScroll>

          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} delay={`${(index % 4) * 100}ms`} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">لا توجد منتجات تطابق معايير البحث الحالية.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
