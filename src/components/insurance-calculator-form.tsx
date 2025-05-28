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

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
const regions = ["القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "الغربية", "البحيرة", "أسيوط", "سوهاج", "أخرى"];
const carTypes = ["سيدان", "دفع رباعي (SUV)", "هاتشباك", "بيك أب", "ميني فان", "أخرى"];

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب ويجب أن يكون حرفين على الأقل." }),
  phone: z.string().regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: "رقم الهاتف المصري غير صالح." }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح." }),
  carType: z.string({ required_error: "نوع السيارة مطلوب." }),
  yearOfManufacture: z.coerce.number().min(currentYear - 50).max(currentYear, { message: "سنة الصنع غير صالحة." }),
  driverAge: z.coerce.number().min(18, { message: "يجب أن يكون عمر السائق 18 عامًا على الأقل." }).max(80, { message: "عمر السائق لا يمكن أن يتجاوز 80 عامًا." }),
  region: z.string({ required_error: "المنطقة الجغرافية مطلوبة." }),
});

type FormData = z.infer<typeof formSchema>;

interface InsuranceCalculatorFormProps {
  onLeadScored?: (lead: any) => void; // Callback to pass scored lead to parent (e.g., admin page)
}

export default function InsuranceCalculatorForm({ onLeadScored }: InsuranceCalculatorFormProps) {
  const [calculatedPremium, setCalculatedPremium] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      driverAge: 25,
      yearOfManufacture: currentYear,
    },
  });

  const [clientRendered, setClientRendered] = useState(false);
  useEffect(() => {
    setClientRendered(true);
  }, []);


  const handleCalculatePremium = () => {
    const values = form.getValues();
    if (values.carType && values.yearOfManufacture && values.driverAge && values.region) {
      // Mock premium calculation
      const basePremium = 5000;
      const ageFactor = values.driverAge < 25 ? 1.2 : (values.driverAge > 60 ? 1.1 : 1.0);
      const yearFactor = (currentYear - values.yearOfManufacture) * 0.02 + 1;
      const premium = basePremium * ageFactor * yearFactor;
      setCalculatedPremium(`حوالي ${premium.toFixed(0)} جنيه مصري`);
    } else {
      toast({
        title: "خطأ في الإدخال",
        description: "يرجى ملء حقول نوع السيارة، سنة الصنع، عمر السائق، والمنطقة لحساب القسط.",
        variant: "destructive",
      });
    }
  };

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setCalculatedPremium(null); // Clear previous calculation
    
    const leadInput: ScoreLeadInput = {
      calculatorInteraction: true, // Assuming interaction since they are using this form
      websiteVisits: 1, // Simulated value
      age: data.driverAge,
      region: data.region,
      carType: data.carType,
    };

    try {
      const result = await scoreLead(leadInput);
      const fullLeadData = {
        id: Date.now().toString(), // Simple ID for demo
        ...data,
        ...leadInput,
        ...result,
        submissionDate: new Date().toISOString(),
      };
      
      if (onLeadScored) { // If callback is provided (used in admin panel)
        onLeadScored(fullLeadData);
         toast({
          title: "تمت إضافة العميل المحتمل بنجاح!",
          description: `الاسم: ${data.name}, درجة الاهتمام: ${result.leadScore.toFixed(2)}`,
        });
      } else { // Default behavior for public page
         toast({
          title: "تم استلام طلبك بنجاح!",
          description: `شكراً لك ${data.name}. درجة اهتمامك الأولية هي ${result.leadScore.toFixed(2)}. سنتواصل معك قريباً. سبب التقييم: ${result.reason}`,
        });
      }
      form.reset();
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
            {/* Car Details */}
            <div className="space-y-2">
              <Label htmlFor="carType">نوع السيارة</Label>
              <Controller
                name="carType"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="carType"><SelectValue placeholder="اختر نوع السيارة" /></SelectTrigger>
                    <SelectContent>
                      {carTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.carType && <p className="text-sm text-destructive">{form.formState.errors.carType.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearOfManufacture">سنة الصنع</Label>
               <Controller
                name="yearOfManufacture"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                    <SelectTrigger id="yearOfManufacture"><SelectValue placeholder="اختر سنة الصنع" /></SelectTrigger>
                    <SelectContent>
                      {years.map(year => <SelectItem key={year} value={String(year)}>{year}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.yearOfManufacture && <p className="text-sm text-destructive">{form.formState.errors.yearOfManufacture.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="driverAge">عمر السائق</Label>
              <Input id="driverAge" type="number" {...form.register("driverAge")} placeholder="مثال: 30" />
              {form.formState.errors.driverAge && <p className="text-sm text-destructive">{form.formState.errors.driverAge.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">المنطقة الجغرافية</Label>
              <Controller
                name="region"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          
          {/* Personal Details */}
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
