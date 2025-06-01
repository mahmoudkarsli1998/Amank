
"use client";
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; 
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Calculator, CheckCircle, AlertCircle } from 'lucide-react';

// Import the car data
import carBrandsData from '@/../car_brands_list.json'; 
import carModelsData from '@/../car_models_arabic.json';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 31 }, (_, i) => (currentYear - i).toString());

type CarModels = { [key: string]: string[] };
const typedCarModelsData: CarModels = carModelsData;

// Updated schema to handle string inputs properly
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
    form.setValue('model', '');
  }, [selectedBrand, form]);

  // const calculatePremium = (data: FormData): string => {
  //   console.log("Calculating premium with data:", data);
  //   const marketValue = Number(data.marketValue);
  //   let basePremium = marketValue * 0.0188; 
  //   const vehicleAge = currentYear - parseInt(data.yearOfManufacture);
  //   if (vehicleAge <= 5) basePremium *= 1.2;
  //   else if (vehicleAge <= 10) basePremium *= 1.0;
  //   else basePremium *= 0.9;
  //   return `${Math.round(basePremium)} جنيه مصري / سنة`;
  // };
  const calculatePremium = (data: FormData): string => {
    console.log("Calculating premium with data:", data);
    
    const marketValue = Number(data.marketValue);
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - parseInt(data.yearOfManufacture);
    
    let premiumRate: number;
    
    // تطبيق النسب حسب عمر السيارة
    if (vehicleAge <= 5) {
        premiumRate = 0.02; // 2% للسيارات 5 سنوات أو أقل
    } else {
        premiumRate = 0.0225; // 2.25% للسيارات أكثر من 5 سنوات
    }
    
    const totalPremium = marketValue * premiumRate;
    
    console.log(`Vehicle age: ${vehicleAge} years, Premium rate: ${premiumRate * 100}%`);
    
    return `${Math.round(totalPremium)} جنيه مصري / سنة`;
};

  const onSubmit = async (data: FormData) => {
    setIsCalculating(true);
    setCalculationError(null);
    setEstimatedPremium(null);
    console.log("Form submitted:", data);
    await new Promise(resolve => setTimeout(resolve, 800));
    try {
      const finalPremium = calculatePremium(data);
      setEstimatedPremium(finalPremium);
      setLastCalculatedData(data);
    } catch (error) {
      console.error('Error calculating premium:', error);
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ في الحساب';
      setCalculationError(errorMessage);
    } finally {
      setIsCalculating(false);
    }
  };

  // Clear results only when form data actually changes from the last calculated data
  const currentFormData = form.watch();
  useEffect(() => {
    if (lastCalculatedData && estimatedPremium) {
      const hasDataChanged = JSON.stringify(currentFormData) !== JSON.stringify(lastCalculatedData);
      if (hasDataChanged) {
        setEstimatedPremium(null);
        setCalculationError(null);
        setLastCalculatedData(null);
      }
    }
  }, [currentFormData, lastCalculatedData, estimatedPremium]);

  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 dark:bg-black/10 p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="flex items-center gap-3 text-2xl font-semibold leading-tight tracking-[-0.025em] font-semibold tracking-tight text-slate-100">
          <Calculator className="h-7 w-7 text-violet-400" />
          قارن أفضل عروض التأمين لسيارتك
        </h2>
        <p className="text-sm font-normal leading-relaxed text-slate-300-foreground mt-1.5">أدخل بيانات سيارتك للمقارنة واختيار أنسب عرض</p>
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
                  <FormLabel className="text-sm font-normal leading-relaxed font-medium text-slate-100/80">الماركة*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          role="combobox"
                          className={cn(
                            "w-full justify-between rounded-lg border-white/30 bg-white/20 dark:border-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10",
                            !field.value && "text-slate-300-foreground"
                          )}
                        >
                          {field.value || "اختر الماركة"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 rounded-lg border-white/30 bg-white/50 dark:border-white/20 dark:bg-black/50 backdrop-blur-md shadow-lg"
                    >
                      <Command>
                        <CommandInput className="h-9 rounded-t-lg border-0 border-b border-white/30 dark:border-white/20 bg-transparent focus:ring-0" placeholder="ابحث عن ماركة..." />
                        <CommandList>
                          <CommandEmpty>لم يتم العثور على الماركة.</CommandEmpty>
                          <CommandGroup>
                            {carBrandsData.map((brand) => (
                              <CommandItem
                                className="hover:bg-white/10 dark:hover:bg-white/5 data-[selected=true]:bg-blue-500/20/20/80 data-[selected=true]:text-violet-400-foreground"
                                value={brand.value}
                                key={brand.value}
                                onSelect={() => form.setValue("brand", brand.value)}
                              >
                                <Check className={cn("mr-2 h-4 w-4", brand.value === field.value ? "opacity-100" : "opacity-0")} />
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

            {/* Model Combobox */}
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-normal leading-relaxed font-medium text-slate-100/80">الموديل*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          role="combobox"
                          disabled={!selectedBrand || availableModels.length === 0}
                          className={cn(
                            "w-full justify-between rounded-lg border-white/30 bg-white/20 dark:border-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10",
                            !field.value && "text-slate-300-foreground"
                          )}
                        >
                          {field.value || "اختر الموديل"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 rounded-lg border-white/30 bg-white/50 dark:border-white/20 dark:bg-black/50 backdrop-blur-md shadow-lg"
                    >
                      <Command>
                        <CommandInput className="h-9 rounded-t-lg border-0 border-b border-white/30 dark:border-white/20 bg-transparent focus:ring-0" placeholder="ابحث عن موديل..." />
                        <CommandList>
                          <CommandEmpty>لم يتم العثور على الموديل.</CommandEmpty>
                          <CommandGroup>
                            {availableModels.map((model) => (
                              <CommandItem
                                className="hover:bg-white/10 dark:hover:bg-white/5 data-[selected=true]:bg-blue-500/20/20/80 data-[selected=true]:text-violet-400-foreground"
                                value={model}
                                key={model}
                                onSelect={() => form.setValue("model", model)}
                              >
                                <Check className={cn("mr-2 h-4 w-4", model === field.value ? "opacity-100" : "opacity-0")} />
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

            {/* Year of Manufacture Combobox */}
            <FormField
              control={form.control}
              name="yearOfManufacture"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-normal leading-relaxed font-medium text-slate-100/80">سنة الصنع*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          role="combobox"
                          className={cn(
                            "w-full justify-between rounded-lg border-white/30 bg-white/20 dark:border-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10",
                            !field.value && "text-slate-300-foreground"
                          )}
                        >
                          {field.value || "اختر سنة الصنع"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 rounded-lg border-white/30 bg-white/50 dark:border-white/20 dark:bg-black/50 backdrop-blur-md shadow-lg"
                    >
                      <Command>
                        <CommandInput className="h-9 rounded-t-lg border-0 border-b border-white/30 dark:border-white/20 bg-transparent focus:ring-0" placeholder="ابحث عن سنة..." />
                        <CommandList>
                          <CommandEmpty>لم يتم العثور على السنة.</CommandEmpty>
                          <CommandGroup>
                            {years.map((year) => (
                              <CommandItem
                                className="hover:bg-white/10 dark:hover:bg-white/5 data-[selected=true]:bg-blue-500/20/20/80 data-[selected=true]:text-violet-400-foreground"
                                value={year}
                                key={year}
                                onSelect={() => form.setValue("yearOfManufacture", year)}
                              >
                                <Check className={cn("mr-2 h-4 w-4", year === field.value ? "opacity-100" : "opacity-0")} />
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
                  <FormLabel className="text-sm font-normal leading-relaxed font-medium text-slate-100/80">القيمة السوقية للسيارة*</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="مثال: 85000" 
                      className="rounded-lg border-white/30 bg-white/20 dark:border-white/20 dark:bg-white/5 hover:bg-white/30 dark:hover:bg-white/10 focus-visible:ring-blue-400/50/80 focus-visible:ring-offset-0 focus-visible:ring-2"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs font-medium tracking-wide text-slate-100/60">
                    أدخل القيمة التقديرية الحالية لسيارتك بالجنيه المصري.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full rounded-lg bg-blue-500/20/20 text-violet-400-foreground hover:bg-blue-500/20/20/90 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              disabled={isCalculating}
            >
              {isCalculating ? 'جارٍ الحساب...' : 'احسب القسط'}
            </Button>
          </form>
        </Form>
        
        {calculationError && (
          <div className="mt-6 p-4 rounded-lg border border-red-500/30 bg-red-500/20/10 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-rose-400 mb-2">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">خطأ في الحساب</p>
            </div>
            <p className="text-sm font-normal leading-relaxed text-rose-400/90">{calculationError}</p>
          </div>
        )}
        
        {estimatedPremium && !isCalculating && !calculationError && (
          <div className="mt-6 p-4 rounded-lg border border-blue-400/30/30 bg-blue-500/20/20/10 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-violet-400 mb-2">
              <CheckCircle className="h-5 w-5" />
              <p className="font-medium">القسط التقديري:</p>
            </div>
            <p className="text-2xl font-semibold leading-tight tracking-[-0.025em] font-bold text-violet-400">{estimatedPremium}</p>
            <p className="text-xs font-medium tracking-wide text-slate-300-foreground mt-2">
              * هذا تقدير أولي، القسط النهائي قد يختلف.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}