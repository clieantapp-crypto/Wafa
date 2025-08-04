"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"
import { ShoppingCart, Heart, Star, Eye } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: string
  name: string
  price: number
  category: string
  image?: string
  description?: string
  rating?: number
  reviews?: number
  inStock?: boolean
  isNew?: boolean
  discount?: number
}

interface ProductCardProps {
  product: Product
  delay?: string
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, delay = "0ms", viewMode = "grid" }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image:product.image
    })
  }

  if (viewMode === "list") {
    return (
      <AnimateOnScroll delay={delay}>
        <Card className="group bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex gap-6">
              {/* Product Image */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onLoad={() => setImageLoaded(true)}
                    />
                  ) : (
                    <span className="text-4xl">💧</span>
                  )}
                </div>
                {product.isNew && <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">جديد</Badge>}
                {product.discount && (
                  <Badge className="absolute -top-2 -left-2 bg-red-500 text-white">-{product.discount}%</Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsLiked(!isLiked)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                  </div>

                  <Badge variant="secondary" className="mb-3">
                    {product.category}
                  </Badge>

                  {product.description && <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>}

                  {product.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews || 0} تقييم)</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {product.discount ? (
                      <>
                        <span className="text-2xl font-bold text-blue-600">
                          {(product.price * (1 - product.discount / 100)).toFixed(2)} د.أ
                        </span>
                        <span className="text-lg text-gray-400 line-through">{product.price} د.أ</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-blue-600">{product.price} د.أ</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    >
                      <ShoppingCart className="h-4 w-4 ml-2" />
                      {product.inStock ? "أضف للسلة" : "غير متوفر"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimateOnScroll>
    )
  }

  return (
    <AnimateOnScroll delay={delay}>
      <Card className="group bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onLoad={() => setImageLoaded(true)}
              />
            ) : (
              <span className="text-6xl">💧</span>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-green-500 text-white shadow-lg">جديد</Badge>}
            {product.discount && <Badge className="bg-red-500 text-white shadow-lg">-{product.discount}%</Badge>}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className="bg-white/90 backdrop-blur-sm shadow-lg"
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                غير متوفر
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          {/* Category */}
          <Badge variant="secondary" className="mb-3">
            {product.category}
          </Badge>

          {/* Product Name */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          {product.description && <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews || 0})</span>
            </div>
          )}

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {product.discount ? (
                <>
                  <span className="text-xl font-bold text-blue-600">
                    {(product.price * (1 - product.discount / 100)).toFixed(2)} د.أ
                  </span>
                  <span className="text-sm text-gray-400 line-through">{product.price} د.أ</span>
                </>
              ) : (
                <span className="text-xl font-bold text-blue-600">{product.price} د.أ</span>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4 ml-2" />
              أضف
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimateOnScroll>
  )
}
