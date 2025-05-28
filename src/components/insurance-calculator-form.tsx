
"use client";

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { scoreLead, type ScoreLeadInput } from '@/ai/flows/lead-scoring';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { CAR_MAKES, CAR_MODELS_DATA } from '@/data/carData';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
const regions = ["القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "الغربية", "البحيرة", "أسيوط", "سوهاج", "أخرى"];
const carCategories = ["سيدان", "دفع رباعي (SUV)", "هاتشباك", "بيك أب", "ميني فان", "أخرى"]; // Renamed for clarity, was carTypes

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب ويجب أن يكون حرفين على الأقل." }),
  phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: "رقم الهاتف المصري غير صالح." }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح." }),
  carType: z.string({ required_error: "فئة السيارة مطلوبة." }), // This is car category (Sedan, SUV)
  carMake: z.string({ required_error: "ماركة السيارة مطلوبة." }),
  carModel: z.string({ required_error: "طراز السيارة مطلوب." }),
  yearOfManufacture: z.coerce.number().min(currentYear - 50).max(currentYear, { message: "سنة الصنع غير صالحة." }),
  driverAge: z.coerce.number().min(18, { message: "يجب أن يكون عمر السائق 18 عامًا على الأقل." }).max(80, { message: "عمر السائق لا يمكن أن يتجاوز 80 عامًا." }),
  region: z.string({ required_error: "المنطقة الجغرافية مطلوبة." }),
});

type FormData = z.infer<typeof formSchema>;

interface InsuranceCalculatorFormProps {
  onLeadScored?: (lead: any) => void; 
}

export default function InsuranceCalculatorForm({ onLeadScored }: InsuranceCalculatorFormProps) {
  const [calculatedPremium, setCalculatedPremium] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      carType: '',
      carMake: '',
      carModel: '',
      driverAge: 25,
      yearOfManufacture: currentYear,
      region: '',
    },
  });

  const selectedCarMake = form.watch('carMake');

  useEffect(() => {
    if (selectedCarMake) {
      setAvailableModels(CAR_MODELS_DATA[selectedCarMake]?.models || []);
      form.setValue('carModel', ''); // Reset car model when make changes
    } else {
      setAvailableModels([]);
    }
  }, [selectedCarMake, form]);

  const [clientRendered, setClientRendered] = useState(false);
  useEffect(() => {
    setClientRendered(true);
  }, []);


  const handleCalculatePremium = () => {
    const values = form.getValues();
    // Premium calculation uses carType (category), year, age, region as per original logic
    if (values.carType && values.yearOfManufacture && values.driverAge && values.region) {
      const basePremium = 5000;
      const ageFactor = values.driverAge < 25 ? 1.2 : (values.driverAge > 60 ? 1.1 : 1.0);
      const yearFactor = (currentYear - values.yearOfManufacture) * 0.02 + 1;
      // Note: carType (category like Sedan/SUV) could be used for a more nuanced premium factor here if desired
      const premium = basePremium * ageFactor * yearFactor;
      setCalculatedPremium(`حوالي ${premium.toFixed(0)} جنيه مصري`);
    } else {
      toast({
        title: "خطأ في الإدخال",
        description: "يرجى ملء حقول فئة السيارة، سنة الصنع، عمر السائق، والمنطقة لحساب القسط.",
        variant: "destructive",
      });
    }
  };

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setCalculatedPremium(null); 
    
    const leadInput: ScoreLeadInput = {
      calculatorInteraction: true, 
      websiteVisits: 1, 
      age: data.driverAge,
      region: data.region,
      carCategory: data.carType, // Mapped from form's carType
      carMake: data.carMake,
      carModel: data.carModel,
    };

    try {
      const result = await scoreLead(leadInput);
      const fullLeadData = {
        id: Date.now().toString(), 
        ...data, // Includes name, phone, email, carType, carMake, carModel, yearOfManufacture, driverAge, region
        // AI input fields are already in leadInput and data
        leadScore: result.leadScore,
        reason: result.reason,
        submissionDate: new Date().toISOString(),
      };
      
      if (onLeadScored) { 
        onLeadScored(fullLeadData);
         toast({
          title: "تمت إضافة العميل المحتمل بنجاح!",
          description: `الاسم: ${data.name}, درجة الاهتمام: ${result.leadScore.toFixed(2)}`,
        });
      } else { 
         toast({
          title: "تم استلام طلبك بنجاح!",
          description: `شكراً لك ${data.name}. درجة اهتمامك الأولية هي ${result.leadScore.toFixed(2)}. سنتواصل معك قريباً. سبب التقييم: ${result.reason}`,
        });
      }
      form.reset();
      setAvailableModels([]);
    } catch (error) {
      console.error("Error scoring lead:", error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  if (!clientRendered) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">جاري تحميل الآلة الحاسبة...</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
           <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="calculator" className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl text-center text-primary">احسب قسط تأمينك واحصل على عرض</CardTitle>
        <CardDescription className="text-center">
          أدخل بيانات سيارتك وبياناتك الشخصية للحصول على عرض تأمين مخصص وتقييم فوري لمدى اهتمامك.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Car Category (Sedan, SUV) */}
            <div className="space-y-2">
              <Label htmlFor="carType">فئة السيارة</Label>
              <Controller
                name="carType"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value ?? undefined}>
                    <SelectTrigger id="carType"><SelectValue placeholder="اختر فئة السيارة" /></SelectTrigger>
                    <SelectContent>
                      {carCategories.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.carType && <p className="text-sm text-destructive">{form.formState.errors.carType.message}</p>}
            </div>

            {/* Year of Manufacture */}
            <div className="space-y-2">
              <Label htmlFor="yearOfManufacture">سنة الصنع</Label>
               <Controller
                name="yearOfManufacture"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)} value={String(field.value ?? currentYear)}>
                    <SelectTrigger id="yearOfManufacture"><SelectValue placeholder="اختر سنة الصنع" /></SelectTrigger>
                    <SelectContent>
                      {years.map(year => <SelectItem key={year} value={String(year)}>{year}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.yearOfManufacture && <p className="text-sm text-destructive">{form.formState.errors.yearOfManufacture.message}</p>}
            </div>
            
            {/* Car Make */}
            <div className="space-y-2">
              <Label htmlFor="carMake">ماركة السيارة</Label>
              <Controller
                name="carMake"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value ?? undefined}>
                    <SelectTrigger id="carMake"><SelectValue placeholder="اختر ماركة السيارة" /></SelectTrigger>
                    <SelectContent>
                      {CAR_MAKES.map(make => <SelectItem key={make.value} value={make.value}>{make.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.carMake && <p className="text-sm text-destructive">{form.formState.errors.carMake.message}</p>}
            </div>

            {/* Car Model */}
            <div className="space-y-2">
              <Label htmlFor="carModel">طراز السيارة</Label>
              <Controller
                name="carModel"
                control={form.control}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    value={field.value ?? undefined}
                    disabled={!selectedCarMake || availableModels.length === 0}
                  >
                    <SelectTrigger id="carModel"><SelectValue placeholder="اختر طراز السيارة" /></SelectTrigger>
                    <SelectContent>
                      {availableModels.map(model => <SelectItem key={model} value={model}>{model}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.carModel && <p className="text-sm text-destructive">{form.formState.errors.carModel.message}</p>}
            </div>

            {/* Driver Age */}
            <div className="space-y-2">
              <Label htmlFor="driverAge">عمر السائق</Label>
              <Input id="driverAge" type="number" {...form.register("driverAge")} placeholder="مثال: 30" />
              {form.formState.errors.driverAge && <p className="text-sm text-destructive">{form.formState.errors.driverAge.message}</p>}
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label htmlFor="region">المنطقة الجغرافية</Label>
              <Controller
                name="region"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value ?? undefined}>
                    <SelectTrigger id="region"><SelectValue placeholder="اختر المنطقة" /></SelectTrigger>
                    <SelectContent>
                      {regions.map(region => <SelectItem key={region} value={region}>{region}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.region && <p className="text-sm text-destructive">{form.formState.errors.region.message}</p>}
            </div>
          </div>

          <Button type="button" variant="outline" onClick={handleCalculatePremium} className="w-full" disabled={isLoading}>
            احسب القسط المبدئي
          </Button>

          {calculatedPremium && (
            <div className="mt-4 p-3 bg-primary/10 text-primary rounded-md text-center font-semibold">
              {calculatedPremium}
            </div>
          )}

          <hr className="my-6" />
          <p className="text-center font-semibold text-foreground/80">أدخل بياناتك لإرسال الطلب والحصول على تقييم:</p>
          
          <div className="space-y-2">
            <Label htmlFor="name">الاسم بالكامل</Label>
            <Input id="name" {...form.register("name")} placeholder="مثال: محمد أحمد" />
            {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input id="phone" type="tel" {...form.register("phone")} placeholder="مثال: 01001234567" />
            {form.formState.errors.phone && <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" type="email" {...form.register("email")} placeholder="مثال: example@mail.com" />
            {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLoading ? 'جاري الإرسال...' : 'إرسال الطلب والحصول على تقييم'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

    