"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { products } from "@/data/products"
import { ProductCard } from "@/components/products/product-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"
import { Search, Filter, Grid3X3, List, SlidersHorizontal, Package, Droplets } from 'lucide-react'

export default function ProductsPage() {
  const [sortOrder, setSortOrder] = useState("default")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Sorting
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
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
        break
      default:
        break
    }

    return filtered
  }, [sortOrder, selectedCategories, searchQuery])

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [])

  const clearFilters = () => {
    setSelectedCategories([])
    setSearchQuery("")
    setSortOrder("default")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20">
      <div className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden  flex flex-col items-center justify-center"
      >


        {/* Background Elements */}
        <div className="fixed inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-10" />
        <div className="fixed top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-emerald-400/10 rounded-full blur-3xl -z-10" />
        <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl -z-10" />

        <main className="flex-1 py-16 md:py-24 relative">
          <div className="container px-4 md:px-6">
            {/* Hero Section */}
            <AnimateOnScroll className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-teal-200/50 text-teal-800 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm">
                <Package className="h-4 w-4" />
                منتجاتنا المميزة
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                اكتشف مجموعة
                <span className="block bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  المياه النقية
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
                مجموعتنا الكاملة من المياه النقية والفوارة، المختارة بعناية من أنقى المصادر الطبيعية لتروي عطشك وتمنحك الانتعاش الذي تستحقه.
              </p>
            </AnimateOnScroll>

            {/* Search and Filters */}
            <AnimateOnScroll delay="100ms" className="mb-12">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg p-6">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="ابحث عن المنتجات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-12 h-12 text-lg border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 rounded-xl"
                  />
                </div>

                {/* Filter Controls */}
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                  {/* Category Filters */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-4 mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden"
                      >
                        <SlidersHorizontal className="h-4 w-4 ml-2" />
                        الفلاتر
                      </Button>
                      <Label className="hidden lg:block text-gray-700 font-medium">فلترة حسب الفئة:</Label>
                    </div>

                    <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
                      <ToggleGroup
                        type="multiple"
                        variant="outline"
                        value={selectedCategories}
                        onValueChange={(value) => setSelectedCategories(value)}
                        className="flex-wrap justify-start gap-2"
                      >
                        {categories.map((category) => (
                          <ToggleGroupItem
                            key={category}
                            value={category}
                            className="data-[state=on]:bg-teal-500 data-[state=on]:text-white data-[state=on]:border-teal-500 hover:bg-teal-50 transition-colors duration-200"
                          >
                            <Droplets className="h-4 w-4 ml-2" />
                            {category}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  </div>

                  {/* Sort and View Controls */}
                  <div className="flex items-center gap-4 w-full lg:w-auto">
                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                      <Label className="text-gray-700 font-medium whitespace-nowrap">ترتيب:</Label>
                      <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-[200px] border-gray-200 focus:border-teal-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">الافتراضي</SelectItem>
                          <SelectItem value="newest">الأحدث</SelectItem>
                          <SelectItem value="price-asc">السعر: منخفض إلى عالي</SelectItem>
                          <SelectItem value="price-desc">السعر: عالي إلى منخفض</SelectItem>
                          <SelectItem value="name-asc">الاسم: أبجدياً</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="h-8 w-8 p-0"
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="h-8 w-8 p-0"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Clear Filters */}
                    {(selectedCategories.length > 0 || searchQuery || sortOrder !== "default") && (
                      <Button variant="outline" size="sm" onClick={clearFilters}>
                        مسح الفلاتر
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Results Summary */}
            <AnimateOnScroll delay="150ms" className="mb-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  عرض <span className="font-semibold text-gray-900">{filteredAndSortedProducts.length}</span> من{" "}
                  <span className="font-semibold text-gray-900">{products.length}</span> منتج
                </p>
                {selectedCategories.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Filter className="h-4 w-4" />
                    مفلتر حسب: {selectedCategories.join(", ")}
                  </div>
                )}
              </div>
            </AnimateOnScroll>

            {/* Products Grid/List */}
            {filteredAndSortedProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    : "space-y-6"
                }
              >
                {filteredAndSortedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    delay={`${(index % 8) * 50}ms`}
                    viewMode={viewMode as any}
                  />
                ))}
              </div>
            ) : (
              <AnimateOnScroll delay="200ms">
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">لا توجد منتجات</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    لم نجد أي منتجات تطابق معايير البحث الحالية. جرب تعديل الفلاتر أو البحث بكلمات مختلفة.
                  </p>
                  <Button onClick={clearFilters} className="bg-teal-500 hover:bg-teal-600">
                    مسح جميع الفلاتر
                  </Button>
                </div>
              </AnimateOnScroll>
            )}

            {/* Load More Button (if needed) */}
            {filteredAndSortedProducts.length > 0 && filteredAndSortedProducts.length >= 12 && (
              <AnimateOnScroll delay="300ms" className="text-center mt-16">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-teal-300 transition-all duration-300"
                >
                  عرض المزيد من المنتجات
                </Button>
              </AnimateOnScroll>
            )}
          </div>
        </main>

      </div>
    </div>

  )
}
