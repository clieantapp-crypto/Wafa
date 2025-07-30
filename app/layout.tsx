import type React from "react"
import type { Metadata } from "next"
import { Tajawal } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"

export const metadata: Metadata = {
  title: "لأ - المياه النقية من الينابيع العربية",
  description: "تجربة لأ الينابيع العربية الأصيلة، توصيل مباشر إلى منزلك.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "لأ - المياه النقية من الينابيع العربية",
    description: "مياهنا مستخرجة من ينابيع عربية عريقة، محفوظة في حالتها البكر لتروي عطشك وتنعش روحك.",
    url: siteUrl,
    siteName: "لأ",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "مياه لأ الفاخرة",
      },
    ],
    locale: "ar_JO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "لأ - المياه النقية من الينابيع العربية",
    description: "تجربة لأ الينابيع العربية الأصيلة، توصيل مباشر إلى منزلك.",
    images: ["/og-image.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cn("bg-secondary text-gray-800", tajawal.className)}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
