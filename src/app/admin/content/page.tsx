
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { HeroContent, WhyChooseUsItem, FAQItem, InsuranceType } from '@/types';

const DEFAULT_HERO_CONTENT: HeroContent = {
  title: "أمانك أونلاين: تأمين سيارتك، راحة بالك",
  subtitle: "نحن شركة تأمين سيارات ناشئة في مصر، ملتزمون بتوفير أفضل حلول التأمين...",
};

const DEFAULT_WHY_US_ITEMS: WhyChooseUsItem[] = [
  { id: 'speed', title: 'سرعة تسوية المطالبات', description: 'نعمل على تسوية مطالباتك بسرعة وكفاءة...', iconName: 'Zap' },
  { id: 'coverage', title: 'تغطية شاملة', description: 'نوفر مجموعة واسعة من التغطيات التأمينية...', iconName: 'ShieldCheck' },
  { id: 'prices', title: 'أسعار تنافسية', description: 'نقدم أفضل الأسعار في السوق...', iconName: 'TrendingUp' },
];

const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  { id: 'faq1', question: "ما هو التأمين الشامل على السيارات؟", answer: "التأمين الشامل يوفر تغطية واسعة..." },
  { id: 'faq2', question: "هل التأمين ضد الغير إجباري في مصر؟", answer: "نعم، التأمين ضد الغير إجباري..." },
];

const DEFAULT_INSURANCE_TYPES: InsuranceType[] = [
  { id: 'comp', name: 'التأمين الشامل', description: 'يوفر تغطية شاملة...', priceRange: 'يبدأ من 2.5%', features: ['تغطية الحوادث', 'تغطية السرقة'] },
  { id: 'tpl', name: 'تأمين ضد الغير', description: 'يغطي الأضرار للغير...', priceRange: 'حسب التعريفة', features: ['إلزامي قانوناً'] },
];

export default function AdminContentPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [heroContent, setHeroContent] = useState<HeroContent>(DEFAULT_HERO_CONTENT);
  const [whyUsItems, setWhyUsItems] = useState<WhyChooseUsItem[]>(DEFAULT_WHY_US_ITEMS);
  const [faqItems, setFaqItems] = useState<FAQItem[]>(DEFAULT_FAQ_ITEMS);
  const [insuranceTypes, setInsuranceTypes] = useState<InsuranceType[]>(DEFAULT_INSURANCE_TYPES);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const heroDoc = await getDoc(doc(db, "dynamicContent", "hero"));
        if (heroDoc.exists()) setHeroContent(heroDoc.data() as HeroContent);

        const whyUsDoc = await getDoc(doc(db, "dynamicContent", "whyChooseUs"));
        if (whyUsDoc.exists()) setWhyUsItems((whyUsDoc.data() as { items: WhyChooseUsItem[] }).items || DEFAULT_WHY_US_ITEMS);
        
        const faqDoc = await getDoc(doc(db, "dynamicContent", "faq"));
        if (faqDoc.exists()) setFaqItems((faqDoc.data() as { items: FAQItem[] }).items || DEFAULT_FAQ_ITEMS);

        const insuranceTypesDoc = await getDoc(doc(db, "dynamicContent", "insuranceTypes"));
        if (insuranceTypesDoc.exists()) setInsuranceTypes((insuranceTypesDoc.data() as { items: InsuranceType[] }).items || DEFAULT_INSURANCE_TYPES);

      } catch (error) {
        console.error("Error fetching content:", error);
        toast({ title: "خطأ", description: "فشل تحميل المحتوى من قاعدة البيانات.", variant: "destructive" });
      }
      setIsFetching(false);
    };
    fetchData();
  }, [toast]);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      await setDoc(doc(db, "dynamicContent", "hero"), heroContent);
      await setDoc(doc(db, "dynamicContent", "whyChooseUs"), { items: whyUsItems });
      await setDoc(doc(db, "dynamicContent", "faq"), { items: faqItems });
      await setDoc(doc(db, "dynamicContent", "insuranceTypes"), { items: insuranceTypes });
      
      toast({
        title: "تم حفظ التغييرات بنجاح!",
        description: "تم تحديث محتوى الموقع في قاعدة البيانات.",
      });
    } catch (error) {
      console.error("Error saving content:", error);
      toast({ title: "خطأ", description: "فشل حفظ المحتوى في قاعدة البيانات.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  // Handler functions for Why Us items
  const handleWhyUsChange = (index: number, field: keyof WhyChooseUsItem, value: string) => {
    const newItems = [...whyUsItems];
    (newItems[index] as any)[field] = value;
    setWhyUsItems(newItems);
  };
  const addWhyUsItem = () => setWhyUsItems([...whyUsItems, { id: `new-${Date.now()}`, title: '', description: '', iconName: 'Zap' }]);
  const removeWhyUsItem = (index: number) => setWhyUsItems(whyUsItems.filter((_, i) => i !== index));

  // Handler functions for FAQ items
  const handleFaqChange = (index: number, field: keyof FAQItem, value: string) => {
    const newItems = [...faqItems];
    (newItems[index] as any)[field] = value;
    setFaqItems(newItems);
  };
  const addFaqItem = () => setFaqItems([...faqItems, { id: `new-${Date.now()}`, question: '', answer: '' }]);
  const removeFaqItem = (index: number) => setFaqItems(faqItems.filter((_, i) => i !== index));

  // Handler functions for Insurance Types
  const handleInsuranceTypeChange = (index: number, field: keyof InsuranceType | 'features', value: string | string[]) => {
    const newItems = [...insuranceTypes];
    if (field === 'features' && typeof value === 'string') {
      newItems[index].features = value.split(',').map(f => f.trim());
    } else {
      (newItems[index] as any)[field] = value;
    }
    setInsuranceTypes(newItems);
  };
  const addInsuranceType = () => setInsuranceTypes([...insuranceTypes, { id: `new-${Date.now()}`, name: '', description: '', priceRange: '', features: [] }]);
  const removeInsuranceType = (index: number) => setInsuranceTypes(insuranceTypes.filter((_, i) => i !== index));


  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-violet-400" />
        <p className="ml-4 text-lg font-medium leading-relaxed tracking-[-0.01em]">جاري تحميل المحتوى...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold leading-tight tracking-[-0.03em] font-bold text-violet-400">إدارة محتوى الموقع</h1>
        <p className="text-slate-300-foreground">
          قم بتحديث النصوص والمعلومات المعروضة في الصفحات الرئيسية للموقع من هنا.
        </p>
      </div>

      {/* Hero Section Management */}
      <Card className="shadow-lg">
        <CardHeader><CardTitle>محتوى قسم الواجهة الرئيسية (Hero Section)</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">العنوان الرئيسي</Label>
            <Input id="heroTitle" value={heroContent.title} onChange={(e) => setHeroContent({...heroContent, title: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">النص الفرعي/النبذة</Label>
            <Textarea id="heroSubtitle" value={heroContent.subtitle} onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})} rows={4} />
          </div>
        </CardContent>
      </Card>

      {/* Why Choose Us Section Management */}
      <Card className="shadow-lg">
        <CardHeader><CardTitle>محتوى قسم "لماذا تختارنا؟"</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {whyUsItems.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-normal leading-relaxed tracking-[0.01em] font-semibold">الميزة {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => removeWhyUsItem(index)} className="text-rose-400 hover:text-rose-400 transition-colors duration-200/80">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="عنوان الميزة" value={item.title} onChange={(e) => handleWhyUsChange(index, 'title', e.target.value)} />
              <Textarea placeholder="وصف الميزة" value={item.description} onChange={(e) => handleWhyUsChange(index, 'description', e.target.value)} rows={3} />
              <Input placeholder="اسم أيقونة Lucide (مثال: Zap)" value={item.iconName} onChange={(e) => handleWhyUsChange(index, 'iconName', e.target.value)} />
            </div>
          ))}
          <Button variant="outline" onClick={addWhyUsItem} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> إضافة ميزة جديدة
          </Button>
        </CardContent>
      </Card>

      {/* FAQ Section Management */}
      <Card className="shadow-lg">
        <CardHeader><CardTitle>محتوى قسم "أسئلة شائعة"</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-md space-y-3">
               <div className="flex justify-between items-center">
                 <Label className="text-base font-normal leading-relaxed tracking-[0.01em] font-semibold">السؤال {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => removeFaqItem(index)} className="text-rose-400 hover:text-rose-400 transition-colors duration-200/80">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="السؤال" value={item.question} onChange={(e) => handleFaqChange(index, 'question', e.target.value)} />
              <Textarea placeholder="الإجابة" value={item.answer} onChange={(e) => handleFaqChange(index, 'answer', e.target.value)} rows={3} />
            </div>
          ))}
          <Button variant="outline" onClick={addFaqItem} className="w-full">
             <PlusCircle className="mr-2 h-4 w-4" /> إضافة سؤال جديد
          </Button>
        </CardContent>
      </Card>
      
      {/* Insurance Types Section Management */}
      <Card className="shadow-lg">
         <CardHeader><CardTitle>محتوى قسم "أنواع التأمين"</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {insuranceTypes.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-md space-y-3">
               <div className="flex justify-between items-center">
                 <Label className="text-base font-normal leading-relaxed tracking-[0.01em] font-semibold">نوع التأمين {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => removeInsuranceType(index)} className="text-rose-400 hover:text-rose-400 transition-colors duration-200/80">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="اسم نوع التأمين" value={item.name} onChange={(e) => handleInsuranceTypeChange(index, 'name', e.target.value)} />
              <Textarea placeholder="وصف نوع التأمين" value={item.description} onChange={(e) => handleInsuranceTypeChange(index, 'description', e.target.value)} rows={3} />
              <Input placeholder="نطاق السعر" value={item.priceRange} onChange={(e) => handleInsuranceTypeChange(index, 'priceRange', e.target.value)} />
              <Textarea placeholder="الميزات (مفصولة بفاصلة)" value={item.features.join(', ')} onChange={(e) => handleInsuranceTypeChange(index, 'features', e.target.value)} rows={2} />
            </div>
          ))}
          <Button variant="outline" onClick={addInsuranceType} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> إضافة نوع تأمين جديد
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSaveChanges} disabled={isLoading || isFetching} size="lg" className="bg-amber-500/20 hover:bg-amber-500/20/90 text-amber-400-foreground">
          {(isLoading || isFetching) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {(isLoading || isFetching) ? "جاري العمل..." : "حفظ جميع التغييرات"}
        </Button>
      </div>
    </div>
  );
}
