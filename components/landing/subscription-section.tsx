import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Repeat, Percent, Truck, Shield, Clock, Gift, CheckCircle, Star, Users, CreditCard, Phone } from "lucide-react"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"

export function SubscriptionSection() {
  const features = [
    {
      icon: Repeat,
      title: "توصيل دوري منتظم",
      description: "اختر من بين جداول التوصيل المرنة: أسبوعي، نصف شهري، أو شهري حسب احتياجاتك",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Percent,
      title: "توفير حصري يصل إلى 25%",
      description: "خصومات متدرجة تزيد مع طول فترة الاشتراك، بالإضافة لعروض حصرية للمشتركين",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Truck,
      title: "توصيل مجاني دائماً",
      description: "توصيل مجاني لجميع الطلبات مع إمكانية تحديد الوقت المناسب لك",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "ضمان الجودة 100%",
      description: "ضمان استرداد كامل في حالة عدم الرضا، مع فحص جودة مستمر لكل شحنة",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Clock,
      title: "مرونة كاملة",
      description: "تعديل، إيقاف مؤقت، أو إلغاء اشتراكك في أي وقت بنقرة واحدة عبر التطبيق",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Gift,
      title: "مكافآت الولاء",
      description: "اكسب نقاط مع كل طلب واستبدلها بمنتجات مجانية وخصومات إضافية",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  const plans = [
    {
      name: "الأساسي",
      price: "89",
      originalPrice: "105",
      period: "شهرياً",
      description: "مثالي للأفراد والعائلات الصغيرة",
      features: [
        "24 زجاجة (500 مل) شهرياً",
        "توصيل مرة واحدة شهرياً",
        "خصم 15% على الطلبات الإضافية",
        "دعم عملاء عبر الهاتف",
        "إمكانية تعديل الطلب",
      ],
      popular: false,
      savings: "وفر 16 دينار",
    },
    {
      name: "العائلي",
      price: "159",
      originalPrice: "200",
      period: "شهرياً",
      description: "الأنسب للعائلات المتوسطة",
      features: [
        "48 زجاجة (500 مل) شهرياً",
        "توصيل مرتين شهرياً",
        "خصم 20% على الطلبات الإضافية",
        "دعم عملاء مخصص 24/7",
        "منتجات موسمية مجانية",
        "تطبيق إدارة الاشتراك",
      ],
      popular: true,
      savings: "وفر 41 دينار",
    },
    {
      name: "المميز",
      price: "279",
      originalPrice: "350",
      period: "شهرياً",
      description: "للعائلات الكبيرة والمكاتب",
      features: [
        "96 زجاجة (500 مل) شهرياً",
        "توصيل أسبوعي",
        "خصم 25% على جميع المنتجات",
        "مدير حساب شخصي",
        "منتجات حصرية ومحدودة",
        "برنامج نقاط VIP",
        "توصيل في نفس اليوم",
      ],
      popular: false,
      savings: "وفر 71 دينار",
    },
  ]

  return (
    <section
    className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden  flex flex-col items-center justify-center"
    >      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-2xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10  flex flex-col items-center justify-center">
        {/* Header Section */}
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            <span>انضم لأكثر من 15,000 مشترك</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">انتعاش دائم، بدون عناء</h2>

          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed mb-8">
            انضم إلى خدمة الاشتراك من "لأ" واحصل على مياهك النقية بانتظام
            <br />
            راحة، توفير، ومرونة في خدمتك مع ضمان الجودة
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>4.9/5 تقييم المشتركين</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>ضمان استرداد 30 يوم</span>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <AnimateOnScroll key={index} delay={index * 100}>
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                <CardHeader className="text-center relative z-10">
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${feature.color} shadow-lg mb-4`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>

                <CardContent className="text-center relative z-10">
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Pricing Plans */}
        <AnimateOnScroll className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">اختر الخطة المناسبة لك</h3>
            <p className="text-gray-600 text-lg">جميع الخطط تشمل توصيل مجاني وإمكانية الإلغاء في أي وقت</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <AnimateOnScroll key={index} delay={index * 150}>
                <Card
                  className={`relative h-full ${plan.popular ? "ring-2 ring-emerald-500 shadow-2xl scale-105" : "shadow-lg"} hover:shadow-xl transition-all duration-300 bg-white`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 text-sm font-semibold">
                        الأكثر شعبية
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                    <p className="text-gray-600 mb-4">{plan.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 line-through">{plan.originalPrice} دينار</div>
                          <div className="text-sm text-gray-600">{plan.period}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-emerald-600">{plan.savings}</div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3 text-right">
                          <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full mt-6 ${
                        plan.popular
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                      } font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105`}
                    >
                      {plan.popular ? "ابدأ الآن - الأكثر توفيراً" : "اختر هذه الخطة"}
                    </Button>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Bottom CTA Section */}
        <AnimateOnScroll className="text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto border border-emerald-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">جرب بدون مخاطر لمدة 30 يوم</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              ابدأ اشتراكك اليوم واستمتع بضمان استرداد كامل خلال 30 يوم إذا لم تكن راضياً تماماً
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                ابدأ اشتراكك الآن
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300 bg-transparent"
              >
                <Phone className="w-5 h-5 mr-2" />
                تحدث مع مستشار
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>بدء فوري</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>إلغاء في أي وقت</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>دعم عملاء 24/7</span>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
