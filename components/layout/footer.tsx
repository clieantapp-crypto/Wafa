import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
      <p className="text-xs text-gray-500">&copy; 2025 شركة مياه نقاء. جميع الحقوق محفوظة.</p>
      <nav className="sm:mr-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          شروط الخدمة
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          سياسة الخصوصية
        </Link>
      </nav>
    </footer>
  )
}
