"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function AdminContentPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [heroTitle, setHeroTitle] = useState("أمانك أونلاين: تأمين سيارتك، راحة بالك");
  const [heroSubtitle, setHeroSubtitle] = useState("نحن شركة تأمين سيارات ناشئة في مصر، ملتزمون بتوفير أفضل حلول التأمين...");
  
  const [whyUsItems, setWhyUsItems] = useState([
    { id: 'speed', title: 'سرعة تسوية المطالبات', description: 'نعمل على تسوية مطالباتك بسرعة وكفاءة...' },
    { id: 'coverage', title: 'تغطية شاملة', description: 'نوفر مجموعة واسعة من التغطيات التأمينية...' },
  ]);

  const handleSaveChanges = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم حفظ التغييرات بنجاح!",
        description: "تم تحديث محتوى الموقع (محاكاة).",
      });
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">إدارة محتوى الموقع</h1>
        <p className="text-muted-foreground">
          قم بتحديث النصوص والمعلومات المعروضة في الصفحات الرئيسية للموقع من هنا.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>محتوى قسم الواجهة الرئيسية (Hero Section)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">العنوان الرئيسي</Label>
            <Input id="heroTitle" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">النص الفرعي/النبذة</Label>
            <Textarea id="heroSubtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} rows={4} />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>محتوى قسم "لماذا تختارنا؟"</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {whyUsItems.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-md space-y-2">
              <Label htmlFor={`whyUsTitle-${index}`}>عنوان الميزة {index + 1}</Label>
              <Input 
                id={`whyUsTitle-${index}`} 
                value={item.title} 
                onChange={(e) => {
                  const newItems = [...whyUsItems];
                  newItems[index].title = e.target.value;
                  setWhyUsItems(newItems);
                }} 
              />
              <Label htmlFor={`whyUsDesc-${index}`}>وصف الميزة {index + 1}</Label>
              <Textarea 
                id={`whyUsDesc-${index}`} 
                value={item.description} 
                onChange={(e) => {
                  const newItems = [...whyUsItems];
                  newItems[index].description = e.target.value;
                  setWhyUsItems(newItems);
                }}
                rows={3} 
              />
            </div>
          ))}
          <Button variant="outline" onClick={() => setWhyUsItems([...whyUsItems, {id: `new-${Date.now()}`, title: '', description: ''}])}>
            إضافة ميزة جديدة
          </Button>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
         <CardHeader>
            <CardTitle>محتوى قسم "أنواع التأمين"</CardTitle>
             <CardDescription>هنا يمكنك تعديل تفاصيل باقات التأمين المعروضة. (واجهة مبسطة)</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground p-4 border rounded-md">
                سيتم إضافة حقول تعديل أنواع التأمين هنا. حاليًا، يتم إدارة هذا المحتوى بشكل ثابت في الكود.
            </p>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSaveChanges} disabled={isLoading} size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>
       <p className="text-sm text-muted-foreground text-center mt-4">
        ملاحظة: هذه الواجهة هي لأغراض العرض التوضيحي. في التطبيق الفعلي، سيتم ربط هذه الحقول بقاعدة بيانات لتحديث محتوى الموقع مباشرة.
      </p>
    </div>
  );
}
