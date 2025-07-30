import { Card, CardContent } from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"

export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <AnimateOnScroll className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-900">آراء عملائنا</h2>
          <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            استمع لعملائنا الراضين عن تجربتهم مع مياهنا.
          </p>
        </AnimateOnScroll>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-8">
          <AnimateOnScroll delay="100ms">
            <Card className="text-right bg-secondary border-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4 justify-end">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg font-semibold leading-snug">
                  "أنقى وأكثر المياه انتعاشًا ذقتها في حياتي. إنها كشربة من واحة غنّاء."
                </blockquote>
                <div className="mt-4 font-semibold">- فاطمة أ.</div>
              </CardContent>
            </Card>
          </AnimateOnScroll>
          <AnimateOnScroll delay="200ms">
            <Card className="text-right bg-secondary border-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4 justify-end">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg font-semibold leading-snug">
                  "توصيل سريع وجودة ممتازة. مياه نجمة الصحراء الفوارة هي المفضلة لدي."
                </blockquote>
                <div className="mt-4 font-semibold">- عمر خ.</div>
              </CardContent>
            </Card>
          </AnimateOnScroll>
          <AnimateOnScroll delay="300ms">
            <Card className="text-right bg-secondary border-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4 justify-end">
                  {[...Array(4)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                  <StarIcon className="w-5 h-5 fill-gray-200 stroke-gray-400" />
                </div>
                <blockquote className="text-lg font-semibold leading-snug">
                  "مياه رائعة، وإن كانت باهظة الثمن بعض الشيء. الحجم العائلي قيمة جيدة مقابل المال."
                </blockquote>
                <div className="mt-4 font-semibold">- ليلى ب.</div>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
