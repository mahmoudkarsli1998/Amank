import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function InfographicSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">أهمية التأمين في أرقام</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            نظرة على إحصائيات حوادث السيارات في مصر وأهمية وجود تغطية تأمينية مناسبة.
          </p>
        </div>
        <Card className="shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-center">إحصائيات حوادث السيارات وأهمية التأمين في مصر</CardTitle>
            <CardDescription className="text-center">
              البيانات التالية توضح الحاجة الماسة للتأمين لحماية استثماراتك وسلامتك.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center p-6">
            {/* Placeholder for infographic */}
            <div className="w-full max-w-4xl aspect-[16/9] relative bg-gray-200 rounded-lg flex items-center justify-center">
                <Image 
                    src="https://placehold.co/800x450.png" 
                    alt="إنفوجرافيك إحصائيات حوادث السيارات" 
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="statistics infographic"
                />
                <p className="absolute text-xl text-white bg-black/50 p-4 rounded">سيتم إضافة الإنفوجرافيك قريباً</p>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>* البيانات المعروضة هي لأغراض توضيحية وسيتم تحديثها بإحصائيات فعلية.</p>
        </div>
      </div>
    </section>
  );
}
