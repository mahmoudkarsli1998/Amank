
// "use client";

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm, type SubmitHandler } from 'react-hook-form';
// import { z } from 'zod';
// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { useToast } from '@/hooks/use-toast';
// import { geographicRegions } from '@/lib/constants';
// import { UserPlus, Send, Check, ChevronsUpDown, Shield } from 'lucide-react';
// import { db } from '@/lib/firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { cn } from '@/lib/utils';
// import carBrandsData from '@/../car_brands_list.json';

// const currentYear = new Date().getFullYear();

// // Function to extract car brands from JSON data
// const getCarBrands = (): string[] => {
//   try {
//     if (Array.isArray(carBrandsData)) {
//       if (typeof carBrandsData[0] === 'string') {
//         return carBrandsData as unknown as string[];
//       }
//       if (typeof carBrandsData[0] === 'object') {
//         const brands = carBrandsData.map((item: any) => 
//           item.name || item.brand || item.make || item.manufacturer || Object.values(item)[0]
//         ).filter((brand): brand is string => typeof brand === 'string' && brand.length > 0);
//         return brands;
//       }
//     }
//     if (typeof carBrandsData === 'object' && !Array.isArray(carBrandsData) && carBrandsData !== null) {
//       const values = Object.values(carBrandsData as Record<string, any>);
//       const flatValues = values.flat();
//       return flatValues.filter((brand): brand is string => typeof brand === 'string' && brand.length > 0);
//     }
//     return [];
//   } catch (error) {
//     console.error('Error processing car brands data:', error);
//     return [];
//   }
// };

// const carBrands = getCarBrands();

// const leadSchema = z.object({
//   name: z.string().min(2, 'يجب أن يتكون الاسم من حرفين على الأقل').max(50, 'الاسم طويل جدًا'),
//   phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, 'يرجى إدخال رقم هاتف مصري صحيح يبدأ بـ 01'),
//   email: z.string().email('عنوان بريد إلكتروني غير صالح'),
//   vehicleType: z.string().min(1, 'نوع السيارة مطلوب'),
//   yearOfManufacture: z.coerce
//     .number()
//     .int()
//     .min(currentYear - 70, `يجب أن تكون سنة الصنع بعد ${currentYear - 70}`)
//     .max(currentYear + 1, `لا يمكن أن تكون سنة الصنع في المستقبل البعيد`),
//   region: z.string().min(1, 'المنطقة مطلوبة'),
//   message: z.string().max(500, 'الرسالة طويلة جدًا').optional(),
// });

// export type LeadFormValues = z.infer<typeof leadSchema>;

// export default function LeadCaptureForm() {
//   const { toast } = useToast();
//   const [open, setOpen] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string, firestoreDocId?: string} | null>(null);
  
//   const form = useForm<LeadFormValues>({
//     resolver: zodResolver(leadSchema),
//     defaultValues: {
//       yearOfManufacture: currentYear,
//       name: '',
//       phone: '',
//       email: '',
//       vehicleType: '',
//       region: '',
//       message: '',
//     }
//   });

//   // Check for selected plan in localStorage when component mounts
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedPlan = localStorage.getItem('selectedPlan');
//       if (storedPlan) {
//         try {
//           const planData = JSON.parse(storedPlan);
//           setSelectedPlan(planData);
//         } catch (error) {
//           console.error('Error parsing stored plan data:', error);
//         }
//       }
//     }
//   }, []);

//   const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

//   const processSubmit: SubmitHandler<LeadFormValues> = async (data) => {
//     form.clearErrors();
//     try {
//       // Prepare the data to save, including selected plan if available
//       const leadData = {
//         ...data,
//         // Add plan name directly to the leads collection
//         planName: selectedPlan?.name || null,
//         planPrice: selectedPlan?.price || null,
//         selectedPlan: selectedPlan ? {
//           planName: selectedPlan.name,
//           planPrice: selectedPlan.price,
//           planSelectionDocId: selectedPlan.firestoreDocId
//         } : null,
//         submittedAt: serverTimestamp(),
//         // You can add user identification here if available
//         // userId: currentUser?.uid, // if you have user authentication
//         // userEmail: currentUser?.email,
//       };

//       // 1. Save lead data to Firestore
//       const docRef = await addDoc(collection(db, "leads"), leadData);
//       console.log('Lead data submitted to Firestore with ID: ', docRef.id);

//       toast({
//         title: 'تم إرسال الاستفسار بنجاح!',
//         description: selectedPlan 
//           ? `شكرًا لاهتمامك بخطة "${selectedPlan.name}". سنتواصل معك قريبًا لمناقشة عرض السعر.`
//           : 'شكرًا لاهتمامك. سنتواصل معك قريبًا لمناقشة عرض السعر.',
//         variant: 'default',
//       });
      
//       form.reset();
      
//       // Clear the selected plan from localStorage after successful submission
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('selectedPlan');
//         setSelectedPlan(null);
//       }

//       // 2. Send data to n8n Webhook (if URL is defined)
//       if (n8nWebhookUrl && n8nWebhookUrl !== "YOUR_N8N_WEBHOOK_URL_HERE") {
//         try {
//           const response = await fetch(n8nWebhookUrl, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ ...leadData, firestoreDocId: docRef.id }),
//           });

//           if (response.ok) {
//             console.log('Lead data successfully sent to n8n webhook.');
//           } else {
//             console.error('Failed to send lead data to n8n webhook:', response.status, await response.text());
//             toast({
//               title: 'تنبيه بخصوص الأتمتة',
//               description: 'تم حفظ طلبك، ولكن حدث خطأ بسيط في إرسال البيانات لنظام الأتمتة. لا تقلق، فريقنası سيتابع طلبك.',
//               variant: 'default',
//             });
//           }
//         } catch (n8nError) {
//           console.error('Error sending data to n8n webhook:', n8nError);
//            toast({
//               title: 'تنبيه بخصوص الأتمتة',
//               description: 'تم حفظ طلبك، ولكن تعذر الاتصال بنظام الأتمتة حاليًا. فريقنا سيتابع طلبك.',
//               variant: 'default',
//             });
//         }
//       } else if (n8nWebhookUrl === "YOUR_N8N_WEBHOOK_URL_HERE") {
//         console.warn("n8n webhook URL is set to placeholder. Skipping send to n8n.");
//       }

//     } catch (error) {
//       console.error('Failed to submit lead to Firestore:', error);
//       toast({
//         title: 'فشل إرسال الاستفسار',
//         description: 'حدث خطأ أثناء محاولة إرسال بياناتك. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
//         variant: 'destructive',
//       });
//     }
//   };

//   return (
//     <Card className="w-full max-w-lg rounded-2xl border border-white/10 dark:border-white/5 bg-white/90 dark:bg-black/40 shadow-2xl backdrop-blur-xl">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-2xl font-semibold leading-tight tracking-[-0.025em] text-slate-900 dark:text-slate-100">
//           <UserPlus className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
//           احصل على عرض سعر شخصي
//         </CardTitle>
//         <CardDescription>
//           {selectedPlan ? (
//             <div className="flex items-center gap-2 mt-2 p-3 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-500/30 rounded-lg backdrop-blur-sm">
//               <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
//               <span className="text-sm font-normal leading-relaxed text-slate-700 dark:text-slate-300">
//                 الخطة المختارة: <strong className="text-emerald-700 dark:text-emerald-300">{selectedPlan.name}</strong> - {selectedPlan.price}
//               </span>
//             </div>
//           ) : (
//             <span className="text-slate-600 dark:text-slate-400">
//               املأ النموذج أدناه وسيقوم خبيرنا بالاتصال بك لتقديم أفضل عرض سعر لتأمين سيارتك.
//             </span>
//           )}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(processSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-slate-800 dark:text-slate-200">الاسم بالكامل</FormLabel>
//                   <FormControl>
//                     <Input 
//                       placeholder="على سبيل المثال: محمد أحمد" 
//                       className="rounded-lg border-white/30 dark:border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-slate-800 dark:text-slate-200">رقم الهاتف</FormLabel>
//                   <FormControl>
//                     <Input 
//                       type="tel" 
//                       placeholder="مثال: 01012345678" 
//                       className="rounded-lg border-white/30 dark:border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-slate-800 dark:text-slate-200">عنوان البريد الإلكتروني</FormLabel>
//                   <FormControl>
//                     <Input 
//                       type="email" 
//                       placeholder="مثال: example@mail.com" 
//                       className="rounded-lg border-white/30 dark:border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
// <FormField
//   control={form.control}
//   name="vehicleType"
//   render={({ field }) => (
//     <FormItem className="flex flex-col">
//       <FormLabel className="text-slate-800 dark:text-slate-200">نوع السيارة</FormLabel>
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <FormControl>
//             <Button
//               role="combobox"
//               aria-expanded={open}
//               className={cn(
//                 "w-full justify-between rounded-lg border border-white/30 dark:border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/20 focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 shadow-lg hover:shadow-xl",
//                 !field.value && "text-slate-500 dark:text-slate-400"
//               )}
//             >
//               {field.value
//                 ? carBrands.find((brand) => brand === field.value) || field.value
//                 : "اختر نوع السيارة"}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </FormControl>
//         </PopoverTrigger>
//         <PopoverContent className="w-full p-0 rounded-lg border border-white/30 dark:border-white/20 bg-white/80 dark:bg-black/70 backdrop-blur-xl shadow-2xl" align="start">
//           <Command className="bg-transparent">
//             <CommandInput 
//               placeholder="ابحث عن نوع السيارة..." 
//               className="h-9 border-0 border-b border-white/20 dark:border-white/10 bg-transparent focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400" 
//             />
//             <CommandList>
//               <CommandEmpty className="text-slate-600 dark:text-slate-400">لم يتم العثور على نوع السيارة.</CommandEmpty>
//               <CommandGroup>
//                 {carBrands.map((brand) => (
//                   <CommandItem
//                     key={brand}
//                     value={brand}
//                     onSelect={(currentValue: string) => {
//                       field.onChange(currentValue === field.value ? "" : brand);
//                       setOpen(false);
//                     }}
//                     className="hover:bg-emerald-100/40 dark:hover:bg-emerald-800/20 data-[selected=true]:bg-emerald-200/60 dark:data-[selected=true]:bg-emerald-700/30 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm rounded-md mx-1"
//                   >
//                     <Check
//                       className={cn(
//                         "mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400",
//                         field.value === brand ? "opacity-100" : "opacity-0"
//                       )}
//                     />
//                     {brand}
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//       <FormMessage />
//     </FormItem>
//   )}
// />
//             <FormField
//               control={form.control}
//               name="yearOfManufacture"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-slate-800 dark:text-slate-200">سنة صنع السيارة</FormLabel>
//                   <FormControl>
//                     <Input 
//                       type="number" 
//                       placeholder="مثال: 2022" 
//                       className="rounded-lg border-white/30 dark:border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
//                       {...field} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="region"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-slate-800 dark:text-slate-200">المنطقة/المحافظة</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger className="rounded-lg border-white/30 dark:border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100">
//                         <SelectValue placeholder="اختر منطقتك" className="placeholder:text-slate-500 dark:placeholder:text-slate-400" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent className="rounded-lg border border-white/30 dark:border-white/20 bg-white/90 dark:bg-black/80 backdrop-blur-xl shadow-2xl">
//                       {geographicRegions.map((region) => (
//                         <SelectItem 
//                           key={region} 
//                           value={region}
//                           className="hover:bg-emerald-50/80 dark:hover:bg-emerald-900/30 focus:bg-emerald-100/80 dark:focus:bg-emerald-800/40 text-slate-900 dark:text-slate-100 transition-colors duration-200"
//                         >
//                           {region}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="message"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-slate-800 dark:text-slate-200">رسالة إضافية (اختياري)</FormLabel>
//                   <FormControl>
//                     <Textarea 
//                       placeholder="هل لديك أي استفسارات أو طلبات معينة؟" 
//                       className="rounded-lg border-white/30 dark:border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 resize-none"
//                       {...field} 
//                       rows={3} 
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button 
//               type="submit" 
//               className="w-full rounded-lg bg-gradient-to-r from-emerald-500/90 to-teal-600/90 dark:from-emerald-600/80 dark:to-teal-700/80 hover:from-emerald-600/90 hover:to-teal-700/90 dark:hover:from-emerald-700/80 dark:hover:to-teal-800/80 text-white shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 dark:border-white/10 transition-all duration-300 transform hover:scale-105" 
//               disabled={form.formState.isSubmitting}
//             >
//               {form.formState.isSubmitting ? 'لحظات من فضلك، جارٍ الإرسال...' : (
//                 <>
//                   <Send className="mr-2 h-4 w-4" /> إرسال طلب عرض السعر
//                 </>
//               )}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { geographicRegions } from '@/lib/constants';
import { UserPlus, Send, Check, ChevronsUpDown, Shield } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import carBrandsData from '@/../car_brands_list.json';

const currentYear = new Date().getFullYear();

// Function to extract car brands from JSON data
const getCarBrands = (): string[] => {
  try {
    if (Array.isArray(carBrandsData)) {
      if (typeof carBrandsData[0] === 'string') {
        return carBrandsData as unknown as string[];
      }
      if (typeof carBrandsData[0] === 'object') {
        const brands = carBrandsData.map((item: any) => 
          item.name || item.brand || item.make || item.manufacturer || Object.values(item)[0]
        ).filter((brand): brand is string => typeof brand === 'string' && brand.length > 0);
        return brands;
      }
    }
    if (typeof carBrandsData === 'object' && !Array.isArray(carBrandsData) && carBrandsData !== null) {
      const values = Object.values(carBrandsData as Record<string, any>);
      const flatValues = values.flat();
      return flatValues.filter((brand): brand is string => typeof brand === 'string' && brand.length > 0);
    }
    return [];
  } catch (error) {
    console.error('Error processing car brands data:', error);
    return [];
  }
};

const carBrands = getCarBrands();

const leadSchema = z.object({
  name: z.string().min(2, 'يجب أن يتكون الاسم من حرفين على الأقل').max(50, 'الاسم طويل جدًا'),
  phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, 'يرجى إدخال رقم هاتف مصري صحيح يبدأ بـ 01'),
  email: z.string().email('عنوان بريد إلكتروني غير صالح'),
  vehicleType: z.string().min(1, 'نوع السيارة مطلوب'),
  yearOfManufacture: z.coerce
    .number()
    .int()
    .min(currentYear - 70, `يجب أن تكون سنة الصنع بعد ${currentYear - 70}`)
    .max(currentYear + 1, `لا يمكن أن تكون سنة الصنع في المستقبل البعيد`),
  region: z.string().min(1, 'المنطقة مطلوبة'),
  message: z.string().max(500, 'الرسالة طويلة جدًا').optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

export default function LeadCaptureForm() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string, firestoreDocId?: string} | null>(null);
  
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      yearOfManufacture: currentYear,
      name: '',
      phone: '',
      email: '',
      vehicleType: '',
      region: '',
      message: '',
    }
  });

  // Check for selected plan in localStorage when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPlan = localStorage.getItem('selectedPlan');
      if (storedPlan) {
        try {
          const planData = JSON.parse(storedPlan);
          setSelectedPlan(planData);
        } catch (error) {
          console.error('Error parsing stored plan data:', error);
        }
      }
    }
  }, []);

  const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

  const processSubmit: SubmitHandler<LeadFormValues> = async (data) => {
    form.clearErrors();
    try {
      const leadData = {
        ...data,
        planName: selectedPlan?.name || null,
        planPrice: selectedPlan?.price || null,
        selectedPlan: selectedPlan ? {
          planName: selectedPlan.name,
          planPrice: selectedPlan.price,
          planSelectionDocId: selectedPlan.firestoreDocId
        } : null,
        submittedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "leads"), leadData);
      console.log('Lead data submitted to Firestore with ID: ', docRef.id);

      toast({
        title: 'تم إرسال الاستفسار بنجاح!',
        description: selectedPlan 
          ? `شكرًا لاهتمامك بخطة "${selectedPlan.name}". سنتواصل معك قريبًا لمناقشة عرض السعر.`
          : 'شكرًا لاهتمامك. سنتواصل معك قريبًا لمناقشة عرض السعر.',
        variant: 'default',
      });
      
      form.reset();
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('selectedPlan');
        setSelectedPlan(null);
      }

      if (n8nWebhookUrl && n8nWebhookUrl !== "YOUR_N8N_WEBHOOK_URL_HERE") {
        try {
          const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...leadData, firestoreDocId: docRef.id }),
          });

          if (response.ok) {
            console.log('Lead data successfully sent to n8n webhook.');
          } else {
            console.error('Failed to send lead data to n8n webhook:', response.status, await response.text());
            toast({
              title: 'تنبيه بخصوص الأتمتة',
              description: 'تم حفظ طلبك، ولكن حدث خطأ بسيط في إرسال البيانات لنظام الأتمتة. لا تقلق، فريقنası سيتابع طلبك.',
              variant: 'default',
            });
          }
        } catch (n8nError) {
          console.error('Error sending data to n8n webhook:', n8nError);
           toast({
              title: 'تنبيه بخصوص الأتمتة',
              description: 'تم حفظ طلبك، ولكن تعذر الاتصال بنظام الأتمتة حاليًا. فريقنا سيتابع طلبك.',
              variant: 'default',
            });
        }
      } else if (n8nWebhookUrl === "YOUR_N8N_WEBHOOK_URL_HERE") {
        console.warn("n8n webhook URL is set to placeholder. Skipping send to n8n.");
      }

    } catch (error) {
      console.error('Failed to submit lead to Firestore:', error);
      toast({
        title: 'فشل إرسال الاستفسار',
        description: 'حدث خطأ أثناء محاولة إرسال بياناتك. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-lg rounded-2xl border border-white/10 dark:border-slate-700/30 bg-white/90 dark:bg-slate-900/60 shadow-2xl backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold leading-tight tracking-[-0.025em] text-slate-900 dark:text-slate-100">
          <UserPlus className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          احصل على عرض سعر شخصي
        </CardTitle>
        <CardDescription>
          {selectedPlan ? (
            <div className="flex items-center gap-2 mt-2 p-3 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-500/30 rounded-lg backdrop-blur-sm">
              <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-normal leading-relaxed text-slate-700 dark:text-slate-300">
                الخطة المختارة: <strong className="text-emerald-700 dark:text-emerald-300">{selectedPlan.name}</strong> - {selectedPlan.price}
              </span>
            </div>
          ) : (
            <span className="text-slate-600 dark:text-slate-400">
              املأ النموذج أدناه وسيقوم خبيرنا بالاتصال بك لتقديم أفضل عرض سعر لتأمين سيارتك.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800 dark:text-slate-200">الاسم بالكامل</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="على سبيل المثال: محمد أحمد" 
                      className="rounded-lg border-white/30 dark:border-slate-600/30 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
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
                  <FormLabel className="text-slate-800 dark:text-slate-200">رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="مثال: 01012345678" 
                      className="rounded-lg border-white/30 dark:border-slate-600/30 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800 dark:text-slate-200">عنوان البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="مثال: example@mail.com" 
                      className="rounded-lg border-white/30 dark:border-slate-600/30 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
<FormField
  control={form.control}
  name="vehicleType"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel className="text-slate-800 dark:text-slate-200">نوع السيارة</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline" // <--- ADD THIS LINE
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between rounded-lg border border-white/30 dark:border-slate-600/30 bg-white/60 dark:bg-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/20 focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 shadow-lg hover:shadow-xl",
                !field.value && "text-slate-500 dark:text-slate-400"
              )}
            >
              {field.value
                ? carBrands.find((brand) => brand === field.value) || field.value
                : "اختر نوع السيارة"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 rounded-lg border border-white/30 dark:border-slate-700/30 bg-white/80 dark:bg-slate-800/75 backdrop-blur-xl shadow-2xl" align="start">
          <Command className="bg-transparent">
            <CommandInput 
              placeholder="ابحث عن نوع السيارة..." 
              className="h-9 border-0 border-b border-white/20 dark:border-slate-700/30 bg-transparent focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400" 
            />
            <CommandList>
              <CommandEmpty className="text-slate-600 dark:text-slate-400">لم يتم العثور على نوع السيارة.</CommandEmpty>
              <CommandGroup>
                {carBrands.map((brand) => (
                  <CommandItem
                    key={brand}
                    value={brand}
                    onSelect={(currentValue: string) => {
                      field.onChange(currentValue === field.value ? "" : brand);
                      setOpen(false);
                    }}
                    className="hover:bg-emerald-100/40 dark:hover:bg-emerald-800/20 data-[selected=true]:bg-emerald-200/60 dark:data-[selected=true]:bg-emerald-700/30 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm rounded-md mx-1"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400",
                        field.value === brand ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {brand}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )}
/>
            <FormField
              control={form.control}
              name="yearOfManufacture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800 dark:text-slate-200">سنة صنع السيارة</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="مثال: 2022" 
                      className="rounded-lg border-white/30 dark:border-slate-600/30 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800 dark:text-slate-200">المنطقة/المحافظة</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-lg border-white/30 dark:border-slate-600/30 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100">
                        <SelectValue placeholder="اختر منطقتك" className="placeholder:text-slate-500 dark:placeholder:text-slate-400" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-lg border border-white/30 dark:border-slate-700/30 bg-white/90 dark:bg-slate-800/85 backdrop-blur-xl shadow-2xl">
                      {geographicRegions.map((region) => (
                        <SelectItem 
                          key={region} 
                          value={region}
                          className="hover:bg-emerald-50/80 dark:hover:bg-emerald-900/30 focus:bg-emerald-100/80 dark:focus:bg-emerald-800/40 text-slate-900 dark:text-slate-100 transition-colors duration-200"
                        >
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800 dark:text-slate-200">رسالة إضافية (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="هل لديك أي استفسارات أو طلبات معينة؟" 
                      className="rounded-lg border-white/30 dark:border-slate-600/30 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 resize-none"
                      {...field} 
                      rows={3} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full rounded-lg bg-gradient-to-r from-emerald-500/90 to-teal-600/90 dark:from-emerald-600/80 dark:to-teal-700/80 hover:from-emerald-600/90 hover:to-teal-700/90 dark:hover:from-emerald-700/80 dark:hover:to-teal-800/80 text-white shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 dark:border-slate-600/20 transition-all duration-300 transform hover:scale-105" 
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'لحظات من فضلك، جارٍ الإرسال...' : (
                <>
                  <Send className="mr-2 h-4 w-4" /> إرسال طلب عرض السعر
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}