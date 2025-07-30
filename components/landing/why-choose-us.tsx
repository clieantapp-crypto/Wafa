import { MountainIcon, ShieldCheckIcon, LeafIcon } from "lucide-react"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"

export function WhyChooseUs() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <AnimateOnScroll className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm border">لماذا تختارنا؟</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">إرث من اللأ والجودة</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              تتم تصفية مياهنا بشكل طبيعي وتُعزز بالمعادن الأساسية، مما يمنحها مذاقًا منعشًا ونقيًا توارثته الأجيال.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
          <AnimateOnScroll delay="100ms" className="grid gap-2 text-center">
            <div className="flex justify-center items-center">
              <MountainIcon className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold">مصدر بكر</h3>
            <p className="text-sm text-gray-500">من ينابيع جوفية محمية، لم تمسها ملوثات العصر الحديث.</p>
          </AnimateOnScroll>
          <AnimateOnScroll delay="200ms" className="grid gap-2 text-center">
            <div className="flex justify-center items-center">
              <ShieldCheckIcon className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold">غنية طبيعيًا</h3>
            <p className="text-sm text-gray-500">غنية بالمعادن الأساسية لصحة مثالية وجسم متوازن.</p>
          </AnimateOnScroll>
          <AnimateOnScroll delay="300ms" className="grid gap-2 text-center">
            <div className="flex justify-center items-center">
              <LeafIcon className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold">وعد بالاستدامة</h3>
            <p className="text-sm text-gray-500">تُعبأ بعناية من أجلكم ومن أجل الكوكب، باستخدام مواد صديقة للبيئة.</p>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
