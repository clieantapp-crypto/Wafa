import { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, User } from 'lucide-react'

interface ShippingFormProps {
  form: UseFormReturn<any>
}

export function ShippingForm({ form }: ShippingFormProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-base font-medium">
              <User className="h-4 w-4 text-slate-500" />
              الاسم الكامل
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="أدخل اسمك الكامل" 
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
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-base font-medium">
              <Phone className="h-4 w-4 text-slate-500" />
              رقم الهاتف
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="07xxxxxxxx" 
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
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-base font-medium">
              <MapPin className="h-4 w-4 text-slate-500" />
              العنوان التفصيلي
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="الشارع، رقم البناية، الحي" 
                className="h-12 text-base border-slate-200 focus:border-primary" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">المدينة</FormLabel>
              <FormControl>
                <Input 
                  placeholder="عمان" 
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
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">الدولة</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 text-base border-slate-200 focus:border-primary">
                    <SelectValue placeholder="اختر الدولة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="الأردن">الأردن</SelectItem>
                  <SelectItem value="فلسطين">فلسطين</SelectItem>
                  <SelectItem value="لبنان">لبنان</SelectItem>
                  <SelectItem value="سوريا">سوريا</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
