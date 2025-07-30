import Image from "next/image"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"

export function OurStorySection() {
  return (
    <section id="story" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <AnimateOnScroll>
            <Image
              src="/story-image.png"
              width="550"
              height="550"
              alt="مصدر المياه"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            />
          </AnimateOnScroll>
          <AnimateOnScroll delay="100ms" className="flex flex-col justify-center space-y-4">
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm border">قصتنا</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                من قلب الينابيع العربية
              </h2>
              <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                في "لأ"، قصتنا هي قصة الأرض نفسها. تنبع مياهنا من ينابيع جوفية عريقة، محمية في أعماق الصحراء العربية،
                حيث يتم ترشيحها بشكل طبيعي عبر طبقات من الصخور الرملية القديمة. هذه الرحلة تمنحها لأً استثنائياً وتركيبة
                معدنية متوازنة بشكل فريد.
              </p>
              <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                نحن نؤمن بأن الماء أكثر من مجرد مرطب؛ إنه مصدر للحياة والتراث. التزامنا هو الحفاظ على هذه الهدية الثمينة
                وتقديمها لكم في أنقى صورها، تمامًا كما أرادتها الطبيعة.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
