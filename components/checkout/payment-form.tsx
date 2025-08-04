import { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreditCard, Calendar, Lock } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

interface PaymentFormProps {
  form: UseFormReturn<any>
}

export function PaymentForm({ form }: PaymentFormProps) {
  return (
    <div className="space-y-6">
      {/* Accepted Cards */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-slate-600">البطاقات المقبولة:</span>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">Visa</Badge>
          <Badge variant="outline" className="text-xs">Mastercard</Badge>
          <Badge variant="outline" className="text-xs">Mada</Badge>
        </div>
      </div>

      <FormField
        control={form.control}
        name="cardName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-base font-medium">
              <CreditCard className="h-4 w-4 text-slate-500" />
              الاسم على البطاقة
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="كما هو مكتوب على البطاقة" 
                className="h-12 text-base border-slate-200 focus:border-primary" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">رقم البطاقة</FormLabel>
            <FormControl>
              <Input 
                placeholder="1234 5678 9012 3456" 
                className="h-12 text-base border-slate-200 focus:border-primary font-mono" 
                maxLength={16}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cardExpiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <Calendar className="h-4 w-4 text-slate-500" />
                تاريخ الانتهاء
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="MM/YY" 
                  className="h-12 text-base border-slate-200 focus:border-primary font-mono" 
                  maxLength={5}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardCvc"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <Lock className="h-4 w-4 text-slate-500" />
                CVC
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="123" 
                  className="h-12 text-base border-slate-200 focus:border-primary font-mono" 
                  maxLength={4}
                  type="password"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">معاملة آمنة</h4>
            <p className="text-sm text-blue-700">
              جميع معلومات الدفع محمية بتشفير SSL 256-bit ولن يتم حفظها على خوادمنا.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
