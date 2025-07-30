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
import { MapPin, Phone, Mail } from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب." }),
  email: z.string().email({ message: "بريد إلكتروني غير صالح." }),
  message: z.string().min(10, { message: "الرسالة يجب أن لا تقل عن 10 أحرف." }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactSection() {
  const { toast } = useToast()
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  function onSubmit(data: ContactFormValues) {
    console.log(data) // In a real app, you'd send this to your backend
    toast({
      title: "تم إرسال رسالتك!",
      description: "شكرًا لتواصلك معنا. سنقوم بالرد في أقرب وقت ممكن.",
    })
    form.reset({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <AnimateOnScroll className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">تواصل معنا</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              هل لديك سؤال أو استفسار؟ فريقنا مستعد دائمًا للمساعدة.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <AnimateOnScroll delay="100ms" className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">عنواننا</h3>
                <p className="text-gray-600">123 شارع الواحة، عمان، الأردن</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">هاتف</h3>
                <p className="text-gray-600" dir="ltr">
                  +962 6 123 4567
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">البريد الإلكتروني</h3>
                <p className="text-gray-600">contact@naqaa.jo</p>
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay="200ms" className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>أرسل لنا رسالة</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم</FormLabel>
                          <FormControl>
                            <Input placeholder="اسمك" {...field} />
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
                          <FormLabel>البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رسالتك</FormLabel>
                          <FormControl>
                            <Textarea placeholder="كيف يمكننا مساعدتك؟" className="min-h-[120px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      إرسال الرسالة
                    </Button>
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
