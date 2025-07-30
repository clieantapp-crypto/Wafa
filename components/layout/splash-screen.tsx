import { DropletsIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

interface SplashScreenProps {
  isVisible: boolean
}

export function SplashScreen({ isVisible }: SplashScreenProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-secondary transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="animate-pulse flex flex-col items-center gap-4">
        <DropletsIcon className="h-16 w-16 text-primary" />
        <span className="text-4xl font-bold text-primary">نقاء</span>
      </div>
    </div>
  )
}
