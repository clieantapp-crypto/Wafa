"use client"

import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"
import { useRouter } from "next/navigation"
import { Play, Droplets, Award, Users } from "lucide-react"

export function HeroSection() {
  const router = useRouter()

  const handleProductsPage = () => {
    router.push("/products")
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/pexels-pixabay-327090.jpg"
        >
          <source src="https://videos.pexels.com/video-files/3958714/3958714-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>

        {/* Enhanced Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 md:px-6 max-w-6xl">
        <AnimateOnScroll className="flex flex-col items-center space-y-8">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span>مياه طبيعية 100%</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-balance leading-tight">
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-lg transform -rotate-1">
                لأ
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                إرواء من قلب الطبيعة
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="max-w-3xl text-xl md:text-2xl text-gray-200 text-balance leading-relaxed font-light">
            مياهنا مستخرجة من ينابيع عربية عريقة، محفوظة في حالتها البكر
            <br className="hidden md:block" />
            لتروي عطشك وتنعش روحك بنقاء استثنائي
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span>معتمد دولياً</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>+50,000 عميل راضٍ</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-emerald-400" />
              <span>نقاء 99.9%</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={handleProductsPage}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              اكتشف منتجاتنا
            </Button>

            <Button
              onClick={handleProductsPage}
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm font-semibold px-8 py-4 text-lg rounded-full hover:border-white/50 transition-all duration-300"
            >
              اشترك الآن
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-br from-white/10 to-blue-400/10 rounded-full blur-lg"></div>
    </section>
  )
}
