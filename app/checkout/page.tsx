"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { PaymentForm } from "@/components/checkout/payment-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { Loader2 } from "lucide-react"

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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center text-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">عربة التسوق فارغة</h1>
            <p className="text-gray-600 mb-6">لا يمكنك المتابعة إلى الدفع بعربة فارغة.</p>
            <Button onClick={() => router.push("/")}>العودة إلى التسوق</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">إتمام الطلب</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <ShippingForm form={form} />
                <PaymentForm form={form} />
              </div>
              <div className="lg:col-span-1">
                <OrderSummary />
                <Button type="submit" className="w-full mt-6" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : (
                    `ادفع ${totalPrice.toFixed(2)} دينار`
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
