import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Repeat, Percent, Truck } from "lucide-react"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"

export function SubscriptionSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <AnimateOnScroll className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">انتعاش دائم، بدون عناء</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              انضم إلى خدمة الاشتراك من "نقاء" واحصل على مياهك النقية بانتظام. راحة، توفير، ومرونة في خدمتك.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-12 mt-12">
          <AnimateOnScroll delay="100ms" className="h-full">
            <Card className="text-center h-full">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Repeat className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">توصيل دوري</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  اختر جدول التوصيل الذي يناسبك، ولن تقلق بشأن نفاد المياه مرة أخرى.
                </p>
              </CardContent>
            </Card>
          </AnimateOnScroll>
          <AnimateOnScroll delay="200ms" className="h-full">
            <Card className="text-center h-full">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Percent className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">توفير حصري</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">استمتع بخصم 15% على جميع طلباتك عند الاشتراك في خدمتنا.</p>
              </CardContent>
            </Card>
          </AnimateOnScroll>
          <AnimateOnScroll delay="300ms" className="h-full">
            <Card className="text-center h-full">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">مرونة كاملة</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  يمكنك تعديل اشتراكك أو إيقافه مؤقتًا أو إلغاؤه في أي وقت وبكل سهولة.
                </p>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
        <AnimateOnScroll className="mt-12 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            ابدأ اشتراكك اليوم
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
