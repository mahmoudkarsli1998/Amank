"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { insurancePlans, type InsurancePlan } from '@/lib/constants';
import { CheckCircle, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function InsurancePlanTable() {
  const { toast } = useToast();

  const handlePlanSelection = async (selectedPlan: InsurancePlan) => {
    try {
      // Save the plan selection to Firebase
      const docRef = await addDoc(collection(db, "planSelections"), {
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        planFeatures: selectedPlan.features,
        planIdealFor: selectedPlan.idealFor,
        selectedAt: serverTimestamp(),
        // You can add user identification here if available
        // userId: currentUser?.uid, // if you have user authentication
        // userEmail: currentUser?.email,
      });

      console.log('Plan selection saved to Firebase with ID: ', docRef.id);

      toast({
        title: 'تم اختيار الخطة بنجاح!',
        description: `تم حفظ اختيارك لخطة "${selectedPlan.name}". سيتم توجيهك الآن لملء بيانات عرض السعر.`,
        variant: 'default',
      });

      // Store the selected plan in localStorage for use in the quote form
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedPlan', JSON.stringify({
          name: selectedPlan.name,
          price: selectedPlan.price,
          features: selectedPlan.features,
          idealFor: selectedPlan.idealFor,
          firestoreDocId: docRef.id
        }));
      }

      // Navigate to the quote form after a short delay
      setTimeout(() => {
        const quoteSection = document.getElementById('get-quote');
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If the element doesn't exist, try to navigate using window.location
          window.location.hash = '#get-quote';
        }
      }, 1000);

    } catch (error) {
      console.error('Error saving plan selection to Firebase:', error);
      toast({
        title: 'خطأ في حفظ الاختيار',
        description: 'حدث خطأ أثناء حفظ اختيارك. سيتم توجيهك للنموذج مباشرة.',
        variant: 'destructive',
      });
      
      // Even if Firebase fails, still navigate to the form
      setTimeout(() => {
        const quoteSection = document.getElementById('get-quote');
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = '#get-quote';
        }
      }, 1000);
    }
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl font-bold leading-tight tracking-[-0.03em]">
          <ShieldAlert className="h-8 w-8 text-violet-400" />
          خطط التأمين لدينا
        </CardTitle>
        <CardDescription>جد التغطية المثالية لاحتياجاتك. قارن بين خططنا أدناه.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-lg font-medium leading-relaxed tracking-[-0.01em]">اسم الخطة</TableHead>
                <TableHead className="text-lg font-medium leading-relaxed tracking-[-0.01em]">مثالية لـ</TableHead>
                <TableHead className="text-lg font-medium leading-relaxed tracking-[-0.01em]">الميزات الرئيسية</TableHead>
                <TableHead className="text-right text-lg font-medium leading-relaxed tracking-[-0.01em]">السعر</TableHead>
                <TableHead className="text-center text-lg font-medium leading-relaxed tracking-[-0.01em]">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insurancePlans.map((plan: InsurancePlan) => (
                <TableRow key={plan.name} className="hover:bg-slate-800/20/30/50">
                  <TableCell className="font-semibold text-md text-violet-400">{plan.name}</TableCell>
                  <TableCell className="text-sm font-normal leading-relaxed">{plan.idealFor}</TableCell>
                  <TableCell>
                    <ul className="list-none space-y-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm font-normal leading-relaxed">
                          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="text-right font-medium">{plan.price}</TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handlePlanSelection(plan)}
                    >
                      اختر الخطة
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}