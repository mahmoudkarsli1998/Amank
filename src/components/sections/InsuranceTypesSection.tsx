
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2 } from 'lucide-react';
import type { InsuranceType } from '@/types';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const DEFAULT_INSURANCE_TYPES_DATA: InsuranceType[] = [
  { id: 'comp', name: 'التأمين الشامل', description: 'يوفر تغطية شاملة ضد معظم المخاطر مثل الحوادث، السرقة، الحريق، والأضرار التي تلحق بسيارتك أو بالغير.', priceRange: 'يبدأ من 2.5% من قيمة السيارة', features: ['تغطية الحوادث الشخصية', 'تغطية الأضرار المادية للغير', 'تغطية السرقة والحريق', 'خدمة المساعدة على الطريق'] },
  { id: 'tpl', name: 'تأمين ضد الغير (إجباري)', description: 'يغطي الأضرار المادية والإصابات الجسدية التي قد تسببها للغير نتيجة حادث بسيارتك.', priceRange: 'حسب التعريفة الرسمية', features: ['تغطية المسؤولية المدنية تجاه الغير', 'إلزامي بموجب القانون المصري', 'تكلفة منخفضة نسبياً'] },
];

export default function InsuranceTypesSection() {
  const [items, setItems] = useState<InsuranceType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "dynamicContent", "insuranceTypes");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as { items: InsuranceType[] };
          setItems(data.items || DEFAULT_INSURANCE_TYPES_DATA);
        } else {
          setItems(DEFAULT_INSURANCE_TYPES_DATA);
          console.log("No Insurance Types content found in Firestore, using default.");
        }
      } catch (error) {
        console.error("Error fetching Insurance Types content:", error);
        setItems(DEFAULT_INSURANCE_TYPES_DATA);
      }
      setIsLoading(false);
    };
    fetchItems();
  }, []);

  const currentItems = items || DEFAULT_INSURANCE_TYPES_DATA;

   if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-1/2 mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
          </div>
          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }


  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">أنواع التأمين على السيارات</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            نقدم مجموعة متنوعة من وثائق التأمين لتناسب احتياجاتك وميزانيتك. اختر التغطية الأنسب لك.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">مقارنة بين أنواع التأمين</CardTitle>
              <CardDescription>اختر الباقة التي تناسب احتياجاتك وميزانيتك.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">نوع التأمين</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>نطاق السعر</TableHead>
                    <TableHead className="text-right">أبرز الميزات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell className="font-semibold">{type.name}</TableCell>
                      <TableCell>{type.description}</TableCell>
                      <TableCell>{type.priceRange}</TableCell>
                      <TableCell className="text-right">
                        <ul className="space-y-1">
                          {type.features.map((feature, index) => (
                            <li key={index} className="flex items-center justify-end gap-2">
                              <span>{feature}</span>
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-primary">هل لديك أسئلة؟</h3>
            <p className="text-foreground/80 mt-2">
                لا تتردد في <a href="/contact" className="text-secondary hover:underline">التواصل معنا</a> لمناقشة احتياجاتك التأمينية.
            </p>
        </div>
      </div>
    </section>
  );
}
