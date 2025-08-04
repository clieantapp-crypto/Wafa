"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId")

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 flex items-center justify-center py-12 md:py-24">
        <Card className="w-full max-w-lg text-center p-8">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="mt-6 text-2xl md:text-3xl font-bold">شكراً لك على طلبك!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              لقد تم تأكيد طلبك بنجاح. ستصلك رسالة بريد إلكتروني قريبًا تحتوي على تفاصيل طلبك.
            </p>
            {orderId && (
              <p className="text-lg font-medium bg-gray-100 p-3 rounded-md">
                رقم الطلب: <span className="font-bold text-primary">{orderId}</span>
              </p>
            )}
            <Button onClick={() => router.push("/")} className="mt-6 w-full" size="lg">
              العودة إلى الصفحة الرئيسية
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
