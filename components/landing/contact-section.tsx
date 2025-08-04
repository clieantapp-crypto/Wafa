"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"
import { MapPin, Phone, Mail, Send, Clock, Globe } from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب." }),
  email: z.string().email({ message: "بريد إلكتروني غير صالح." }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "الموضوع مطلوب." }),
  message: z.string().min(10, { message: "الرسالة يجب أن لا تقل عن 10 أحرف." }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactSection() {
  const { toast } = useToast()
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(data: ContactFormValues) {
    console.log(data)
    toast({
      title: "تم إرسال رسالتك!",
      description: "شكرًا لتواصلك معنا. سنقوم بالرد في أقرب وقت ممكن.",
    })
    form.reset()
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "عنواننا",
      content: "123 شارع الواحة، عمان، الأردن",
      subContent: "الطابق الخامس، مبنى الأعمال",
    },
    {
      icon: Phone,
      title: "هاتف",
      content: "+962 6 123 4567",
      subContent: "متاح من 9 صباحاً - 6 مساءً",
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      content: "contact@naqaa.jo",
      subContent: "نرد خلال 24 ساعة",
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      content: "الأحد - الخميس",
      subContent: "9:00 ص - 6:00 م",
    },
  ]

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden  flex flex-col items-center justify-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-green-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -z-10" />

      <div className="container px-4 md:px-6 relative">
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Globe className="h-4 w-4" />
            تواصل معنا
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            دعنا نساعدك في تحقيق
            <span className="block bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              أهدافك
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            فريقنا من الخبراء مستعد لمساعدتك في أي استفسار أو مشروع. تواصل معنا اليوم ودعنا نبدأ رحلة النجاح معاً.
          </p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Information */}
          <AnimateOnScroll delay="100ms" className="lg:col-span-1">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">معلومات التواصل</h3>
                <p className="text-gray-600 mb-8">نحن هنا لمساعدتك. اختر الطريقة الأنسب للتواصل معنا.</p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <AnimateOnScroll key={index} delay={`${150 + index * 50}ms`}>
                    <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-lg hover:border-teal-200/50 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                          <p className="text-gray-800 font-medium mb-1">{info.content}</p>
                          <p className="text-sm text-gray-500">{info.subContent}</p>
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>

              {/* Social Proof */}
              <AnimateOnScroll delay="400ms">
                <div className="p-6 bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Send className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">استجابة سريعة</h4>
                      <p className="text-teal-100 text-sm">نرد خلال ساعتين في المتوسط</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </AnimateOnScroll>

          {/* Contact Form */}
          <AnimateOnScroll delay="200ms" className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">أرسل لنا رسالة</CardTitle>
                <p className="text-gray-600">املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن</p>
              </CardHeader>
              <CardContent className="pt-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">الاسم الكامل *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="أدخل اسمك الكامل"
                                className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">البريد الإلكتروني *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="you@example.com"
                                type="email"
                                className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">رقم الهاتف</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+962 6 123 4567"
                                className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">الموضوع *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="موضوع رسالتك"
                                className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">رسالتك *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="أخبرنا كيف يمكننا مساعدتك..."
                              className="min-h-[140px] border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          جاري الإرسال...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          إرسال الرسالة
                        </div>
                      )}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      بإرسال هذا النموذج، أنت توافق على
                      <span className="text-teal-600 hover:underline cursor-pointer"> سياسة الخصوصية </span>
                      الخاصة بنا.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
