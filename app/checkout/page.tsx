"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { PaymentForm } from "@/components/checkout/payment-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { CheckoutProgress } from "@/components/checkout/checkout-progress"
import { Loader2, ShieldCheck, Truck, CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const checkoutFormSchema = z.object({
  // Shipping
  fullName: z.string().min(3, { message: "الاسم الكامل مطلوب." }),
  address: z.string().min(5, { message: "العنوان مطلوب." }),
  city: z.string().min(2, { message: "المدينة مطلوبة." }),
  country: z.string().min(2, { message: "الدولة مطلوبة." }),
  phone: z.string().min(9, { message: "رقم هاتف صحيح مطلوب." }),
  // Payment
  cardName: z.string().min(3, { message: "الاسم على البطاقة مطلوب." }),
  cardNumber: z.string().min(16, { message: "رقم بطاقة صحيح مطلوب." }).max(16),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { message: "التاريخ يجب أن يكون MM/YY" }),
  cardCvc: z.string().min(3, { message: "CVC مطلوب." }).max(4),
})

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      country: "الأردن",
      fullName: user?.displayName || "",
    },
  })

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "تسجيل الدخول مطلوب",
        description: "يجب تسجيل الدخول لإتمام عملية الشراء.",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [user, authLoading, router, toast])

  useEffect(() => {
    if (user?.displayName) {
      form.setValue("fullName", user.displayName)
    }
  }, [user, form])

  async function onSubmit(data: CheckoutFormValues) {
    if (!user) {
      toast({
        title: "خطأ في المصادقة",
        description: "يجب تسجيل الدخول لإتمام الطلب.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: items,
          total: totalPrice,
          shippingInfo: data,
          userId: user.uid,
        }),
      })

      if (!response.ok) {
        throw new Error("فشلت عملية الدفع. يرجى المحاولة مرة أخرى.")
      }

      const result = await response.json()
      toast({
        title: "تم الدفع بنجاح!",
        description: `شكراً لطلبك. رقم طلبك هو: ${result.orderId}`,
      })
      clearCart()
      router.push(`/order-confirmation?orderId=${result.orderId}`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ غير متوقع."
      toast({
        title: "خطأ في الدفع",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-slate-600">جاري التحميل...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (items.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-slate-400" />
              </div>
              <h1 className="text-2xl font-bold mb-4 text-slate-900">عربة التسوق فارغة</h1>
              <p className="text-slate-600 mb-8">لا يمكنك المتابعة إلى الدفع بعربة فارغة.</p>
              <Button onClick={() => router.push("/")} size="lg" className="w-full">
                العودة إلى التسوق
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir="rtl">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">إتمام الطلب</h1>
            <p className="text-slate-600 text-lg">أكمل معلوماتك لإتمام عملية الشراء بأمان</p>
          </div>

          {/* Progress Indicator */}
          <CheckoutProgress currentStep={currentStep} />

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
              معاملة آمنة ومشفرة
            </Badge>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Forms Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Truck className="h-4 w-4 text-primary" />
                      </div>
                      معلومات الشحن
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ShippingForm form={form} />
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-primary" />
                      </div>
                      معلومات الدفع
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PaymentForm form={form} />
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary Section */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">ملخص الطلب</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <OrderSummary />
                      
                      {/* Payment Button */}
                      <div className="space-y-4">
                        <Button 
                          type="submit" 
                          className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary to-primary/90" 
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                              جاري المعالجة...
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="ml-2 h-5 w-5" />
                              ادفع {totalPrice.toFixed(2)} دينار
                            </>
                          )}
                        </Button>
                        
                        {/* Security Notice */}
                        <div className="text-center text-sm text-slate-500 space-y-1">
                          <p>معلوماتك محمية بتشفير SSL</p>
                          <p>لن يتم حفظ معلومات البطاقة</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
