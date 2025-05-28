
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Users, TrendingUp, Clock, Award, LucideIcon, HelpCircle } from 'lucide-react';
import type { WhyChooseUsItem } from '@/types';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: { [key: string]: LucideIcon } = {
  Zap,
  ShieldCheck,
  Users,
  TrendingUp,
  Clock,
  Award,
  HelpCircle, // Default/fallback icon
};

const DEFAULT_WHY_CHOOSE_US_DATA: WhyChooseUsItem[] = [
  { id: 'speed', title: 'سرعة تسوية المطالبات', description: 'نعمل على تسوية مطالباتك بسرعة وكفاءة لضمان عودتك إلى الطريق في أقرب وقت.', iconName: 'Zap' },
  { id: 'coverage', title: 'تغطية شاملة', description: 'نوفر مجموعة واسعة من التغطيات التأمينية لتلبية كافة احتياجاتك وحماية سيارتك بشكل كامل.', iconName: 'ShieldCheck' },
  { id: 'prices', title: 'أسعار تنافسية', description: 'نقدم أفضل الأسعار في السوق مع الحفاظ على جودة الخدمة والتغطية الممتازة.', iconName: 'TrendingUp' },
  { id: 'service', title: 'خدمة عملاء متميزة', description: 'فريقنا متخصص ومستعد دائمًا لتقديم الدعم والمشورة لك في كل خطوة.', iconName: 'Users' },
  { id: 'process', title: 'عملية سهلة ومبسطة', description: 'إجراءاتنا واضحة وسهلة، بدءًا من شراء الوثيقة وحتى تقديم المطالبات.', iconName: 'Clock' },
  { id: 'trust', title: 'خبرة وموثوقية', description: 'نلتزم بأعلى معايير الشفافية والمصداقية لبناء علاقة ثقة دائمة مع عملائنا.', iconName: 'Award' },
];

export default function WhyChooseUsSection() {
  const [items, setItems] = useState<WhyChooseUsItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "dynamicContent", "whyChooseUs");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as { items: WhyChooseUsItem[] };
          setItems(data.items || DEFAULT_WHY_CHOOSE_US_DATA);
        } else {
          setItems(DEFAULT_WHY_CHOOSE_US_DATA);
          console.log("No 'Why Choose Us' content found in Firestore, using default.");
        }
      } catch (error) {
        console.error("Error fetching 'Why Choose Us' content:", error);
        setItems(DEFAULT_WHY_CHOOSE_US_DATA);
      }
      setIsLoading(false);
    };
    fetchItems();
  }, []);

  const currentItems = items || DEFAULT_WHY_CHOOSE_US_DATA;

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-1/2 mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader className="items-center text-center">
                  <Skeleton className="h-16 w-16 rounded-full mb-4" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="text-center">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">لماذا تختار أمانك أونلاين؟</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            نحن نسعى لتقديم تجربة تأمين فريدة تجمع بين الحماية الموثوقة والخدمة الاستثنائية.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || iconMap['HelpCircle']; // Fallback icon
            return (
              <Card 
                key={item.id} 
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <CardHeader className="items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <IconComponent className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-foreground/70">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
