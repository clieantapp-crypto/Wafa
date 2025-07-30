import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover" poster="/hero-poster.png">
          <source src="https://videos.pexels.com/video-files/3958714/3958714-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      </div>
      <div className="relative z-10 container px-4 md:px-6">
        <AnimateOnScroll className="flex flex-col items-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            لأ. إرواء من قلب الطبيعة
          </h1>
          <p className="max-w-[700px] text-lg md:text-xl text-gray-200 text-balance">
            مياهنا مستخرجة من ينابيع عربية عريقة، محفوظة في حالتها البكر لتروي عطشك وتنعش روحك.
          </p>
          <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-200">
              اكتشف منتجاتنا
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              اشترك الآن
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
