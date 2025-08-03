import { Card, CardContent } from "@/components/ui/card"
import { StarIcon, Quote, CheckCircle, Users } from "lucide-react"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "فاطمة أحمد",
      role: "أم لثلاثة أطفال",
      location: "الرياض",
      rating: 5,
      text: "أنقى وأكثر المياه انتعاشًا ذقتها في حياتي. إنها كشربة من واحة غنّاء. أطفالي يحبونها وأنا مطمئنة على صحتهم.",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      id: 2,
      name: "عمر خالد",
      role: "مدير تنفيذي",
      location: "دبي",
      rating: 5,
      text: "توصيل سريع وجودة ممتازة. مياه نجمة الصحراء هي المفضلة في مكتبنا. الطعم النقي يجعلني أشرب المزيد من الماء يومياً.",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      id: 3,
      name: "ليلى بدر",
      role: "طبيبة أسنان",
      location: "جدة",
      rating: 4,
      text: "مياه رائعة بجودة عالية. أنصح بها جميع مرضاي. الحجم العائلي قيمة ممتازة مقابل المال والجودة استثنائية.",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      id: 4,
      name: "محمد العلي",
      role: "رياضي محترف",
      location: "الكويت",
      rating: 5,
      text: "كرياضي، أحتاج لأفضل أنواع المياه للحفاظ على أدائي. مياه نجمة الصحراء تمنحني الترطيب المثالي والطاقة اللازمة.",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      id: 5,
      name: "نورا السالم",
      role: "خبيرة تغذية",
      location: "الدوحة",
      rating: 5,
      text: "أوصي بهذه المياه لجميع عملائي. التركيب المعدني المتوازن والنقاء العالي يجعلها الخيار الأمثل للصحة العامة.",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      id: 6,
      name: "سعد المطيري",
      role: "صاحب مطعم",
      location: "الرياض",
      rating: 5,
      text: "نستخدم مياه نجمة الصحراء في مطعمنا منذ سنوات. عملاؤنا يلاحظون الفرق في طعم الشاي والقهوة. جودة لا تُضاهى.",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
  ]

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
      />
    ))
  }

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-60"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            <span>+50,000 عميل راضٍ</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">آراء عملائنا</h2>

          <p className="mx-auto max-w-2xl text-xl text-gray-600 leading-relaxed">
            استمع لعملائنا الراضين عن تجربتهم مع مياهنا النقية
            <br />
            وكيف غيّرت حياتهم اليومية
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">4.9/5</span>
              <span>من 2,847 تقييم</span>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimateOnScroll key={testimonial.id} delay={index * 100}>
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 left-4 opacity-10">
                  <Quote className="w-12 h-12 text-emerald-500" />
                </div>

                <CardContent className="p-8 text-right relative z-10">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6 justify-end">{renderStars(testimonial.rating)}</div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center gap-4 justify-end">
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        {testimonial.verified && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-xs text-gray-500">{testimonial.location}</div>
                    </div>
                    <div className="relative">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100"
                      />
                      {testimonial.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>

                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimateOnScroll className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">انضم إلى آلاف العملاء الراضين</h3>
            <p className="text-gray-600 mb-6">اكتشف الفرق الذي تحدثه المياه النقية في حياتك اليومية</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                اطلب الآن
              </button>
              <button className="border-2 border-emerald-500 text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300">
                اقرأ المزيد من التقييمات
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
