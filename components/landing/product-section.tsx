"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"
import { useCart } from "@/contexts/cart-context"
import { Star, ShoppingCart, Heart, Eye, Droplets, Award, Truck, Shield, Plus, Minus, Check } from "lucide-react"
import { useState } from "react"

const products = [
  {
    id: "prod_01",
    name: "مياه الواحة النقية",
    description: "مياه طبيعية من ينابيع الواحات العربية",
    shortDesc: "عبوة 500 مل",
    price: 2.5,
    originalPrice: 3.0,
    image: "/2water-bottle.webp",
    rating: 4.8,
    reviewCount: 324,
    badge: "الأكثر مبيعاً",
    badgeColor: "bg-emerald-500",
    features: ["طبيعية 100%", "غنية بالمعادن", "pH متوازن"],
    inStock: true,
    stockCount: 150,
    category: "فردي",
    sizes: [
      { size: "500 مل", price: 2.5, originalPrice: 3.0 },
      { size: "1 لتر", price: 4.0, originalPrice: 5.0 },
    ],
  },
  {
    id: "prod_02",
    name: "نجمة الصحراء الفوارة",
    description: "مياه فوارة طبيعية بنكهات منعشة",
    shortDesc: "عبوة 750 مل",
    price: 3.75,
    originalPrice: 4.5,
    image: "/2water-bottle.webp",
    rating: 4.9,
    reviewCount: 189,
    badge: "جديد",
    badgeColor: "bg-blue-500",
    features: ["فوارة طبيعية", "نكهات طبيعية", "منخفضة الصوديوم"],
    inStock: true,
    stockCount: 89,
    category: "فوارة",
    sizes: [
      { size: "750 مل", price: 3.75, originalPrice: 4.5 },
      { size: "1.5 لتر", price: 6.0, originalPrice: 7.5 },
    ],
  },
  {
    id: "prod_03",
    name: "كنز العائلة",
    description: "عبوة عائلية اقتصادية للاستخدام اليومي",
    shortDesc: "عبوة 5 لتر",
    price: 7.0,
    originalPrice: 9.0,
    image: "/2water-bottle.webp",
    rating: 4.7,
    reviewCount: 456,
    badge: "توفير 22%",
    badgeColor: "bg-orange-500",
    features: ["اقتصادية", "صديقة للبيئة", "سهلة الحمل"],
    inStock: true,
    stockCount: 67,
    category: "عائلي",
    sizes: [
      { size: "5 لتر", price: 7.0, originalPrice: 9.0 },
      { size: "10 لتر", price: 12.0, originalPrice: 16.0 },
    ],
  },
  {
    id: "prod_04",
    name: "مياه الملوك المعدنية",
    description: "مياه معدنية فاخرة غنية بالمعادن الطبيعية",
    shortDesc: "عبوة 330 مل",
    price: 4.5,
    originalPrice: 5.5,
    image: "/2water-bottle.webp",
    rating: 5.0,
    reviewCount: 127,
    badge: "فاخر",
    badgeColor: "bg-purple-500",
    features: ["معادن طبيعية", "تصميم فاخر", "محدودة الإنتاج"],
    inStock: true,
    stockCount: 23,
    category: "فاخر",
    sizes: [
      { size: "330 مل", price: 4.5, originalPrice: 5.5 },
      { size: "750 مل", price: 8.0, originalPrice: 10.0 },
    ],
  },
  {
    id: "prod_05",
    name: "مياه الرياضيين",
    description: "مياه مخصصة للرياضيين مع إلكتروليت طبيعي",
    shortDesc: "عبوة 600 مل",
    price: 3.25,
    originalPrice: 4.0,
    image: "/2water-bottle.webp",
    rating: 4.6,
    reviewCount: 298,
    badge: "رياضي",
    badgeColor: "bg-red-500",
    features: ["إلكتروليت طبيعي", "سريع الامتصاص", "للرياضيين"],
    inStock: true,
    stockCount: 112,
    category: "رياضي",
    sizes: [
      { size: "600 مل", price: 3.25, originalPrice: 4.0 },
      { size: "1.2 لتر", price: 5.5, originalPrice: 7.0 },
    ],
  },
  {
    id: "prod_06",
    name: "مياه الأطفال الآمنة",
    description: "مياه مخصصة للأطفال بمعايير أمان عالية",
    shortDesc: "عبوة 250 مل",
    price: 2.0,
    originalPrice: 2.5,
    image: "/2water-bottle.webp",
    rating: 4.9,
    reviewCount: 567,
    badge: "للأطفال",
    badgeColor: "bg-pink-500",
    features: ["آمنة للأطفال", "فلورايد منخفض", "تصميم مرح"],
    inStock: true,
    stockCount: 203,
    category: "أطفال",
    sizes: [
      { size: "250 مل", price: 2.0, originalPrice: 2.5 },
      { size: "500 مل", price: 3.5, originalPrice: 4.5 },
    ],
  },
]

export function ProductSection() {
  const { addToCart } = useCart()
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: number }>({})
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const handleSizeChange = (productId: string, sizeIndex: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeIndex }))
  }

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change),
    }))
  }

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const getProductPrice = (product: any) => {
    const sizeIndex = selectedSizes[product.id] || 0
    return product.sizes[sizeIndex]
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
      />
    ))
  }

  return (
    <section
      id="products"
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-60"></div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            <Droplets className="w-4 h-4" />
            <span>مجموعة متنوعة من المياه الفاخرة</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">تشكيلتنا الفاخرة</h2>

          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            اكتشف مجموعتنا المتنوعة من عبوات المياه الفاخرة
            <br />
            المثالية لكل مناسبة واحتياج
          </p>
        </AnimateOnScroll>

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {products.map((product, index) => {
            const selectedSize = getProductPrice(product)
            const quantity = quantities[product.id] || 1
            const savings = (
              ((selectedSize.originalPrice - selectedSize.price) / selectedSize.originalPrice) *
              100
            ).toFixed(0)

            return (
              <AnimateOnScroll key={product.id} delay={index * 100}>
                <Card className="group overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative">
                  {/* Product Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className={`${product.badgeColor} text-white font-semibold px-3 py-1`}>
                      {product.badge}
                    </Badge>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 group/fav"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 group-hover/fav:scale-110 ${
                        favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                      }`}
                    />
                  </button>

                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        width="400"
                        height="400"
                        alt={product.name}
                        className="aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Quick View Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/90 backdrop-blur-sm text-gray-900 border-white hover:bg-white"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          عرض سريع
                        </Button>
                      </div>

                      {/* Stock Indicator */}
                      {product.stockCount < 50 && (
                        <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {product.stockCount < 10 ? "آخر القطع!" : `متبقي ${product.stockCount}`}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6 space-y-4">
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="flex">{renderStars(product.rating)}</div>
                          <span className="text-sm text-gray-500 mr-1">({product.reviewCount})</span>
                        </div>
                      </div>

                      {/* Product Name & Description */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full"
                          >
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Size Selection */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">الحجم:</label>
                        <div className="flex gap-2">
                          {product.sizes.map((size, sizeIndex) => (
                            <button
                              key={sizeIndex}
                              onClick={() => handleSizeChange(product.id, sizeIndex)}
                              className={`px-3 py-2 text-sm rounded-lg border transition-all duration-300 ${
                                (selectedSizes[product.id] || 0) === sizeIndex
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold"
                                  : "border-gray-200 hover:border-gray-300 text-gray-600"
                              }`}
                            >
                              {size.size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price & Savings */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-gray-900">{selectedSize.price.toFixed(2)} ريال</span>
                          {selectedSize.originalPrice > selectedSize.price && (
                            <>
                              <span className="text-lg text-gray-500 line-through">
                                {selectedSize.originalPrice.toFixed(2)}
                              </span>
                              <Badge className="bg-red-100 text-red-700 text-xs">وفر {savings}%</Badge>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Add to Cart */}
                      <div className="flex items-center gap-3 pt-2">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="p-2 hover:bg-gray-50 transition-colors duration-200"
                            disabled={quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="p-2 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                          onClick={() => addToCart({ ...product, selectedSize, quantity })}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          أضف للسلة
                        </Button>
                      </div>

                      {/* Trust Indicators */}
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <Truck className="w-3 h-3" />
                          <span>توصيل مجاني</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          <span>ضمان الجودة</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span>معتمد دولياً</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <AnimateOnScroll className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 max-w-4xl mx-auto border border-emerald-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">لم تجد ما تبحث عنه؟</h3>
            <p className="text-gray-600 mb-6">تواصل معنا لطلبات مخصصة أو كميات كبيرة</p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              تواصل معنا
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
