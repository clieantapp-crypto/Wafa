import { MountainIcon, ShieldCheckIcon, LeafIcon, Droplets, Award, Heart } from "lucide-react"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"

export function WhyChooseUs() {
  const features = [
    {
      icon: MountainIcon,
      title: "مصدر بكر",
      description: "من ينابيع جوفية محمية، لم تمسها ملوثات العصر الحديث",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: ShieldCheckIcon,
      title: "غنية طبيعيًا",
      description: "غنية بالمعادن الأساسية لصحة مثالية وجسم متوازن",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      icon: LeafIcon,
      title: "وعد بالاستدامة",
      description: "تُعبأ بعناية من أجلكم ومن أجل الكوكب، باستخدام مواد صديقة للبيئة",
      gradient: "from-green-500 to-lime-500",
      bgGradient: "from-green-50 to-lime-50",
    },
  ]

  const stats = [
    { number: "100%", label: "طبيعية" },
    { number: "50+", label: "سنة خبرة" },
    { number: "1M+", label: "عميل راضٍ" },
  ]

  return (
    <section
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden  flex flex-col items-center justify-center"
    >      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl -z-10" />

      {/* Floating Water Drops */}
      <div className="absolute top-20 right-10 opacity-10">
        <Droplets className="h-24 w-24 text-blue-500 animate-pulse" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-10">
        <Droplets className="h-32 w-32 text-cyan-500 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container px-4 md:px-6 relative">
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm">
            <Award className="h-4 w-4" />
            لماذا تختارنا؟
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            إرث من النقاء
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              والجودة
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed mb-12">
            تتم تصفية مياهنا بشكل طبيعي وتُعزز بالمعادن الأساسية، مما يمنحها مذاقًا منعشًا ونقيًا توارثته الأجيال.
          </p>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {stats.map((stat, index) => (
              <AnimateOnScroll key={index} delay={`${index * 100}ms`}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>

        <div className="grid max-w-6xl mx-auto gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <AnimateOnScroll key={index} delay={`${(index + 1) * 150}ms`}>
              <div className="group relative">
                {/* Card */}
                <div className="relative h-full p-8 bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div
                        className={`w-20 h-20 mx-auto bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}
                      >
                        <feature.icon className="h-10 w-10 text-white" />
                      </div>
                      {/* Icon Glow Effect */}
                      <div
                        className={`absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>

                    {/* Decorative Element */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`w-3 h-3 bg-gradient-to-br ${feature.gradient} rounded-full`} />
                    </div>
                  </div>

                  {/* Border Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 -z-10`}
                  />
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <AnimateOnScroll delay="600ms" className="text-center mt-20">
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl text-white shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-6 w-6 text-red-300" />
              <h3 className="text-2xl font-bold">التزامنا تجاهكم</h3>
              <Heart className="h-6 w-6 text-red-300" />
            </div>
            <p className="text-blue-100 leading-relaxed">
              نحن ملتزمون بتقديم أنقى المياه الطبيعية لعائلتكم، مع الحفاظ على البيئة للأجيال القادمة.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
