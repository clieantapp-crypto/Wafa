import { Check } from 'lucide-react'
import { cn } from "@/lib/utils"

interface CheckoutProgressProps {
  currentStep: number
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const steps = [
    { id: 1, name: "معلومات الشحن", completed: currentStep > 1 },
    { id: 2, name: "معلومات الدفع", completed: currentStep > 2 },
    { id: 3, name: "تأكيد الطلب", completed: false },
  ]

  return (
    <div className="mb-12">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200",
                  step.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : currentStep === step.id
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-slate-300 text-slate-400"
                )}
              >
                {step.completed ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium",
                  step.completed || currentStep === step.id
                    ? "text-slate-900"
                    : "text-slate-500"
                )}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-16 h-0.5 mx-4 transition-all duration-200",
                  step.completed ? "bg-green-500" : "bg-slate-300"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
