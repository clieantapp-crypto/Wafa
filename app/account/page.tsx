"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { getUserOrders, type Order } from "@/lib/firebase/orders"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Loader2, User, Mail, Calendar, Package, ShoppingBag } from "lucide-react"

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const statusLabels = {
  pending: "قيد الانتظار",
  confirmed: "مؤكد",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغي",
}

export default function AccountPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const userOrders = await getUserOrders(user.uid)
          setOrders(userOrders)
        } catch (error) {
          console.error("Error fetching orders:", error)
        } finally {
          setOrdersLoading(false)
        }
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">حسابي</h1>
            <p className="mt-2 text-gray-600">إدارة معلومات حسابك وطلباتك</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    معلومات الحساب
                  </CardTitle>
                  <CardDescription>بياناتك الشخصية المسجلة لدينا</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">الاسم</p>
                      <p className="text-gray-600">{user.displayName || "غير محدد"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">البريد الإلكتروني</p>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">تاريخ الانضمام</p>
                      <p className="text-gray-600">
                        {user.metadata.creationTime
                          ? new Date(user.metadata.creationTime).toLocaleDateString("ar-JO")
                          : "غير محدد"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <Button variant="outline" onClick={handleLogout}>
                  تسجيل الخروج
                </Button>
              </div>
            </div>

            {/* Orders */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    طلباتي ({orders.length})
                  </CardTitle>
                  <CardDescription>تاريخ طلباتك السابقة</CardDescription>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-semibold">طلب #{order.id?.slice(-8)}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString("ar-JO", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                            <Badge className={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
                          </div>

                          <div className="space-y-2 mb-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span>
                                  {item.name} × {item.quantity}
                                </span>
                                <span>{(item.price * item.quantity).toFixed(2)} دينار</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <span className="font-semibold">المجموع الكلي</span>
                            <span className="font-semibold text-primary">{order.total.toFixed(2)} دينار</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>لا توجد طلبات سابقة</p>
                      <p className="text-sm mt-1">ابدأ التسوق لترى طلباتك هنا</p>
                      <Button className="mt-4" onClick={() => router.push("/products")}>
                        تصفح المنتجات
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
