"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { getUserOrders, type Order } from "@/lib/firebase/orders"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"
import { Loader2, User, Mail, Calendar, Package, ShoppingBag, Settings, MapPin, Phone, CreditCard, Heart, Bell, Shield, Edit, LogOut, TrendingUp, Clock, CheckCircle, Truck, Star, Eye, Download, Droplets } from 'lucide-react'

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
}

const statusLabels = {
  pending: "قيد الانتظار",
  confirmed: "مؤكد",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغي",
}

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  shipped: Truck,
  delivered: Package,
  cancelled: ShoppingBag,
}

export default function AccountPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

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

  // Calculate statistics
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)
  const completedOrders = orders.filter((order) => order.status === "delivered").length
  const pendingOrders = orders.filter((order) => order.status === "pending").length

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">جاري تحميل حسابك...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl -z-10" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Droplets className="h-16 w-16 text-blue-500 animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <User className="h-20 w-20 text-cyan-500 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <Header />

      <main className="flex-1 py-16 md:py-24 relative">
        <div className="container max-w-7xl px-4 md:px-6">
          {/* Welcome Section */}
          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-sm">
              <User className="h-4 w-4" />
              حسابك الشخصي
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
              مرحباً،
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                {user.displayName || "عزيزي العميل"}
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              إدارة معلومات حسابك، تتبع طلباتك، واستمتع بتجربة تسوق مخصصة لك
            </p>
          </AnimateOnScroll>

          {/* Statistics Cards */}
          <AnimateOnScroll delay="100ms" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                    <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{totalSpent.toFixed(2)} د.أ</p>
                    <p className="text-sm text-gray-600">إجمالي المشتريات</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
                    <p className="text-sm text-gray-600">طلبات مكتملة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimateOnScroll>

          {/* Main Content Tabs */}
          <AnimateOnScroll delay="200ms">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <User className="h-4 w-4 ml-2" />
                  نظرة عامة
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <Package className="h-4 w-4 ml-2" />
                  طلباتي
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <Settings className="h-4 w-4 ml-2" />
                  الملف الشخصي
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <Heart className="h-4 w-4 ml-2" />
                  التفضيلات
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Summary */}
                  <Card className="lg:col-span-1 bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
                    <CardHeader className="text-center pb-6">
                      <div className="relative mx-auto mb-4">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                          <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-2xl font-bold">
                            {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{user.displayName || "عميل نقاء"}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">عضو منذ</p>
                          <p className="text-sm text-gray-600">
                            {user.metadata?.creationTime
                              ? new Date(user.metadata.creationTime).toLocaleDateString("ar-JO", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "غير محدد"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Shield className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">حالة الحساب</p>
                          <p className="text-sm text-green-600 font-medium">مفعل ومؤكد</p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-6"
                        onClick={() => setActiveTab("profile")}
                      >
                        <Edit className="h-4 w-4 ml-2" />
                        تعديل الملف الشخصي
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Recent Orders */}
                  <Card className="lg:col-span-2 bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          الطلبات الأخيرة
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveTab("orders")}
                        >
                          عرض الكل
                          <Eye className="h-4 w-4 mr-2" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {ordersLoading ? (
                        <div className="flex justify-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                        </div>
                      ) : orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.slice(0, 3).map((order) => {
                            const StatusIcon = statusIcons[order.status]
                            return (
                              <div
                                key={order.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <StatusIcon className="h-5 w-5 text-gray-600" />
                                  </div>
                                  <div>
                                    <p className="font-semibold">طلب #{order.id?.slice(-8)}</p>
                                    <p className="text-sm text-gray-500">
                                      {new Date(order.createdAt).toLocaleDateString("ar-JO")}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left">
                                  <Badge className={statusColors[order.status]}>
                                    {statusLabels[order.status]}
                                  </Badge>
                                  <p className="text-sm font-semibold mt-1">{order.total.toFixed(2)} د.أ</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>لا توجد طلبات سابقة</p>
                          <Button className="mt-4" onClick={() => router.push("/products")}>
                            ابدأ التسوق
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-8">
                <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      جميع طلباتي ({orders.length})
                    </CardTitle>
                    <CardDescription>تاريخ كامل لجميع طلباتك</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {ordersLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                      </div>
                    ) : orders.length > 0 ? (
                      <div className="space-y-6">
                        {orders.map((order) => {
                          const StatusIcon = statusIcons[order.status]
                          return (
                            <div
                              key={order.id}
                              className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-md transition-all duration-300"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                                    <StatusIcon className="h-6 w-6 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-lg">طلب #{order.id?.slice(-8)}</p>
                                    <p className="text-sm text-gray-500">
                                      {new Date(order.createdAt).toLocaleDateString("ar-JO", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left">
                                  <Badge className={statusColors[order.status]}>
                                    {statusLabels[order.status]}
                                  </Badge>
                                </div>
                              </div>

                              <div className="space-y-3 mb-4">
                                {order.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-lg">💧</span>
                                      </div>
                                      <span className="font-medium">{item.name}</span>
                                      <span className="text-gray-500">× {item.quantity}</span>
                                    </div>
                                    <span className="font-semibold">
                                      {(item.price * item.quantity).toFixed(2)} د.أ
                                    </span>
                                  </div>
                                ))}
                              </div>

                              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-4">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 ml-2" />
                                    تفاصيل
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 ml-2" />
                                    فاتورة
                                  </Button>
                                </div>
                                <div className="text-left">
                                  <span className="text-sm text-gray-500">المجموع الكلي</span>
                                  <p className="text-xl font-bold text-blue-600">{order.total.toFixed(2)} د.أ</p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-gray-300" />
                        <h3 className="text-xl font-semibold mb-2">لا توجد طلبات</h3>
                        <p className="mb-6">ابدأ التسوق لترى طلباتك هنا</p>
                        <Button
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                          onClick={() => router.push("/products")}
                        >
                          تصفح المنتجات
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        المعلومات الشخصية
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <User className="h-5 w-5 text-gray-500" />
                        <div className="flex-1">
                          <p className="font-medium">الاسم الكامل</p>
                          <p className="text-gray-600">{user.displayName || "غير محدد"}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <div className="flex-1">
                          <p className="font-medium">البريد الإلكتروني</p>
                          <p className="text-gray-600">{user.email}</p>
                        </div>
                        <Badge variant="secondary">مؤكد</Badge>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div className="flex-1">
                          <p className="font-medium">رقم الهاتف</p>
                          <p className="text-gray-600">غير محدد</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        عناوين التوصيل
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-500">
                        <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>لا توجد عناوين محفوظة</p>
                        <Button variant="outline" className="mt-4">
                          إضافة عنوان جديد
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        إعدادات الإشعارات
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium">إشعارات الطلبات</p>
                          <p className="text-sm text-gray-600">تحديثات حالة الطلب</p>
                        </div>
                        <Button variant="outline" size="sm">
                          مفعل
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium">العروض والخصومات</p>
                          <p className="text-sm text-gray-600">إشعارات العروض الخاصة</p>
                        </div>
                        <Button variant="outline" size="sm">
                          مفعل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        المفضلة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-500">
                        <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>لا توجد منتجات مفضلة</p>
                        <Button variant="outline" className="mt-4" onClick={() => router.push("/products")}>
                          تصفح المنتجات
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </AnimateOnScroll>

          {/* Logout Section */}
          <AnimateOnScroll delay="300ms" className="mt-12 text-center">
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="text-center">
                  <LogOut className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">تسجيل الخروج</h3>
                  <p className="text-gray-600 mb-6">هل تريد تسجيل الخروج من حسابك؟</p>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4 ml-2" />
                    تسجيل الخروج
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </main>

      <Footer />
    </div>
  )
}
