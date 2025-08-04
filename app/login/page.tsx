"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll"
import { Loader2, Mail, Lock, User, Eye, EyeOff, Shield, CheckCircle, AlertCircle, ArrowRight, Droplets } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const router = useRouter()

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    setPasswordStrength(strength)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500"
    if (passwordStrength <= 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "ضعيفة"
    if (passwordStrength <= 3) return "متوسطة"
    return "قوية"
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await signIn(email, password)
      router.push("/account")
    } catch (error) {
      // Error is handled in the context
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await signUp(email, password, name)
      router.push("/account")
    } catch (error) {
      // Error is handled in the context
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
      router.push("/account")
    } catch (error) {
      // Error is handled in the context
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl -z-10" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Droplets className="h-16 w-16 text-blue-500 animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Shield className="h-20 w-20 text-cyan-500 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>


      <main className="flex-1 flex items-center justify-center py-16 md:py-24 px-4">
        <div className="w-full max-w-md">
          <AnimateOnScroll>
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
                <User className="h-4 w-4" />
                حسابك الشخصي
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                مرحباً بك في
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  نقاء
                </span>
              </h1>
              <p className="text-gray-600">انضم إلينا واستمتع بتجربة مياه استثنائية</p>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  تسجيل الدخول
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  إنشاء حساب
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-xl">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold text-gray-900">تسجيل الدخول</CardTitle>
                    <CardDescription className="text-gray-600">
                      ادخل بياناتك للوصول إلى حسابك والاستمتاع بخدماتنا المميزة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Google Sign In */}
                    <Button
                      variant="outline"
                      className="w-full h-12 bg-white hover:bg-gray-50 border-gray-200 transition-all duration-300 hover:shadow-md"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      ) : (
                        <svg className="ml-2 h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      )}
                      تسجيل الدخول بـ Google
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-4 text-gray-500 font-medium">أو</span>
                      </div>
                    </div>

                    {/* Sign In Form */}
                    <form onSubmit={handleSignIn} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                          البريد الإلكتروني
                        </Label>
                        <div className="relative">
                          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-700 font-medium">
                          كلمة المرور
                        </Label>
                        <div className="relative">
                          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="pr-10 pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                            required
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id="remember"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                          />
                          <Label htmlFor="remember" className="text-sm text-gray-600">
                            تذكرني
                          </Label>
                        </div>
                        <Link
                          href="/forgot-password"
                          className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          نسيت كلمة المرور؟
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                            جاري تسجيل الدخول...
                          </>
                        ) : (
                          <>
                            <ArrowRight className="ml-2 h-5 w-5" />
                            تسجيل الدخول
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signup">
                <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-xl">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold text-gray-900">إنشاء حساب جديد</CardTitle>
                    <CardDescription className="text-gray-600">
                      انضم إلى عائلة نقاء واستمتع بتجربة مياه استثنائية
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Google Sign Up */}
                    <Button
                      variant="outline"
                      className="w-full h-12 bg-white hover:bg-gray-50 border-gray-200 transition-all duration-300 hover:shadow-md"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      ) : (
                        <svg className="ml-2 h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      )}
                      إنشاء حساب بـ Google
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-4 text-gray-500 font-medium">أو</span>
                      </div>
                    </div>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSignUp} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                          الاسم الكامل
                        </Label>
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="اسمك الكامل"
                            className="pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-gray-700 font-medium">
                          البريد الإلكتروني
                        </Label>
                        <div className="relative">
                          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="signup-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-gray-700 font-medium">
                          كلمة المرور
                        </Label>
                        <div className="relative">
                          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="signup-password"
                            name="password"
                            type={showSignupPassword ? "text" : "password"}
                            className="pr-10 pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                            required
                            disabled={isLoading}
                            onChange={(e) => checkPasswordStrength(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                          >
                            {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>

                        {/* Password Strength Indicator */}
                        {passwordStrength > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-600">{getPasswordStrengthText()}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-start space-x-2 space-x-reverse">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                          أوافق على{" "}
                          <Link href="/terms" className="text-blue-600 hover:underline">
                            الشروط والأحكام
                          </Link>{" "}
                          و{" "}
                          <Link href="/privacy" className="text-blue-600 hover:underline">
                            سياسة الخصوصية
                          </Link>
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                            جاري إنشاء الحساب...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="ml-2 h-5 w-5" />
                            إنشاء حساب
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50/80 backdrop-blur-sm border border-blue-200/50 rounded-xl">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">حماية بياناتك أولويتنا</p>
                  <p className="text-blue-700">
                    نستخدم أحدث تقنيات التشفير لحماية معلوماتك الشخصية وضمان أمان حسابك.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                العودة إلى الصفحة الرئيسية
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </main>
    </div>
  )
}
