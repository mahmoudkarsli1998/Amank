
// "use client";
// import { useState, useEffect } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; 
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
// import { cn } from '@/lib/utils';
// import { Check, ChevronsUpDown, Calculator, CheckCircle, AlertCircle } from 'lucide-react';

// // Import the car data
// import carBrandsData from '@/../car_brands_list.json'; 
// import carModelsData from '@/../car_models_arabic.json';

// const currentYear = new Date().getFullYear();
// const years = Array.from({ length: 31 }, (_, i) => (currentYear - i).toString());

// type CarModels = { [key: string]: string[] };
// const typedCarModelsData: CarModels = carModelsData;

// // Updated schema to handle string inputs properly
// const calculatorSchema = z.object({
//   brand: z.string().min(1, 'الماركة مطلوبة'),
//   model: z.string().min(1, 'الموديل مطلوب'),
//   yearOfManufacture: z.string().min(1, 'سنة الصنع مطلوبة'),
//   marketValue: z.string().min(1, 'القيمة السوقية مطلوبة')
//     .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'القيمة السوقية يجب أن تكون رقماً موجباً')
//     .refine((val) => Number(val) >= 1000, 'القيمة السوقية تبدو منخفضة جداً'),
// });

// type FormData = z.infer<typeof calculatorSchema>;

// interface PremiumCalculatorProps {}

// export default function PremiumCalculator({}: PremiumCalculatorProps) {
//   const [estimatedPremium, setEstimatedPremium] = useState<string | null>(null);
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [calculationError, setCalculationError] = useState<string | null>(null);
//   const [availableModels, setAvailableModels] = useState<string[]>([]);
//   const [lastCalculatedData, setLastCalculatedData] = useState<FormData | null>(null);

//   const form = useForm<FormData>({
//     resolver: zodResolver(calculatorSchema),
//     defaultValues: {
//       brand: '',
//       model: '',
//       yearOfManufacture: currentYear.toString(),
//       marketValue: '',
//     },
//   });

//   const selectedBrand = form.watch('brand');

//   useEffect(() => {
//     if (selectedBrand && typedCarModelsData[selectedBrand]) {
//       setAvailableModels(typedCarModelsData[selectedBrand]);
//     } else {
//       setAvailableModels([]);
//     }
//     form.setValue('model', '');
//   }, [selectedBrand, form]);

//   const calculatePremium = (data: FormData): string => {
//     console.log("Calculating premium with data:", data);
    
//     const marketValue = Number(data.marketValue);
//     const currentYear = new Date().getFullYear();
//     const vehicleAge = currentYear - parseInt(data.yearOfManufacture);
    
//     let premiumRate: number;
    
//     // تطبيق النسب حسب عمر السيارة
//     if (vehicleAge <= 5) {
//         premiumRate = 0.02; // 2% للسيارات 5 سنوات أو أقل
//     } else {
//         premiumRate = 0.0225; // 2.25% للسيارات أكثر من 5 سنوات
//     }
    
//     const totalPremium = marketValue * premiumRate;
    
//     console.log(`Vehicle age: ${vehicleAge} years, Premium rate: ${premiumRate * 100}%`);
    
//     return `${Math.round(totalPremium)} جنيه مصري / سنة`;
//   };

//   const onSubmit = async (data: FormData) => {
//     setIsCalculating(true);
//     setCalculationError(null);
//     setEstimatedPremium(null);
//     console.log("Form submitted:", data);
//     await new Promise(resolve => setTimeout(resolve, 800));
//     try {
//       const finalPremium = calculatePremium(data);
//       setEstimatedPremium(finalPremium);
//       setLastCalculatedData(data);
//     } catch (error) {
//       console.error('Error calculating premium:', error);
//       const errorMessage = error instanceof Error ? error.message : 'حدث خطأ في الحساب';
//       setCalculationError(errorMessage);
//     } finally {
//       setIsCalculating(false);
//     }
//   };

//   // Clear results only when form data actually changes from the last calculated data
//   const currentFormData = form.watch();
//   useEffect(() => {
//     if (lastCalculatedData && estimatedPremium) {
//       const hasDataChanged = JSON.stringify(currentFormData) !== JSON.stringify(lastCalculatedData);
//       if (hasDataChanged) {
//         setEstimatedPremium(null);
//         setCalculationError(null);
//         setLastCalculatedData(null);
//       }
//     }
//   }, [currentFormData, lastCalculatedData, estimatedPremium]);

//   return (
//     <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 dark:bg-black/10 p-6 shadow-xl backdrop-blur-xl">
//       <div className="mb-6">
//         <h2 className="flex items-center gap-3 text-2xl font-semibold leading-tight tracking-[-0.025em] font-semibold tracking-tight text-slate-100">
//           <Calculator className="h-7 w-7 text-violet-400" />
//           قارن أفضل عروض التأمين لسيارتك
//         </h2>
//         <p className="text-sm font-normal leading-relaxed text-slate-300-foreground mt-1.5">أدخل بيانات سيارتك للمقارنة واختيار أنسب عرض</p>
//       </div>
      
//       <div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            
//             {/* Brand Combobox */}
//             <FormField
//               control={form.control}
//               name="brand"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="text-sm font-normal leading-relaxed font-medium text-slate-100/80">الماركة*</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           type="button"
//                           role="combobox"
//                           variant="outline"
//                           className={cn(
//                             "w-full justify-between rounded-lg border-white/30 bg-white/20 dark:border-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 text-white dark:text-white",
//                             !field.value && "text-slate-300 dark:text-slate-400"
//                           )}
//                         >
//                           {field.value || "اختر الماركة"}
//                           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent 
//                       className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 rounded-lg border-white/30 bg-white/50 dark:border-white/20 dark:bg-black/50 backdrop-blur-md shadow-lg"
//                     >
//                       <Command>
//                         <CommandInput className="h-9 rounded-t-lg border-0 border-b border-white/30 dark:border-white/20 bg-transparent focus:ring-0" placeholder="ابحث عن ماركة..." />
//                         <CommandList>
//                           <CommandEmpty>لم يتم العثور على الماركة.</CommandEmpty>
//                           <CommandGroup>
//                             {carBrandsData.map((brand) => (
//                               <CommandItem
//                                 className="hover:bg-white/10 dark:hover:bg-white/5 data-[selected=true]:bg-white/20 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-violet-400"
//                                 value={brand.value}
//                                 key={brand.value}
//                                 onSelect={() => form.setValue("brand", brand.value)}
//                               >
//                                 <Check className={cn("mr-2 h-4 w-4", brand.value === field.value ? "opacity-100" : "opacity-0")} />
//                                 {brand.name}
//                               </CommandItem>
//                             ))}
//                           </CommandGroup>
//                         </CommandList>
//                       </Command>
//                     </PopoverContent>
//                   </Popover>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Model Combobox */}
//             <FormField
//               control={form.control}
//               name="model"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="text-sm font-normal leading-relaxed font-medium text-slate-100/80">الموديل*</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           type="button"
//                           role="combobox"
//                           variant="outline"
//                           disabled={!selectedBrand || availableModels.length === 0}
//                           className={cn(
//                             "w-full justify-between rounded-lg border-white/30 bg-white/20 dark:border-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 text-white dark:text-white",
//                             !field.value && "text-slate-300 dark:text-slate-400"
//                           )}
//                         >
//                           {field.value || "اختر الموديل"}
//                           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent 
//                       className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 rounded-lg border-white/30 bg-white/50 dark:border-white/20 dark:bg-black/50 backdrop-blur-md shadow-lg"
//                     >
//                       <Command>
//                         <CommandInput className="h-9 rounded-t-lg border-0 border-b border-white/30 dark:border-white/20 bg-transparent focus:ring-0" placeholder="ابحث عن موديل..." />
//                         <CommandList>
//                           <CommandEmpty>لم يتم العثور على الموديل.</CommandEmpty>
//                           <CommandGroup>
//                             {availableModels.map((model) => (
//                               <CommandItem
//                                 className="hover:bg-white/10 dark:hover:bg-white/5 data-[selected=true]:bg-white/20 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-violet-400"
//                                 value={model}
//                                 key={model}
//                                 onSelect={() => form.setValue("model", model)}
//                               >
//                                 <Check className={cn("mr-2 h-4 w-4", model === field.value ? "opacity-100" : "opacity-0")} />
//                                 {model}
//                               </CommandItem>
//                             ))}
//                           </CommandGroup>
//                         </CommandList>
//                       </Command>
//                     </PopoverContent>
//                   </Popover>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Year of Manufacture Combobox */}
//             <FormField
//               control={form.control}
//               name="yearOfManufacture"
//               render={({ field }) => (
//                 <FormItem className="flex flex-col">
//                   <FormLabel className="text-sm font-normal leading-relaxed font-medium text-slate-100/80">سنة الصنع*</FormLabel>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <FormControl>
//                         <Button
//                           type="button"
//                           role="combobox"
//                           variant="outline"
//                           className={cn(
//                             "w-full justify-between rounded-lg border-white/30 bg-white/20 dark:border-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 text-white dark:text-white",
//                             !field.value && "text-slate-300 dark:text-slate-400"
//                           )}
//                         >
//                           {field.value || "اختر سنة الصنع"}
//                           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                         </Button>
//                       </FormControl>
//                     </PopoverTrigger>
//                     <PopoverContent 
//                       className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 rounded-lg border-white/30 bg-white/50 dark:border-white/20 dark:bg-black/50 backdrop-blur-md shadow-lg"
//                     >
//                       <Command>
//                         <CommandInput className="h-9 rounded-t-lg border-0 border-b border-white/30 dark:border-white/20 bg-transparent focus:ring-0" placeholder="ابحث عن سنة..." />
//                         <CommandList>
//                           <CommandEmpty>لم يتم العثور على السنة.</CommandEmpty>
//                           <CommandGroup>
//                             {years.map((year) => (
//                               <CommandItem
//                                 className="hover:bg-white/10 dark:hover:bg-white/5 data-[selected=true]:bg-white/20 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-violet-400"
//                                 value={year}
//                                 key={year}
//                                 onSelect={() => form.setValue("yearOfManufacture", year)}
//                               >
//                                 <Check className={cn("mr-2 h-4 w-4", year === field.value ? "opacity-100" : "opacity-0")} />
//                                 {year}
//                               </CommandItem>
//                             ))}
//                           </CommandGroup>
//                         </CommandList>
//                       </Command>
//                     </PopoverContent>
//                   </Popover>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Market Value Input */}
//             <FormField
//               control={form.control}
//               name="marketValue"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-sm font-normal leading-relaxed font-medium text-slate-100/80">القيمة السوقية للسيارة*</FormLabel>
//                   <FormControl>
//                     <Input 
//                       type="number" 
//                       placeholder="مثال: 85000" 
//                       className="rounded-lg border-white/30 bg-white/20 dark:border-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 focus-visible:ring-violet-400/50 dark:focus-visible:ring-violet-300/50 focus-visible:ring-offset-0 focus-visible:ring-2"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormDescription className="text-xs font-medium tracking-wide text-slate-100/60">
//                     أدخل القيمة التقديرية الحالية لسيارتك بالجنيه المصري.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button 
//               type="submit"
//               variant="outline"
//               className="w-full rounded-lg bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20 dark:from-violet-400/20 dark:via-purple-400/20 dark:to-indigo-400/20 text-white dark:text-white border border-violet-400/30 dark:border-violet-300/30 hover:bg-gradient-to-r hover:from-violet-500/30 hover:via-purple-500/30 hover:to-indigo-500/30 dark:hover:from-violet-400/30 dark:hover:via-purple-400/30 dark:hover:to-indigo-400/30 hover:border-violet-400/50 dark:hover:border-violet-300/50 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg backdrop-blur-sm"
//               disabled={isCalculating}
//             >
//               {isCalculating ? 'جارٍ الحساب...' : 'احسب القسط'}
//             </Button>
//           </form>
//         </Form>
        
//         {calculationError && (
//           <div className="mt-6 p-4 rounded-lg border border-red-400/30 dark:border-red-300/30 bg-gradient-to-r from-red-500/10 to-pink-500/10 dark:from-red-400/10 dark:to-pink-400/10 text-center backdrop-blur-sm">
//             <div className="flex items-center justify-center gap-2 text-red-400 dark:text-red-300 mb-2">
//               <AlertCircle className="h-5 w-5" />
//               <p className="font-medium">خطأ في الحساب</p>
//             </div>
//             <p className="text-sm font-normal leading-relaxed text-red-400/90 dark:text-red-300/90">{calculationError}</p>
//           </div>
//         )}
        
//         {estimatedPremium && !isCalculating && !calculationError && (
//           <div className="mt-6 p-4 rounded-lg border border-violet-400/30 dark:border-violet-300/30 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-indigo-500/10 dark:from-violet-400/10 dark:via-purple-400/10 dark:to-indigo-400/10 text-center backdrop-blur-sm">
//             <div className="flex items-center justify-center gap-2 text-violet-400 dark:text-violet-300 mb-2">
//               <CheckCircle className="h-5 w-5" />
//               <p className="font-medium">القسط التقديري:</p>
//             </div>
//             <p className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold text-violet-400 dark:text-violet-300">{estimatedPremium}</p>
//             <p className="text-xs font-medium tracking-wide text-slate-300-foreground mt-2">
//               * هذا تقدير أولي، القسط النهائي قد يختلف.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
// Removed Card, CardContent, etc. if not used, but good to keep if you plan to structure later
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; 
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Calculator, CheckCircle, AlertCircle, Shield } from 'lucide-react'; // Added Shield for consistency

// Import the car data
import carBrandsData from '@/../car_brands_list.json'; 
import carModelsData from '@/../car_models_arabic.json';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 31 }, (_, i) => (currentYear - i).toString());

type CarModels = { [key: string]: string[] };
const typedCarModelsData: CarModels = carModelsData;

const calculatorSchema = z.object({
  brand: z.string().min(1, 'الماركة مطلوبة'),
  model: z.string().min(1, 'الموديل مطلوب'),
  yearOfManufacture: z.string().min(1, 'سنة الصنع مطلوبة'),
  marketValue: z.string().min(1, 'القيمة السوقية مطلوبة')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'القيمة السوقية يجب أن تكون رقماً موجباً')
    .refine((val) => Number(val) >= 1000, 'القيمة السوقية تبدو منخفضة جداً'),
});

type FormData = z.infer<typeof calculatorSchema>;

interface PremiumCalculatorProps {}

export default function PremiumCalculator({}: PremiumCalculatorProps) {
  const [estimatedPremium, setEstimatedPremium] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [lastCalculatedData, setLastCalculatedData] = useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      brand: '',
      model: '',
      yearOfManufacture: currentYear.toString(),
      marketValue: '',
    },
  });

  const selectedBrand = form.watch('brand');

  useEffect(() => {
    if (selectedBrand && typedCarModelsData[selectedBrand]) {
      setAvailableModels(typedCarModelsData[selectedBrand]);
    } else {
      setAvailableModels([]);
    }
    form.setValue('model', ''); // Reset model when brand changes
  }, [selectedBrand, form]);

  const calculatePremium = (data: FormData): string => {
    const marketValue = Number(data.marketValue);
    const currentYearVal = new Date().getFullYear(); // Use a different name to avoid conflict
    const vehicleAge = currentYearVal - parseInt(data.yearOfManufacture);
    
    let premiumRate: number;
    
    if (vehicleAge <= 5) {
        premiumRate = 0.02; 
    } else {
        premiumRate = 0.0225; 
    }
    
    const totalPremium = marketValue * premiumRate;
    return `${Math.round(totalPremium)} جنيه مصري / سنة`;
  };

  const onSubmit = async (data: FormData) => {
    setIsCalculating(true);
    setCalculationError(null);
    setEstimatedPremium(null);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
    try {
      const finalPremium = calculatePremium(data);
      setEstimatedPremium(finalPremium);
      setLastCalculatedData(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ في الحساب';
      setCalculationError(errorMessage);
    } finally {
      setIsCalculating(false);
    }
  };

  const currentFormData = form.watch();
  useEffect(() => {
    if (lastCalculatedData && (estimatedPremium || calculationError)) { // Check for error too
      const hasDataChanged = JSON.stringify(currentFormData) !== JSON.stringify(lastCalculatedData);
      if (hasDataChanged) {
        setEstimatedPremium(null);
        setCalculationError(null);
        setLastCalculatedData(null);
      }
    }
  }, [currentFormData, lastCalculatedData, estimatedPremium, calculationError]);

  return (
    // Main Card styling from LeadCaptureForm
    <div className="w-full max-w-lg rounded-2xl border border-white/10 dark:border-slate-700/30 bg-white/90 dark:bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-6">
        {/* Header styling from LeadCaptureForm */}
        <h2 className="flex items-center gap-3 text-2xl font-semibold leading-tight tracking-[-0.025em] text-slate-900 dark:text-slate-100">
          <Calculator className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          قارن أفضل عروض التأمين لسيارتك
        </h2>
        <p className="text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-400 mt-1.5">
          أدخل بيانات سيارتك للمقارنة واختيار أنسب عرض
        </p>
      </div>
      
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Brand Combobox */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-200">الماركة*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          role="combobox"
                          variant="outline"
                          className={cn(
                            "w-full justify-between rounded-lg border border-white/30 dark:border-slate-600/30 bg-white/60 dark:bg-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/20 focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 shadow-lg hover:shadow-xl",
                            !field.value && "text-slate-500 dark:text-slate-400"
                          )}
                        >
                          {carBrandsData.find(b => b.value === field.value)?.name || "اختر الماركة"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 rounded-lg border border-white/30 dark:border-slate-700/30 bg-white/80 dark:bg-slate-800/75 backdrop-blur-xl shadow-2xl"
                    >
                      <Command className="bg-transparent">
                        <CommandInput 
                          className="h-9 border-0 border-b border-white/20 dark:border-slate-700/30 bg-transparent focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400" 
                          placeholder="ابحث عن ماركة..." 
                        />
                        <CommandList>
                          <CommandEmpty className="text-slate-600 dark:text-slate-400 p-2">لم يتم العثور على الماركة.</CommandEmpty>
                          <CommandGroup>
                            {carBrandsData.map((brand) => (
                              <CommandItem
                                className="hover:bg-emerald-100/40 dark:hover:bg-emerald-800/20 data-[selected=true]:bg-emerald-200/60 dark:data-[selected=true]:bg-emerald-700/30 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm rounded-md mx-1 my-0.5 cursor-pointer"
                                value={brand.value} // Use brand.value for CommandItem value
                                key={brand.value}
                                onSelect={() => {
                                    form.setValue("brand", brand.value);
                                    // Optionally close popover: find Popover's open/setOpen state and call setOpen(false)
                                }}
                              >
                                <Check className={cn(
                                    "mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400", 
                                    brand.value === field.value ? "opacity-100" : "opacity-0"
                                  )} 
                                />
                                {brand.name}
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

            {/* Model Combobox (similar styling) */}
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-200">الموديل*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          role="combobox"
                          variant="outline"
                          disabled={!selectedBrand || availableModels.length === 0}
                          className={cn(
                            "w-full justify-between rounded-lg border border-white/30 dark:border-slate-600/30 bg-white/60 dark:bg-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/20 focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 shadow-lg hover:shadow-xl",
                            !field.value && "text-slate-500 dark:text-slate-400"
                          )}
                        >
                          {field.value || "اختر الموديل"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 rounded-lg border border-white/30 dark:border-slate-700/30 bg-white/80 dark:bg-slate-800/75 backdrop-blur-xl shadow-2xl"
                    >
                      <Command className="bg-transparent">
                        <CommandInput 
                          className="h-9 border-0 border-b border-white/20 dark:border-slate-700/30 bg-transparent focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400" 
                          placeholder="ابحث عن موديل..." 
                        />
                        <CommandList>
                           <CommandEmpty className="text-slate-600 dark:text-slate-400 p-2">لم يتم العثور على الموديل.</CommandEmpty>
                          <CommandGroup>
                            {availableModels.map((model) => (
                              <CommandItem
                                className="hover:bg-emerald-100/40 dark:hover:bg-emerald-800/20 data-[selected=true]:bg-emerald-200/60 dark:data-[selected=true]:bg-emerald-700/30 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm rounded-md mx-1 my-0.5 cursor-pointer"
                                value={model}
                                key={model}
                                onSelect={() => {
                                    form.setValue("model", model);
                                    // Optionally close popover
                                }}
                              >
                                <Check className={cn(
                                    "mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400", 
                                    model === field.value ? "opacity-100" : "opacity-0"
                                  )} 
                                />
                                {model}
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
            
            {/* Year of Manufacture Combobox (similar styling) */}
            <FormField
              control={form.control}
              name="yearOfManufacture"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-200">سنة الصنع*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          role="combobox"
                          variant="outline"
                           className={cn(
                            "w-full justify-between rounded-lg border border-white/30 dark:border-slate-600/30 bg-white/60 dark:bg-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/20 focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 shadow-lg hover:shadow-xl",
                            !field.value && "text-slate-500 dark:text-slate-400"
                          )}
                        >
                          {field.value || "اختر سنة الصنع"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                     <PopoverContent 
                      className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 rounded-lg border border-white/30 dark:border-slate-700/30 bg-white/80 dark:bg-slate-800/75 backdrop-blur-xl shadow-2xl"
                    >
                      <Command className="bg-transparent">
                        <CommandInput 
                          className="h-9 border-0 border-b border-white/20 dark:border-slate-700/30 bg-transparent focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400" 
                          placeholder="ابحث عن سنة..." 
                        />
                        <CommandList>
                          <CommandEmpty className="text-slate-600 dark:text-slate-400 p-2">لم يتم العثور على السنة.</CommandEmpty>
                          <CommandGroup>
                            {years.map((year) => (
                              <CommandItem
                                className="hover:bg-emerald-100/40 dark:hover:bg-emerald-800/20 data-[selected=true]:bg-emerald-200/60 dark:data-[selected=true]:bg-emerald-700/30 text-slate-900 dark:text-slate-100 transition-all duration-200 backdrop-blur-sm rounded-md mx-1 my-0.5 cursor-pointer"
                                value={year}
                                key={year}
                                onSelect={() => {
                                    form.setValue("yearOfManufacture", year);
                                    // Optionally close popover
                                }}
                              >
                                 <Check className={cn(
                                    "mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400", 
                                    year === field.value ? "opacity-100" : "opacity-0"
                                  )} 
                                />
                                {year}
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

            {/* Market Value Input */}
            <FormField
              control={form.control}
              name="marketValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-200">القيمة السوقية للسيارة*</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="مثال: 850000" // Corrected example value
                      className="rounded-lg border-white/30 dark:border-slate-600/30 bg-white/60 dark:bg-white/10 backdrop-blur-md focus:border-emerald-400/60 dark:focus:border-emerald-400/50 focus:bg-white/80 dark:focus:bg-white/20 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/10 transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    أدخل القيمة التقديرية الحالية لسيارتك بالجنيه المصري.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-emerald-500/90 to-teal-600/90 dark:from-emerald-600/80 dark:to-teal-700/80 hover:from-emerald-600/90 hover:to-teal-700/90 dark:hover:from-emerald-700/80 dark:hover:to-teal-800/80 text-white shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 dark:border-slate-600/20 transition-all duration-300 transform hover:scale-105"
              disabled={isCalculating}
            >
              {isCalculating ? 'جارٍ الحساب...' : 'احسب القسط'}
            </Button>
          </form>
        </Form>
        
        {calculationError && (
          <div className="mt-6 p-4 rounded-lg border border-red-300/50 dark:border-red-500/40 bg-gradient-to-r from-red-500/5 via-red-500/10 to-red-500/5 dark:from-red-900/10 dark:via-red-800/10 dark:to-red-900/10 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 mb-1">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium text-sm">خطأ في الحساب</p>
            </div>
            <p className="text-xs font-normal leading-relaxed text-red-700 dark:text-red-400/80">{calculationError}</p>
          </div>
        )}
        
        {estimatedPremium && !isCalculating && !calculationError && (
          <div className="mt-6 p-4 rounded-lg border border-emerald-300/50 dark:border-emerald-500/40 bg-gradient-to-r from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 dark:from-emerald-900/10 dark:via-emerald-800/10 dark:to-emerald-900/10 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCircle className="h-5 w-5" />
              <p className="font-medium text-sm">القسط التقديري:</p>
            </div>
            <p className="text-xl font-semibold text-emerald-700 dark:text-emerald-300">{estimatedPremium}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              * هذا تقدير أولي، القسط النهائي قد يختلف.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}