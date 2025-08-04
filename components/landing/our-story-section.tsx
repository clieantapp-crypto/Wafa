"use client"

import Image from "next/image"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"
import { Droplets, Leaf, ShieldCheck, History, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OurStorySection() {
  const storyPoints = [
    {
      icon: Droplets,
      title: "نقاء طبيعي 100%",
      description: "مياهنا مستخرجة من ينابيع جوفية محمية، تمر بترشيح طبيعي عبر طبقات الصخور.",
    },
    {
      icon: History,
      title: "تراث عريق",
      description: "قصتنا متجذرة في تاريخ الينابيع العربية القديمة، التي تروي أجيالاً.",
    },
    {
      icon: ShieldCheck,
      title: "التزام بالجودة",
      description: "نضمن أعلى معايير الجودة والنقاء في كل قطرة تصل إليكم.",
    },
    {
      icon: Leaf,
      title: "استدامة بيئية",
      description: "نعمل على الحفاظ على مصادرنا الطبيعية للأجيال القادمة.",
    },
  ]

  return (
    <section
      id="story"
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden  flex flex-col items-center justify-center"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/water-pattern.png')",
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Section */}
          <AnimateOnScroll className="relative group">
            <div className="relative w-full h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500 ease-out">
              <img
                src="/pexels-pixabay-327090.jpg"
                width={800}
                height={800}
                alt="مصدر المياه الطبيعي"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 right-8 text-white text-right">
                <h3 className="text-2xl font-bold mb-2">من قلب الينابيع العريقة</h3>
                <p className="text-lg font-light">حيث تبدأ رحلة النقاء</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-xl opacity-70"></div>
          </AnimateOnScroll>

          {/* Content Section */}
          <AnimateOnScroll delay={100} className="flex flex-col justify-center space-y-8 text-right">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 border border-emerald-200">
                <Mountain className="inline-block w-4 h-4 ml-2" />
                قصتنا
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                رحلة النقاء من أعماق الأرض
              </h2>
              <p className="max-w-[600px] text-lg md:text-xl text-gray-700 leading-relaxed">
                في "لأ"، قصتنا هي قصة الأرض نفسها. تنبع مياهنا من ينابيع جوفية عريقة، محمية في أعماق الصحراء العربية،
                حيث يتم ترشيحها بشكل طبيعي عبر طبقات من الصخور الرملية القديمة. هذه الرحلة تمنحها نقاءً استثنائياً وتركيبة
                معدنية متوازنة بشكل فريد.
              </p>
              <p className="max-w-[600px] text-lg md:text-xl text-gray-700 leading-relaxed">
                نحن نؤمن بأن الماء أكثر من مجرد مرطب؛ إنه مصدر للحياة والتراث. التزامنا هو الحفاظ على هذه الهدية الثمينة
                وتقديمها لكم في أنقى صورها، تمامًا كما أرادتها الطبيعة.
              </p>
            </div>

            {/* Key Story Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {storyPoints.map((point, idx) => (
                <AnimateOnScroll key={idx} delay={(200 + idx * 50).toString()}>
                  <div className="flex items-start gap-4 text-right">
                    <div className="flex-shrink-0 p-3 rounded-full bg-emerald-500/10 text-emerald-600">
                      <point.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{point.title}</h3>
                      <p className="text-sm text-gray-600">{point.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Call to Action */}
            <AnimateOnScroll delay={400}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-8"
              >
                اكتشف المزيد عن قيمنا
              </Button>
            </AnimateOnScroll>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
